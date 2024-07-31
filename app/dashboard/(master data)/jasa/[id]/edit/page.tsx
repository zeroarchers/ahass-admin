import { JasaForm } from "@/components/form/jasa-form";
import { getJasaById } from "@/data/jasa";

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getJasaById(params.id);
  return (
    <>
      <h1 className="font-black text-4xl">Edit Jasa</h1>
      <JasaForm initialValues={data!} />
    </>
  );
}
