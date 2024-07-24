import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.jasa.deleteMany(); // Deletes all records in the Jasa table
  await prisma.sparePart.deleteMany(); // Deletes all records in the Jasa table
  console.log("All records deleted from Jasa table");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
