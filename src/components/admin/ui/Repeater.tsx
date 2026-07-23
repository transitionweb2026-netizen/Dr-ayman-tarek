"use client";

import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import { AdminButton } from "./Button";
import { cn } from "@/lib/utils";

interface RepeaterProps<T> {
  items: T[];
  onChange: (items: T[]) => void;
  renderItem: (item: T, index: number, update: (patch: Partial<T>) => void) => React.ReactNode;
  newItem: () => T;
  keyOf: (item: T) => string;
  addLabel?: string;
  emptyLabel?: string;
}

function SortableRow({ id, onRemove, children }: { id: string; onRemove: () => void; children: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn("glass flex items-start gap-2 rounded-xl p-4", isDragging && "opacity-60")}
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="mt-1 shrink-0 cursor-grab touch-none text-on-surface-variant/50 hover:text-white active:cursor-grabbing"
        aria-label="Drag to reorder"
      >
        <GripVertical className="h-4 w-4" />
      </button>
      <div className="min-w-0 flex-1">{children}</div>
      <button
        type="button"
        onClick={onRemove}
        className="mt-1 shrink-0 rounded-lg p-1.5 text-on-surface-variant/60 hover:bg-error/10 hover:text-error"
        aria-label="Remove item"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

/** Add/remove/drag-reorder editor for an array field — every in-page repeater
 * (certificates, achievements, milestones, tech tags, ...) is built from this. */
export function Repeater<T>({
  items,
  onChange,
  renderItem,
  newItem,
  keyOf,
  addLabel = "Add item",
  emptyLabel = "No items yet.",
}: RepeaterProps<T>) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex((i) => keyOf(i) === active.id);
    const newIndex = items.findIndex((i) => keyOf(i) === over.id);
    if (oldIndex === -1 || newIndex === -1) return;
    onChange(arrayMove(items, oldIndex, newIndex));
  }

  function update(index: number, patch: Partial<T>) {
    const next = [...items];
    next[index] = { ...next[index], ...patch };
    onChange(next);
  }

  function remove(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      {items.length === 0 && (
        <p className="rounded-xl border border-dashed border-outline-variant/30 px-4 py-6 text-center text-sm text-on-surface-variant">
          {emptyLabel}
        </p>
      )}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map(keyOf)} strategy={verticalListSortingStrategy}>
          {items.map((item, index) => (
            <SortableRow key={keyOf(item)} id={keyOf(item)} onRemove={() => remove(index)}>
              {renderItem(item, index, (patch) => update(index, patch))}
            </SortableRow>
          ))}
        </SortableContext>
      </DndContext>
      <AdminButton type="button" variant="outline" size="sm" icon={<Plus className="h-4 w-4" />} onClick={() => onChange([...items, newItem()])}>
        {addLabel}
      </AdminButton>
    </div>
  );
}
