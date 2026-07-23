"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Search, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { TableSkeleton } from "./Skeleton";
import { EmptyState } from "./EmptyState";
import { useConfirm } from "@/hooks/useConfirm";

export interface DataTableColumn<T> {
  header: string;
  render: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T extends { id: string }> {
  items: T[];
  columns: DataTableColumn<T>[];
  loading?: boolean;
  searchPlaceholder?: string;
  searchText?: (item: T) => string;
  editHref?: (item: T) => string;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void | Promise<void>;
  deleteConfirmTitle?: (item: T) => string;
  onReorder?: (items: T[]) => void | Promise<void>;
  emptyIcon: LucideIcon;
  emptyTitle: string;
  emptyDescription?: string;
  headerActions?: React.ReactNode;
}

function SortableTr<T extends { id: string }>({
  item,
  columns,
  draggable,
  editHref,
  onEdit,
  onDelete,
  deleteConfirmTitle,
}: {
  item: T;
  columns: DataTableColumn<T>[];
  draggable: boolean;
  editHref?: (item: T) => string;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void | Promise<void>;
  deleteConfirmTitle?: (item: T) => string;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id, disabled: !draggable });
  const confirm = useConfirm();

  async function handleDelete() {
    const ok = await confirm({
      title: deleteConfirmTitle?.(item) || "Delete this item?",
      description: "This can't be undone.",
      confirmLabel: "Delete",
      danger: true,
    });
    if (ok) onDelete?.(item);
  }

  const rowContent = (
    <tr
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn("border-b border-outline-variant/10 last:border-0", isDragging && "relative z-10 bg-surface-container-high opacity-90")}
    >
      {draggable && (
        <td className="w-8 px-2">
          <button {...attributes} {...listeners} className="cursor-grab touch-none text-on-surface-variant/40 hover:text-white active:cursor-grabbing" aria-label="Drag to reorder">
            <GripVertical className="h-4 w-4" />
          </button>
        </td>
      )}
      {columns.map((col, i) => (
        <td key={i} className={cn("px-4 py-3.5 text-sm text-white", col.className)}>
          {col.render(item)}
        </td>
      ))}
      {(editHref || onEdit || onDelete) && (
        <td className="px-4 py-3.5 text-right">
          <div className="flex items-center justify-end gap-1">
            {editHref && (
              <Link href={editHref(item)} className="flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant hover:bg-white/5 hover:text-white" aria-label="Edit">
                <Pencil className="h-4 w-4" />
              </Link>
            )}
            {onEdit && !editHref && (
              <button onClick={() => onEdit(item)} className="flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant hover:bg-white/5 hover:text-white" aria-label="Edit">
                <Pencil className="h-4 w-4" />
              </button>
            )}
            {onDelete && (
              <button onClick={handleDelete} className="flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant hover:bg-error/10 hover:text-error" aria-label="Delete">
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        </td>
      )}
    </tr>
  );

  return rowContent;
}

export function DataTable<T extends { id: string }>({
  items,
  columns,
  loading,
  searchPlaceholder = "Search...",
  searchText,
  editHref,
  onEdit,
  onDelete,
  deleteConfirmTitle,
  onReorder,
  emptyIcon,
  emptyTitle,
  emptyDescription,
  headerActions,
}: DataTableProps<T>) {
  const [query, setQuery] = useState("");
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

  const filtered = useMemo(() => {
    if (!query.trim() || !searchText) return items;
    const q = query.toLowerCase();
    return items.filter((item) => searchText(item).toLowerCase().includes(q));
  }, [items, query, searchText]);

  const draggable = Boolean(onReorder) && !query.trim();

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id || !onReorder) return;
    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;
    onReorder(arrayMove(items, oldIndex, newIndex));
  }

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {searchText ? (
          <div className="relative max-w-sm flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant/60" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full rounded-full border border-outline-variant/30 bg-surface-container py-2 pl-10 pr-4 text-sm text-white outline-none placeholder-on-surface-variant/50 focus:border-primary/50"
            />
          </div>
        ) : (
          <div />
        )}
        {headerActions}
      </div>

      {loading ? (
        <TableSkeleton />
      ) : filtered.length === 0 ? (
        <EmptyState icon={emptyIcon} title={emptyTitle} description={emptyDescription} />
      ) : (
        <div className="glass overflow-x-auto rounded-2xl p-1">
          <table className="w-full min-w-[520px] border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/10 text-left text-xs uppercase tracking-wide text-on-surface-variant/60">
                {draggable && <th className="w-8 px-2 py-3" />}
                {columns.map((col, i) => (
                  <th key={i} className={cn("px-4 py-3 font-medium", col.className)}>
                    {col.header}
                  </th>
                ))}
                {(editHref || onEdit || onDelete) && <th className="px-4 py-3" />}
              </tr>
            </thead>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={filtered.map((i) => i.id)} strategy={verticalListSortingStrategy}>
                <tbody>
                  {filtered.map((item) => (
                    <SortableTr
                      key={item.id}
                      item={item}
                      columns={columns}
                      draggable={draggable}
                      editHref={editHref}
                      onEdit={onEdit}
                      onDelete={onDelete}
                      deleteConfirmTitle={deleteConfirmTitle}
                    />
                  ))}
                </tbody>
              </SortableContext>
            </DndContext>
          </table>
        </div>
      )}
    </div>
  );
}
