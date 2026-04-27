import { Skeleton } from "../ui/skeleton"

const NetworkRow = ({ idx }: { idx: number }) => (
  <div
    key={"network" + idx}
    className="flex w-full items-center gap-4 border-b p-4"
  >
    <Skeleton className="size-10 rounded-full" />
    <Skeleton className="h-6 w-40" />
    <div className="ms-auto hidden gap-6 lg:flex">
      <Skeleton className="h-6 w-20" />
      <Skeleton className="h-6 w-20" />
      <Skeleton className="h-6 w-28" />
      <Skeleton className="size-6" />
    </div>
    <Skeleton className="ms-auto size-6 lg:hidden" />
  </div>
)

const Loading = () => (
  <div className="px-4">
    <div className="flex flex-col gap-4 pt-4 pb-6 lg:flex-row lg:gap-6 2xl:px-0">
      <div className="hidden w-80 flex-col gap-2 lg:flex">
        <div className="flex items-center justify-between border-b px-2 py-1.5">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-24" />
        </div>
        {Array.from({ length: 2 }).map((_, setIdx) => (
          <div key={"set" + setIdx} className="flex flex-col border px-6 py-2">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={"set" + setIdx + "option" + idx}
                className="flex items-center gap-2 border-b px-2 py-4 last:border-none"
              >
                <Skeleton className="aspect-square size-4" />
                <Skeleton className="h-5 w-1/2" />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between border-b px-4 py-2">
          <Skeleton className="h-5 w-24 lg:hidden" />
          <Skeleton className="h-5 w-40" />
        </div>
        {Array.from({ length: 6 }).map((_, idx) => (
          <NetworkRow key={"network" + idx} idx={idx} />
        ))}
      </div>
    </div>
  </div>
)

export default Loading
