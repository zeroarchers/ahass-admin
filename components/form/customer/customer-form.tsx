"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CustomerMain } from "./customer-form-main";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  createCustomer,
  updateCustomer,
  getNewCustomerId,
} from "@/actions/customer";
import { customerFormSchema } from "@/schemas";
import { CircularProgress } from "@/components/misc/circular-progress";
import { CustomerKontak } from "./customer-form-kontak";
import { CustomerAlamat } from "./customer-form-alamat";
import { transformLocations } from "@/lib/locationTransformer";
import { responseToast } from "@/lib/responseToast";

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

  useEffect(() => {
    async function fetchNewCustomerId() {
      const newCustomerId = await getNewCustomerId();
      form.reset({
        ...form.getValues(),
        kode: newCustomerId.toString(),
      });
    }

    if (!initialValues) {
      fetchNewCustomerId();
    }
  }, [initialValues, form]);

  async function onSubmit(values: z.infer<typeof customerFormSchema>) {
    setIsLoading(true);

    const transformedValues = await transformLocations(values);

    let response: { result: string; description: any };

    if (is_edit) {
      response = await updateCustomer(transformedValues);
    } else {
      response = await createCustomer(transformedValues);
    }

    responseToast({ name: "Customer", is_edit, response: response });
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
