import AdminDashboard from "@/pages/Admin/AdminDashboard";
import Parcels from "@/pages/Admin/Parcels";
import Users from "@/pages/Admin/Users";
import type { ISidebarItem } from "@/types";

export const AdminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/admin/dashboard",
        component: AdminDashboard,
      },
      {
        title: "Users",
        url: "/admin/users",
        component: Users,
      },
      {
        title: "Parcels",
        url: "/admin/parcels",
        component: Parcels,
      },
    ],
  },
];
