'use client';

import React, { useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

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

interface PortfolioGalleryProps {
  barberId: number;
}

export function PortfolioGallery({ barberId }: PortfolioGalleryProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/admin/posts?barberId=${barberId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        setPosts(data.posts || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [barberId]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="w-full h-48" />
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <Card className="p-12 text-center">
        <p className="text-muted-foreground">
          No portfolio items available yet.
        </p>
      </Card>
    );
  }

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {posts.map((post) => (
          <CarouselItem key={post._id} className="md:basis-1/2 lg:basis-1/3">
            <Card className="overflow-hidden">
              <div className="relative aspect-square bg-muted overflow-hidden">
                {post.type === 'video' ? (
                  <video
                    src={post.url}
                    className="w-full h-full object-cover"
                    controls
                    playsInline
                  />
                ) : (
                  <img
                    src={post.url}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                  {post.type === 'video' ? '🎬' : '📷'}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1">{post.title}</h3>
                {post.caption && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.caption}
                  </p>
                )}
              </div>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
