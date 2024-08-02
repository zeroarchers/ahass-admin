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
import { Checkbox } from "@/components/ui/checkbox";

export function KendaraanStnk({ form }: { form: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Kendaraan STNK</CardTitle>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-5">
        <div className="grid grid-cols-1 gap-y-3">
          <Combobox
            form={form}
            label="Pemilik"
            name="kode_pemilik"
            apiEndpoint="/api/customer"
            searchParam="nama"
            itemToComboboxItem={(customer) => ({
              value: customer.kode,
              label: customer.nama,
              description: customer.alamat,
            })}
          />
          <FormField
            control={form.control}
            name="statusAktif"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="items-top flex space-x-2">
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="terms1"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Status Aktif:
                      </label>
                    </div>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="aktif"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="no_polisi"
          render={({ field }) => (
            <FormItem>
              <FormLabel>No. Polisi</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Masukan No. Polisi"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Combobox
          form={form}
          label="Customer"
          name="kode_customer"
          apiEndpoint="/api/customer"
          searchParam="nama"
          itemToComboboxItem={(customer) => ({
            value: customer.kode,
            label: customer.nama,
            description: customer.alamat,
          })}
        />
      </CardContent>
    </Card>
  );
}
