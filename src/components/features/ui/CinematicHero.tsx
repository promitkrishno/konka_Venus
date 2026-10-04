"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HeroImage {
  id: string;
  imageUrl: string;
  title: string | null;
}

export function CinematicHero({ images }: { images: HeroImage[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000); // Fades every 6 seconds for a slower, luxurious feel
    return () => clearInterval(interval);
  }, [images.length]);

  // Fallback if no images are uploaded yet
  if (images.length === 0) {
    return <div className="w-full min-h-[90vh] bg-kv-forest" />;
  }

  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-kv-forest">
      
      {/* Animated Background Gallery */}
      {images.map((img, idx) => (
        <div
          key={img.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out origin-center ${
            idx === currentIndex 
              ? "opacity-100 scale-105" // Slow zoom in
              : "opacity-0 scale-100"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img.imageUrl} alt={img.title || "Konka Venus"} className="w-full h-full object-cover" />
        </div>
      ))}

      {/* 
        The Overlay Gradient 
        This is critical. It darkens the edges and the center slightly 
        so the white text pops perfectly, regardless of how bright the photo is.
      */}
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10" />

      {/* Redesigned Hero Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center gap-6 mt-16">
        
        {/* Dynamic Image Title (Syncs with the background) */}
        <div className="h-6 overflow-hidden relative w-full flex justify-center mb-2">
          {images.map((img, idx) => (
            <p 
              key={img.id} 
              className={`absolute text-kv-sage font-medium tracking-[0.25em] uppercase text-xs md:text-sm transition-all duration-700 ${
                idx === currentIndex ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              — {img.title || "The Collection"} —
            </p>
          ))}
        </div>

        <h1 className="font-serif text-5xl md:text-7xl font-bold text-white tracking-tight drop-shadow-xl">
          Woven. Chosen. Yours.
        </h1>
        
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl font-light drop-shadow-md">
          Handcrafted sarees and kurtis with aesthetic ornamental decoration. 
        </p>
        
        {/* Redesigned Button: Solid white with Terracotta text on hover */}
        <Button 
          asChild 
          size="lg" 
          className="bg-kv-terracotta hover:bg-white text-white hover:text-kv-terracotta border border-kv-terracotta mt-8 text-lg px-10 h-14 rounded-full shadow-[0_0_30px_rgba(196,109,94,0.3)] transition-all duration-300 ease-out"
        >
          <Link href="/shop">Shop the Collection</Link>
        </Button>
      </div>
    </section>
  );
}