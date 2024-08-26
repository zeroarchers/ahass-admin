import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const CircularProgress = ({ className }: { className?: string }) => (
  <div
    className={cn(
      className,
      "fixed z-50 justify-center items-center top-0 left-0 w-screen h-screen",
    )}
  >
    <Loader2
      color="#dc2626"
      className="border-foreground opacity-100 w-20 h-20 animate-spin"
    />
  </div>
);
