import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export function KaryawanGaji({ form }: { form: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gaji dan Komisi</CardTitle>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-5">
        <FormField
          control={form.control}
          name="komisi_penjualan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Komisi Penjualan</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih komisi penjualan" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="tidak aktif">Tidak Aktif</SelectItem>
                  <SelectItem value="default master data">
                    Default Master Data
                  </SelectItem>
                  <SelectItem value="semua barang dan jasa">
                    Semua Barang dan Jasa
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gaji_pokok"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gaji Pokok</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Gaji Pokok" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tunjangan_jabatan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tunjangan Jabatan</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Tunjangan Jabatan"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="kesehatan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kesehatan</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Kesehatan" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="transport"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transport</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Transport" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="uang_harian"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Uang Harian</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Uang Harian" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
