"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const category = formData.get("category") as string;
  const imagesRaw = formData.get("images") as string;

  let imagesArray: string[] = [];
  try {
    imagesArray = JSON.parse(imagesRaw);
  } catch (e) {
    console.error("Image parsing failed");
  }

  await prisma.product.create({
    data: {
      name,
      description,
      price,
      category,
      imageUrl: imagesArray[0] || null, // Fallback cover image
      images: JSON.stringify(imagesArray),
    },
  });

  revalidatePath("/admin");
  revalidatePath("/shop");
  revalidatePath("/");
}

// NEW: Delete Product Logic
export async function deleteProduct(id: string) {
  try {
    // We must delete associated order items first to prevent SQLite database locks
    await prisma.orderItem.deleteMany({
      where: { productId: id }
    });

    await prisma.product.delete({
      where: { id },
    });

    revalidatePath("/admin");
    revalidatePath("/shop");
    revalidatePath("/");
  } catch (error) {
    console.error("Failed to delete product:", error);
  }
}