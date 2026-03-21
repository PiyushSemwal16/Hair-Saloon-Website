'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { Edit2, Trash2, X } from 'lucide-react';

interface Post {
  _id: string;
  barberId: number;
  barberName: string;
  type: 'image' | 'video';
  url: string;
  title: string;
  caption: string;
  createdAt: string;
}

interface PostCardProps {
  post: Post;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string, caption: string) => void;
}

export function PostCard({
  post,
  onDelete,
  onUpdate,
}: PostCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: post.title,
    caption: post.caption,
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleSaveEdit = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(`/api/admin/posts/${post._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editData.title,
          caption: editData.caption,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update post');
      }

      toast.success('Post updated successfully!');
      onUpdate(post._id, editData.title, editData.caption);
      setIsEditing(false);
    } catch (error: any) {
      toast.error(error.message || 'Failed to update post');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/admin/posts/${post._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete post');
      }

      toast.success('Post deleted successfully!');
      onDelete(post._id);
      setShowDeleteDialog(false);
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete post');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Card className="overflow-hidden">
        {/* Media Preview */}
        <div className="relative h-48 bg-muted overflow-hidden">
          {post.type === 'video' ? (
            <video
              src={post.url}
              className="w-full h-full object-cover"
              playsInline
              preload="metadata"
              onMouseEnter={(e) => {
                const video = e.currentTarget;
                const playPromise = video.play();
                if (playPromise && typeof playPromise.catch === 'function') {
                  playPromise.catch(() => {
                    // Ignore autoplay block; user can still manually play.
                  });
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.pause();
                e.currentTarget.currentTime = 0;
              }}
            />
          ) : (
            <img src={post.url} alt={post.title} className="w-full h-full object-cover" />
          )}
          <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
            {post.type === 'video' ? '🎬 Video' : '📷 Image'}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {isEditing ? (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold mb-1 block">Title</label>
                <Input
                  value={editData.title}
                  onChange={(e) =>
                    setEditData((prev) => ({ ...prev, title: e.target.value }))
                  }
                />
              </div>
              <div>
                <label className="text-xs font-semibold mb-1 block">
                  Caption
                </label>
                <Textarea
                  value={editData.caption}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      caption: e.target.value,
                    }))
                  }
                  rows={2}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleSaveEdit}
                  disabled={isSaving}
                  className="flex-1"
                >
                  {isSaving ? 'Saving...' : 'Save'}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setEditData({
                      title: post.title,
                      caption: post.caption,
                    });
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              <h3 className="font-semibold text-lg mb-1">{post.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {post.barberName}
              </p>
              {post.caption && (
                <p className="text-sm mb-3 line-clamp-2">{post.caption}</p>
              )}
              <p className="text-xs text-muted-foreground mb-4">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                  className="flex-1"
                >
                  <Edit2 className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => setShowDeleteDialog(true)}
                  className="flex-1"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </>
          )}
        </div>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Post</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this post? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

interface PostsGridProps {
  posts: Post[];
  onPostsChange: () => void;
}

export function PostsGrid({ posts, onPostsChange }: PostsGridProps) {
  const handleDelete = () => {
    onPostsChange();
  };

  const handleUpdate = () => {
    onPostsChange();
  };

  if (posts.length === 0) {
    return (
      <Card className="p-12 text-center">
        <p className="text-muted-foreground">No posts uploaded yet.</p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
}
