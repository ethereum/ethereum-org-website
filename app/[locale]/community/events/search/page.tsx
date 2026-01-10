import { Info } from "lucide-react"
import { getTranslations } from "next-intl/server"

import type { EventItem, PageParams } from "@/lib/types"

import ContentHero from "@/components/Hero/ContentHero"
import MainArticle from "@/components/MainArticle"
import { Alert, AlertContent } from "@/components/ui/alert"
import Input from "@/components/ui/input"
import { Section } from "@/components/ui/section"

import { dataLoader } from "@/lib/utils/data/dataLoader"
import { getLocaleYear } from "@/lib/utils/date"
import { getMetadata } from "@/lib/utils/metadata"

import EventCard from "../_components/EventCard"
import OrganizerCTA from "../_components/OrganizerCTA"
import { REVALIDATE_TIME } from "../constants"
import { sanitize } from "../utils"

import { fetchEvents } from "@/lib/api/fetchEvents"

const loadData = dataLoader([["events", fetchEvents]], REVALIDATE_TIME * 1000)

const Page = async ({
  params,
  searchParams,
}: {
  params: PageParams
  searchParams: { q?: string }
}) => {
  const { locale } = params
  const { q } = searchParams

  const [events] = await loadData()

  const t = await getTranslations({
    locale,
    namespace: "page-community-events",
  })

  const filteredEvents = ((): EventItem[] => {
    if (!q) return []

    return events.filter((e) => {
      const isOnline = e.isOnline ? t("page-events-tag-online") : ""
      const searchable = [
        e.title,
        e.location,
        e.continent,
        isOnline,
        ...e.tags,
      ].join(" ")

      return sanitize(searchable).includes(sanitize(q))
    })
  })()

  const title = q
    ? t("page-events-search-hero-title-q", { q: decodeURIComponent(q) })
    : t("page-events-search-hero-title")

  const Results = () => {
    if (!q) return <></>

    if (!filteredEvents.length)
      return (
        <Alert variant="warning" className="mx-auto max-w-xl justify-center">
          <Info className="size-6 !text-current" />
          <AlertContent className="flex-none">
            {t("page-events-search-no-results")}
          </AlertContent>
        </Alert>
      )

    return (
      <>
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(min(100%,_24rem),_1fr))] gap-8">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              variant="grid"
              locale={locale}
              showTypeTag
            />
          ))}
        </div>
      </>
    )
  }

  return (
    <>
      <ContentHero
        breadcrumbs={{ slug: "/community/events/search" }}
        title={title}
        description={t("page-events-meetups-hero-subtitle")}
        className="pb-0"
      />

      <MainArticle className="flex flex-col gap-16 px-4 py-10 md:px-8">
        <Section className="space-y-8">
          <div className="space-y-2">
            <h2 className="">{t("page-events-section-find-events")}</h2>
            <p className="">{t("page-events-meetups-events-subtitle")}</p>
          </div>
          <form action="" method="GET" className="w-full max-w-xl">
            <Input
              type="search"
              name="q"
              defaultValue={q ? decodeURIComponent(q) : ""}
              placeholder={t("page-events-search-placeholder")}
              aria-describedby="input-instruction"
              className="w-full"
            />
            <span id="input-instruction" className="sr-only">
              {t("page-events-search-submit-sr-text")}
            </span>
          </form>

          <Results />
        </Section>

        <OrganizerCTA />
      </MainArticle>
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}) {
  const { locale } = params
  const t = await getTranslations({
    locale,
    namespace: "page-community-events",
  })

  const year = getLocaleYear(locale)

  return await getMetadata({
    locale,
    slug: ["community", "events", "meetups"],
    title: t("page-events-meetups-hero-title"),
    description: t("page-events-meta-description", { year }),
  })
}

export default Page
