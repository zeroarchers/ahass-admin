import DynamicTable from "@/components/table/dynamic-table";
import { prisma } from "@/lib/prisma";
import { columns } from "@/components/table/columns/tipeKendaraan-columns";
import type { TipeKendaraanWithAHM } from "@/types";

export default async function Page() {
  const data: TipeKendaraanWithAHM[] = await prisma.tipeKendaraan.findMany({
    include: {
      TipeKendaraanAHM: {
        select: {
          kodeTipeKendaraanAHM: true,
        },
      },
    },
  });

  return (
    <>
      <h1 className="font-black text-4xl">Tipe Kendaraan</h1>
      <DynamicTable data={data} columns={columns} />
    </>
  );
}
