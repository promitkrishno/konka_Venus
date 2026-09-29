"use client"; // This tells Next.js this component runs in the browser

import { useState } from "react";
import { ShoppingBag, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/store/useCart";

interface AddToCartFormProps {
  productId: string;
  name: string;
  price: number;
}

export function AddToCartForm({ productId, name, price }: AddToCartFormProps) {
  const [selectedSize, setSelectedSize] = useState<string>("Free Size");
  const [measurements, setMeasurements] = useState<string>("");
  const addItem = useCart((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      productId,
      name,
      price,
      size: selectedSize,
      customMeasurements: measurements,
      quantity: 1,
    });
    // Optional: You could trigger the cart sheet to open here!
    alert("Added to bag!"); 
  };

  return (
    <div className="flex flex-col">
      {/* Size Selector */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <span className="font-medium text-kv-forest">Select Size</span>
          <button type="button" className="text-sm text-kv-olive hover:text-kv-forest underline flex items-center gap-1">
            <Ruler className="h-4 w-4" /> Size Guide
          </button>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {['S', 'M', 'L', 'Free Size'].map((size) => (
            <button 
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              className={`h-12 rounded-md border font-medium transition-all focus:outline-none 
                ${selectedSize === size 
                  ? 'border-kv-forest bg-kv-sage/50 text-kv-forest ring-1 ring-kv-forest' 
                  : 'border-kv-sage text-kv-forest hover:border-kv-forest hover:bg-kv-sage/30'}`}
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
          value={measurements}
          onChange={(e) => setMeasurements(e.target.value)}
          placeholder="e.g., Length 42 inches, Chest 36 inches" 
          className="w-full bg-white border border-kv-sage rounded-md h-10 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-kv-forest text-kv-forest"
        />
      </div>

      {/* Add to Cart CTA */}
      <Button 
        onClick={handleAddToCart}
        className="w-full bg-kv-terracotta hover:bg-kv-terracotta/90 text-kv-offwhite h-14 text-lg rounded-full mb-10 shadow-md flex items-center gap-2"
      >
        <ShoppingBag className="h-5 w-5" />
        Add to Bag - ৳ {price.toLocaleString()}
      </Button>
    </div>
  );
}