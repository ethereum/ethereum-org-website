import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => (
  <div className="flex w-full flex-col gap-x-8 gap-y-6 xl:flex-row">
    <Skeleton className="h-64 w-full max-w-screen-sm rounded-2xl" />
    <Skeleton className="h-64 w-full rounded-2xl" />
  </div>
)

export default Loading
