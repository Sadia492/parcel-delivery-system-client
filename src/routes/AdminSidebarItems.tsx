import Parcels from "@/pages/Admin/Parcels";
import Users from "@/pages/Admin/Users";
import type { ISidebarItem } from "@/types";

export const AdminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
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
