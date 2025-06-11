import { Skeleton } from "@/components/ui/skeleton"

const SwiperHangerLoading = () => (
  <div className="flex w-full gap-2">
    <Skeleton className="ms-4 h-80 w-[85vw] shrink-0 rounded-4xl" />
    <Skeleton className="h-full w-full rounded-e-none rounded-s-4xl" />
  </div>
)

export default SwiperHangerLoading
