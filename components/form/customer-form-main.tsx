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

export function CustomerMain({ form }: { form: any }) {
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
        <CardTitle>Customer</CardTitle>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-5">
        <div className="grid grid-cols-1 gap-y-3">
          <FormField
            control={form.control}
            name="kode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kode</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih title" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Mr.">Tuan</SelectItem>
                  <SelectItem value="Mrs.">Nyonya</SelectItem>
                  <SelectItem value="Company">Perusahaan</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nama"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="noktp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>No. KTP</FormLabel>
              <FormControl>
                <Input placeholder="Nomor KTP" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pekerjaan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pekerjaan</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih pekerjaan" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Pegawai Negeri">Pegawai Negeri</SelectItem>
                  <SelectItem value="Pegawai Swasta">Pegawai Swasta</SelectItem>
                  <SelectItem value="Ojek">Ojek</SelectItem>
                  <SelectItem value="Wiraswasta Pedagang">
                    Wiraswasta Pedagang
                  </SelectItem>
                  <SelectItem value="Mahasiswa Pelajar">
                    Mahasiswa Pelajar
                  </SelectItem>
                  <SelectItem value="Guru Dosen">Guru Dosen</SelectItem>
                  <SelectItem value="Ibu Rumah Tangga">
                    Ibu Rumah Tangga
                  </SelectItem>
                  <SelectItem value="Dokter">Dokter</SelectItem>
                  <SelectItem value="Pengacara">Pengacara</SelectItem>
                  <SelectItem value="Wartawan">Wartawan</SelectItem>
                  <SelectItem value="TNI Polri">TNI</SelectItem>
                  <SelectItem value="Polri">Polri</SelectItem>
                  <SelectItem value="Petani">Petani</SelectItem>
                  <SelectItem value="Nelayan">Nelayan</SelectItem>
                  <SelectItem value="Lain Lain">Lain-lain</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="agama"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Agama</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih agama" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="islam">Islam</SelectItem>
                  <SelectItem value="kristen">Kristen</SelectItem>
                  <SelectItem value="katolik">Katolik</SelectItem>
                  <SelectItem value="hindu">Hindu</SelectItem>
                  <SelectItem value="buddha">Buddha</SelectItem>
                  <SelectItem value="konghucu">KongHuCu</SelectItem>
                  <SelectItem value="lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tanggal_lahir"
          render={({ field }) => {
            field.value = field.value
              ? field.value.toISOString().split("T")[0]
              : "";
            return (
              <FormItem>
                <FormLabel>Tanggal Lahir</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="nopassport"
          render={({ field }) => (
            <FormItem>
              <FormLabel>No. Passport</FormLabel>
              <FormControl>
                <Input placeholder="Nomor Passport" {...field} />
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
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Provinsi</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    form.setValue("kabupaten", "");
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={field.value ?? `Pilih provinsi karyawan`}
                      />
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
            );
          }}
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
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={field.value ?? `Pilih kabupaten karyawan`}
                    />
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
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={field.value ?? `Pilih kecamatan karyawan`}
                    />
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
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={field.value ?? `Pilih kelurahan karyawan`}
                    />
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
