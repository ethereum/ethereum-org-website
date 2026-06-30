import { getTranslations, setRequestLocale } from "next-intl/server"

import type { EventItem, Lang, PageParams } from "@/lib/types"

import PageHero from "@/components/Hero/PageHero"
import MainArticle from "@/components/MainArticle"
import { Button } from "@/components/ui/buttons/Button"
import { Grid } from "@/components/ui/grid"
import Input from "@/components/ui/input"
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"

import EventCard from "../_components/event-card"
import NoResultsAlert from "../_components/no-results-alert"
import OrganizerCTA from "../_components/organizer-cta"
import { mapEventTranslations, sanitize } from "../utils"

import PageJsonLD from "./page-jsonld"

import { getEventsData } from "@/lib/data"

const safeDecodeURIComponent = (str: string) => {
  try {
    return decodeURIComponent(str)
  } catch {
    return str
  }
}

const Page = async (props: {
  params: Promise<PageParams>
  searchParams: Promise<{ q?: string }>
}) => {
  const searchParams = await props.searchParams
  const params = await props.params
  const { locale } = params
  setRequestLocale(locale)
  const { q } = searchParams

  const _events = (await getEventsData()) ?? []

  const t = await getTranslations("page-community-events")
  const tCommon = await getTranslations("common")

  const events = mapEventTranslations(_events, t, locale)

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
    ? t("page-events-search-hero-title-q", { q: safeDecodeURIComponent(q) })
    : t("page-events-search-hero-title")

  const Results = () => {
    if (!q) return <></>

    if (!filteredEvents.length)
      return (
        <NoResultsAlert>{t("page-events-search-no-results")}</NoResultsAlert>
      )

    return (
      <Grid>
        {filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            locale={locale}
            showTypeTag
            customEventOptions={{
              eventCategory: "Events_search",
              eventAction: "events_clicked",
              eventName: event.title,
            }}
          />
        ))}
      </Grid>
    )
  }

  const { contributors } = await getAppPageContributorInfo(
    "community/events/search",
    locale as Lang
  )

  return (
    <>
      <PageJsonLD locale={locale} contributors={contributors} />

      <PageHero
        breadcrumbs={{ slug: "/community/events/search" }}
        title={title}
        description={t("page-events-meetups-hero-subtitle")}
      />

      <main className="px-page pt-page-2x pb-page">
        <MainArticle className="flow">
          <Section id="find-events">
            <h2>{t("page-events-section-find-events")}</h2>
            <p>{t("page-events-meetups-events-subtitle")}</p>
            <form
              action=""
              method="GET"
              className="flex w-full max-w-xl flex-col gap-2 sm:flex-row"
            >
              <Input
                type="search"
                name="q"
                defaultValue={q ? safeDecodeURIComponent(q) : ""}
                placeholder={t("page-events-search-placeholder")}
                aria-label={t("page-events-search-placeholder")}
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
      </main>
    </>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const params = await props.params
  const { locale } = params
  const t = await getTranslations("page-community-events")

  return await getMetadata({
    locale,
    slug: ["community", "events", "meetups"],
    title: t("page-events-search-hero-title"),
    description: t("page-events-search-metadata-description"),
  })
}

export default Page
