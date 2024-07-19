import { auth } from "@/auth";
import { redirect } from "next/navigation";
export async function getCurrentUser() {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    redirect("/login");
  }
  return user;
}
