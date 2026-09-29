import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AddToCartForm } from "@/components/features/cart/AddToCartForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function DynamicProductPage({ params }: Props) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl min-h-[80vh]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        
        {/* Left: Image Gallery */}
        <div className="flex flex-col gap-4">
          <div className="aspect-[3/4] w-full bg-kv-sage rounded-xl flex items-center justify-center">
            <span className="text-kv-forest/40 tracking-widest uppercase">{product.category} Image</span>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((thumb) => (
              <div key={thumb} className="aspect-square bg-kv-sage rounded-md cursor-pointer hover:border-2 hover:border-kv-forest transition-all" />
            ))}
          </div>
        </div>

        {/* Right: Product Info & Actions */}
        <div className="flex flex-col pt-4 md:pt-10">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-kv-forest mb-2">
            {product.name}
          </h1>
          <p className="text-2xl text-kv-forest font-medium mb-6">
            ৳ {product.price.toLocaleString()}
          </p>

          <p className="text-kv-forest/80 mb-8 leading-relaxed whitespace-pre-wrap">
            {product.description}
          </p>

          {/* Cleaned Up: Only the interactive AddToCartForm is rendered here */}
          <AddToCartForm productId={product.id} name={product.name} price={product.price} />

          {/* Expandable Details */}
          <Accordion type="single" collapsible className="w-full border-t border-kv-sage mt-4">
            <AccordionItem value="description">
              <AccordionTrigger className="text-kv-forest hover:text-kv-terracotta">Product Description</AccordionTrigger>
              <AccordionContent className="text-kv-olive leading-relaxed">
                {product.description}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="materials">
              <AccordionTrigger className="text-kv-forest hover:text-kv-terracotta">Material & Care</AccordionTrigger>
              <AccordionContent className="text-kv-olive leading-relaxed">
                Handcrafted from premium materials. Dry clean recommended to maintain the integrity of the ornamental decoration.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="shipping">
              <AccordionTrigger className="text-kv-forest hover:text-kv-terracotta">Delivery & Returns</AccordionTrigger>
              <AccordionContent className="text-kv-olive leading-relaxed">
                Nationwide shipping available. Estimated delivery time is 10-15 days. Custom-fitted items are strictly non-refundable.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

        </div>
      </div>
    </div>
  );
}