import { Skeleton, SkeletonLines } from "@/components/ui/skeleton"

const Loading = () => (
  <div className="h-fit space-y-8 rounded border bg-background p-8">
    <SkeletonLines noOfLines={5} />
    <SkeletonLines noOfLines={5} />
    <Skeleton className="mx-auto h-5 w-40 rounded-full" />
  </div>
)

export default Loading
