export function CustomersTableSkeleton() {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-225 animate-pulse">
        <div className="grid grid-cols-[1.3fr_0.7fr_1fr_1.4fr_0.9fr_0.7fr] gap-4 border-b border-[#EEEEEE] py-4">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className="h-3 w-24 rounded bg-[#F0F1F5]"
            />
          ))}
        </div>
        {Array.from({ length: 8 }, (_, rowIndex) => (
          <div
            key={rowIndex}
            className="grid grid-cols-[1.3fr_0.7fr_1fr_1.4fr_0.9fr_0.7fr] gap-4 border-b border-[#EEEEEE] py-4 last:border-b-0"
          >
            {Array.from({ length: 6 }, (_, cellIndex) => (
              <div
                key={cellIndex}
                className="h-4 rounded bg-[#F0F1F5]"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
