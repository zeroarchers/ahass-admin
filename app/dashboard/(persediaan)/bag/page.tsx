import DynamicTable from "@/components/table/dynamic-table";
import { columns } from "@/components/table/columns/bag-columns";
import { getAllJasa } from "@/data/jasa";

export default async function Page() {
  const data: any = await getAllJasa();

  return (
    <>
      <h1 className="font-black text-4xl">BAG</h1>
      <DynamicTable data={data} columns={columns} />
    </>
  );
}
