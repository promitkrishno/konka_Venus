import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Ruler, ShoppingBag } from "lucide-react";

export default function ProductPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Desktop: 2 Columns | Mobile: 1 Column */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        
        {/* Left: Image Gallery */}
        <div className="flex flex-col gap-4">
          <div className="aspect-[3/4] w-full bg-kv-sage rounded-xl flex items-center justify-center">
            <span className="text-kv-forest/40 tracking-widest uppercase">Main Product Image</span>
          </div>
          {/* Thumbnail row */}
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((thumb) => (
              <div key={thumb} className="aspect-square bg-kv-sage rounded-md cursor-pointer hover:border-2 hover:border-kv-forest transition-all" />
            ))}
          </div>
        </div>

        {/* Right: Product Info & Actions */}
        <div className="flex flex-col pt-4 md:pt-10">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-kv-forest mb-2">
            Emerald Handwoven Saree
          </h1>
          <p className="text-2xl text-kv-forest font-medium mb-6">৳ 3,200</p>

          <p className="text-kv-forest/80 mb-8 leading-relaxed">
            Handcrafted with intricate ornamental embroidery. This piece blends traditional weaving techniques with a modern minimalist aesthetic.
          </p>

          {/* Size Selector */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="font-medium text-kv-forest">Select Size</span>
              <button className="text-sm text-kv-olive hover:text-kv-forest underline underline-offset-4 flex items-center gap-1">
                <Ruler className="h-4 w-4" /> Size Guide
              </button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {['S', 'M', 'L', 'Free Size'].map((size) => (
                <button 
                  key={size}
                  className="h-12 rounded-md border border-kv-sage text-kv-forest font-medium hover:border-kv-forest hover:bg-kv-sage/30 transition-all focus:border-kv-forest focus:bg-kv-sage focus:outline-none"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Measurement Prompt */}
          <div className="mb-8 p-4 bg-kv-sage/30 border border-kv-sage rounded-lg flex flex-col gap-2">
            <span className="font-medium text-kv-forest">Need Custom Measurements?</span>
            <p className="text-sm text-kv-forest/70 mb-2">Leave your specific chest, waist, or length requirements below.</p>
            <input 
              type="text" 
              placeholder="e.g., Length 42 inches, Chest 36 inches" 
              className="w-full bg-white border border-kv-sage rounded-md h-10 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-kv-forest text-kv-forest"
            />
          </div>

          {/* Add to Cart CTA */}
          <Button className="w-full bg-kv-terracotta hover:bg-kv-terracotta/90 text-kv-offwhite h-14 text-lg rounded-full mb-10 shadow-md flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Add to Bag - ৳ 3,200
          </Button>

          {/* Expandable Details */}
          <Accordion type="single" collapsible className="w-full border-t border-kv-sage">
            <AccordionItem value="description">
              <AccordionTrigger className="text-kv-forest hover:text-kv-terracotta">Product Description</AccordionTrigger>
              <AccordionContent className="text-kv-olive leading-relaxed">
                Every piece is woven in small batches. The intricate embroidery takes approximately 10-15 days to complete, ensuring the highest level of craftsmanship.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="materials">
              <AccordionTrigger className="text-kv-forest hover:text-kv-terracotta">Material & Care</AccordionTrigger>
              <AccordionContent className="text-kv-olive leading-relaxed">
                100% Pure Silk/Cotton blend. Dry clean only. Do not bleach. Iron on low heat.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="shipping">
              <AccordionTrigger className="text-kv-forest hover:text-kv-terracotta">Delivery & Returns</AccordionTrigger>
              <AccordionContent className="text-kv-olive leading-relaxed">
                Nationwide shipping available. Estimated delivery time is 10-15 days. Returns accepted within 7 days of delivery for standard sizes (Custom fits are non-refundable).
              </AccordionContent>
            </AccordionItem>
          </Accordion>

        </div>
      </div>
    </div>
  );
}