"use client";

import { useState, useRef, useEffect } from "react";
import { Menu, Bell, Check, BellRing, Search } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { DEFAULT_AVATAR_URL } from "@/lib/constants";

interface HeaderProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
}

interface NotificationItem {
  id: number;
  message: string;
  time: string;
  read: boolean;
}

export function Header({
  toggleSidebar,
  toggleMobileSidebar,
}: HeaderProps) {
  const user = useAppSelector((state) => state.auth.user);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 1,
      message: "Dr. Sarah Jenkins assigned to Rahim Chowdhury (Cardiology)",
      time: "10 mins ago",
      read: false,
    },
    {
      id: 2,
      message: "New patient Merina Farah admitted to ICU",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      message: "System health check: All services operational",
      time: "3 hours ago",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between px-6 py-3.5 bg-white border-b border-slate-200/90 z-20 shrink-0">
      <div className="flex items-center gap-3">
        {/* Mobile menu toggle button */}
        <button
          onClick={toggleMobileSidebar}
          className="md:hidden p-2 -ml-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none"
          aria-label="Open mobile menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Desktop sidebar collapse/expand toggle button */}
        <button
          onClick={toggleSidebar}
          className="hidden md:block p-2 -ml-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <span className="text-sm font-medium text-[#143B42]">
          Welcome to Doctor Tracker
        </span>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notifications Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={`relative p-2 rounded-full transition-colors focus:outline-none ${
              showNotifications
                ? "bg-[#EBF6F6] text-[#3F97A5]"
                : "text-slate-500 hover:text-[#143B42] hover:bg-[#F3F8F9]"
            }`}
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#3F97A5] rounded-full animate-pulse" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-md border border-[#E5ECEE] overflow-hidden z-50">
              <div className="p-3.5 border-b border-slate-100 flex justify-between items-center bg-[#F7FAFA]">
                <h3 className="text-xs font-semibold text-[#143B42] flex items-center">
                  <BellRing className="w-3.5 h-3.5 mr-1.5 text-[#3F97A5]" />
                  Notifications
                </h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-[11px] text-[#3F97A5] hover:text-[#143B42] font-medium flex items-center"
                  >
                    <Check className="w-3 h-3 mr-1" />
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-slate-400 text-xs">
                    No notifications yet.
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-3 transition-colors ${
                        notif.read ? "bg-white opacity-75" : "bg-[#EBF6F6]/40"
                      }`}
                    >
                      <p
                        className={`text-xs ${
                          notif.read
                            ? "text-slate-600"
                            : "text-slate-900 font-medium"
                        }`}
                      >
                        {notif.message}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-1">
                        {notif.time}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-slate-200 hidden sm:block" />

        {/* User Profile Info matching user's image */}
        <div className="flex items-center space-x-3">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-sm font-medium text-slate-900 leading-none">
              {user?.name || "Admin"}
            </span>
            <span className="text-xs text-slate-400 capitalize mt-1 leading-none">
              {user?.role || "Admin"}
            </span>
          </div>
          <div className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center bg-slate-50 overflow-hidden shrink-0 shadow-xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={DEFAULT_AVATAR_URL}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
