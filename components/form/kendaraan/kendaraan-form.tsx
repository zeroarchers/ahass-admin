"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { kendaraanFormSchema } from "@/schemas";
import { toast } from "sonner";
import { CircularProgress } from "@/components/misc/circular-progress";
import { KendaraanStnk } from "./kendaraan-form-stnk";
import { KendaraanTipe } from "./kendaraan-form-tipe";
import { createKendaraan, updateKendaraan } from "@/actions/kendaraan";

interface KendaraanFormProps {
  initialValues?: z.infer<typeof kendaraanFormSchema>;
}

export function KendaraanForm({ initialValues }: KendaraanFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const is_edit = initialValues !== undefined;

  async function onSubmit(values: z.infer<typeof kendaraanFormSchema>) {
    setIsLoading(true);

    let response: { result: string; description: any };

    if (is_edit) {
      response = await updateKendaraan(values);
    } else {
      response = await createKendaraan(values);
    }
    if (response) {
      toast(response.result, {
        description: response.description,
        action: {
          label: "Oke!",
          onClick: () => toast.dismiss,
        },
      });
    }
    setIsLoading(false);
  }
  const form = useForm<z.infer<typeof kendaraanFormSchema>>({
    resolver: zodResolver(kendaraanFormSchema),
    defaultValues: initialValues || {
      kode_pemilik: "",
      statusAktif: false,
      no_polisi: "",
      kode_customer: "",
      namaTipeKendaraan: "",
      warna: "",
      tahun_rakit: "",
      no_rangka: "",
      no_mesin: "",
    },
  });
  console.log(initialValues);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-5 grid-cols-1"
      >
        <KendaraanStnk form={form} is_edit={is_edit} />
        <KendaraanTipe form={form} />
        <CircularProgress className={isLoading ? "flex" : "hidden"} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
