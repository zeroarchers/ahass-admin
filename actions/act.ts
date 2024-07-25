"use server";
import { prisma } from "@/lib/prisma";

export async function createKaryawan(formData: FormData) {
  // Convert FormData to a plain object
  const data = Object.fromEntries(formData.entries()) as Record<
    string,
    FormDataEntryValue
  >;

  // Helper function to parse dates
  const parseDate = (value: FormDataEntryValue): Date | null => {
    if (typeof value === "string") {
      return value ? new Date(value) : null;
    }
    return null;
  };

  // Helper function to parse numbers
  const parseFloatOrNull = (value: FormDataEntryValue): number | null => {
    if (typeof value === "string") {
      const numberValue = parseFloat(value);
      return isNaN(numberValue) ? null : numberValue;
    }
    return null;
  };

  // Transform data to match the Prisma schema
  const karyawanData = {
    name: data.name as string,
    alamat: data.alamat as string,
    provinsi: data.provinsi as string,
    kabupaten: data.kabupaten as string,
    kecamatan: data.kecamatan as string,
    kelurahan: data.kelurahan as string,
    kodepos: data.kodepos as string,
    notelp: data.notelp as string,
    nohp: data.nohp as string,
    email: data.email as string,
    catatan:
      data.catatan && typeof data.catatan === "string" ? data.catatan : null,
    noktp: data.noktp as string,
    tempat_lahir: data.tempat_lahir as string,
    tanggal_lahir: parseDate(data.tanggal_lahir),
    gender: data.gender as string,
    agama: data.agama as string,
    berlaku_hingga: parseDate(data.berlaku_hingga),
    status_kawin:
      data.status_kawin && typeof data.status_kawin === "string"
        ? data.status_kawin
        : null,
    status_kebangsaan:
      data.status_kebangsaan && typeof data.status_kebangsaan === "string"
        ? data.status_kebangsaan
        : null,
    status_karyawan_tetap:
      data.status_karyawan_tetap &&
      typeof data.status_karyawan_tetap === "string"
        ? data.status_karyawan_tetap
        : null,
    honda_id:
      data.honda_id && typeof data.honda_id === "string" ? data.honda_id : null,
    tanggal_masuk: parseDate(data.tanggal_masuk),
    tanggal_berhenti: parseDate(data.tanggal_berhenti),
    jabatan:
      data.jabatan && typeof data.jabatan === "string" ? data.jabatan : null,
    level_training:
      data.level_training && typeof data.level_training === "string"
        ? data.level_training
        : null,
    status_pit:
      data.status_pit && typeof data.status_pit === "string"
        ? data.status_pit
        : null,
    komisi_penjualan:
      data.komisi_penjualan && typeof data.komisi_penjualan === "string"
        ? data.komisi_penjualan
        : null,
    gaji_pokok: parseFloatOrNull(data.gaji_pokok),
    tunjangan_jabatan: parseFloatOrNull(data.tunjangan_jabatan),
    kesehatan: parseFloatOrNull(data.kesehatan),
    transport: parseFloatOrNull(data.transport),
    uang_harian: parseFloatOrNull(data.uang_harian),
  };

  console.log(karyawanData);
  try {
    const newKaryawan = await prisma.karyawan.create({
      data: karyawanData,
    });
    console.log("Karyawan created:", newKaryawan);
  } catch (error) {
    console.error("Error creating Karyawan:", error);
  }
}
