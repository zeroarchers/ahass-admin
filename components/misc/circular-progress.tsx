import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
export const CircularProgress = ({ className }: { className?: string }) => (
  <div
    className={cn(
      className,
      "fixed bg-black opacity-50 z-20 justify-center items-center top-0 left-0 w-screen h-screen",
    )}
  >
    <Loader2 className="w-20 h-20 animate-spin" />
  </div>
);
