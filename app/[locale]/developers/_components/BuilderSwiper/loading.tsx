import { Card } from "@/components/ui/card"
import { Skeleton, SkeletonLines } from "@/components/ui/skeleton"

const Loading = () => (
  <Card className="relative ms-8 w-[85vw] space-y-4 rounded-4xl border bg-background px-6 py-6">
    <Skeleton data-label="banner" className="mb-6 h-44 w-full rounded-xl" />
    <Skeleton data-label="tag" className="h-5 w-19" />
    <Skeleton data-label="title" className="-mb-2 h-5 w-1/2" />
    <SkeletonLines data-label="description" noOfLines={2} className="m-0 p-0" />
    <Skeleton data-label="button" className="h-10 w-1/4" />
  </Card>
)

export default Loading
