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

export function CustomerAlamat({ form }: { form: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Alamat Kirim</CardTitle>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-5">
        <FormField
          control={form.control}
          name="alamatKirim"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan alamat" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="up"
          render={({ field }) => (
            <FormItem>
              <FormLabel>UP</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan UP" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notelpAlamatKirim"
          render={({ field }) => (
            <FormItem>
              <FormLabel>No. Telp</FormLabel>
              <FormControl>
                <Input
                  placeholder="Masukkan Nomor Telp Alamat Kirim"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
