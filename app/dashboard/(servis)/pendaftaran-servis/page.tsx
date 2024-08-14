import { columns } from "@/components/table/columns/pendaftaran-pkb-columns";

import type { PKBWithRelations } from "@/types";
import { getItemsWithDate } from "@/data/table";
import { updatePkbStatus } from "@/actions/pkb";
import { Suspense } from "react";
import dynamic from "next/dynamic";

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

  const { data, totalCount } = await getItemsWithDate<PKBWithRelations>(
    "pKB",
    page,
    filter,
    filterColumn,
    startDate,
    endDate,
  );

  const pageCount = Math.ceil(totalCount / pageSize);

  const statusButtons = [
    { label: "Proses", action: "proses" },
    { label: "Pause", action: "menunggu" },
    { label: "Selesai", action: "selesai" },
    { label: "Batal Setelah Service", action: "batal" },
    { label: "Batal PKB", action: "batal" },
  ];

  async function handleStatusChange(action: string, selectedIds: string[]) {
    "use server";
    console.log(action, selectedIds);
    await updatePkbStatus(selectedIds, action);
  }

  return (
    <>
      <h1 className="font-black text-4xl">Pendaftaran PKB</h1>
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
          statusButtons={statusButtons}
          onStatusChange={handleStatusChange}
        />
      </Suspense>
    </>
  );
}
