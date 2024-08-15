import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export const getItems = unstable_cache(
  async <T>(
    model: keyof typeof prisma,
    page: number,
    filter: string,
    filterColumn: string,
    include: Record<string, any> = {},
  ): Promise<{ data: T[]; totalCount: number }> => {
    const pageSize = 10;
    const offset = (page - 1) * pageSize;
    const where = filter
      ? { [filterColumn]: { contains: filter, mode: "insensitive" } }
      : {};

    const [data, totalCount] = await prisma.$transaction([
      (prisma[model] as any).findMany({
        skip: offset,
        take: pageSize,
        where,
        ...(include ? { include } : {}),
      }),
      (prisma[model] as any).count({ where }),
    ]);

    return { data, totalCount };
  },
);

export const getItemsWithDate = unstable_cache(
  async <T>(
    model: keyof typeof prisma,
    page: number,
    filter: string,
    filterColumn: string,
    startDate?: Date,
    endDate?: Date,
    additionalWhere: Record<string, any> = {},
  ): Promise<{ data: T[]; totalCount: number }> => {
    const pageSize = 10;
    const offset = (page - 1) * pageSize;
    let where: any = { ...additionalWhere };

    if (filter) {
      where[filterColumn] = { contains: filter, mode: "insensitive" };
    }

    if (startDate || endDate) {
      where.tanggal = {};
      if (startDate) {
        where.tanggal.gte = startDate;
      }
      if (endDate) {
        where.tanggal.lte = endDate;
      }
    }

    const [data, { _count }] = await Promise.all([
      (prisma[model] as any).findMany({
        select: {
          status_pkb: true,
          mekanik: true,
          pemilik: true,
          no_antrian: true,
          no_pkb: true,
          no_polisi: true,
          no_mesin: true,
          tanggal_bayar: true,
          tanggal: true,
          jasaPKB: {
            select: {
              jasa: {
                select: {
                  jobType: true,
                },
              },
            },
          },
          uang_bayar: true,
          tipe_pembayaran: true,
          no_bayar: true,
        },
        skip: offset,
        take: pageSize,
        where,
        orderBy: {
          tanggal: "desc",
        },
      }),
      (prisma[model] as any).aggregate({
        where,
        _count: true,
      }),
    ]);

    return { data, totalCount: _count };
  },
);
