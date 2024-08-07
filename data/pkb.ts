import { prisma } from "@/lib/prisma";

export const getpkbById = async (id: string) => {
  try {
    const pkb = await prisma.pKB.findUnique({
      where: {
        no_pkb: id,
      },
      include: {
        jasaPKB: {
          include: {
            jasa: true,
          },
        },
        sparepartPKB: {
          include: {
            sparepart: true,
          },
        },
        kendaraan: true,
      },
    });
    return pkb;
  } catch {
    return null;
  }
};
