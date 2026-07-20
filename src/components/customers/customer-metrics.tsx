import type { User } from "@/types/user";
import { Globe2, UserRoundCheck, Users } from "lucide-react";

type CustomerMetricsProps = {
  users: User[];
  total: number;
};

export function CustomerMetrics({ users, total }: CustomerMetricsProps) {
  const resultTotal = users.length === 0 ? 0 : total;
  const countriesShown = new Set( users.map((user) => user.address.country)).size;

  const metrics = [
    {
      label: "Total Customers",
      value: resultTotal.toLocaleString(),
      description: "Available customers",
      icon: Users,
    },
    {
      label: "Customers Shown",
      value: users.length.toLocaleString(),
      description: "On this page",
      icon: UserRoundCheck,
    },
    {
      label: "Countries Shown",
      value: countriesShown.toLocaleString(),
      description: "Across current results",
      icon: Globe2,
    },
  ];

  return (
    <section
      aria-label="Customer overview"
      className="grid overflow-hidden rounded-3xl bg-white shadow-[0_10px_60px_rgba(226,236,249,0.45)] md:grid-cols-3"
    >
      {metrics.map((metric, index) => (
        <article
          key={metric.label}
          className="relative flex min-h-28 items-center gap-4 px-6 py-5 md:min-h-37.75 md:px-7 lg:px-8"
        >
          {index > 0 ? (
            <>
              <div
                aria-hidden="true"
                className="absolute inset-x-7 top-0 h-px bg-[#F0F0F0] md:hidden"
              />
              <div
                aria-hidden="true"
                className="absolute inset-y-7 left-0 hidden w-px bg-[#F0F0F0] md:block"
              />
            </>
          ) : null}

          <div className="grid size-21 shrink-0 place-items-center rounded-full bg-[#D3FFE7]">
            <metric.icon
              aria-hidden="true"
              className="size-10 text-[#00AC4F]"
              strokeWidth={1.8}
            />
          </div>

          <div className="min-w-0">
            <p className="text-sm text-[#ACACAC]">
              {metric.label}
            </p>

            <p className="mt-1 text-[28px] font-semibold tracking-tight text-[#333333]">
              {metric.value}
            </p>

            <p className="mt-1 text-xs text-[#757575]">
              {metric.description}
            </p>
          </div>
        </article>
      ))}
    </section>
  );
}
