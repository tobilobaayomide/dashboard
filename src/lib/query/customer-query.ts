import { DEFAULT_PAGE, DEFAULT_SORT_BY, DEFAULT_SORT_ORDER, SORT_ORDERS, USER_SORT_FIELDS, type SortOrder, type UserSortField } from "@/lib/constants/users";

export type CustomerSearchParams = {
  q?: string | string[];
  page?: string | string[];
  sortBy?: string | string[];
  order?: string | string[];
};

export type CustomerQuery = {
  query: string;
  page: number;
  sortBy: UserSortField;
  order: SortOrder;
};

function getSingleValue(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

function parsePage(value: string): number {
  const page = Number.parseInt(value, 10);

  if (!Number.isFinite(page) || page < 1) {
    return DEFAULT_PAGE;
  }

  return page;
}

function isUserSortField(value: string): value is UserSortField {
  return USER_SORT_FIELDS.includes(value as UserSortField);
}

function isSortOrder(value: string): value is SortOrder {
  return SORT_ORDERS.includes(value as SortOrder);
}

export function parseCustomerQuery(searchParams: CustomerSearchParams): CustomerQuery {
  const query = getSingleValue(searchParams.q).trim().slice(0, 100);
  const page = parsePage(getSingleValue(searchParams.page));

  const requestedSortBy = getSingleValue(searchParams.sortBy);
  const requestedOrder = getSingleValue(searchParams.order);

  return {
    query,
    page,
    sortBy: isUserSortField(requestedSortBy)
      ? requestedSortBy
      : DEFAULT_SORT_BY,
    order: isSortOrder(requestedOrder)
      ? requestedOrder
      : DEFAULT_SORT_ORDER,
  };
}