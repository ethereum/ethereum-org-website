import { Loader } from "@/components/ui/loader"

const Loading = () => (
  <div className="relative flex h-full min-h-[calc(100vh-4.75rem)] w-full flex-col items-center justify-center gap-[8vmin] pb-[20vmin]">
    <Loader className="size-[20vmin] opacity-20 [&_line]:delay-500 motion-safe:[&_line]:animate-quick-trace motion-safe:[&_path]:animate-write-on-off" />
    <div className="flex gap-[2vmin]">
      <div className="size-[2vmin] animate-fade-in-pause-out rounded bg-disabled opacity-0" />
      <div
        className="size-[2vmin] animate-fade-in-pause-out rounded bg-disabled opacity-0"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="size-[2vmin] animate-fade-in-pause-out rounded bg-disabled opacity-0"
        style={{ animationDelay: "2s" }}
      />
    </div>
  </div>
)

export default Loading
