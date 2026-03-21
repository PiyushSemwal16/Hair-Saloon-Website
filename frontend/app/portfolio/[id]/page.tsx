"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { barbers } from "@/lib/data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { PortfolioMedia } from "@/components/portfolio-media";
import { Skeleton } from "@/components/ui/skeleton";

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

export default function PortfolioPage() {
  const params = useParams();
  const barberId = Number(params.id);
  const barber = barbers.find((b) => b.id === barberId);
  const [dbPosts, setDbPosts] = useState<Post[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/admin/posts?barberId=${barberId}`, {
          cache: 'no-store',
        });
        if (response.ok) {
          const data = await response.json();
          const orderedPosts = (data.posts || []).sort(
            (a: Post, b: Post) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setDbPosts(orderedPosts);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoadingPosts(false);
      }
    };

    fetchPosts();
  }, [barberId]);

  if (!barber) {
    return (
      <main className="w-full min-h-screen overflow-x-hidden">
        <Navbar />
        <div className="pt-32 pb-16 text-center">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-4">
            Barber Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The barber portfolio you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link href="/team">Back to Team</Link>
          </Button>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            asChild
            variant="ghost"
            className="mb-8 text-primary hover:text-primary/80"
          >
            <Link href="/team" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Team
            </Link>
          </Button>

          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-2">
              {barber.name}
            </h1>
            <p className="text-primary text-lg mb-2">{barber.title}</p>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Specialty: <span className="text-foreground font-medium">{barber.specialty}</span>
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-serif font-bold text-foreground">
              My Work
            </h2>
            <p className="text-muted-foreground mt-3">
              A showcase of professional hairstyles and cuts
            </p>
          </div>

          {isLoadingPosts ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="w-full h-48 rounded-lg" />
              ))}
            </div>
          ) : dbPosts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
              {dbPosts.map((post) => (
                <div
                  key={post._id}
                  className="group rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-smooth hover-lift bg-card"
                >
                  {/* Media */}
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
                  </div>

                  {/* Title */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-foreground">
                      {post.title}
                    </h3>
                    {post.caption && (
                      <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                        {post.caption}
                      </p>
                    )}
                    <p className="text-primary text-sm mt-2">
                      {post.type === 'video' ? '🎥 Video' : '📸 Photo'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : barber.portfolio && barber.portfolio.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
              {barber.portfolio.map((work, index) => (
                <div
                  key={index}
                  className="group rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-smooth hover-lift bg-card"
                >
                  {/* Media */}
                  <PortfolioMedia type={work.type} src={work.src} title={work.title} />

                  {/* Title */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-foreground">
                      {work.title}
                    </h3>
                    <p className="text-primary text-sm mt-1">
                      {work.type === "video" ? "🎥 Video Demo" : "📸 Professional Cut"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border border-dashed border-border rounded-lg">
              <p className="text-muted-foreground text-lg">
                Portfolio coming soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-border bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-6">
            Impressed with {barber.name}'s Work?
          </h2>
          <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
            Book an appointment and let {barber.name} create your perfect look.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 h-14 text-lg font-medium transition-smooth hover:-translate-y-0.5"
          >
            <Link href="/book">Book with {barber.name}</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
