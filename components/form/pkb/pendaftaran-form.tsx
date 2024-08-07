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
import { createPkb, updatePkb } from "@/actions/pkb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    const validData = {
      ...values,
      jasaPKB: jasaTableData,
      sparepartPKB: sparepartTableData,
    };
    let response: { result: string; description: any };

    if (is_edit) {
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
      dari_dealer_sendiri: false,
      part_bekas_dibawa: false,
      konfirmasi_pergantian_part: true,
      km_sekarang: 0,
      km_berikutnya: 0,
      gudang: "",
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
      no_bayar: "",
      uang_bayar: 0,
      uang_kembalian: 0,
      tipe_pembayaran: "Cash",
    },
  });

  function generateNoAntrian(
    tipeAntrian: string,
    currentQueueCount: number,
  ): string {
    const prefix = tipeAntrian.charAt(0).toUpperCase();
    const queueNumber = (currentQueueCount + 1).toString().padStart(3, "0");
    return `${prefix}${queueNumber}`;
  }

  function generateNoPkbAndBayar(currentPkbCount: number): {
    noPkb: string;
    noBayar: string;
  } {
    const year = new Date().getFullYear().toString().slice(-2);
    const prefixPkb = "17168-PKB";
    const prefixBayar = "17168-SOD";
    const sequenceNumber = currentPkbCount.toString().padStart(6, "0");
    const noPkb = `${prefixPkb}-${year}${sequenceNumber}`;
    const noBayar = `${prefixBayar}-${year}${sequenceNumber}`;
    return { noPkb, noBayar };
  }

  useEffect(() => {
    const fetchCounts = async () => {
      const queueCountResponse = await fetch("/api/pkb/queueCount");
      const pkbCountResponse = await fetch("/api/pkb/pkbCount");

      if (!queueCountResponse.ok) {
        throw new Error("Failed to fetch queue count");
      }
      if (!pkbCountResponse.ok) {
        throw new Error("Failed to fetch pkb count");
      }

      // Parse the JSON from the responses
      const queueCount = await queueCountResponse.json();
      const pkbCount = await pkbCountResponse.json();

      const newNoAntrian = generateNoAntrian(
        form.getValues("tipe_antrian"),
        queueCount,
      );
      const { noPkb, noBayar } = generateNoPkbAndBayar(pkbCount);

      form.setValue("no_antrian", newNoAntrian);
      form.setValue("no_pkb", noPkb);
      form.setValue("no_bayar", noBayar);
    };

    if (is_pendaftaran) fetchCounts();
  }, [form, is_pendaftaran]);

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
      estimasiWaktu += jasa.waktuKerja || 0;
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
      console.log(initialValues.jasaPKB);
      setJasaTableData(initialValues.jasaPKB || []);
      setSparepartTableData(initialValues.sparepartPKB || []);
    }
  }, [initialValues, form]);

  useEffect(() => {
    const currentTime = new Date();
    const estimatedCompletionTime = new Date(
      currentTime.getTime() + jasaCalculations.estimasiWaktu * 60000,
    );
    setEstimasiJamSelesai(estimatedCompletionTime);
  }, [jasaCalculations.estimasiWaktu]);

  const [selectedPkb, setSelectedPkb] = useState("");

  useEffect(() => {
    const fetchPkbData = async () => {
      if (selectedPkb) {
        try {
          const response = await fetch(`/api/pkb?no_pkb=${selectedPkb}`);
          if (response.ok) {
            const pkbData = await response.json();

            form.reset(pkbData);

            setJasaTableData(pkbData.jasaPKB || []);
            setSparepartTableData(pkbData.sparepartPKB || []);
          } else {
            console.error("Failed to fetch PKB data");
          }
        } catch (error) {
          console.error("Error fetching PKB data:", error);
        }
      }
    };

    fetchPkbData();
  }, [selectedPkb, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-5 grid-cols-1"
      >
        <Card>
          <CardHeader></CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-5">
            {!is_pendaftaran && (
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="no_bayar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>No. Bayar</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            {is_pendaftaran ? (
              <FormField
                control={form.control}
                name="no_pkb"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>No. PKB</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <Combobox
                form={form}
                label="No. PKB"
                name="no_pkb"
                apiEndpoint="/api/pkb/all"
                searchParam="no_pkb"
                itemToComboboxItem={(pkb) => ({
                  value: pkb.no_pkb,
                  label: pkb.no_pkb,
                  description: pkb.no_polisi,
                })}
                onSelectItem={(value) => setSelectedPkb(value.value)}
              />
            )}
            <FormField
              control={form.control}
              name="no_antrian"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No. Antrian</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} disabled />
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
            <PkbFormMain form={form} is_pendaftaran={is_pendaftaran} />
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
              {is_pendaftaran ? (
                <div className="grid gap-3">
                  <p>Total Bayar</p>
                  <Badge className="w-fit">
                    Rp.{" "}
                    {totalCalculations.totalBayar.toLocaleString("id-ID", {
                      minimumFractionDigits: 2,
                    })}
                  </Badge>
                </div>
              ) : (
                <div className="grid gap-3">
                  <p>Uang Muka</p>
                  <Badge className="w-fit">
                    Rp.{" "}
                    {form.getValues("uang_muka").toLocaleString("id-ID", {
                      minimumFractionDigits: 2,
                    })}
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
          <div className="flex w-full">
            <Card className="flex flex-grow flex-col justify-center align-center text-center  text-xl bg-primary">
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
            {is_pendaftaran && (
              <Card className="flex flex-grow flex-col justify-center align-center text-center  text-xl bg-primary-foreground">
                <CardHeader className="p-2 font-bold text-primary">
                  Uang Muka
                </CardHeader>
                <CardContent>
                  <Badge className="text-xl">
                    Rp.{" "}
                    {(form.getValues("uang_muka") || 0).toLocaleString(
                      "id-ID",
                      {
                        minimumFractionDigits: 2,
                      },
                    )}
                  </Badge>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        {!is_pendaftaran && (
          <Card>
            <CardHeader>
              <CardTitle>Uang Bayar & Kembalian</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-5 overflow-x-scroll">
              <FormField
                control={form.control}
                name="uang_bayar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Uang Bayar</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="uang_kembalian"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Uang Kembalian</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tipe_pembayaran"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipe Pembayaran</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Tipe Kedatangan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cash">Cash</SelectItem>
                          <SelectItem value="transfer">Transfer</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
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
