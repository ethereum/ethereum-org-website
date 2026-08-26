import { pick } from "lodash"
import Image from "next/image"
import { notFound } from "next/navigation"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { PageParams } from "@/lib/types"

import DevconDateLocation from "@/components/DevconIndia/date-location"
import DevconIndiaLargeCallout from "@/components/DevconIndia/large-callout"
import HomeHero from "@/components/Hero/HomeHero"
import FeatureCards from "@/components/Homepage/FeatureCards"
import GetStartedGrid from "@/components/Homepage/GetStartedGrid"
import LatestUpdates from "@/components/Homepage/LatestUpdates"
import SavingsCarousel from "@/components/Homepage/SavingsCarousel"
import TrustLogos from "@/components/Homepage/TrustLogos"
import I18nProvider from "@/components/I18nProvider"
import MainArticle from "@/components/MainArticle"
import { Alert } from "@/components/ui/alert"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { LinkWithArrow } from "@/components/ui/Link"
import { LinkBox, LinkOverlay } from "@/components/ui/link-box"
import { SectionHeader, SectionTag } from "@/components/ui/section"

import { getDirection } from "@/lib/utils/direction"
import { getMetadata } from "@/lib/utils/metadata"

import {
  DEFAULT_LOCALE,
  DEVCON_INDIA_TICKET_URL,
  LOCALES_CODES,
} from "@/lib/constants"

import { KPISection, SimulatorSection } from "./_components/HomepageLazy"
import IndexPageJsonLD from "./page-jsonld"

import { getAccountHolders, getGrowThePieData } from "@/lib/data"

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
  const tDevcon = await getTranslations("component-devcon-banner")
  const allMessages = await getMessages()
  const glossary = allMessages["glossary-tooltip"] as Record<string, string>
  const messages = {
    ...pick(
      allMessages,
      "page-index",
      "component-swiper",
      "component-wallet-simulator"
    ),
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
        {/* Devon VIII India alert banner */}
        <LinkBox asChild>
          <Alert
            variant="banner"
            // Devcon colors: keep hex colors
            className="relative grid grid-cols-[1fr_auto_1fr] gap-x-8 overflow-hidden bg-linear-to-b from-[#1A0D33] to-[#45326C] py-3 transition-[--tw-gradient-to-position] duration-300 hover:to-80% max-md:px-4! max-sm:px-8 **:[img]:transition-transform **:[img]:duration-500 hover:**:[img]:scale-105"
          >
            <div className="absolute inset-x-0 grid place-items-center">
              <Image
                src="/images/assets/svgs/devcon-india-glyph.svg"
                alt=""
                width="93"
                height="157"
                className="pointer-events-none opacity-10"
              />
            </div>

            <div className="flex items-center justify-start gap-x-8">
              <Image
                src="/images/assets/svgs/devcon-india-logo.svg"
                alt={tDevcon("logo-alt")}
                width="139"
                height="60"
                className="h-9.5 w-22 shrink-0"
              />
              <DevconDateLocation
                longMonthBreakpoint="xl"
                className="text-sm max-md:hidden"
              />
            </div>

            <div className="grid place-items-center text-xs font-black sm:text-sm md:text-md lg:text-xl">
              {tDevcon("headline")}
            </div>

            <div className="flex justify-end">
              {/* Overlay stretches the CTA's hit area across the whole banner */}
              <LinkOverlay asChild>
                <ButtonLink
                  href={DEVCON_INDIA_TICKET_URL}
                  customEventOptions={{
                    eventCategory: "devcon",
                    eventAction: `get_tickets`,
                    eventName: "visit",
                  }}
                  hideArrow
                  className="min-h-0 rounded-full py-1 font-bold text-nowrap max-md:text-xs lg:text-lg"
                >
                  {tDevcon("cta-get-tickets")}
                </ButtonLink>
              </LinkOverlay>
            </div>
          </Alert>
        </LinkBox>

        <MainArticle className="flex w-full flex-col items-center" dir={dir}>
          <HomeHero eventCategory={eventCategory} />

          <div className="my-24 w-full space-y-24 px-4 md:mx-6 lg:my-32 lg:space-y-32">
            <KPISection
              accountHolders={accountHolders}
              transactionsToday={transactionsToday}
              className="py-12"
            />

            <SavingsCarousel className="py-12" eventCategory={eventCategory} />

            <TrustLogos className="py-12" eventCategory={eventCategory} />

            <SimulatorSection
              className="py-12"
              header={
                <div className="flex flex-col items-center gap-4 text-center">
                  <SectionTag variant="plain">
                    {t("page-index-simulator-tag")}
                  </SectionTag>
                  <SectionHeader className="mt-0 mb-0 leading-tight lg:text-6xl">
                    {t("page-index-simulator-title")}
                  </SectionHeader>
                  <p className="text-lg text-body-medium md:text-xl">
                    {t("page-index-simulator-subtitle")}
                  </p>
                </div>
              }
              footer={
                <LinkWithArrow
                  href="/guides/"
                  customEventOptions={{
                    eventCategory,
                    eventAction: "section_click",
                    eventName: "simulator/explore_guides",
                  }}
                >
                  {t("page-index-simulator-cta")}
                </LinkWithArrow>
              }
            />

            <FeatureCards eventCategory={eventCategory} />

            {/* Devcon VIII India callout banner */}
            <DevconIndiaLargeCallout />

            <LatestUpdates eventCategory={eventCategory} />

            <GetStartedGrid eventCategory={eventCategory} />
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

  setRequestLocale(locale)

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
