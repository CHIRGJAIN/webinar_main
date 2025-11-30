import { mockUsers } from "./mockData";
import { User, UserRole } from "./types";

export const STORAGE_KEY = "gaf-auth-user";

export const getDemoUser = (role: UserRole): User => {
  const demo = mockUsers[role];
  if (!demo) {
    throw new Error(`No demo user for role ${role}`);
  }
  return demo;
};

export const createMockUser = (
  name: string,
  email: string,
  role: Exclude<UserRole, "platform_admin">,
  options?: { institutionId?: string | null; institutionName?: string }
): User => {
  const now = new Date().toISOString();
  return {
    id: `user-${Math.random().toString(36).slice(2, 8)}`,
    name,
    email,
    role,
    institutionId: options?.institutionId ?? null,
    institution: options?.institutionName,
    subscriptionStatus: role === "participant" ? "none" : "active",
    createdAt: now,
    avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
  };
};

export const persistUser = (user: User | null) => {
  if (typeof window === "undefined") return;
  if (user) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } else {
    window.localStorage.removeItem(STORAGE_KEY);
  }
};

export const readPersistedUser = (): User | null => {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(STORAGE_KEY);
  if (!value) return null;
  try {
    return JSON.parse(value) as User;
  } catch (error) {
    console.error("Failed to parse stored user", error);
    return null;
  }
};
