import { GudangForm } from "@/components/form/gudang-form";
import { getGudangById } from "@/data/gudang";

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getGudangById(params.id);
  if (!data) return <h1>Data tidak ditemukan</h1>;
  return (
    <>
      <h1 className="font-black text-4xl">Gudang</h1>
      <GudangForm initialValues={data} />
    </>
  );
}
