"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { Content } from "@/types";
import { HoverEffect } from "@/components/ui/card-hover";

const content: Content = {
  sections: [
    {
      title: "Produk",
      description: "Menu utama tentang produk AHASS",
      cards: [
        { title: "Jasa", link: "/dashboard/jasa", icon: "service" },
        {
          title: "Sparepart",
          link: "/dashboard/sparepart",
          icon: "settings",
        },
        {
          title: "Vendor",
          link: "/dashboard/vendor",
          icon: "store",
          disabled: true,
        },
        {
          title: "Karyawan",
          link: "/dashboard/karyawan",
          icon: "worker",
        },
        { title: "PIT", link: "/dashboard/pit", icon: "pit", disabled: true },
        {
          title: "PIT Mekanik",
          link: "/dashboard/pit-mekanik",
          icon: "pitMechanic",
          disabled: true,
        },
        {
          title: "Gudang",
          link: "/dashboard/gudang",
          icon: "warehouse",
        },
        {
          title: "Rekening",
          link: "/dashboard/rekening",
          icon: "rekening",
          disabled: true,
        },
        {
          title: "SA Talk",
          link: "/dashboard/sat-alk",
          icon: "openBook",
          disabled: true,
        },
      ],
    },
    {
      title: "Customer",
      description: "Menu utama tentang pelanggan AHASS",
      cards: [
        { title: "Customer", link: "/dashboard/customer", icon: "user" },
        {
          title: "Diskon",
          link: "/dashboard/diskon",
          icon: "discount",
          disabled: true,
        },
        { title: "Kendaraan", link: "/dashboard/kendaraan", icon: "vehicle" },
        {
          title: "Tipe Kendaraan",
          link: "/dashboard/tipe-kendaraan",
          icon: "wheel",
        },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      {content.sections.map((section, sectionIndex) => (
        <Card key={sectionIndex}>
          <CardHeader>
            <CardTitle>{section.title}</CardTitle>
            <CardDescription>{section.description}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5">
            <HoverEffect items={section.cards} />
          </CardContent>
        </Card>
      ))}
    </>
  );
}
