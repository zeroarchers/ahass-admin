import React from "react";
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
                value={field.value || "iya"}
                onValueChange={field.onChange}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="iya" id="iya" />
                  <Label htmlFor="iya">Ya</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="tidak" id="tidak" />
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
                value={field.value || "langsung"}
                onValueChange={field.onChange}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="langsung" id="langsung" />
                  <Label htmlFor="langsung">Langsung</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="konfirmasi" id="konfirmasi" />
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
                value={field.value || "iya"}
                onValueChange={field.onChange}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="iya" id="iya" />
                  <Label htmlFor="iya">Ya</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="tidak" id="tidak" />
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
                <Input type="text" {...field} />
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
                <Input type="text" {...field} />
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
              <Input type="text" {...field} />
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
                  <SelectValue placeholder="Select Alasan Ke Ahass" />
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
      </div>
    </>
  );
}
