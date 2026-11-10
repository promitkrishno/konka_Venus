import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@konkavenus.com";
  const password = process.env.ADMIN_INITIAL_PASSWORD || "my_secure_password_123";

  console.log(`\n🔐 Seeding admin user: ${email}`);

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.upsert({
    where: { email },
    update: { passwordHash: hashedPassword, role: "ADMIN" },
    create: {
      email,
      passwordHash: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log(`✅ Admin user ready — id: ${user.id}`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
