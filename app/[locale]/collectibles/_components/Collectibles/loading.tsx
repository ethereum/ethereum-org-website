import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => (
  <div className="flex w-full flex-col gap-x-8 gap-y-6 xl:flex-row">
    <Skeleton className="h-80 w-full rounded-2xl xl:sticky xl:top-28 xl:max-w-xs" />
    <Skeleton className="h-[75vh] w-full rounded-2xl" />
  </div>
)

export default Loading
