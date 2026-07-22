"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  question: string;
  answer: string;
}

/** Single-open FAQ accordion with a smooth height animation and rotating +/x icon. */
export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question} className="glass overflow-hidden rounded-2xl">
            <button
              className="flex w-full items-center justify-between gap-4 p-6 text-left rtl:text-right"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span className="text-body-lg font-bold text-white">{item.question}</span>
              {/* Rotation (open state) and hover scale/glow both animate `transform`/`filter`,
                  so both are driven by Framer Motion here (animate + whileHover merge
                  cleanly) rather than mixing in the .icon-neon CSS :hover, which would
                  otherwise fight the inline rotate transform for the same property. */}
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                whileHover={{
                  scale: 1.08,
                  filter:
                    "drop-shadow(0 0 12px rgba(192,38,255,.6)) drop-shadow(0 0 24px rgba(192,38,255,.45)) drop-shadow(0 0 40px rgba(192,38,255,.3))",
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="material-symbols-outlined shrink-0 text-primary [filter:drop-shadow(0_0_4px_rgba(192,38,255,.55))_drop-shadow(0_0_10px_rgba(168,85,247,.35))]"
              >
                add
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-body text-on-surface-variant">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
