import Users from "@/pages/Admin/Users";
import type { ISidebarItem } from "@/types";

export const ReceiverSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Users",
        url: "/receiver/users",
        component: Users,
      },
    ],
  },
];
