import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 sm:pb-5">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
          {title}
        </h1>
        {description && (
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{description}</p>
        )}
      </div>
      {children && (
        <div className="flex items-center gap-2.5 self-start sm:self-auto w-full sm:w-auto [&>button]:w-full sm:[&>button]:w-auto">
          {children}
        </div>
      )}
    </div>
  );
}

