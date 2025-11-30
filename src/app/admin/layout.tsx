"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { Alert } from "@/components/ui/Alert";
import { useAuth } from "@/hooks/useAuth";

const LINKS = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/institutions", label: "Institutions" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/subscriptions", label: "Subscriptions" },
];

const ALLOWED_ROLES = new Set(["platform_admin"]);

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !ALLOWED_ROLES.has(user.role)) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    return <Alert title="Login required" description="Sign in as admin to view this dashboard." />;
  }

  if (!ALLOWED_ROLES.has(user.role)) {
    return <Alert title="Restricted" description="This dashboard is for platform administrators." variant="danger" />;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
      <Sidebar links={LINKS} title="Platform admin" />
      <div>{children}</div>
    </div>
  );
}
