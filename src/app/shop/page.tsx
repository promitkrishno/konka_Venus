import Link from "next/link";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default async function ShopPage() {
  // Fetch all active products from the database
  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="font-serif text-4xl font-bold text-kv-forest mb-2">Shop the Collection</h1>
          <p className="text-kv-olive">Explore our handcrafted pieces.</p>
        </div>
        
        {/* Simple Category Filter (Visual only for now) */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {["All", "Sarees", "Kurtis", "Tops", "Bags"].map((category) => (
            <button 
              key={category} 
              className="px-4 py-2 rounded-full border border-kv-sage text-sm font-medium text-kv-forest hover:bg-kv-sage transition-colors whitespace-nowrap"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {products.length === 0 ? (
        <div className="py-20 text-center text-kv-olive flex flex-col items-center">
          <p className="text-lg">Our collection is currently being updated.</p>
          <p className="text-sm mt-2">Please check back soon!</p>
          {/* Quick link back to admin for you */}
          <Link href="/admin" className="mt-6 text-kv-terracotta hover:underline">
            Go to Admin Dashboard to add products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id} className="group flex flex-col gap-3">
              {/* Product Image Area */}
              <div className="relative aspect-[3/4] bg-kv-sage rounded-lg overflow-hidden flex items-center justify-center group-hover:opacity-90 transition-opacity">
                <span className="text-kv-forest/40 text-sm tracking-widest uppercase">
                  {product.category} Image
                </span>
                
                {/* Quick Add Button */}
                <Button 
                  size="icon" 
                  className="absolute bottom-4 right-4 h-12 w-12 rounded-full bg-kv-terracotta hover:bg-kv-terracotta/90 text-kv-offwhite shadow-lg md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                >
                  <Plus className="h-6 w-6" />
                </Button>
              </div>

              {/* Product Info */}
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
    </div>
  );
}