import {
  Dialog,
  DialogContent,
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
import { useEffect, useState } from "react";
import { sparepartModalSchema } from "@/schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export function SparepartModal({
  onAddItem,
  jasaData,
  initialValues,
}: {
  onAddItem: (item: any) => void;
  jasaData: any[];
  initialValues?: any;
}) {
  const form = useForm<z.infer<typeof sparepartModalSchema>>({
    resolver: zodResolver(sparepartModalSchema),
    defaultValues: initialValues || {
      total_harga_sparepart: 0,
      tambahan_harga_sparepart: 0,
      persentase_diskon: 0,
      quantity: 0,
    },
  });
  const [selectedItem, setSelectedItem] = useState<SparePart | null>(null);

  useEffect(() => {
    const hargaSparepart = form.watch("harga_sparepart") || 0;
    const quantity = form.watch("quantity") || 0;
    const tambahanHargaSparepart = form.watch("tambahan_harga_sparepart") || 0;
    const persentaseDiskon = form.watch("persentase_diskon") || 0;

    const totalHarga = (hargaSparepart + tambahanHargaSparepart) * quantity;
    const diskon = (totalHarga * persentaseDiskon) / 100;
    const finalHarga = totalHarga - diskon;

    form.setValue("total_harga_sparepart", finalHarga);
  }, [
    form.watch("harga_sparepart"),
    form.watch("quantity"),
    form.watch("tambahan_harga_sparepart"),
    form.watch("persentase_diskon"),
  ]);

  async function handleSubmit() {
    const values = form.getValues();
    values.quantity = parseInt(values.quantity.toString());
    const selected = {
      ...values,
      sparepart: selectedItem,
    };
    onAddItem(selected);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="mr-5">
          Tambah Sparepart
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-5/6 overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Tambah Sparepart</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 items-center gap-4">
              <Combobox
                form={form}
                label="Kode Sparepart"
                name="kode_sparepart"
                apiEndpoint="/api/sparepart"
                searchParam="kode"
                itemToComboboxItem={(sparepart: SparePart) => {
                  return {
                    value: sparepart.kodeSparepart,
                    label: sparepart.kodeSparepart,
                    description: sparepart.namaSparepart?.toString(),
                    data: sparepart,
                  };
                }}
                onSelectItem={(item) => {
                  form.setValue("nama_sparepart", item.description);
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
                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
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
                      <Input type="text" {...field} placeholder="0" disabled />
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
                      <Input type="text" {...field} placeholder="0" />
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
                      <Input type="text" {...field} placeholder="0" />
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
                        defaultValue={1}
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
                          type="text"
                          {...field}
                          placeholder="Total Harga"
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
            <DialogTrigger asChild>
              <Button type="button" onClick={handleSubmit}>
                Save changes
              </Button>
            </DialogTrigger>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
