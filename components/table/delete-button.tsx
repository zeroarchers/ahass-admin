"use client";

import { useState, useTransition } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

type DeleteFunction = (
  id: string,
) => Promise<{ result: string; description: string }>;

interface DeleteButtonProps {
  id: string;
  deleteAction: DeleteFunction;
  onSuccess?: () => void;
}

export default function DeleteButton({
  id,
  deleteAction,
  onSuccess,
}: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const result = await deleteAction(id);
        if (result.result === "Success!") {
          onSuccess?.();
        } else {
          setError(result.description);
        }
      } catch (err) {
        setError("An error occurred while deleting");
      }
    });
  };

  return (
    <DropdownMenuItem onClick={handleDelete} disabled={isPending}>
      {isPending ? "Deleting..." : "Delete"}
      {error && <span className="text-red-500 ml-2">{error}</span>}
    </DropdownMenuItem>
  );
}
