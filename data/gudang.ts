import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export const getGudangById = async (id: string) => {
  try {
    const gudang = await prisma.gudang.findUnique({
      where: {
        kode: id,
      },
    });
    return gudang;
  } catch {
    return null;
  }
};

export const getAllGudang = unstable_cache(async () => {
  return await prisma.gudang.findMany();
});
