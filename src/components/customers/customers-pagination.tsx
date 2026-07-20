import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

import { USERS_PER_PAGE } from "@/lib/constants/users";
import type { CustomerQuery } from "@/lib/query/customer-query";
import { createCustomerUrl } from "@/lib/query/customer-url";
import { cn } from "@/lib/utils/cn";
import { getPaginationItems } from "@/lib/utils/pagination";

type CustomersPaginationProps = {
  total: number;
  query: CustomerQuery;
  resultCount: number;
};

export function CustomersPagination({ total, query, resultCount }: CustomersPaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / USERS_PER_PAGE));

  const safeCurrentPage = Math.min(query.page, totalPages);

  const start =
    total === 0
      ? 0
      : (safeCurrentPage - 1) * USERS_PER_PAGE + 1;

  const end =
    total === 0
      ? 0
      : Math.min(start + resultCount - 1, total);

  const items = getPaginationItems(
    safeCurrentPage,
    totalPages,
  );

  return (
    <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-[#B5B7C0]">
        Showing data {start} to {end} of{" "}
        {total.toLocaleString()} entries
      </p>

      <nav
        aria-label="Customers pagination"
        className="flex flex-wrap items-center gap-2"
      >
        <PaginationArrow
          direction="previous"
          disabled={safeCurrentPage === 1}
          href={createCustomerUrl(query, {
            page: safeCurrentPage - 1,
          })}
        />

        {items.map((item, index) => {
          if (item === "ellipsis") {
            return (
              <span
                key={`ellipsis-${index}`}
                aria-hidden="true"
                className="grid size-9 place-items-center text-xs text-[#404B52] sm:size-7"
              >
                …
              </span>
            );
          }

          return (
            <Link
              key={item}
              href={createCustomerUrl(query, { page: item })}
              aria-current={
                item === safeCurrentPage
                  ? "page"
                  : undefined
              }
              className={cn(
                "grid size-9 place-items-center rounded border text-xs transition-colors sm:size-7",
                item === safeCurrentPage
                  ? "border-[#5932EA] bg-[#5932EA] text-white"
                  : "border-[#EEEEEE] bg-[#F5F5F5] text-[#404B52] hover:border-[#5932EA] hover:text-[#5932EA]",
              )}
            >
              {item}
            </Link>
          );
        })}

        <PaginationArrow
          direction="next"
          disabled={safeCurrentPage === totalPages}
          href={createCustomerUrl(query, {
            page: safeCurrentPage + 1,
          })}
        />
      </nav>
    </div>
  );
}

type PaginationArrowProps = {
  direction: "previous" | "next";
  disabled: boolean;
  href: string;
};

function PaginationArrow({
  direction,
  disabled,
  href,
}: PaginationArrowProps) {
  const label =
    direction === "previous"
      ? "Go to previous page"
      : "Go to next page";

  const Icon =
    direction === "previous"
      ? ChevronLeft
      : ChevronRight;

  if (disabled) {
    return (
      <span
        aria-disabled="true"
        aria-label={label}
        className="grid size-9 cursor-not-allowed place-items-center rounded border border-[#EEEEEE] bg-[#F5F5F5] text-[#B5B7C0] sm:size-7"
      >
        <Icon aria-hidden="true" className="size-4" />
      </span>
    );
  }

  return (
    <Link
      href={href}
      aria-label={label}
      className="grid size-9 place-items-center rounded border border-[#EEEEEE] bg-[#F5F5F5] text-[#404B52] transition-colors hover:border-[#5932EA] hover:text-[#5932EA] sm:size-7"
    >
      <Icon aria-hidden="true" className="size-4" />
    </Link>
  );
}
