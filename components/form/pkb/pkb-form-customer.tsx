import React, { useEffect } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Combobox } from "@/components/ui/combobox";

const hubungan_pembawa = [
  "Pemilik",
  "Suami/istri",
  "Anak",
  "Orang tua",
  "Saudara",
  "Kerabat/teman",
  "Supir/atasan",
];

export function PkbFormCustomer({
  form,
  is_edit,
}: {
  form: any;
  is_edit: boolean;
}) {
  const watch_pembawa = form.watch("pembawa");
  useEffect(() => {
    const fetchKendaraanData = async () => {
      if (watch_pembawa && !is_edit) {
        try {
          const response = await fetch(
            `/api/customer?nama=${encodeURIComponent(watch_pembawa)}`,
          );
          if (!response.ok) {
            throw new Error("Failed to fetch kendaraan data");
          }

          const pembawa = await response.json();
          const nohp_pembawa = pembawa[0].nohp;
          const no_ktp_pembawa = pembawa[0].noktp;
          const alamat_ktp_pembawa = pembawa[0].alamat;
          const alamat_domisili_pembawa = pembawa[0].alamatKirim;
          const kota_pembawa = pembawa[0].kabupaten;
          const kecamatan_pembawa = pembawa[0].kecamatan;

          form.setValue("no_hp_pembawa", nohp_pembawa);
          form.setValue("no_ktp_pembawa", no_ktp_pembawa);
          form.setValue("alamat_ktp_pembawa", alamat_ktp_pembawa);
          form.setValue(
            "alamat_domisili_pembawa",
            alamat_domisili_pembawa || alamat_ktp_pembawa,
          );
          form.setValue("kota_pembawa", kota_pembawa);
          form.setValue("kecamatan_pembawa", kecamatan_pembawa);
        } catch (error) {
          console.error("Error fetching kendaraan data:", error);
        }
      }
    };

    fetchKendaraanData();
  }, [form, watch_pembawa]);

  return (
    <>
      <FormField
        control={form.control}
        name="pemilik"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pemilik</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Masukan Nama Pemilik"
                {...field}
                disabled
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="no_hp"
        render={({ field }) => (
          <FormItem>
            <FormLabel>No. HP</FormLabel>
            <FormControl>
              <Input
                disabled
                type="text"
                placeholder="Masukan No. HP"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="no_mesin"
        render={({ field }) => (
          <FormItem>
            <FormLabel>No. Mesin</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Masukan No. Mesin"
                {...field}
                disabled
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="tahun_motor"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tahun Motor</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Masukan Tahun Motor"
                {...field}
                disabled
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Combobox
        form={form}
        label="Nama Pembawa"
        name="pembawa"
        apiEndpoint="/api/customer?"
        searchParam="nama"
        searchedItem="customer"
        itemToComboboxItem={(customer) => ({
          value: customer.nama,
          label: customer.nama,
          description: customer.alamat,
        })}
      />
      <FormField
        control={form.control}
        name="no_hp_pembawa"
        render={({ field }) => (
          <FormItem>
            <FormLabel>No. HP Pembawa</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Masukan No. HP Pembawa"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="no_ktp_pembawa"
        render={({ field }) => (
          <FormItem>
            <FormLabel>No. KTP Pembawa</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Masukan No. KTP Pembawa"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="alamat_ktp_pembawa"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Alamat KTP Pembawa</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Masukan Alamat KTP Pembawa"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="alamat_domisili_pembawa"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Alamat Domisili</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Masukan Alamat Domisili Pembawa"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="kota_pembawa"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Kota Pembawa</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Masukan Kota Pembawa"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="kecamatan_pembawa"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Kecamatan Pembawa</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Masukan Kecamatan Pembawa"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="hubungan_pembawa"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Hubungan Pembawa</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Hubungan Pembawa" />
                </SelectTrigger>
                <SelectContent>
                  {hubungan_pembawa.map((item, id) => (
                    <SelectItem key={id} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
