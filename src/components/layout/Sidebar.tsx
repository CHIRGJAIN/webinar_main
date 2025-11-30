"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarLink {
  label: string;
  href: string;
}

interface SidebarProps {
  links: SidebarLink[];
  title: string;
}

export const Sidebar = ({ links, title }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <aside className="h-full rounded-3xl border border-(--border-subtle) bg-surface p-6 shadow-(--shadow-soft)">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-(--text-secondary)">{title}</p>
      <nav className="mt-6 space-y-1">
        {links.map((link) => {
          const isRoot = link.href === "/";
          const isActive = isRoot
            ? pathname === "/"
            : pathname === link.href || pathname.startsWith(`${link.href}/`);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block rounded-2xl px-4 py-2 text-sm font-semibold text-(--text-secondary) transition hover:bg-surface-alt hover:text-primary",
                isActive && "bg-surface-alt text-primary shadow-inner"
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
