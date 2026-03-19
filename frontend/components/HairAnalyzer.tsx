"use client";

import { useState } from "react";
import ImageUpload from "./ImageUpload";
import StyleSuggestions from "./StyleSuggestions";
import { useFaceShape } from "@/hooks/useFaceShape";

type Suggestion = {
  id: string;
  name: string;
  image: string;
  description: string;
};

export default function HairAnalyzer() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const { faceShape, detectFaceShape } = useFaceShape();

  const handleUpload = async (file: File | null) => {
    if (!file) {
      setSuggestions([]);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("detectedFaceShape");
        window.dispatchEvent(new Event("face-shape-updated"));
      }
      return;
    }

    setIsAnalyzing(true);

    try {
      const img = new Image();
      img.src = URL.createObjectURL(file);

      let detectedShape = "Oval";

      await new Promise<void>((resolve) => {
        img.onload = async () => {
          const result = await detectFaceShape(img);
          detectedShape = result.shape;
          if (typeof window !== "undefined") {
            window.localStorage.setItem("detectedFaceShape", detectedShape);
            window.dispatchEvent(new Event("face-shape-updated"));
            window.dispatchEvent(
              new CustomEvent("face-shape-detected", {
                detail: { faceShape: detectedShape },
              })
            );
          }
          resolve();
        };
      });

      const formData = new FormData();
      formData.append("image", file);
      formData.append("faceShape", detectedShape);

      const res = await fetch("/api/hairstyle", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setSuggestions(data.suggestions || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <ImageUpload onUpload={handleUpload} isLoading={isAnalyzing} />

      <StyleSuggestions
        faceShape={faceShape}
        suggestions={suggestions}
        isLoading={isAnalyzing}
        onReset={() => setSuggestions([])}
      />
    </div>
  );
}