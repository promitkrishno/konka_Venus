"use client";

import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImagePlus, Trash2, Save } from "lucide-react";
import { addGalleryImage, deleteGalleryImage, updateGalleryTitle } from "@/actions/gallery";

interface GalleryImage {
  id: string;
  imageUrl: string;
  title: string | null;
}

export function GalleryManager({ images }: { images: GalleryImage[] }) {
  const [newTitle, setNewTitle] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleSaveTitle = async (id: string) => {
    await updateGalleryTitle(id, editValue);
    setEditingId(null);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Upload Section */}
      <div className="flex gap-4 p-4 bg-white rounded-lg border border-kv-sage">
        <Input 
          placeholder="Photo Title (e.g., Summer Collection)" 
          value={newTitle} 
          onChange={(e) => setNewTitle(e.target.value)} 
          className="bg-white max-w-sm"
        />
        <CldUploadWidget 
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""}
          onSuccess={async (result: any) => {
            if (result?.info?.secure_url) {
              setIsUploading(true);
              await addGalleryImage(result.info.secure_url, newTitle || "Featured Style");
              setNewTitle("");
              setIsUploading(false);
            }
          }}
        >
          {({ open }) => (
            <Button type="button" onClick={() => open()} disabled={isUploading} className="bg-kv-forest hover:bg-kv-forest/90 text-white">
              <ImagePlus className="w-4 h-4 mr-2" />
              {isUploading ? "Uploading..." : "Upload Hero Photo"}
            </Button>
          )}
        </CldUploadWidget>
      </div>

      {/* Modify & Delete Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img) => (
          <div key={img.id} className="flex flex-col bg-white rounded-lg overflow-hidden border border-kv-sage shadow-sm">
            <div className="relative aspect-video bg-kv-sage">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.imageUrl} alt={img.title || "Gallery"} className="w-full h-full object-cover" />
            </div>
            
            <div className="p-4 flex flex-col gap-3">
              {editingId === img.id ? (
                <div className="flex gap-2">
                  <Input value={editValue} onChange={(e) => setEditValue(e.target.value)} className="h-8 text-sm" />
                  <Button size="sm" onClick={() => handleSaveTitle(img.id)} className="bg-kv-terracotta text-white h-8 px-2">
                    <Save className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <p className="font-medium text-kv-forest truncate pr-2">{img.title}</p>
                  <Button variant="outline" size="sm" onClick={() => { setEditingId(img.id); setEditValue(img.title || ""); }} className="h-8 text-xs border-kv-sage">
                    Edit
                  </Button>
                </div>
              )}
              
              <form action={async () => { await deleteGalleryImage(img.id); }}>
                <Button type="submit" variant="ghost" className="w-full text-red-500 hover:bg-red-50 hover:text-red-700 h-8">
                  <Trash2 className="w-4 h-4 mr-2" /> Delete Photo
                </Button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}