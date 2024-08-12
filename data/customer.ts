import { prisma } from "@/lib/prisma";
import { Customer } from "@prisma/client";
import { unstable_cache } from "next/cache";

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

export const getCustomers = unstable_cache(
  async (
    page: number,
    filter: string,
    filterColumn: string,
  ): Promise<Customer[]> => {
    const pageSize = 10;
    const offset = (page - 1) * pageSize;
    const where = filter
      ? { [filterColumn]: { contains: filter, mode: "insensitive" } }
      : {};

    return prisma.customer.findMany({
      skip: offset,
      take: pageSize,
      where,
    });
  },
);

export const getCustomerCount = unstable_cache(
  async (filter: string, filterColumn: string): Promise<number> => {
    const where = filter
      ? { [filterColumn]: { contains: filter, mode: "insensitive" } }
      : {};

    return prisma.customer.count({ where });
  },
);
