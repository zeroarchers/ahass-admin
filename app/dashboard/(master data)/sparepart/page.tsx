import DynamicTable from "@/components/table/dynamic-table";
import { prisma } from "@/lib/prisma";
import { columns } from "@/components/table/columns/sparepart-columns";
import type { SparePart } from "@prisma/client";

export default async function Page() {
  const data: SparePart[] = await prisma.sparePart.findMany();

  return (
    <>
      <h1 className="font-black text-4xl">Sparepart</h1>
      <DynamicTable data={data} columns={columns} />
    </>
  );
}
