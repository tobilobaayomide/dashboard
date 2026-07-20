"use client";

import { Search, X } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import type { CustomerQuery } from "@/lib/query/customer-query";
import { createCustomerUrl } from "@/lib/query/customer-url";

type CustomerSearchProps = {
  query: CustomerQuery;
};

const SEARCH_DEBOUNCE_MS = 350;

export function CustomerSearch({ query }: CustomerSearchProps) {
  const router = useRouter();
  const [value, setValue] = useState(query.query);
  const [isPending, startTransition] = useTransition();
  const previousQueryRef = useRef(query.query);

  useEffect(() => {
    if (previousQueryRef.current === query.query) {
      return;
    }

    previousQueryRef.current = query.query;
    setValue(query.query);
  }, [query.query]);

  useEffect(() => {
    const normalizedValue = value.trim();

    if (normalizedValue === query.query) {
      return;
    }

    const timeout = window.setTimeout(() => {
      startTransition(() => {
        router.replace(
          createCustomerUrl(query, {
            query: normalizedValue,
            page: 1,
          }),
          { scroll: false },
        );
      });
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timeout);
  }, [query, router, value]);

  function clearSearch() {
    setValue("");
    startTransition(() => {
      router.replace(
        createCustomerUrl(query, {
          query: "",
          page: 1,
        }),
        { scroll: false },
      );
    });
  }

  return (
    <div className="relative w-full sm:w-54">
      <label htmlFor="customer-search" className="sr-only">
        Search customers by name
      </label>
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-1/2 size-4.5 -translate-y-1/2 text-[#7E7E7E]"
      />
      <input
        id="customer-search"
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search"
        autoComplete="off"
        className="h-10 w-full rounded-xl bg-[#F9FBFF] py-2 pl-10 pr-9 text-xs text-[#292D32] outline-none placeholder:text-[#B5B7C0] focus-visible:ring-2 focus-visible:ring-[#5932EA]/30"
      />
      {value ? (
        <button
          type="button"
          onClick={clearSearch}
          aria-label="Clear customer search"
          className="absolute right-2 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-md text-[#9197B3] hover:bg-[#EEE9FF] hover:text-[#5932EA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5932EA]/30"
        >
          <X aria-hidden="true" className="size-4" />
        </button>
      ) : null}
      <span className="sr-only" aria-live="polite">
        {isPending ? "Updating customer results" : ""}
      </span>
      {isPending ? (
        <span
          aria-hidden="true"
          className="absolute inset-x-3 bottom-0 h-0.5 overflow-hidden rounded-full bg-[#E5E1F8]"
        >
          <span className="block h-full w-1/2 animate-pulse rounded-full bg-[#5932EA]" />
        </span>
      ) : null}
    </div>
  );
}
