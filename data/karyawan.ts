import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export const getKaryawanById = async (id: string) => {
  try {
    const karyawan = await prisma.karyawan.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    return karyawan;
  } catch {
    return null;
  }
};

export const getAllKaryawan = unstable_cache(async () => {
  return await prisma.karyawan.findMany();
});
