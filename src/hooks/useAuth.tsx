"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { createMockUser, getDemoUser, persistUser, readPersistedUser } from "@/lib/auth";
import { User, UserRole } from "@/lib/types";

interface AuthContextValue {
  user: User | null;
  loginAsParticipant: () => void;
  loginAsHost: () => void;
  loginAsInstitutionAdmin: () => void;
  loginAsPlatformAdmin: () => void;
  loginWithEmail: (user: User) => void;
  registerUser: (params: {
    name: string;
    email: string;
    role: Exclude<UserRole, "platform_admin">;
    institutionId?: string | null;
    institutionName?: string;
  }) => User;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() =>
    typeof window === "undefined" ? null : readPersistedUser()
  );

  const handleLogin = useCallback((nextUser: User) => {
    setUser(nextUser);
    persistUser(nextUser);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    persistUser(null);
  }, []);

  const loginAsParticipant = useCallback(() => handleLogin(getDemoUser("participant")), [handleLogin]);
  const loginAsHost = useCallback(() => handleLogin(getDemoUser("host")), [handleLogin]);
  const loginAsInstitutionAdmin = useCallback(
    () => handleLogin(getDemoUser("institution_admin")),
    [handleLogin]
  );
  const loginAsPlatformAdmin = useCallback(
    () => handleLogin(getDemoUser("platform_admin")),
    [handleLogin]
  );

  const loginWithEmail = useCallback((nextUser: User) => handleLogin(nextUser), [handleLogin]);

  const registerUser = useCallback(
    ({
      name,
      email,
      role,
      institutionId,
      institutionName,
    }: {
      name: string;
      email: string;
      role: Exclude<UserRole, "platform_admin">;
      institutionId?: string | null;
      institutionName?: string;
    }) => {
      const newUser = createMockUser(name, email, role, {
        institutionId: institutionId ?? null,
        institutionName,
      });
      handleLogin(newUser);
      return newUser;
    },
    [handleLogin]
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loginAsParticipant,
      loginAsHost,
      loginAsInstitutionAdmin,
      loginAsPlatformAdmin,
      loginWithEmail,
      registerUser,
      logout,
    }),
    [
      user,
      loginAsParticipant,
      loginAsHost,
      loginAsInstitutionAdmin,
      loginAsPlatformAdmin,
      loginWithEmail,
      registerUser,
      logout,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
