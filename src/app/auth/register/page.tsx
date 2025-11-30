"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/hooks/useAuth";
import { roleSummaries } from "@/lib/mockData";

export default function RegisterPage() {
  const router = useRouter();
  const { registerUser } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", role: "participant" });

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = registerUser({ ...form, role: form.role as "participant" | "host" | "institution_admin" });
    const destination =
      user.role === "host" ? "/host" : user.role === "institution_admin" ? "/institution-admin" : "/events";
    router.push(destination);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="space-y-2 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-(--text-secondary)">Onboarding</p>
        <h1 className="text-4xl font-semibold text-foreground">Create your Global Academic Forum profile</h1>
        <p className="text-(--text-secondary)">Desktop-first workflows for participants, hosts, and institutional coordinators.</p>
      </div>
      <Card title="Tell us about you" description="We generate a secure demo identity for this session.">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input label="Full name" required value={form.name} onChange={(event) => handleChange("name", event.target.value)} />
          <Input
            label="Institutional email"
            type="email"
            required
            value={form.email}
            onChange={(event) => handleChange("email", event.target.value)}
          />
          <Select label="Role" value={form.role} onChange={(event) => handleChange("role", event.target.value)}>
            <option value="participant">Participant</option>
            <option value="host">Host</option>
            <option value="institution_admin">Institution admin</option>
          </Select>
          <Button type="submit" fullWidth>
            Create account
          </Button>
        </form>
      </Card>
      <Card title="Role guidance" description="Use this summary to decide which workspace is right for you.">
        <div className="grid gap-4 md:grid-cols-2">
          {roleSummaries
            .filter((role) => role.role !== "platform_admin")
            .map((role) => (
              <div key={role.role} className="rounded-3xl border border-(--border-subtle) bg-surface-alt/70 p-4">
                <p className="text-sm font-semibold text-foreground">{role.title}</p>
                <p className="text-xs uppercase tracking-[0.3em] text-(--text-secondary)">{role.role}</p>
                <p className="mt-2 text-sm text-(--text-secondary)">{role.description}</p>
                <ul className="mt-3 space-y-1 text-xs text-(--text-secondary)">
                  {role.permissions.slice(0, 3).map((permission) => (
                    <li key={permission} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {permission}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
}
