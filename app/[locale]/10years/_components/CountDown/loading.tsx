import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => (
  <div className="flex items-center justify-center gap-10">
    {Array.from({ length: 4 }).map((_, idx) => (
      <div
        key={idx}
        className="flex size-20 flex-col items-center justify-center gap-1 rounded-2xl border p-2 text-center shadow-md last:max-lg:hidden"
      >
        <Skeleton className="size-full" />
        <Skeleton className="h-5 w-8" />
      </div>
    ))}
  </div>
)

export default Loading
