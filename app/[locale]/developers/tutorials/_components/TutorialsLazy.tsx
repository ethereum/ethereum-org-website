"use client"

import dynamic from "next/dynamic"

import { Skeleton, SkeletonCardContent } from "@/components/ui/skeleton"

const TutorialsList = dynamic(() => import("./tutorials"), {
  ssr: false,
  loading: () => (
    <div className="mt-8 w-full max-w-screen-lg">
      <div className="border-b border-border px-8 pb-6 pt-8">
        {/* Skill tabs + search skeleton */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={"skill" + index}
                className="h-8 w-24 rounded-full"
              />
            ))}
          </div>
          <Skeleton className="h-10 w-full rounded lg:w-44" />
        </div>
        {/* Tag pills skeleton */}
        <div className="mt-5 flex flex-wrap gap-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={"tag" + index} className="h-8 w-20 rounded-full" />
          ))}
        </div>
      </div>
      {Array.from({ length: 5 }).map((_, index) => (
        <SkeletonCardContent key={"card" + index} className="p-8" />
      ))}
    </div>
  ),
})

export default TutorialsList
