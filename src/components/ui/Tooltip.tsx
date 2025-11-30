"use client";

import { useState } from "react";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

export const Tooltip = ({ content, children }: TooltipProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span className="absolute bottom-full mb-2 w-max rounded-lg bg-primary px-3 py-1 text-xs text-white shadow-[0_10px_30px_rgba(230,120,23,0.25)]">
          {content}
        </span>
      )}
    </span>
  );
};
