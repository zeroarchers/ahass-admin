import { prisma } from "@/lib/prisma";

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
