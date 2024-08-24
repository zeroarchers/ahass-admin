"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
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
import { gudangFormSchema } from "@/schemas";
import { useEffect } from "react";

import { CircularProgress } from "@/components/misc/circular-progress";
import { toast } from "sonner";
import { ComboboxStatic } from "@/components/ui/combobox-static";
import { useLocationSelector } from "@/hooks/use-location-selector";
import { transformLocations } from "@/lib/locationTransformer";
import { createGudang, updateGudang } from "@/actions/gudang";

interface GudangFormProps {
  initialValues?: z.infer<typeof gudangFormSchema>;
}

export function GudangForm({ initialValues }: GudangFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const is_edit = initialValues !== undefined;

  const form = useForm<z.infer<typeof gudangFormSchema>>({
    resolver: zodResolver(gudangFormSchema),
    defaultValues: initialValues || {
      kode: "",
      nama: "",
      provinsi: "",
      kabupaten: "",
      kecamatan: "",
      kelurahan: "",
      kodepos: "",
      notelp: "",
      nohp: "",
      alamat: "",
      email: "",
      statusAktif: false,
    },
  });
  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
    }
  }, [initialValues, form]);

  async function onSubmit(values: z.infer<typeof gudangFormSchema>) {
    setIsLoading(true);

    const transformedValues = await transformLocations(values);
    let response: { result: string; description: any };
    console.log(values);

    if (is_edit) {
      response = await updateGudang(values);
    } else {
      response = await createGudang(values);
    }
    response = { result: "foo", description: "bar" };
    if (response) {
      toast(response.result, {
        description: response.description,
        action: {
          label: "Oke!",
          onClick: () => toast.dismiss,
        },
      });
    }
    console.log(transformedValues);
    setIsLoading(false);
  }

  const { provinces, regencies, districts, villages } =
    useLocationSelector(form);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-5 grid-cols-1"
      >
        <CircularProgress className={isLoading ? "flex" : "hidden"} />
        <Card>
          <CardHeader>
            <CardTitle>Gudang Form</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-5">
            <div className="grid grid-cols-1 gap-y-3">
              <FormField
                control={form.control}
                name="kode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kode</FormLabel>{" "}
                    <FormControl>
                      <Input disabled={is_edit} placeholder="Kode" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
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
              name="nama"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input placeholder="Nama" {...field} />
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
                      <Textarea {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
