"use server";
import { prisma } from "@/lib/prisma";
import * as z from "zod";

import { pkbFormSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  generateNoAntrian,
  generateNoBayar,
  generateNoPkb,
} from "@/lib/generate";

export async function createPkb(data: z.infer<typeof pkbFormSchema>) {
  const validatedData = pkbFormSchema.safeParse(data);
  if (!validatedData.success) {
    return { result: "Error!", description: "Input data tidak valid!" };
  }
  const { jasaPKB, sparepartPKB, no_polisi, no_antrian, no_pkb, ...pkbData } =
    validatedData.data;

  const existingVehicle = await prisma.kendaraan.findFirst({
    where: {
      no_polisi: {
        contains: no_polisi,
        mode: "insensitive",
      },
    },
  });

  if (!existingVehicle) {
    return {
      result: "Error!",
      description: "Kendaraan dengan No. Polisi tersebut tidak ditemukan!",
    };
  }

  const new_no_pkb = await generateNoPkb({ ahassId: "17168" }); // ahass id is manual because it hasn't been implemented yet.
  const new_no_antrian = await generateNoAntrian(pkbData.tipe_antrian);

  await prisma.pKB.create({
    data: {
      ...pkbData,
      no_pkb: no_pkb ?? new_no_pkb,
      no_antrian: no_antrian ?? new_no_antrian,
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

  const {
    jasaPKB,
    sparepartPKB,
    no_polisi,
    no_pkb,
    no_antrian,
    no_bayar,
    ...pkbData
  } = validatedData.data;

  let new_no_bayar: any;

  if (no_pkb) {
    const existingPKB = await prisma.pKB.findUnique({
      where: { no_pkb },
    });
    if (!existingPKB) {
      return {
        result: "Error!",
        description: `PKB record with no_pkb ${no_pkb} not found!`,
      };
    }
    if (existingPKB.status_pkb === "selesai") {
      if (pkbData.uang_kembalian >= 0) {
        new_no_bayar = await generateNoBayar({ ahassId: "17168" });
      } else {
        return {
          result: "Error!",
          description: `Pembayran kurang ${pkbData.uang_kembalian}`,
        };
      }
    }
  }

  await prisma.pKB.update({
    where: {
      no_pkb: no_pkb!,
    },
    data: {
      ...pkbData,
      no_bayar: new_no_bayar ?? no_bayar,
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
  revalidatePath("/dashboard/pembayaran-servis");
  redirect("/dashboard/servis");
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

export async function updatePkbStatus(noPkb: string[], newStatus: string) {
  try {
    await prisma.pKB.updateMany({
      where: { no_pkb: { in: noPkb } },
      data: { status_pkb: newStatus },
    });

    revalidatePath("/dashboard/pendaftaran-servis");
    revalidatePath("/dashboard/pembayaran-servis");
    // return {
    //   result: "Success!",
    //   description: `Berhasil merubah ${noPkb.length} PKB menjadi ${newStatus}!`,
    // };
  } catch (error) {
    console.error("Failed to update PKB status:", error);
    revalidatePath("/dashboard/pendaftaran-servis");
    // return {
    //   result: "Error!",
    //   description: `Gagal merubah ${noPkb.length} PKB menjadi ${newStatus}!`,
    // };
  }
}
