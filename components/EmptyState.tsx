"use client";

import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: { label: string; onClick: () => void };
  className?: string;
}

export function EmptyState({
  title = "No items yet",
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center",
        className
      )}
    >
      <div className="rounded-full bg-muted p-4 mb-4">
        <ImageIcon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
