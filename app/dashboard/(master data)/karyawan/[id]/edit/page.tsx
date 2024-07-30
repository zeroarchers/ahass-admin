import { KaryawanForm } from "@/components/form/karyawan-form";
import { getKaryawanById } from "@/data/karyawan";

export default async function Page({ params }: { params: { id: number } }) {
  const data = await getKaryawanById(params.id.toString());
  if (!data) return <h1>Data tidak ditemukan</h1>;
  return (
    <>
      <h1 className="font-black text-4xl">Edit Jasa</h1>
      <KaryawanForm initialValues={data} />
    </>
  );
}
