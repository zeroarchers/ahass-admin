import { prisma } from "@/lib/prisma";
import { cache } from "react";

export const getSparepartById = async (kode: string) => {
  try {
    const sparepart = await prisma.sparePart.findFirst({
      where: {
        kodeSparepart: kode,
      },
    });
    return sparepart;
  } catch {
    return null;
  }
};

export const getAllSparepart = cache(async () => {
  const sparepart = await prisma.sparePart.findMany();
  return sparepart;
});
