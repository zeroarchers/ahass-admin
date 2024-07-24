import JasaTable from "@/components/dynamic-table";
import { prisma } from "@/lib/prisma";
import { columns } from "@/components/tables/jasa-columns";
import type { Jasa } from "@prisma/client";

export default async function Page() {
  const data: Jasa[] = await prisma.jasa.findMany();

  return (
    <>
      <h1 className="font-black text-4xl">Jasa</h1>
      <JasaTable data={data} filterColumn="nama" columns={columns} />
    </>
  );
}
