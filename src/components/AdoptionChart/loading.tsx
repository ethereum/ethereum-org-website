import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => (
  <div className="ms-8 grid w-full max-w-96 flex-[2] grid-cols-3 gap-x-4 gap-y-6">
    <div className="flex h-fit flex-1 flex-col self-end overflow-hidden rounded-4xl border">
      <Skeleton className="m-4" />
    </div>
    <div className="flex h-fit flex-1 flex-col self-end overflow-hidden rounded-4xl border [&>div]:border-b last:[&>div]:border-none">
      {Array.from({ length: 3 }).map((_, idx) => (
        <div key={"col2" + idx} className="border-b p-4 last:border-none">
          <Skeleton />
        </div>
      ))}
    </div>
    <div className="flex h-fit flex-1 flex-col self-end overflow-hidden rounded-4xl border">
      {Array.from({ length: 8 }).map((_, idx) => (
        <div key={"col3" + idx} className="border-b p-4 last:border-none">
          <Skeleton />
        </div>
      ))}
    </div>
    <Skeleton className="mx-6" />
    <Skeleton className="mx-6" />
    <Skeleton className="mx-6" />
  </div>
)

export default Loading
