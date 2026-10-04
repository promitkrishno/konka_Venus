"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addGalleryImage(imageUrl: string, title: string) {
  await prisma.galleryImage.create({
    data: { imageUrl, title },
  });
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function deleteGalleryImage(id: string) {
  await prisma.galleryImage.delete({
    where: { id },
  });
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function updateGalleryTitle(id: string, title: string) {
  await prisma.galleryImage.update({
    where: { id },
    data: { title },
  });
  revalidatePath("/");
  revalidatePath("/admin");
}