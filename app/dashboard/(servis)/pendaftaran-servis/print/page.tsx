import { GeneratePDF } from "@/components/misc/invoice-pkb2";

export default async function Page() {
  return (
    <>
      <h1 className="font-black text-4xl">Jasa</h1>
      <GeneratePDF />
    </>
  );
}
