"use client";

import { useState, useRef } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, ImagePlus, X } from "lucide-react";
import { createProduct } from "@/actions/product";

export function AddProductForm() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleAction(formData: FormData) {
    setIsSubmitting(true);
    await createProduct(formData);
    
    // Reset form and image state after successful upload
    formRef.current?.reset();
    setImageUrl("");
    setIsSubmitting(false);
  }

  return (
    <form ref={formRef} action={handleAction} className="flex flex-col gap-4">
      {/* Hidden input strictly for passing the image URL to the Server Action */}
      <input type="hidden" name="imageUrl" value={imageUrl} />

      {/* Cloudinary Drag & Drop Widget */}
      <div>
        <label className="text-sm font-medium text-kv-forest mb-1 block">Product Image</label>
        {imageUrl ? (
          <div className="relative w-full aspect-[3/4] rounded-md overflow-hidden bg-kv-sage border border-kv-sage">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageUrl} alt="Uploaded preview" className="object-cover w-full h-full" />
            <button 
              type="button" 
              onClick={() => setImageUrl("")} 
              className="absolute top-2 right-2 bg-white/90 text-red-500 rounded-full p-1.5 shadow-sm hover:bg-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <CldUploadWidget 
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
            onSuccess={(result: any) => {
              setImageUrl(result?.info?.secure_url);
            }}
          >
            {({ open }) => (
              <div 
                onClick={() => open()}
                className="w-full h-32 border-2 border-dashed border-kv-sage rounded-md flex flex-col items-center justify-center text-kv-olive cursor-pointer hover:bg-kv-sage/30 hover:border-kv-forest transition-colors"
              >
                <ImagePlus className="h-6 w-6 mb-2 text-kv-forest" />
                <span className="text-sm font-medium text-kv-forest">Click to upload image</span>
              </div>
            )}
          </CldUploadWidget>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-kv-forest">Product Name</label>
        <Input name="name" placeholder="e.g., Emerald Saree" required className="mt-1 bg-white" />
      </div>
      
      <div>
        <label className="text-sm font-medium text-kv-forest">Category</label>
        <select name="category" required className="w-full mt-1 flex h-10 rounded-md border border-kv-sage bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-kv-forest text-kv-forest">
          <option value="Sarees">Sarees</option>
          <option value="Kurtis">Kurtis</option>
          <option value="Tops">Tops</option>
          <option value="Bags">Bags</option>
        </select>
      </div>
      
      <div>
        <label className="text-sm font-medium text-kv-forest">Price (৳)</label>
        <Input name="price" type="number" min="0" placeholder="3200" required className="mt-1 bg-white" />
      </div>
      
      <div>
        <label className="text-sm font-medium text-kv-forest">Description</label>
        <textarea name="description" required rows={3} placeholder="Details..." className="w-full mt-1 flex rounded-md border border-kv-sage bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-kv-forest text-kv-forest" />
      </div>
      
      <Button type="submit" disabled={isSubmitting || !imageUrl} className="w-full mt-2 bg-kv-forest hover:bg-kv-forest/90 text-kv-offwhite gap-2 disabled:bg-kv-sage disabled:text-kv-forest/50">
        <Plus className="h-4 w-4" /> {isSubmitting ? "Saving..." : "Save Product"}
      </Button>
    </form>
  );
}