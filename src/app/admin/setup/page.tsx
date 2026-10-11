import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { Button } from "@/components/ui/button";

export default async function SetupAdmin() {
  async function createInitialAdmin() {
    "use server";
    // This creates an admin account with the password: my_secure_password_123
    const hashedPassword = await bcrypt.hash("my_secure_password_123", 12);
    
    await prisma.user.upsert({
      where: { email: "admin@konkavenus.com" },
      update: { passwordHash: hashedPassword },
      create: {
        email: "admin@konkavenus.com",
        passwordHash: hashedPassword,
        role: "ADMIN"
      }
    });
  }

  return (
    <div className="p-20 text-center flex flex-col items-center gap-6">
      <h1 className="text-2xl font-bold">Initialize Database</h1>
      <form action={createInitialAdmin}>
        <Button type="submit">Create Admin Account</Button>
      </form>
    </div>
  );
}