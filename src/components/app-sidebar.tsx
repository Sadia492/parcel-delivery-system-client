import * as React from "react";
import { useLocation } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Logo from "@/assets/icons/Logo";
import { Link } from "react-router";
import { getSidebarItems } from "@/utils/getSidebarItems";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { cn } from "@/lib/utils";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const { data: userData } = useUserInfoQuery(undefined);

  const data = {
    navMain: getSidebarItems(userData?.data?.role),
  };

  return (
    <Sidebar {...props} className="border-r bg-background">
      <SidebarHeader className="px-4 py-6">
        <Link to="/" className="flex justify-center items-center gap-3 group">
          <div>
            <Logo />
          </div>
          <div>
            <h1 className="text-xl font-bold text-primary tracking-tight">
              ParcelGuru
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Smart Delivery System
            </p>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-4">
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title} className="mb-6">
            <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-2">
              {item.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((navItem) => {
                  const isActive = location.pathname === navItem.url;
                  return (
                    <SidebarMenuItem key={navItem.title}>
                      <SidebarMenuButton asChild>
                        <Link
                          to={navItem.url}
                          className={cn(
                            "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group",
                            isActive
                              ? "bg-primary text-primary-foreground shadow-sm"
                              : "hover:bg-accent text-foreground hover:text-foreground"
                          )}
                        >
                          <span className="font-medium ml-4">
                            {navItem.title}
                          </span>

                          {isActive && (
                            <div className="ml-auto w-2 h-2 bg-primary-foreground rounded-full animate-pulse" />
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
