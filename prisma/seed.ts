import { data } from "./tipeKendaraan";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const tipeKendaraanAHMData = [
    ...new Set(
      data.map((item: any) => ({
        idTipeKendaraanAHM: item.idTipeKendaraanAHM,
        kodeTipeKendaraanAHM: item.kodeTipeKendaraanAHM || undefined,
      })),
    ),
  ];

  for (const tipeKendaraanAHM of tipeKendaraanAHMData) {
    await prisma.tipeKendaraanAHM.upsert({
      where: { idTipeKendaraanAHM: tipeKendaraanAHM.idTipeKendaraanAHM },
      update: {},
      create: tipeKendaraanAHM,
    });
  }

  for (const item of data) {
    await prisma.tipeKendaraan.create({
      data: {
        id: item.id,
        idTipeKendaraanAHM: item.idTipeKendaraanAHM,
        tipe: item.tipe,
        namaTipe: item.namaTipe,
        cc: item.cc,
        model: item.model,
        aktif: item.aktif,
      },
    });
  }
}

main()
  .then(() => {
    console.log("Data seeded successfully");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
