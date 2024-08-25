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
import { BaseSyntheticEvent, FormEvent, useState } from "react";
import { sparepartBAGSchema } from "@/schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export function SparepartBAGModal({
  onAddItem,
  initialValues,
  gudangId,
}: {
  onAddItem: (item: any) => void;
  initialValues?: any;
  gudangId: string;
}) {
  const sparepartModalSchemaWithoutSparepart = sparepartBAGSchema.omit({
    sparepart: true,
  });
  const form = useForm<z.infer<typeof sparepartModalSchemaWithoutSparepart>>({
    resolver: zodResolver(sparepartModalSchemaWithoutSparepart),
    defaultValues: initialValues || {
      quantity: 0,
    },
  });
  const handleSubmit = form.handleSubmit;

  const [selectedItem, setSelectedItem] = useState<SparePart | null>(null);
  const [open, setOpen] = useState(false);

  function stopPropagate(
    callback: (event: FormEvent<HTMLFormElement>) => void,
  ) {
    return (e: FormEvent<HTMLFormElement>) => {
      e.stopPropagation();
      callback(e);
    };
  }

  function onSubmit(data: any, e?: BaseSyntheticEvent) {
    const selected = {
      ...data,
      sparepart: selectedItem,
    };
    const result = sparepartBAGSchema.safeParse(selected);
    if (result.success) {
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
      <DialogContent className="sm:max-w-[425px] h-4/6 overflow-y-scroll">
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
                  apiEndpoint={`/api/sparepart?gudangId=${gudangId}&`}
                  searchParam="nama"
                  itemToComboboxItem={(
                    sparepart: SparePart & { stockCount: number },
                  ) => {
                    return {
                      value: sparepart.kodeSparepart,
                      label: `${sparepart.kodeSparepart} - ${sparepart.namaSparepart}`,
                      description: sparepart.stockCount.toString(),
                      data: sparepart,
                    };
                  }}
                  onSelectItem={(item) => {
                    form.setValue("namaSparepart", item.data.namaSparepart);
                    setSelectedItem(item.data);
                  }}
                />
                <FormField
                  control={form.control}
                  name="namaSparepart"
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
