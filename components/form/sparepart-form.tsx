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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { createSparepart, updateSparepart } from "@/actions/actions";
import { Checkbox } from "@/components/ui/checkbox";
import { sparepartFormSchema } from "@/schemas";
import { useEffect } from "react";
import { toast } from "sonner";
import { CircularProgress } from "../misc/circular-progress";

interface SparepartFormProps {
  initialValues?: z.infer<typeof sparepartFormSchema>;
}

const sparePartOptions = [
  "OTHER",
  "HGP",
  "SPARK PLUG",
  "TIRE",
  "OLI",
  "Engine",
];

const grupKodeAhmOptions = [
  "HND-06C",
  "EXT SERV",
  "HND-ASB",
  "HND-43A",
  "HND-AHS",
  "HND-01A",
  "HND-02D",
  "HND-22A",
  "HND-01C",
  "HND-12B",
  "HND-11Z",
  "HND-17B",
  "HND-81A",
  "HND-05A",
  "HND-31D",
  "HND-30A",
  "HND-X1A",
  "HND-42A",
  "HND-TLA",
  "HND-12A",
  "HND-03A",
  "HND-X1Z",
  "HND-41E",
  "HND-11D",
  "HND-08A",
  "HND-27A",
  "HND-31C",
  "HND-02C",
  "HND-29A",
  "HND-81B",
  "HND-31E",
  "HND-02A",
  "HND-04A",
  "HND-TLC",
  "HND-93A",
  "HND-X1C",
  "HND-11A",
  "HND-X1B",
  "HND-02Z",
  "HND-14B",
  "HND-ASA",
  "GEN REP",
  "HND-45A",
  "HND-31A",
  "HND-11B",
  "HND-16A",
  "HND-10A",
  "HND-14A",
  "HND-06B",
  "HND-21F",
  "HND-44A",
  "HND-25A",
  "HND-21E",
  "HND-01E",
  "HND-Y1A",
  "HND-21D",
  "HND-28B",
  "HND-15A",
  "HND-06A",
  "HND-23A",
  "HND-21A",
  "HND-82A",
  "HND-ASC",
  "HND-09A",
  "HND-11C",
  "HND-07A",
  "HND-19A",
  "HND-24A",
  "HND-15Z",
  "HND-17A",
  "HND-01D",
  "HND-06D",
  "HND-01B",
  "HND-31B",
  "HND-28A",
  "HND-13A",
  "HND-26A",
  "HND-91A",
  "HND-02B",
  "HND-21C",
  "HND-18A",
  "HND-41A",
  "HND-TLB",
  "HND-11E",
  "HND-20A",
];

export function SparepartForm({ initialValues }: SparepartFormProps) {
  const is_edit = initialValues !== undefined;
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof sparepartFormSchema>>({
    resolver: zodResolver(sparepartFormSchema),
    defaultValues: initialValues || {
      kodeSparepart: "",
      aktif: false,
      namaSparepart: "",
      namaLokalSparepart: null,
      grupSparepart: "",
      hargaLokal: 0,
      hargaNasional: null,
      uom: "",
      grupKodeAHM: null,
    },
  });
  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
    }
  }, [initialValues, form]);

  async function onSubmit(values: z.infer<typeof sparepartFormSchema>) {
    setIsLoading(true);
    let response: { result: string; description: any };

    if (is_edit) {
      response = await updateSparepart(values);
    } else {
      response = await createSparepart(values);
    }
    if (response) {
      toast(response.result, {
        description: response.description,
        action: {
          label: "Oke!",
          onClick: () => toast.dismiss,
        },
      });
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-5 grid-cols-1"
      >
        <CircularProgress className={isLoading ? "flex" : "hidden"} />
        <Card>
          <CardHeader>
            <CardTitle>Sparepart Form</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-5">
            <div className="grid grid-cols-1 gap-y-3">
              <FormField
                control={form.control}
                name="kodeSparepart"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kode</FormLabel>
                    <FormControl>
                      <Input disabled={is_edit} placeholder="Kode" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="aktif"
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
              name="namaSparepart"
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
              name="namaLokalSparepart"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lokal</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nama Lokal"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="grupSparepart"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={field.value} />
                      </SelectTrigger>
                      <SelectContent>
                        {sparePartOptions.map(
                          (option: string, index: number) => (
                            <SelectItem
                              key={index}
                              value={option.toLowerCase().replace(/\s+/g, "-")}
                            >
                              {option}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hargaLokal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Harga Lokal</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Harga Lokal" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="grupSparepart"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group Kode AHM</FormLabel>
                  <FormControl>
                    <Select defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih group" />
                      </SelectTrigger>
                      <SelectContent>
                        {grupKodeAhmOptions.map(
                          (option: string, index: number) => (
                            <SelectItem
                              key={index}
                              value={option.toLowerCase().replace(/\s+/g, "-")}
                            >
                              {option}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hargaNasional"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Harga Nasional (HET)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Harga Nasional"
                      {...field}
                      value={field.value || 0}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="uom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Satuan</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih satuan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pcs">PCS</SelectItem>
                        <SelectItem value="set">SET</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/**/}
            {/* <FormField */}
            {/*   name="hargaLokal" */}
            {/*   render={({}) => ( */}
            {/*     <FormItem> */}
            {/*       <FormLabel>Harga Claim Oli</FormLabel> */}
            {/*       <FormControl> */}
            {/*         <Input */}
            {/*           type="number" */}
            {/*           placeholder="Harga Claim Oli" */}
            {/*           disabled */}
            {/*         /> */}
            {/*       </FormControl> */}
            {/*       <FormMessage /> */}
            {/*     </FormItem> */}
            {/*   )} */}
            {/* /> */}
            {/* <div className="col-span-2"> */}
            {/*   <FormField */}
            {/*     control={form.control} */}
            {/*     name="namaSparepart" */}
            {/*     render={({ field }) => ( */}
            {/*       <FormItem> */}
            {/*         <FormLabel>Catatan</FormLabel> */}
            {/*         <FormControl> */}
            {/*           <Textarea disabled {...field} value={field.value ?? ""} /> */}
            {/*         </FormControl> */}
            {/*         <FormMessage /> */}
            {/*       </FormItem> */}
            {/*     )} */}
            {/*   /> */}
            {/* </div> */}
          </CardContent>
        </Card>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
