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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
                <Select
                  onValueChange={field.onChange} // Use field.onChange to update form value
                  defaultValue={field.value} // Set the default value from the form field
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Jabatan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asisten Mekanik">
                      Asisten Mekanik
                    </SelectItem>
                    <SelectItem value="FrontDesk">FrontDesk</SelectItem>
                    <SelectItem value="Kepala Bengkel">
                      Kepala Bengkel
                    </SelectItem>
                    <SelectItem value="Kepala Mekanik">
                      Kepala Mekanik
                    </SelectItem>
                    <SelectItem value="Mekanik">Mekanik</SelectItem>
                    <SelectItem value="Salesman">Salesman</SelectItem>
                    <SelectItem value="Service Advisor">
                      Service Advisor
                    </SelectItem>
                    <SelectItem value="Staff">Staff</SelectItem>
                    <SelectItem value="Partman">Partman</SelectItem>
                    <SelectItem value="Partcounter">Partcounter</SelectItem>
                    <SelectItem value="Feeder">Feeder</SelectItem>
                    <SelectItem value="Mekanik Final Inspector">
                      Mekanik Final Inspector
                    </SelectItem>
                    <SelectItem value="Mekanik Claim">Mekanik Claim</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Cuci Motor">Cuci Motor</SelectItem>
                  </SelectContent>
                </Select>
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
