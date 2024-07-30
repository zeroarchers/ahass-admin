import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function SignIn() {
  return (
    <Button
      onClick={() => signIn("google")}
      variant="secondary"
      className="w-full"
    >
      <Image
        src="https://authjs.dev/img/providers/google.svg"
        width={25}
        height={25}
        alt="Google Logo"
        className="h-full mr-2"
      />
      Signin with Google
    </Button>
  );
}
