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

import { BAGFormSchema } from "@/schemas";
import { useEffect } from "react";

import { CircularProgress } from "@/components/misc/circular-progress";
import { responseToast } from "@/lib/responseToast";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "../ui/label";
import { GenericPkbTable } from "./pkb/pkb-table";
import { SparepartBAGModal } from "./bag/bag-sparepart-modal";
import { BAGSparepartColumns } from "./bag/bag-sparepart-columns";
import { createBAG } from "@/actions/bag";

interface BAGFormProps {
  initialValues?: z.infer<typeof BAGFormSchema>;
}

export function BAGForm({ initialValues }: BAGFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [sparepartTableData, setSparepartTableData] = useState<any[]>([]);
  const is_edit = initialValues !== undefined;

  const form = useForm<z.infer<typeof BAGFormSchema>>({
    resolver: zodResolver(BAGFormSchema),
    defaultValues: initialValues || {
      tanggal: new Date(),
      gudangId: "",
      tipeBagIsIncoming: true,
      alasan: "",
      sparepartBAG: [],
    },
  });
  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
      setSparepartTableData(initialValues.sparepartBAG);
    }
  }, [initialValues, form]);

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
          form.setValue("gudangId", data[0].kode);
        }
      } catch (error) {
        console.error("Error fetching gudang data:", error);
      }
    };

    fetchGudang();
  }, [form]);

  async function onSubmit(values: z.infer<typeof BAGFormSchema>) {
    setIsLoading(true);
    values.sparepartBAG = sparepartTableData;
    let response: { result: string; description: any };

    response = await createBAG(values);

    responseToast({ name: "BAG", is_edit, response: response });
    console.log(values);
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
            <CardTitle>BAG Form</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-5">
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
              name="gudangId"
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
              name="tipeBagIsIncoming"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipe BAG</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value ? "true" : ""}
                      onValueChange={field.onChange}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="iya" />
                        <Label htmlFor="iya">Stock Masuk</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="" id="tidak" />
                        <Label htmlFor="tidak">Stock Keluar</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="alasan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alasan</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sparepart</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-5 overflow-x-scroll">
            <GenericPkbTable
              data={sparepartTableData}
              setData={setSparepartTableData}
              columns={BAGSparepartColumns}
              ModalComponent={SparepartBAGModal}
            />
          </CardContent>
        </Card>

        <Button type="submit" disabled={is_edit}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
