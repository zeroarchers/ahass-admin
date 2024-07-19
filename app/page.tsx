import Hero from "@/components/hero";
import { prisma } from "@/lib/prisma";
import Image from "next/image";

export default async function Home() {
  const user = await prisma.user.findFirst({
    where: {
      email: "user@nextmail.com",
    },
  });
  return (
    <div>
      <Hero />
      {user?.name}
      <Image src={user?.image!} alt={"image"} width={100} height={100} />
    </div>
  );
}
