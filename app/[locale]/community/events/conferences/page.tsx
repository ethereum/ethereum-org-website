import { pick } from "lodash"
import { getMessages, getTranslations } from "next-intl/server"

import type { PageParams } from "@/lib/types"

import ContentHero from "@/components/Hero/ContentHero"
import I18nProvider from "@/components/I18nProvider"
import MainArticle from "@/components/MainArticle"
import {
  EdgeScrollContainer,
  EdgeScrollItem,
} from "@/components/ui/edge-scroll-container"
import { Section } from "@/components/ui/section"

import { dataLoader } from "@/lib/utils/data/dataLoader"
import { getLocaleYear } from "@/lib/utils/date"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import ContinentTabs from "../_components/ContinentTabs"
import EventCard from "../_components/EventCard"
import OrganizerCTA from "../_components/OrganizerCTA"
import { REVALIDATE_TIME } from "../constants"

import { fetchEvents } from "@/lib/api/fetchEvents"

const loadData = dataLoader([["events", fetchEvents]], REVALIDATE_TIME * 1000)

const Page = async ({ params }: { params: PageParams }) => {
  const { locale } = params

  const [events] = await loadData()

  const t = await getTranslations({
    locale,
    namespace: "page-community-events",
  })

  // Filter to conferences only (includes hackathons as they're often conference-adjacent)
  const conferences = events.filter(
    (e) => e.eventType === "conference" || e.eventType === "hackathon"
  )

  // Get highlighted conferences
  const highlightedConferences = conferences
    .filter((e) => e.highlight)
    .slice(0, 3)
    .concat(conferences.filter((e) => !e.highlight))
    .slice(0, 3)

  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/community/events")
  const messages = pick(allMessages, requiredNamespaces)

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
    <I18nProvider locale={locale} messages={messages}>
      <ContentHero
        breadcrumbs={{ slug: "/community/events/conferences" }}
        title={t("page-events-conferences-hero-title", {
          year: getLocaleYear(locale),
        })}
        description={t("page-events-conferences-hero-subtitle", {
          year: getLocaleYear(locale),
        })}
        className="pb-0"
      />

      <MainArticle className="space-y-20 px-4 py-10 md:px-8">
        {/* Major blockchain conferences */}
        <Section className="space-y-4">
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
        <Section>
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
        </Section>

        {/* Footer CTA */}
        <OrganizerCTA />
      </MainArticle>
    </I18nProvider>
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
    slug: ["community", "events", "conferences"],
    title: t("page-events-conferences-hero-title"),
    description: t("page-events-meta-description", { year }),
  })
}

export default Page
