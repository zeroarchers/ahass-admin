import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";

interface Wilayah {
  id: string;
  name: string;
}
export function KaryawanMain({ form }: { form: any }) {
  const [provinces, setProvinces] = useState<Wilayah[]>([]);
  const [regencies, setRegencies] = useState<Wilayah[]>([]);
  const [districts, setDistricts] = useState<Wilayah[]>([]);
  const [villages, setVillages] = useState<Wilayah[]>([]);
  const selectedProvince = form.watch("provinsi");
  const selectedRegency = form.watch("kabupaten");
  const selectedDistrict = form.watch("kecamatan");

  useEffect(() => {
    if (!selectedProvince && !selectedRegency && !selectedDistrict) {
      fetch("https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json")
        .then((response) => response.json())
        .then((data: Wilayah[]) => setProvinces(data))
        .catch((error) => console.error("Error fetching provinces:", error));
    } else if (selectedProvince && !selectedRegency) {
      fetch(
        `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvince}.json`,
      )
        .then((response) => response.json())
        .then((data: Wilayah[]) => setRegencies(data))
        .catch((error) => console.error("Error fetching regencies:", error));
    } else if (selectedRegency && !selectedDistrict) {
      fetch(
        `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedRegency}.json`,
      )
        .then((response) => response.json())
        .then((data: Wilayah[]) => setDistricts(data))
        .catch((error) => console.error("Error fetching districts:", error));
    } else if (selectedDistrict) {
      fetch(
        `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${selectedDistrict}.json`,
      )
        .then((response) => response.json())
        .then((data: Wilayah[]) => setVillages(data))
        .catch((error) => console.error("Error fetching villages:", error));
    }
  }, [selectedProvince, selectedRegency, selectedDistrict]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Karyawan</CardTitle>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-5">
        <FormField
          control={form.control}
          name="kode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kode</FormLabel>
              <FormControl>
                <Input disabled {...field} />
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
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
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
        <FormField
          control={form.control}
          name="provinsi"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Provinsi</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  form.setValue("kabupaten", "");
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih provinsi karyawan" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {provinces.map((province) => (
                    <SelectItem key={province.id} value={province.id}>
                      {province.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="kabupaten"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kabupaten</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  form.setValue("kecamatan", "");
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kabupaten karyawan" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {regencies.map((regency) => (
                    <SelectItem key={regency.id} value={regency.id}>
                      {regency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="kecamatan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kecamatan</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  form.setValue("kelurahan", "");
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kecamatan karyawan" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {districts.map((district) => (
                    <SelectItem key={district.id} value={district.id}>
                      {district.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="kelurahan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kelurahan</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kelurahan karyawan" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {villages.map((village) => (
                    <SelectItem key={village.id} value={village.id}>
                      {village.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
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
