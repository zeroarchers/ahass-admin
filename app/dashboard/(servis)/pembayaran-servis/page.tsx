import DynamicTable from "@/components/table/dynamic-table";
import { prisma } from "@/lib/prisma";
import { columns } from "@/components/table/columns/pkb-columns";
import type { Pkb } from "@prisma/client";

export default async function Page() {
  const data: Pkb[] = await prisma.pkb.findMany();
  return (
    <>
      <h1 className="font-black text-4xl">Pembayaran PKB</h1>
      <DynamicTable data={data} columns={columns} />
    </>
  );
}
