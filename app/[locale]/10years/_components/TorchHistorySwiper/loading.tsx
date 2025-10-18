import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => (
  <div className="flex w-full flex-col items-center gap-6">
    <div className="flex w-full items-center justify-center gap-12">
      <Skeleton className="h-[400px] w-[240px] rounded-4xl" />
      <Skeleton className="h-[400px] w-[240px] rounded-4xl max-sm:hidden" />
      <Skeleton className="h-[400px] w-[240px] rounded-4xl max-md:hidden" />
    </div>
    <Skeleton className="h-6 w-40 rounded-full" />
  </div>
)

export default Loading
