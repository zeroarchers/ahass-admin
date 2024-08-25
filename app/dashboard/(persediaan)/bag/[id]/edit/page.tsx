import { BAGForm } from "@/components/form/bag-form";
import { getBagById } from "@/data/bag";

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getBagById(params.id);

  console.log(data);
  if (data === null) return <div>PKB tidak ditemukan</div>;

  return (
    <>
      <h1 className="font-black text-4xl">BAG</h1>
      <BAGForm initialValues={data} />
    </>
  );
}
