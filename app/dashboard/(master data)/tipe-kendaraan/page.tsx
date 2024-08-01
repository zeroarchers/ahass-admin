import DynamicTable from "@/components/table/dynamic-table-pagination";
import { prisma } from "@/lib/prisma";
import { columns } from "@/components/table/columns/tipeKendaraan-columns";
import type { TipeKendaraanWithAHM } from "@/types";

export default async function Page({
  searchParams,
}: {
  searchParams: { page: string; filter: string; filterColumn: string };
}) {
  const page = parseInt(searchParams.page) || 1;
  const filter = searchParams.filter || "";
  const filterColumn = searchParams.filterColumn || "kodeSparepart";
  const pageSize = 10;
  const offset = (page - 1) * pageSize;

  const where = filter
    ? { [filterColumn]: { contains: filter, mode: "insensitive" } }
    : {};

  const data: TipeKendaraanWithAHM[] = await prisma.tipeKendaraan.findMany({
    include: {
      TipeKendaraanAHM: {
        select: {
          kodeTipeKendaraanAHM: true,
        },
      },
    },
    skip: offset,
    take: pageSize,
    where,
  });

  const totalCount = await prisma.tipeKendaraan.count({ where });
  const pageCount = Math.ceil(totalCount / pageSize);

  return (
    <>
      <h1 className="font-black text-4xl">Tipe Kendaraan</h1>
      <DynamicTable
        data={data}
        columns={columns}
        currentPage={page}
        pageCount={pageCount}
        filterColumns={["tipe", "namaTipe"]}
      />
    </>
  );
}
