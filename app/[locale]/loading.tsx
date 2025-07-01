import { Loader } from "@/components/ui/loader"
import { Spinner } from "@/components/ui/spinner"

const Loading = () => (
  <div className="grid w-full animate-pulse place-items-center py-16">
    <div className="relative grid place-items-center">
      <Spinner className="text-[30vmin] opacity-15 [&_svg]:stroke-1" />
      <Loader className="absolute inset-auto size-[20vmin] opacity-30 motion-safe:[&_line]:animate-quick-trace" />
    </div>
  </div>
)

export default Loading
