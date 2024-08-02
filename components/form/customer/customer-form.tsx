"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CustomerMain } from "./customer-form-main";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { createCustomer, updateCustomer } from "@/actions/customer";
import { customerFormSchema } from "@/schemas";
import { toast } from "sonner";
import { CircularProgress } from "@/components/misc/circular-progress";
import { CustomerKontak } from "./customer-form-kontak";
import { CustomerAlamat } from "./customer-form-alamat";

interface CustomerFormProps {
  initialValues?: z.infer<typeof customerFormSchema>;
}

export function CustomerForm({ initialValues }: CustomerFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const is_edit = initialValues !== undefined;
  const form = useForm<z.infer<typeof customerFormSchema>>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: initialValues || {
      kode: "",
      status: true,
      title: "",
      nama: "",
      noktp: "",
      pekerjaan: "",
      agama: "",
      tanggal_lahir: new Date(),
      nopassport: "",
      alamat: "",
      provinsi: "",
      kabupaten: "",
      kecamatan: "",
      kelurahan: "",
      kodepos: "",
      notelp: "",
      nohp: "",
      email: "",
      catatan: "",
    },
  });

  async function fetchPlaceName(url: string): Promise<string> {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.name;
    } catch (error) {
      console.error("Error fetching place name:", error);
      return "";
    }
  }

  async function onSubmit(values: z.infer<typeof customerFormSchema>) {
    const isCapitalized = /^[A-Z]+$/.test(values.provinsi);
    const provinsiName = isCapitalized
      ? values.provinsi
      : await fetchPlaceName(
          `https://www.emsifa.com/api-wilayah-indonesia/api/province/${values.provinsi}.json`,
        );
    const kabupatenName = isCapitalized
      ? values.kabupaten
      : await fetchPlaceName(
          `https://www.emsifa.com/api-wilayah-indonesia/api/regency/${values.kabupaten}.json`,
        );
    const kecamatanName = isCapitalized
      ? values.kecamatan
      : await fetchPlaceName(
          `https://www.emsifa.com/api-wilayah-indonesia/api/district/${values.kecamatan}.json`,
        );
    const kelurahanName = isCapitalized
      ? values.kelurahan
      : await fetchPlaceName(
          `https://www.emsifa.com/api-wilayah-indonesia/api/village/${values.kelurahan}.json`,
        );
    const transformedValues = {
      ...values,
      provinsi: provinsiName,
      kabupaten: kabupatenName,
      kecamatan: kecamatanName,
      kelurahan: kelurahanName,
    };
    setIsLoading(true);

    let response: { result: string; description: any };
    if (is_edit) {
      response = await updateCustomer(transformedValues);
    } else {
      response = await createCustomer(transformedValues);
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-5 grid-cols-1"
      >
        <CircularProgress className={isLoading ? "flex" : "hidden"} />
        <CustomerMain form={form} />
        <CustomerKontak form={form} />
        <CustomerAlamat form={form} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
