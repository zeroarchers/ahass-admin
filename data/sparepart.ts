import { prisma } from "@/lib/prisma";
import { SparePart } from "@prisma/client";
import { unstable_cache } from "next/cache";

export const getSparepartById = async (kode: string) => {
  try {
    const sparepart = await prisma.sparePart.findFirst({
      where: {
        kodeSparepart: kode,
      },
    });
    return sparepart;
  } catch {
    return null;
  }
};

export const getSpareparts = unstable_cache(
  async (
    page: number,
    filter: string,
    filterColumn: string,
  ): Promise<SparePart[]> => {
    const pageSize = 10;
    const offset = (page - 1) * pageSize;
    const where = filter
      ? { [filterColumn]: { contains: filter, mode: "insensitive" } }
      : {};

    return prisma.sparePart.findMany({
      skip: offset,
      take: pageSize,
      where,
    });
  },
);

export const getSparepartsCount = unstable_cache(
  async (filter: string, filterColumn: string): Promise<number> => {
    const where = filter
      ? { [filterColumn]: { contains: filter, mode: "insensitive" } }
      : {};

    return prisma.sparePart.count({ where });
  },
);
