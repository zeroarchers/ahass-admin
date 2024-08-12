import { prisma } from "@/lib/prisma";

export const getCustomerById = async (kode: string) => {
  try {
    const karyawan = await prisma.customer.findUnique({
      where: {
        kode,
      },
    });
    return karyawan;
  } catch {
    return null;
  }
};

export const getCustomersByName = async (nama: string = "") => {
  try {
    const karyawan = await prisma.customer.findMany({
      where: {
        nama: {
          contains: nama,
          mode: "insensitive",
        },
      },
      select: {
        kode: true,
        nama: true,
        alamat: true,
      },
      take: 10,
    });
    return karyawan;
  } catch {
    return [];
  }
};
