"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import React from "react";
import { useForm } from "react-hook-form";

import { KaryawanMain } from "./karyawan-form-main";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { KaryawanBiodata } from "./karyawan-form-biodata";
import { KaryawanStatus } from "./karyawan-form-status";
import { KaryawanGaji } from "./karyawan-form-gaji";
import { createKaryawan } from "@/actions/actions";

import type { Karyawan } from "@prisma/client";

export const karyawanFormSchema = z.object({
  kode: z.string().optional(),
  name: z.string().min(5, {
    message: "Nama harus setidaknya 5 karakter.",
  }),
  alamat: z.string().min(5, {
    message: "Alamat harus setidaknya 5 karakter.",
  }),
  provinsi: z.string(),
  kabupaten: z.string(),
  kecamatan: z.string(),
  kelurahan: z.string(),
  kodepos: z.string().min(5, {
    message: "Alamat harus setidaknya 5 karakter.",
  }),
  notelp: z.string().min(5, {
    message: "Alamat harus setidaknya 5 karakter.",
  }),
  nohp: z.string().min(5, {
    message: "Alamat harus setidaknya 5 karakter.",
  }),
  email: z.string().min(5, {
    message: "Alamat harus setidaknya 5 karakter.",
  }),
  catatan: z.string().min(5, {
    message: "Alamat harus setidaknya 5 karakter.",
  }),
  // Biodata
  noktp: z.string(),
  tempat_lahir: z.string(),
  tanggal_lahir: z.coerce.date(),
  gender: z.enum(["L", "P"]),
  agama: z.string(),
  berlaku_hingga: z.coerce.date(),
  status_kawin: z.enum(["belum", "kawin"]),
  status_kebangsaan: z.enum(["wni", "wna"]),
  // Status karyawan
  status_karyawan_tetap: z.enum(["tetap", "tidak tetap"]),
  honda_id: z.string(),
  tanggal_masuk: z.coerce.date(),
  tanggal_berhenti: z.coerce.date(),
  jabatan: z.string(),
  level_training: z.string(),
  status_pit: z.enum(["pit", "non pit"]),
  // Komisi dan gaji
  komisi_penjualan: z.enum([
    "tidak aktif",
    "default master data",
    "semua barang dan jasa",
  ]),
  gaji_pokok: z.coerce.number(),
  tunjangan_jabatan: z.coerce.number(),
  kesehatan: z.coerce.number(),
  transport: z.coerce.number(),
  uang_harian: z.coerce.number(),
});

export function ProfileForm() {
  const form = useForm<z.infer<typeof karyawanFormSchema>>({
    resolver: zodResolver(karyawanFormSchema),
    defaultValues: {
      name: "",
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

  async function onSubmit(values: z.infer<typeof karyawanFormSchema>) {
    const provinsiName = await fetchPlaceName(
      `https://www.emsifa.com/api-wilayah-indonesia/api/province/${values.provinsi}.json`,
    );
    const kabupatenName = await fetchPlaceName(
      `https://www.emsifa.com/api-wilayah-indonesia/api/regency/${values.kabupaten}.json`,
    );
    const kecamatanName = await fetchPlaceName(
      `https://www.emsifa.com/api-wilayah-indonesia/api/district/${values.kecamatan}.json`,
    );
    const kelurahanName = await fetchPlaceName(
      `https://www.emsifa.com/api-wilayah-indonesia/api/village/${values.kelurahan}.json`,
    );
    const transformedValues: Omit<Karyawan, "id"> = {
      ...values,
      provinsi: provinsiName,
      kabupaten: kabupatenName,
      kecamatan: kecamatanName,
      kelurahan: kelurahanName,
    };
    await createKaryawan(transformedValues);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-5 grid-cols-1"
      >
        <KaryawanMain form={form} />
        <KaryawanBiodata form={form} />
        <KaryawanStatus form={form} />
        <KaryawanGaji form={form} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
