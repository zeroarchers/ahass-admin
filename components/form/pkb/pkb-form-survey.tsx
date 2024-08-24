import React, { useEffect, useState } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { generateHistoryPDF } from "@/components/misc/history-pkb";
import { toast } from "sonner";

const alasan_ke_ahass = [
  "Inisiatif Sendiri",
  "SMS",
  "Telpon",
  "Undangan",
  "Sticker",
  "Promosi",
  "Buku KPB",
];

export function PkbFormSurvey({ form }: { form: any }) {
  const watch_km_sekarang = form.watch("km_sekarang");

  const [gudangItems, setGudangItems] = useState([]);

  useEffect(() => {
    const fetchGudang = async () => {
      try {
        const response = await fetch("/api/gudang");
        if (!response.ok) {
          throw new Error("Failed to fetch gudang data");
        }
        const data = await response.json();
        setGudangItems(data);

        if (data.length > 0) {
          form.setValue("gudang", data[0].kode);
          console.log("Set gudang to:", data[0].kode);
        }
      } catch (error) {
        console.error("Error fetching gudang data:", error);
      }
    };

    fetchGudang();
  }, [form]);

  useEffect(() => {
    if (watch_km_sekarang) {
      const kmBerikutnya = parseInt(watch_km_sekarang, 10) + 2000;
      form.setValue("km_berikutnya", kmBerikutnya);
    }
  }, [watch_km_sekarang, form]);

  return (
    <>
      <FormField
        control={form.control}
        name="alasan_ke_ahass"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Alasan ke ahass</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Alasan Ke Ahass" />
                </SelectTrigger>
                <SelectContent>
                  {alasan_ke_ahass.map((item, id) => (
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
        name="dari_dealer_sendiri"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Dari Dealer Sendiri</FormLabel>
            <FormControl>
              <RadioGroup
                value={field.value ? "true" : "false"}
                onValueChange={field.onChange}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="iya" />
                  <Label htmlFor="iya">Ya</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="tidak" />
                  <Label htmlFor="tidak">Tidak</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="konfirmasi_pergantian_part"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Konfirmasi Pergantian Part</FormLabel>
            <FormControl>
              <RadioGroup
                value={field.value ? "true" : "false"}
                onValueChange={field.onChange}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="langsung" />
                  <Label htmlFor="langsung">Langsung</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="konfirmasi" />
                  <Label htmlFor="konfirmasi">Konfirmasi</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="part_bekas_dibawa"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Part Bekas Dibawa Pulang</FormLabel>
            <FormControl>
              <RadioGroup
                value={field.value ? "true" : "false"}
                onValueChange={field.onChange}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="iya" />
                  <Label htmlFor="iya">Ya</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="tidak" />
                  <Label htmlFor="tidak">Tidak</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="indikator_bensin"
        render={({ field: { value, onChange } }) => {
          return (
            <FormItem>
              <FormLabel>Indikator Bensin: </FormLabel>
              <Badge>{value || 50}</Badge>
              <FormControl>
                <Slider
                  defaultValue={[50]}
                  max={100}
                  step={1}
                  onValueChange={onChange}
                  value={value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      <div className="grid grid-cols-2 gap-10">
        <FormField
          control={form.control}
          name="km_sekarang"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kilometer Sekarang</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="km_berikutnya"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kilometer Berikutnya</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="gudang"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Gudang Ahass</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Gudang" />
                </SelectTrigger>
                <SelectContent>
                  {gudangItems.map((gudang: any) => (
                    <SelectItem key={gudang.kode} value={gudang.kode}>
                      {gudang.kode} - {gudang.nama}
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
        name="no_stnk"
        render={({ field }) => (
          <FormItem>
            <FormLabel>No. STNK</FormLabel>
            <FormControl>
              <Input type="text" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="customer_yang_datang"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Customer yang datang</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Status Customer Yang Datang" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Milik">Milik</SelectItem>
                  <SelectItem value="Bawa">Bawa</SelectItem>
                  <SelectItem value="Pakai">Pakai</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 gap-10">
        <FormField
          control={form.control}
          name="langtitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Langtitude</FormLabel>
              <FormControl>
                <Input type="text" {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="longtitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Longtitude</FormLabel>
              <FormControl>
                <Input type="text" disabled {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="col-span-2 grid gap-5">
        <FormField
          control={form.control}
          name="keluhan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Keluhan</FormLabel>
              <FormControl>
                <Textarea {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gejala"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gejala (analisa service advisor)</FormLabel>
              <FormControl>
                <Textarea {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="max-w-32"
          type="button"
          onClick={async () => {
            const no_polisi = form.getValues("no_polisi");
            const response = await fetch(
              `/api/kendaraan/history?no_polisi=${no_polisi}`,
            );
            const data = await response.json();
            if (data.error) {
              toast("Error", {
                description: data.error,
                action: {
                  label: "Oke!",
                  onClick: () => toast.dismiss,
                },
              });
            } else {
              generateHistoryPDF(data);
            }
          }}
        >
          History
        </Button>
      </div>
    </>
  );
}
