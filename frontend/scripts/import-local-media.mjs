import fs from "node:fs";
import path from "node:path";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";

const rootDir = process.cwd();
const envPath = path.join(rootDir, ".env.local");

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`.env.local not found at ${filePath}`);
  }

  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split(/\r?\n/);

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eqIndex = line.indexOf("=");
    if (eqIndex === -1) continue;

    const key = line.slice(0, eqIndex).trim();
    const value = line.slice(eqIndex + 1).trim();
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(envPath);

const required = [
  "MONGODB_URI",
  "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing required env variable: ${key}`);
  }
}

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const postSchema = new mongoose.Schema(
  {
    barberId: { type: Number, required: true },
    barberName: { type: String, required: true },
    type: { type: String, enum: ["image", "video"], required: true },
    url: { type: String, required: true },
    cloudinaryId: { type: String, required: true },
    title: { type: String, required: true },
    caption: { type: String, default: "" },
  },
  { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

const mediaSources = [
  {
    barberId: 1,
    barberName: "Mohit gaiswal",
    type: "video",
    dir: path.join(rootDir, "public", "videos", "mohit"),
  },
  {
    barberId: 2,
    barberName: "Rishab",
    type: "video",
    dir: path.join(rootDir, "public", "videos", "Rishab"),
  },
];

const allowedVideoExt = new Set([".mp4", ".mov", ".m4v", ".webm", ".avi"]);
const allowedImageExt = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

function titleFromFileName(fileName) {
  const base = fileName.replace(path.extname(fileName), "");
  return base.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
}

async function uploadAndCreatePost({ barberId, barberName, type, absoluteFilePath }) {
  const fileName = path.basename(absoluteFilePath);
  const title = titleFromFileName(fileName);

  const existing = await Post.findOne({
    barberId,
    barberName,
    type,
    title,
  });

  if (existing) {
    return { status: "skipped", reason: "already-exists", fileName, title };
  }

  const uploaded = await cloudinary.uploader.upload(absoluteFilePath, {
    folder: `mg-studio/posts/${barberId}`,
    resource_type: type === "video" ? "video" : "image",
    use_filename: true,
    unique_filename: true,
    overwrite: false,
  });

  await Post.create({
    barberId,
    barberName,
    type,
    url: uploaded.secure_url,
    cloudinaryId: uploaded.public_id,
    title,
    caption: "",
  });

  return { status: "imported", fileName, title };
}

async function run() {
  await mongoose.connect(process.env.MONGODB_URI, { bufferCommands: false });

  let importedCount = 0;
  let skippedCount = 0;

  for (const source of mediaSources) {
    if (!fs.existsSync(source.dir)) {
      console.log(`[skip-dir] Missing folder: ${source.dir}`);
      continue;
    }

    const files = fs.readdirSync(source.dir);

    for (const file of files) {
      const abs = path.join(source.dir, file);
      const stat = fs.statSync(abs);
      if (!stat.isFile()) continue;

      const ext = path.extname(file).toLowerCase();
      const isAllowed =
        source.type === "video" ? allowedVideoExt.has(ext) : allowedImageExt.has(ext);

      if (!isAllowed) continue;

      try {
        const result = await uploadAndCreatePost({
          barberId: source.barberId,
          barberName: source.barberName,
          type: source.type,
          absoluteFilePath: abs,
        });

        if (result.status === "imported") {
          importedCount += 1;
          console.log(`[imported] ${source.barberName}: ${result.fileName}`);
        } else {
          skippedCount += 1;
          console.log(`[skipped] ${source.barberName}: ${result.fileName} (${result.reason})`);
        }
      } catch (error) {
        console.error(`[error] ${source.barberName}: ${file}`);
        console.error(error?.message || error);
      }
    }
  }

  console.log(`Done. Imported: ${importedCount}, Skipped: ${skippedCount}`);
  await mongoose.disconnect();
}

run().catch(async (error) => {
  console.error("Import failed:", error?.message || error);
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  process.exit(1);
});
