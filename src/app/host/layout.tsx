"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { Alert } from "@/components/ui/Alert";
import { useAuth } from "@/hooks/useAuth";

const LINKS = [
  { href: "/host", label: "Overview" },
  { href: "/host/events", label: "My events" },
  { href: "/host/events/new", label: "Create event" },
];

export default function HostLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && user.role !== "host") {
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    return <Alert title="Login required" description="Sign in as a host to load this dashboard." />;
  }

  if (user.role !== "host") {
    return <Alert title="Insufficient permissions" description="This area is reserved for host accounts." variant="danger" />;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <Sidebar links={LINKS} title="Host" />
      <div>{children}</div>
    </div>
  );
}
