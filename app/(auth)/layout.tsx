import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[400px] gap-6">
          <div className="grid gap-2 text-center"></div>
          <Card>{children}</Card>
        </div>
      </div>
      <div className="hidden bg-muted lg:flex">
        <Image
          src="/logo_ahass.png"
          alt="Image"
          width="1080"
          height="720"
          className="w-[90%] mt-auto m-auto object-center dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
