"use client";

import { useState, useRef } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, ImagePlus, X } from "lucide-react";
import { createProduct } from "@/actions/product";

export function AddProductForm() {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleAction(formData: FormData) {
    setIsSubmitting(true);
    await createProduct(formData);
    formRef.current?.reset();
    setImageUrls([]);
    setIsSubmitting(false);
  }

  return (
    <form ref={formRef} action={handleAction} className="flex flex-col gap-4">
      <input type="hidden" name="images" value={JSON.stringify(imageUrls)} />

      {/* Cloudinary Multiple Drag & Drop Widget */}
      <div>
        <label className="text-sm font-medium text-kv-forest mb-1 block">Product Images</label>
        
        {imageUrls.length > 0 && (
          <div className="flex gap-2 overflow-x-auto py-2 mb-2 scrollbar-hide">
            {imageUrls.map((url, i) => (
              <div key={i} className="relative w-20 h-24 shrink-0 rounded overflow-hidden border border-kv-sage">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="upload" className="w-full h-full object-cover" />
                <button 
                  type="button" 
                  onClick={() => setImageUrls(imageUrls.filter((_, idx) => idx !== i))} 
                  className="absolute top-1 right-1 bg-white/90 text-red-500 rounded-full p-1 shadow-sm hover:bg-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        <CldUploadWidget 
          /* FIX: Added || "" to satisfy TypeScript strict string checking */
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""}
          options={{ multiple: true }}
          /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
          onSuccess={(result: any) => {
            if (result?.info?.secure_url) {
              setImageUrls((prev) => [...prev, result.info.secure_url]);
            }
          }}
        >
          {({ open }) => (
            <div 
              onClick={() => open()} 
              className="w-full h-16 border-2 border-dashed border-kv-sage rounded-md flex items-center justify-center text-kv-olive cursor-pointer hover:bg-kv-sage/30 hover:border-kv-forest transition-colors"
            >
              <ImagePlus className="h-5 w-5 mr-2 text-kv-forest" />
              <span className="text-sm font-medium text-kv-forest">Add Images</span>
            </div>
          )}
        </CldUploadWidget>
      </div>

      <div>
        <label className="text-sm font-medium text-kv-forest">Product Name</label>
        <Input name="name" placeholder="e.g., Emerald Saree" required className="mt-1 bg-white" />
      </div>
      
      {/* Custom Category Input with Suggestions */}
      <div>
        <label className="text-sm font-medium text-kv-forest">Category</label>
        <Input name="category" list="categories" placeholder="Select or type a new category..." required className="mt-1 bg-white" />
        <datalist id="categories">
          <option value="Sarees" />
          <option value="Kurtis" />
          <option value="Tops" />
          <option value="Bags" />
        </datalist>
      </div>
      
      <div>
        <label className="text-sm font-medium text-kv-forest">Price (৳)</label>
        <Input name="price" type="number" min="0" placeholder="3200" required className="mt-1 bg-white" />
      </div>
      
      <div>
        <label className="text-sm font-medium text-kv-forest">Description</label>
        <textarea name="description" required rows={3} placeholder="Details..." className="w-full mt-1 flex rounded-md border border-kv-sage bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-kv-forest text-kv-forest" />
      </div>
      
      <Button 
        type="submit" 
        disabled={isSubmitting || imageUrls.length === 0} 
        className="w-full mt-2 bg-kv-forest hover:bg-kv-forest/90 text-kv-offwhite disabled:bg-kv-sage disabled:text-kv-forest/50"
      >
        <Plus className="h-4 w-4 mr-2" /> {isSubmitting ? "Saving..." : "Save Product"}
      </Button>
    </form>
  );
}