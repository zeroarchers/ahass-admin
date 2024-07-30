import { prisma } from "@/lib/prisma";

export const getSparepartById = async (id: number) => {
  try {
    const sparepart = await prisma.sparePart.findUnique({
      where: {
        id,
      },
    });
    return sparepart;
  } catch {
    return null;
  }
};
