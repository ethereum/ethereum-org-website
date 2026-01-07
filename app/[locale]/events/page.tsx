import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import { CommitHistory, Lang, PageParams } from "@/lib/types"

import Breadcrumbs from "@/components/Breadcrumbs"
import { SimpleHero } from "@/components/Hero"
import I18nProvider from "@/components/I18nProvider"
import MainArticle from "@/components/MainArticle"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import hubsData from "@/data/community-hubs.json"
import eventsData from "@/data/events.json"

import CommunityHubs from "./_components/CommunityHubs"
import EventsGrid from "./_components/EventsGrid"
import LocalMeetups from "./_components/LocalMeetups"
import OrganizerSection from "./_components/OrganizerSection"
import EventsJsonLD from "./page-jsonld"

import type { CommunityEvent, CommunityHub } from "@/lib/events/types"

const Page = async ({ params }: { params: PageParams }) => {
  const { locale } = params

  setRequestLocale(locale)

  // Get translations
  const t = await getTranslations({ locale, namespace: "page-events" })

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/events")
  const messages = pick(allMessages, [...requiredNamespaces, "page-events"])

  const commitHistoryCache: CommitHistory = {}
  const { contributors } = await getAppPageContributorInfo(
    "events",
    locale as Lang,
    commitHistoryCache
  )

  // Filter events
  const events = eventsData as CommunityEvent[]
  const hubs = hubsData as CommunityHub[]

  const upcomingEvents = events
    .filter((e) => new Date(e.startDate) >= new Date())
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    )
  const meetups = events.filter(
    (e) => e.eventType === "meetup" || e.isRecurring
  )

  return (
    <>
      <EventsJsonLD locale={locale} contributors={contributors} />
      <I18nProvider locale={locale} messages={messages}>
        <SimpleHero
          breadcrumbs={<Breadcrumbs slug={"/events"} />}
          title={t("page-events-title")}
          subtitle={t("page-events-subtitle")}
        />

        <MainArticle className="flex flex-col gap-16 py-10 md:gap-24">
          {/* Community hubs */}
          <section id="hubs" className="flex flex-col gap-8 px-4 md:px-8">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-bold md:text-4xl">
                {t("page-events-community-hubs")}
              </h2>
              <p className="max-w-3xl text-body-medium">
                {t("page-events-community-hubs-description")}
              </p>
            </div>
            <CommunityHubs hubs={hubs} />
          </section>

          {/* Events grid */}
          <section
            id="conferences"
            className="flex flex-col gap-8 px-4 md:px-8"
          >
            <h2 className="text-3xl font-bold md:text-4xl">
              {t("page-events-upcoming-conferences")}
            </h2>
            <EventsGrid events={upcomingEvents} />
          </section>

          {/* Add event notice */}
          <section className="flex flex-col gap-4 px-4 md:px-8">
            <p className="text-body-medium">
              {t("page-events-organising-event-description")}{" "}
              <a
                href="https://github.com/ethereum/ethereum-org-website/issues/new?template=suggest_event.yaml"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {t("page-events-add-event")}
              </a>
            </p>
          </section>

          {/* Ethereum meetups */}
          <section id="meetups" className="flex flex-col gap-8 px-4 md:px-8">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-bold md:text-4xl">
                {t("page-events-local-meetups")}
              </h2>
              <p className="text-body-medium">
                {t("page-events-local-meetups-subtitle")}
              </p>
            </div>
            <LocalMeetups events={meetups} />
          </section>

          {/* For organizers */}
          <section id="organizers" className="flex flex-col gap-8 px-4 md:px-8">
            <OrganizerSection />
          </section>
        </MainArticle>
      </I18nProvider>
    </>
  )
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}) {
  const { locale } = params
  const t = await getTranslations({ locale, namespace: "page-events" })

  return await getMetadata({
    locale,
    slug: ["events"],
    title: t("page-events-meta-title"),
    description: t("page-events-meta-description"),
  })
}

export default Page
