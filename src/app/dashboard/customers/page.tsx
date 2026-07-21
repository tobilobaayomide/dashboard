import { Suspense } from "react";

import { CustomersContentSkeleton } from "@/components/customers/customers-content-skeleton";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { parseCustomerQuery, type CustomerSearchParams } from "@/lib/query/customer-query";

import { CustomersData } from "./customers-data";

type CustomersPageProps = {
  searchParams: Promise<CustomerSearchParams>;
};

export default async function CustomersPage({ searchParams }: CustomersPageProps) {
  const query = parseCustomerQuery(await searchParams);

  return (
    <main className="min-h-dvh px-4 py-6 sm:px-6 lg:px-10 lg:py-8 xl:px-14 2xl:px-17.75">
      <DashboardHeader />

      <Suspense fallback={<CustomersContentSkeleton />}>
        <CustomersData query={query} />
      </Suspense>
    </main>
  );
}
