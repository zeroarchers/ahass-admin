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
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { Combobox } from "@/components/ui/combobox";
import { createPkb, updatePkb } from "@/actions/pkb";
import { PkbFormHeader } from "./pkb-form-header";
import {
  calculateJasa,
  calculateSparepart,
  calculateTotal,
  JasaCalculationsCard,
  PembayaranCard,
  SparepartCalculationsCard,
  TotalCalculationsCard,
} from "./pkb-calculations";

interface PendaftaranFormProps {
  initialValues?: z.infer<typeof pkbFormSchema>;
  is_pendaftaran?: boolean;
}

export function PendaftaranForm({
  initialValues,
  is_pendaftaran,
}: PendaftaranFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const is_edit = initialValues !== undefined;
  const [jasaTableData, setJasaTableData] = useState<any[]>([]);
  const [sparepartTableData, setSparepartTableData] = useState<any[]>([]);
  const [estimasiJamSelesai, setEstimasiJamSelesai] = useState<Date>(
    new Date(),
  );

  async function onSubmit(values: any) {
    setIsLoading(true);
    if (!is_pendaftaran) {
      values.tanggal_bayar = new Date();
    }
    const validData = {
      ...values,
      jasaPKB: jasaTableData,
      sparepartPKB: sparepartTableData,
    };
    let response: { result: string; description: any };
    if (is_edit || !is_pendaftaran) {
      response = await updatePkb(validData);
    } else {
      response = await createPkb(validData);
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

  const form = useForm<z.infer<typeof pkbFormSchema>>({
    resolver: zodResolver(pkbFormSchema),
    defaultValues: initialValues || {
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
      alasan_ke_ahass: "Inisiatif Sendiri",
      dari_dealer_sendiri: false,
      part_bekas_dibawa: false,
      konfirmasi_pergantian_part: true,
      km_sekarang: 0,
      km_berikutnya: 0,
      gudang: "GD01",
      no_stnk: "",
      customer_yang_datang: "Milik",
      keluhan: "",
      gejala: "",
      uang_muka: 0,
      mekanik: "",
      service_advisor: "",
      final_inspector: "",
      status_pkb: "menunggu",
      indikator_bensin: [50],
      tanggal: new Date(),
      jam_kedatangan_customer: new Date(),
      estimasi_jam_selesai: new Date(),
      jasaPKB: [],
      sparepartPKB: [],
      uang_bayar: 0,
      uang_kembalian: 0,
      tipe_pembayaran: "cash",
    },
  });

  const uangMuka = form.getValues("uang_muka");
  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
      setJasaTableData(initialValues.jasaPKB || []);
      setSparepartTableData(initialValues.sparepartPKB || []);
    }
  }, [initialValues, form]);

  const jasaCalculations = useMemo(
    () => calculateJasa(jasaTableData),
    [jasaTableData],
  );
  const sparepartCalculations = useMemo(
    () => calculateSparepart(sparepartTableData),
    [sparepartTableData],
  );
  const totalCalculations = useMemo(
    () => calculateTotal(jasaCalculations, sparepartCalculations, uangMuka),
    [jasaCalculations, sparepartCalculations, uangMuka],
  );

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
        <PkbFormHeader
          form={form}
          is_pendaftaran={is_pendaftaran}
          setJasaTableData={setJasaTableData}
          setSparepartTableData={setSparepartTableData}
          is_edit={is_edit}
        />

        <Card>
          <CardHeader></CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-5">
            <PkbFormMain form={form} is_pendaftaran={is_pendaftaran} />
            <PkbFormCustomer form={form} is_edit={is_edit} />
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

        <JasaCalculationsCard jasaCalculations={jasaCalculations} />

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

        <SparepartCalculationsCard
          sparepartCalculations={sparepartCalculations}
        />

        {is_pendaftaran && (
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
        )}

        <TotalCalculationsCard
          is_pendaftaran={is_pendaftaran}
          uangMuka={form.getValues("uang_muka")}
          totalCalculations={totalCalculations}
        />

        {!is_pendaftaran && (
          <PembayaranCard form={form} totalCalculations={totalCalculations} />
        )}

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
        {!is_edit && (
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
        )}
        <CircularProgress className={isLoading ? "flex" : "hidden"} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
