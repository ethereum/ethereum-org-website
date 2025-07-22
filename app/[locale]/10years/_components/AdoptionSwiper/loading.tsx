import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => (
  <div className="flex w-full flex-col items-center gap-6 md:hidden">
    <div className="flex w-full max-w-[550px] flex-col gap-6 rounded-2xl bg-card-gradient-secondary p-4 sm:p-6 xl:max-w-[700px]">
      <Skeleton className="mx-auto size-36 rounded-4xl" />
      <Skeleton className="h-8 w-1/2" />
      <div className="space-y-1">
        <Skeleton className="h-5 w-[95%]" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-1/2" />
      </div>
      <div className="w-2/5 rounded border px-4 py-3">
        <Skeleton className="h-5" />
      </div>
    </div>
    <Skeleton className="h-6 w-40 rounded-full" />
  </div>
)

export default Loading
