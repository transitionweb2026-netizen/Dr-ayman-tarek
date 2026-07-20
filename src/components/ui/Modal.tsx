"use client";

import { AnimatePresence, motion } from "framer-motion";
import { type ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { NeonIcon } from "@/components/ui/NeonIcon";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

/**
 * Shared glassmorphism modal shell (used by the service detail modal and
 * the video detail modal). Handles Esc-to-close, outside-click-to-close,
 * body scroll lock, and the fade + scale entrance/exit.
 */
export function Modal({ open, onClose, children, className }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="absolute inset-0 bg-[rgba(4,2,9,0.75)] backdrop-blur-[10px]"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            className={cn(
              "glass relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-[32px] border-primary/20 shadow-glow-lg",
              className,
            )}
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              aria-label="Close"
              onClick={onClose}
              className="icon-badge-neon absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full"
            >
              <NeonIcon name="close" />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
