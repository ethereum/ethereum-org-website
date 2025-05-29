import pick from "lodash.pick"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { Lang } from "@/lib/types"

import Emoji from "@/components/Emoji"
import I18nProvider from "@/components/I18nProvider"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { LinkBox, LinkOverlay } from "@/components/ui/link-box"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { cn } from "@/lib/utils/cn"
import { dataLoader } from "@/lib/utils/data/dataLoader"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { BASE_TIME_UNIT } from "@/lib/constants"

import AdoptionSwiper from "./_components/AdoptionSwiper"
import CountDown from "./_components/CountDown"
import { adoptionCards, adoptionStyles } from "./_components/data"
import InnovationSwiper from "./_components/InnovationSwiper"
import Stories from "./_components/Stories"
import TenYearGlobe from "./_components/TenYearGlobe"
import TenYearHero from "./_components/TenYearHero"

import { fetch10YearEvents } from "@/lib/api/fetch10YearEvents"
import { fetch10YearStories } from "@/lib/api/fetch10YearStories"
import TenYearLogo from "@/public/images/10-year-anniversary/10year-logo.png"

// In seconds
const REVALIDATE_TIME = BASE_TIME_UNIT * 1

const loadData = dataLoader(
  [
    ["fetched10YearEvents", fetch10YearEvents],
    ["fetched10YearStories", fetch10YearStories],
  ],
  REVALIDATE_TIME * 1000
)

