"use client";

import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  subtle?: boolean;
}

export const IconButton = ({ className, subtle, ...props }: IconButtonProps) => (
  <button
    className={cn(
      "inline-flex h-10 w-10 items-center justify-center rounded-full border border-(--border-subtle) bg-white text-primary transition hover:scale-105 hover:bg-surface-alt focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary",
      subtle && "border-transparent bg-transparent hover:bg-surface-alt/80",
      className
    )}
    {...props}
  />
);
