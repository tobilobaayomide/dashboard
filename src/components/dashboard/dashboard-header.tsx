import { Search } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between gap-4">
      <div>
        <p className="text-xl font-medium text-[#292D32] sm:text-2xl">
          Hello Evano
          <span aria-hidden="true"> 👋🏼,</span>
        </p>
      </div>

      <div className="hidden h-10 w-54 items-center gap-2 rounded-xl bg-white px-3 shadow-[0_8px_24px_rgba(0,0,0,0.03)] sm:flex">
        <Search
          aria-hidden="true"
          className="size-5 text-[#7E7E7E]"
        />

        <span className="text-xs text-[#B5B7C0]">
          Search
        </span>
      </div>
    </header>
  );
}
