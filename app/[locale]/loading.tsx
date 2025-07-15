import { Loader, LoadingDots } from "@/components/ui/loader"

const Loading = () => (
  <div className="relative flex h-full min-h-[calc(100vh-4.75rem)] w-full flex-col items-center justify-center gap-[8vmin] pb-[20vmin]">
    <Loader className="size-[20vmin] opacity-20 [&_line]:delay-500 motion-safe:[&_line]:animate-quick-trace motion-safe:[&_path]:animate-write-on-off" />
    <LoadingDots className="gap-[2vmin] [&_[data-label='dot']]:size-[2vmin]" />
  </div>
)

export default Loading
