"use client";

import { useRouter } from "next/navigation";
import { pageContent, subscriptionPlans } from "@/lib/mockData";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";

export default function PricingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { subscription, startIndividualSubscription, startInstitutionalSubscription } = useSubscription();

  const openAccessPlan = subscriptionPlans.find((plan) => plan.id === "plan-open");
  const networkPlan = subscriptionPlans.find((plan) => plan.id === "plan-network");
  const institutionalPlan = subscriptionPlans.find((plan) => plan.id === "plan-institution");

  const handleIndividual = (planId: string) => {
    if (!user) {
      router.push("/auth/login");
      return;
    }
    startIndividualSubscription(planId);
  };

  const handleInstitutional = (planId: string) => {
    if (!user) {
      router.push("/auth/login");
      return;
    }
    startInstitutionalSubscription(planId);
  };

  return (
    <div className="space-y-10">
      <section className="space-y-4 rounded-4xl border border-(--border-subtle) bg-surface p-6 shadow-(--shadow-card)">
        <p className="text-xs uppercase tracking-[0.25em] text-(--text-secondary)">{pageContent.pricing.heroKicker}</p>
        <h1 className="text-4xl font-semibold text-foreground">{pageContent.pricing.heroTitle}</h1>
        <p className="text-(--text-secondary)">{pageContent.pricing.heroSubtitle}</p>
        <div className="grid gap-3 md:grid-cols-3">
          {pageContent.pricing.faqs.map((faq) => (
            <div key={faq.question} className="rounded-3xl border border-(--border-subtle) bg-white p-4 text-sm text-(--text-secondary)">
              <p className="text-sm font-semibold text-foreground">{faq.question}</p>
              <p className="mt-1">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
      <div className="grid gap-6 md:grid-cols-3">
        {openAccessPlan && (
          <Card
            title="Open access"
            description="Free · Live open seminars"
            footer={
              <Button fullWidth variant="secondary" href="/auth/register">
                Create free profile
              </Button>
            }
          >
            <ul className="space-y-2 text-sm text-(--text-secondary)">
              {openAccessPlan.features.map((feature) => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>
          </Card>
        )}
        {networkPlan && (
          <Card
            title="Individual academic access"
            description={`$${networkPlan.priceMonthly}/mo · $${networkPlan.priceYearly}/yr`}
            className="border-primary/40 shadow-(--shadow-card)"
            footer={
              <Button fullWidth onClick={() => handleIndividual(networkPlan.id)}>
                {subscription?.planId === networkPlan.id ? "Current plan" : "Start individual access"}
              </Button>
            }
          >
            <ul className="space-y-2 text-sm text-(--text-secondary)">
              {networkPlan.features.map((feature) => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>
          </Card>
        )}
        {institutionalPlan && (
          <Card
            title="Institutional access"
            description={`$${institutionalPlan.priceMonthly}/mo · $${institutionalPlan.priceYearly}/yr`}
            footer={
              <Button fullWidth variant="secondary" onClick={() => handleInstitutional(institutionalPlan.id)}>
                {subscription?.planId === institutionalPlan.id ? "Institutional plan active" : "Activate institutional access"}
              </Button>
            }
          >
            <p className="text-sm text-(--text-secondary)">Seat bundles, analytics, and closed-door programming for university or multilateral teams.</p>
            <ul className="mt-3 space-y-2 text-sm text-(--text-secondary)">
              {institutionalPlan.features.map((feature) => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>
          </Card>
        )}
      </div>
    </div>
  );
}
