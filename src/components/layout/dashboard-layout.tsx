"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { useAppSelector } from "@/store/hooks";
import { Loader } from "lucide-react";

export function DashboardLayout({ children }: { children: React.ReactNode }) {

  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, token } = useAppSelector((state) => state.auth);
  const [isMounted, setIsMounted] = useState(false);

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 1280;
    }
    return false;
  });
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Protect portal on client side
  useEffect(() => {
    if (isMounted && (!isAuthenticated || !token)) {
      router.replace("/login");
    }
  }, [isMounted, isAuthenticated, token, router]);

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Handle window resize for auto-collapse
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1280) {
        setIsSidebarCollapsed(true);
      } else {
        setIsSidebarCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isMounted || !isAuthenticated || !token) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <Loader className="h-7 w-7 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-roboto text-slate-800">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />
      <div className="flex-1 flex flex-col h-screen overflow-hidden min-w-0">
        <Header
          isCollapsed={isSidebarCollapsed}
          toggleSidebar={() => setIsSidebarCollapsed((prev) => !prev)}
          toggleMobileSidebar={() => setIsMobileOpen(true)}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <div className="mx-auto max-w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
