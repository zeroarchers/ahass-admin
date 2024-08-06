"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { pkbFormSchema } from "@/schemas";
import { toast } from "sonner";
import { CircularProgress } from "@/components/misc/circular-progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PkbFormMain } from "./pkb-form-main";
import { PkbFormCustomer } from "./pkb-form-customer";
import { PkbFormSurvey } from "./pkb-form-survey";
import { sparepartColumns } from "./pkb-sparepart-columns";
import { jasaColumns } from "./pkb-jasa-columns";
import { GenericPkbTable } from "./pkb-table";
import { SparepartModal } from "./pkb-sparepart-modal";
import { JasaModal } from "./pkb-jasa-modal";
import { Badge } from "@/components/ui/badge";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { Combobox } from "@/components/ui/combobox";
import { createPkb } from "@/actions/pkb";

interface PendaftaranFormProps {
  initialValues?: z.infer<any>;
}

export function PendaftaranForm({ initialValues }: PendaftaranFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const is_edit = initialValues !== undefined;
  const [jasaTableData, setJasaTableData] = useState<any[]>([]);
  const [sparepartTableData, setSparepartTableData] = useState<any[]>([]);
  const [estimasiJamSelesai, setEstimasiJamSelesai] = useState<Date>(
    new Date(),
  );

  async function onSubmit(values: z.infer<typeof pkbFormSchema>) {
    setIsLoading(true);
    const validData = {
      ...values,
      jasa: jasaTableData,
      sparepart: sparepartTableData,
    };
    console.log("Jasa from client", validData.jasa);
    console.log("Sp from client", validData.sparepart);
    await createPkb(validData);
    setIsLoading(false);
  }

  const form = useForm<z.infer<typeof pkbFormSchema>>({
    resolver: zodResolver(pkbFormSchema),
    defaultValues: initialValues || {
      no_pkb: "",
      no_antrian: "",
      no_polisi: "",
      tipe_antrian: "Regular",
      tipe_kedatangan: "Walk-in AHASS / Non Promotion",
      activity_capacity: "Booking Service",
      pemilik: "",
      no_hp: "",
      no_mesin: "",
      tahun_motor: "",
      pembawa: "",
      no_hp_pembawa: "",
      no_ktp_pembawa: "",
      alamat_ktp_pembawa: "",
      alamat_domisili_pembawa: "",
      kota_pembawa: "",
      kecamatan_pembawa: "",
      hubungan_pembawa: "Pemilik",
      alasan_ke_ahass: "",
      dari_dealer_sendiri: "iya",
      part_bekas_dibawa: "tidak",
      km_sekarang: "",
      km_berikutnya: "",
      gudang: "",
      no_stnk: "",
      customer_yang_datang: "Milik",
      keluhan: "",
      gejala: "",
      uang_muka: "0",
      mekanik: "",
      service_advisor: "",
      final_inspector: "",
      indikator_bensin: [50],
      konfirmasi_pergantian_part: "langsung",
      tanggal: new Date(),
      jam_kedatangan_customer: new Date(),
      estimasi_jam_selesai: new Date(),
      jasa: [],
      sparepart: [],
    },
  });
  const jasaCalculations = useMemo(() => {
    let jasaGratis = 0;
    let jasaBayar = 0;
    let estimasiWaktu = 0;

    jasaTableData.forEach((jasa) => {
      console.log(jasa.total_harga_jasa);
      if (jasa.total_harga_jasa === 0) {
        jasaGratis += 1;
      } else {
        jasaBayar += jasa.total_harga_jasa;
      }
      estimasiWaktu += jasa.jasa.waktuKerja || 0;
    });

    return { jasaGratis, jasaBayar, estimasiWaktu };
  }, [jasaTableData]);

  const sparepartCalculations = useMemo(() => {
    let sparepartGratis = 0;
    let sparepartBayar = 0;
    let totalKuantitas = 0;

    sparepartTableData.forEach((sparepart) => {
      const quantity = Number(sparepart.quantity) || 0;
      if (sparepart.total_harga === 0) {
        sparepartGratis += sparepart.total_harga_sparepart;
      } else {
        sparepartBayar += sparepart.total_harga_sparepart;
      }
      totalKuantitas += quantity;
    });

    return { sparepartGratis, sparepartBayar, totalKuantitas };
  }, [sparepartTableData]);

  const totalCalculations = useMemo(() => {
    const subtotalBayar =
      jasaCalculations.jasaBayar + sparepartCalculations.sparepartBayar;
    const discountFinal = 0;
    const totalGratis =
      jasaCalculations.jasaGratis * 18000 +
      sparepartCalculations.sparepartGratis * 1000;
    const ppnPercentage = 11;
    const nilaiPpn = (subtotalBayar - discountFinal) * (ppnPercentage / 100);
    const totalBayar = subtotalBayar - discountFinal + nilaiPpn;

    return {
      subtotalBayar,
      discountFinal,
      totalGratis,
      ppnPercentage,
      nilaiPpn,
      totalBayar,
    };
  }, [jasaCalculations, sparepartCalculations]);

  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
      setJasaTableData(initialValues.tableData || []);
    }
  }, [initialValues, form]);

  useEffect(() => {
    const currentTime = new Date();
    const estimatedCompletionTime = new Date(
      currentTime.getTime() + jasaCalculations.estimasiWaktu * 60000,
    );
    setEstimasiJamSelesai(estimatedCompletionTime);
  }, [jasaCalculations.estimasiWaktu]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-5 grid-cols-1"
      >
        <Card>
          <CardHeader></CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="no_pkb"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No. PKB</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="no_antrian"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No. Antrian</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader></CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-5">
            <PkbFormMain form={form} />
            <PkbFormCustomer form={form} />
            <PkbFormSurvey form={form} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Jasa</CardTitle>
          </CardHeader>
          <CardContent className="grid  gap-5 overflow-x-scroll">
            <GenericPkbTable
              data={jasaTableData}
              setData={setJasaTableData}
              columns={jasaColumns}
              ModalComponent={JasaModal}
            />
          </CardContent>
        </Card>
        <Card className="border-primary">
          <CardContent className="grid md:grid-cols-3 gap-5 pt-6 text-lg">
            <div className="grid text-center gap-2">
              <p>Jasa Gratis</p>
              <Badge className="text-lg w-fit mx-auto">
                {jasaCalculations.jasaGratis} Pcs
              </Badge>
            </div>
            <div className="grid text-center gap-2">
              <p>Jasa Bayar</p>
              <Badge className="text-lg w-fit mx-auto">
                Rp.{" "}
                {jasaCalculations.jasaBayar.toLocaleString("id-ID", {
                  minimumFractionDigits: 2,
                })}
              </Badge>
            </div>
            <div className="grid text-center gap-2">
              <p>Estimasi Waktu Pengerjaan</p>
              <Badge className="text-lg w-fit mx-auto">
                {jasaCalculations.estimasiWaktu} Menit
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sparepart</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-5 overflow-x-scroll">
            <GenericPkbTable
              data={sparepartTableData}
              setData={setSparepartTableData}
              columns={sparepartColumns}
              ModalComponent={(props) => (
                <SparepartModal {...props} jasaData={jasaTableData} />
              )}
            />
          </CardContent>
        </Card>
        <Card className="border-primary">
          <CardContent className="grid md:grid-cols-3 gap-5 pt-6 text-lg">
            <div className="grid text-center gap-2">
              <p>SparePart Gratis</p>
              <Badge className="text-lg w-fit mx-auto">
                {sparepartCalculations.sparepartGratis} Pcs
              </Badge>
            </div>
            <div className="grid text-center gap-2">
              <p>SparePart Bayar</p>
              <Badge className="text-lg w-fit mx-auto">
                Rp.{" "}
                {sparepartCalculations.sparepartBayar.toLocaleString("id-ID", {
                  minimumFractionDigits: 2,
                })}
              </Badge>
            </div>
            <div className="grid text-center gap-2">
              <p>Total Kuantitas</p>
              <Badge className="text-lg w-fit mx-auto">
                {sparepartCalculations.totalKuantitas} pcs
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Uang Muka</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-5 overflow-x-scroll">
            <FormField
              control={form.control}
              name="uang_muka"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Uang Muka</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        <div className="grid md:grid-cols-2 gap-5">
          <Card>
            <CardHeader>
              <CardTitle>Total</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-5 overflow-x-scroll">
              <div className="grid gap-3">
                <p>Subtotal Bayar</p>
                <Badge className="w-fit">
                  Rp.{" "}
                  {totalCalculations.subtotalBayar.toLocaleString("id-ID", {
                    minimumFractionDigits: 2,
                  })}
                </Badge>
              </div>
              <div className="grid gap-3">
                <p>Discount Final</p>
                <Badge className="w-fit">
                  Rp.{" "}
                  {totalCalculations.discountFinal.toLocaleString("id-ID", {
                    minimumFractionDigits: 2,
                  })}
                </Badge>
              </div>
              <div className="grid gap-3">
                <p>Total Gratis</p>
                <Badge className="w-fit">
                  Rp.{" "}
                  {totalCalculations.totalGratis.toLocaleString("id-ID", {
                    minimumFractionDigits: 2,
                  })}
                </Badge>
              </div>
              <div className="grid gap-3">
                <p>PPn</p>
                <Badge className="w-fit">
                  {totalCalculations.ppnPercentage} %
                </Badge>
              </div>
              <div className="grid gap-3">
                <p>Nilai PPn</p>
                <Badge className="w-fit">
                  Rp.{" "}
                  {totalCalculations.nilaiPpn.toLocaleString("id-ID", {
                    minimumFractionDigits: 2,
                  })}
                </Badge>
              </div>
              <div className="grid gap-3">
                <p>Total Bayar</p>
                <Badge className="w-fit">
                  Rp.{" "}
                  {totalCalculations.totalBayar.toLocaleString("id-ID", {
                    minimumFractionDigits: 2,
                  })}
                </Badge>
              </div>
            </CardContent>
          </Card>
          <div className="grid grid-cols-2">
            <Card className="flex flex-col justify-center align-center text-center  text-xl bg-primary">
              <CardHeader className="p-2 font-bold">Est. Biaya</CardHeader>
              <CardContent>
                <Badge className="text-xl bg-primary-foreground text-primary hover:bg-primary-foreground">
                  Rp.{" "}
                  {totalCalculations.totalBayar.toLocaleString("id-ID", {
                    minimumFractionDigits: 2,
                  })}
                </Badge>
              </CardContent>
            </Card>
            <Card className="flex flex-col justify-center align-center text-center  text-xl bg-primary-foreground">
              <CardHeader className="p-2 font-bold text-primary">
                Uang Muka
              </CardHeader>
              <CardContent>
                <Badge className="text-xl">
                  Rp.{" "}
                  {(form.getValues("uang_muka") || 0).toLocaleString("id-ID", {
                    minimumFractionDigits: 2,
                  })}
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>PIC</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-3 gap-5 overflow-x-scroll">
            <Combobox
              form={form}
              label="Mekanik"
              name="mekanik"
              apiEndpoint="/api/karyawan"
              itemToComboboxItem={(karyawan) => ({
                value: karyawan.name,
                label: karyawan.name,
                description: karyawan.jabatan,
                data: karyawan,
              })}
            />
            <Combobox
              form={form}
              label="Service Advisor"
              name="service_advisor"
              apiEndpoint="/api/karyawan"
              itemToComboboxItem={(karyawan) => ({
                value: karyawan.name,
                label: karyawan.name,
                description: karyawan.jabatan,
                data: karyawan,
              })}
            />
            <Combobox
              form={form}
              label="Final Inspector"
              name="final_inspector"
              apiEndpoint="/api/karyawan"
              itemToComboboxItem={(karyawan) => ({
                value: karyawan.name,
                label: karyawan.name,
                description: karyawan.jabatan,
                data: karyawan,
              })}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>ETA</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-5 overflow-x-scroll">
            <FormField
              control={form.control}
              name="estimasi_jam_selesai"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimasi Jam Selesai</FormLabel>
                  <FormControl>
                    <DateTimePicker {...field} value={estimasiJamSelesai} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        <CircularProgress className={isLoading ? "flex" : "hidden"} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
