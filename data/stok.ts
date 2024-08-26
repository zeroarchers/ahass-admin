import { prisma } from "@/lib/prisma";
export const getAllSparepartsWithStock = async () => {
  return await prisma.stock.findMany({
    select: {
      quantity: true,
      sparepart: {
        select: {
          kodeSparepart: true,
          namaSparepart: true,
          hargaLokal: true,
          hargaNasional: true,
        },
      },
      gudang: {
        select: {
          nama: true,
        },
      },
    },
  });
};
