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
import { Combobox } from "@/components/ui/combobox";

interface KendaraanTipeFormProps {
  form: any;
}

export function KendaraanTipe({ form }: KendaraanTipeFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tipe Kendaraan</CardTitle>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-5">
        <Combobox
          form={form}
          label="Vehicle Type"
          name="namaTipeKendaraan"
          apiEndpoint="/api/tipe-kendaraan"
          itemToComboboxItem={(vehicleType) => ({
            value: vehicleType.namaTipe,
            label: vehicleType.commercialName,
          })}
        />
        <FormField
          control={form.control}
          name="warna"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Warna</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Masukan Warna" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tahun_rakit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tahun Rakit</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Masukan Tahun Rakit"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="no_rangka"
          render={({ field }) => (
            <FormItem>
              <FormLabel>No. Rangka</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Masukan No. Rangka"
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
                <Input type="text" placeholder="Masukan No. Mesin" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
