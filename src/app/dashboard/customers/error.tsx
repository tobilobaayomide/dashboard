"use client";

import Link from "next/link";

type CustomersErrorProps = {
  reset: () => void;
};

export default function CustomersError({ reset }: CustomersErrorProps) {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="mx-auto grid size-14 place-items-center rounded-full bg-red-50 text-2xl text-red-700">
          !
        </div>
        <h1 className="mt-5 text-xl font-semibold text-[#292D32]">
          Unable to load customers
        </h1>
        <p className="mt-2 text-sm leading-6 text-[#9197B3]">
          Something went wrong while retrieving customer data. Please try again.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-lg bg-[#5932EA] px-4 py-2.5 text-sm font-medium text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5932EA]/30"
          >
            Try Again
          </button>
          <Link
            href="/dashboard/customers"
            className="rounded-lg border border-[#E5E7EB] px-4 py-2.5 text-sm font-medium text-[#292D32] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5932EA]/30"
          >
            Reset Filters
          </Link>
        </div>
      </div>
    </main>
  );
}
