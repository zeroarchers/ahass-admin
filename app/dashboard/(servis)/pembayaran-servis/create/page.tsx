import { PendaftaranForm } from "@/components/form/pkb/pendaftaran-form";

export default async function Page() {
  return (
    <>
      <h1 className="font-black text-4xl">Pembayaran PKB</h1>
      <PendaftaranForm is_pendaftaran={false} />
    </>
  );
}
