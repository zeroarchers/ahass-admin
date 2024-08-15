import React, { useCallback, useEffect, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Combobox } from "@/components/ui/combobox";
import { generateNoPkb } from "@/lib/generate";

export function PkbFormHeader({
  form,
  is_pendaftaran,
  is_edit,
  setJasaTableData,
  setSparepartTableData,
}: {
  form: any;
  is_pendaftaran?: boolean;
  is_edit?: boolean;
  setJasaTableData: (data: any[]) => void;
  setSparepartTableData: (data: any[]) => void;
}) {
  const [selectedPkb, setSelectedPkb] = useState("");

  function generateNoAntrian(
    tipeAntrian: string,
    currentQueueCount: number,
  ): string {
    const prefix = tipeAntrian.charAt(0).toUpperCase();
    const queueNumber = (currentQueueCount + 1).toString().padStart(3, "0");
    return `${prefix}${queueNumber}`;
  }

  const fetchPembayaranCounts = useCallback(async () => {
    const pkbPembayaranCountResponse = await fetch(
      "/api/pkb/pkbPembayaranCount",
      { cache: "no-store" },
    );
    if (!pkbPembayaranCountResponse.ok) {
      throw new Error("Failed to fetch pkb bayar count");
    }

    const pkbPembayaranCount = await pkbPembayaranCountResponse.json();

    const noPkbBayar = generateNoPkb(pkbPembayaranCount, "SOD");
    form.setValue("no_bayar", noPkbBayar);
  }, [form]);

  useEffect(() => {
    const fetchPkbData = async () => {
      if (selectedPkb) {
        try {
          const response = await fetch(`/api/pkb?no_pkb=${selectedPkb}`, {
            cache: "no-store",
          });
          if (response.ok) {
            const pkbData = await response.json();

            form.reset(pkbData);

            setJasaTableData(pkbData.jasaPKB || []);
            setSparepartTableData(pkbData.sparepartPKB || []);
            fetchPembayaranCounts();
          } else {
            console.error("Failed to fetch PKB data");
          }
        } catch (error) {
          console.error("Error fetching PKB data:", error);
        }
      }
    };

    fetchPkbData();
  }, [
    selectedPkb,
    form,
    setJasaTableData,
    setSparepartTableData,
    fetchPembayaranCounts,
  ]);

  useEffect(() => {
    const fetchCounts = async () => {
      const queueCountResponse = await fetch("/api/pkb/queueCount", { cache: "no-store" });
      const pkbCountResponse = await fetch("/api/pkb/pkbCount", { cache: "no-store" });

      if (!queueCountResponse.ok) {
        throw new Error("Failed to fetch queue count");
      }
      if (!pkbCountResponse.ok) {
        throw new Error("Failed to fetch pkb count");
      }

      const queueCount = await queueCountResponse.json();
      const pkbCount = await pkbCountResponse.json();

      const newNoAntrian = generateNoAntrian(
        form.getValues("tipe_antrian"),
        queueCount,
      );
      const noPkb = generateNoPkb(pkbCount, "PKB");

      form.setValue("no_antrian", newNoAntrian);
      form.setValue("no_pkb", noPkb);
    };
    if (!is_edit) {
      if (is_pendaftaran) fetchCounts();
      else fetchPembayaranCounts();
    }
  }, [fetchPembayaranCounts, form, is_edit, is_pendaftaran]);

  return (
    <Card>
      <CardHeader></CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-5">
        {!is_pendaftaran && (
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="no_bayar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No. Bayar</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
        {is_pendaftaran || (!is_pendaftaran && is_edit) ? (
          <FormField
            control={form.control}
            name="no_pkb"
            render={({ field }) => (
              <FormItem>
                <FormLabel>No. PKB</FormLabel>
                <FormControl>
                  <Input type="text" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <Combobox
            form={form}
            label="No. PKB"
            name="no_pkb"
            apiEndpoint="/api/pkb/all"
            searchParam="no_pkb"
            itemToComboboxItem={(pkb) => ({
              value: pkb.no_pkb,
              label: pkb.no_pkb,
              description: pkb.no_polisi,
            })}
            onSelectItem={(value) => setSelectedPkb(value.value)}
          />
        )}
        <FormField
          control={form.control}
          name="no_antrian"
          render={({ field }) => (
            <FormItem>
              <FormLabel>No. Antrian</FormLabel>
              <FormControl>
                <Input type="text" {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
