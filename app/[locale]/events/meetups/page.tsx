import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import { PageParams } from "@/lib/types"

import Breadcrumbs from "@/components/Breadcrumbs"
import { SimpleHero } from "@/components/Hero"
import I18nProvider from "@/components/I18nProvider"
import MainArticle from "@/components/MainArticle"

import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import eventsData from "@/data/events.json"

import MeetupsList from "./_components/MeetupsList"
import MeetupsSearch from "./_components/MeetupsSearch"
import OrganizerCTA from "./_components/OrganizerCTA"

import type { CommunityEvent } from "@/lib/events/types"

const Page = async ({ params }: { params: PageParams }) => {
  const { locale } = params

  setRequestLocale(locale)

  // Get translations
  const t = await getTranslations({ locale, namespace: "page-events" })

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/events")
  const messages = pick(allMessages, [...requiredNamespaces, "page-events"])

  // Filter meetups and recurring events
  const events = eventsData as CommunityEvent[]
  const meetups = events.filter(
    (e) =>
      e.eventType === "meetup" ||
      e.eventType === "workshop" ||
      e.eventType === "coworking" ||
      e.isRecurring
  )

  return (
    <I18nProvider locale={locale} messages={messages}>
      <SimpleHero
        breadcrumbs={<Breadcrumbs slug={"/events/meetups"} />}
        title={t("page-events-local-meetups")}
        subtitle={t("page-events-find-near-you-description")}
      />

      <MainArticle className="flex flex-col gap-16 py-10 md:gap-24">
        {/* Search section */}
        <section className="flex flex-col gap-8 px-4 md:px-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold">
              {t("page-events-find-near-you")}
            </h2>
            <p className="text-body-medium">
              {t("page-events-find-near-you-description")}
            </p>
          </div>
          <MeetupsSearch />
        </section>

        {/* Meetups grid */}
        <section className="flex flex-col gap-8 px-4 md:px-8">
          <MeetupsList events={meetups} />
        </section>

        {/* Organizer CTA */}
        <section className="px-4 md:px-8">
          <OrganizerCTA />
        </section>
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
  const t = await getTranslations({ locale, namespace: "page-events" })

  return await getMetadata({
    locale,
    slug: ["events", "meetups"],
    title: t("page-events-local-meetups"),
    description: t("page-events-meta-description"),
  })
}

export default Page
