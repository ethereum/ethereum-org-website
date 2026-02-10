import { Suspense } from "react"
import dynamic from "next/dynamic"

import type { Lang } from "@/lib/types"

import HomeHero2026 from "@/components/Hero/HomeHero2026"
import FeatureCards from "@/components/Homepage/FeatureCards"
import GetStartedGrid from "@/components/Homepage/GetStartedGrid"
import { SimulatorI18nWrapper } from "@/components/Homepage/SimulatorSection/SimulatorI18nWrapper"
import TrustLogos from "@/components/Homepage/TrustLogos"
import MainArticle from "@/components/MainArticle"
import { Section } from "@/components/ui/section"

import { getDirection } from "@/lib/utils/direction"

// Heavy client components loaded dynamically for better code splitting
const KPISection = dynamic(() => import("@/components/Homepage/KPISection"))
const SavingsCarousel = dynamic(
  () => import("@/components/Homepage/SavingsCarousel")
)
const SimulatorSection = dynamic(
  () => import("@/components/Homepage/SimulatorSection")
)

const SectionSkeleton = ({ className }: { className?: string }) => (
  <Section className={className}>
    <div className="h-[400px] w-full animate-pulse rounded-2xl bg-background-highlight md:h-[500px]" />
  </Section>
)

type Homepage2026Props = {
  locale: Lang
  accountHolders: number
  transactionsToday: number
}

const Homepage2026 = ({
  locale,
  accountHolders,
  transactionsToday,
}: Homepage2026Props) => {
  const { direction: dir } = getDirection(locale)

  return (
    <MainArticle className="flex w-full flex-col items-center" dir={dir}>
      <HomeHero2026 />

      <div className="my-24 w-full space-y-24 px-4 md:mx-6 lg:my-32 lg:space-y-32">
        <Suspense fallback={<SectionSkeleton className="py-12" />}>
          <KPISection
            accountHolders={accountHolders}
            transactionsToday={transactionsToday}
            className="py-12"
          />
        </Suspense>

        <Suspense fallback={<SectionSkeleton className="py-12" />}>
          <SavingsCarousel className="py-12" />
        </Suspense>

        <TrustLogos className="py-12" />

        <FeatureCards />

        <Suspense fallback={<SectionSkeleton className="py-12" />}>
          <SimulatorI18nWrapper>
            <SimulatorSection className="py-12" />
          </SimulatorI18nWrapper>
        </Suspense>

        <GetStartedGrid />
      </div>
    </MainArticle>
  )
}

export default Homepage2026
