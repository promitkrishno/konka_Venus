"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createAppointment(formData: FormData) {
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const date = formData.get("date") as string;
  const notes = formData.get("notes") as string;

  try {
    await prisma.appointment.create({
      data: {
        name,
        phone,
        date: new Date(date),
        notes,
      },
    });

    revalidatePath("/admin"); // Refreshes admin panel to show the new booking
    return { success: true };
  } catch (error) {
    console.error("Booking failed:", error);
    return { success: false };
  }
}