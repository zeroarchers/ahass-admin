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
