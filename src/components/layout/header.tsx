"use client";

import { useState } from "react";
import { Bell, Search, Menu } from "lucide-react";
import { useAppSelector } from "@/store/hooks";

interface HeaderProps {
  onMobileMenuToggle?: () => void;
}

export function Header({ onMobileMenuToggle }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const user = useAppSelector((state) => state.auth.user);

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white px-6">
      <div className="flex items-center gap-3">
        {onMobileMenuToggle && (
          <button
            onClick={onMobileMenuToggle}
            className="md:hidden rounded-lg p-2 text-slate-500 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}

        {/* Global Search Input matching image */}
        <div className="relative hidden sm:block w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search doctors, patients..."
            className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50/70 pl-9 pr-4 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Notification Button */}
        <button
          className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-semibold text-white">
            2
          </span>
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-slate-200" />

        {/* Admin Profile Pill */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 border border-blue-200 text-blue-700 font-semibold text-xs">
            {user?.name ? user.name.slice(0, 2).toUpperCase() : "AD"}
          </div>
          <div className="hidden lg:flex flex-col text-left">
            <span className="text-xs font-semibold text-slate-800">
              {user?.name || "Dr. Administrator"}
            </span>
            <span className="text-[11px] text-slate-400">
              Hospital Admin
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
