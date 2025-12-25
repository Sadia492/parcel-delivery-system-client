import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import {
  useLoginUserMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useState } from "react";
import { Eye, EyeOff, User, Shield, Package, Users } from "lucide-react";

type LoginFormValues = {
  email: string;
  password: string;
};

type DemoUser = {
  role: string;
  email: string;
  password: string;
  icon: React.ReactNode;
  description: string;
};

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { register, handleSubmit, reset, setValue } =
    useForm<LoginFormValues>();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const { data: userData, refetch: refetchUserInfo } = useUserInfoQuery(
    undefined,
    {
      refetchOnMountOrArgChange: false,
    }
  );

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // Demo users with different roles
  const demoUsers: DemoUser[] = [
    {
      role: "admin",
      email: "zasil@gmail.com",
      password: "zasil12",
      icon: <Shield className="w-4 h-4" />,
      description: "Full system access",
    },
    {
      role: "sender",
      email: "snig@gmail.com",
      password: "snig12",
      icon: <Package className="w-4 h-4" />,
      description: "Send parcels and track",
    },
    {
      role: "receiver",
      email: "amina@gmail.com",
      password: "amina12",
      icon: <Users className="w-4 h-4" />,
      description: "Receive and confirm parcels",
    },
  ];

  const fillCredentials = (user: DemoUser) => {
    setValue("email", user.email);
    setValue("password", user.password);
  };

  const onSubmit = async (data: LoginFormValues) => {
    console.log("🔵 Starting login process...");
    console.log("🔵 Form data:", data);

    try {
      // Step 1: Login the user
      console.log("🔵 Calling loginUser mutation...");
      const loginResponse = await loginUser(data).unwrap();
      console.log("✅ Login response:", loginResponse);

      if (loginResponse?.success) {
        toast.success("Login successful! Redirecting...");

        // Check if user data is in login response
        const userFromResponse =
          loginResponse.data?.user || loginResponse.data || loginResponse.user;
        console.log("🔵 User from login response:", userFromResponse);

        if (userFromResponse?.role) {
          // User data already in response - use it directly
          console.log(
            "✅ Found role in login response:",
            userFromResponse.role
          );
          redirectBasedOnRole(userFromResponse.role);
        } else {
          // Try to fetch user info
          console.log("🔵 No role in login response, fetching user info...");
          try {
            const userInfoResponse = await refetchUserInfo();
            console.log("✅ User info response:", userInfoResponse);

            if (userInfoResponse.data?.success && userInfoResponse.data?.data) {
              const userRole = userInfoResponse.data.data.role;
              console.log("✅ User role from API:", userRole);
              redirectBasedOnRole(userRole);
            } else {
              console.log("❌ Could not get user role from API");
              navigate("/");
            }
          } catch (userInfoError) {
            console.error("❌ Failed to fetch user info:", userInfoError);
            // Still navigate to home if user info fails
            navigate("/");
          }
        }
      } else {
        console.log("❌ Login response not successful");
      }
    } catch (err: any) {
      console.error("❌ Login error:", err);
      const message = err?.data?.message;
      if (message === "Password does not match") {
        toast.error("Invalid credentials");
      } else {
        toast.error(message || "Login failed");
      }
    }
  };

  const redirectBasedOnRole = (role: string) => {
    console.log("🔵 Redirecting based on role:", role);

    let redirectPath = "/";

    switch (role?.toUpperCase()) {
      case "ADMIN":
        redirectPath = "/admin/dashboard";
        break;
      case "SENDER":
        redirectPath = "/sender/dashboard";
        break;
      case "RECEIVER":
        redirectPath = "/receiver/dashboard";
        break;
      default:
        redirectPath = "/";
    }

    console.log("✅ Redirecting to:", redirectPath);
    reset();
    navigate(redirectPath);
    toast.success(`Welcome! Redirecting to ${role} dashboard...`);
  };

  // Log current user data for debugging
  console.log("🔵 Current userData:", userData);
  console.log("🔵 Can refetch user info:", refetchUserInfo);

  return (
    <div className="w-full max-w-md mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <User className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
          <p className="text-muted-foreground text-sm">
            Sign in to your ParcelGuru account
          </p>
        </div>

        {/* Demo Credentials Section */}
        <div className="space-y-3">
          <div className="text-sm font-medium text-foreground text-center">
            Try Demo Credentials
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {demoUsers.map((user) => (
              <button
                key={user.role}
                type="button"
                onClick={() => fillCredentials(user)}
                className="flex flex-col items-center gap-2 p-3 rounded-lg border hover:border-primary hover:bg-primary/5 transition-colors group"
              >
                <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20">
                  {user.icon}
                </div>
                <div className="text-center">
                  <div className="font-medium text-sm capitalize text-foreground">
                    {user.role}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {user.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or sign in with credentials
            </span>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Email */}
          <div className="grid gap-3">
            <Label htmlFor="email" className="text-foreground">
              Email Address
            </Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                {...register("email", { required: true })}
                className="pl-10"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>

          {/* Password */}
          <div className="grid gap-3">
            <div className="flex justify-between items-center">
              <Label htmlFor="password" className="text-foreground">
                Password
              </Label>
              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:text-primary/80"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                {...register("password", { required: true })}
                className="pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
            size="lg"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Signing in...
              </div>
            ) : (
              "Sign In"
            )}
          </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-primary font-medium hover:text-primary/80 underline-offset-4 hover:underline"
          >
            Create account
          </Link>
        </div>
      </form>
    </div>
  );
}
