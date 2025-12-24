// components/DashboardNavbar.tsx
import { useState } from "react";
import {
  Home,
  Bell,
  HelpCircle,
  User,
  Settings,
  LogOut,
  Package,
  Users,
  Shield,
  Search,
  Menu,
} from "lucide-react";
import { Link } from "react-router";
import { ModeToggle } from "./ModeToggler";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  useUserInfoQuery,
  useLogoutMutation,
  authApi,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { role } from "@/constants/role";
import toast from "react-hot-toast";

interface DashboardNavbarProps {
  onMenuClick?: () => void;
}

export function DashboardNavbar({ onMenuClick }: DashboardNavbarProps) {
  const { data } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();
      dispatch(authApi.util.resetApiState());
      toast.success("Logged out successfully!");
      window.location.href = "/";
    } catch (err) {
      toast.error("Failed to logout");
    }
  };

  const userRole = data?.data?.role;
  const userName = data?.data?.name || "User";
  const userEmail = data?.data?.email || "";

  // Get role-specific dashboard title
  const getDashboardTitle = () => {
    switch (userRole) {
      case role.admin:
        return "Admin Dashboard";
      case role.sender:
        return "Sender Dashboard";
      case role.receiver:
        return "Receiver Dashboard";
      default:
        return "Dashboard";
    }
  };

  // Get role icon
  const getRoleIcon = () => {
    switch (userRole) {
      case role.admin:
        return <Shield className="w-4 h-4" />;
      case role.sender:
        return <Package className="w-4 h-4" />;
      case role.receiver:
        return <Users className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const notifications = [
    {
      id: 1,
      title: "Parcel Approved",
      desc: "Your parcel TRK-2024-123 has been approved",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      title: "Out for Delivery",
      desc: "Your parcel is out for delivery",
      time: "Yesterday",
      unread: true,
    },
    {
      id: 3,
      title: "Payment Received",
      desc: "Payment of $25.50 has been received",
      time: "2 days ago",
      unread: false,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6">
      {/* Left side: Menu toggle and breadcrumb */}
      <div className="flex items-center gap-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="h-6" />

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Package className="w-4 h-4 text-primary" />
            </div>
            <Separator orientation="vertical" className="h-6" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              {getDashboardTitle()}
            </h1>
            <p className="text-xs text-muted-foreground hidden sm:block">
              Welcome back, {userName}
            </p>
          </div>
        </div>
      </div>

      {/* Center: Search Bar (Desktop only) */}
      <div className="hidden lg:flex flex-1 max-w-md mx-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search parcels, transactions..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Right side: User controls */}
      <div className="ml-auto flex items-center gap-2">
        {/* Mobile Search Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => {
            /* Add search modal toggle */
          }}
        >
          <Search className="w-5 h-5" />
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex justify-between items-center">
              <span>Notifications</span>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {unreadCount} new
                </Badge>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className="p-3 cursor-default"
                >
                  <div
                    className={`flex items-start gap-3 ${
                      notification.unread
                        ? "bg-primary/5 rounded-lg -mx-2 -my-1 p-2"
                        : ""
                    }`}
                  >
                    <div
                      className={`p-2 rounded-full ${
                        notification.unread ? "bg-primary/10" : "bg-muted"
                      }`}
                    >
                      <Bell className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {notification.title}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {notification.desc}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notification.time}
                      </p>
                    </div>
                    {notification.unread && (
                      <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                    )}
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link to="/dashboard/notifications" className="w-full">
                View all notifications
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Help */}
        <Button variant="ghost" size="icon" asChild>
          <Link to="/help">
            <HelpCircle className="w-5 h-5" />
          </Link>
        </Button>

        {/* Theme Toggle */}
        <ModeToggle />

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 px-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                {getRoleIcon()}
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium truncate max-w-[120px]">
                  {userName}
                </div>
                <div className="text-xs text-muted-foreground capitalize truncate max-w-[120px]">
                  {userRole?.toLowerCase()}
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  {getRoleIcon()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{userName}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {userEmail}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Badge variant="outline" className="text-xs capitalize">
                      {userRole?.toLowerCase()}
                    </Badge>
                  </div>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem asChild className="cursor-pointer">
              <Link to="/dashboard">
                <Home className="w-4 h-4 mr-2" />
                Dashboard Home
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild className="cursor-pointer">
              <Link to="/profile">
                <User className="w-4 h-4 mr-2" />
                My Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild className="cursor-pointer">
              <Link to="/dashboard/parcels">
                <Package className="w-4 h-4 mr-2" />
                Manage Parcels
              </Link>
            </DropdownMenuItem>

            {userRole === role.admin && (
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to="/dashboard/users">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Users
                </Link>
              </DropdownMenuItem>
            )}

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild className="cursor-pointer">
              <Link to="/help">
                <HelpCircle className="w-4 h-4 mr-2" />
                Help & Support
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer text-red-600 focus:text-red-600"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
