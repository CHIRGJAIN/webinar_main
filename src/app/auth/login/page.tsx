"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/hooks/useAuth";
import { Select } from "@/components/ui/Select";
import { roleSummaries } from "@/lib/mockData";
import { createMockUser } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const { loginAsParticipant, loginAsHost, loginAsInstitutionAdmin, loginAsPlatformAdmin, loginWithEmail } = useAuth();
  const [form, setForm] = useState({ name: "Visiting Delegate", email: "delegate@example.org", role: "participant" });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = createMockUser(form.name, form.email, form.role as "participant" | "host" | "institution_admin");
    loginWithEmail(user);
    const destination =
      user.role === "host" ? "/host" : user.role === "institution_admin" ? "/institution-admin" : "/events";
    router.push(destination);
  };

  const handleDemo = (callback: () => void, redirect: string) => {
    callback();
    router.push(redirect);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="space-y-2 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-(--text-secondary)">Global Academic Forum</p>
        <h1 className="text-4xl font-semibold text-foreground">Access your workspace</h1>
        <p className="text-(--text-secondary)">Sign in or use a demo profile to explore participant, host, or institutional views.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Sign in with email" description="No password needed—create a session tied to your role.">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input label="Full name" value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} required />
            <Input
              label="Email"
              type="email"
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              required
            />
            <Select label="Role" value={form.role} onChange={(event) => setForm((prev) => ({ ...prev, role: event.target.value }))}>
              <option value="participant">Participant</option>
              <option value="host">Host</option>
              <option value="institution_admin">Institution admin</option>
            </Select>
            <Button type="submit" fullWidth>
              Continue
            </Button>
          </form>
        </Card>
        <Card title="Demo workspaces" description="Jump directly into seeded dashboards.">
          <div className="grid gap-3">
            <Button variant="secondary" onClick={() => handleDemo(loginAsParticipant, "/events")}>
              View participant rail
            </Button>
            <Button variant="secondary" onClick={() => handleDemo(loginAsHost, "/host")}>
              Explore host console
            </Button>
            <Button variant="secondary" onClick={() => handleDemo(loginAsInstitutionAdmin, "/institution-admin")}>
              Manage institution seats
            </Button>
            <Button variant="ghost" onClick={() => handleDemo(loginAsPlatformAdmin, "/admin")}>
              Platform admin preview
            </Button>
          </div>
        </Card>
      </div>
      <Card title="Role overview" description="Choose the workspace that matches your responsibilities.">
        <div className="grid gap-4 md:grid-cols-2">
          {roleSummaries.map((role) => (
            <div key={role.role} className="rounded-3xl border border-(--border-subtle) bg-surface-alt/70 p-4">
              <p className="text-sm font-semibold text-foreground">{role.title}</p>
              <p className="text-xs uppercase tracking-[0.3em] text-(--text-secondary)">{role.role}</p>
              <p className="mt-2 text-sm text-(--text-secondary)">{role.description}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
