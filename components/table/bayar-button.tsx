import { usePathname } from "next/navigation";
import Link from "next/link";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function BayarButton({ id }: { id: string }) {
  const path = usePathname() + `/${id}/edit/`;
  return (
    <Link href={path}>
      {" "}
      <DropdownMenuItem className="bg-green-400 rounded-b-none">
        Bayar
      </DropdownMenuItem>
    </Link>
  );
}
