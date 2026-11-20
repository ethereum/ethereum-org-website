"use client"

import dynamic from "next/dynamic"

import { Section } from "@/components/ui/section"

const Skeleton = ({
  heightClass,
  className,
}: {
  heightClass: string
  className?: string
}) => (
  <Section className={className}>
    <div
      data-slot="loading"
      className={`w-full animate-pulse rounded-base bg-background-highlight ${heightClass}`}
    />
  </Section>
)

export const KPISection = dynamic(
  () => import("@/components/Homepage/KPISection"),
  {
    loading: () => (
      <Skeleton heightClass="h-[500px] lg:h-[280px]" className="py-12" />
    ),
  }
)

// SavingsCarousel is deliberately NOT lazy-loaded from here: it is editorial
// content whose CTAs are internal links, so it has to reach crawlers that don't
// execute JS. dynamic() alone isn't enough -- it wraps the component in
// Suspense, so the server streams the fallback inline and the real markup into
// a <div hidden> that only a script swaps in. page.tsx imports it directly.

export const SimulatorSection = dynamic(
  () => import("@/components/Homepage/SimulatorSection"),
  {
    ssr: false,
    loading: () => (
      <Skeleton heightClass="h-[900px] md:h-[1050px]" className="py-12" />
    ),
  }
)
