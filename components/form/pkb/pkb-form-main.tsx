import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/ui/combobox";
import { Checkbox } from "@/components/ui/checkbox";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Activity } from "lucide-react";
import { getKendaraanByNoPolisi } from "@/data/kendaraan";

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

export function PkbFormMain({ form }: { form: any }) {
  useEffect(() => {
    const fetchKendaraanData = async () => {
      const noPolisi = form.watch("no_polisi");

      if (noPolisi) {
        try {
          const response = await fetch(
            `/api/kendaraan?no_polisi=${encodeURIComponent(noPolisi)}`,
          );
          if (!response.ok) {
            throw new Error("Failed to fetch kendaraan data");
          }
          const kendaraan = await response.json();
          const nama_pemilik = kendaraan[0].customer.nama;
          const nohp_pemilik = kendaraan[0].customer.nohp;
          const no_mesin = kendaraan[0].no_mesin;
          const tahun_rakit = kendaraan[0].tahun_rakit;
          form.setValue("pemilik", nama_pemilik);
          form.setValue("no_hp", nohp_pemilik);
          form.setValue("no_mesin", no_mesin);
          form.setValue("tahun_motor", tahun_rakit);
        } catch (error) {
          console.error("Error fetching kendaraan data:", error);
        }
      }
    };

    fetchKendaraanData();
  }, [form.watch("no_polisi")]);

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
      <Combobox
        form={form}
        label="No. Polisi"
        name="no_polisi"
        apiEndpoint="/api/kendaraan"
        searchParam="no_polisi"
        itemToComboboxItem={(kendaraan) => ({
          value: kendaraan.no_polisi,
          label: kendaraan.no_polisi,
          description: kendaraan.customer.nama,
        })}
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
