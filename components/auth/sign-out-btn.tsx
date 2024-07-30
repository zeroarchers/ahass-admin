"use client";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function SignOutBtn() {
  return (
    <Button
      onClick={() =>
        signOut({ callbackUrl: `${window.location.origin}/login` })
      }
      variant="destructive"
      className="mt-5"
    >
      Sign Out
    </Button>
  );
}
