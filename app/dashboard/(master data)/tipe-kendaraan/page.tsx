import DynamicTable from "@/components/table/dynamic-table";
import { columns } from "@/components/table/columns/tipeKendaraan-columns";
import { getAllTipekendaraan } from "@/data/tipe-kendaraan";

export default async function Page() {
  const data: any = await getAllTipekendaraan();

  return (
    <>
      <h1 className="font-black text-4xl">Tipe Kendaraan</h1>
      <DynamicTable data={data} columns={columns} />
    </>
  );
}
