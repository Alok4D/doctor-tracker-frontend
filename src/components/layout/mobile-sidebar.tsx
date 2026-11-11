"use client";

import { Sidebar } from "./sidebar";

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function MobileSidebar({ open, onClose }: MobileSidebarProps) {
  return (
    <Sidebar
      isCollapsed={false}
      isMobileOpen={open}
      setIsMobileOpen={(val) => {
        if (!val) onClose();
      }}
    />
  );
}
