"use client";

import { useMemo } from "react";
import { useAuth } from "./useAuth";
import { UserRole } from "@/lib/types";

type RoleRequirement = UserRole | UserRole[] | undefined;

export const useUserRole = (requiredRole?: RoleRequirement) => {
  const { user } = useAuth();

  const canAccess = useMemo(() => {
    if (!requiredRole) return Boolean(user);
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(user?.role as UserRole);
    }
    return user?.role === requiredRole;
  }, [user, requiredRole]);

  return {
    user,
    requiredRole,
    canAccess,
    is: (role: UserRole) => user?.role === role,
    isOneOf: (roles: UserRole[]) => (user ? roles.includes(user.role) : false),
  };
};
