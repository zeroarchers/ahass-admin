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
  const { jasaPKB, sparepartPKB, no_polisi, ...pkbData } = validatedData.data;

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

  await prisma.pKB.create({
    data: {
      ...pkbData,
      no_polisi: existingVehicle.no_polisi,
      jasaPKB: {
        create: jasaPKB.map((jasaItem) => ({
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
        create: sparepartPKB.map((sparepartItem) => ({
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
  revalidatePath("/dashboard/pendaftaran-servis");
  redirect("/dashboard/pendaftaran-servis");
}

export async function updatePkb(data: z.infer<typeof pkbFormSchema>) {
  const validatedData = pkbFormSchema.safeParse(data);
  if (!validatedData.success) {
    return { result: "Error!", description: "Input data tidak valid!" };
  }

  const { jasaPKB, sparepartPKB, no_polisi, no_pkb, ...pkbData } =
    validatedData.data;

  const existingPKB = await prisma.pKB.findUnique({
    where: { no_pkb },
  });

  if (!existingPKB) {
    return {
      result: "Error!",
      description: `PKB record with no_pkb ${no_pkb} not found!`,
    };
  }

  await prisma.pKB.update({
    where: {
      no_pkb: no_pkb,
    },
    data: {
      ...pkbData,
      jasaPKB: {
        deleteMany: {},
        create: jasaPKB.map((jasaItem) => ({
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
        deleteMany: {},
        create: sparepartPKB.map((sparepartItem) => ({
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

  revalidatePath("/dashboard/pendaftaran-servis");
  redirect("/dashboard/pendaftaran-servis");
}

export async function deletePkb(id: string) {
  try {
    await prisma.pKB.delete({
      where: {
        no_pkb: id,
      },
    });
    revalidatePath("/dashboard/pendaftaran-servis");
    return { result: "Success!", description: "Berhasil menghapus PKB!" };
  } catch (error) {
    return {
      result: "Error!",
      description: "Gagal menghapus PKB. Silakan coba lagi.",
    };
  }
}
