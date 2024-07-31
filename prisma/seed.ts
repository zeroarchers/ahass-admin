import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  const dataPath = path.join(__dirname, "spareparts.json");
  const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

  await prisma.sparePart.createMany({
    data: data,
    skipDuplicates: true,
  });

  console.log("Data seeding completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
