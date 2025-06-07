import { Skeleton, SkeletonCardGrid } from "@/components/ui/skeleton"

const RecentPostsSwiperFallback = () => (
  <div className="flex flex-col items-center gap-4">
    <SkeletonCardGrid className="mt-4 w-full md:mt-16" />
    <Skeleton className="h-4 w-20 rounded-full" />
  </div>
)

RecentPostsSwiperFallback.displayName = "RecentPostsSwiperFallback"

export default RecentPostsSwiperFallback
