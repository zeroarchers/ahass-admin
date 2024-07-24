import { dashboardConfig } from "@/config/dashboard";
import { MainNav } from "@/components/main-nav";
import { DashboardNav } from "@/components/nav";
import { UserAccountNav } from "@/components/user-account-nav";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { SignOutBtn } from "@/components/sign-out-btn";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await auth();
  const user = session?.user!;

  const user_details = await prisma.user.findUnique({
    where: {
      email: user.email!,
    },
  });

  if (!user_details?.emailVerified) {
    return (
      <div className="w-full flex flex-col justify-center items-center h-[100vh] ">
        <h1 className="text-4xl font-black">You have not been verified.</h1>
        <p>Wait for the administrator to verify you.</p>
        <SignOutBtn />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav items={dashboardConfig.sidebarNav} />
          <UserAccountNav
            user={{
              name: user.name,
              image: user.image,
              email: user.email,
            }}
          />
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex md:fixed">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>

        <div></div>
        <main className="grid grid-cols-1 gap-5 p-1  overflow-scroll">
          {children}
        </main>
      </div>
    </div>
  );
}
