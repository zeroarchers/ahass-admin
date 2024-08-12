import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export const getAllTipekendaraan = unstable_cache(async () => {
  const include = {
    TipeKendaraanAHM: {
      select: {
        kodeTipeKendaraanAHM: true,
      },
    },
  };

  return await prisma.tipeKendaraan.findMany({
    include,
  });
});
