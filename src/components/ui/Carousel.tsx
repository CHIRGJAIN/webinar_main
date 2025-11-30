"use client";

import { ReactNode, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/utils";

interface CarouselProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export const Carousel = ({ title, children, className }: CarouselProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const container = ref.current;
    if (!container) return;
    const delta = direction === "left" ? -container.clientWidth : container.clientWidth;
    container.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <div className={cn("group relative", className)}>
      <div className="mb-4 flex items-center justify-between">
        {title && <h3 className="text-2xl font-semibold text-foreground">{title}</h3>}
        <div className="hidden gap-2 md:flex">
          <IconButton aria-label="Scroll left" subtle onClick={() => scroll("left")}>
            <ChevronLeft size={20} />
          </IconButton>
          <IconButton aria-label="Scroll right" subtle onClick={() => scroll("right")}>
            <ChevronRight size={20} />
          </IconButton>
        </div>
      </div>
      <div className="relative">
        <div ref={ref} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 scrollbar-none">
          {children}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-linear-to-r from-background via-(--background)/70 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-linear-to-l from-background via-(--background)/70 to-transparent" />
        <div className="absolute inset-y-0 right-3 hidden items-center gap-2 md:flex">
          <IconButton aria-label="Scroll left" subtle className="backdrop-blur" onClick={() => scroll("left")}>
            <ChevronLeft size={18} />
          </IconButton>
          <IconButton aria-label="Scroll right" subtle className="backdrop-blur" onClick={() => scroll("right")}>
            <ChevronRight size={18} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};
