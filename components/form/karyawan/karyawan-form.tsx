"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { KaryawanMain } from "./karyawan-form-main";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { KaryawanBiodata } from "./karyawan-form-biodata";
import { KaryawanStatus } from "./karyawan-form-status";
import { KaryawanGaji } from "./karyawan-form-gaji";
import { createKaryawan, updateKaryawan } from "@/actions/actions";

import { karyawanFormSchema } from "@/schemas";
import { CircularProgress } from "@/components/misc/circular-progress";
import { responseToast } from "@/lib/responseToast";
import { transformLocations } from "@/lib/locationTransformer";

interface KaryawanFormProps {
  initialValues?: z.infer<typeof karyawanFormSchema>;
}

export function KaryawanForm({ initialValues }: KaryawanFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const is_edit = initialValues !== undefined;
  const form = useForm<z.infer<typeof karyawanFormSchema>>({
    resolver: zodResolver(karyawanFormSchema),
    defaultValues: initialValues || {
      name: "",
      email: "",
      agama: "",
      alamat: "",
      berlaku_hingga: new Date(),
      catatan: "",
      gaji_pokok: 0,
      honda_id: "",
      jabatan: "",
      kabupaten: "",
      kecamatan: "",
      kelurahan: "",
      kesehatan: 0,
      id: 100,
      kodepos: "",
      komisi_penjualan: "tidak aktif",
      level_training: "",
      nohp: "",
      noktp: "",
      notelp: "",
      provinsi: "",
      status_karyawan_tetap: "tetap",
      status_kawin: "belum",
      status_kebangsaan: "wni",
      status_pit: "non pit",
      tanggal_berhenti: new Date(),
      tanggal_lahir: new Date(),
      tanggal_masuk: new Date(),
      tempat_lahir: "",
      transport: 0,
      tunjangan_jabatan: 0,
      uang_harian: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof karyawanFormSchema>) {
    setIsLoading(true);

    const transformedValues = await transformLocations(values);

    let response: { result: string; description: any };
    if (is_edit) {
      response = await updateKaryawan(transformedValues);
    } else {
      response = await createKaryawan(transformedValues);
    }

    responseToast({ name: "Karyawan", is_edit, response: response });
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-5 grid-cols-1"
      >
        <CircularProgress className={isLoading ? "flex" : "hidden"} />
        <KaryawanMain form={form} />
        <KaryawanBiodata form={form} />
        <KaryawanStatus form={form} />
        <KaryawanGaji form={form} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
