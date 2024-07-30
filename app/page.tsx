import Hero from "@/components/landing/hero";
import { SiteFooter } from "@/components/landing/site-footer";

export default async function Home() {
  return (
    <div>
      <Hero />
      <SiteFooter />
    </div>
  );
}
