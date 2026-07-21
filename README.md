# Loudinsight User Dashboard

This is my submission for the Loudinsight frontend developer take-home assignment.

The task was to build the customer dashboard shown in the supplied Figma design using Next.js App Router and real data from the DummyJSON Users API.

My main focus was not only to match the design, but to structure the page properly around Server Components, server-side data fetching, URL-driven state, and clear handling of loading, empty, and error states.

## Live Demo

[Live Link](https://customersdb.vercel.app/)

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- DummyJSON Users API
- Lucide React
- Poppins via `@fontsource/poppins`

## Running the Project Locally

Clone the repository:

```bash
git clone https://github.com/tobilobaayomide/dashboard
cd dashboard
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

The root route redirects to:

```text
/dashboard/customers
```

To test the production build:

```bash
npm run build
npm run start
```

To run linting:

```bash
npm run lint
```

No environment variables are required.

## How I Structured the Page

The dashboard uses Server Components by default.

The customer page reads the current search, page, and sorting values from the URL, validates them, and then fetches the matching data from DummyJSON on the server.

The general flow is:

```text
URL search parameters
        ↓
Server-rendered customers page
        ↓
Validated query values
        ↓
Server-side DummyJSON request
        ↓
Rendered metrics, table, and pagination
```

I intentionally kept the customer data fetching out of `useEffect`.

The only Client Components are the parts that actually need browser interaction:

- the debounced search input;
- the sort selector;
- the mobile navigation drawer;
- the retry action in the route error boundary.

The search and sorting controls only update the URL. They do not fetch customer data themselves.

## Streaming and Suspense

The customer data section is wrapped in a focused `<Suspense>` boundary.

This allows the dashboard shell and header to render immediately while the API-dependent metrics, table, and pagination stream in with a matching skeleton during the initial load.

I kept the metrics and table inside one boundary because they depend on the same API response. I also avoided resetting the boundary on every search, sort, or pagination change, so previously loaded content stays visible during server transitions while the controls show pending feedback.

## URL as the Source of Truth

Search, pagination, and sorting are stored in the URL.

Examples:

```text
/dashboard/customers
/dashboard/customers?page=2
/dashboard/customers?q=emily
/dashboard/customers?sortBy=age&order=desc
```

The supported values are:

| Parameter | Meaning | Default |
|---|---|---|
| `q` | Search query | Empty |
| `page` | Current page | `1` |
| `sortBy` | Sort field | `firstName` |
| `order` | Sort direction | `asc` |

I chose URL search parameters instead of keeping this state only in React because the page state should be:

- shareable;
- refresh-safe;
- server-renderable;
- restorable through browser back and forward navigation.

Invalid values are also normalized before reaching the API.

For example:

```text
/dashboard/customers?page=hello&sortBy=password&order=random
```

falls back safely to the default page and sorting values.

## Data Fetching

The customer list uses:

```text
GET /users
```

Search uses:

```text
GET /users/search?q={query}
```

Pagination uses the API's `limit` and `skip` parameters.

The design shows eight rows, so I used eight customers per page.

```ts
skip = (page - 1) * 8;
```

I also used the API's `select` parameter to request only the fields used by the interface.

That means fields such as passwords, banking details, IP addresses, and other unrelated user data are not requested.

## Caching Decision

The customer requests use:

```ts
fetch(url, {
  next: {
    revalidate: 300,
  },
});
```

This gives each matching request a five-minute revalidation period.

I chose this because DummyJSON is a public, read-only dataset and the dashboard does not require real-time updates.

A five-minute revalidation period allows repeated visits to the same page, search, or sorting combination to reuse cached data without treating the dataset as permanently static.

The route is still dynamically rendered because its output depends on the current URL search parameters.

I did not add cache tags or on-demand revalidation because there are no customer create, edit, or delete actions in this assignment.

## Search

The customer search is debounced by 350 milliseconds.

When the search value changes:

- the query is written to the URL;
- the current page resets to page one;
- the current sorting is preserved;
- the customer data is fetched again on the server.

I used `router.replace` instead of `router.push` because creating a new browser-history entry for every search update would make the back button frustrating to use.

## Sorting

The Figma shows a `Newest` sorting option.

DummyJSON users do not include an account creation date, so there was no honest way to sort users by newest.

I replaced that with sorting options supported by real API fields:

- Name A-Z
- Name Z-A
- Age: Low to High
- Age: High to Low

Changing the sorting resets the page to one and keeps the current search query.

## Pagination

Pagination is rendered with normal Next.js links.

Each page link keeps the active search and sorting values.

The pagination also handles page ranges with ellipses, previous and next controls, and disabled states at the beginning and end.

If a URL points to a page that does not exist for the current query, the server redirects to the nearest valid page instead of showing a misleading empty table.

## Decisions I Made Around the Figma and API

The main challenge was that some values shown in the design do not exist in the DummyJSON user data.

I decided not to invent data just to make the screen look identical.

### Total Customers, Customers Shown, and Countries Shown

The Figma uses:

- Total Customers
- Members
- Active Now
- monthly percentage changes
- red and green trend arrows
- active-user avatars

DummyJSON does not provide membership status, online activity, historical growth, or monthly comparisons.

Because of that, I changed the metrics to values I could calculate honestly from the API:

- **Total Customers** — the total returned by DummyJSON;
- **Customers Shown** — the number of customers currently displayed on the page;
- **Countries Shown** — the number of unique countries represented in the current page results.

I removed the growth percentages, arrows, and active-user avatars because there was no real data behind them.

I preferred adapting the design to real data instead of displaying numbers that looked good but had no meaning.

### Role Instead of Status

The Figma table uses an Active/Inactive status column.

DummyJSON does not provide customer activity status.

It does provide a real `role` field with values such as:

```text
admin
moderator
user
```

I replaced Status with Role and kept the badge styling.

This allowed the table to stay visually close to the design while still displaying real API data.

### Customer Directory Instead of Active Members

The Figma subtitle says `Active Members`.

Since the API does not provide membership or activity information, I changed it to:

```text
Customer Directory
```

That better describes what the page actually contains.

### Other Dashboard Pages

The sidebar includes Dashboard, Product, Income, Promote, and Help, but only the Customers page was supplied in the design and assignment.

I kept the other navigation items for layout context, but I did not create fake pages for them.

I wanted the submission to stay focused on the page that was actually required instead of adding unsupported screens.

## Loading, Empty, and Error States

The customer route includes:

- `loading.tsx`
- `error.tsx`
- a dedicated empty state

The customer route includes both a route-level `loading.tsx` fallback and a focused `<Suspense>` boundary around the customer data section.

The dashboard shell and header can render immediately, while the API-dependent metrics, table, and pagination stream in with a matching skeleton fallback.

I kept the metrics and table inside one Suspense boundary because they depend on the same API response. Splitting them into separate boundaries would add complexity without providing meaningful independent loading.

The empty state appears when a search returns no results and includes a clear-filters action.

The error boundary handles API failures and provides both a retry action and a way to reset the current filters.

## Responsive Behaviour

The supplied design was mainly a desktop screen, so I kept the responsive behaviour close to the same structure.

### Large desktop

- full sidebar;
- upgrade card;
- full profile information;
- three-column metrics;
- complete table layout.

### Medium desktop and tablet

- compact icon-only sidebar;
- hidden labels and chevrons;
- horizontal table scrolling where required.

The full and compact states are handled by the same sidebar component instead of maintaining two separate versions.

### Mobile

- mobile header;
- navigation drawer;
- stacked metric cards;
- full-width search and sorting controls;
- horizontally scrollable table;
- wrapped pagination.

I kept the table as a real HTML table on mobile rather than creating a separate card design because no mobile card layout was provided.

## Accessibility

Some of the accessibility considerations include:

- semantic navigation landmarks;
- a real HTML table with scoped headings;
- labels for search and sorting controls;
- visible keyboard focus states;
- accessible names for icon-only controls;
- `aria-current` for active navigation and pagination;
- text inside role badges instead of relying only on colour;
- Escape-to-close and focus restoration for the mobile drawer;
- screen-reader feedback while search results are updating.

## Main Tradeoffs

### No React Query or SWR

The assignment specifically focuses on server-side App Router patterns.

Using a client data-fetching library for this page would move the customer data ownership into the browser and work against the main requirement.

### No Axios

I used the native server `fetch` API because Next.js extends it with caching and revalidation options.

Axios would add another dependency without improving this use case.

### No Global State Library

Search, pagination, and sorting already live in the URL.

Using Zustand, Redux, or Context for the same values would create another source of truth.

### No Internal API Route

The customer page fetches DummyJSON directly from the server.

Creating a Next.js API route that only forwards the request would add another layer without providing authentication, transformation, or another useful responsibility.

### No Fabricated Dashboard Data

I did not invent active status, growth percentages, or online users just to reproduce the screenshot exactly.

Where the API and Figma differed, I documented the decision and used values supported by the real data.


## What I Would Improve With More Time

With more time, I would add:

- unit tests for the query parser and pagination utility;
- Playwright tests for the main customer flows;
- automated accessibility checks;
- visual regression testing against the Figma;
- customer detail pages;
- user-configurable page size;
- real backend-provided growth and activity metrics;
- on-demand cache invalidation if customer mutations were added;
- more complete keyboard focus trapping in the mobile drawer;
- performance and error monitoring.

## Approximate Time Spent

Approximately **5-6 hours** across planning, architecture, implementation, responsive styling, testing, and documentation.

## AI Tool Usage

I used AI tools as a development assistant during parts of the planning, architecture review, implementation discussion, edge-case analysis, and README preparation.

I reviewed and adapted the suggestions before implementation, and I tested the final behaviour against the assignment requirements, the Figma design, and the DummyJSON API.
