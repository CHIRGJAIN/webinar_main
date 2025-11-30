"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  defaultTab?: string;
}

export const Tabs = ({ tabs, defaultTab }: TabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTab ?? tabs[0]?.id);

  return (
    <div className="w-full">
      <div className="relative flex gap-4 overflow-x-auto border-b border-(--border-subtle) pb-2 text-sm font-semibold text-(--text-secondary)">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn("pb-1 transition hover:text-primary", activeTab === tab.id && "text-primary")}
          >
            <span className="relative px-1">
              {tab.label}
              {activeTab === tab.id && (
                <motion.span
                  layoutId="tab-underline"
                  className="absolute inset-x-0 -bottom-2 block h-0.5 rounded-full bg-linear-to-r from-primary via-secondary to-[#F0A500]"
                />
              )}
            </span>
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tabs.map((tab) => (
          <div key={tab.id} hidden={tab.id !== activeTab}>
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};
