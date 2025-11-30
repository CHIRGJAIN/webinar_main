"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { useAuth } from "@/hooks/useAuth";

export default function NewEventPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    longDescription: "",
    category: "Climate Governance",
    level: "Intermediate",
    tags: "",
    date: "",
    duration: 60,
    access: "registered",
  });

  if (!user) {
    return <Alert title="Login required" description="Sign in as a host to create events." />;
  }

  if (user.role !== "host") {
    return <Alert title="Restricted" description="Only host accounts can publish events." variant="danger" />;
  }

  const handleChange = (key: keyof typeof form, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      router.push("/host/events");
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-(--text-secondary)">Host workspace</p>
        <h1 className="text-3xl font-semibold text-foreground">Create an event</h1>
        <p className="text-sm text-(--text-secondary)">Complete the academic brief and access policy before publishing.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 rounded-4xl border border-(--border-subtle) bg-surface p-6 shadow-(--shadow-soft)">
        <Input label="Title" required value={form.title} onChange={(event) => handleChange("title", event.target.value)} />
        <Textarea label="Short description" required rows={3} value={form.description} onChange={(event) => handleChange("description", event.target.value)} />
        <Textarea label="Full description" rows={4} value={form.longDescription} onChange={(event) => handleChange("longDescription", event.target.value)} />
        <div className="grid gap-4 md:grid-cols-3">
          <Select label="Category" value={form.category} onChange={(event) => handleChange("category", event.target.value)}>
            <option>Climate Governance</option>
            <option>Digital Cooperation</option>
            <option>Urban Policy</option>
            <option>Industrial Policy</option>
            <option>Higher Education</option>
          </Select>
          <Select label="Level" value={form.level} onChange={(event) => handleChange("level", event.target.value)}>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </Select>
          <Input label="Tags" placeholder="comma,separated" value={form.tags} onChange={(event) => handleChange("tags", event.target.value)} />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Date & time" type="datetime-local" value={form.date} onChange={(event) => handleChange("date", event.target.value)} />
          <Input label="Duration (mins)" type="number" value={form.duration} onChange={(event) => handleChange("duration", Number(event.target.value))} />
        </div>
        <Select label="Access" value={form.access} onChange={(event) => handleChange("access", event.target.value)}>
          <option value="open">Open access</option>
          <option value="registered">Registered participants</option>
          <option value="institution">Institutional cohort</option>
        </Select>
        <Button type="submit" loading={submitted}>
          Publish event
        </Button>
      </form>
    </div>
  );
}
