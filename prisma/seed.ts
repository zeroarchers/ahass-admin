import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await seedSpareParts();
  await seedJasa();
}

async function seedSpareParts() {
  const spareParts: any[] = [];
  const sparePartFilePath = path.join(__dirname, "sparePart.csv");

  return new Promise<void>((resolve, reject) => {
    fs.createReadStream(sparePartFilePath)
      .pipe(csv())
      .on("data", (row) => {
        spareParts.push({
          id: parseInt(row.id),
          namaSparepart: row.namaSparepart,
          namaLokalSparepart: row.namaLokalSparepart || null,
          kodeSparepart: row.kodeSparepart,
          grupSparepart: row.grupSparepart,
          label: row.label,
          hargaLokal: parseInt(row.hargaLokal),
          hargaNasional: parseInt(row.hargaNasional),
          hargaJual: parseInt(row.hargaJual),
          hargaJualHET: parseInt(row.hargaJualHET),
          uom: row.uom,
          rak: row.rak || null,
          aktif: row.aktif === "true",
          nilaiDiskon: parseInt(row.nilaiDiskon),
          persentaseDiskon: parseInt(row.persentaseDiskon),
          stok: parseInt(row.stok),
          grupKodeAHM: row.grupKodeAHM,
          kategoriETD: row.kategoriETD || null,
          etaTercepat: new Date(row.etaTercepat),
          etaTerlama: new Date(row.etaTerlama),
        });
      })
      .on("end", async () => {
        await prisma.sparePart.createMany({
          data: spareParts,
          skipDuplicates: true,
        });
        console.log("Spare parts data seeded successfully.");
        resolve();
      })
      .on("error", (error) => {
        console.error("Error reading spare parts CSV file:", error);
        reject(error);
      });
  });
}

async function seedJasa() {
  const jasa: any[] = [];
  const jasaFilePath = path.join(__dirname, "jasa.csv");

  return new Promise<void>((resolve, reject) => {
    fs.createReadStream(jasaFilePath)
      .pipe(csv())
      .on("data", (row) => {
        jasa.push({
          kode: row.Kode,
          nama: row.nama,
          jobType: row.JobType,
          jobTypeDesc: row.JobTypeDesc,
          kategoriPekerjaan: row.KategoriPekerjaan,
          hargaJual: parseInt(row.HargaJual),
          waktuKerja: parseInt(row.WaktuKerja),
          satuanKerja: row.SatuanKerja,
          catatan: row.Catatan || null,
          statusAktif: row.StatusAktif,
        });
      })
      .on("end", async () => {
        await prisma.jasa.createMany({
          data: jasa,
          skipDuplicates: true,
        });
        console.log("Jasa data seeded successfully.");
        resolve();
      })
      .on("error", (error) => {
        console.error("Error reading jasa CSV file:", error);
        reject(error);
      });
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
