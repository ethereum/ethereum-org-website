import { Info } from "lucide-react"
import { getTranslations } from "next-intl/server"

import type { EventItem, PageParams } from "@/lib/types"

import ContentHero from "@/components/Hero/ContentHero"
import MainArticle from "@/components/MainArticle"
import { Alert, AlertContent } from "@/components/ui/alert"
import { Button } from "@/components/ui/buttons/Button"
import Input from "@/components/ui/input"
import { Section } from "@/components/ui/section"

import { getMetadata } from "@/lib/utils/metadata"

import EventCard from "../_components/EventCard"
import OrganizerCTA from "../_components/OrganizerCTA"
import { mapEventTranslations, sanitize } from "../utils"

import { getEventsData } from "@/lib/data"

const Page = async ({
  params,
  searchParams,
}: {
  params: PageParams
  searchParams: { q?: string }
}) => {
  const { locale } = params
  const { q } = searchParams

  const _events = (await getEventsData()) ?? []

  const t = await getTranslations({
    locale,
    namespace: "page-community-events",
  })
  const tCommon = await getTranslations({ locale, namespace: "common" })

  const events = mapEventTranslations(_events, t)

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
        <div className="grid grid-cols-fill-4 gap-8">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              variant="grid"
              locale={locale}
              showTypeTag
              customEventOptions={{
                eventCategory: "Events_search",
                eventAction: "events_clicked",
                eventName: event.title,
              }}
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
          <form
            action=""
            method="GET"
            className="flex w-full max-w-xl flex-col gap-2 sm:flex-row"
          >
            <Input
              type="search"
              name="q"
              defaultValue={q ? decodeURIComponent(q) : ""}
              placeholder={t("page-events-search-placeholder")}
              aria-describedby="input-instruction"
              className="w-full"
              required
            />
            <span id="input-instruction" className="sr-only">
              {t("page-events-search-submit-sr-text")}
            </span>
            <Button type="submit">{tCommon("search")}</Button>
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

  return await getMetadata({
    locale,
    slug: ["community", "events", "meetups"],
    title: t("page-events-search-hero-title"),
    description: t("page-events-search-metadata-description"),
  })
}

export default Page
