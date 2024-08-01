"use server";
import { prisma } from "@/lib/prisma";
import * as z from "zod";

import { customerFormSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCustomerById } from "@/data/customer";

export async function createCustomer(data: z.infer<typeof customerFormSchema>) {
  const validatedData = customerFormSchema.safeParse(data);

  if (!validatedData.success) {
    return { result: "Error!", description: "Input data tidak valid!" };
  }

  await prisma.customer.create({ data: validatedData.data });
  revalidatePath("/dashboard/customer");
  redirect("/dashboard/customer");
}

export async function updateCustomer(data: z.infer<typeof customerFormSchema>) {
  const validatedData = customerFormSchema.safeParse(data);
  if (!validatedData.success) {
    return { result: "Error!", description: "Input data tidak valid!" };
  }

  await prisma.customer.update({
    where: {
      kode: validatedData.data.kode,
    },
    data: validatedData.data,
  });
  revalidatePath("/dashboard/customer");
  redirect("/dashboard/customer");
}

export async function deleteCustomer(id: string) {
  const customer_exist = getCustomerById(id);
  if (!customer_exist) {
    return { result: "Error!", description: "Input data tidak valid!" };
  }
  await prisma.customer.delete({
    where: {
      kode: id,
    },
  });
  revalidatePath("/dashboard/customer");
  return { result: "Success!", description: "Berhasil menghapus Customer!" };
}
