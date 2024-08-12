import { KendaraanForm } from "@/components/form/kendaraan/kendaraan-form";
import { getKendaraanByNoPolisi } from "@/data/kendaraan";

export default async function Page({ params }: { params: { id: string } }) {
  const validNoPolisi = params.id.replace(/-/g, " ").toUpperCase();
  const data = await getKendaraanByNoPolisi(validNoPolisi);
  if (!data) return <div>Kendaraan tidak ditemukan</div>;
  return (
    <>
      <h1 className="font-black text-4xl">Edit Kendaraan</h1>
      <KendaraanForm initialValues={data} />
    </>
  );
}
