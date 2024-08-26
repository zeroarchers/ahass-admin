import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

import type { SparePart } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BaseSyntheticEvent, FormEvent, useEffect, useState } from "react";
import { sparepartModalSchema } from "@/schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export function SparepartModal({
  onAddItem,
  jasaData,
  initialValues,
  gudangId,
}: {
  onAddItem: (item: any) => void;
  jasaData: any[];
  initialValues?: any;
  gudangId?: string;
}) {
  const sparepartModalSchemaWithoutSparepart = sparepartModalSchema.omit({
    sparepart: true,
  });
  const form = useForm<z.infer<typeof sparepartModalSchemaWithoutSparepart>>({
    resolver: zodResolver(sparepartModalSchemaWithoutSparepart),
    defaultValues: initialValues || {
      total_harga_sparepart: 0,
      tambahan_harga_sparepart: 0,
      persentase_diskon: 0,
      quantity: 0,
      harga_sparepart: 0,
      nama_sparepart: "",
      kode_sparepart: "",
    },
  });
  const handleSubmit = form.handleSubmit;

  const [selectedItem, setSelectedItem] = useState<SparePart | null>(null);
  const [open, setOpen] = useState(false);

  const watch_harga = form.watch("harga_sparepart");
  const watch_quantity = form.watch("quantity");
  const watch_tambahan_harga = form.watch("tambahan_harga_sparepart");
  const watch_persentase_diskon = form.watch("persentase_diskon");

  useEffect(() => {
    const hargaSparepart = watch_harga;
    const quantity = watch_quantity || 0;
    const tambahanHargaSparepart = watch_tambahan_harga || 0;
    const persentaseDiskon = watch_persentase_diskon || 0;

    const totalHarga = (hargaSparepart + tambahanHargaSparepart) * quantity;
    const diskon = (totalHarga * persentaseDiskon) / 100;
    const finalHarga = totalHarga - diskon;

    if (quantity != 0) form.setValue("total_harga_sparepart", finalHarga);
  }, [
    watch_harga,
    watch_quantity,
    watch_tambahan_harga,
    watch_persentase_diskon,
    form,
  ]);

  function stopPropagate(
    callback: (event: FormEvent<HTMLFormElement>) => void,
  ) {
    return (e: FormEvent<HTMLFormElement>) => {
      e.stopPropagation();
      callback(e);
    };
  }

  function onSubmit(data: any) {
    const selected = {
      ...data,
      sparepart: selectedItem,
    };

    const result = sparepartModalSchema.safeParse(selected);
    if (result.success) {
      console.log(result.data);
      onAddItem(result.data);
      setOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="mr-5">
          Tambah Sparepart
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] h-5/6 overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Tambah Sparepart</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={stopPropagate(handleSubmit(onSubmit))}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 items-center gap-4">
                <Combobox
                  form={form}
                  label="Kode Sparepart"
                  name="kode_sparepart"
                  apiEndpoint={`/api/stok?gudangId=${gudangId}&`}
                  searchParam="nama"
                  searchedItem="sparepart"
                  itemToComboboxItem={(sparepart: any) => {
                    return {
                      value: sparepart.kodeSparepart,
                      label: `${sparepart.kodeSparepart} - ${sparepart.namaSparepart}`,
                      description: sparepart.quantity.toString(),
                      data: sparepart,
                    };
                  }}
                  onSelectItem={(item) => {
                    form.setValue("nama_sparepart", item.data.namaSparepart);
                    form.setValue("harga_sparepart", item.data.hargaLokal);
                    setSelectedItem(item.data);
                  }}
                />
                <FormField
                  control={form.control}
                  name="ref_jasa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ref Jasa</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Ref Jasa" />
                          </SelectTrigger>
                          <SelectContent>
                            {jasaData.map(({ jasa: { nama, kode } }) => {
                              return (
                                <SelectItem key={kode} value={kode}>
                                  {nama}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nama_sparepart"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Sparepart</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="harga_sparepart"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Harga Sparepart</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          {...field}
                          placeholder="0"
                          value={field.value ?? ""}
                          disabled
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tambahan_harga_sparepart"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tambahan Harga SparePart</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          {...field}
                          placeholder="0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="persentase_diskon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Persentase Diskon</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          {...field}
                          placeholder="0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          {...field}
                          placeholder="1"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="total_harga_sparepart"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Total Harga</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            placeholder="Total Harga"
                            value={field.value ?? ""}
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
