"use server";
import { prisma } from "@/lib/prisma";
import * as z from "zod";

import { pkbFormSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPkb(data: z.infer<typeof pkbFormSchema>) {
  const validatedData = pkbFormSchema.safeParse(data);
  if (!validatedData.success) {
    return { result: "Error!", description: "Input data tidak valid!" };
  }

  console.log("Sucess", validatedData);
  const { jasa, sparepart, no_polisi, ...pkbData } = validatedData.data;

  try {
    // Check if the vehicle exists
    const existingVehicle = await prisma.kendaraan.findFirst({
      where: {
        no_polisi: {
          contains: no_polisi,
        },
      },
    });

    if (!existingVehicle) {
      return {
        result: "Error!",
        description: "Kendaraan dengan No. Polisi tersebut tidak ditemukan!",
      };
    }
    // Create the PKB record
    console.log("Pkb", validatedData.data);
    const newPkb = await prisma.pKB.create({
      data: {
        ...pkbData,
        no_polisi: existingVehicle.no_polisi,
        jasaPKB: {
          create: jasa.map((jasaItem) => ({
            total_harga_jasa: jasaItem.total_harga_jasa,
            harga_jasa: jasaItem.harga_jasa,
            kode_jasa: jasaItem.kode_jasa,
            nama_jasa: jasaItem.nama_jasa,
            tambahan_harga_jasa: jasaItem.tambahan_harga_jasa,
            persentase_diskon: jasaItem.persentase_diskon,
            opl: jasaItem.opl,
          })),
        },
        sparepartPKB: {
          create: sparepart.map((sparepartItem) => ({
            total_harga_sparepart: sparepartItem.total_harga_sparepart,
            harga_sparepart: sparepartItem.harga_sparepart,
            tambahan_harga_sparepart: sparepartItem.tambahan_harga_sparepart,
            persentase_diskon: sparepartItem.persentase_diskon,
            quantity: sparepartItem.quantity,
            nama_sparepart: sparepartItem.nama_sparepart,
            ref_jasa: sparepartItem.ref_jasa,
            kode_sparepart: sparepartItem.sparepart.kodeSparepart,
          })),
        },
      },
    });
    console.log("New PKB", newPkb);
    revalidatePath("/dashboard/pkb");
    redirect("/dashboard/pkb");
  } catch (error) {
    console.error("Error creating PKB:", error);
    return {
      result: "Error!",
      description: "Gagal membuat PKB. Silakan coba lagi.",
    };
  }
}

// export async function updateKendaraan(
//   data: z.infer<typeof kendaraanFormSchema>,
// ) {
//   const validatedData = kendaraanFormSchema.safeParse(data);
//   if (!validatedData.success) {
//     return { result: "Error!", description: "Input data tidak valid!" };
//   }
//
//   await prisma.kendaraan.update({
//     where: {
//       no_polisi: validatedData.data.no_polisi,
//     },
//     data: validatedData.data,
//   });
//   revalidatePath("/dashboard/kendaraan");
//   redirect("/dashboard/kendaraan");
// }
//
// export async function deleteKendaraan(id: string) {
//   const kendaraan_exist = getKendaraanByNoPolisi(id);
//   if (!kendaraan_exist) {
//     return { result: "Error!", description: "Input data tidak valid!" };
//   }
//   await prisma.kendaraan.delete({
//     where: {
//       no_polisi: id,
//     },
//   });
//   revalidatePath("/dashboard/kendaraan");
//   return { result: "Success!", description: "Berhasil menghapus Kendaraan!" };
// }
