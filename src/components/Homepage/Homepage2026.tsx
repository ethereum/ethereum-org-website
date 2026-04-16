import { Suspense } from "react"
import { pick } from "lodash"
import dynamic from "next/dynamic"
import { getMessages, getTranslations } from "next-intl/server"

import type { Lang } from "@/lib/types"

import HomeHero2026, { type CTAVariant } from "@/components/Hero/HomeHero2026"
import FeatureCards from "@/components/Homepage/FeatureCards"
import GetStartedGrid from "@/components/Homepage/GetStartedGrid"
import TrustLogos from "@/components/Homepage/TrustLogos"
import I18nProvider from "@/components/I18nProvider"
import MainArticle from "@/components/MainArticle"
import { TrackedSection } from "@/components/TrackedSection"
import { Section, SectionHeader, SectionTag } from "@/components/ui/section"

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
  accountHolders: number | null
  transactionsToday: number | null
  ctaVariant?: CTAVariant
}

const Homepage2026 = async ({
  locale,
  accountHolders,
  transactionsToday,
  ctaVariant = "modal",
}: Homepage2026Props) => {
  const { direction: dir } = getDirection(locale)
  const t = await getTranslations("page-index")
  const allMessages = await getMessages()
  const glossary = allMessages["glossary-tooltip"] as Record<string, string>
  const messages = {
    ...pick(allMessages, "page-index"),
    "glossary-tooltip": pick(glossary, [
      "nft-term",
      "nft-definition",
      "web3-term",
      "web3-definition",
    ]),
  }

  const eventCategory = `Homepage - ${locale}`

  return (
    <I18nProvider locale={locale} messages={messages}>
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
              <SavingsCarousel
                className="py-12"
                eventCategory={eventCategory}
              />
            </Suspense>
          </TrackedSection>

          <TrackedSection id="trust_logos" eventCategory={eventCategory}>
            <TrustLogos className="py-12" eventCategory={eventCategory} />
          </TrackedSection>

          <TrackedSection id="simulator" eventCategory={eventCategory}>
            <Suspense fallback={<SectionSkeleton className="py-12" />}>
              <SimulatorSection
                className="py-12"
                header={
                  <div className="flex flex-col items-center gap-4 text-center">
                    <SectionTag variant="plain">
                      {t("page-index-simulator-tag")}
                    </SectionTag>
                    <SectionHeader className="mb-0 mt-0 text-4xl leading-tight md:text-5xl lg:text-6xl">
                      {t("page-index-simulator-title")}
                    </SectionHeader>
                    <p className="text-lg text-body-medium md:text-xl">
                      {t("page-index-simulator-subtitle")}
                    </p>
                  </div>
                }
              />
            </Suspense>
          </TrackedSection>

          <TrackedSection id="feature_cards" eventCategory={eventCategory}>
            <FeatureCards eventCategory={eventCategory} />
          </TrackedSection>

          <TrackedSection id="get_started" eventCategory={eventCategory}>
            <GetStartedGrid eventCategory={eventCategory} />
          </TrackedSection>
        </div>
      </MainArticle>
    </I18nProvider>
  )
}

export default Homepage2026
