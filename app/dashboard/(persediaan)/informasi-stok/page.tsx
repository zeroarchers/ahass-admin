import DynamicTable from "@/components/table/dynamic-table";
import { columns } from "@/components/table/columns/sparepart-stock-columns";
import { getAllSparepartsWithStock } from "@/data/stok";

export default async function Page() {
  const rawData = await getAllSparepartsWithStock();

  const data = rawData.map((item: any) => ({
    kodeSparepart: item.sparepart.kodeSparepart,
    namaSparepart: item.sparepart.namaSparepart,
    gudang: item.gudang.nama,
    stok: item.quantity,
    hargaLokal: item.sparepart.hargaLokal,
    hargaNasional: item.sparepart.hargaNasional,
  }));

  return (
    <>
      <h1 className="font-black text-4xl">Informasi Stok</h1>
      <DynamicTable data={data} columns={columns} disableCreate />
    </>
  );
}
