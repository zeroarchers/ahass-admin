import { prisma } from "@/lib/prisma";

export const getTipeKendaraanCommercialName = async () => {
  try {
    const kendaraan = await prisma.tipeKendaraan.findMany({
      where: {
        commercialName: {
          not: null,
        },
      },
      select: {
        namaTipe: true,
        commercialName: true,
      },
    });
    return kendaraan;
  } catch {
    return [];
  }
};

export const getKendaraanByNoPolisi = async (id: string) => {
  try {
    const kendaraan = await prisma.kendaraan.findUnique({
      where: {
        no_polisi: id,
      },
    });
    return kendaraan;
  } catch {
    return null;
  }
};
