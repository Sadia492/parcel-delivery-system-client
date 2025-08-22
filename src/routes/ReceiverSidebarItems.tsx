import ReceiverDashboard from "@/pages/Receiver/ReceiverDashboard";
import type { ISidebarItem } from "@/types";

export const ReceiverSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Home",
        url: "/receiver/dashboard",
        component: ReceiverDashboard,
      },
    ],
  },
];
