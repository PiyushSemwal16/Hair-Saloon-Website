import mongoose, { Schema, Document } from 'mongoose';

interface IPost extends Document {
  barberId: number;
  barberName: string;
  type: 'image' | 'video';
  url: string;
  cloudinaryId: string;
  title: string;
  caption: string;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    barberId: {
      type: Number,
      required: true,
    },
    barberName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['image', 'video'],
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    cloudinaryId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const Post = mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);
