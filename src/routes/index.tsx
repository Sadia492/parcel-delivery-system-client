import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { AdminSidebarItems } from "./AdminSidebarItems";
import { SenderSidebarItems } from "./SenderSidebarItems";
import { ReceiverSidebarItems } from "./ReceiverSidebarItems";
import { withAuth } from "@/utils/withAuth";
import type { TRole } from "@/types";
import { role } from "@/constants/role";
import Home from "@/pages/Home";
import TrackParcel from "@/pages/TrackParcel";
import AllParcels from "@/pages/AllParcels";
import ParcelDetails from "@/pages/ParcelDetails";
import HelpSupport from "@/pages/HelpSupport";
import PrivacyPolicy from "@/pages/Privacy";
import TermsConditions from "@/pages/Term";
import ProfilePage from "@/pages/Profile";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: Home,
        path: "/",
      },
      {
        Component: About,
        path: "/about",
      },
      {
        Component: Contact,
        path: "/contact",
      },
      {
        Component: TrackParcel,
        path: "/track",
      },
      {
        Component: AllParcels,
        path: "/all-parcels",
      },
      {
        Component: ParcelDetails,
        path: "/parcel/:id",
      },
      {
        Component: HelpSupport,
        path: "/help",
      },
      {
        Component: PrivacyPolicy,
        path: "/privacy",
      },
      {
        Component: TermsConditions,
        path: "/terms",
      },
      {
        Component: withAuth(ProfilePage, [
          role.admin as TRole,
          role.sender as TRole,
          role.receiver as TRole,
        ]),
        path: "/profile",
      },
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.admin as TRole),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to="/admin/dashboard" /> },
      ...generateRoutes(AdminSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.sender as TRole),
    path: "/sender",
    children: [
      { index: true, element: <Navigate to="/sender/dashboard" /> },
      ...generateRoutes(SenderSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.receiver as TRole),
    path: "/receiver",
    children: [
      { index: true, element: <Navigate to="/receiver/dashboard" /> },
      ...generateRoutes(ReceiverSidebarItems),
    ],
  },
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },
]);
