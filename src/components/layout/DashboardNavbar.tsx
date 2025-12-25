import { useState } from "react";
import {
  Bell,
  HelpCircle,
  User,
  LogOut,
  Package,
  Users,
  Shield,
  Search,
  Home,
  ChevronDown,
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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  useUserInfoQuery,
  useLogoutMutation,
} from "@/redux/features/auth/auth.api";
import { role } from "@/constants/role";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

export function DashboardNavbar() {
  const { data } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const [showSearch, setShowSearch] = useState(false);

  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap();
      toast.success("Logged out successfully!");
      window.location.href = "/";
    } catch (err) {
      toast.error("Failed to logout");
    }
  };

  const userRole = data?.data?.role;
  const userName = data?.data?.name || "User";
  const userEmail = data?.data?.email || "";
  const userInitials = userName
    .split(" ")
    .map((n: any) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // Get role-specific dashboard title
  const getDashboardTitle = () => {
    switch (userRole) {
      case role.admin:
        return "Admin Panel";
      case role.sender:
        return "Sender Dashboard";
      case role.receiver:
        return "Receiver Dashboard";
      default:
        return "Dashboard";
    }
  };

  // Get role color
  const getRoleColor = () => {
    switch (userRole) {
      case role.admin:
        return "bg-red-500";
      case role.sender:
        return "bg-blue-500";
      case role.receiver:
        return "bg-green-500";
      default:
        return "bg-gray-500";
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
    <header className="sticky top-0 z-50 flex h-16 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-3 sm:px-4 md:px-6">
      {/* Left side: Menu toggle and title */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <SidebarTrigger className="-ml-1 h-9 w-9" />

        <Separator orientation="vertical" className="h-6 hidden sm:block" />

        <div className="flex items-center gap-2 min-w-0">
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Package className="w-4 h-4 text-primary" />
            </div>
          </div>

          <div className="min-w-0">
            <h1 className="text-base sm:text-lg font-semibold text-foreground truncate">
              {getDashboardTitle()}
            </h1>
            <p className="text-xs text-muted-foreground truncate hidden sm:block">
              Welcome back, {userName}
            </p>
          </div>
        </div>
      </div>

      {/* Right side: User controls */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Mobile Search Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden h-9 w-9"
          onClick={() => setShowSearch(!showSearch)}
        >
          <Search className="w-5 h-5" />
        </Button>

        {/* Notifications - Mobile optimized */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-9 w-9">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <>
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full animate-pulse hidden sm:block"></span>
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 min-w-5 px-1 text-xs sm:hidden"
                  >
                    {unreadCount}
                  </Badge>
                </>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-72 sm:w-80 max-h-[80vh] overflow-y-auto"
          >
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
                  className="p-3 cursor-default focus:bg-transparent"
                >
                  <div
                    className={cn(
                      "flex items-start gap-3 w-full",
                      notification.unread && "bg-primary/5 rounded-lg p-2 -mx-2"
                    )}
                  >
                    <div
                      className={cn(
                        "p-2 rounded-full flex-shrink-0",
                        notification.unread ? "bg-primary/10" : "bg-muted"
                      )}
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
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    )}
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link to="/notifications" className="w-full">
                View all notifications
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Help - Hide on mobile, show in dropdown */}
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="hidden sm:inline-flex h-9 w-9"
        >
          <Link to="/help">
            <HelpCircle className="w-5 h-5" />
          </Link>
        </Button>

        {/* Theme Toggle */}
        <ModeToggle />

        {/* User Profile Dropdown - Mobile optimized */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "gap-1 sm:gap-2 px-1 sm:px-2 h-9",
                "overflow-hidden min-w-0"
              )}
            >
              <div className="relative">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium flex-shrink-0">
                  {userInitials}
                </div>
                <div
                  className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border-2 border-background ${getRoleColor()}`}
                />
              </div>

              {/* Show only on larger screens */}
              <div className="hidden md:block text-left min-w-0">
                <div className="text-sm font-medium truncate max-w-[120px]">
                  {userName}
                </div>
                <div className="text-xs text-muted-foreground capitalize truncate max-w-[120px]">
                  {userRole?.toLowerCase()}
                </div>
              </div>

              {/* Show only role on medium screens */}
              <div className="hidden sm:block md:hidden">
                <Badge variant="outline" className="text-xs capitalize px-1.5">
                  {userRole?.slice(0, 1)}
                </Badge>
              </div>

              <ChevronDown className="w-4 h-4 text-muted-foreground hidden sm:block flex-shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-64 sm:w-72"
            sideOffset={8}
          >
            <DropdownMenuLabel>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                    {userInitials}
                  </div>
                  <div
                    className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background ${getRoleColor()}`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{userName}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {userEmail}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Badge
                      variant="outline"
                      className="text-xs capitalize flex items-center gap-1"
                    >
                      {userRole === role.admin && (
                        <Shield className="w-3 h-3" />
                      )}
                      {userRole === role.sender && (
                        <Package className="w-3 h-3" />
                      )}
                      {userRole === role.receiver && (
                        <Users className="w-3 h-3" />
                      )}
                      {userRole?.toLowerCase()}
                    </Badge>
                  </div>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {/* Quick Links - Mobile friendly */}
            <div className="grid grid-cols-2 gap-1 p-2">
              <DropdownMenuItem
                asChild
                className="cursor-pointer justify-center"
              >
                <Link to="/" className="flex flex-col items-center p-2 rounded">
                  <Home className="w-4 h-4 mb-1" />
                  <span className="text-xs">Home</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                asChild
                className="cursor-pointer justify-center"
              >
                <Link
                  to="/profile"
                  className="flex flex-col items-center p-2 rounded"
                >
                  <User className="w-4 h-4 mb-1" />
                  <span className="text-xs">Profile</span>
                </Link>
              </DropdownMenuItem>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
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
