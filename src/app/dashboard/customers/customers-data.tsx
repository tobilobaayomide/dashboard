import { CustomersContent } from "@/components/customers/customers-content";
import { getUsers } from "@/lib/api/users";
import { USERS_PER_PAGE } from "@/lib/constants/users";
import type { CustomerQuery } from "@/lib/query/customer-query";
import { createCustomerUrl } from "@/lib/query/customer-url";
import { redirect } from "next/navigation";

type CustomersDataProps = {
  query: CustomerQuery;
};

export async function CustomersData({ query }: CustomersDataProps) {
  const data = await getUsers(query);
  const totalPages = Math.max(1, Math.ceil(data.total / USERS_PER_PAGE));

  if (query.page > totalPages) {
    redirect(createCustomerUrl(query, { page: totalPages }));
  }

  return <CustomersContent data={data} query={query} />;
}
