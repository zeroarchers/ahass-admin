import DynamicTable from "@/components/table/dynamic-table";
import { columns } from "@/components/table/columns/karyawan-columns";
import { getAllKaryawan } from "@/data/karyawan";

export default async function Page() {
  const data: any = await getAllKaryawan();
  return (
    <>
      <h1 className="font-black text-4xl">Karyawan</h1>
      <DynamicTable data={data} columns={columns} />
    </>
  );
}
