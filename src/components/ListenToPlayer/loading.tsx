import { Skeleton } from "../ui/skeleton"
import { Spinner } from "../ui/spinner"

const Loading = () => (
  <div className="relative flex h-10.5 w-full items-center overflow-hidden rounded-lg lg:w-56">
    <Skeleton className="absolute size-full" />
    <Spinner className="animate-pulse-light ms-2 text-2xl" />
  </div>
)

export default Loading
