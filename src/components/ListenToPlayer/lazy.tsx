import dynamic from "next/dynamic"

import { Skeleton } from "../ui/skeleton"

const LazyListenToPlayer = dynamic(() => import("."), {
  ssr: false,
  loading: () => <Skeleton className="h-10.5 w-56" />,
})

export default LazyListenToPlayer
