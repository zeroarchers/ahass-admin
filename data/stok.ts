import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export const getAllSparepartsWithStock = unstable_cache(async () => {
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
});
