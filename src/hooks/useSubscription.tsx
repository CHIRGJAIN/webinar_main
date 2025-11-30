"use client";

import { createContext, startTransition, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getEffectiveSubscription, getPlanById } from "@/lib/subscriptions";
import { Subscription, SubscriptionPlan } from "@/lib/types";
import { useAuth } from "./useAuth";

interface SubscriptionContextValue {
  subscription: Subscription | null;
  plan: SubscriptionPlan | null;
  startIndividualSubscription: (planId: string) => void;
  startInstitutionalSubscription: (planId: string) => void;
  cancelSubscription: () => void;
  /** @deprecated Use startIndividualSubscription instead. */
  startSubscription: (planId: string) => void;
}

const SubscriptionContext = createContext<SubscriptionContextValue | undefined>(undefined);
const STORAGE_PREFIX = "gaf-subscription";

const userStorageKey = (userId: string) => `${STORAGE_PREFIX}::user::${userId}`;
const institutionStorageKey = (institutionId: string) => `${STORAGE_PREFIX}::institution::${institutionId}`;

const readStoredSubscription = (userId: string, institutionId: string | null): Subscription | null => {
  if (typeof window === "undefined") return null;
  const userRaw = window.localStorage.getItem(userStorageKey(userId));
  const institutionRaw = institutionId ? window.localStorage.getItem(institutionStorageKey(institutionId)) : null;
  const parse = (value: string | null): Subscription | null => {
    if (!value) return null;
    try {
      return JSON.parse(value) as Subscription;
    } catch (error) {
      console.error("Failed to parse subscription", error);
      return null;
    }
  };
  const userSubscription = parse(userRaw);
  if (userSubscription && userSubscription.status === "active") return userSubscription;
  const institutionSubscription = parse(institutionRaw);
  if (institutionSubscription && institutionSubscription.status === "active") return institutionSubscription;
  return userSubscription ?? institutionSubscription;
};

const persistSubscription = (subscription: Subscription | null) => {
  if (typeof window === "undefined") return;
  if (!subscription) return;
  const key = subscription.userId
    ? userStorageKey(subscription.userId)
    : subscription.institutionId
      ? institutionStorageKey(subscription.institutionId)
      : null;
  if (!key) return;
  window.localStorage.setItem(key, JSON.stringify(subscription));
};

const clearStoredSubscription = (subscription: Subscription) => {
  if (typeof window === "undefined") return;
  const key = subscription.userId
    ? userStorageKey(subscription.userId)
    : subscription.institutionId
      ? institutionStorageKey(subscription.institutionId)
      : null;
  if (!key) return;
  window.localStorage.removeItem(key);
};

const futureRenewalDate = () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

const buildSubscription = (params: {
  planId: string;
  userId?: string | null;
  institutionId?: string | null;
}): Subscription => ({
  id: `sub-${Math.random().toString(36).slice(2, 8)}`,
  planId: params.planId,
  userId: params.userId ?? null,
  institutionId: params.institutionId ?? null,
  status: "active",
  renewsAt: futureRenewalDate(),
});

const getStorageBackedSubscription = (userId: string, institutionId: string | null) =>
  readStoredSubscription(userId, institutionId) ?? getEffectiveSubscription(userId, institutionId ?? null) ?? null;

const persistSubscriptionState = (subscription: Subscription | null) => {
  if (!subscription) return;
  if (subscription.status === "canceled") {
    clearStoredSubscription(subscription);
  } else {
    persistSubscription(subscription);
  }
};

export const SubscriptionProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [plan, setPlan] = useState<SubscriptionPlan | null>(null);

  useEffect(() => {
    if (!user) {
      startTransition(() => {
        setSubscription(null);
        setPlan(null);
      });
      return;
    }
    const stored = getStorageBackedSubscription(user.id, user.institutionId);
    startTransition(() => {
      setSubscription(stored);
      setPlan(stored ? getPlanById(stored.planId) ?? null : null);
    });
  }, [user]);

  const startIndividualSubscription = useCallback(
    (planId: string) => {
      if (!user) return;
      const newSubscription = buildSubscription({ planId, userId: user.id });
      setSubscription(newSubscription);
      setPlan(getPlanById(planId) ?? null);
      persistSubscriptionState(newSubscription);
    },
    [user]
  );

  const startInstitutionalSubscription = useCallback(
    (planId: string) => {
      if (!user || !user.institutionId) return;
      const newSubscription = buildSubscription({ planId, institutionId: user.institutionId });
      setSubscription(newSubscription);
      setPlan(getPlanById(planId) ?? null);
      persistSubscriptionState(newSubscription);
    },
    [user]
  );

  const cancelSubscription = useCallback(() => {
    if (!user || !subscription) return;
    const updated: Subscription = { ...subscription, status: "canceled" };
    setSubscription(updated);
    persistSubscriptionState(updated);
  }, [user, subscription]);

  const value = useMemo(
    () => ({
      subscription,
      plan,
      startIndividualSubscription,
      startInstitutionalSubscription,
      cancelSubscription,
      startSubscription: startIndividualSubscription,
    }),
    [subscription, plan, startIndividualSubscription, startInstitutionalSubscription, cancelSubscription]
  );

  return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>;
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error("useSubscription must be used within SubscriptionProvider");
  }
  return context;
};
