import { Suspense } from "react"
import dynamic from "next/dynamic"

import type { Lang } from "@/lib/types"

import HomeHero2026, { type CTAVariant } from "@/components/Hero/HomeHero2026"
import FeatureCards from "@/components/Homepage/FeatureCards"
import GetStartedGrid from "@/components/Homepage/GetStartedGrid"
import { SimulatorI18nWrapper } from "@/components/Homepage/SimulatorSection/SimulatorI18nWrapper"
import TrustLogos from "@/components/Homepage/TrustLogos"
import MainArticle from "@/components/MainArticle"
import { TrackedSection } from "@/components/TrackedSection"
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
  ctaVariant?: CTAVariant
}

const Homepage2026 = ({
  locale,
  accountHolders,
  transactionsToday,
  ctaVariant = "modal",
}: Homepage2026Props) => {
  const { direction: dir } = getDirection(locale)

  const eventCategory = `Homepage - ${locale}`

  return (
    <MainArticle className="flex w-full flex-col items-center" dir={dir}>
      <HomeHero2026 ctaVariant={ctaVariant} eventCategory={eventCategory} />

      <div className="my-24 w-full space-y-24 px-4 md:mx-6 lg:my-32 lg:space-y-32">
        <TrackedSection id="kpi" eventCategory={eventCategory}>
          <Suspense fallback={<SectionSkeleton className="py-12" />}>
            <KPISection
              accountHolders={accountHolders}
              transactionsToday={transactionsToday}
              className="py-12"
            />
          </Suspense>
        </TrackedSection>

        <TrackedSection id="savings_carousel" eventCategory={eventCategory}>
          <Suspense fallback={<SectionSkeleton className="py-12" />}>
            <SavingsCarousel className="py-12" eventCategory={eventCategory} />
          </Suspense>
        </TrackedSection>

        <TrackedSection id="trust_logos" eventCategory={eventCategory}>
          <TrustLogos className="py-12" eventCategory={eventCategory} />
        </TrackedSection>

        <TrackedSection id="feature_cards" eventCategory={eventCategory}>
          <FeatureCards eventCategory={eventCategory} />
        </TrackedSection>

        <TrackedSection id="simulator" eventCategory={eventCategory}>
          <Suspense fallback={<SectionSkeleton className="py-12" />}>
            <SimulatorI18nWrapper>
              <SimulatorSection
                className="py-12"
                eventCategory={eventCategory}
              />
            </SimulatorI18nWrapper>
          </Suspense>
        </TrackedSection>

        <TrackedSection id="get_started" eventCategory={eventCategory}>
          <GetStartedGrid eventCategory={eventCategory} />
        </TrackedSection>
      </div>
    </MainArticle>
  )
}

export default Homepage2026
