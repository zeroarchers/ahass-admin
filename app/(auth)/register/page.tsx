"use client";

import { SignIn } from "@/components/auth/google-sign-in-btn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast, Toaster } from "sonner";

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
import { registerSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { register } from "@/actions/auth";

import {
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function Page() {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nama: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    const { result, description } = await register(values);
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
        <CardTitle>Register</CardTitle>
        <CardDescription className="w-2/3 mx-auto">
          Input nama, email, dan password anda untuk membuat akun ke sistem
          ahass.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid  gap-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-y-5">
              <FormField
                control={form.control}
                name="nama"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama</FormLabel>
                    <FormControl>
                      <Input placeholder="Nama Lengkap" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <Button type="submit">Register</Button>
            </div>
          </form>
        </Form>
        <SignIn />
        <div className="mt-4 text-center text-sm">
          Sudah memiliki akun?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
      <Toaster />
    </>
  );
}
