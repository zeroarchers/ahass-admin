"use client";

import { SignIn } from "@/components/auth/google-sign-in-btn";
import { loginSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";

import { useForm } from "react-hook-form";
import { login } from "@/actions/auth";
import {
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { toast } from "sonner";

export default function Page() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values);

    const { result, description } = await login(values);
    toast(result, {
      description,
      action: {
        label: "Oke!",
        onClick: () => toast.dismiss,
      },
    });
    form.reset();
  }

  return (
    <>
      <CardHeader className="text-center">
        <CardTitle>Login</CardTitle>
        <CardDescription className="w-2/3 mx-auto">
          Input email dan password anda untuk masuk ke sistem ahass.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid  gap-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="nama@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="********"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Login</Button>
            </div>
          </form>
        </Form>
        <SignIn />
        <div className="mt-4 text-center text-sm">
          Belum memiliki akun?{" "}
          <Link href="/register" className="underline">
            Register
          </Link>
        </div>
      </CardContent>
    </>
  );
}
