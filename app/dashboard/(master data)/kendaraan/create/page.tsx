import { KendaraanForm } from "@/components/form/kendaraan/kendaraan-form";
import { getTipeKendaraanCommercialName } from "@/data/kendaraan";

export default async function Page() {
  return (
    <>
      <h1 className="font-black text-4xl">Kendaraan</h1>
      <KendaraanForm />
    </>
  );
}
