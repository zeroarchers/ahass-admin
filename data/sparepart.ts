import { prisma } from "@/lib/prisma";

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
