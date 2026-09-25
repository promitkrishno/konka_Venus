import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react"; // Icon for the Add to Cart button

export default function Home() {
  // Mock data for initial UI testing
  const newArrivals = [
    { id: 1, name: "Emerald Handwoven Saree", price: "৳ 3,200", category: "Sarees" },
    { id: 2, name: "Terracotta Cotton Kurti", price: "৳ 1,850", category: "Kurtis" },
    { id: 3, name: "Minimalist Boho Top", price: "৳ 1,200", category: "Tops" },
    { id: 4, name: "Traditional Silk Bag", price: "৳ 950", category: "Bags" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative w-full h-[75vh] min-h-[500px] bg-kv-sage flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/5 z-10" /> 
        <div className="relative z-20 text-center px-4 max-w-3xl mx-auto flex flex-col items-center gap-6">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-kv-forest tracking-tight">
            Woven. Chosen. Yours.
          </h1>
          <p className="text-lg md:text-xl text-kv-forest/80 max-w-xl">
            Handcrafted sarees and kurtis with aesthetic ornamental decoration. 
          </p>
          <Button asChild size="lg" className="bg-kv-terracotta hover:bg-kv-terracotta/90 text-kv-offwhite mt-4 text-lg px-8 h-14 rounded-full shadow-md">
            <Link href="/shop">Shop the Collection</Link>
          </Button>
        </div>
      </section>

      {/* Category Horizontal Scroll */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-3xl font-bold text-kv-forest">Explore by Style</h2>
        </div>
        
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x scrollbar-hide">
          {['Sarees', 'Kurtis', 'Tops', 'Bottoms', 'Custom Fit'].map((category) => (
            <div key={category} className="snap-center shrink-0 flex flex-col items-center gap-4 group cursor-pointer">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-kv-sage border-[3px] border-transparent group-hover:border-kv-forest transition-all flex items-center justify-center shadow-sm overflow-hidden">
                <span className="text-kv-forest/40 text-sm tracking-widest uppercase">Photo</span>
              </div>
              <span className="font-medium text-kv-forest text-lg">{category}</span>
            </div>
          ))}
        </div>
      </section>

      {/* New Arrivals Product Grid */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto w-full border-t border-border">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-3xl font-bold text-kv-forest">New Arrivals</h2>
          <Link href="/shop" className="text-kv-olive hover:text-kv-forest font-medium underline underline-offset-4 transition-colors">
            View All
          </Link>
        </div>

        {/* 1 column on mobile, 2 on tablet, 4 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {newArrivals.map((product) => (
            <div key={product.id} className="group flex flex-col gap-3">
              {/* Product Image Area */}
              <div className="relative aspect-[3/4] bg-kv-sage rounded-lg overflow-hidden flex items-center justify-center group-hover:opacity-90 transition-opacity">
                <span className="text-kv-forest/40 text-sm tracking-widest uppercase">{product.category} Image</span>
                
                {/* Quick Add Button - Appears on hover for desktop, always visible on mobile */}
                <Button 
                  size="icon" 
                  className="absolute bottom-4 right-4 h-12 w-12 rounded-full bg-kv-terracotta hover:bg-kv-terracotta/90 text-kv-offwhite shadow-lg md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                >
                  <Plus className="h-6 w-6" />
                </Button>
              </div>

              {/* Product Info */}
              <div className="flex flex-col">
                <h3 className="font-medium text-kv-forest text-lg">{product.name}</h3>
                <p className="text-kv-olive">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}