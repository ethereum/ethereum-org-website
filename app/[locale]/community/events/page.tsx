import { pick } from "lodash"
import {
  Banknote,
  ChartNoAxesCombined,
  Handshake,
  Plus,
  Presentation,
} from "lucide-react"
import { getMessages, getTranslations } from "next-intl/server"

import type {
  CommitHistory,
  Lang,
  PageParams,
  SectionNavDetails,
} from "@/lib/types"

import ContentHero from "@/components/Hero/ContentHero"
import I18nProvider from "@/components/I18nProvider"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import { ButtonLink } from "@/components/ui/buttons/Button"
import {
  EdgeScrollContainer,
  EdgeScrollItem,
} from "@/components/ui/edge-scroll-container"
import Link from "@/components/ui/Link"
import { Section } from "@/components/ui/section"
import TabNav, { StickyContainer } from "@/components/ui/TabNav"

import { cn } from "@/lib/utils/cn"
import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { dataLoader } from "@/lib/utils/data/dataLoader"
import { getLocaleYear } from "@/lib/utils/date"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import communityHubs from "@/data/community-hubs"

import ContinentTabs from "./_components/ContinentTabs"
import EventCard from "./_components/EventCard"
import FilterEvents from "./_components/FilterEvents"
import { REVALIDATE_TIME, SECTION_IDS } from "./constants"
import EventsJsonLD from "./page-jsonld"
import { mapEventTranslations } from "./utils"

import { fetchEvents } from "@/lib/api/fetchEvents"
import ethereumEverywhereLogo from "@/public/images/community/ethereum-everywhere-logo.png"
import geodeLabsLogo from "@/public/images/community/geode-labs-logo.png"
import heroImage from "@/public/images/enterprise-eth.png"
import organizerImage from "@/public/images/people-learning.png"

const loadData = dataLoader([["events", fetchEvents]], REVALIDATE_TIME * 1000)

