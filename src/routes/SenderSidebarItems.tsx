import Parcels from "@/pages/Sender/Parcels";
import SenderDashboard from "@/pages/Sender/SenderDashboard";
import type { ISidebarItem } from "@/types";

export const SenderSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/sender/overview",
        component: SenderDashboard,
      },
      {
        title: "Parcels",
        url: "/sender/parcels",
        component: Parcels,
      },
    ],
  },
];
