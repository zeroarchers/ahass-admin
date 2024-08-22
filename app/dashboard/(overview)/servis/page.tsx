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
      title: "Servis",
      description: "",
      cards: [
        {
          title: "Booking",
          link: "/dashboard/booking",
          icon: "service",
          disabled: true,
        },
        {
          title: "Part Request",
          link: "/dashboard/part-request",
          icon: "settings",
          disabled: true,
        },
        {
          title: "Pendaftaran Servis",
          link: "/dashboard/pendaftaran-servis",
          icon: "store",
        },
        {
          title: "Pembayaran Servis",
          link: "/dashboard/pembayaran-servis",
          icon: "worker",
        },
        {
          title: "Order pekerjaan luar",
          link: "/dashboard/opl",
          icon: "pit",
          disabled: true,
        },
        {
          title: "Asmoid",
          link: "/dashboard/asmoid",
          icon: "pitMechanic",
          disabled: true,
        },
        {
          title: "Submit PKB Online",
          link: "/dashboard/submit-pkb-online",
          icon: "warehouse",
          disabled: true,
        },
        {
          title: "Pending PKB Request",
          link: "/dashboard/pending-pkb-request",
          icon: "rekening",
          disabled: true,
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
