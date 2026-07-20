"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";

const SERVICE_OPTIONS = [
  "General Consultation",
  "Brain Tumor Surgery",
  "Spinal Fusion & Disc Replacement",
  "Neuro-Endoscopy",
  "Epilepsy & Movement Disorder Surgery",
  "Other",
];

const fieldClass =
  "w-full rounded-xl border border-outline-variant/40 bg-surface-container px-5 py-3.5 text-white outline-none transition-shadow placeholder-on-surface-variant/40 focus:border-primary focus:shadow-glow";

/** Client-side only for now — no backend is wired up yet; submit shows a local confirmation. */
export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <GlassCard radius="2xl" interactive={false} className="p-7 md:p-10">
      <h2 className="mb-2 text-section-title text-white">Request an Appointment</h2>
      <p className="mb-8 text-body text-on-surface-variant">
        Fill out the form below and our patient coordination team will get back to you within one business day.
      </p>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="fullName" className="mb-2 block text-small text-on-surface-variant">
              Full Name
            </label>
            <input id="fullName" required placeholder="John Doe" className={fieldClass} />
          </div>
          <div>
            <label htmlFor="phone" className="mb-2 block text-small text-on-surface-variant">
              Phone Number
            </label>
            <input id="phone" type="tel" required placeholder="+20 100 000 0000" className={fieldClass} />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-small text-on-surface-variant">
            Email Address
          </label>
          <input id="email" type="email" required placeholder="you@example.com" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="service" className="mb-2 block text-small text-on-surface-variant">
            Service of Interest
          </label>
          <select id="service" className={fieldClass}>
            {SERVICE_OPTIONS.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="message" className="mb-2 block text-small text-on-surface-variant">
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder="Tell us a little about your symptoms or concern..."
            className={`${fieldClass} resize-none`}
          />
        </div>
        <Button type="submit" className="w-full" icon={<span className="material-symbols-outlined text-xl">send</span>}>
          Submit Request
        </Button>
        <AnimatePresence>
          {submitted && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-center text-small text-primary"
            >
              Thank you — your request has been received. Our team will contact you shortly.
            </motion.p>
          )}
        </AnimatePresence>
      </form>
    </GlassCard>
  );
}
