"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";

interface PortfolioMediaProps {
  type: string;
  src: string;
  title: string;
}

export function PortfolioMedia({ type, src, title }: PortfolioMediaProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (type === "image") {
    return (
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={src}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          onLoadingComplete={() => setIsLoading(false)}
          onError={() => setHasError(true)}
        />
      </div>
    );
  }

  return (
    <div className="relative w-full bg-black aspect-square flex items-center justify-center overflow-hidden">
      {hasError ? (
        <div className="flex flex-col items-center justify-center h-full bg-gray-900 text-white p-4">
          <div className="text-center">
            <p className="text-sm">Video not found or unable to load</p>
            <p className="text-xs text-gray-400 mt-2">Check file path: {src}</p>
          </div>
        </div>
      ) : (
        <video
          src={src}
          controls
          playsInline
          controlsList="nodownload"
          onLoadStart={() => setIsLoading(false)}
          onError={() => setHasError(true)}
          className="w-full h-full object-cover"
          preload="metadata"
        >
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}
