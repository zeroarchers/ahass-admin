"use server";
import { generateNoBag } from "@/lib/generate";
import { prisma } from "@/lib/prisma";

import { BAGFormSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBAG(data: any) {
  const validatedData = BAGFormSchema.safeParse(data);

  if (!validatedData.success) {
    return { result: "Error!", description: "Input data tidak valid!" };
  }
  const { tanggal, gudangId, tipeBagIsIncoming, alasan, sparepartBAG } =
    validatedData.data;

  if (sparepartBAG.length === 0) {
    return { result: "Error!", description: "Sparepart harus diisi!" };
  }

  const noBag = await generateNoBag({ ahassId: "17168" });

  await prisma.bAG.create({
    data: {
      noBag,
      tanggal,
      gudangId,
      tipeBagIsIncoming,
      alasan,
      sparepartBAG: {
        create: sparepartBAG.map((item: any) => ({
          sparepart: {
            connect: { kodeSparepart: item.sparepart.kodeSparepart },
          },
          quantity: item.quantity,
        })),
      },
    },
    include: {
      sparepartBAG: true,
    },
  });

  for (const item of sparepartBAG) {
    await prisma.stock.upsert({
      where: {
        kodeSparepart_gudangId: {
          kodeSparepart: item.sparepart.kodeSparepart,
          gudangId,
        },
      },
      update: {
        quantity: {
          [tipeBagIsIncoming ? "increment" : "decrement"]: item.quantity,
        },
      },
      create: {
        kodeSparepart: item.sparepart.kodeSparepart,
        gudangId,
        quantity: tipeBagIsIncoming ? item.quantity : -item.quantity,
      },
    });
  }
  revalidatePath("/dashboard/bag");
  revalidatePath("/dashboard/informasi-stok");
  redirect("/dashboard/bag");
}
