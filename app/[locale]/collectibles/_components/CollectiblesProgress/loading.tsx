import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => (
  <div className="mt-4 w-full">
    <div className="mb-1 flex justify-between">
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-3 w-8" />
    </div>
    <Skeleton className="h-2.5 w-full" />
    <div className="mt-2 flex justify-center">
      <Skeleton className="h-3 w-24" />
    </div>
  </div>
)

export default Loading
