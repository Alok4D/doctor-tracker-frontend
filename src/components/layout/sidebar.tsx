"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, X, Loader } from "lucide-react";
import { primaryNavItems } from "./nav-items";
import { cn } from "@/lib/utils";
import { DEFAULT_AVATAR_URL } from "@/lib/constants";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/lib/slice/auth/authSlice";
import { useLogoutMutation } from "@/lib/feature/auth/authApi";
import baseApi from "@/lib/api/baseApi";
import { BrandLogo } from "@/components/shared/brand-logo";
import { toast } from "sonner";
import Image from "next/image";

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
  const [logoutMutation, { isLoading: isLoggingOut }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap();
      toast.success("Logged out successfully");
    } catch {
      toast.success("Logged out successfully");
    } finally {
      dispatch(logout());
      dispatch(baseApi.util.resetApiState());
      router.push("/login");
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-[#143B42]/40 z-40 md:hidden backdrop-blur-xs transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-white text-slate-700 border-r border-[#E5ECEE] min-h-screen transition-all duration-300 ease-in-out select-none",
          "md:relative md:translate-x-0 shrink-0",
          isMobileOpen ? "translate-x-0 w-64 shadow-xl" : "-translate-x-full",
          !isMobileOpen && isCollapsed ? "md:w-20" : "md:w-64"
        )}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between h-16 border-b border-[#EEF4F5] px-5 overflow-hidden shrink-0">
          <Link
            href="/dashboard"
            className="flex items-center mx-auto md:mx-0 overflow-hidden"
          >
            <BrandLogo
              showText={!isCollapsed || isMobileOpen}
              iconClassName="h-8 w-8"
              textClassName="text-[17px] font-bold text-[#143B42]"
            />
          </Link>

          {/* Mobile close button */}
          <button
            className="md:hidden p-1.5 rounded-lg text-slate-500 hover:text-[#143B42] hover:bg-[#EBF6F6]"
            onClick={() => setIsMobileOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 px-3.5 py-6 space-y-1.5 overflow-y-auto overflow-x-hidden">
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
                  "flex items-center rounded-md transition-all group",
                  !isMobileOpen && isCollapsed
                    ? "justify-center p-3"
                    : "justify-between px-4 py-2.5",
                  isActive
                    ? "bg-[#3F97A5] text-white shadow-xs font-medium"
                    : "text-slate-600 hover:bg-[#EBF6F6] hover:text-[#143B42]"
                )}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {item.iconSrc ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.iconSrc}
                      alt={item.title}
                      className={cn(
                        "w-[18px] h-[18px] object-contain shrink-0 transition-all",
                        isActive && "brightness-0 invert"
                      )}
                    />
                  ) : (
                    item.icon && (
                      <item.icon
                        className={cn(
                          "w-[18px] h-[18px] shrink-0",
                          isActive
                            ? "text-white"
                            : "text-slate-500 group-hover:text-[#3F97A5]"
                        )}
                      />
                    )
                  )}
                  {(!isCollapsed || isMobileOpen) && (
                    <span className="text-sm truncate">{item.title}</span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom Profile & Logout Section */}
        <div className="p-3.5 border-t border-[#EEF4F5] shrink-0">
          <div
            className={cn(
              "flex items-center mb-3",
              !isMobileOpen && isCollapsed ? "justify-center" : "px-2"
            )}
          >
            <div className="w-9 h-9 rounded-full border border-[#CBE6E8] flex items-center justify-center shrink-0 overflow-hidden bg-[#EBF6F6]">
              <Image
                src={DEFAULT_AVATAR_URL}
                alt="Profile"
                className="w-full h-full object-cover"
                width={36}
                height={36}
              />
            </div>
            {(!isCollapsed || isMobileOpen) && (
              <div className="ml-3 overflow-hidden">
                <p className="text-sm font-semibold text-[#143B42] truncate">
                  {user?.name || "Admin"}
                </p>
                <p className="text-xs text-slate-400 capitalize truncate">
                  {user?.role || "Admin"}
                </p>
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            title={!isMobileOpen && isCollapsed ? "Log out" : undefined}
            className={cn(
              "flex items-center text-[#143B42] rounded-md border-[0.5px] border-[#DCEAEB] bg-[#F3F8F9] hover:bg-[#EBF6F6] hover:border-[#3F97A5]/50 transition-all w-full disabled:opacity-60 disabled:cursor-not-allowed",
              !isMobileOpen && isCollapsed
                ? "justify-center p-2.5 h-10"
                : "justify-center px-4 py-2.5 h-10 text-sm font-medium"
            )}
          >
            {isLoggingOut ? (
              <Loader className="w-4 h-4 shrink-0 animate-spin text-[#3F97A5]" />
            ) : (
              <LogOut className="w-4 h-4 shrink-0 text-[#3F97A5]" />
            )}
            {(!isCollapsed || isMobileOpen) && (
              <span className="ml-2 font-medium truncate">
                {isLoggingOut ? "Logging out..." : "Log out"}
              </span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
