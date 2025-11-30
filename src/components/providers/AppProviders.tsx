"use client";

import { AuthProvider } from "@/hooks/useAuth";
import { SubscriptionProvider } from "@/hooks/useSubscription";

export const AppProviders = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>
    <SubscriptionProvider>{children}</SubscriptionProvider>
  </AuthProvider>
);
