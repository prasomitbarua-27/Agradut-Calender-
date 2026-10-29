import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

/** Friendly message shown when a list or search has nothing to display. */
export default function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="rounded-card border border-dashed border-line bg-white/70 px-5 py-8 text-center">
      <p className="text-lg font-semibold text-ink">{title}</p>
      {description && <p className="mx-auto mt-1 max-w-md text-muted">{description}</p>}
      {action && <div className="mt-4 flex justify-center">{action}</div>}
    </div>
  );
}
