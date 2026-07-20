"use client";

import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import type { SortOrder, UserSortField } from "@/lib/constants/users";
import type { CustomerQuery } from "@/lib/query/customer-query";
import { createCustomerUrl } from "@/lib/query/customer-url";

type CustomerSortProps = {
  query: CustomerQuery;
};

type SortValue =
  | "firstName:asc"
  | "firstName:desc"
  | "age:asc"
  | "age:desc";

const sortOptions: Array<{ label: string; value: SortValue }> = [
  { label: "Name A-Z", value: "firstName:asc" },
  { label: "Name Z-A", value: "firstName:desc" },
  { label: "Age: Low to High", value: "age:asc" },
  { label: "Age: High to Low", value: "age:desc" },
];

export function CustomerSort({ query }: CustomerSortProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const selectedValue = `${query.sortBy}:${query.order}` as SortValue;

  function handleSortChange(value: string) {
    const [sortBy, order] = value.split(":") as [
      UserSortField,
      SortOrder,
    ];

    startTransition(() => {
      router.replace(
        createCustomerUrl(query, {
          sortBy,
          order,
          page: 1,
        }),
        { scroll: false },
      );
    });
  }

  return (
    <div className="relative w-full sm:w-auto">
      <label htmlFor="customer-sort" className="sr-only">
        Sort customers
      </label>
      <span className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-xs text-[#7E7E7E]">
        Sort by:
      </span>
      <select
        id="customer-sort"
        value={selectedValue}
        disabled={isPending}
        onChange={(event) => handleSortChange(event.target.value)}
        className="h-10 w-full appearance-none rounded-xl bg-[#F9FBFF] py-2 pl-15.5r-9 text-xs font-semibold text-[#3D3C42] outline-none focus-visible:ring-2 focus-visible:ring-[#5932EA]/30 disabled:cursor-wait disabled:opacity-70 sm:min-w-38.5"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#3D3C42]"
      />
    </div>
  );
}
