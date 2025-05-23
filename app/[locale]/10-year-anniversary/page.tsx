import pick from "lodash.pick"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { Lang } from "@/lib/types"

import Emoji from "@/components/Emoji"
import I18nProvider from "@/components/I18nProvider"
import MainArticle from "@/components/MainArticle"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { LinkBox, LinkOverlay } from "@/components/ui/link-box"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { cn } from "@/lib/utils/cn"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import eventData from "@/data/10-year-anniversary/eventData"

import CountDown from "./_components/CountDown"
import TenYearGlobe from "./_components/TenYearGlobe"
import TenYearHero from "./_components/TenYearHero"

const Page = async ({ params }: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await params

  setRequestLocale(locale)

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
                that would forever change how we think about the internet,
                finance, and digital ownership.
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
                As we mark this historic milestone, we invite you to join us in
                commemorating ten years of Ethereum. If you want to host an
                event, please let us know!
              </p>
            </div>
            <div>
              <TenYearGlobe />
            </div>
          </div>
        </div>

        <div className="w-full px-8">
          <div className="w-full">
            <Tabs defaultValue={Object.keys(eventData)[0]} className="w-full">
              <TabsList className="w-full flex-nowrap justify-start overflow-x-auto overflow-y-hidden rounded-none border-b-2 border-b-primary p-0">
                {Object.entries(eventData).map(([key, data]) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="whitespace-nowrap border-0 text-primary"
                  >
                    {data.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {Object.entries(eventData).map(([key, data]) => {
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
                                  text={countryEvents[0].countryEmoji}
                                  className="scale-[1.75]"
                                />
                              </span>
                              {country}
                            </h3>
                            <div className="flex flex-col py-4">
                              {countryEvents.map((event, index) => (
                                <LinkBox
                                  key={index}
                                  className="flex flex-col justify-between gap-2 rounded-lg py-2 hover:bg-background-highlight md:flex-row"
                                >
                                  <div className="flex flex-col gap-2 md:flex-row">
                                    <div>
                                      <span className="text-lg font-bold">
                                        {event.city}
                                      </span>
                                    </div>
                                    <div>
                                      <span>
                                        {event.startTime} to {event.endTime}{" "}
                                        (local time)
                                      </span>
                                    </div>
                                  </div>
                                  <LinkOverlay
                                    href={event.link}
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
              If you want to host an event in your city. Ethereum Foundation is
              giving out a grant for the celebration.
            </p>
            <ButtonLink href="https://ethereum.org/" hideArrow>
              add your event
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
