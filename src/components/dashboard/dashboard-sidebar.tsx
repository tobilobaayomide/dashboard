import { dashboardBrand, dashboardNavigation } from "@/lib/constants/dashboard";

import { Logo } from "./logo";
import { NavigationItem } from "./navigation-item";
import { ProfileSummary } from "./profile-summary";
import { UpgradeCard } from "./upgrade-card";

export function DashboardSidebar() {
  return (
    <aside className="hidden h-dvh shrink-0 flex-col border-r border-black/2 bg-white lg:flex lg:w-22 lg:px-4 lg:py-8 xl:w-76.5 xl:px-7 xl:py-9">
      <div className="flex items-center justify-center gap-2 xl:justify-start">
        <Logo className="shrink-0 text-[#292D32]" />

        <span className="hidden text-[26px] font-semibold tracking-tight text-[#292D32] xl:block">
          {dashboardBrand.name}
        </span>

        <span className="mt-3 hidden text-[10px] text-[#838383] xl:block">
          {dashboardBrand.version}
        </span>
      </div>

      <nav
        aria-label="Dashboard navigation"
        className="mt-12 space-y-3"
      >
        {dashboardNavigation.map((item) => (
          <NavigationItem
            key={item.label}
            label={item.label}
            icon={item.icon}
            href={"href" in item ? item.href : undefined}
            available={item.available}
            active={item.label === "Customers"}
            compact
          />
        ))}
      </nav>

      <div className="mt-auto pt-8">
        <UpgradeCard />

        <div className="mt-8">
          <ProfileSummary compact />
        </div>
      </div>
    </aside>
  );
}
