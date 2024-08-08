import DynamicTable from "@/components/table/dynamic-table-pagination";
import { prisma } from "@/lib/prisma";
import { columns } from "@/components/table/columns/bayar-pkb-columns";

import type { PKBWithRelations } from "@/types";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    page: string;
    filter: string;
    filterColumn: string;
    startDate: string;
    endDate: string;
  };
}) {
  const page = parseInt(searchParams.page) || 1;
  const filter = searchParams.filter || "";
  const filterColumn = searchParams.filterColumn || "no_pkb";
  const startDate = searchParams.startDate
    ? new Date(searchParams.startDate)
    : undefined;
  const endDate = searchParams.endDate
    ? new Date(searchParams.endDate)
    : undefined;
  const pageSize = 10;
  const offset = (page - 1) * pageSize;

  let where: any = {};

  if (filter) {
    where[filterColumn] = { contains: filter, mode: "insensitive" };
  }
  where.no_bayar = {
    not: "",
  };
  if (startDate || endDate) {
    where.tanggal = {};
    if (startDate) {
      where.tanggal.gte = startDate;
    }
    if (endDate) {
      where.tanggal.lte = endDate; }
  }

  const data: PKBWithRelations[] = await prisma.pKB.findMany({
    include: {
      jasaPKB: {
        include: {
          jasa: true,
        },
      },
      sparepartPKB: {
        include: {
          sparepart: true,
        },
      },
      kendaraan: true,
    },
    skip: offset,
    take: pageSize,
    where,
    orderBy: {
      tanggal: "desc",
    },
  });

  const totalCount = await prisma.pKB.count({ where });
  const pageCount = Math.ceil(totalCount / pageSize);

  return (
    <>
      <h1 className="font-black text-4xl">Pembayaran PKB</h1>
      <DynamicTable
        data={data}
        columns={columns}
        currentPage={page}
        pageCount={pageCount}
        filterColumns={["no_pkb", "no_polisi", "pemilik", "mekanik"]}
      />
    </>
  );
}
