import DynamicTable from "@/components/table/dynamic-table-pagination";
import { prisma } from "@/lib/prisma";
import { columns } from "@/components/table/columns/customer-columns";
import type { Customer } from "@prisma/client";

export default async function Page({
  searchParams,
}: {
  searchParams: { page: string; filter: string; filterColumn: string };
}) {
  const page = Number(searchParams.page) || 1;
  const filter = searchParams.filter || "";
  const filterColumn = searchParams.filterColumn || "kodeSparepart";
  const pageSize = 10;
  const offset = (page - 1) * pageSize;

  const where = filter
    ? { [filterColumn]: { contains: filter, mode: "insensitive" } }
    : {};
  const data: Customer[] = await prisma.customer.findMany({
    skip: offset,
    take: pageSize,
    where,
  });

  const totalCount = await prisma.customer.count({ where });
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
