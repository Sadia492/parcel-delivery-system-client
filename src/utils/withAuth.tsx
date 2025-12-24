import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";
import LoadingSpinner from "@/components/LoadingSpinner";

export const withAuth = <P extends object>(
  Component: ComponentType<P>,
  requiredRole?: TRole | TRole[]
) => {
  return function AuthWrapper(props: P) {
    const { data, isLoading } = useUserInfoQuery(undefined);

    // Show loading while checking auth
    if (isLoading) {
      return <LoadingSpinner />;
    }

    // Redirect to login if not authenticated
    if (!data?.data?.email) {
      return <Navigate to="/login" />;
    }

    // Check if requiredRole is an array (multiple roles allowed)
    if (requiredRole) {
      const userRole = data?.data?.role as TRole;

      if (Array.isArray(requiredRole)) {
        // If requiredRole is an array, check if user has one of the roles
        if (!requiredRole.includes(userRole)) {
          return <Navigate to="/unauthorized" />;
        }
      } else {
        // If requiredRole is a single role
        if (requiredRole !== userRole) {
          return <Navigate to="/unauthorized" />;
        }
      }
    }

    // User is authenticated and has required role
    return <Component {...props} />;
  };
};
