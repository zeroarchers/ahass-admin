import DynamicTable from "@/components/table/dynamic-table-pagination";
import { columns } from "@/components/table/columns/kendaraan-columns";
import { getItems } from "@/data/table";
import { Kendaraan } from "@prisma/client";
import { getAllTipekendaraan } from "@/data/tipe-kendaraan";

export default async function Page({
  searchParams,
}: {
  searchParams: { page: string; filter: string; filterColumn: string };
}) {
  const page = parseInt(searchParams.page) || 1;
  const filter = searchParams.filter || "";
  const filterColumn = searchParams.filterColumn || "kodeSparepart";
  const pageSize = 10;

  const include = {
    customer: {
      select: {
        nama: true,
      },
    },
  };

  const { data, totalCount } = await getItems<Kendaraan>(
    "kendaraan",
    page,
    filter,
    filterColumn,
    include,
  );

  const tipeKendaraanData: any = await getAllTipekendaraan();
  const tipeKendaraanMap = new Map(
    tipeKendaraanData.map((tipe: any) => [tipe.namaTipe, tipe.commercialName]),
  );

  const mergedData: any = data.map((kendaraan) => ({
    ...kendaraan,
    tipeKendaraan: tipeKendaraanMap.get(kendaraan.namaTipeKendaraan) || null,
  }));
  const pageCount = Math.ceil(totalCount / pageSize);

  return (
    <>
      <h1 className="font-black text-4xl">Kendaraan</h1>
      <DynamicTable
        data={mergedData}
        columns={columns}
        currentPage={page}
        pageCount={pageCount}
        filterColumns={["no_polisi", "no_mesin", "no_rangka"]}
      />
    </>
  );
}
