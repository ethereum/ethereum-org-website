import { Spinner } from "@/components/ui/spinner"

const Loading = () => (
  <div className="absolute inset-0 grid animate-pulse-light place-items-center">
    <Spinner className="text-6xl text-accent-b" />
  </div>
)

export default Loading
