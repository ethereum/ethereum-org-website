import { pick } from "lodash"
import { getMessages, getTranslations } from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import PageHero from "@/components/Hero/PageHero"
import I18nProvider from "@/components/I18nProvider"
import MainArticle from "@/components/MainArticle"
import { Section } from "@/components/ui/section"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getLocaleYear } from "@/lib/utils/date"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import OrganizerCTA from "../_components/organizer-cta"
import { getMeetupGroups, mapEventTranslations } from "../utils"

import FilterMeetups from "./_components/filter-meetups"
import PageJsonLD from "./page-jsonld"

import { getEventsData } from "@/lib/data"

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

  const _events = (await getEventsData()) ?? []

  const t = await getTranslations("page-community-events")

  // Apply translations and compute eventTypes from tags if missing
  const events = mapEventTranslations(_events, t, locale)

  // Combine API meetup events with legacy meetup groups
  // Exclude conferences and hackathons - they have their own section
  const apiMeetups = events.filter(
    (e) =>
      !e.eventTypes?.includes("conference") &&
      !e.eventTypes?.includes("hackathon")
  )
  const meetupGroups = getMeetupGroups(locale)
  // Show API meetups first (sorted by date), then groups (sorted alphabetically)
  const meetups = [...apiMeetups, ...meetupGroups]

  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/community/events")
  const messages = pick(allMessages, requiredNamespaces)

  const { contributors } = await getAppPageContributorInfo(
    "community/events/meetups",
    locale as Lang
  )

  return (
    <>
      <PageJsonLD
        locale={locale}
        contributors={contributors}
        meetups={meetups}
      />

      <PageHero
        breadcrumbs={{ slug: "/community/events/meetups" }}
        title={t("page-events-meetups-hero-title", {
          year: getLocaleYear(locale),
        })}
        description={t("page-events-meetups-hero-subtitle")}
      />

      <main className="px-page pt-page-2x pb-page">
        <MainArticle className="flow">
          <Section id="find-events">
            <h2>{t("page-events-section-find-events")}</h2>
            <p>{t("page-events-meetups-events-subtitle")}</p>
            {/* Client-side filter and list */}
            <I18nProvider locale={locale} messages={messages}>
              <FilterMeetups events={meetups} />
            </I18nProvider>
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
    slug: ["community", "events", "meetups"],
    title: t("page-events-meetups-hero-title", { year }),
    description: t("page-events-meta-description", { year }),
  })
}

export default Page
