import { CustomersTableSkeleton } from "./customers-table-skeleton";

function MetricSkeleton() {
  return (
    <article className="relative flex min-h-32 items-center gap-5 px-7 py-5 lg:px-8">
      <div className="size-15 shrink-0 rounded-full bg-[#E9F9F0]" />
      <div className="space-y-3">
        <div className="h-4 w-28 rounded bg-[#F0F1F5]" />
        <div className="h-8 w-16 rounded bg-[#F0F1F5]" />
        <div className="h-3 w-24 rounded bg-[#F0F1F5]" />
      </div>
    </article>
  );
}

export function CustomersContentSkeleton() {
  return (
    <div className="mt-9 space-y-7">
      <section className="grid overflow-hidden rounded-3xl bg-white shadow-[0_10px_60px_rgba(226,236,249,0.45)] md:grid-cols-3">
        <MetricSkeleton />
        <MetricSkeleton />
        <MetricSkeleton />
      </section>

      <section className="rounded-3xl bg-white px-6 py-6 shadow-[0_10px_60px_rgba(226,236,249,0.5)] sm:px-8 lg:px-9">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-3">
            <div className="h-7 w-36 rounded bg-[#F0F1F5]" />
            <div className="h-4 w-28 rounded bg-[#F0F1F5]" />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="h-10 w-full rounded-xl bg-[#F0F1F5] sm:w-54" />
            <div className="h-10 w-38.5 rounded-xl bg-[#F0F1F5]" />
          </div>
        </div>

        <div className="mt-5">
          <CustomersTableSkeleton />
          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="h-4 w-52 rounded bg-[#F0F1F5]" />
            <div className="flex gap-2">
              {Array.from({ length: 5 }, (_, index) => (
                <div
                  key={index}
                  className="size-7 rounded border border-[#EEEEEE] bg-[#F0F1F5]"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
