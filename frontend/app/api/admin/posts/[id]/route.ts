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

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!verifyAdminPassword(req)) {
    return createUnauthorizedResponse();
  }

  try {
    await connectDB();

    const { id } = await Promise.resolve(params);
    const { title, caption } = await req.json();

    const post = await Post.findByIdAndUpdate(
      id,
      { title, caption },
      { new: true }
    );

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Post updated successfully',
        post,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update post' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!verifyAdminPassword(req)) {
    return createUnauthorizedResponse();
  }

  try {
    await connectDB();

    const { id } = await Promise.resolve(params);

    const post = await Post.findById(id);

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(post.cloudinaryId);

    // Delete from MongoDB
    await Post.findByIdAndDelete(id);

    return NextResponse.json(
      {
        success: true,
        message: 'Post deleted successfully',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete post' },
      { status: 500 }
    );
  }
}
