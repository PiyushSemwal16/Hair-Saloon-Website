'use client';

import React, { useState, useEffect } from 'react';
import { AdminAuth } from '@/components/admin-auth';
import { UploadForm } from '@/components/admin-upload-form';
import { PostsGrid } from '@/components/posts-grid';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { LogOut } from 'lucide-react';

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

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchPosts();
    }
  }, [isAuthenticated]);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/auth', {
        method: 'GET',
        cache: 'no-store',
      });
      const data = await response.json();
      setIsAuthenticated(Boolean(data.authenticated));
    } catch {
      setIsAuthenticated(false);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  const fetchPosts = async () => {
    setIsLoadingPosts(true);
    try {
      const response = await fetch('/api/admin/posts', {
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }

      const data = await response.json();
      const orderedPosts = (data.posts || []).sort(
        (a: Post, b: Post) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setPosts(orderedPosts);
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch posts');
    } finally {
      setIsLoadingPosts(false);
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    setIsAuthenticated(false);
    setPosts([]);
    toast.success('Logged out successfully');
  };

  if (isCheckingAuth) {
    return (
      <main className="w-full min-h-screen overflow-x-hidden">
        <Navbar />
        <section className="pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-muted-foreground">Checking admin session...</p>
          </div>
        </section>
      </main>
    );
  }

  if (!isAuthenticated) {
    return <AdminAuth onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <main className="w-full min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-8 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-serif font-bold text-foreground mb-2">
                Admin Panel
              </h1>
              <p className="text-muted-foreground">
                Manage barber portfolio posts, uploads, and content
              </p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Upload Form */}
            <div className="lg:col-span-1">
              <UploadForm
                onSuccess={fetchPosts}
              />
            </div>

            {/* Posts Grid */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">All Posts</h2>
                <p className="text-muted-foreground">
                  {posts.length} post{posts.length !== 1 ? 's' : ''} uploaded
                </p>
              </div>

              {isLoadingPosts ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Loading posts...</p>
                </div>
              ) : (
                <PostsGrid
                  posts={posts}
                  onPostsChange={fetchPosts}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
