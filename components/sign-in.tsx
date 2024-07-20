import { signIn } from "@/auth";
import { Button } from "./ui/button";
import Image from "next/image";

export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button type="submit" variant="secondary" className="w-full">
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          width={25}
          height={25}
          alt="Google Logo"
          className="h-full mr-2"
        />
        Signin with Google
      </Button>
    </form>
  );
}
