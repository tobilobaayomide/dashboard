# Loudinsight User Dashboard

A responsive customer dashboard built for the Loudinsight frontend developer take-home assignment.

The application recreates the supplied Figma dashboard using the Next.js App Router and real data from the DummyJSON Users API.

The implementation focuses primarily on server-side architecture. Customer data is fetched in Server Components, while search, pagination, and sorting are driven by URL search parameters. This makes each dashboard state server-renderable, shareable, and restorable through browser navigation.

## Live Demo

[View the deployed application](ADD_VERCEL_URL_HERE)

## Design Reference

The interface is based on the supplied Loudinsight Figma design:

`Loudinsight — Take-Home Test`

Only the Customers screen was provided, so the implementation focuses on that page while retaining the surrounding dashboard shell and navigation context.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- DummyJSON Users API
- Lucide React
- Poppins through `@fontsource/poppins`

## Features

- Server-rendered customer list
- URL-driven search
- Debounced customer search
- URL-driven pagination
- URL-driven sorting
- Server-side DummyJSON data fetching
- Explicit fetch caching and revalidation
- Responsive expanded, compact, and mobile dashboard layouts
- Loading skeletons
- Empty search-result state
- Route-level error boundary
- Semantic and accessible customer table
- Responsive horizontal table scrolling
- Validated and normalized URL parameters
- Automatic redirect for out-of-range pages
- Shareable dashboard states
- Browser back and forward navigation support

## Running the Project Locally

### Requirements

- Node.js 20 or newer
- npm

### Installation

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
cd loudinsight-dashboard
```

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the application at:

```text
http://localhost:3000
```

The root route redirects automatically to:

```text
http://localhost:3000/dashboard/customers
```

### Production Build

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

### Linting

```bash
npm run lint
```

## Environment Variables

No environment variables are required.

The application uses the public DummyJSON Users API directly from the server:

```text
https://dummyjson.com/users
```

In a larger production application, the API base URL could be moved into an environment variable to support separate development, staging, and production services.

## URL State

Search, pagination, and sorting are stored in the URL rather than only in local React state.

Examples:

```text
/dashboard/customers
/dashboard/customers?page=2
/dashboard/customers?q=emily
/dashboard/customers?sortBy=age&order=desc
/dashboard/customers?q=john&sortBy=age&order=asc&page=2
```

Supported parameters:

| Parameter | Purpose | Default |
|---|---|---|
| `q` | Customer search query | Empty |
| `page` | Current pagination page | `1` |
| `sortBy` | Field used for sorting | `firstName` |
| `order` | Sorting direction | `asc` |

Invalid values are normalized before they reach the API.

For example:

```text
/dashboard/customers?page=hello&sortBy=password&order=random
```

falls back safely to:

```text
page = 1
sortBy = firstName
order = asc
```

This prevents malformed URLs from producing invalid API requests or breaking the page.

## Server-Side Architecture

The application uses Server Components by default.

The Customers page reads URL state from the page-level `searchParams` prop, validates it, and fetches the matching customer data on the server.

The data flow is:

```text
URL search parameters
        ↓
Server-rendered Customers page
        ↓
Search-parameter validation
        ↓
Server-side DummyJSON request
        ↓
