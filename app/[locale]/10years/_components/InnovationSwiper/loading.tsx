import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => (
  <div className="flex w-full flex-col items-center gap-6">
    <div className="flex w-full max-w-[550px] flex-col gap-6 rounded-lg bg-card-gradient-secondary p-4 sm:p-6 xl:max-w-[700px]">
      <Skeleton className="mx-auto size-48 rounded-4xl" />
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-5 w-1/4" />
      <div className="space-y-1">
        <Skeleton className="h-5 w-[85%] md:hidden" />
        <Skeleton className="h-5 w-[95%]" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-[90%]" />
        <Skeleton className="h-5 w-1/2" />
      </div>
      <div className="space-y-1">
        <Skeleton className="h-5 w-[92%] md:hidden" />
        <Skeleton className="h-5 w-[90%]" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-[95%]" />
        <Skeleton className="h-5 w-1/3" />
      </div>
    </div>
    <Skeleton className="h-6 w-40 rounded-full" />
  </div>
)

export default Loading
