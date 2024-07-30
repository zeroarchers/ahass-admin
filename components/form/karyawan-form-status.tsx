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
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

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
            field.value = field.value.toISOString().split("T")[0];
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
            field.value = field.value.toISOString().split("T")[0];
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
                <Input placeholder="Jabatan" {...field} />
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
