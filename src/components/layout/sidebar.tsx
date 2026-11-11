"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, X, ChevronRight, Activity } from "lucide-react";
import { primaryNavItems } from "./nav-items";
import { cn } from "@/lib/utils";
import { DEFAULT_AVATAR_URL } from "@/lib/constants";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/auth-slice";
import { toast } from "sonner";

interface SidebarProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export function Sidebar({
  isCollapsed,
  isMobileOpen,
  setIsMobileOpen,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden backdrop-blur-xs transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-blue-600 text-white min-h-screen transition-all duration-300 ease-in-out select-none",
          "md:relative md:translate-x-0 shrink-0",
          isMobileOpen ? "translate-x-0 w-64 shadow-xl" : "-translate-x-full",
          !isMobileOpen && isCollapsed ? "md:w-20" : "md:w-64"
        )}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between h-16 border-b border-blue-500/40 px-4 overflow-hidden shrink-0">
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 mx-auto md:mx-0 overflow-hidden"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-blue-600 shrink-0 shadow-xs">
              <Activity className="h-5 w-5 stroke-[2.5]" />
            </div>
            {(!isCollapsed || isMobileOpen) && (
              <div className="flex flex-col whitespace-nowrap overflow-hidden">
                <span className="text-base font-bold tracking-tight text-white leading-tight">
                  Doctor Tracker
                </span>
                <span className="text-[10px] font-medium text-blue-100 leading-none">
                  Care Guide Admin
                </span>
              </div>
            )}
          </Link>

          {/* Mobile close button */}
          <button
            className="md:hidden p-1.5 rounded-lg text-blue-100 hover:text-white hover:bg-blue-700/60"
            onClick={() => setIsMobileOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto overflow-x-hidden">
          {(!isCollapsed || isMobileOpen) && (
            <p className="px-3 text-[11px] font-semibold text-blue-200/80 tracking-wide mb-2">
              Main navigation
            </p>
          )}

          {primaryNavItems.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                title={!isMobileOpen && isCollapsed ? item.title : undefined}
                className={cn(
                  "flex items-center rounded-lg transition-colors group",
                  !isMobileOpen && isCollapsed
                    ? "justify-center p-3"
                    : "justify-between px-3.5 py-2.5",
                  isActive
                    ? "bg-white/20 text-white shadow-xs font-medium"
                    : "text-blue-100 hover:bg-white/10 hover:text-white"
                )}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <item.icon className="w-5 h-5 shrink-0" />
                  {(!isCollapsed || isMobileOpen) && (
                    <span className="text-sm truncate">{item.title}</span>
                  )}
                </div>

                {(!isCollapsed || isMobileOpen) && isActive && (
                  <ChevronRight className="w-4 h-4 opacity-75 shrink-0" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Bottom Profile & Logout Section */}
        <div className="p-3 border-t border-blue-500/40 shrink-0">
          <div
            className={cn(
              "flex items-center mb-3",
              !isMobileOpen && isCollapsed ? "justify-center" : "px-2"
            )}
          >
            <div className="w-10 h-10 rounded-full border border-blue-400/40 flex items-center justify-center shrink-0 overflow-hidden bg-blue-700 shadow-xs">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={DEFAULT_AVATAR_URL}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            {(!isCollapsed || isMobileOpen) && (
              <div className="ml-3 overflow-hidden">
                <p className="text-sm font-medium text-white truncate">
                  {user?.name || "Admin"}
                </p>
                <p className="text-xs text-blue-200 capitalize truncate">
                  {user?.role || "Admin"}
                </p>
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            title={!isMobileOpen && isCollapsed ? "Sign out" : undefined}
            className={cn(
              "flex items-center text-blue-100 rounded-lg hover:bg-white/10 hover:text-white transition-colors w-full",
              !isMobileOpen && isCollapsed
                ? "justify-center p-2.5"
                : "justify-start px-3 py-2 text-xs font-medium"
            )}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {(!isCollapsed || isMobileOpen) && (
              <span className="ml-2.5 truncate">Sign out</span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
