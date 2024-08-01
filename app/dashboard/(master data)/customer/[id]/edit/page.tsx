import { CustomerForm } from "@/components/form/customer-form";
import { getCustomerById } from "@/data/customer";

export default async function Page({ params }: { params: { id: number } }) {
  const data = await getCustomerById(params.id.toString());
  if (!data) return <h1>Data tidak ditemukan</h1>;
  return (
    <>
      <h1 className="font-black text-4xl">Edit Jasa</h1>
      <CustomerForm initialValues={data} />
    </>
  );
}
