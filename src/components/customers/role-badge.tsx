import { cn } from "@/lib/utils/cn";
import type { UserRole } from "@/types/user";

type RoleBadgeProps = {
  role: UserRole;
};

const roleStyles: Record<UserRole, string> = {
  admin:
    "border-[#5932EA] bg-[#EEE9FF] text-[#5932EA]",
  moderator:
    "border-[#D97706] bg-[#FFF7E6] text-[#B45309]",
  user:
    "border-[#00B087] bg-[#A6E7D8] text-[#008767]",
};

export function RoleBadge({ role }: RoleBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex min-w-19 items-center justify-center rounded border px-3 py-1 text-xs font-medium capitalize",
        roleStyles[role],
      )}
    >
      {role}
    </span>
  );
}
