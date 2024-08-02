import { CustomerForm } from "@/components/form/customer/customer-form";

export default async function Page() {
  return (
    <>
      <h1 className="font-black text-4xl">Customer</h1>
      <CustomerForm />
    </>
  );
}
