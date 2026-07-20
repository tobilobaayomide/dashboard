import { USERS_PER_PAGE, USER_SELECT_FIELDS, type SortOrder, type UserSortField } from "@/lib/constants/users";
import type { UsersResponse } from "@/types/user";

const USERS_API_URL = "https://dummyjson.com/users";

export type GetUsersOptions = {
  query: string;
  page: number;
  sortBy: UserSortField;
  order: SortOrder;
};

export class UsersApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = "UsersApiError";
  }
}

export async function getUsers({ query, page, sortBy, order }: GetUsersOptions): Promise<UsersResponse> { 
  const skip = (page - 1) * USERS_PER_PAGE;
  const endpoint = query ? `${USERS_API_URL}/search` : USERS_API_URL;
  const params = new URLSearchParams({
    limit: USERS_PER_PAGE.toString(),
    skip: skip.toString(),
    select: USER_SELECT_FIELDS,
    sortBy,
    order,
  });

  if (query) { params.set("q", query); }

  let response: Response;

  try {
    response = await fetch(`${endpoint}?${params.toString()}`, {
      next: {
        revalidate: 300,
      },
    });
  } catch (error) {
    throw new UsersApiError(
      "The customer service is currently unavailable.",
      undefined,
      { cause: error },
    );
  }

  if (!response.ok) {
    throw new UsersApiError("Unable to load customers.", response.status);
  }

  const data: unknown = await response.json();

  if (!isUsersResponse(data)) {
    throw new UsersApiError("The users API returned an invalid response.");
  }

  return data;
}

function isUsersResponse(value: unknown): value is UsersResponse {
  if (!value || typeof value !== "object") {
    return false;
  }

  const response = value as Partial<UsersResponse>;

  return (
    Array.isArray(response.users) &&
    typeof response.total === "number" &&
    typeof response.skip === "number" &&
    typeof response.limit === "number"
  );
}
