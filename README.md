# MG STUDIO Web Platform

Production website for MG STUDIO (barber + unisex salon) built with Next.js.

This project includes:
- Public marketing pages (home, team, booking)
- AI hairstyle analyzer + chatbot features
- Admin panel for uploading/editing/deleting portfolio photos and videos
- Cloudinary media storage + MongoDB persistence
- 7-day admin session (cookie-based)

## Live Site

- https://www.mgstudios.in

## What This Project Does

### Public Features
- Home page with service highlights and AI section
- Team page with barber cards and portfolio entry points
- Portfolio page per barber (`/portfolio/:id`) showing latest uploaded work
- Booking page with details form and scheduling flow

### AI Features
- Face-shape detection flow via MediaPipe in client-side hooks
- Face-shape based style suggestions via `/api/hairstyle`
- Conversational grooming assistant via Gemini API at `/api/chatbot`

### Admin Features
- Password-protected admin route at `/admin`
- Cookie session auth (valid for 7 days)
- Upload image/video portfolio posts
- Edit title/caption of uploaded posts
- Delete posts (Cloudinary + MongoDB cleanup)
- Newest uploads appear first

## Tech Stack

- Framework: Next.js 16 (App Router)
- Language: TypeScript + React 19
- Styling/UI: Tailwind CSS + shadcn/ui + Radix UI
- Database: MongoDB (Mongoose)
- Media CDN/Storage: Cloudinary
- AI APIs: Google Gemini + MediaPipe face mesh

## Repository Structure

```text
.
├─ frontend/
│  ├─ app/
│  │  ├─ admin/page.tsx
│  │  ├─ api/
│  │  │  ├─ admin/
│  │  │  │  ├─ auth/route.ts
│  │  │  │  ├─ posts/route.ts
│  │  │  │  └─ posts/[id]/route.ts
│  │  │  ├─ chatbot/route.ts
│  │  │  └─ hairstyle/route.tsx
│  │  ├─ book/page.tsx
│  │  ├─ portfolio/[id]/page.tsx
│  │  ├─ team/page.tsx
│  │  └─ page.tsx
│  ├─ components/
│  │  ├─ admin-auth.tsx
│  │  ├─ admin-upload-form.tsx
│  │  ├─ posts-grid.tsx
│  │  ├─ portfolio-gallery.tsx
│  │  ├─ portfolio-media.tsx
│  │  └─ ...
│  ├─ hooks/
│  │  └─ useFaceShape.ts
│  ├─ lib/
│  │  ├─ auth.ts
│  │  ├─ db.ts
│  │  ├─ models.ts
│  │  └─ data.ts
│  ├─ public/
│  │  ├─ videos/
│  │  └─ ...
│  ├─ scripts/
│  │  └─ import-local-media.mjs
│  └─ package.json
├─ CHATBOT_SETUP.md
└─ README.md
```

## Prerequisites

Install before setup:
- Node.js 20+ (recommended LTS)
- npm 10+
- MongoDB Atlas project + database user
- Cloudinary account
- Google AI Studio API key (for chatbot)

## Local Setup (Developer Onboarding)

### 1. Clone and install

```bash
git clone <your-repo-url>
cd <repo-folder>/frontend
npm install
```

### 2. Create environment file

Create `frontend/.env.local` and copy values from `frontend/.env.local.example`.

Required variables:

