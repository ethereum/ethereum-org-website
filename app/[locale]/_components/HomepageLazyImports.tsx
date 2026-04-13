"use client"

import dynamic from "next/dynamic"

import ValuesMarqueeFallback from "@/components/Homepage/ValuesMarquee/Fallback"
import { Skeleton, SkeletonCardGrid } from "@/components/ui/skeleton"

export const BentoCardSwiper = dynamic(
  () => import("@/components/Homepage/BentoCardSwiper"),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col items-center gap-4">
        <Skeleton className="border-primary/10 bg-background from-primary/10 to-primary/5 shadow-card-hover dark:from-primary/20 dark:to-primary/10 mx-auto mt-4 h-[476px] w-[512px] max-w-128 rounded-2xl bg-linear-to-b from-20% to-60% p-4 opacity-50 lg:hidden" />
        <Skeleton className="h-6 w-[12rem] rounded-full" />
      </div>
    ),
  }
)

export const RecentPostsSwiper = dynamic(
  () => import("@/components/Homepage/RecentPostsSwiper"),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col items-center gap-4">
        <SkeletonCardGrid className="mt-4 w-full md:mt-16" />
        <Skeleton className="h-4 w-20 rounded-full" />
      </div>
    ),
  }
)

export const ValuesMarquee = dynamic(
  () => import("@/components/Homepage/ValuesMarquee"),
  {
    ssr: false,
    loading: () => <ValuesMarqueeFallback />,
  }
)

export const CodeExamples = dynamic(
  () => import("@/components/Homepage/CodeExamples"),
  {
    ssr: false,
    loading: () => (
      <div className="py-8 md:pt-8 md:pb-16 lg:pt-16 lg:pb-32">
        <Skeleton className="h-[400px] w-full max-w-screen-md rounded-2xl" />
      </div>
    ),
  }
)

export const AppsHighlight = dynamic(
  () => import("../apps/_components/AppsHighlight"),
  {
    ssr: false,
    loading: () => (
      <div className="hidden gap-6 md:grid md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-64 w-full rounded-xl" />
        ))}
      </div>
    ),
  }
)
