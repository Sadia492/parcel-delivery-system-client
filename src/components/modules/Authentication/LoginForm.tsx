import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useLoginUserMutation } from "@/redux/features/auth/auth.api";

type LoginFormValues = {
  email: string;
  password: string;
};

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { register, handleSubmit, reset } = useForm<LoginFormValues>();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      console.log(data);
      const response = await loginUser(data).unwrap();
      console.log("Login response:", response);

      toast.success("Logged in successfully!");
      reset();

      // Redirect to dashboard or home
      navigate("/");
    } catch (err: any) {
      console.error("Login error:", err);

      const message = err?.data?.message;

      if (message === "Password does not match") {
        toast.error("Invalid credentials");
      } else {
        toast.error(message || "Login failed");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your credentials below to login
        </p>
      </div>

      <div className="grid gap-6">
        {/* Email */}
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            {...register("email", { required: true })}
          />
        </div>

        {/* Password */}
        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            required
            {...register("password", { required: true })}
          />
        </div>

        {/* Submit */}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </div>

      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </form>
  );
}
