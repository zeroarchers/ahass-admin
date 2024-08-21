import DynamicTable from "@/components/table/dynamic-table";
import { columns } from "@/components/table/columns/jasa-columns";
import { getAllJasa } from "@/data/jasa";

export default async function Page() {
  const data: any = await getAllJasa();

  return (
    <>
      <h1 className="font-black text-4xl">Jasa</h1>
      <DynamicTable data={data} columns={columns} />
    </>
  );
}
