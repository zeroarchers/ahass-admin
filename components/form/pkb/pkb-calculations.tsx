import React, { useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export const calculateJasa = (jasaTableData: any[]) => {
  let jasaGratis = 0;
  let jasaBayar = 0;
  let estimasiWaktu = 0;

  if (jasaTableData.length > 0) {
    console.log(jasaTableData);
    jasaTableData.forEach((jasaPKB) => {
      if (jasaPKB.total_harga_jasa === 0) {
        jasaGratis += 1;
      } else {
        jasaBayar += jasaPKB.total_harga_jasa;
      }
      estimasiWaktu += jasaPKB.jasa.waktuKerja || 0;
    });
  }

  return { jasaGratis, jasaBayar, estimasiWaktu };
};

export const calculateSparepart = (sparepartTableData: any[]) => {
  let sparepartGratis = 0;
  let sparepartBayar = 0;
  let totalKuantitas = 0;

  sparepartTableData.forEach((sparepart) => {
    const quantity = Number(sparepart.quantity) || 0;
    if (sparepart.total_harga === 0) {
      sparepartGratis += sparepart.total_harga_sparepart;
    } else {
      sparepartBayar += sparepart.total_harga_sparepart;
    }
    totalKuantitas += quantity;
  });

  return { sparepartGratis, sparepartBayar, totalKuantitas };
};

export const calculateTotal = (
  jasaCalculations: ReturnType<typeof calculateJasa>,
  sparepartCalculations: ReturnType<typeof calculateSparepart>,
  uangMuka: number,
) => {
  const subtotalBayar =
    jasaCalculations.jasaBayar + sparepartCalculations.sparepartBayar;
  const discountFinal = 0;
  const totalGratis =
    jasaCalculations.jasaGratis * 18000 +
    sparepartCalculations.sparepartGratis * 1000;
  const ppnPercentage = 0;
  const nilaiPpn = (subtotalBayar - discountFinal) * (ppnPercentage / 100);
  const totalBayar = subtotalBayar - discountFinal + nilaiPpn;
  const totalBayarWithUangMuka = totalBayar - uangMuka;

  return {
    subtotalBayar,
    discountFinal,
    totalGratis,
    ppnPercentage,
    nilaiPpn,
    totalBayar,
    totalBayarWithUangMuka,
  };
};

export const JasaCalculationsCard: React.FC<{
  jasaCalculations: ReturnType<typeof calculateJasa>;
}> = ({ jasaCalculations }) => (
  <Card className="border-primary">
    <CardContent className="grid md:grid-cols-3 gap-5 pt-6 text-lg">
      <div className="grid text-center gap-2">
        <p>Jasa Gratis</p>
        <Badge className="text-lg w-fit mx-auto">
          {jasaCalculations.jasaGratis} Pcs
        </Badge>
      </div>
      <div className="grid text-center gap-2">
        <p>Jasa Bayar</p>
        <Badge className="text-lg w-fit mx-auto">
          Rp.{" "}
          {jasaCalculations.jasaBayar.toLocaleString("id-ID", {
            minimumFractionDigits: 2,
          })}
        </Badge>
      </div>
      <div className="grid text-center gap-2">
        <p>Estimasi Waktu Pengerjaan</p>
        <Badge className="text-lg w-fit mx-auto">
          {jasaCalculations.estimasiWaktu} Menit
        </Badge>
      </div>
    </CardContent>
  </Card>
);

export const SparepartCalculationsCard: React.FC<{
  sparepartCalculations: ReturnType<typeof calculateSparepart>;
}> = ({ sparepartCalculations }) => (
  <Card className="border-primary">
    <CardContent className="grid md:grid-cols-3 gap-5 pt-6 text-lg">
      <div className="grid text-center gap-2">
        <p>SparePart Gratis</p>
        <Badge className="text-lg w-fit mx-auto">
          {sparepartCalculations.sparepartGratis} Pcs
        </Badge>
      </div>
      <div className="grid text-center gap-2">
        <p>SparePart Bayar</p>
        <Badge className="text-lg w-fit mx-auto">
          Rp.{" "}
          {sparepartCalculations.sparepartBayar.toLocaleString("id-ID", {
            minimumFractionDigits: 2,
          })}
        </Badge>
      </div>
      <div className="grid text-center gap-2">
        <p>Total Kuantitas</p>
        <Badge className="text-lg w-fit mx-auto">
          {sparepartCalculations.totalKuantitas} pcs
        </Badge>
      </div>
    </CardContent>
  </Card>
);

export const TotalCalculationsCard: React.FC<{
  totalCalculations: ReturnType<typeof calculateTotal>;
  is_pendaftaran?: boolean;
  uangMuka: number;
}> = ({ totalCalculations, is_pendaftaran, uangMuka }) => (
  <div className="grid md:grid-cols-2 gap-5">
    <Card>
      <CardHeader>
        <CardTitle>Total</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-5 overflow-x-scroll">
        <div className="grid gap-3">
          <p>Subtotal Bayar</p>
          <Badge className="w-fit">
            Rp.{" "}
            {totalCalculations.subtotalBayar.toLocaleString("id-ID", {
              minimumFractionDigits: 2,
            })}
          </Badge>
        </div>
        <div className="grid gap-3">
          <p>Discount Final</p>
          <Badge className="w-fit">
            Rp.{" "}
            {totalCalculations.discountFinal.toLocaleString("id-ID", {
              minimumFractionDigits: 2,
            })}
          </Badge>
        </div>
        <div className="grid gap-3">
          <p>Total Gratis</p>
          <Badge className="w-fit">
            Rp.{" "}
            {totalCalculations.totalGratis.toLocaleString("id-ID", {
              minimumFractionDigits: 2,
            })}
          </Badge>
        </div>
        <div className="grid gap-3">
          <p>PPn</p>
          <Badge className="w-fit">{totalCalculations.ppnPercentage} %</Badge>
        </div>
        <div className="grid gap-3">
          <p>Nilai PPn</p>
          <Badge className="w-fit">
            Rp.{" "}
            {totalCalculations.nilaiPpn.toLocaleString("id-ID", {
              minimumFractionDigits: 2,
            })}
          </Badge>
        </div>
        {is_pendaftaran ? (
          <div className="grid gap-3">
            <p>Total Bayar</p>
            <Badge className="w-fit">
              Rp.{" "}
              {totalCalculations.totalBayar.toLocaleString("id-ID", {
                minimumFractionDigits: 2,
              })}
            </Badge>
          </div>
        ) : (
          <div className="grid gap-3">
            <p>Uang Muka</p>
            <Badge className="w-fit">
              Rp.{" "}
              {uangMuka.toLocaleString("id-ID", { minimumFractionDigits: 2 })}
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
    <div className="flex w-full">
      <Card className="flex flex-grow flex-col justify-center align-center text-center  text-xl bg-primary">
        <CardHeader className="p-2 font-bold text-primary-foreground">
          Biaya
        </CardHeader>
        <CardContent>
          <Badge className="text-xl bg-primary-foreground text-primary hover:bg-primary-foreground">
            Rp.{" "}
            {!is_pendaftaran
              ? totalCalculations.totalBayarWithUangMuka.toLocaleString(
                  "id-ID",
                  {
                    minimumFractionDigits: 2,
                  },
                )
              : totalCalculations.totalBayar.toLocaleString("id-ID", {
                  minimumFractionDigits: 2,
                })}
          </Badge>
        </CardContent>
      </Card>
      {is_pendaftaran && (
        <Card className="flex flex-grow flex-col justify-center align-center text-center  text-xl bg-primary-foreground">
          <CardHeader className="p-2 font-bold text-primary">
            Uang Muka
          </CardHeader>
          <CardContent>
            <Badge className="text-xl">
              Rp.{" "}
              {uangMuka.toLocaleString("id-ID", { minimumFractionDigits: 2 })}
            </Badge>
          </CardContent>
        </Card>
      )}
    </div>
  </div>
);

export const PembayaranCard = ({
  form,
  totalCalculations,
}: {
  form: any;
  totalCalculations: ReturnType<typeof calculateTotal>;
}) => {
  useEffect(() => {
    const uangBayar = form.getValues("uang_bayar") || 0;
    form.setValue(
      "uang_kembalian",
      uangBayar - totalCalculations.totalBayarWithUangMuka,
    );
  }, [form, totalCalculations]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Uang Bayar & Kembalian</CardTitle>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-5 overflow-x-scroll">
        <FormField
          control={form.control}
          name="uang_bayar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Uang Bayar</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    form.setValue(
                      "uang_kembalian",
                      Number(e.target.value) -
                        totalCalculations.totalBayarWithUangMuka,
                    );
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="uang_kembalian"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Uang Kembalian</FormLabel>
              <FormControl>
                <Input type="number" {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tipe_pembayaran"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipe Pembayaran</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Tipe Kedatangan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="transfer">Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};
