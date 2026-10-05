"use server";

import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

// The secret key used to lock your session
const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || "konka_venus_secret_2026");

export async function loginAdmin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) return { error: "Email and password required." };

  // 1. Find user (Must exist and must have a password)
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.passwordHash) return { error: "Invalid credentials." };

  // 2. Brute-force check
  if (user.lockedUntil && user.lockedUntil > new Date()) {
    return { error: "Account locked. Try again in 15 minutes." };
  }

  // 3. Check password
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    const newAttempts = user.failedLoginAttempts + 1;
    const lockedUntil = newAttempts >= 5 ? new Date(Date.now() + 15 * 60 * 1000) : null;
    
    await prisma.user.update({
      where: { id: user.id },
      data: { failedLoginAttempts: newAttempts, lockedUntil }
    });
    return { error: newAttempts >= 5 ? "Account locked for 15 mins." : "Invalid credentials." };
  }

  // 4. Success! Reset attempts.
  await prisma.user.update({
    where: { id: user.id },
    data: { failedLoginAttempts: 0, lockedUntil: null }
  });

  // 5. Create the Session Token
  const token = await new SignJWT({ userId: user.id, role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(secretKey);

  // 6. Give the browser the cookie
  const cookieStore = await cookies();
  cookieStore.set("admin_jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 8, // 8 hours
    path: "/",
  });

  redirect("/admin");
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_jwt");
  redirect("/admin/login");
}