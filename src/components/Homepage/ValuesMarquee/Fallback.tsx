import { Fragment } from "react"

import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"

const ValuesMarqueeFallback = () => (
  <div className="mt-19 max-2xl:-mx-4 2xl:rounded-2xl">
    <Skeleton className="relative h-fit bg-blue-50 dark:bg-blue-600">
      <div className="flex h-fit max-w-full items-center gap-10 overflow-x-hidden py-8">
        {Array.from({ length: 10 }).map((_, i) => (
          <Fragment key={i}>
            <Skeleton className="h-8 w-32 shrink-0 translate-x-12 rounded-full" />
            <Skeleton className="size-1.5 shrink-0 translate-x-12 rounded-full" />
          </Fragment>
        ))}
      </div>
    </Skeleton>
    <Skeleton className="relative h-fit bg-gray-100 dark:bg-gray-900">
      <div className="flex h-fit max-w-full items-center gap-10 overflow-x-hidden py-8">
        {Array.from({ length: 10 }).map((_, i) => (
          <Fragment key={i}>
            <Skeleton className="h-8 w-32 shrink-0 rounded-full" />
            <Skeleton className="size-1.5 shrink-0 rounded-full" />
          </Fragment>
        ))}
      </div>

      <Spinner className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 text-4xl" />
    </Skeleton>
  </div>
)

ValuesMarqueeFallback.displayName = "ValuesMarqueeFallback"

export default ValuesMarqueeFallback
