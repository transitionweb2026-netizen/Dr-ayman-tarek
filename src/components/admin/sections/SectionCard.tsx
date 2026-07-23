"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AdminCard } from "@/components/admin/ui/Card";
import { AdminButton } from "@/components/admin/ui/Button";
import { Skeleton } from "@/components/admin/ui/Skeleton";
import { VersionHistoryButton } from "@/components/admin/ui/VersionHistory";
import { useSection, useSaveSection, type BilingualContent } from "@/hooks/usePageSections";

type SectionChildren = (props: {
  en: Record<string, unknown>;
  ar: Record<string, unknown>;
  setEn: (patch: Record<string, unknown>) => void;
  setAr: (patch: Record<string, unknown>) => void;
}) => React.ReactNode;

/**
 * One card per page_sections row — every section editor across all 6 pages
 * is `<SectionCard>` wrapping a form that reads/writes `content.en`/`ar`.
 * Handles loading, the Save button, and revision history uniformly so each
 * per-section form only has to describe its own fields.
 */
export function SectionCard({
  pageSlug,
  sectionKey,
  title,
  description,
  children,
}: {
  pageSlug: string;
  sectionKey: string;
  title: string;
  description?: string;
  children: SectionChildren;
}) {
  const { data: section, isLoading } = useSection(pageSlug, sectionKey);
  const save = useSaveSection(pageSlug, sectionKey);

  if (isLoading || !section) {
    return (
      <AdminCard>
        <Skeleton className="mb-4 h-6 w-40" />
        <Skeleton className="h-32 w-full" />
      </AdminCard>
    );
  }

  const content = section.content as unknown as BilingualContent;

  return (
    <SectionCardInner
      title={title}
      description={description}
      initialEn={content?.en || {}}
      initialAr={content?.ar || {}}
      entityId={section.id}
      save={save}
    >
      {children}
    </SectionCardInner>
  );
}

function SectionCardInner({
  title,
  description,
  initialEn,
  initialAr,
  entityId,
  save,
  children,
}: {
  title: string;
  description?: string;
  initialEn: Record<string, unknown>;
  initialAr: Record<string, unknown>;
  entityId: string;
  save: ReturnType<typeof useSaveSection>;
  children: SectionChildren;
}) {
  const [en, setEnState] = useState(initialEn);
  const [ar, setArState] = useState(initialAr);

  useEffect(() => {
    setEnState(initialEn);
    setArState(initialAr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entityId]);

  function setEn(patch: Record<string, unknown>) {
    setEnState((prev) => ({ ...prev, ...patch }));
  }
  function setAr(patch: Record<string, unknown>) {
    setArState((prev) => ({ ...prev, ...patch }));
  }

  async function handleSave() {
    try {
      await save.mutateAsync({ en, ar });
      toast.success(`${title} saved`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save");
    }
  }

  return (
    <AdminCard>
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-white">{title}</p>
          {description && <p className="mt-0.5 text-xs text-on-surface-variant">{description}</p>}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <VersionHistoryButton table="page_sections" entityType="page_sections" entityId={entityId} />
          <AdminButton size="sm" loading={save.isPending} onClick={handleSave}>
            Save
          </AdminButton>
        </div>
      </div>
      {children({ en, ar, setEn, setAr })}
    </AdminCard>
  );
}
