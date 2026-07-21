import { CustomersContentSkeleton } from "@/components/customers/customers-content-skeleton";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

export default function CustomersLoading() {
  return (
    <main className="min-h-dvh px-5 py-7 sm:px-8 lg:px-10 lg:py-8 xl:px-14 2xl:px-17.75">
      <DashboardHeader />
      <CustomersContentSkeleton />
    </main>
  );
}
