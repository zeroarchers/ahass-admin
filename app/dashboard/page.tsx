"use client";
import { Icons } from "@/components/icons";
import { Icon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { Content } from "@/types";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { HoverEffect } from "@/components/ui/card-hover";

const content: Content = {
  sections: [
    {
      title: "Produk",
      description: "Menu utama tentang produk AHASS",
      cards: [
        { title: "Jasa", link: "/jasa", icon: "service" },
        { title: "Sparepart", link: "/sparepart", icon: "settings" },
        { title: "Vendor", link: "/vendor", icon: "store" },
        { title: "Karyawan", link: "/karyawan", icon: "worker" },
        { title: "PIT", link: "/pit", icon: "pit" },
        { title: "PIT Mekanik", link: "/pit-mekanik", icon: "pitMechanic" },
        { title: "Gudang", link: "/gudang", icon: "warehouse" },
        { title: "Rekening", link: "/rekening", icon: "rekening" },
        { title: "SA Talk", link: "/sat-alk", icon: "openBook" },
      ],
    },
    {
      title: "Customer",
      description: "Menu utama tentang pelanggan AHASS",
      cards: [
        { title: "Customer", link: "/customer", icon: "user" },
        { title: "Diskon", link: "/diskon", icon: "discount" },
        { title: "Kendaraan", link: "/kendaraan", icon: "vehicle" },
        { title: "Tipe Kendaraan", link: "/tipe-kendaraan", icon: "wheel" },
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
