"use client";

import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ open, title, onClose, children }: ModalProps) => (
  <AnimatePresence>
    {open && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f1f30]/60 p-4 backdrop-blur"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="w-full max-w-2xl rounded-3xl border border-(--border-subtle) bg-surface p-6 text-foreground shadow-(--shadow-card)"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button onClick={onClose} className="text-(--text-secondary) transition hover:text-primary" aria-label="Close modal">
              ×
            </button>
          </div>
          <div className="mt-4 text-(--text-secondary)">{children}</div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
