"use client";

import { useEffect } from "react";
import { NeonIcon } from "@/components/ui/NeonIcon";

/**
 * Root-level error boundary — Next.js requires this to be a Client
 * Component (it needs the `reset` callback to support "try again" without a
 * full navigation). Catches any otherwise-uncaught render error under
 * RootLayout and shows an on-brand fallback instead of Next's generic
 * default. No error-tracking service is wired into this project yet — logs
 * to console as the honest baseline; swap for a real tracker's
 * captureException() if one gets added later.
 */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-margin-mobile text-center">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-surface-container-lowest via-background to-[#150a24]" />
      <div className="dot-grid pointer-events-none absolute inset-0 z-[1] opacity-[0.05]" />
      <div className="relative z-10 max-w-md">
        <div className="icon-badge-neon mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full">
          <NeonIcon name="error_outline" className="text-4xl" />
        </div>
        <h1 className="mb-3 text-hero text-white">Something went wrong</h1>
        <p className="mb-8 text-body-lg text-on-surface-variant">
          An unexpected error occurred. Please try again — if it keeps happening, come back a little later.
        </p>
        <button type="button" onClick={reset} className="btn-primary px-9 py-4">
          <span className="relative">Try again</span>
        </button>
      </div>
    </div>
  );
}
