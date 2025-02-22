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
      title: "Stok",
      description: "",
      cards: [
        {
          title: "Informasi Stock",
          link: "/dashboard/informasi-stok",
          icon: "blocks",
        },
      ],
    },
    {
      title: "BAG",
      description: "",
      cards: [{ title: "BAG", link: "/dashboard/bag", icon: "warehouse" }],
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
