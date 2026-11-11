"use client";

import { X } from "lucide-react";
import { Sidebar } from "./sidebar";

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function MobileSidebar({ open, onClose }: MobileSidebarProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
        onClick={onClose}
      />
      {/* Sidebar container */}
      <div className="relative z-50 flex w-64 flex-col bg-blue-600">
        <button
          onClick={onClose}
          className="absolute right-3 top-4 rounded-lg p-1.5 text-blue-200 hover:text-white"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
        <Sidebar />
      </div>
    </div>
  );
}
