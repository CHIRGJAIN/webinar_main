"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Radio, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { events } from "@/lib/mockData";

const LINKS = [
  { href: "/events", label: "Events" },
  { href: "/institutions/global", label: "Global Institutions" },
  { href: "/institutions/academic", label: "Academic Institutions" },
  { href: "/recordings", label: "Recordings" },
];

const DASHBOARD_PATH: Record<string, string> = {
  participant: "/profile",
  host: "/host",
  institution_admin: "/institution-admin",
  platform_admin: "/admin",
};

export const Header = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const liveSession = events.find((session) => session.status === "live");

  return (
    <header className="sticky top-0 z-50 border-b border-(--border-subtle) bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1740px] items-center gap-6 px-6 py-4 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/90 text-lg font-bold text-white shadow-[0_10px_30px_rgba(230,120,23,0.32)]">
            GA
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-(--text-secondary)">
              <Sparkles size={14} className="text-accent" />
              Global Academic Forum
            </div>
            <p className="text-lg font-semibold text-foreground">Academic diplomacy network</p>
          </div>
        </Link>

        <nav className="hidden flex-1 items-center gap-1 rounded-full border border-(--border-subtle) bg-surface-alt px-2 py-1 text-sm font-semibold text-(--text-secondary) lg:flex">
          {LINKS.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-4 py-2 transition ${isActive ? "bg-white text-primary shadow-sm" : "hover:text-primary"}`}
              >
                {link.label}
                {isActive && <span className="absolute inset-x-3 -bottom-1 h-0.5 rounded-full bg-linear-to-r from-primary via-secondary to-accent" />}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {liveSession && (
            <div className="hidden items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-secondary lg:flex">
              <Radio size={14} />
              {liveSession.title.split(" ").slice(0, 2).join(" ")}
            </div>
          )}
          {user ? (
            <>
              <Link href={DASHBOARD_PATH[user.role] ?? "/profile"} className="hidden text-sm font-semibold text-primary md:block">
                {user.name.split(" ")[0]}
              </Link>
              <Button variant="ghost" size="sm" onClick={logout}>
                Logout
              </Button>
              <Button href={DASHBOARD_PATH[user.role] ?? "/profile"} size="sm" className="hidden sm:inline-flex">
                Dashboard
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" href="/auth/login">
                Sign in
              </Button>
              <Button size="sm" href="/auth/register">
                Join the forum
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
