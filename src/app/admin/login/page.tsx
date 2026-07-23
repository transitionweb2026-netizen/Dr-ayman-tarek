import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin Login | Dr. Ayman Tarek",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_900px_600px_at_20%_0%,rgba(196,61,255,0.18),transparent_60%),radial-gradient(ellipse_700px_500px_at_100%_30%,rgba(255,79,163,0.12),transparent_55%),radial-gradient(ellipse_800px_500px_at_50%_100%,rgba(122,31,184,0.16),transparent_60%)]"
      />
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
