import { KendaraanForm } from "@/components/form/kendaraan/kendaraan-form";
import { getKendaraanByNoPolisi } from "@/data/kendaraan";

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getKendaraanByNoPolisi(params.id);
  if (!data) return <div>Kendaraan tidak ditemukan</div>;
  console.log(data);
  return (
    <>
      <h1 className="font-black text-4xl">Edit Kendaraan</h1>
      <KendaraanForm initialValues={data} />
    </>
  );
}
