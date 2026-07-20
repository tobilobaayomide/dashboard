import type { UsersResponse } from "@/types/user";
import type { CustomerQuery } from "@/lib/query/customer-query";

import { CustomerMetrics } from "./customer-metrics";
import { CustomerSearch } from "./customer-search";
import { CustomerSort } from "./customer-sort";
import { CustomersEmptyState } from "./customers-empty-state";
import { CustomersPagination } from "./customers-pagination";
import { CustomersTable } from "./customers-table";

type CustomersContentProps = {
  data: UsersResponse;
  query: CustomerQuery;
};

export function CustomersContent({ data, query }: CustomersContentProps) {
  return (
    <div className="mt-9 space-y-7">
      <CustomerMetrics
        users={data.users}
        total={data.total}
      />

      <section className="rounded-3xl bg-white px-6 py-6 shadow-[0_10px_60px_rgba(226,236,249,0.5)] sm:px-8 lg:px-9">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-[22px] font-semibold tracking-tight text-[#292D32]">
              All Customers
            </h1>

            <p className="mt-2 text-sm text-[#16C098]">
              Customer Directory
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <CustomerSearch query={query} />
            <CustomerSort query={query} />
          </div>
        </div>

        <div className="mt-5">
          {data.users.length > 0 ? (
            <>
              <CustomersTable users={data.users} />

              <CustomersPagination
                total={data.total}
                query={query}
                resultCount={data.users.length}
              />
            </>
          ) : (
            <CustomersEmptyState query={query.query} />
          )}
        </div>
      </section>
    </div>
  );
}
