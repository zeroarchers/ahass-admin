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
    },
    {
      title: "Pembelian",
      href: "/dashboard/pembelian",
      icon: "buy",
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
    },
    {
      title: "Absensi",
      href: "/dashboard/absensi",
      icon: "time",
    },
    {
      title: "Keuangan",
      href: "/dashboard/keuangan",
      icon: "money",
    },
    {
      title: "Board",
      href: "/dashboard/board",
      icon: "board",
    },
    {
      title: "Reminder",
      href: "/dashboard/reminder",
      icon: "reminder",
    },
    {
      title: "Report",
      href: "/dashboard/report",
      icon: "report",
    },
    {
      title: "Pengaturan",
      href: "/dashboard/pengaturan",
      icon: "settings",
    },
  ],
};
