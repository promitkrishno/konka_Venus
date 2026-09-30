"use client";

import { useState } from "react";

export function ProductGallery({ images, category }: { images: string[], category: string }) {
  const [mainImage, setMainImage] = useState(images[0] || "");

  return (
    <div className="flex flex-col gap-4">
      {/* Main Large Image */}
      <div className="aspect-[3/4] w-full bg-kv-sage rounded-xl flex items-center justify-center overflow-hidden">
        {mainImage ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={mainImage} alt="Main product" className="w-full h-full object-cover" />
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}