import type { Icon } from "lucide-react";
import "@tanstack/react-table";

import { Icons } from "@/components/misc/icons";
import type {
  PKB,
  JasaPKB,
  SparepartPKB,
  Jasa,
  SparePart,
  Kendaraan,
  BAG,
} from "@prisma/client";

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: NavLink[];
    }
);

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
};

export type DocsConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

export type MarketingConfig = {
  mainNav: MainNavItem[];
};

export type DashboardConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

export type SubscriptionPlan = {
  name: string;
  description: string;
  stripePriceId: string;
};

export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, "stripeCustomerId" | "stripeSubscriptionId"> & {
    stripeCurrentPeriodEnd: number;
    isPro: boolean;
  };

export type Content = {
  sections: {
    title: string;
    description: string;
    cards: {
      title: string;
      link: string;
      icon?: keyof typeof Icons; // Icon should be optional and match Icons keys
    }[];
  }[];
};

type TipeKendaraanWithAHM = {
  id: number;
  idTipeKendaraanAHM: number;
  tipe: string;
  namaTipe: string;
  cc: number;
  model: string;
  aktif: boolean;
  TipeKendaraanAHM: {
    kodeTipeKendaraanAHM: string | null;
  };
};

export type KendaraanWithDetails = {
  no_polisi: string;
  statusAktif: boolean;
  kode_customer: string;
  kode_pemilik: string;
  namaTipeKendaraan: string;
  warna: string;
  tahun_rakit: string;
  no_rangka: string;
  no_mesin: string;
  customer: {
    nama: string;
  };
  tipeKendaraan: string | null;
};

export type PKBWithRelations = PKB & {
  jasaPKB: (JasaPKB & { jasa: Jasa })[];
  sparepartPKB: (SparepartPKB & { sparepart: SparePart })[];
  kendaraan: Kendaraan;
};

export type BAGWithSpareparts = BAG & {
  spareparts: SparePart[];
};
