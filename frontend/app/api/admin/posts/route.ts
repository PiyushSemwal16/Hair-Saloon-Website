import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Post } from '@/lib/models';
import { verifyAdminPassword, createUnauthorizedResponse } from '@/lib/auth';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  if (!verifyAdminPassword(req)) {
    return createUnauthorizedResponse();
  }

  try {
    await connectDB();

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const barberId = formData.get('barberId') as string;
    const barberName = formData.get('barberName') as string;
    const type = formData.get('type') as 'image' | 'video';
    const title = formData.get('title') as string;
    const caption = formData.get('caption') as string;

    if (!file || !barberId || !barberName || !type || !title) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Upload to Cloudinary
    const buffer = Buffer.from(await file.arrayBuffer());
    
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `mg-studio/posts/${barberId}`,
          resource_type: type === 'video' ? 'video' : 'image',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      uploadStream.end(buffer);
    }) as any;

    // Save post to MongoDB
    const post = await Post.create({
      barberId: parseInt(barberId),
      barberName,
      type,
      url: result.secure_url,
      cloudinaryId: result.public_id,
      title,
      caption: caption || '',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Post created successfully',
        post,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error uploading post:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to upload post' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const barberId = searchParams.get('barberId');

    let query = {};
    if (barberId) {
      query = { barberId: parseInt(barberId) };
    }

    const posts = await Post.find(query).sort({ createdAt: -1, _id: -1 });

    return NextResponse.json(
      {
        success: true,
        posts,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
