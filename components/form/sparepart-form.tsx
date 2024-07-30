"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import React from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { createJasa, updateJasa } from "@/actions/actions";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";
import { jasaFormSchema } from "@/schemas";
import { useEffect } from "react";

interface SparepartFormProps {
  initialValues?: z.infer<typeof jasaFormSchema>;
}

export function SparepartForm({ initialValues }: SparepartFormProps) {
  const form = useForm<z.infer<typeof jasaFormSchema>>({
    resolver: zodResolver(jasaFormSchema),
    defaultValues: initialValues || {
      kode: "",
      nama: "",
      jobType: "",
      jobTypeDesc: "",
      kategoriPekerjaan: "",
      hargaJual: 0,
      waktuKerja: 0,
      satuanKerja: "",
      catatan: null,
      statusAktif: false,
    },
  });
  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
    }
  }, [initialValues, form]);

  async function onSubmit(values: z.infer<typeof jasaFormSchema>) {
    const is_edit = initialValues !== undefined;
    if (is_edit) {
      console.log("updating");
      await updateJasa(values);
    } else {
      await createJasa(values);
    }
  }

  const handleSelectChange = (value: string) => {
    const [jobType, jobTypeDesc] = value.split(" - ");

    form.setValue("jobType", jobType);
    form.setValue("jobTypeDesc", jobTypeDesc);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-5 grid-cols-1"
      >
        <Card>
          <CardHeader>
            <CardTitle>Jasa Form</CardTitle>
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
                      <Input placeholder="Kode" {...field} />
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
              name="jobType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={handleSelectChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Job Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="LS - Light Service">
                          LS - Light Service
                        </SelectItem>
                        <SelectItem value="C2 - Honda Warranty">
                          C2 - Honda Warranty
                        </SelectItem>
                        <SelectItem value="LR - Light Repair">
                          LR - Light Repair
                        </SelectItem>
                        <SelectItem value="HR - Heavy Repair">
                          HR - Heavy Repair
                        </SelectItem>
                        <SelectItem value="ASS1 - ASS 1 service">
                          ASS1 - ASS 1 service
                        </SelectItem>
                        <SelectItem value="ASS2 - ASS 2 service">
                          ASS2 - ASS 2 service
                        </SelectItem>
                        <SelectItem value="ASS3 - ASS 3 service">
                          ASS3 - ASS 3 service
                        </SelectItem>
                        <SelectItem value="ASS4 - ASS 4 service">
                          ASS4 - ASS 4 service
                        </SelectItem>
                        <SelectItem value="OR+ - Replace Oil">
                          OR+ - Replace Oil
                        </SelectItem>
                        <SelectItem value="CS - Complete Srv">
                          CS - Complete Srv
                        </SelectItem>
                        <SelectItem value="JR - Job Return">
                          JR - Job Return
                        </SelectItem>
                        <SelectItem value="OTHER - Other">
                          OTHER - Other
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jobTypeDesc"
              render={({ field }) => (
                <input type="hidden" value={field.value} />
              )}
            />
            <FormField
              control={form.control}
              name="kategoriPekerjaan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategori Pekerjaan</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Kategori Pekerjaan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PENGGANTIAN">PENGGANTIAN</SelectItem>
                        <SelectItem value="PERBAIKAN">PERBAIKAN</SelectItem>
                        <SelectItem value="PERAWATAN">PERAWATAN</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hargaJual"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Harga Jual</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Harga Jual" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="waktuKerja"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Waktu Kerja</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Waktu Kerja" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="satuanKerja"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Satuan Kerja</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Satuan Kerja" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Hour">Hour</SelectItem>
                        <SelectItem value="Minute">Minute</SelectItem>
                        <SelectItem value="Day">Day</SelectItem>
                      </SelectContent>
                    </Select>
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
