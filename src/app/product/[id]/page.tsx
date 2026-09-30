import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AddToCartForm } from "@/components/features/cart/AddToCartForm";
import { ProductGallery } from "@/components/features/product/ProductGallery";

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

  // 1. Safely parse the images array using 'any' to bypass strict TS cache
  let images: string[] = [];
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const prod = product as any;
    if (prod.images) {
      images = JSON.parse(prod.images);
    }
  } catch (e) {
    console.error("Failed to parse images", e);
  }
  
  // 2. Fallback to the single imageUrl if the array is empty
  if (images.length === 0 && product.imageUrl) {
    images = [product.imageUrl];
  }
  // 2. Fallback to the single imageUrl if the array is empty
  if (images.length === 0 && product.imageUrl) {
    images = [product.imageUrl];
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl min-h-[80vh]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        
        {/* Left: Render the Interactive Gallery */}
        <ProductGallery images={images} category={product.category} />

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