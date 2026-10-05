import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import prisma from "@/lib/prisma";
import { CinematicHero } from "@/components/features/ui/CinematicHero";
import type { Product } from "@prisma/client";

export default async function Home() {
  // Fetch the 4 most recent active products for the New Arrivals section
  const latestProducts = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    take: 4,
  });

  // Fetch the gallery images for the cinematic background
  const galleryImages = await prisma.galleryImage.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Fetch the most recent product image for each category circle
  const categoryNames = ['Sarees', 'Kurtis', 'Tops', 'Bags', 'Custom Fit'];
  const categoryData = await Promise.all(
    categoryNames.map(async (name) => {
      // Custom Fit might not have a direct product, so it falls back to the placeholder
      if (name === 'Custom Fit') return { name, imageUrl: null };
      
      const product = await prisma.product.findFirst({
        where: { category: name, isActive: true },
        orderBy: { createdAt: 'desc' },
        select: { imageUrl: true },
      });
      
      return { name, imageUrl: product?.imageUrl || null };
    })
  );

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* CINEMATIC HERO SECTION */}
      <CinematicHero images={galleryImages} />

      {/* CATEGORY HORIZONTAL SCROLL */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-3xl font-bold text-kv-forest">Explore by Style</h2>
        </div>
        
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x scrollbar-hide">
          {categoryData.map((cat) => (
            <Link 
              href={`/shop?category=${cat.name !== 'Custom Fit' ? cat.name : ''}`} 
              key={cat.name} 
              className="snap-center shrink-0 flex flex-col items-center gap-4 group cursor-pointer"
            >
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-kv-sage border-[3px] border-transparent group-hover:border-kv-forest transition-all flex items-center justify-center shadow-sm overflow-hidden relative">
                {cat.imageUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img 
                    src={cat.imageUrl} 
                    alt={cat.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                  />
                ) : (
                  <span className="text-kv-forest/40 text-sm tracking-widest uppercase">Style</span>
                )}
              </div>
              <span className="font-medium text-kv-forest text-lg">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* NEW ARRIVALS PRODUCT GRID */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto w-full border-t border-kv-sage/30">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-3xl font-bold text-kv-forest">New Arrivals</h2>
          <Link href="/shop" className="text-kv-olive hover:text-kv-forest font-medium underline underline-offset-4 transition-colors">
            View All
          </Link>
        </div>

        {latestProducts.length === 0 ? (
          <div className="text-center py-10 text-kv-olive border border-dashed border-kv-sage rounded-xl">
            <p>New collections are dropping soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {latestProducts.map((product: Product) => (
              <Link href={`/product/${product.id}`} key={product.id} className="group flex flex-col gap-3">
                <div className="relative aspect-[3/4] bg-kv-sage rounded-lg overflow-hidden flex items-center justify-center group-hover:opacity-90 transition-opacity">
                  {product.imageUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <span className="text-kv-forest/40 text-sm tracking-widest uppercase">{product.category}</span>
                  )}
                  
                  <Button 
                    size="icon" 
                    className="absolute bottom-4 right-4 h-12 w-12 rounded-full bg-kv-terracotta hover:bg-kv-terracotta/90 text-kv-offwhite shadow-lg md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                  >
                    <Plus className="h-6 w-6" />
                  </Button>
                </div>

                <div className="flex flex-col">
                  <h3 className="font-medium text-kv-forest text-lg group-hover:text-kv-terracotta transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-kv-forest/70 line-clamp-1 mb-1">{product.description}</p>
                  <p className="text-kv-olive font-medium">৳ {product.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}