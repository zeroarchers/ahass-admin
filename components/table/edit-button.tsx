import { usePathname } from "next/navigation";
import Link from "next/link";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function EditButton({ id }: { id: string }) {
  const path = usePathname() + `/${id}/edit/`;
  return (
    <Link href={path}>
      {" "}
      <DropdownMenuItem className="bg-yellow-400">Edit</DropdownMenuItem>
    </Link>
  );
}