const Page = async ({ params }: { params: PageParams }) => {
  const { locale } = params

  const [_events] = await loadData()

  const t = await getTranslations({
    locale,
    namespace: "page-community-events",
  })

  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/community/events")
  const messages = pick(allMessages, requiredNamespaces)

  const commitHistoryCache: CommitHistory = {}
  const { contributors } = await getAppPageContributorInfo(
    "community/events",
    locale as Lang,
    commitHistoryCache
  )

  const events = mapEventTranslations(_events, t)

  // Get highlighted conferences (with highlight flag or first 3)
  const conferences = events.filter(
    (e) => e.eventType === "conference" || e.eventType === "hackathon"
  )
  const highlightedConferences = conferences
    .filter((e) => e.highlight)
    .slice(0, 3)
    .concat(conferences.filter((e) => !e.highlight))
    .slice(0, 3)

  // Get meetups
  const meetups = events.filter((e) => e.eventType === "meetup")

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

  // TabNav sections with translated labels
  const sections: SectionNavDetails[] = [
    {
      key: SECTION_IDS.hubs,
      label: `${t(`page-events-nav-${SECTION_IDS.hubs}`)} (${communityHubs.length})`,
      icon: <ChartNoAxesCombined />,
    },
    {
      key: SECTION_IDS.meetups,
      label: `${t(`page-events-nav-${SECTION_IDS.meetups}`)} (${meetups.length})`,
      icon: <Presentation />,
    },
    {
      key: SECTION_IDS.conferences,
      label: `${t(`page-events-nav-${SECTION_IDS.conferences}`)} (${conferences.length})`,
      icon: <Banknote />,
    },
    {
      key: SECTION_IDS.organizers,
      label: t(`page-events-nav-${SECTION_IDS.organizers}`),
      icon: <Handshake />,
    },
  ]

  return (
    <>
      <EventsJsonLD locale={locale} contributors={contributors} />
      <I18nProvider locale={locale} messages={messages}>
        <ContentHero
          breadcrumbs={{ slug: "/community/events" }}
          title={t("page-events-hero-title", { year: getLocaleYear(locale) })}
          description={t("page-events-hero-subtitle")}
          heroImg={heroImage}
          className="max-lg:flex max-lg:flex-col-reverse"
        />

        {/* What's on this page? + TabNav */}
        <StickyContainer className="top-6 space-y-4 p-4 md:top-2 md:p-8">
          <p className="">{t("page-events-whats-on-page")}</p>
          {/* // TODO: Matomo tracking for usage of nav bar */}
          <TabNav sections={sections} className="justify-start [&>nav]:mx-0" />
        </StickyContainer>

        <MainArticle className="space-y-20 px-4 py-10 md:px-8">
          {/* Major blockchain conferences */}
          <Section>
            <h2 className="mb-6 font-bold">
              {t("page-events-section-major-conferences")}
            </h2>
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
                  />
                </EdgeScrollItem>
              ))}
            </EdgeScrollContainer>
          </Section>

          {/* Ethereum community hubs */}
          <Section
            id={SECTION_IDS.hubs}
            scrollMargin="tabNav"
            className="space-y-8"
          >
            <div className="space-y-2">
              <h2>{t("page-events-section-hubs")}</h2>
              <p className="max-w-4xl">
                {t("page-events-section-hubs-subtitle")}
              </p>
            </div>
            <EdgeScrollContainer>
              {communityHubs.map(
                ({
                  id,
                  location,
                  descriptionKey,
                  ctaKey,
                  coworkingSignupUrl,
                  meetupUrl,
                  banner,
                  logoBgColor,
                }) => (
                  <EdgeScrollItem
                    key={id}
                    className={cn(
                      "ms-6 w-[calc(100%-4rem)] max-w-96 md:w-96",
                      "flex flex-col justify-between gap-4 rounded-4xl border border-body-light p-8 shadow-lg",
                      logoBgColor
                    )}
                  >
                    <div className="space-y-2">
                      <div className="grid size-fit shrink-0 place-items-center overflow-hidden rounded-full">
                        <Image
                          src={banner}
                          alt=""
                          className="size-24 object-cover object-center"
                          sizes="6rem"
                        />
                      </div>
                      <h3 className="text-2xl font-bold">{location}</h3>
                      <div className="space-y-[1lh]">
                        <p>{t(descriptionKey)}</p>
                        <p>{t(ctaKey)}</p>
                      </div>
                    </div>
                    <div className="mt-auto flex justify-between gap-6">
                      <Link href={coworkingSignupUrl} className="font-bold">
                        {t("page-events-hub-cowork-signup")}
                      </Link>
                      <Link href={meetupUrl} className="font-bold">
                        {t("page-events-hub-meetups")}
                      </Link>
                    </div>
                  </EdgeScrollItem>
                )
              )}
            </EdgeScrollContainer>
            <div className="md:px-4">
              <ButtonLink
                href="https://esp.ethereum.foundation/applicants/rfp/community-hubs"
                variant="outline"
                className="group w-full gap-2 rounded-4xl border-body-light p-5"
              >
                <div className="rounded-full border border-dashed border-primary p-3">
                  <Plus className="size-4 transition-transform group-hover:scale-150 group-hover:transition-transform" />
                </div>
                {t("page-events-hub-apply-cta")}
              </ButtonLink>
            </div>
          </Section>

          {/* Find events near you */}
          <Section className="rounded-t-[4rem] bg-gradient-banner px-6 py-12 md:px-12 md:py-16 dark:bg-radial-b">
            <div className="space-y-6">
              <div className="space-y-2 text-center">
                <h2>{t("page-events-section-find-events")}</h2>
                <p className="mx-auto max-w-2xl">
                  {t("page-events-section-find-events-subtitle")}
                </p>
              </div>

              <FilterEvents events={[...meetups, ...conferences]} />
            </div>
          </Section>

          {/* Local Ethereum community meetups */}
          <Section
            id={SECTION_IDS.meetups}
            scrollMargin="tabNav"
            className="space-y-6"
          >
            <div className="space-y-2">
              <h2>{t("page-events-section-local-meetups")}</h2>
              <p className="max-w-4xl">
                {t("page-events-section-local-meetups-subtitle")}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {meetups.slice(0, 6).map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  variant="grid"
                  locale={locale}
                />
              ))}
            </div>
            <div className="flex justify-center">
              <ButtonLink href="/community/events/meetups/" size="lg">
                {t("page-events-see-all")} ({meetups.length})
              </ButtonLink>
            </div>
          </Section>

          {/* Upcoming Ethereum conferences - TABLE/ROW view */}
          <Section
            id={SECTION_IDS.conferences}
            scrollMargin="tabNav"
            className="space-y-20"
          >
            <div className="space-y-4">
              <h2 className="text-3xl md:text-center md:text-5xl">
                {t("page-events-section-upcoming-conferences")}
              </h2>
              <p className="mx-auto max-w-4xl md:text-center">
                {t("page-events-section-upcoming-conferences-subtitle")}
              </p>
            </div>
            <ContinentTabs
              events={conferences}
              labels={continentLabels}
              locale={locale}
              noEventsMessage={t("page-events-no-upcoming")}
              onlineLabel={t("page-events-tag-online")}
              maxEvents={8}
            />
            <div className="flex justify-center">
              <ButtonLink href="/community/events/conferences/" size="lg">
                {t("page-events-see-all")} ({conferences.length})
              </ButtonLink>
            </div>
          </Section>

          {/* For event organizers */}
          <Section
            id={SECTION_IDS.organizers}
            scrollMargin="tabNav"
            className="space-y-4"
          >
            <h2>{t("page-events-section-organizers")}</h2>
            <p>{t("page-events-section-organizers-subtitle")}</p>
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <div className="size-44 shrink-0">
                <Image
                  src={organizerImage}
                  alt="Planning an event"
                  sizes="11rem"
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="mb-2 text-xl font-bold">
                  {t("page-events-section-organizers-planning")}
                </h3>
                <p className="mb-4 max-w-4xl">
                  {t("page-events-section-organizers-planning-description")}
                </p>
                <ButtonLink href="/community/events/organizing" size="lg">
                  {t("page-events-section-organizers-planning-cta")}
                </ButtonLink>
              </div>
            </div>
          </Section>

          {/* Looking for support? */}
          <Section className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl">{t("page-events-section-support")}</h2>
              <p className="max-w-4xl">
                {t("page-events-section-support-subtitle")}
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {/* Ethereum Everywhere Card */}
              <div className="flex flex-col gap-y-8 rounded-4xl bg-gradient-to-b from-accent-a/5 to-accent-a/15 px-4 py-6 md:p-12 dark:from-accent-a/10 dark:to-accent-a/20">
                <div className="flex items-center gap-3">
                  <div className="size-16 overflow-hidden rounded-full">
                    <Image
                      src={ethereumEverywhereLogo}
                      alt={t("item-logo", { name: "Ethereum Everywhere" })}
                      sizes="4rem"
                    />
                  </div>
                  <h3 className="text-xl font-bold">
                    {t("page-events-support-ethereum-everywhere")}
                  </h3>
                </div>

                <div className="space-y-[1lh]">
                  <p>
                    {t("page-events-support-ethereum-everywhere-description")}
                  </p>

                  <div className="space-y-1">
                    <p className="font-bold">
                      {t("page-events-support-ethereum-everywhere-guidance")}
                    </p>
                    <p>
                      {t(
                        "page-events-support-ethereum-everywhere-guidance-description"
                      )}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="font-bold">
                      {t("page-events-support-ethereum-everywhere-resources")}
                    </p>
                    <p>
                      {t(
                        "page-events-support-ethereum-everywhere-resources-description"
                      )}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="font-bold">
                      {t("page-events-support-ethereum-everywhere-connections")}
                    </p>
                    <p>
                      {t(
                        "page-events-support-ethereum-everywhere-connections-description"
                      )}
                    </p>
                  </div>
                </div>

                <ButtonLink
                  href="https://docs.google.com/forms/d/e/1FAIpQLSeA-W8iy2PJxrY3TD4lMYXyky_wLd4QB_7NRwqSxCd0e19MUg/viewform"
                  size="lg"
                  className="mt-auto w-fit"
                >
                  {t("page-events-get-in-touch")}
                </ButtonLink>
              </div>

              {/* Geode Labs Card */}
              <div className="flex flex-col gap-y-8 rounded-4xl bg-gradient-to-b from-accent-c/5 to-accent-c/15 px-4 py-6 md:p-12 dark:from-accent-c/10 dark:to-accent-c/20">
                <div className="flex items-center gap-3">
                  <div className="size-16 overflow-hidden rounded-full">
                    <Image
                      src={geodeLabsLogo}
                      alt={t("item-logo", { name: "GeodeLabs" })}
                      sizes="4rem"
                    />
                  </div>
                  <h3 className="text-xl font-bold">
                    {t("page-events-support-geode-labs")}
                  </h3>
                </div>
                <div className="space-y-[1lh] [&_a]:no-underline">
                  <p>{t("page-events-support-geode-labs-description")}</p>

                  <div>
                    <Link
                      href="https://geode.build/grants"
                      className="font-bold"
                    >
                      {t("page-events-support-geode-labs-grants")}
                    </Link>
                    <p>
                      {t("page-events-support-geode-labs-grants-description")}
                    </p>
                  </div>

                  <div>
                    <Link
                      href="https://localethereum.substack.com/"
                      className="font-bold"
                    >
                      {t("page-events-support-geode-labs-local")}
                    </Link>
                    <p>
                      {t("page-events-support-geode-labs-local-description")}
                    </p>
                  </div>

                  <div>
                    <Link href="https://ethstars.xyz" className="font-bold">
                      {t("page-events-support-geode-labs-ethstars")}
                    </Link>
                    <p>
                      {t("page-events-support-geode-labs-ethstars-description")}
                    </p>
                  </div>
                </div>

                <ButtonLink
                  href="https://geode.build/"
                  size="lg"
                  className="mt-auto w-fit"
                >
                  {t("page-events-get-in-touch")}
                </ButtonLink>
              </div>
            </div>
          </Section>
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
  const t = await getTranslations({
    locale,
    namespace: "page-community-events",
  })

  const year = getLocaleYear(locale)

  return await getMetadata({
    locale,
    slug: ["community", "events"],
    title: t("page-events-meta-title", { year }),
    description: t("page-events-meta-description", { year }),
  })
}

export default Page
