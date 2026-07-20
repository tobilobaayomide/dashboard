export const USERS_PER_PAGE = 8;

export const DEFAULT_PAGE = 1;

export const DEFAULT_SORT_BY = "firstName";

export const DEFAULT_SORT_ORDER = "asc";

export const USER_SORT_FIELDS = [
  "firstName",
  "lastName",
  "age",
  "email",
] as const;

export const SORT_ORDERS = ["asc", "desc"] as const;

export const USER_SELECT_FIELDS = [
  "id",
  "firstName",
  "lastName",
  "age",
  "gender",
  "email",
  "phone",
  "image",
  "role",
  "address",
].join(",");

export type UserSortField = (typeof USER_SORT_FIELDS)[number];

export type SortOrder = (typeof SORT_ORDERS)[number];