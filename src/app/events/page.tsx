"use client";

import Link from "next/link";

export default function EventsPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="max-w-xl space-y-4 rounded-4xl border border-(--border-subtle) bg-surface p-10 text-center shadow-(--shadow-card)">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-(--text-secondary)">Events</p>
        <h1 className="text-4xl font-semibold text-foreground">Events calendar is coming soon</h1>
        <p className="text-lg text-(--text-secondary)">
          We&apos;re rebuilding the seminar catalog. Check back shortly for the new schedule and live sessions.
        </p>
        <div className="flex justify-center gap-3">
          <Link href="/" className="rounded-full bg-[var(--primary)] px-6 py-3 text-base font-semibold text-white shadow-[0_12px_30px_rgba(230,120,23,0.28)] transition hover:bg-[#cf6a0f]">
            Back to home
          </Link>
          <Link href="/recordings" className="rounded-full border border-[rgba(230,120,23,0.18)] bg-white px-6 py-3 text-base font-semibold text-[var(--primary)] shadow-[0_8px_20px_rgba(230,120,23,0.1)] transition hover:border-[rgba(230,120,23,0.32)] hover:bg-[rgba(255,241,223,0.6)]">
            View recordings
          </Link>
        </div>
      </div>
    </div>
  );
}
