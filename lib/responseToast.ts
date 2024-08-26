"use client";
import { toast } from "sonner";

export function responseToast({
  name,
  response,
  is_edit,
}: {
  name: string;
  response: {
    result: string;
    description: string;
  };
  is_edit: boolean;
}) {
  if (!response) {
    const action = is_edit ? "merubah" : "menambahkan";
    response = {
      result: "Success",
      description: `Berhasil ${action} ${name}`,
    };
  }
  toast(response.result, {
    description: response.description,
    action: {
      label: "Oke!",
      onClick: () => toast.dismiss,
    },
  });
}
