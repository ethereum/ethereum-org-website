import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => (
  <div className="w-full max-w-[440px] space-y-6">
    <Skeleton className="h-[42px] w-full" />
    <Skeleton className="h-[200px] w-full" />
  </div>
)

export default Loading
