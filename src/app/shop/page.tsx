import Link from "next/link";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export default async function ShopPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const currentCategory = category || "All";

  // 1. Get dynamically unique categories that exist in the database
  const uniqueCats = await prisma.product.findMany({
    where: { isActive: true },
    select: { category: true },
    distinct: ["category"],
  });
  const categoriesList = ["All", ...uniqueCats.map((c) => c.category)];

  // 2. Fetch products, applying the filter if a category is selected
  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      ...(currentCategory !== "All" ? { category: currentCategory } : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="font-serif text-4xl font-bold text-kv-forest mb-2">Shop the Collection</h1>
          <p className="text-kv-olive">Explore our handcrafted pieces.</p>
        </div>
        
        {/* Dynamic Interactive Filter Buttons */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categoriesList.map((cat) => (
            <Link 
              key={cat} 
              href={cat === "All" ? "/shop" : `/shop?category=${cat}`}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors whitespace-nowrap
                ${currentCategory === cat 
                  ? "bg-kv-forest text-kv-offwhite border-kv-forest" 
                  : "border-kv-sage text-kv-forest hover:bg-kv-sage"
                }`}
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      {products.length === 0 ? (
        <div className="py-20 text-center text-kv-olive flex flex-col items-center">
          <p className="text-lg">No products found in this category.</p>
          <Link href="/shop" className="mt-4 text-kv-terracotta hover:underline">Clear Filters</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id} className="group flex flex-col gap-3">
              <div className="relative aspect-[3/4] bg-kv-sage rounded-lg overflow-hidden flex items-center justify-center group-hover:opacity-90 transition-opacity">
                {product.imageUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-kv-forest/40 text-sm tracking-widest uppercase">{product.category}</span>
                )}
                <Button size="icon" className="absolute bottom-4 right-4 h-12 w-12 rounded-full bg-kv-terracotta hover:bg-kv-terracotta/90 text-kv-offwhite shadow-lg md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                  <Plus className="h-6 w-6" />
                </Button>
              </div>
              <div className="flex flex-col">
                <h3 className="font-medium text-kv-forest text-lg group-hover:text-kv-terracotta transition-colors">{product.name}</h3>
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