```env
GOOGLE_GEMINI_API_KEY=your_google_gemini_api_key_here

MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name

ADMIN_PASSWORD=your_secure_admin_password_here
ADMIN_SESSION_SECRET=your_long_random_session_secret

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 3. Run development server

```bash
npm run dev
```

Open:
- App: http://localhost:3000
- Admin: http://localhost:3000/admin

## Available Scripts

From `frontend/`:

```bash
npm run dev      # Start local dev server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Lint codebase
```

## Environment Variables Explained

| Variable | Purpose | Required |
|---|---|---|
| `GOOGLE_GEMINI_API_KEY` | Chatbot responses through Gemini API | Yes (for chatbot) |
| `MONGODB_URI` | MongoDB connection string for posts/content | Yes |
| `ADMIN_PASSWORD` | Password used by admin login endpoint | Yes |
| `ADMIN_SESSION_SECRET` | HMAC signing secret for 7-day admin cookie | Strongly recommended |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Yes |
| `CLOUDINARY_API_KEY` | Cloudinary server API key | Yes |
| `CLOUDINARY_API_SECRET` | Cloudinary server API secret | Yes |

## Admin System: How It Works

### Authentication model

1. Admin enters password at `/admin`
2. `POST /api/admin/auth` validates password and sets secure httpOnly cookie
3. Cookie (`mg_admin_session`) remains valid for 7 days
4. Refreshing `/admin` checks session via `GET /api/admin/auth`
5. Logout calls `DELETE /api/admin/auth` to clear cookie

### Upload/edit/delete flow

1. Admin submits media in panel
2. API validates admin session
3. File uploads to Cloudinary
4. Metadata stored in MongoDB (`Post` model)
5. Team portfolio pages fetch latest posts from DB and render newest first

### Post ordering

Posts are returned sorted by newest first:
- `createdAt: -1`
- `_id: -1` (stable tie-breaker)

## Data Model (MongoDB)

Collection: `posts`

```ts
{
	barberId: number,
	barberName: string,
	type: 'image' | 'video',
	url: string,
	cloudinaryId: string,
	title: string,
	caption: string,
	createdAt: Date,
	updatedAt: Date
}
```

## API Reference

### Admin Auth API

#### `POST /api/admin/auth`
- Validates admin password
- Sets 7-day session cookie

Request body:

```json
{ "password": "..." }
```

#### `GET /api/admin/auth`
- Returns current auth state

Response:

```json
{ "authenticated": true }
```

#### `DELETE /api/admin/auth`
- Logs out admin and clears cookie

### Admin Posts API

#### `POST /api/admin/posts`
- Upload new post (multipart/form-data)
- Requires valid admin session

Form fields:
- `file`
- `barberId`
- `barberName`
- `type` (`image` or `video`)
- `title`
- `caption` (optional)

#### `GET /api/admin/posts?barberId=<id>`
- Fetch posts
- Optional filter by barber
- Returns newest first

#### `PUT /api/admin/posts/:id`
- Update title/caption
- Requires valid admin session

#### `DELETE /api/admin/posts/:id`
- Deletes Cloudinary asset + MongoDB record
- Requires valid admin session

### AI APIs

#### `POST /api/chatbot`
- Uses Gemini model `gemini-2.5-flash`
- Input: message + conversation history + optional face shape
- Output: assistant text reply

#### `POST /api/hairstyle`
- Accepts face shape
- Returns style suggestion list with local image references

## Media Import Script (Local Files to Cloudinary + DB)

Script: `frontend/scripts/import-local-media.mjs`

What it does:
- Reads local media folders
- Uploads files to Cloudinary
- Creates MongoDB posts
- Skips duplicates based on barber + type + title

Run it:

```bash
cd frontend
node scripts/import-local-media.mjs
```

Current configured source folders in script:
- `public/videos/mohit`
- `public/videos/Rishab`

You can extend `mediaSources` in the script for more folders or image imports.

## Portfolio Display Behavior

- Portfolio page route: `/portfolio/:id`
- Loads DB posts for the selected barber
- If no DB posts exist, falls back to static sample portfolio data in `lib/data.ts`
- Videos in public/team portfolio are currently configured to play with controls and sound available

## Known Operational Notes

- Browser autoplay policy may block unmuted auto-play; this is expected behavior.
- For MongoDB Atlas, ensure:
	- correct DB username/password in URI
	- IP/network access is allowed
- If your MongoDB password contains special chars (`@`, `#`, etc.), URL-encode it in `MONGODB_URI`.

## Troubleshooting

### `Module not found: Can't resolve 'cloudinary'`

Run install inside `frontend/`:

```bash
npm install
```

### `MongoServerError: bad auth : authentication failed`

Fix `MONGODB_URI` credentials in `.env.local`.

### Admin asks password again after refresh

Verify:
- `ADMIN_SESSION_SECRET` is set
- cookie not blocked by browser
- app restarted after env changes

### Upload succeeds but does not appear in portfolio

Check:
- `barberId` is correct
- DB record created
- portfolio route matches barber id
- reload page and inspect `/api/admin/posts?barberId=<id>` response

## Security Checklist (Before Production)

- Use strong, unique `ADMIN_PASSWORD`
- Set long random `ADMIN_SESSION_SECRET`
- Never commit `.env.local`
- Rotate Cloudinary and DB secrets if leaked
- Restrict MongoDB Atlas network access
- Consider replacing password-only admin with role-based auth (NextAuth/JWT/OAuth)

## Deployment Notes

Deploy `frontend/` as a Next.js app (Vercel recommended).

Set all required env variables in your hosting platform:
- `GOOGLE_GEMINI_API_KEY`
- `MONGODB_URI`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

After adding/updating env variables, redeploy.

## Suggested Next Improvements

- Add role-based authentication instead of shared admin password
- Add upload file size and mime validation on server side
- Add pagination and search in admin posts list
- Add audit logging for content edits/deletes
- Add automated tests for API routes and auth helpers
