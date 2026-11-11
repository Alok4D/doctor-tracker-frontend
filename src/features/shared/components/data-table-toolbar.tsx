import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DataTableToolbarProps {
  children: ReactNode;
  className?: string;
}

export function DataTableToolbar({ children, className }: DataTableToolbarProps) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 py-2",
        className
      )}
    >
      {children}
    </div>
  );
}

