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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multiselect";

export function KaryawanStatus({ form }: { form: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Status</CardTitle>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-5">
        <FormField
          control={form.control}
          name="status_karyawan_tetap"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status Karyawan Tetap</FormLabel>
              <FormControl>
                <RadioGroup
                  value={field.value || "tetap"}
                  onValueChange={field.onChange}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="tetap" id="tetap" />
                    <Label htmlFor="tetap">Tetap</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="tidak tetap" id="tidak_tetap" />
                    <Label htmlFor="tidak_tetap">Tidak Tetap</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="honda_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Honda ID</FormLabel>
              <FormControl>
                <Input placeholder="Honda ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tanggal_masuk"
          render={({ field }) => {
            field.value = new Date(field.value).toISOString().split("T")[0];
            return (
              <FormItem>
                <FormLabel>Tanggal Berhenti</FormLabel>
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
          name="tanggal_berhenti"
          render={({ field }) => {
            field.value = new Date(field.value).toISOString().split("T")[0];
            return (
              <FormItem>
                <FormLabel>Tanggal Berhenti</FormLabel>
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
          name="jabatan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jabatan</FormLabel>
              <FormControl>
                <MultiSelect
                  options={[
                    { value: "Asisten Mekanik", label: "Asisten Mekanik" },
                    { value: "FrontDesk", label: "FrontDesk" },
                    { value: "Kepala Bengkel", label: "Kepala Bengkel" },
                    { value: "Kepala Mekanik", label: "Kepala Mekanik" },
                    { value: "Mekanik", label: "Mekanik" },
                    { value: "Salesman", label: "Salesman" },
                    { value: "Service Advisor", label: "Service Advisor" },
                    { value: "Staff", label: "Staff" },
                    { value: "Partman", label: "Partman" },
                    { value: "Partcounter", label: "Partcounter" },
                    { value: "Feeder", label: "Feeder" },
                    {
                      value: "Mekanik Final Inspector",
                      label: "Mekanik Final Inspector",
                    },
                    { value: "Mekanik Claim", label: "Mekanik Claim" },
                    { value: "Admin", label: "Admin" },
                    { value: "Cuci Motor", label: "Cuci Motor" },
                  ]}
                  onValueChange={(selectedValues) => {
                    field.onChange(selectedValues.join(","));
                  }}
                  defaultValue={field.value ? field.value.split(",") : []}
                  placeholder="Select Jabatan"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="level_training"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Level Training</FormLabel>
              <FormControl>
                <Input placeholder="Level Training" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status_pit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status Pit</FormLabel>
              <FormControl>
                <RadioGroup
                  value={field.value || "pit"}
                  onValueChange={field.onChange}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pit" id="pit" />
                    <Label htmlFor="pit">Pit</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="non pit" id="non_pit" />
                    <Label htmlFor="non_pit">Non Pit</Label>
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
