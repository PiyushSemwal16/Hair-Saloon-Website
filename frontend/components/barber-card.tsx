import Image from "next/image";
import { Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

interface BarberCardProps {
  id: number;
  name: string;
  title: string;
  specialty: string;
  bio?: string;
  instagram?: string;
  image: string | StaticImageData;
  isOwner?: boolean;
  isFeatured?: boolean;
}

export function BarberCard({
  id,
  name,
  title,
  specialty,
  bio,
  instagram,
  image,
  isOwner,
  isFeatured,
}: BarberCardProps) {
  const ownerInstagram = "https://www.instagram.com/mohitgaiswal?igsh=MTd3ZXI1ZnR1NmpnZw==";
  const rishabInstagram = "https://www.instagram.com/hair_artist_rishabh?igsh=bHpsN2M5Z3k1YWxh";

  const instagramUrl = isOwner
    ? instagram || ownerInstagram
    : name === "Rishab"
      ? instagram || rishabInstagram
      : undefined;

  const isRishab = name === "Rishab";
  const shouldHighlight = isRishab || isFeatured;

  if (isOwner) {
    return (
      <div className="bg-card border border-primary/30 rounded-lg overflow-hidden reveal-up transition-smooth hover-lift">
        <div className="grid md:grid-cols-2 gap-0 items-stretch">
          <div className="relative h-full min-h-[400px] md:min-h-[500px]">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="p-8 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 text-primary text-sm uppercase tracking-widest mb-2">
              <Scissors className="h-4 w-4" />
              <span>{title}</span>
            </div>

            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
              {name}
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-4">
              {bio}
            </p>

            <p className="text-primary font-medium mb-6">
              Specialty: {specialty}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                asChild
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href={`/portfolio/${id}`}>
                  My Work
                </Link>
              </Button>
              {instagramUrl && (
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary/10"
                >
                  <Link href={instagramUrl} target="_blank" rel="noopener noreferrer">
                    Instagram
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group bg-card border border-border rounded-lg overflow-hidden transition-smooth hover:border-primary/50 hover-lift reveal-up flex flex-col relative",
        shouldHighlight && "border-primary ring-2 ring-primary/85 shadow-[0_26px_55px_-24px_color-mix(in_oklch,var(--primary)_85%,transparent)]",
        isFeatured && "scale-[1.03]"
      )}
    >
      {isRishab && (
        <span className="absolute top-3 left-3 z-30 bg-primary text-primary-foreground text-[11px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full shadow-md">
          Featured Senior
        </span>
      )}

      <div className={cn("aspect-square relative overflow-hidden", shouldHighlight && "aspect-[4/3]")}>
        {shouldHighlight && (
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-primary/20 via-transparent to-transparent pointer-events-none" />
        )}
        <Image
          src={image}
          alt={name}
          fill
          className={cn(
            "object-cover transition-transform duration-500 ease-out group-hover:scale-105",
            shouldHighlight && "group-hover:scale-110"
          )}
        />
      </div>

      <div className={cn("p-6 flex flex-col flex-grow", shouldHighlight && "p-7")}>
        <h3 className={cn("text-xl font-serif font-bold text-foreground mb-1", shouldHighlight && "text-2xl")}>
          {name}
        </h3>

        <p className={cn("text-primary text-sm mb-2", shouldHighlight && "text-base font-semibold")}>{title}</p>

        <p className={cn("text-muted-foreground text-sm mb-4 flex-grow", shouldHighlight && "text-base mb-5")}>
          Specialty: {specialty}
        </p>

        <div className="grid grid-cols-1 gap-2">
          <Button
            asChild
            variant="outline"
            className="w-full border-primary text-primary hover:bg-primary/10"
          >
            <Link href={`/portfolio/${id}`}>
              My Work
            </Link>
          </Button>
          {instagramUrl && name === "Rishab" && (
            <Button
              asChild
              variant="outline"
              className="w-full border-primary text-primary hover:bg-primary/10"
            >
              <Link href={instagramUrl} target="_blank" rel="noopener noreferrer">
                Instagram
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
