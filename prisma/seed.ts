import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const users = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    name: "User",
    email: "user@nextmail.com",
    password: "123456",
    image:
      "https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

async function main() {
  const selected_user = users[0];
  const encrypted_password = await bcrypt.hash(selected_user.password, 10);
  console.log(encrypted_password);
  const user = await prisma.user.upsert({
    where: { email: "user@nextmail.com" },
    update: {},
    create: {
      email: selected_user.email,
      name: selected_user.name,
      id: randomUUID(),
      image: selected_user.image,
      password: encrypted_password,
    },
  });
  console.log(user);
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
