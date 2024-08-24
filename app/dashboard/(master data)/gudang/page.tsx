import DynamicTable from "@/components/table/dynamic-table";
import { columns } from "@/components/table/columns/gudang-columns";
import { getAllGudang } from "@/data/gudang";

export default async function Page() {
  const data: any = await getAllGudang();

  return (
    <>
      <h1 className="font-black text-4xl">Gudang</h1>
      <DynamicTable data={data} columns={columns} />
    </>
  );
}
