import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { generateRoutes } from "@/utils/generateRoutes";
import { AdminSidebarItems } from "@/routes/AdminSidebarItems";

interface IProps {
  children: ReactNode;
}
export default function MainLayout({ children }: IProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar></Navbar>
      <div className="grow-1">{children}</div>
      <Footer></Footer>
    </div>
  );
}
