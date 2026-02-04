import { Spinner } from "@/components/atoms/spinner"
import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => (
  <div className="relative flex h-10.5 w-full items-center overflow-hidden rounded-lg lg:w-56">
    <Skeleton className="absolute size-full" />
    <Spinner className="ms-2 animate-pulse-light text-2xl" />
  </div>
)

export default Loading
