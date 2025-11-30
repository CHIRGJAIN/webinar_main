import Link from "next/link";

const LINKS = [
  { label: "About", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Support", href: "#" },
  { label: "Status", href: "#" },
];

export const Footer = () => (
  <footer className="border-t border-(--border-subtle) bg-surface">
    <div className="mx-auto flex max-w-[1740px] flex-col gap-4 px-6 py-10 text-sm text-(--text-secondary) md:flex-row md:items-center md:justify-between lg:px-10">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-base font-semibold text-white shadow-[0_10px_30px_rgba(230,120,23,0.32)]">
          GA
        </div>
        <div>
          <p className="text-foreground">Global Academic Forum</p>
          <p className="text-xs uppercase tracking-[0.18em]">Diplomatic seminar network</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        {LINKS.map((link) => (
          <Link key={link.label} href={link.href} className="transition hover:text-primary">
            {link.label}
          </Link>
        ))}
        <span>© {new Date().getFullYear()} Global Academic Forum</span>
      </div>
    </div>
  </footer>
);
