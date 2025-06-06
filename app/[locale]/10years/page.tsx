import { Suspense } from "react"
import { pick } from "lodash"
import dynamic from "next/dynamic"
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
import { Skeleton } from "@/components/ui/skeleton"
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
import TenYearHero from "./_components/TenYearHero"
import { parseStoryDates } from "./_components/utils"

import { fetch10YearEvents } from "@/lib/api/fetch10YearEvents"
import { fetch10YearStories } from "@/lib/api/fetch10YearStories"
import TenYearLogo from "@/public/images/10-year-anniversary/10-year-logo.png"

const TenYearGlobe = dynamic(() => import("./_components/TenYearGlobe"), {
  ssr: false,
})

// In seconds
const REVALIDATE_TIME = BASE_TIME_UNIT * 1

const loadData = dataLoader(
  [
    ["fetched10YearEvents", fetch10YearEvents],
    ["fetched10YearStories", fetch10YearStories],
  ],
  REVALIDATE_TIME * 1000
)

const zIndexClasses = ["z-50", "z-40", "z-30", "z-20", "z-10", "z-0"]

const Page = async ({ params }: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await params

  setRequestLocale(locale)

  const [fetched10YearEvents, fetched10YearStories] = await loadData()

  const stories = parseStoryDates(fetched10YearStories, locale)

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/10years")
  const messages = pick(allMessages, requiredNamespaces)

  return (
    <I18nProvider locale={locale} messages={messages}>
      <MainArticle className="mx-auto flex w-full flex-col items-center">
        <TenYearHero />

        <div className="mt-16 flex w-full flex-col gap-16 px-8 py-4 md:flex-row md:py-8">
          <div className="flex flex-1 flex-col gap-5">
            <div>
              <h1 className="text-2xl font-bold">
                A decade of transforming the world one block at a time
              </h1>
            </div>
            <div className="flex flex-1 flex-col gap-4">
              <p className="text-lg">
                On July 30, 2015, the Ethereum blockchain was born. The moment
                the genesis block was mined, it enabled new possibilities for
                the internet, bringing transformative changes to finance,
                ownership, and programmability.
              </p>
              <p className="text-lg">Ten years in, eternity ahead.</p>
            </div>
          </div>
          <div className="flex flex-1 flex-row items-center justify-center">
            <CountDown />
          </div>
        </div>

        <div className="w-full px-4 py-8 md:px-8">
          <div className="flex min-h-[500px] flex-col items-center gap-4 rounded-4xl bg-radial-a px-8 pt-8 lg:px-14 lg:pt-14">
            <div className="flex max-w-[770px] flex-col gap-4 text-center">
              <h2 className="text-4xl font-black">Join the party</h2>
              <p className="text-md">
                Celebrate 10 years of Ethereum with the global community. Find a
                local event or start your own celebration.
              </p>
            </div>
            <div className="h-[max(fit,260px)] sm:h-[400px] md:h-[500px] lg:h-[600px]">
              <Suspense
                fallback={
                  <Skeleton className="mx-auto aspect-square h-full rounded-full bg-primary/20 blur-2xl" />
                }
              >
                <TenYearGlobe
                  events={Object.values(fetched10YearEvents).flatMap((region) =>
                    region.events.map((event) => ({
                      ...event,
                      lat: Number(event.lat),
                      lng: Number(event.lng),
                    }))
                  )}
                />
              </Suspense>
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
                    {"\u00A0"}
                    <span className="text-sm">({data.events.length})</span>
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
                              <span className="flex min-h-6 min-w-6 items-center justify-center overflow-hidden rounded-full bg-primary-low-contrast">
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
                                  <div className="flex flex-col gap-2 md:flex-row md:items-center">
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
                                    className="text-sm no-underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    Go to event
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
        <div className="flex w-full flex-col-reverse gap-8 px-8 py-8 md:flex-row">
          <div className="flex flex-1 flex-col gap-4 md:gap-8 md:pt-8">
            <p>
              Join people around the world for talks, networking, and
              celebrations as we mark Ethereum&apos;s tenth birthday.
            </p>
            <p>
              Can&apos;t make it in person? Watch our livestream and follow
              updates from events worldwide, so everyone can celebrate this
              milestone together.
            </p>
          </div>
          <div className="flex flex-1 flex-col items-center gap-4 rounded-2xl bg-gradient-step-1 p-8">
            <h2 className="text-2xl font-bold">Host an event</h2>
            <p className="text-md">
              Want to host an event? Limited-time grants are available to help
              fund your event.
            </p>
            <ButtonLink
              href="https://blog.ethereum.org/2025/04/24/ten-years"
              hideArrow
            >
              Apply Now
            </ButtonLink>
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-8 px-8 py-8 pt-32 lg:flex-row">
          <div className="flex flex-1 flex-col gap-6">
            <h2 className="flex flex-col gap-2 font-black">
              <span className="text-4xl text-accent-a">10 years of</span>
              <span className="text-5xl text-body md:text-7xl">Innovation</span>
            </h2>
            <p className="text-xl font-bold">
              Ethereum transformed blockchain by introducing smart contracts
            </p>
            <p>
              With Ethereum, blockchains changed from a digital ledger, into a
              programmable platform where code executes automatically when
              conditions are met.
            </p>
            <p>
              Ethereum&apos;s innovation enabled entirely new industries like{" "}
              <b>DeFi, NFTs, and DAOs</b>. It expanded blockchain beyond digital
              currency into a platform that reimagined how we create and
              exchange value.
            </p>
          </div>
          <InnovationSwiper />
        </div>

        <div className="flex w-full flex-col gap-8 px-8 py-8 pt-32 lg:flex-row">
          <div className="relative flex max-w-[350px] flex-1 flex-col gap-6">
            <div className="flex flex-col gap-6 lg:sticky lg:top-64 lg:mb-24">
              <h2 className="flex flex-col gap-2 font-black">
                <span className="text-4xl text-accent-a">10 years of</span>
                <span className="text-5xl text-body md:text-7xl">Adoption</span>
              </h2>
              <p className="text-xl font-bold">
                From a whitepaper to 24M+ daily transactions within the Ethereum
                ecosystem
              </p>
              <p>
                Ethereum has become a global computing platform powering
                thousands of applications used by millions daily. It spans
                industries and borders while continuing to expand its use cases.
              </p>
            </div>
          </div>
          <AdoptionSwiper
            adoptionCards={adoptionCards}
            adoptionStyles={adoptionStyles}
          />
          <div className="hidden flex-1 flex-col gap-6 md:flex">
            {adoptionCards.map((card, index) => (
              <div
                key={card.title}
                className={cn(
                  "w-[70%] rounded-2xl p-8 shadow",
                  index % 2 === 0 && "ml-auto",
                  index !== 0 && "-mt-10",
                  zIndexClasses[index],
                  adoptionStyles[index % 3]
                )}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  className="mx-auto mb-4 max-h-[300px] object-contain"
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
          <div className="flex max-w-[350px] flex-1 flex-col gap-6">
            <div className="flex flex-col gap-6 lg:sticky lg:top-64 lg:mb-24">
              <h2 className="flex flex-col gap-2 font-black">
                <span className="text-4xl text-accent-a">10 years of</span>
                <span className="text-5xl text-body md:text-7xl">Stories</span>
              </h2>
              <p className="text-xl font-bold">
                An overview of how Ethereum is used in daily life
              </p>
              <p>
                From millions of wallets to every corner of the world, people
                use Ethereum in ways that inspire. These real stories showcase
                creativity, freedom, and connection powered by Ethereum.
              </p>
              <ButtonLink href="https://ethereumstory.paperform.co/">
                Share your story
              </ButtonLink>
            </div>
          </div>
          <Stories stories={stories} />
        </div>

        <div className="w-full gap-8 px-8 py-8 pt-32">
          <div className="flex flex-col items-center gap-4 rounded-2xl bg-ten-year-gradient p-8">
            <Image
              src={TenYearLogo}
              alt="10 year anniversary logo"
              className="mb-8 max-h-80 object-contain sm:mb-12"
            />
            <h3>Have an idea for how the community can celebrate?</h3>
            <p>
              Onchain artifacts, a worldwide game of Ethereum trivia, the
              sky&apos;s the limit! Reach out with your idea below.
            </p>
            <ButtonLink href="mailto:10years@ethereum.org" hideArrow>
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
    slug: ["10years"],
    title: t("page-10-year-anniversary-meta-title"),
    description: t("page-10-year-anniversary-meta-description"),
  })
}

export default Page
