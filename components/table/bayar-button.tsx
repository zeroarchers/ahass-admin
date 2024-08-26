import { usePathname } from "next/navigation";
import Link from "next/link";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function BayarButton({
  id,
  terbayar,
}: {
  id: string;
  terbayar: boolean;
}) {
  const path = usePathname() + `/${id}/edit/`;
  const text = terbayar ? "Lihat" : "Bayar/Edit";
  return (
    <Link href={path}>
      {" "}
      <DropdownMenuItem className="bg-green-400 rounded-b-none">
        {text}
      </DropdownMenuItem>
    </Link>
  );
}
