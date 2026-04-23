import { Spinner } from "@/components/ui/spinner"

const Loading = () => (
  <div className="animate-pulse-light absolute inset-0 grid place-items-center">
    <Spinner className="text-accent-b text-6xl" />
  </div>
)

export default Loading
