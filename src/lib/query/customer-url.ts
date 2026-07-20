import { DEFAULT_SORT_BY, DEFAULT_SORT_ORDER } from "@/lib/constants/users";
import type { CustomerQuery } from "@/lib/query/customer-query";

type CustomerQueryUpdates = Partial<CustomerQuery>;

export function createCustomerUrl( currentQuery: CustomerQuery, updates: CustomerQueryUpdates ): string {
  const nextQuery = {
    ...currentQuery,
    ...updates,
  };
  const params = new URLSearchParams();

  if (nextQuery.query) {
    params.set("q", nextQuery.query);
  }

  if (nextQuery.page > 1) {
    params.set("page", nextQuery.page.toString());
  }

  if (nextQuery.sortBy !== DEFAULT_SORT_BY) {
    params.set("sortBy", nextQuery.sortBy);
  }

  if (nextQuery.order !== DEFAULT_SORT_ORDER) {
    params.set("order", nextQuery.order);
  }

  const queryString = params.toString();

  return queryString
    ? `/dashboard/customers?${queryString}`
    : "/dashboard/customers";
}
