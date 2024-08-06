import DynamicTable from "@/components/table/dynamic-table";
import { prisma } from "@/lib/prisma";
import { columns } from "@/components/table/columns/pkb-columns";
import type { PKB } from "@prisma/client";

export default async function Page() {
  const data: PKB[] = await prisma.pKB.findMany();
  return (
    <>
      <h1 className="font-black text-4xl">Pembayaran PKB</h1>
      <DynamicTable data={data} columns={columns} />
    </>
  );
}
