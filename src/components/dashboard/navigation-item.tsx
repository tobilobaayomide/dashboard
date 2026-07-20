import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils/cn";

type NavigationItemProps = {
  label: string;
  icon: LucideIcon;
  href?: string;
  active?: boolean;
  available?: boolean;
  onNavigate?: () => void;
  compact?: boolean;
};

const itemClasses =
  "flex min-h-12 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors";

export function NavigationItem({ label, icon: Icon, href, active = false, available = true, onNavigate, compact = false }: NavigationItemProps) {
  const content = (
    <>
      <Icon aria-hidden="true" className="size-5 shrink-0" />

      <span
        className={cn(
          "min-w-0 flex-1 truncate text-left",
          compact && "lg:hidden xl:block",
        )}
      >
        {label}
      </span>

      {label !== "Dashboard" ? (
        <ChevronRight
          aria-hidden="true"
          className={cn(
            "size-4 shrink-0",
            compact && "lg:hidden xl:block",
          )}
        />
      ) : null}
    </>
  );

  if (available && href) {
    return (
      <Link
        href={href}
        onClick={onNavigate}
        aria-current={active ? "page" : undefined}
        className={cn(
          itemClasses,
          compact && "lg:justify-center lg:px-0 xl:justify-start xl:gap-3 xl:px-3",
          active
            ? "bg-[#5932EA] text-white"
            : "text-[#9197B3] hover:bg-[#F5F3FF] hover:text-[#5932EA]",
        )}
      >
        {content}
      </Link>
    );
  }

  return (
    <div
      aria-disabled="true"
      className={cn(
        itemClasses,
        compact && "lg:justify-center lg:px-0 xl:justify-start xl:gap-3 xl:px-3",
        "cursor-default text-[#9197B3]",
      )}
    >
      {content}
    </div>
  );
}
