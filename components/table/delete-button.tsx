"use client";

import { useTransition } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

type DeleteFunction = (
  id: string,
) => Promise<{ result: string; description: string }>;

interface DeleteButtonProps {
  id: string;
  deleteAction: DeleteFunction;
  onSuccess?: () => void;
}

export default function DeleteButton({ id, deleteAction }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const response = await deleteAction(id);
      toast(response.result, {
        description: response.description,
        action: {
          label: "Oke!",
          onClick: () => toast.dismiss,
        },
      });
    });
  };

  return (
    <DropdownMenuItem
      className="bg-red-600 rounded-t-none"
      onClick={handleDelete}
      disabled={isPending}
    >
      {isPending ? "Deleting..." : "Delete"}
    </DropdownMenuItem>
  );
}
