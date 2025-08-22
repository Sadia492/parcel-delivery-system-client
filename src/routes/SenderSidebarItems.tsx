import Users from "@/pages/Admin/Users";
import type { ISidebarItem } from "@/types";

export const SenderSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Users",
        url: "/sender/users",
        component: Users,
      },
    ],
  },
];
