"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { liveChatMessages } from "@/lib/mockData";
import { getEventById } from "@/lib/events";
import { LiveStatusPill } from "@/components/events/LiveStatusPill";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { getInstitutionById } from "@/lib/institutions";

interface LivePageProps {
  params: { id: string };
}

export default function LiveWebinarPage({ params }: LivePageProps) {
  const event = getEventById(params.id);
  const [messages, setMessages] = useState(liveChatMessages);
  const [draft, setDraft] = useState("");
  const [viewerCount] = useState(() => Math.floor(Math.random() * 400) + 200);
  const [activeTab, setActiveTab] = useState<"overview" | "speakers" | "resources">("overview");

  if (!event) {
    return <Alert title="Not Found" description="This live room is unavailable." variant="danger" />;
  }

  const institution = getInstitutionById(event.institutionId);

  const sendMessage = () => {
    if (!draft.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        userName: "You",
        content: draft,
        timestamp: new Date().toISOString(),
      },
    ]);
    setDraft("");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-4xl border border-(--border-subtle) bg-surface p-5 shadow-(--shadow-card)">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <LiveStatusPill status="live" />
              <span className="text-xs uppercase tracking-[0.3em] text-(--text-secondary)">{institution?.name}</span>
            </div>
            <h1 className="text-3xl font-semibold text-foreground">{event.title}</h1>
            <p className="text-sm text-(--text-secondary)">{event.shortDescription}</p>
          </div>
          <div className="text-right text-sm text-(--text-secondary)">
            <p>{viewerCount} viewers</p>
            <p>{new Date(event.scheduledAt).toLocaleString()}</p>
          </div>
        </div>
        <div className="space-y-4 rounded-4xl border border-(--border-subtle) bg-surface-alt p-4 shadow-(--shadow-soft)">
          <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-(--border-subtle) bg-[var(--surface)] text-foreground">
            <div className="absolute inset-0 grid place-items-center text-xl text-(--text-secondary)">Live video placeholder</div>
            <div className="absolute inset-x-6 bottom-6 flex items-center justify-between rounded-3xl border border-[rgba(230,120,23,0.2)] bg-[var(--primary)]/90 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white">
              <span>On air</span>
              <span>Latency &lt;2s</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-(--text-secondary)">
            <button
              type="button"
              onClick={() => setActiveTab("overview")}
              className={`rounded-2xl px-4 py-2 ${activeTab === "overview" ? "bg-white text-primary" : "hover:text-primary"}`}
            >
              Overview
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("speakers")}
              className={`rounded-2xl px-4 py-2 ${activeTab === "speakers" ? "bg-white text-primary" : "hover:text-primary"}`}
            >
              Speakers
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("resources")}
              className={`rounded-2xl px-4 py-2 ${activeTab === "resources" ? "bg-white text-primary" : "hover:text-primary"}`}
            >
              Resources
            </button>
          </div>
          <div className="rounded-3xl border border-(--border-subtle) bg-white p-4 text-sm text-(--text-secondary)">
            {activeTab === "overview" && (
              <p>
                {event.longDescription} This live seminar is facilitated by {institution?.name} and moderated by Global Academic Forum staff to capture policy takeaways in real time.
              </p>
            )}
            {activeTab === "speakers" && (
              <ul className="space-y-3">
                {event.speakers.map((speaker) => (
                  <li key={speaker.id}>
                    <p className="text-sm font-semibold text-foreground">{speaker.name}</p>
                    <p className="text-xs uppercase tracking-[0.3em] text-(--text-secondary)">{speaker.title}</p>
                  </li>
                ))}
              </ul>
            )}
            {activeTab === "resources" && (
              <ul className="space-y-3">
                {event.materials.map((material) => (
                  <li key={material.id} className="flex items-center justify-between rounded-2xl border border-(--border-subtle) px-3 py-2">
                    <span>
                      {material.title}
                      <span className="ml-2 text-xs uppercase tracking-[0.3em] text-(--text-secondary)">{material.type}</span>
                    </span>
                    <Button size="sm" variant="ghost" href={material.url}>
                      Open
                    </Button>
                  </li>
                ))}
                {event.materials.length === 0 && <p>No resources shared yet.</p>}
              </ul>
            )}
          </div>
        </div>
      </section>
      <aside className="flex flex-col rounded-4xl border border-(--border-subtle) bg-surface p-4 shadow-(--shadow-card)">
        <div className="border-b border-(--border-subtle) pb-4">
          <h2 className="text-lg font-semibold text-foreground">Chat</h2>
          <p className="text-xs text-(--text-secondary)">Say hi and drop questions for the speaker.</p>
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto py-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-(--border-subtle) bg-surface-alt/70 p-3"
            >
              <p className="text-sm font-semibold text-foreground">{message.userName}</p>
              <p className="text-sm text-(--text-secondary)">{message.content}</p>
            </motion.div>
          ))}
        </div>
        <div className="border-t border-(--border-subtle) pt-4">
          <Textarea label="Message" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Share your reaction" rows={4} />
          <Button fullWidth className="mt-3" onClick={sendMessage}>
            Send message
          </Button>
        </div>
      </aside>
    </div>
  );
}
