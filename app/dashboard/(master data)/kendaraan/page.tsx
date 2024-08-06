import DynamicTable from "@/components/table/dynamic-table-pagination";
import { prisma } from "@/lib/prisma";
import { columns } from "@/components/table/columns/kendaraan-columns";
import type { KendaraanWithDetails } from "@/types";

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

  const kendaraanData = await prisma.kendaraan.findMany({
    include: {
      customer: {
        select: {
          nama: true,
        },
      }, // Include customer data
    },
    skip: offset,
    take: pageSize,
    where,
  });

  const tipeKendaraanData = await prisma.tipeKendaraan.findMany();
  const tipeKendaraanMap = new Map(
    tipeKendaraanData.map((tipe) => [tipe.namaTipe, tipe.commercialName]),
  );

  // Merge TipeKendaraan data with Kendaraan data
  const mergedData: KendaraanWithDetails[] = kendaraanData.map((kendaraan) => ({
    ...kendaraan,
    tipeKendaraan: tipeKendaraanMap.get(kendaraan.namaTipeKendaraan) || null,
  }));
  const totalCount = await prisma.kendaraan.count({ where });
  const pageCount = Math.ceil(totalCount / pageSize);
  console.log(mergedData);

  return (
    <>
      <h1 className="font-black text-4xl">Kendaraan</h1>
      <DynamicTable
        data={mergedData}
        columns={columns}
        currentPage={page}
        pageCount={pageCount}
        filterColumns={["no_polisi", "no_mesin", "no_rangka"]}
      />
    </>
  );
}
