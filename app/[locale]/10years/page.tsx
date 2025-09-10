import { pick } from "lodash"
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
import Translation from "@/components/Translation"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { LinkBox, LinkOverlay } from "@/components/ui/link-box"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import YouTube from "@/components/YouTube"

import { cn } from "@/lib/utils/cn"
import { dataLoader } from "@/lib/utils/data/dataLoader"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

// Import static torch holders data
import torchHoldersData from "@/data/torchHolders.json"

import { BASE_TIME_UNIT } from "@/lib/constants"

import AdoptionSwiper from "./_components/AdoptionSwiper/lazy"
import { adoptionStyles } from "./_components/data"
import InnovationSwiper from "./_components/InnovationSwiper/lazy"
import NFTMintCard from "./_components/NFTMintCard"
import TenYearHero from "./_components/TenYearHero"
import TorchHistorySwiper from "./_components/TorchHistorySwiper/lazy"
import Stories from "./_components/UserStories/lazy"
import {
  getAdoptionCards,
  getInnovationCards,
  parseStoryDates,
} from "./_components/utils"

import { routing } from "@/i18n/routing"
import { fetch10YearEvents } from "@/lib/api/fetch10YearEvents"
import { fetch10YearStories } from "@/lib/api/fetch10YearStories"
import {
  getHolderEvents,
  getTransferEvents,
  isAddressFiltered,
  type TorchHolder,
} from "@/lib/torch"
import Curved10YearsText from "@/public/images/10-year-anniversary/10y-torch-heading.svg"

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

  const allTorchHolders: TorchHolder[] = torchHoldersData as TorchHolder[]

  const stories = parseStoryDates(fetched10YearStories, locale)

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/10years")
  const messages = pick(allMessages, requiredNamespaces)

  const t = await getTranslations({
    locale,
    namespace: "page-10-year-anniversary",
  })

  const innovationCards = await getInnovationCards()
  const adoptionCards = await getAdoptionCards()

  // Torch NFT data fetching logic
  const transferEvents = getTransferEvents()

  const torchHolderMap: Record<string, (typeof allTorchHolders)[0]> =
    allTorchHolders.reduce(
      (acc, holder) => {
        acc[holder.address.toLowerCase()] = holder
        return acc
      },
      {} as Record<string, (typeof allTorchHolders)[0]>
    )

  const torchHoldersEvents = await getHolderEvents(
    torchHolderMap,
    transferEvents
  )

  // Filter out events where the address is in the filtered list
  const torchHolders = torchHoldersEvents.filter(
    (holder) => !isAddressFiltered(holder.address)
  )

  return (
    <MainArticle className="mx-auto flex w-full flex-col items-center">
      <TenYearHero locale={locale} />

      <div
        className={cn(
          "mt-16 flex w-full flex-col gap-32 px-4 py-4 md:flex-row md:py-8"
        )}
      >
        <div className="flex flex-1 flex-col gap-5">
          <div>
            <h1 className="text-2xl font-bold">
              {t("page-10-year-hero-title")}
            </h1>
          </div>

          <div className="flex flex-1 flex-col gap-4">
            <p className="text-lg">{t("page-10-year-hero-description")}</p>
            <p className="text-lg">{t("page-10-year-hero-tagline")}</p>
          </div>
        </div>
        <div className="flex flex-1 flex-row items-center justify-center">
          <NFTMintCard />
        </div>
      </div>

      <div className="w-full px-4 py-8 md:px-8">
        <div className="flex flex-col items-center gap-4 rounded-4xl bg-radial-a px-4 pt-8 lg:px-14 lg:pt-14">
          <div className="flex flex-col gap-4 text-center">
            <h2 className="text-4xl font-black">
              {t("page-10-year-livestream-title")}
            </h2>
          </div>
          <YouTube
            className="w-full max-w-none"
            id="igPIMF1p5Bo"
            title={t("page-10-year-livestream-video-title")}
            poster="maxresdefault"
          />
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
                  {data.label}&nbsp;
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
                                  {t("page-10-year-event-link")}
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

      <div
        id="torch-history"
        className="my-32 flex w-full scroll-mt-32 flex-col bg-gradient-to-b from-[#161A36] via-[#161A36] via-60% to-[#9C63F8] md:rounded-3xl"
      >
        <div className="p-8">
          <div className="relative">
            <div className="flex items-center justify-center pt-12 sm:pt-24">
              <div className="relative max-h-[380px] max-w-[380px]">
                <video
                  className="pointer-events-none select-none"
                  src="/videos/torch.mp4"
                  aria-label="Torch video"
                  autoPlay
                  loop
                  muted
                  poster="/images/10-year-anniversary/torch-cover.png"
                  controlsList="nodownload"
                  disablePictureInPicture
                  playsInline
                />
                <div className="pointer-events-none absolute top-0 h-full w-full select-none bg-[url('/images/10-year-anniversary/torch-overlay.png')] bg-contain bg-center bg-no-repeat" />
              </div>
            </div>
            {/* Curved text */}
            <Curved10YearsText
              viewBox="0 0 356 186"
              className="absolute left-1/2 top-0 h-min w-full max-w-[600px] -translate-x-1/2"
              width="100%"
              height="auto"
            />
          </div>
        </div>

        <TorchHistorySwiper
          holders={torchHolders}
          currentHolderAddress={null}
        />

        <div className="flex flex-col gap-12 px-8 pb-24 pt-12 text-body-inverse sm:px-16 md:flex-row dark:text-body">
          <div className="flex flex-1 flex-col gap-8">
            <p>
              <Translation
                id="page-10-year-torch-nft-intro"
                ns="page-10-year-anniversary"
              />
            </p>

            <p>{t("page-10-year-torch-nft-description")}</p>
          </div>
          <div className="flex flex-1 flex-col gap-8">
            <div>
              <h3 className="text-lg font-bold">
                {t("page-10-year-torch-one-of-kind-title")}
              </h3>
              <p>{t("page-10-year-torch-one-of-kind-description")}</p>
            </div>

            <div>
              <h3 className="text-lg font-bold">
                {t("page-10-year-torch-time-limited-title")}
              </h3>
              <p>{t("page-10-year-torch-time-limited-description")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col items-center gap-8 px-8 py-8 lg:flex-row">
        <div className="flex flex-1 flex-col gap-6">
          <h2 className="flex flex-col gap-2 font-black">
            <span className="text-4xl text-accent-a">
              {t("page-10-year-innovation-title")}
            </span>
            <span className="text-5xl text-body md:text-7xl">
              {t("page-10-year-innovation-subtitle")}
            </span>
          </h2>
          <p className="text-xl font-bold">
            {t("page-10-year-innovation-description-1")}
          </p>
          <p>{t("page-10-year-innovation-description-2")}</p>
          <p>{t("page-10-year-innovation-description-3")}</p>
        </div>
        {/* CLIENT SIDE, lazy loaded */}
        <InnovationSwiper innovationCards={innovationCards} />
      </div>

      <div className="flex w-full flex-col gap-8 px-8 py-8 pt-32 lg:flex-row">
        <div className="relative flex max-w-[350px] flex-1 flex-col gap-6">
          <div className="flex flex-col gap-6 lg:sticky lg:top-64 lg:mb-24">
            <h2 className="flex flex-col gap-2 font-black">
              <span className="text-4xl text-accent-a">
                {t("page-10-year-adoption-title")}
              </span>
              <span className="text-5xl text-body md:text-7xl">
                {t("page-10-year-adoption-subtitle")}
              </span>
            </h2>
            <p className="text-xl font-bold">
              {t("page-10-year-adoption-description-1")}
            </p>
            <p>{t("page-10-year-adoption-description-2")}</p>
          </div>
        </div>
        {/* CLIENT SIDE, lazy loaded */}
        <AdoptionSwiper
          adoptionCards={adoptionCards}
          adoptionStyles={adoptionStyles}
        />
        <div className="hidden flex-1 flex-col gap-6 md:flex">
          {adoptionCards.map((card, index) => (
            <div
              key={`adoption-card-${index}`}
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
                alt={t(`page-10-year-adoption-card-${index + 1}-title`)}
                className="mx-auto mb-4 max-h-[300px] object-contain"
              />
              <h3 className="mb-4 text-2xl font-bold">
                {t(`page-10-year-adoption-card-${index + 1}-title`)}
              </h3>
              <p className="mb-8">
                <Translation
                  id={`page-10-year-adoption-card-${index + 1}-description`}
                  ns="page-10-year-anniversary"
                />
              </p>
              <ButtonLink href={card.href} hideArrow variant="outline">
                {t(`page-10-year-adoption-card-${index + 1}-link-text`)}
              </ButtonLink>
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-full flex-col gap-8 px-8 py-8 pt-32 lg:flex-row">
        <div className="flex max-w-[350px] flex-1 flex-col gap-6">
          <div className="flex flex-col gap-6 lg:sticky lg:top-64 lg:mb-24">
            <h2 className="flex flex-col gap-2 font-black">
              <span className="text-4xl text-accent-a">
                {t("page-10-year-stories-title")}
              </span>
              <span className="text-5xl text-body md:text-7xl">
                {t("page-10-year-stories-subtitle")}
              </span>
            </h2>
            <p className="text-xl font-bold">
              {t("page-10-year-stories-description-1")}
            </p>
            <p>{t("page-10-year-stories-description-2")}</p>
            <ButtonLink href="https://ethereumstory.paperform.co/">
              {t("page-10-year-stories-cta")}
            </ButtonLink>
          </div>
        </div>
        <I18nProvider locale={locale} messages={messages}>
          <Stories stories={stories} />
        </I18nProvider>
      </div>
    </MainArticle>
  )
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({
    locale,
  }))
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
