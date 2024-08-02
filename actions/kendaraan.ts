"use server";
import { prisma } from "@/lib/prisma";
import * as z from "zod";

import { kendaraanFormSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getKendaraanByNoPolisi } from "@/data/kendaraan";

export async function createKendaraan(
  data: z.infer<typeof kendaraanFormSchema>,
) {
  const validatedData = kendaraanFormSchema.safeParse(data);
  console.log(validatedData);

  if (!validatedData.success) {
    return { result: "Error!", description: "Input data tidak valid!" };
  }

  await prisma.kendaraan.create({ data: validatedData.data });
  revalidatePath("/dashboard/kendaraan");
  redirect("/dashboard/kendaraan");
}

export async function updateKendaraan(
  data: z.infer<typeof kendaraanFormSchema>,
) {
  const validatedData = kendaraanFormSchema.safeParse(data);
  if (!validatedData.success) {
    return { result: "Error!", description: "Input data tidak valid!" };
  }

  await prisma.kendaraan.update({
    where: {
      no_polisi: validatedData.data.no_polisi,
    },
    data: validatedData.data,
  });
  revalidatePath("/dashboard/kendaraan");
  redirect("/dashboard/kendaraan");
}

export async function deleteKendaraan(id: string) {
  const kendaraan_exist = getKendaraanByNoPolisi(id);
  if (!kendaraan_exist) {
    return { result: "Error!", description: "Input data tidak valid!" };
  }
  await prisma.kendaraan.delete({
    where: {
      no_polisi: id,
    },
  });
  revalidatePath("/dashboard/kendaraan");
  return { result: "Success!", description: "Berhasil menghapus Kendaraan!" };
}
