"use client"

import dynamic from "next/dynamic"

import { Section } from "@/components/ui/section"

const SectionSkeleton = ({ className }: { className?: string }) => (
  <Section className={className}>
    <div className="h-[400px] w-full animate-pulse rounded-2xl bg-background-highlight md:h-[500px]" />
  </Section>
)

export const KPISection = dynamic(
  () => import("@/components/Homepage/KPISection"),
  {
    ssr: false,
    loading: () => <SectionSkeleton className="py-12" />,
  }
)

export const SavingsCarousel = dynamic(
  () => import("@/components/Homepage/SavingsCarousel"),
  {
    ssr: false,
    loading: () => <SectionSkeleton className="py-12" />,
  }
)

export const SimulatorSection = dynamic(
  () => import("@/components/Homepage/SimulatorSection"),
  {
    ssr: false,
    loading: () => <SectionSkeleton className="py-12" />,
  }
)
