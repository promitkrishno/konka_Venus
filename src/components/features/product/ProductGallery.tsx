"use client";

import { useState } from "react";

function ShimmerImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-full">
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-kv-sage/40 rounded-md" />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

export function ProductGallery({ images, category }: { images: string[], category: string }) {
  const [mainImage, setMainImage] = useState(images[0] || "");

  return (
    <div className="flex flex-col gap-4">
      {/* Main Large Image */}
      <div className="aspect-[3/4] w-full bg-kv-sage rounded-xl flex items-center justify-center overflow-hidden">
        {mainImage ? (
          <ShimmerImage src={mainImage} alt="Main product" className="w-full h-full object-cover" />
        ) : (
          <span className="text-kv-forest/40 tracking-widest uppercase">{category} Image</span>
        )}
      </div>

      {/* Clickable Thumbnails Grid */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <div 
              key={idx} 
              onClick={() => setMainImage(img)}
              className={`aspect-square bg-kv-sage rounded-md cursor-pointer overflow-hidden border-2 transition-all ${
                mainImage === img ? "border-kv-forest" : "border-transparent hover:border-kv-forest/50"
              }`}
            >
              <ShimmerImage src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}