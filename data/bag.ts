import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export const getAllBAG = unstable_cache(async () => {
  return await prisma.bAG.findMany();
});

export const getBagById = async (id: string) => {
  try {
    const bag = await prisma.bAG.findUnique({
      where: {
        noBag: id,
      },
      include: {
        sparepartBAG: {
          include: {
            sparepart: true,
          },
        },
        gudang: true,
      },
    });

    if (!bag) return null;

    return {
      ...bag,
      sparepartBAG: bag.sparepartBAG.map((item) => ({
        quantity: item.quantity,
        sparepart: {
          kodeSparepart: item.sparepart.kodeSparepart,
          aktif: item.sparepart.aktif,
          namaSparepart: item.sparepart.namaSparepart,
          grupSparepart: item.sparepart.grupSparepart,
          hargaLokal: item.sparepart.hargaLokal,
          uom: item.sparepart.uom,
          namaLokalSparepart: item.sparepart.namaLokalSparepart,
          hargaNasional: item.sparepart.hargaNasional,
          grupKodeAHM: item.sparepart.grupKodeAHM,
        },
        namaSparepart: item.sparepart.namaSparepart,
      })),
    };
  } catch (error) {
    console.error("Error fetching BAG:", error);
    return null;
  }
};
