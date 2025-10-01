import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => (
  <div className="my-16 w-full space-y-12">
    <div className="grid w-full grid-cols-5 place-items-end sm:grid-cols-6 md:grid-cols-10">
      <div className="flex flex-col items-center space-y-4">
        <Skeleton className="h-60 w-9" />
        <Skeleton className="h-8 w-9" />
      </div>
      <div className="flex flex-col items-center space-y-4">
        <Skeleton className="h-40 w-9" />
        <Skeleton className="h-8 w-9" />
      </div>
      <div className="flex flex-col items-center space-y-4">
        <Skeleton className="h-20 w-9" />
        <Skeleton className="h-8 w-9" />
      </div>
      <div className="flex flex-col items-center space-y-4">
        <Skeleton className="h-10 w-9" />
        <Skeleton className="h-8 w-9" />
      </div>
      <div className="flex flex-col items-center space-y-4 max-sm:hidden">
        <Skeleton className="h-6 w-9" />
        <Skeleton className="h-8 w-9" />
      </div>
      {Array.from({ length: 4 }).map((_, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center space-y-4 max-md:hidden"
        >
          <Skeleton className="h-3 w-9" />
          <Skeleton className="h-8 w-9" />
        </div>
      ))}
      <div className="flex flex-col items-center space-y-4">
        <Skeleton className="h-1 w-9" />
        <Skeleton className="h-8 w-9" />
      </div>
    </div>
    <Skeleton className="mx-auto w-80" />
  </div>
)

export default Loading
