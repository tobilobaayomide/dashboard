import { CustomersContent } from "@/components/customers/customers-content";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { getUsers } from "@/lib/api/users";
import { USERS_PER_PAGE } from "@/lib/constants/users";
import { parseCustomerQuery, type CustomerSearchParams } from "@/lib/query/customer-query";
import { createCustomerUrl } from "@/lib/query/customer-url";
import { redirect } from "next/navigation";

type CustomersPageProps = {
  searchParams: Promise<CustomerSearchParams>;
};

export default async function CustomersPage({ searchParams }: CustomersPageProps) {
  const query = parseCustomerQuery(await searchParams);
  const data = await getUsers(query);
  const totalPages = Math.max(1, Math.ceil(data.total / USERS_PER_PAGE));

  if (query.page > totalPages) {
    redirect(createCustomerUrl(query, { page: totalPages }));
  }

  return (
    <main className="min-h-dvh px-4 py-6 sm:px-6 lg:px-10 lg:py-8 xl:px-14 2xl:px-17.75">
      <DashboardHeader />

      <CustomersContent data={data} query={query} />
    </main>
  );
}
