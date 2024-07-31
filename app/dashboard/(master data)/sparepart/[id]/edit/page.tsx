import { SparepartForm } from "@/components/form/sparepart-form";
import { getSparepartById } from "@/data/sparepart";

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getSparepartById(params.id);
  return (
    <>
      <h1 className="font-black text-4xl">Edit Sparepart</h1>
      <SparepartForm initialValues={data!} />
    </>
  );
}
