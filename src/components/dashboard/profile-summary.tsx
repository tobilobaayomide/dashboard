import { ChevronDown } from "lucide-react";
import Image from "next/image";

import { dashboardUser } from "@/lib/constants/dashboard";
import { cn } from "@/lib/utils/cn";

type ProfileSummaryProps = {
  compact?: boolean;
};

function ProfileAvatar() {
  return (
    <Image
      src="/images/profile-summary.png"
      alt={`${dashboardUser.name} profile photo`}
      width={44}
      height={44}
      loading="eager"
      className="size-11 shrink-0 rounded-full object-cover"
    />
  );
}

export function ProfileSummary({ compact = false }: ProfileSummaryProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3",
        compact && "lg:justify-center xl:justify-start",
      )}
    >
      <ProfileAvatar />

      <div
        className={cn(
          "min-w-0 flex-1",
          compact && "lg:hidden xl:block",
        )}
      >
        <p className="truncate text-sm font-medium text-[#292D32]">
          {dashboardUser.name}
        </p>

        <p className="truncate text-xs text-[#757575]">
          {dashboardUser.role}
        </p>
      </div>

      <ChevronDown
        aria-hidden="true"
        className={cn(
          "size-4 shrink-0 text-[#757575]",
          compact && "lg:hidden xl:block",
        )}
      />
    </div>
  );
}
