"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const category = formData.get("category") as string;
  const imageUrl = formData.get("imageUrl") as string; // Grabs the uploaded Cloudinary URL

  await prisma.product.create({
    data: {
      name,
      description,
      price,
      category,
      imageUrl: imageUrl || null,
    },
  });

  // Refresh all pages that display inventory
  revalidatePath("/admin");
  revalidatePath("/shop");
  revalidatePath("/");
}