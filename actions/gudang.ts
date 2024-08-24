"use server";
import { getGudangById } from "@/data/gudang";
import { prisma } from "@/lib/prisma";
import { gudangFormSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function createGudang(data: z.infer<typeof gudangFormSchema>) {
  const validatedData = gudangFormSchema.safeParse(data);

  if (!validatedData.success) {
    return { result: "Error!", description: "Input data tidak valid!" };
  }
  console.log(validatedData.data);
  await prisma.gudang.create({ data: validatedData.data });
  revalidatePath("/dashboard/gudang");
  redirect("/dashboard/gudang");
}

export async function updateGudang(data: z.infer<typeof gudangFormSchema>) {
  const validatedData = gudangFormSchema.safeParse(data);

  if (!validatedData.success) {
    return { result: "Error!", description: "Input data tidak valid!" };
  }

  await prisma.gudang.update({
    where: {
      kode: data.kode,
    },
    data,
  });
  revalidatePath("/dashboard/gudang");
  redirect("/dashboard/gudang");
}

export async function deleteGudang(kode: string) {
  const gudang_exist = getGudangById(kode);
  if (!gudang_exist) {
    return { result: "Error!", description: "Input data tidak valid!" };
  }

  await prisma.gudang.delete({
    where: {
      kode,
    },
  });
  revalidatePath("/dashboard/gudang");
  return { result: "Success!", description: "Berhasil menghapus gudang!" };
}
