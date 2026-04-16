import { Suspense } from "react"
import { pick } from "lodash"
import dynamic from "next/dynamic"
import { notFound } from "next/navigation"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { PageParams } from "@/lib/types"

import HomeHero2026 from "@/components/Hero/HomeHero2026"
import FeatureCards from "@/components/Homepage/FeatureCards"
import GetStartedGrid from "@/components/Homepage/GetStartedGrid"
import TrustLogos from "@/components/Homepage/TrustLogos"
import I18nProvider from "@/components/I18nProvider"
import MainArticle from "@/components/MainArticle"
import { TrackedSection } from "@/components/TrackedSection"
import { Section, SectionHeader, SectionTag } from "@/components/ui/section"

import { getDirection } from "@/lib/utils/direction"
import { getMetadata } from "@/lib/utils/metadata"

import { DEFAULT_LOCALE, LOCALES_CODES } from "@/lib/constants"

import IndexPageJsonLD from "./page-jsonld"

import { getAccountHolders, getGrowThePieData } from "@/lib/data"

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

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

  if (!LOCALES_CODES.includes(locale)) return notFound()

  setRequestLocale(locale)

  const [accountHoldersData, growThePieData] = await Promise.all([
    getAccountHolders(),
    getGrowThePieData(),
  ])

  if (!accountHoldersData) {
    throw new Error("Failed to fetch account holders data")
  }
  if (!growThePieData) {
    throw new Error("Failed to fetch GrowThePie data")
  }

  const accountHolders =
    "value" in accountHoldersData ? accountHoldersData.value : null

  const transactionsToday =
    "value" in growThePieData.txCount ? growThePieData.txCount.value : null

  const { direction: dir } = getDirection(locale)
  const t = await getTranslations("page-index")
  const allMessages = await getMessages()
  const glossary = allMessages["glossary-tooltip"] as Record<string, string>
  const messages = {
    ...pick(allMessages, "page-index", "simulator"),
    "glossary-tooltip": pick(glossary, [
      "nft-term",
      "nft-definition",
      "web3-term",
      "web3-definition",
    ]),
  }

  const eventCategory = `Homepage - ${locale}`

  return (
    <>
      <IndexPageJsonLD locale={locale} />
      <I18nProvider locale={locale} messages={messages}>
        <MainArticle className="flex w-full flex-col items-center" dir={dir}>
          <HomeHero2026 eventCategory={eventCategory} />

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
    </>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const params = await props.params
  const { locale } = params

  try {
    const t = await getTranslations("page-index")
    return await getMetadata({
      locale,
      slug: [""],
      title: t("page-index-meta-title"),
      description: t("page-index-meta-description"),
    })
  } catch (error) {
    const t = await getTranslations({
      locale: DEFAULT_LOCALE,
      namespace: "common",
    })

    // Return basic metadata for invalid paths
    return {
      title: t("page-not-found"),
      description: t("page-not-found-description"),
    }
  }
}

export default Page
