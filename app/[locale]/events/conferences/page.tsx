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

import ConferencesFilters from "./_components/ConferencesFilters"
import ConferencesList from "./_components/ConferencesList"

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

  // Filter conferences and hackathons
  const events = eventsData as CommunityEvent[]
  const conferences = events.filter(
    (e) => e.eventType === "conference" || e.eventType === "hackathon"
  )

  // Get featured events
  const featuredEvents = conferences.filter((e) => e.isFeatured)

  return (
    <I18nProvider locale={locale} messages={messages}>
      <SimpleHero
        breadcrumbs={<Breadcrumbs slug={"/events/conferences"} />}
        title={t("page-events-upcoming-conferences")}
        subtitle={t("page-events-subtitle")}
      />

      <MainArticle className="flex flex-col gap-16 py-10 md:gap-24">
        {/* Featured conferences */}
        {featuredEvents.length > 0 && (
          <section className="flex flex-col gap-8 px-4 md:px-8">
            <h2 className="text-3xl font-bold">
              {t("page-events-major-conferences")}
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredEvents.map((event) => (
                <FeaturedEventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        )}

        {/* Filters and list */}
        <section className="flex flex-col gap-8 px-4 md:px-8">
          <ConferencesFilters />
          <ConferencesList events={conferences} />
        </section>
      </MainArticle>
    </I18nProvider>
  )
}

// Simple featured event card component
const FeaturedEventCard = ({ event }: { event: CommunityEvent }) => {
  return (
    <a
      href={event.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-4 rounded-lg border border-body-light bg-background p-4 transition-colors hover:border-primary"
    >
      <div className="aspect-[2/1] w-full overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 to-primary/5">
        {event.bannerUrl ? (
          <img
            src={event.bannerUrl}
            alt={event.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-4xl font-bold text-primary/50">
              {event.title.charAt(0)}
            </span>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-background-highlight">
          {event.imageUrl ? (
            <img
              src={event.imageUrl}
              alt={event.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-primary/10">
              <span className="text-xl font-bold text-primary">
                {event.title.charAt(0)}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="font-bold group-hover:text-primary">{event.title}</h3>
          <p className="text-sm text-body-medium">{event.location}</p>
          <p className="text-sm text-body-medium">
            {new Date(event.startDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}{" "}
            -{" "}
            {new Date(event.endDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    </a>
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
    slug: ["events", "conferences"],
    title: t("page-events-upcoming-conferences"),
    description: t("page-events-meta-description"),
  })
}

export default Page