const Page = async ({ params }: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await params

  setRequestLocale(locale)

  const [fetched10YearEvents, fetched10YearStories] = await loadData()

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage(
    "/10-year-anniversary"
  )
  const messages = pick(allMessages, requiredNamespaces)

  return (
    <I18nProvider locale={locale} messages={messages}>
      <MainArticle className="mx-auto flex w-full flex-col items-center">
        <TenYearHero />

        <div className="mt-16 flex w-full flex-col gap-16 px-8 py-8 md:flex-row">
          <div className="flex flex-1 flex-col gap-5">
            <div>
              <h1 className="text-4xl font-bold">
                A decade of Transforming the World
              </h1>
              <p className="text-2xl font-bold">One block at a time</p>
            </div>
            <div className="flex flex-1 flex-col gap-4">
              <p className="text-lg">
                On July 30, 2015, at 3:44 p.m. UTC, the first block of the
                Ethereum blockchain came to life. The moment—when the Genesis
                block was mined—marked the beginning of a revolutionary journey
                that would forever change how the world thinks about the
                internet, finance, and digital ownership.
              </p>
              <p className="text-lg">Ten years down, infinity to go! 🚀</p>
            </div>
          </div>
          <div className="flex flex-1 flex-row items-center justify-center">
            <CountDown />
          </div>
        </div>

        <div className="w-full px-8 py-8">
          <div className="flex min-h-[500px] flex-col items-center gap-4 rounded-4xl bg-radial-a px-8 pt-8 lg:px-14 lg:pt-14">
            <div className="flex max-w-[770px] flex-col gap-4 text-center">
              <h2 className="text-4xl font-black">Join the party</h2>
              <p className="text-md">
                Join the worldwide celebration of 10 Years of Ethereum. Find an
                event near you or host your own!
              </p>
            </div>
            <div>
              <TenYearGlobe
                events={Object.values(fetched10YearEvents).flatMap((region) =>
                  region.events.map((event) => ({
                    ...event,
                    lat: Number(event.lat),
                    lng: Number(event.lng),
                  }))
                )}
              />
            </div>
          </div>
        </div>

        <div className="w-full px-8 pb-8">
          <div className="w-full">
            <Tabs
              defaultValue={Object.keys(fetched10YearEvents)[0]}
              className="w-full"
            >
              <TabsList className="w-full flex-nowrap justify-start overflow-x-auto overflow-y-hidden rounded-none border-b-2 border-b-primary p-0">
                {Object.entries(fetched10YearEvents).map(([key, data]) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="whitespace-nowrap border-0 text-primary"
                  >
                    {data.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {Object.entries(fetched10YearEvents).map(([key, data]) => {
                const events = data.events.sort((a, b) =>
                  a.country.localeCompare(b.country)
                )
                const eventsByCountry = events.reduce(
                  (acc, event) => {
                    if (!acc[event.country]) {
                      acc[event.country] = []
                    }
                    acc[event.country].push(event)
                    return acc
                  },
                  {} as Record<string, typeof events>
                )

                return (
                  <TabsContent
                    key={key}
                    value={key}
                    className="w-full border-none px-0 py-0"
                  >
                    <div className="flex flex-col">
                      {Object.entries(eventsByCountry).map(
                        ([country, countryEvents]) => (
                          <div
                            key={country}
                            className={cn("flex flex-col border-b px-4 py-6")}
                          >
                            <h3 className="mb-2 flex items-center gap-2 text-2xl font-bold text-body-medium">
                              <span className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-primary-low-contrast">
                                <Emoji
                                  text={countryEvents[0].countryFlag}
                                  className="scale-[1.75]"
                                />
                              </span>
                              {country}
                            </h3>
                            <div className="flex flex-col py-4">
                              {countryEvents.map((event, index) => (
                                <LinkBox
                                  key={index}
                                  className="flex flex-col justify-between gap-2 rounded-lg p-2 hover:bg-background-highlight md:flex-row"
                                >
                                  <div className="flex flex-col gap-2 md:flex-row">
                                    <div>
                                      <span className="text-lg font-bold">
                                        {event.city}
                                      </span>
                                    </div>
                                    <div>
                                      <span>{event.host}</span>
                                    </div>
                                  </div>
                                  <LinkOverlay
                                    href={event.eventLink}
                                    className="text-sm text-body-medium no-underline"
                                  >
                                    LINK TO EVENT
                                  </LinkOverlay>
                                </LinkBox>
                              ))}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </TabsContent>
                )
              })}
            </Tabs>
          </div>
        </div>
        <div className="w-full px-8 py-8">
          <div className="flex flex-col items-center gap-4 rounded-2xl bg-gradient-step-1 p-8">
            <h2 className="text-2xl font-bold">Host event</h2>
            <p className="text-md">
              If you want to host an event and would like to apply for funding,
              grants are available for a limited time.
            </p>
            <ButtonLink
              href="https://blog.ethereum.org/2025/04/24/ten-years"
              hideArrow
            >
              Add Your Event
            </ButtonLink>
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-8 px-8 py-8 pt-32 lg:flex-row">
          <div className="flex flex-1 flex-col gap-6">
            <h2 className="flex flex-col gap-2 font-black">
              <span className="pl-2.5 text-4xl text-accent-a">10 years of</span>
              <span className="text-5xl text-body md:text-7xl">innovation</span>
            </h2>
            <p className="text-xl font-bold">
              Ethereum transformed blockchain by introducing smart contracts
            </p>
            <p>
              Ethereum transformed blockchain from a simple ledger into a world
              computer of self-executing programs that run when conditions are
              met.
            </p>
            <p>
              This innovation launched entirely new industries including{" "}
              <b>DeFi</b>, <b>NFTs</b>, and <b>DAOs</b>, expanding blockchain
              far beyond digital currency into a platform that reimagined how we
              create and exchange value in the digital age.
            </p>
          </div>
          <InnovationSwiper />
        </div>

        <div className="flex w-full flex-col gap-8 px-8 py-8 pt-32 lg:flex-row">
          <div className="relative flex flex-1 flex-col gap-6">
            <div className="flex flex-col gap-6 lg:sticky lg:top-64 lg:mb-24">
              <h2 className="text-5xl font-black md:text-7xl">adoption</h2>
              <p className="text-xl font-bold">
                From a whitepaper to 24M+ transactions a day within ethereum
                ecosystem
              </p>
              <p>
                Ethereum has become a global computing platform that powers
                thousands of applications used by millions of people daily,
                crossing borders and industries while continuing to expand its
                reach into new territories and use cases.
              </p>
            </div>
          </div>
          <AdoptionSwiper />
          <div className="hidden flex-1 flex-col gap-6 md:flex">
            {adoptionCards.map((card, index) => (
              <div
                key={card.title}
                className={cn("w-[70%] rounded-2xl p-8", adoptionStyles[index])}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  className="mx-auto mb-4"
                />
                <h3 className="mb-4 text-2xl font-bold">{card.title}</h3>
                {card.description}
                <ButtonLink href={card.href} hideArrow variant="outline">
                  {card.linkText}
                </ButtonLink>
              </div>
            ))}
          </div>
        </div>

        <div className="flex w-full flex-col gap-8 px-8 py-8 pt-32 lg:flex-row">
          <div className="flex flex-1 flex-col gap-6">
            <div className="flex flex-col gap-6 lg:sticky lg:top-64 lg:mb-24">
              <h2 className="text-5xl font-black md:text-7xl">stories</h2>
              <p className="text-xl font-bold">
                An overview of how Ethereum is used in daily life
              </p>
              <p>
                From millions of wallets to every corner of the world, people
                are using Ethereum in ways that inspire. This collection shares
                real stories of creativity, freedom, and connection—powered by a
                decentralized network.
              </p>
              <ButtonLink href="https://ethereumstory.paperform.co/">
                Share your story
              </ButtonLink>
            </div>
          </div>
          <Stories stories={fetched10YearStories} />
        </div>

        <div className="w-full gap-8 px-8 py-8 pt-32">
          <div className="flex flex-col items-center gap-4 rounded-2xl bg-ten-year-gradient p-8">
            <Image
              src={TenYearLogo}
              alt="10 year anniversary logo"
              className="-mb-4 max-h-80 object-contain sm:-mb-16"
            />
            <h3>Have an idea for how the community can celebrate?</h3>
            <p>
              Onchain artifacts, a worldwide game of Ethereum trivia, the
              sky&apos;s the limit! Reach out with your idea below.
            </p>
            <ButtonLink href="https://ethereum.org/" hideArrow>
              Submit your Idea
            </ButtonLink>
          </div>
        </div>
      </MainArticle>
    </I18nProvider>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const t = await getTranslations({
    locale,
    namespace: "page-10-year-anniversary",
  })

  return await getMetadata({
    locale,
    slug: ["10-year-anniversary"],
    title: t("page-10-year-anniversary-meta-title"),
    description: t("page-10-year-anniversary-meta-description"),
  })
}

export default Page
