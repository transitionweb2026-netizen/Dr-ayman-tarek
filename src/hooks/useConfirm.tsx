"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { Dialog } from "@/components/admin/ui/Dialog";
import { AdminButton } from "@/components/admin/ui/Button";

interface ConfirmOptions {
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
}

type ConfirmFn = (options: ConfirmOptions) => Promise<boolean>;

const ConfirmContext = createContext<ConfirmFn | null>(null);

/**
 * Imperative confirmation dialog: `const confirmed = await confirm({ title, danger: true })`.
 * One instance mounted at the dashboard root (see AdminShell) instead of a
 * bespoke <ConfirmDialog> + open-state pair wired into every delete button.
 */
export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const resolver = useRef<(value: boolean) => void>(undefined);

  const confirm = useCallback<ConfirmFn>((opts) => {
    setOptions(opts);
    return new Promise((resolve) => {
      resolver.current = resolve;
    });
  }, []);

  function close(result: boolean) {
    resolver.current?.(result);
    setOptions(null);
  }

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      <Dialog open={options !== null} onClose={() => close(false)} className="max-w-sm">
        {options && (
          <div className="p-6">
            <div
              className={
                options.danger
                  ? "mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-error/15 text-error"
                  : "icon-badge-neon mb-4 flex h-11 w-11 items-center justify-center rounded-full"
              }
            >
              <AlertTriangle className={options.danger ? "h-5 w-5" : "icon-neon h-5 w-5"} />
            </div>
            <h2 className="text-lg font-bold text-white">{options.title}</h2>
            {options.description && <p className="mt-2 text-sm text-on-surface-variant">{options.description}</p>}
            <div className="mt-6 flex justify-end gap-3">
              <AdminButton variant="outline" size="sm" onClick={() => close(false)}>
                {options.cancelLabel || "Cancel"}
              </AdminButton>
              <AdminButton variant={options.danger ? "danger" : "primary"} size="sm" onClick={() => close(true)}>
                {options.confirmLabel || "Confirm"}
              </AdminButton>
            </div>
          </div>
        )}
      </Dialog>
    </ConfirmContext.Provider>
  );
}

export function useConfirm(): ConfirmFn {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error("useConfirm must be used within a ConfirmProvider");
  return ctx;
}
