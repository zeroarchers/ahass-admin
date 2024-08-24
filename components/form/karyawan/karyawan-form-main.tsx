import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { ComboboxStatic } from "@/components/ui/combobox-static";
import { useLocationSelector } from "@/hooks/use-location-selector";

export function KaryawanMain({ form }: { form: any }) {
  const { provinces, regencies, districts, villages } =
    useLocationSelector(form);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Karyawan</CardTitle>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-5">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Kode</FormLabel>
                <FormControl>
                  <Input disabled={false} {...field} />
                </FormControl>
                <FormMessage />{" "}
                <div className="items-top flex space-x-2">
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms1"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Status Aktif:
                    </label>
                  </div>
                  <Checkbox id="terms1" />
                </div>
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="alamat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alamat</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ComboboxStatic name="provinsi" form={form} items={provinces} />
        <ComboboxStatic name="kabupaten" form={form} items={regencies} />
        <ComboboxStatic name="kecamatan" form={form} items={districts} />
        <ComboboxStatic name="kelurahan" form={form} items={villages} />
        <FormField
          control={form.control}
          name="kodepos"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kode Pos</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notelp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>No. Telp</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nohp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>No. HP</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="col-span-2">
          <FormField
            control={form.control}
            name="catatan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Catatan</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
