import DynamicTable from "@/components/dynamic-table";
import { prisma } from "@/lib/prisma";
import { columns } from "@/components/tables/pkb-columns";
import type { Pkb } from "@prisma/client";

export default async function Page() {
  const data: Pkb[] = await prisma.pkb.findMany();
  return (
    <>
      <h1 className="font-black text-4xl">Pembayaran PKB</h1>
      <DynamicTable data={data} columns={columns} filterColumn="noPKB" />
    </>
  );
}
