import { subscriptionPlans, subscriptions } from "./mockData";
import { Subscription, SubscriptionPlan } from "./types";

export const getPlanById = (planId: string): SubscriptionPlan | undefined =>
  subscriptionPlans.find((plan) => plan.id === planId);

export const getSubscriptionForUser = (userId: string): Subscription | undefined =>
  subscriptions.find((subscription) => subscription.userId === userId);

export const getSubscriptionForInstitution = (institutionId: string): Subscription | undefined =>
  subscriptions.find((subscription) => subscription.institutionId === institutionId);

export const getEffectiveSubscription = (
  userId: string,
  institutionId: string | null
): Subscription | undefined => {
  const individual = getSubscriptionForUser(userId);
  if (individual && individual.status === "active") {
    return individual;
  }
  if (!institutionId) return individual;
  const institutional = getSubscriptionForInstitution(institutionId);
  if (institutional && institutional.status === "active") {
    return institutional;
  }
  return individual;
};

export const hasActiveSubscription = (userId: string, institutionId?: string | null): boolean => {
  const subscription = getEffectiveSubscription(userId, institutionId ?? null);
  return subscription ? subscription.status === "active" : false;
};
