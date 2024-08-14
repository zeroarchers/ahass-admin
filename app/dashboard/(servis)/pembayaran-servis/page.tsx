import DynamicTable from "@/components/table/dynamic-table-pagination";
import { columns } from "@/components/table/columns/bayar-pkb-columns";

import type { PKBWithRelations } from "@/types";
import { getItemsWithDate } from "@/data/table";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const TableContent = dynamic(
  () => import("@/components/table/table-contents"),
  {
    loading: () => <p>Loading table content...</p>,
  },
);

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

  let where: any = {};

  where.status_pkb = "selesai";

  const { data, totalCount } = await getItemsWithDate<PKBWithRelations>(
    "pKB",
    page,
    filter,
    filterColumn,
    startDate,
    endDate,
    where,
  );

  const pageCount = Math.ceil(totalCount / pageSize);

  return (
    <>
      <h1 className="font-black text-4xl">Pembayaran PKB</h1>
      <Suspense fallback={<div>Loading table...</div>}>
        <TableContent
          data={data}
          columns={columns}
          currentPage={page}
          pageCount={pageCount}
          filterColumns={[
            "no_pkb",
            "no_polisi",
            "pemilik",
            "mekanik",
            "tanggal",
          ]}
        />
      </Suspense>
    </>
  );
}
