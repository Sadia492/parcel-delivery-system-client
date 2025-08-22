import Parcels from "@/pages/Sender/Parcels";
import type { ISidebarItem } from "@/types";

export const SenderSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Parcels",
        url: "/sender/parcels",
        component: Parcels,
      },
    ],
  },
];
