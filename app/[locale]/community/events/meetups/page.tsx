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

import EventCard from "../_components/EventCard"
import OrganizerCTA from "../_components/OrganizerCTA"
// import SearchSection from "../_components/SearchSection"
import { REVALIDATE_TIME } from "../constants"

import { fetchEvents } from "@/lib/api/fetchEvents"
import peopleImage from "@/public/images/people-learning.png"

const loadData = dataLoader([["events", fetchEvents]], REVALIDATE_TIME * 1000)

const Page = async ({ params }: { params: PageParams }) => {
  const { locale } = params

  const [events] = await loadData()

  // Filter to meetups only
  const meetups = events.filter((e) => e.eventType === "meetup")

  const t = await getTranslations({
    locale,
    namespace: "page-community-events",
  })

  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/community/events")
  const messages = pick(allMessages, requiredNamespaces)

  return (
    <I18nProvider locale={locale} messages={messages}>
      <ContentHero
        breadcrumbs={{ slug: "/community/events/meetups" }}
        title={t("page-events-meetups-hero-title")}
        description={t("page-events-hero-subtitle")}
        heroImg={peopleImage}
      />

      <MainArticle className="flex flex-col gap-16 px-4 py-10 md:px-8">
        {/* Find events near you */}
        {/* <SearchSection
          title={t("page-events-section-find-events")}
          subtitle={t("page-events-section-find-events-subtitle")}
          placeholder={t("page-events-search-placeholder")}
          locale={locale}
        /> */}

        {/* All meetups - GRID view */}
        <Section>
          <div className="mb-6">
            <h2 className="text-3xl font-bold">
              {t("page-events-section-local-meetups")}
            </h2>
            <p className="mt-2 text-body-medium">
              {t("page-events-section-local-meetups-subtitle")}
            </p>
          </div>
          {meetups.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              variant="grid"
              locale={locale}
            />
          ))}
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
  const { locale } = params
  const t = await getTranslations({
    locale,
    namespace: "page-community-events",
  })

  const year = new Date().getFullYear()

  return await getMetadata({
    locale,
    slug: ["community", "events", "meetups"],
    title: t("page-events-meetups-hero-title"),
    description: t("page-events-meta-description", { year }),
  })
}

export default Page
