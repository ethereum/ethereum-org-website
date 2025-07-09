import { Card } from "@/components/ui/card"
import { Skeleton, SkeletonLines } from "@/components/ui/skeleton"

const Loading = () => (
  <Card className="ms-4 w-[85vw] rounded-4xl border bg-background px-2 py-6">
    <Skeleton className="mx-4 mb-6 size-16 rounded-xl" />
    <Skeleton className="mx-4 -mb-2 h-5 w-[85%]" />
    <SkeletonLines noOfLines={7} />
  </Card>
)

export default Loading
