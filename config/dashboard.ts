import { DashboardConfig } from "@/types";

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Master Data",
      href: "/dashboard",
      icon: "master",
    },
    {
      title: "Service",
      href: "/dashboard/servis",
      icon: "service",
    },
    {
      title: "Penjualan",
      href: "/dashboard/penjualan",
      icon: "sell",
      disabled: true,
    },
    {
      title: "Pembelian",
      href: "/dashboard/pembelian",
      icon: "buy",
      disabled: true,
    },
    {
      title: "Persediaan",
      href: "/dashboard/persediaan",
      icon: "stock",
    },
    {
      title: "Stock Opname",
      href: "/dashboard/stock-opname",
      icon: "opname",
      disabled: true,
    },
    {
      title: "Absensi",
      href: "/dashboard/absensi",
      icon: "time",
      disabled: true,
    },
    {
      title: "Keuangan",
      href: "/dashboard/keuangan",
      icon: "money",
      disabled: true,
    },
    {
      title: "Board",
      href: "/dashboard/board",
      icon: "board",
      disabled: true,
    },
    {
      title: "Reminder",
      href: "/dashboard/reminder",
      icon: "reminder",
      disabled: true,
    },
    {
      title: "Report",
      href: "/dashboard/report",
      icon: "report",
      disabled: true,
    },
    {
      title: "Pengaturan",
      href: "/dashboard/pengaturan",
      icon: "settings",
      disabled: true,
    },
  ],
};
