import { getTranslations } from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import PageHero from "@/components/Hero/PageHero"
import MainArticle from "@/components/MainArticle"
import {
  EdgeScrollContainer,
  EdgeScrollItem,
} from "@/components/ui/edge-scroll-container"
import Link from "@/components/ui/Link"
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getLocaleYear } from "@/lib/utils/date"
import { getMetadata } from "@/lib/utils/metadata"

import ContinentTabs from "../_components/continent-tabs"
import EventCard from "../_components/event-card"
import OrganizerCTA from "../_components/organizer-cta"
import { mapEventTranslations } from "../utils"

import PageJsonLD from "./page-jsonld"

import { getEventsData } from "@/lib/data"

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

  const _events = (await getEventsData()) ?? []

  const t = await getTranslations("page-community-events")

  // Apply translations and compute eventTypes from tags if missing
  const events = mapEventTranslations(_events, t, locale)

  // Filter to conferences only (includes hackathons as they're often conference-adjacent)
  const conferences = events.filter(
    (e) =>
      e.eventTypes?.includes("conference") ||
      e.eventTypes?.includes("hackathon")
  )

  // Get highlighted conferences
  const highlightedConferences = conferences
    .filter((e) => e.highlight)
    .slice(0, 3)
    .concat(conferences.filter((e) => !e.highlight))
    .slice(0, 3)

  const { contributors } = await getAppPageContributorInfo(
    "community/events/conferences",
    locale as Lang
  )

  // Continent labels for tabs
  const continentLabels = {
    all: t("page-events-filter-all"),
    africa: t("page-events-continent-africa"),
    asia: t("page-events-continent-asia"),
    europe: t("page-events-continent-europe"),
    "middle-east": t("page-events-continent-middle-east"),
    "north-america": t("page-events-continent-north-america"),
    oceania: t("page-events-continent-oceania"),
    "south-america": t("page-events-continent-south-america"),
  }

  return (
    <>
      <PageJsonLD
        locale={locale}
        contributors={contributors}
        conferences={conferences}
      />

      <PageHero
        breadcrumbs={{ slug: "/community/events/conferences" }}
        title={t("page-events-conferences-hero-title", {
          year: getLocaleYear(locale),
        })}
        description={t("page-events-conferences-hero-subtitle", {
          year: getLocaleYear(locale),
        })}
      />

      <main className="px-page pt-page-2x pb-page">
        <MainArticle className="flow">
          {/* Major blockchain conferences */}
          <Section id="highlights">
            <h2>{t("page-events-conferences-major-events")}</h2>
            <EdgeScrollContainer>
              {highlightedConferences.map((event) => (
                <EdgeScrollItem
                  key={event.id}
                  asChild
                  className="ms-6 w-[calc(100%-4rem)] max-w-md md:min-w-96 md:flex-1 lg:max-w-[33%]"
                >
                  <EventCard
                    event={event}
                    variant="highlight"
                    locale={locale}
                    customEventOptions={{
                      eventCategory: "Events_conferences",
                      eventAction: "events_clicked",
                      eventName: "highlighted_conf",
                    }}
                  />
                </EdgeScrollItem>
              ))}
            </EdgeScrollContainer>
          </Section>

          {/* All conferences - TABLE/ROW view */}
          <Section id="upcoming-conferences">
            <h2 className="sr-only">
              {t("page-events-section-upcoming-conferences")}
            </h2>

            <ContinentTabs
              events={conferences}
              labels={continentLabels}
              locale={locale}
              noEventsMessage={t("page-events-no-upcoming")}
              onlineLabel={t("page-events-tag-online")}
              matomoNavOptions={{
                eventCategory: "Events_conferences",
                eventAction: "Menu",
              }}
              matomoLinkOptions={{
                eventCategory: "Events_conferences",
              }}
            />
            <p data-flow="cta" className="text-body-medium">
              {t.rich("page-events-data-source-callout", {
                a: (chunks) => (
                  <Link href="https://ethstars.xyz/">{chunks}</Link>
                ),
              })}
            </p>
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

  const year = getLocaleYear(locale)

  return await getMetadata({
    locale,
    slug: ["community", "events", "conferences"],
    title: t("page-events-conferences-hero-title", { year }),
    description: t("page-events-meta-description", { year }),
  })
}

export default Page
