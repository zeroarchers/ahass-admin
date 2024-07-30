import { dashboardConfig } from "@/config/dashboard";
import { MainNav } from "@/components/navigation/main-nav";
import { DashboardNav } from "@/components/navigation/nav";
import { UserAccountNav } from "@/components/navigation/user-account-nav";
import { auth } from "@/auth";
import { SignOutBtn } from "@/components/auth/sign-out-btn";
import { getUserByEmail } from "@/data/user";
import GoBackBtn from "@/components/misc/goback-button";
import { Toaster } from "@/components/ui/sonner";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await auth();
  const user = session?.user!;

  const user_details = await getUserByEmail(user.email!);

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
        <main className="grid grid-cols-1 gap-5 p-1 pb-20  overflow-scroll">
          <GoBackBtn />
          {children}
        </main>
      </div>
      <Toaster />
    </div>
  );
}
