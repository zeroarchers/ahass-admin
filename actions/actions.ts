"use server";
import { prisma } from "@/lib/prisma";
import * as z from "zod";

import { jasaFormSchema, karyawanFormSchema } from "@/schemas";
import { getKaryawanById } from "@/data/karyawan";
import { revalidatePath } from "next/cache";
import { getJasaById } from "@/data/jasa";

export async function createKaryawan(data: z.infer<typeof karyawanFormSchema>) {
  const validatedData = karyawanFormSchema.safeParse(data);

  if (!validatedData.success) {
    return { result: "Error!", description: "Input data tidak valid!" };
  }

  await prisma.karyawan.create({ data: validatedData.data });
  revalidatePath("/karyawan");
  return { result: "Success!", description: "Berhasil menambahkan Karyawan!" };
}

export async function updateKaryawan(data: z.infer<typeof karyawanFormSchema>) {
  const validatedData = karyawanFormSchema.safeParse(data);
  if (!validatedData.success) {
    return { result: "Error!", description: "Input data tidak valid!" };
  }

  await prisma.karyawan.update({
    where: {
      id: validatedData.data.id,
    },
    data: validatedData.data,
  });
  revalidatePath("/karyawan");
  return { result: "Success!", description: "Berhasil menambahkan Karyawan!" };
}

export async function deleteKaryawan(id: string) {
  const karyawan_exist = !getKaryawanById(id);
  if (karyawan_exist) {
    return { result: "Error!", description: "Input data tidak valid!" };
  }

  await prisma.karyawan.delete({
    where: {
      id: parseInt(id),
    },
  });
  revalidatePath("/karyawan");
  return { result: "Success!", description: "Berhasil menambahkan Karyawan!" };
}

export async function createJasa(data: z.infer<typeof jasaFormSchema>) {
  const validatedData = jasaFormSchema.safeParse(data);

  if (!validatedData.success) {
    return { result: "Error!", description: "Input data tidak valid!" };
  }

  await prisma.jasa.create({ data: validatedData.data });
  revalidatePath("/jasa");
  return { result: "Success!", description: "Berhasil menambahkan Jasa!" };
}

export async function updateJasa(data: z.infer<typeof jasaFormSchema>) {
  const validatedData = jasaFormSchema.safeParse(data);

  if (!validatedData.success) {
    return { result: "Error!", description: "Input data tidak valid!" };
  }

  await prisma.jasa.update({
    where: {
      kode: data.kode,
    },
    data,
  });
  revalidatePath("/jasa");
  return { result: "Success!", description: "Berhasil memperbarui Jasa!" };
}

export async function deleteJasa(kode: string) {
  const jasa_exist = !getJasaById(kode);
  if (jasa_exist) {
    return { result: "Error!", description: "Input data tidak valid!" };
  }

  await prisma.jasa.delete({
    where: {
      kode,
    },
  });
  revalidatePath("/jasa");
  return { result: "Success!", description: "Berhasil menambahkan Karyawan!" };
}
