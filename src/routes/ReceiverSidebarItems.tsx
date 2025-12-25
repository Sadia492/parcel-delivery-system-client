import MyParcels from "@/pages/Receiver/MyParcels";
import ReceiverDashboard from "@/pages/Receiver/ReceiverDashboard";
import type { ISidebarItem } from "@/types";

export const ReceiverSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        url: "/receiver/dashboard",
        component: ReceiverDashboard,
      },
      {
        title: "My Parcels",
        url: "/receiver/my-parcels",
        component: MyParcels,
      },
    ],
  },
];
