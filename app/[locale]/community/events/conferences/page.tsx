import { pick } from "lodash"
import { getMessages, getTranslations } from "next-intl/server"

import type { PageParams } from "@/lib/types"

import ContentHero from "@/components/Hero/ContentHero"
import I18nProvider from "@/components/I18nProvider"
import MainArticle from "@/components/MainArticle"
import { Section } from "@/components/ui/section"

import { dataLoader } from "@/lib/utils/data/dataLoader"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import ContinentTabs from "../_components/ContinentTabs"
import EventCard from "../_components/EventCard"
import EventsSwiper from "../_components/EventsSwiper"
import OrganizerCTA from "../_components/OrganizerCTA"
import { REVALIDATE_TIME } from "../constants"

import { fetchEvents } from "@/lib/api/fetchEvents"
import peopleImage from "@/public/images/people-learning.png"

const loadData = dataLoader([["events", fetchEvents]], REVALIDATE_TIME * 1000)

const Page = async ({ params }: { params: PageParams }) => {
  const { locale } = await params

  const [events] = await loadData()

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

  const t = await getTranslations({
    locale,
    namespace: "page-community-events",
  })

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
        title={t("page-events-conferences-hero-title")}
        description={t("page-events-hero-subtitle")}
        heroImg={peopleImage}
      />

      <MainArticle className="flex flex-col gap-16 px-4 py-10 md:px-8">
        {/* Major blockchain conferences */}
        <Section>
          <h2 className="mb-6 text-3xl font-bold">
            {t("page-events-section-major-conferences")}
          </h2>
          {/* Mobile swiper */}
          <div className="md:hidden">
            <EventsSwiper
              cards={highlightedConferences.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  variant="highlight"
                  locale={locale}
                />
              ))}
            />
          </div>
          {/* Desktop grid */}
          <div className="hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
            {highlightedConferences.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                variant="highlight"
                locale={locale}
              />
            ))}
          </div>
        </Section>

        {/* All conferences - TABLE/ROW view */}
        <Section>
          <div className="mb-6">
            <h2 className="text-3xl font-bold">
              {t("page-events-section-upcoming-conferences")}
            </h2>
            <p className="mt-2 text-body-medium">
              {t("page-events-section-upcoming-conferences-subtitle")}
            </p>
          </div>
          <ContinentTabs
            events={conferences}
            labels={continentLabels}
            locale={locale}
            noEventsMessage={t("page-events-no-upcoming")}
            displayMode="row"
            showCounts={true}
            maxEvents={50}
          />
        </Section>

        {/* Footer CTA */}
        <OrganizerCTA
          title={t("page-events-cta-title")}
          subtitle={t("page-events-cta-subtitle")}
          buttonText={t("page-events-cta-button")}
        />
      </MainArticle>
    </I18nProvider>
  )
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}) {
  const { locale } = await params
  const t = await getTranslations({
    locale,
    namespace: "page-community-events",
  })

  return await getMetadata({
    locale,
    slug: ["community", "events", "conferences"],
    title: t("page-events-conferences-hero-title"),
    description: t("page-events-meta-description"),
  })
}

export default Page
