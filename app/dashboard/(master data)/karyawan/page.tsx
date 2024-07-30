import DynamicTable from "@/components/table/dynamic-table";
import { prisma } from "@/lib/prisma";
import { columns } from "@/components/table/columns/karyawan-columns";
import type { Karyawan } from "@prisma/client";

export default async function Page() {
  const data: Karyawan[] = await prisma.karyawan.findMany();

  return (
    <>
      <h1 className="font-black text-4xl">Karyawan</h1>
      <DynamicTable data={data} columns={columns} />
    </>
  );
}
