import Link from "next/link";

type CustomersEmptyStateProps = {
  query: string;
};

export function CustomersEmptyState({ query }: CustomersEmptyStateProps) {
  return (
    <div className="flex min-h-90 flex-col items-center justify-center text-center">
      <div className="grid size-14 place-items-center rounded-full bg-[#F5F3FF] text-2xl">
        👤
      </div>

      <h2 className="mt-5 text-lg font-semibold text-[#292D32]">
        No customers found
      </h2>

      <p className="mt-2 max-w-sm text-sm leading-6 text-[#9197B3]">
        We could not find any customers matching
        {query ? ` “${query}”` : " the selected filters"}.
      </p>

      <Link
        href="/dashboard/customers"
        className="mt-5 rounded-lg bg-[#5932EA] px-4 py-2.5 text-sm font-medium text-white"
      >
        Clear Filters
      </Link>
    </div>
  );
}