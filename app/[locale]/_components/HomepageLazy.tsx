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

export const SavingsCarousel = dynamic(
  () => import("@/components/Homepage/SavingsCarousel"),
  {
    ssr: false,
    loading: () => (
      <Skeleton heightClass="h-[1000px] md:h-[700px]" className="py-12" />
    ),
  }
)

export const SimulatorSection = dynamic(
  () => import("@/components/Homepage/SimulatorSection"),
  {
    ssr: false,
    loading: () => (
      <Skeleton heightClass="h-[900px] md:h-[1050px]" className="py-12" />
    ),
  }
)
