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

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function KaryawanBiodata({ form }: { form: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Biodata</CardTitle>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-5">
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
          name="tempat_lahir"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tempat Lahir</FormLabel>
              <FormControl>
                <Input placeholder="Tempat Lahir" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tanggal_lahir"
          render={({ field }) => {
            field.value = new Date(field.value).toISOString().split("T")[0];
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
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jenis Kelamin</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenis kelamin" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="L">Laki-Laki</SelectItem>
                  <SelectItem value="P">Perempuan</SelectItem>
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
                    <SelectValue placeholder="Pilih jenis kelamin" />
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
          name="berlaku_hingga"
          render={({ field }) => {
            field.value = new Date(field.value).toISOString().split("T")[0];
            return (
              <FormItem>
                <FormLabel> Berlaku hingga</FormLabel>
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
          name="status_kawin"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Status Kawin</FormLabel>
                <FormControl>
                  <RadioGroup
                    value={field.value || "belum"}
                    onValueChange={field.onChange}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="belum" id="belum" />
                      <Label htmlFor="belum">Belum Kawin</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="kawin" id="kawin" />
                      <Label htmlFor="kawin">Kawin</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="status_kebangsaan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status Kebangsaan</FormLabel>
              <FormControl>
                <RadioGroup
                  value={field.value || "wni"}
                  onValueChange={field.onChange}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="wni" id="wni" />
                    <Label htmlFor="wni">WNA</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="wna" id="wna" />
                    <Label htmlFor="wna">WNI</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