Server-rendered metrics, table, and pagination
```

Customer data is not fetched using `useEffect`, SWR, React Query, or another browser-side data-fetching library.

This means customer data is available in the server-rendered response and does not depend on client-side hydration before it appears.

## Server and Client Component Boundaries

Most of the dashboard remains server-rendered.

Server-rendered parts include:

- Dashboard layout
- Desktop and compact sidebar states
- Dashboard header
- Customer metrics
- Customer table
- Role badges
- Pagination
- Empty state
- DummyJSON data-fetching layer

Client Components are limited to interactions that require browser APIs:

- Debounced search input
- Sort selector
- Mobile navigation drawer
- Error-boundary retry control

The search and sort controls update the URL, but they do not fetch customer data directly. The server page handles the next data request after the URL changes.

This keeps the client-side JavaScript boundary small and intentional.

## Data Fetching

The application uses two DummyJSON endpoints.

Default user list:

```text
GET /users
```

Customer search:

```text
GET /users/search?q={query}
```

Both requests use the API's pagination and sorting parameters:

```text
limit
skip
sortBy
order
```

Eight customers are requested per page because the supplied design displays eight customer rows.

The skip value is calculated as:

```ts
skip = (page - 1) * 8;
```

The implementation also uses DummyJSON's `select` parameter so that the response contains only the fields needed by the interface.

Requested fields include:

```text
id
firstName
lastName
age
gender
email
phone
image
role
address
```

DummyJSON user records contain several fields that are unnecessary for this dashboard, including passwords, banking information, IP addresses, and other account details. Those values are deliberately excluded.

## Caching Strategy

Customer requests use explicit time-based revalidation:

```ts
fetch(url, {
  next: {
    revalidate: 300,
  },
});
```

This gives matching DummyJSON requests a five-minute revalidation period.

This strategy was chosen because:

- DummyJSON is a public, read-only dataset.
- The dashboard does not require real-time freshness.
- Repeated visits to the same page or query should not always require another upstream request.
- The caching decision should be explicit rather than depending on framework defaults.
- Five minutes provides a reasonable balance between freshness and request reuse.

The customer route is still dynamically rendered because its output depends on request-time URL search parameters.

The important distinction is:

- the page is rendered for the current request URL;
- matching API responses may be reused during the five-minute revalidation period.

Cache tags and on-demand invalidation were not added because this assignment does not include customer creation, editing, or deletion. Adding invalidation infrastructure without a mutation flow would introduce unnecessary complexity.

## Search Behaviour

The customer search input is a small Client Component.

It:

- initializes from the server-validated URL query;
- waits 350 milliseconds before updating the URL;
- resets pagination to page one when the query changes;
- removes the query parameter when the search is cleared;
- preserves the active sorting configuration;
- uses `router.replace` rather than `router.push`;
- keeps the current table visible during the server transition;
- displays subtle pending feedback;
- synchronizes correctly during browser back and forward navigation.

`router.replace` was chosen because creating a new browser-history entry for every debounced search value would make browser navigation unnecessarily noisy.

The search component only changes the URL. Customer results remain server-fetched.

## Sorting Behaviour

The Figma sorting control displays "Newest," but DummyJSON users do not provide a creation date.

Instead of treating user IDs as timestamps or inventing chronological data, the sort options were adapted to real API fields:

- Name A-Z
- Name Z-A
- Age: Low to high
- Age: High to low

Changing the sort option resets the current page to one while preserving the active search query.

## Pagination

Pagination is rendered using standard Next.js links.

Each pagination link preserves:

- the current search query;
- the selected sort field;
- the selected sort direction.

The pagination component includes:

- previous and next controls;
- current-page highlighting;
- compact page ranges with ellipses;
- disabled states on the first and last pages;
- accessible navigation labels;
- an accurate result range.

Example:

```text
Showing data 1 to 8 of 208 entries
```

The total value always comes from the API response rather than being copied from the Figma.

### Out-of-Range Pages

A shared or stale URL may contain a page number that is no longer valid for the current query.

Example:

```text
/dashboard/customers?q=emily&page=20
```

When the search contains fewer pages, the server redirects to the closest valid page instead of showing an empty table that incorrectly suggests there are no matching customers.

## Loading State

The Customers route includes a route-level `loading.tsx`.

The loading interface mirrors the final dashboard structure rather than showing a generic centered spinner.

It includes skeletons for:

- the dashboard heading;
- all three metric cards;
- the customer-card title;
- search and sorting controls;
- table headings;
- eight customer rows;
- pagination.

Matching the loading layout to the final interface reduces visual movement while the server response is loading.

## Error Handling

The Customers route includes a route-level `error.tsx`.

Unexpected failures, such as an unavailable upstream API, are handled by the nearest route error boundary.

The error interface:

- avoids exposing raw server errors;
- explains that customer data could not be retrieved;
- provides a retry action;
- provides a link to reset the current filters.

The API layer handles both:

- unsuccessful HTTP responses;
- network failures where `fetch` throws before receiving a response.

Development builds may still print the original stack trace in the console. This is expected development behaviour and does not mean the route error boundary failed.

## Empty State

When a search returns no customers, the table and pagination are replaced with an empty state.

The empty state includes:

- the searched query;
- a clear explanation;
- a link that clears the filters;
- zeroed customer metrics.

This prevents pagination and summary values from displaying misleading information when there are no results.

## Responsive Behaviour

The supplied Figma primarily defines a large desktop dashboard, so smaller layouts were adapted conservatively.

### Large Desktop

- Full expanded sidebar
- Upgrade card
- Full profile summary
- Three-column customer metrics
- Complete customer table
- Desktop pagination layout

### Medium Desktop and Tablet

- Icon-only compact sidebar
- Hidden navigation labels and chevrons
- Profile avatar without the full profile text
- Horizontally scrollable table where necessary

The compact and expanded sidebar states are handled by the same component rather than maintaining duplicated sidebar implementations.

### Mobile

- Mobile dashboard header
- Navigation drawer
- Stacked customer metrics
- Full-width search and sorting controls
- Horizontal table scrolling
- Wrapped pagination controls

The customer table remains a semantic HTML table on mobile.

It was not converted into a card layout because no mobile card design was supplied, and inventing an entirely different presentation would move further away from the original design handoff.

## Scroll Behaviour

On desktop, the sidebar remains stationary while the main customer content area scrolls independently.

The shell uses the viewport height, while the main content container handles vertical scrolling.

This keeps the following sidebar content available:

- navigation;
- upgrade card;
- profile section.

The implementation still allows scrolling on shorter viewports and at increased browser zoom levels. It does not assume every user has a 1024-pixel-high display.

## Accessibility

Accessibility considerations include:

- semantic navigation landmarks;
- a real HTML table;
- `<thead>`, `<tbody>`, and scoped table headings;
- accessible labels for icon-only controls;
- `aria-current` for active navigation and pagination;
- visible keyboard focus states;
- labels for search and sorting;
- text labels inside role badges;
- disabled pagination states;
- Escape-to-close behaviour for the mobile drawer;
- focus restoration when the drawer closes;
- screen-reader feedback during search transitions;
- role values communicated through text rather than colour alone.

## Design and API Adaptations

Some information shown in the Figma is not available from the DummyJSON Users API.

These differences were handled deliberately rather than filled with fabricated data.

### Status Was Replaced With Role

The Figma table contains an Active/Inactive status column.

DummyJSON does not provide user activity status. It does provide a real `role` field with values such as:

```text
admin
moderator
user
```

The Status column was therefore replaced with Role.

The badge-based visual treatment was retained, but every displayed value comes directly from the API.

### Active Members Became Customer Directory

The subtitle below "All Customers" was changed to:

```text
Customer Directory
```

The API does not provide membership or activity data, so describing the list as active members would be inaccurate.

### Summary Metrics Were Adapted

The Figma includes:

- Total Customers
- Members
- Active Now
- Monthly growth percentages
- Trend arrows
- Active-user avatars

DummyJSON does not provide historical growth, membership state, or online presence.

The summary cards therefore use API-derived values:

- Total Customers
- Customers Shown
- Countries Shown

The growth percentages, red and green trend arrows, and active-user avatar stack were not reproduced because there is no supporting data behind them.

### Sorting Was Adapted

The Figma displays "Newest," but the API provides no account creation date.

The sort menu was changed to supported fields rather than inferring a creation order from unrelated data.

### Navigation Scope

Only the Customers page was supplied and required.

The other sidebar items are retained to preserve the dashboard design context, but they do not link to invented pages.

This avoids:

- creating unsupported screens;
- introducing empty routes;
- presenting functionality that was not part of the assignment.

## Typography

The Figma uses Poppins.

Poppins is bundled locally using `@fontsource/poppins` instead of being downloaded from Google Fonts during the build.

This was chosen because:

- local builds remain reliable without external font access;
- deployment does not depend on a third-party font request;
- only the required font weights need to be included;
- the final typography remains close to the supplied design.

## Key Tradeoffs

### No Client-Side Data-Fetching Library

React Query and SWR were not used because the assignment prioritizes App Router server-rendering patterns.

Adding either library for this read-only list would move data ownership into the browser and weaken the URL-driven server-rendered approach.

### No Axios

The native server `fetch` API was used because Next.js extends it with caching and revalidation options.

Axios would add a dependency without improving this use case.

### No Global State Library

The URL already represents search, pagination, and sorting state.

Adding Zustand, Redux, or React Context would create a second source of truth.

### No Internal API Proxy

The customer page fetches DummyJSON directly from the server.

An internal Next.js API route that only forwards requests would add another layer without providing authentication, transformation, rate limiting, or another meaningful responsibility.

### No Runtime Validation Library

The external response is checked with a focused runtime guard.

A library such as Zod would be reasonable in a larger application with several complex external payloads, but it was not necessary for this single response shape.

### No Fabricated Product Data

Activity, membership, growth, and customer-status information were not invented simply to match the screenshot.

The design was adapted to the real API contract, and those decisions are documented in this README.

### No Speculative Dashboard Pages

The dashboard shell is reusable, but unrelated pages were not implemented.

This keeps the submission focused on the supplied requirements and avoids increasing the review surface with unsupported work.

### Responsive Table Instead of Mobile Cards

The table scrolls horizontally on smaller screens rather than becoming a separate card layout.

This preserves the semantic relationship between headings and values and avoids inventing a mobile design that was not provided.

## Testing and Verification

The project was verified with:

```bash
npm run lint
npm run build
```

The following routes and states were tested:

```text
/dashboard/customers
/dashboard/customers?page=2
/dashboard/customers?q=emily
/dashboard/customers?q=zzzzzzzz
/dashboard/customers?sortBy=age&order=desc
/dashboard/customers?q=john&sortBy=age&order=asc
/dashboard/customers?page=999
```

Additional checks included:

- Search debounce
- Search clearing
- Browser back and forward navigation
- Sorting while a search is active
- Pagination while sorting is active
- Pagination while searching
- Invalid URL values
- Empty search results
- Upstream API failure
- Route error recovery
- Loading skeleton layout
- Expanded sidebar behaviour
- Compact sidebar behaviour
- Mobile navigation behaviour
- Table horizontal overflow
- Production build success
- Browser console warning review

## What I Would Improve With More Time

With more time, I would consider adding:

- Unit tests for query parsing and pagination utilities
- End-to-end tests with Playwright
- Automated accessibility testing
- Visual regression testing against the Figma
- A more complete focus trap for the mobile drawer
- A dashboard-wide search experience
- Real backend-provided activity and growth metrics
- On-demand cache invalidation if customer mutations were introduced
- Customer detail routes
- Column-level table sorting controls
- User-configurable page size
- Persisted dashboard preferences
- Improved mobile table affordances
- Performance and error monitoring
- More granular Suspense boundaries if additional independent data sources were introduced

These additions would be introduced when the product requirements justify them rather than only to increase the feature count.

## Approximate Time Spent

Approximately **[5-6] hours** across architecture, implementation, responsive styling, testing, and documentation.

## AI Tool Usage

AI tools were used as a development assistant for parts of the planning, architecture review, implementation discussion, edge-case analysis, and documentation.

All suggestions were reviewed, adapted, implemented, and tested against the assignment requirements, the supplied Figma design, the DummyJSON API, and the final application behaviour.
