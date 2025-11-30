import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { WebinarStatus } from "@/lib/types";

interface LiveStatusPillProps {
  status: WebinarStatus;
}

const variantMap: Record<WebinarStatus, string> = {
  upcoming: "border border-amber-100 bg-amber-50 text-amber-800",
  live: "border border-rose-100 bg-rose-50 text-rose-700",
  completed: "border border-emerald-100 bg-emerald-50 text-emerald-700",
};

export const LiveStatusPill = ({ status }: LiveStatusPillProps) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.2 }}
    className={cn("inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm font-semibold shadow-(--shadow-soft)", variantMap[status])}
  >
    <span className="h-2 w-2 rounded-full bg-current animate-pulse" />
    {status === "live" ? "Live now" : status === "upcoming" ? "Upcoming" : "Completed"}
  </motion.span>
);
