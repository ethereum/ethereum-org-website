import { Skeleton, SkeletonLines } from "../ui/skeleton"

const WalletSkeleton = () => (
  <>
    {Array.from({ length: 3 }).map((_, idx) => (
      <div key={"wallet" + idx} className="flex w-full gap-4 border-b p-4">
        <Skeleton className="size-16" />

        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-7 w-full max-w-32" />
          <div className="flex gap-1">
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
          <SkeletonLines noOfLines={4} className="pt-4" />
          <div className="h-12 max-w-28 rounded border px-2 py-1.5">
            <Skeleton className="h-full" />
          </div>
        </div>
        <div className="flex items-center">
          <Skeleton className="size-6" />
        </div>
      </div>
    ))}
  </>
)

const Loading = () => (
  <div className="flex flex-col gap-16 px-4 lg:gap-20">
    <div className="flex max-w-full gap-4 overflow-x-scroll lg:grid lg:grid-cols-5">
      {Array.from({ length: 5 }).map((_, idx) => (
        <Skeleton
          key={"personas" + idx}
          className="h-40 min-w-48 rounded-2xl shadow-svg-button-link xl:h-32"
        />
      ))}
    </div>
    <div className="flex flex-[3] flex-col gap-2 lg:hidden">
      <div className="flex max-w-40 gap-2">
        <div className="flex flex-1 flex-col gap-1">
          <Skeleton className="w-full max-w-32" />
          <Skeleton className="w-full max-w-24" />
        </div>
        <Skeleton className="size-8" />
      </div>
      <WalletSkeleton />
    </div>
    <div className="flex gap-6 max-lg:hidden">
      <div className="flex max-w-80 flex-1 flex-col gap-2">
        <div className="flex h-10 items-center justify-between px-6 py-1.5">
          <Skeleton className="w-1/3" />
          <div className="flex w-1/3 gap-1">
            <Skeleton className="aspect-square" />
            <Skeleton className="w-full" />
          </div>
        </div>
        {Array.from({ length: 3 }).map((_, setIdx) => (
          <div
            key={"set" + setIdx}
            className="flex w-full flex-col border px-6 py-2"
          >
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={"set" + setIdx + "option" + idx}
                className="flex gap-2 border-b px-2 py-6 last:border-none"
              >
                <Skeleton className="aspect-square" />
                <Skeleton className="w-1/3" />
                <Skeleton className="ms-auto aspect-[2]" />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex gap-2">
          <Skeleton className="w-full max-w-32" />
          <Skeleton className="w-8" />
        </div>
        <WalletSkeleton />
      </div>
    </div>
  </div>
)

export default Loading
