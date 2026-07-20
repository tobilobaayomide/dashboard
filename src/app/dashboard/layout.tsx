import type { ReactNode } from "react";

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { MobileSidebar } from "@/components/dashboard/mobile-sidebar";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) { 
  return (
    <div className="min-h-dvh bg-[#f5f5fd] lg:flex lg:h-dvh lg:min-h-0 lg:overflow-hidden">
      <DashboardSidebar />

      <div className="min-w-0 flex-1 bg-[#f5f5fd] lg:overflow-y-auto">
        <MobileSidebar />
        {children}
      </div>
    </div>
  );
}
