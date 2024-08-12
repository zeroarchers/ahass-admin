import DynamicTable from "@/components/table/dynamic-table-pagination";
import { columns } from "@/components/table/columns/customer-columns";
import type { Customer } from "@prisma/client";
import { getItems } from "@/data/table";

export default async function Page({
  searchParams,
}: {
  searchParams: { page: string; filter: string; filterColumn: string };
}) {
  const page = Number(searchParams.page) || 1;
  const filter = searchParams.filter || "";
  const filterColumn = searchParams.filterColumn || "kodeSparepart";
  const pageSize = 10;

  const { data, totalCount } = await getItems<Customer>(
    "customer",
    page,
    filter,
    filterColumn,
  );

  const pageCount = Math.ceil(totalCount / pageSize);

  return (
    <>
      <h1 className="font-black text-4xl">Customer</h1>
      <DynamicTable
        data={data}
        columns={columns}
        currentPage={page}
        pageCount={pageCount}
        filterColumns={["nama", "kode"]}
      />
    </>
  );
}
