import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => (
  <div className="flex flex-1 flex-col gap-8">
    {Array.from({ length: 3 }).map((_, idx) => (
      <div
        key={idx}
        className="w-full space-y-8 rounded-2xl border bg-background p-6"
      >
        <div className="flex items-center gap-2 py-1">
          <Skeleton className="size-8 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="w-40" />
            <Skeleton className="w-32" />
          </div>
        </div>
        <div className="space-y-1">
          <Skeleton className="" />
          <Skeleton className="" />
          <Skeleton className="w-1/4" />
        </div>
        <div className="space-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-5 w-28" />
      </div>
    ))}
  </div>
)

export default Loading
