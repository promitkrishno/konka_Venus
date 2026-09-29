"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createOrder(formData: FormData, cartItems: any[], totalAmount: number) {
  const phone = formData.get("phone") as string;
  const paymentMethod = formData.get("paymentMethod") as string;
  // We'll capture name/address in the form, but for our simple schema, we just need to create the order

  try {
    const order = await prisma.order.create({
      data: {
        totalAmount,
        paymentMethod,
        // We map the Zustand cart items directly to Prisma OrderItems
        items: {
          create: cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            priceAtPurchase: item.price,
            customMeasurements: item.customMeasurements || null,
          })),
        },
      },
    });

    revalidatePath("/admin"); // Refreshes the admin dashboard to show the new order
    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Order creation failed:", error);
    return { success: false };
  }
}