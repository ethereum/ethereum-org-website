import { pick } from "lodash"
import { getMessages, getTranslations } from "next-intl/server"

import type { PageParams } from "@/lib/types"

import { Section } from "@/components/atoms/section"
import MainArticle from "@/components/molecules/MainArticle"
import ContentHero from "@/components/organisms/Hero/ContentHero"
import I18nProvider from "@/components/providers/I18nProvider"

import { getLocaleYear } from "@/lib/utils/date"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import OrganizerCTA from "../_components/OrganizerCTA"
import { getMeetupGroups, mapEventTranslations } from "../utils"

import FilterMeetups from "./_components/FilterMeetups"

import { getEventsData } from "@/lib/data"

const Page = async ({ params }: { params: PageParams }) => {
  const { locale } = params

  const _events = (await getEventsData()) ?? []

  const t = await getTranslations({
    locale,
    namespace: "page-community-events",
  })

  // Apply translations and compute eventTypes from tags if missing
  const events = mapEventTranslations(_events, t)

  // Combine API meetup events with legacy meetup groups
  // Exclude conferences and hackathons - they have their own section
  const apiMeetups = events.filter(
    (e) =>
      !e.eventTypes?.includes("conference") &&
      !e.eventTypes?.includes("hackathon")
  )
  const meetupGroups = getMeetupGroups()
  // Show API meetups first (sorted by date), then groups (sorted alphabetically)
  const meetups = [...apiMeetups, ...meetupGroups]

  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/community/events")
  const messages = pick(allMessages, requiredNamespaces)

  return (
    <>
      <ContentHero
        breadcrumbs={{ slug: "/community/events/meetups" }}
        title={t("page-events-meetups-hero-title", {
          year: getLocaleYear(locale),
        })}
        description={t("page-events-meetups-hero-subtitle")}
        className="pb-0"
      />

      <MainArticle className="flex flex-col gap-16 px-4 py-10 md:px-8">
        <Section className="space-y-8">
          <div className="space-y-2">
            <h2 className="">{t("page-events-section-find-events")}</h2>
            <p className="">{t("page-events-meetups-events-subtitle")}</p>
          </div>
          {/* Client-side filter and list */}
          <I18nProvider locale={locale} messages={messages}>
            <FilterMeetups events={meetups} />
          </I18nProvider>
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
    title: t("page-events-meetups-hero-title", { year }),
    description: t("page-events-meta-description", { year }),
  })
}

export default Page
