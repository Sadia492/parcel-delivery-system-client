import Logo from "@/assets/icons/Logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuContent,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ModeToggle } from "./ModeToggler";
import { Link } from "react-router";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { role } from "@/constants/role";
import {
  HelpCircle,
  Shield,
  FileText,
  Home,
  Package,
  MapPin,
  User,
  Info,
  Mail,
  ChevronDown,
  Users,
  Settings,
} from "lucide-react";

// Main navigation links
const mainNavigationLinks = [
  { href: "/", label: "Home", icon: <Home className="w-4 h-4" /> },
  {
    href: "/all-parcels",
    label: "All Parcels",
    icon: <Package className="w-4 h-4" />,
  },
  {
    href: "/track",
    label: "Track Parcel",
    icon: <MapPin className="w-4 h-4" />,
  },
  { href: "/about", label: "About", icon: <Info className="w-4 h-4" /> },
  { href: "/contact", label: "Contact", icon: <Mail className="w-4 h-4" /> },
  { href: "/help", label: "Help", icon: <HelpCircle className="w-4 h-4" /> },
];

// Dashboard links (role-based)
const dashboardLinks = [
  {
    href: "/admin",
    label: "Admin Dashboard",
    role: role.admin,
    icon: <User className="w-4 h-4" />,
  },
  {
    href: "/receiver",
    label: "Receiver Dashboard",
    role: role.receiver,
    icon: <Package className="w-4 h-4" />,
  },
  {
    href: "/sender",
    label: "Sender Dashboard",
    role: role.sender,
    icon: <Users className="w-4 h-4" />,
  },
];

// Mega Menu for Legal & Policies
const legalPolicyItems = [
  {
    title: "Privacy Policy",
    href: "/privacy",
    description: "How we protect your data",
    icon: <Shield className="w-5 h-5" />,
  },
  {
    title: "Terms & Conditions",
    href: "/terms",
    description: "Our terms of service",
    icon: <FileText className="w-5 h-5" />,
  },
];

export default function Navbar() {
  const { data } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
  };

  const userDashboardLink = dashboardLinks.find(
    (link) => link.role === data?.data?.role
  );

  return (
    <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-11/12 mx-auto px-4 flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-64 p-3 md:hidden">
              {/* Mobile Navigation */}
              <div className="space-y-4">
                {/* Main Links */}
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Navigation
                  </h3>
                  {mainNavigationLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors"
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  ))}
                </div>

                {/* Legal & Policies Dropdown */}
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Legal & Policies
                  </h3>
                  {legalPolicyItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors"
                    >
                      {item.icon}
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {item.description}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Dashboard Link (if logged in) */}
                {userDashboardLink && (
                  <div className="space-y-2 pt-4 border-t">
                    <Link
                      to={userDashboardLink.href}
                      className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    >
                      {userDashboardLink.icon}
                      {userDashboardLink.label}
                    </Link>
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>

          {/* Desktop Navigation */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="text-primary hover:text-primary/90 flex items-center gap-2 font-bold"
            >
              <Logo /> ParcelGuru
            </Link>

            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-1">
                {/* Main Navigation Links */}
                {mainNavigationLinks.map((link) => (
                  <NavigationMenuItem key={link.href}>
                    <NavigationMenuLink
                      asChild
                      className="text-muted-foreground hover:text-primary px-3 py-2 font-medium"
                    >
                      <Link to={link.href}>
                        <div className="flex items-center gap-2">
                          {link.icon}
                          {link.label}
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}

                {/* Legal & Policies Mega Menu */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-muted-foreground hover:text-primary px-3 py-2 font-medium">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Legal
                      <ChevronDown className="w-3 h-3 ml-1 transition-transform duration-200" />
                    </div>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[400px] p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <h3 className="font-semibold text-foreground">
                            Policies
                          </h3>
                          {legalPolicyItems.map((item) => (
                            <Link
                              key={item.href}
                              to={item.href}
                              className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
                            >
                              <div className="p-2 rounded-md bg-primary/10 group-hover:bg-primary/20">
                                {item.icon}
                              </div>
                              <div>
                                <div className="font-medium text-foreground">
                                  {item.title}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {item.description}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="space-y-3">
                          <h3 className="font-semibold text-foreground">
                            Compliance
                          </h3>
                          <div className="space-y-2">
                            <div className="p-3 rounded-lg bg-muted/50">
                              <div className="font-medium">GDPR Compliant</div>
                              <div className="text-sm text-muted-foreground">
                                We follow data protection regulations
                              </div>
                            </div>
                            <div className="p-3 rounded-lg bg-muted/50">
                              <div className="font-medium">
                                Secure Transactions
                              </div>
                              <div className="text-sm text-muted-foreground">
                                All payments are encrypted
                              </div>
                            </div>
                            <div className="p-3 rounded-lg bg-muted/50">
                              <div className="font-medium">Privacy First</div>
                              <div className="text-sm text-muted-foreground">
                                Your data is protected
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Dashboard Link (if logged in) */}
                {userDashboardLink && (
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      asChild
                      className="text-primary hover:text-primary/80 px-3 py-2 font-medium"
                    >
                      <Link to={userDashboardLink.href}>
                        <div className="flex items-center gap-2">
                          {userDashboardLink.icon}
                          Dashboard
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ModeToggle />
          {data?.data?.email ? (
            <div className="flex items-center gap-2">
              <Button
                onClick={handleLogout}
                variant="outline"
                className="text-sm"
              >
                Logout
              </Button>
              {/* User Profile Dropdown */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-56 p-2">
                  <div className="space-y-2">
                    <div className="px-3 py-2">
                      <div className="font-medium truncate">
                        {data.data.name || data.data.email}
                      </div>
                      <div className="text-sm text-muted-foreground truncate">
                        {data.data.email}
                      </div>
                    </div>
                    <div className="border-t">
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors"
                      >
                        <User className="w-4 h-4" />
                        My Profile
                      </Link>
                      <Link
                        to={userDashboardLink?.href || "/"}
                        className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors"
                      >
                        <Package className="w-4 h-4" />
                        My Parcels
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-muted transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <Button asChild className="text-sm">
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
