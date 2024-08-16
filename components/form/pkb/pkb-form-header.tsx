import React, { useEffect, useState } from "react";
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
  ]);


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
