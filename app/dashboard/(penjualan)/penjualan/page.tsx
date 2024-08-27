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
      title: "Penjualan",
      description: "",
      cards: [
        {
          title: "Sales Order",
          link: "/dashboard/sales-order",
          icon: "sell",
        },
        {
          title: "Invoice Penjualan",
          link: "/dashboard/invoice-penjualan",
          icon: "report",
        },
        {
          title: "Return Order",
          link: "/dashboard/return-order",
          icon: "money",
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
