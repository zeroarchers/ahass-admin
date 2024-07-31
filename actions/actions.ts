"use server";
import { prisma } from "@/lib/prisma";
import * as z from "zod";

import {
  jasaFormSchema,
  karyawanFormSchema,
  sparepartFormSchema,
} from "@/schemas";
import { getKaryawanById } from "@/data/karyawan";
import { revalidatePath } from "next/cache";
import { getJasaById } from "@/data/jasa";
import { redirect } from "next/navigation";
import { getSparepartById } from "@/data/sparepart";

export async function createKaryawan(data: z.infer<typeof karyawanFormSchema>) {
  const validatedData = karyawanFormSchema.safeParse(data);

  if (!validatedData.success) {
    return { result: "Error!", description: "Input data tidak valid!" };
  }

  await prisma.karyawan.create({ data: validatedData.data });
  revalidatePath("/dashboard/karyawan");
  redirect("/dashboard/karyawan");
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
  revalidatePath("/dashboard/karyawan");
  redirect("/dashboard/karyawan");
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
  revalidatePath("/dashboard/karyawan");
  return { result: "Success!", description: "Berhasil menghapus Karyawan!" };
}

export async function createJasa(data: z.infer<typeof jasaFormSchema>) {
  const validatedData = jasaFormSchema.safeParse(data);

  if (!validatedData.success) {
    return { result: "Error!", description: "Input data tidak valid!" };
  }

  await prisma.jasa.create({ data: validatedData.data });
  revalidatePath("/dashboard/jasa");
  redirect("/dashboard/jasa");
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
  revalidatePath("/dashboard/jasa");
  redirect("/dashboard/jasa");
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
  revalidatePath("/dashboard/jasa");
  return { result: "Success!", description: "Berhasil menghapus jasa!" };
}

export async function createSparepart(
  data: z.infer<typeof sparepartFormSchema>,
) {
  const validatedData = sparepartFormSchema.safeParse(data);

  if (!validatedData.success) {
    return { result: "Error!", description: "Input data tidak valid!" };
  }

  await prisma.sparePart.create({ data: validatedData.data });
  revalidatePath("/dashboard/sparepart");
  redirect("/dashboard/sparepart");
}

export async function updateSparepart(
  data: z.infer<typeof sparepartFormSchema>,
) {
  const validatedData = sparepartFormSchema.safeParse(data);

  if (!validatedData.success) {
    return { result: "Error!", description: "Input data tidak valid!" };
  }

  await prisma.sparePart.update({
    where: {
      kodeSparepart: data.kodeSparepart,
    },
    data,
  });
  revalidatePath("/dashboard/sparepart");
  redirect("/dashboard/sparepart");
}

export async function deleteSparepart(kode: string) {
  const sparepart_exist = !getSparepartById(kode);
  if (sparepart_exist) {
    return { result: "Error!", description: "Input data tidak valid!" };
  }

  await prisma.sparePart.delete({
    where: {
      kodeSparepart: kode,
    },
  });
  revalidatePath("/dashboard/sparepart");
  return { result: "Success!", description: "Berhasil menghapus sparepart!" };
}
