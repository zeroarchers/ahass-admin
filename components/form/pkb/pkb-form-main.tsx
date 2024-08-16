import React, { useEffect } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Combobox } from "@/components/ui/combobox";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const tipe_antrian = ["Regular", "Claim", "Fast Track", "Express", "Booking"];

const tipe_kedatangan = [
  "Walk-in AHASS / Non Promotion",
  "Pit Express",
  "Pos Service",
  "Service Kunjung Motor/Emergency",
  "Service Kunjung Mobil",
  "Service Kunjung Tenda",
  "Join Dealer Activity",
  "Group Customer",
  "Pit Express Tenda",
  "Service Reminder",
  "Public Area",
  "AHASS Event (AHM)",
  "AHASS Event (MD)",
  "AHASS Event (D)",
  "AHASS Keliling",
  "Service Visit Home Service",
  "Pit Express Outdoor",
  "Pit Express Indoor",
];

const activity_capacity = ["Booking Service", "Happy Hour", "Lain Lain"];

export function PkbFormMain({
  form,
  is_pendaftaran,
}: {
  form: any;
  is_pendaftaran?: boolean;
}) {
  const watch_no_polisi = form.watch("no_polisi");
  useEffect(() => {
    const fetchKendaraanData = async () => {
      if (watch_no_polisi) {
        try {
          const response = await fetch(
            `/api/kendaraan?no_polisi=${encodeURIComponent(watch_no_polisi)}`,
          );
          if (!response.ok) {
            throw new Error("Failed to fetch kendaraan data");
          }
          const kendaraan = await response.json();
          const nama_pemilik = kendaraan[0].pemilik.nama;
          const nohp_pemilik = kendaraan[0].pemilik.nohp;
          const no_mesin = kendaraan[0].no_mesin;
          const tahun_rakit = kendaraan[0].tahun_rakit;
          const nama_pembawa = kendaraan[0].customer.nama;
          form.setValue("pemilik", nama_pemilik);
          form.setValue("no_hp", nohp_pemilik);
          form.setValue("no_mesin", no_mesin);
          form.setValue("tahun_motor", tahun_rakit);
          form.setValue("pembawa", nama_pembawa);
        } catch (error) {
          console.error("Error fetching kendaraan data:", error);
        }
      }
    };

    fetchKendaraanData();
  }, [form, watch_no_polisi]);

  return (
    <>
      <FormField
        control={form.control}
        name="tanggal"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tanggal</FormLabel>
            <FormControl>
              <DateTimePicker {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {is_pendaftaran ? (
        <FormField
          control={form.control}
          name="jam_kedatangan_customer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jam kedatangan customer</FormLabel>
              <FormControl>
                <DateTimePicker {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ) : (
        <FormField
          control={form.control}
          name="status_pkb"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status PKB</FormLabel>
              <FormControl>
                <RadioGroup
                  value={field.value}
                  className="grid grid-cols-2 gap-3"
                  onValueChange={field.onChange}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="menunggu" id="menunggu" />
                    <Label htmlFor="menunggu">Menunggu</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="selesai" id="selesai" />
                    <Label htmlFor="selesai">Selesai</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="booking" id="booking" />
                    <Label htmlFor="booking">Booking</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="proses" id="proses" />
                    <Label htmlFor="proses">Proses</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="batal" id="batal" />
                    <Label htmlFor="batal">Batal</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      <Combobox
        form={form}
        label="No. Polisi"
        name="no_polisi"
        apiEndpoint="/api/kendaraan"
        searchParam="no_polisi"
        itemToComboboxItem={(kendaraan) => {
          return {
            value: kendaraan.no_polisi,
            label: kendaraan.no_polisi,
            description: kendaraan.customer.nama,
          };
        }}
      />
      <FormField
        control={form.control}
        name="tipe_antrian"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tipe Antrian</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Tipe Antrian" />
                </SelectTrigger>
                <SelectContent>
                  {tipe_antrian.map((tipe, id) => (
                    <SelectItem key={id} value={tipe}>
                      {tipe}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="tipe_kedatangan"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tipe Kedatangan</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Tipe Kedatangan" />
                </SelectTrigger>
                <SelectContent>
                  {tipe_kedatangan.map((item, id) => (
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
      <FormField
        control={form.control}
        name="activity_capacity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Activity Capacity</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Tipe Antrian" />
                </SelectTrigger>
                <SelectContent>
                  {activity_capacity.map((item, id) => (
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
