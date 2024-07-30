"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";

export default function GoBackBtn() {
  const router = useRouter();
  const path = usePathname();
  if (path == "/dashboard") return null;
  return (
    <div>
      <Button variant="outline" onClick={() => router.back()}>
        <ArrowLeft className="mr-2" />
        Go Back
      </Button>
    </div>
  );
}
