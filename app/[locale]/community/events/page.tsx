import { pick } from "lodash"
import {
  Banknote,
  ChartNoAxesCombined,
  Handshake,
  Plus,
  Presentation,
} from "lucide-react"
import { getMessages, getTranslations } from "next-intl/server"

import type { Lang, PageParams, SectionNavDetails } from "@/lib/types"

import PageHero from "@/components/Hero/PageHero"
import I18nProvider from "@/components/I18nProvider"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  EdgeScrollContainer,
  EdgeScrollItem,
} from "@/components/ui/edge-scroll-container"
import { Grid } from "@/components/ui/grid"
import Link from "@/components/ui/Link"
import { Section } from "@/components/ui/section"
import TabNav, { StickyContainer } from "@/components/ui/TabNav"
import { Tag } from "@/components/ui/tag"

import { cn } from "@/lib/utils/cn"
import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getLocaleYear } from "@/lib/utils/date"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import communityHubs from "@/data/community-hubs"

import ContinentTabs from "./_components/continent-tabs"
import EventCard from "./_components/event-card"
import FilterEvents from "./_components/filter-events"
import { SECTION_IDS } from "./constants"
import PageJsonLD from "./page-jsonld"
import { getMeetupGroups, mapEventTranslations } from "./utils"

import { getEventsData } from "@/lib/data"
import ethereumEverywhereLogo from "@/public/images/community/ethereum-everywhere-logo.png"
import geodeLabsLogo from "@/public/images/community/geode-labs-logo.png"
import heroImage from "@/public/images/enterprise-eth.png"
import organizerImage from "@/public/images/people-learning.png"

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

  const _events = (await getEventsData()) ?? []

  const t = await getTranslations("page-community-events")

  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/community/events")
  const messages = pick(allMessages, requiredNamespaces)

  const { contributors } = await getAppPageContributorInfo(
    "community/events",
    locale as Lang
  )

  const events = mapEventTranslations(_events, t, locale)

  // Get highlighted conferences (with highlight flag or first 3)
  const conferences = events.filter(
    (e) =>
      e.eventTypes?.includes("conference") ||
      e.eventTypes?.includes("hackathon")
  )
  const highlightedConferences = conferences
    .filter((e) => e.highlight)
    .slice(0, 3)
    .concat(conferences.filter((e) => !e.highlight))
    .slice(0, 3)

  // Get meetups (API events first, then groups)
  // Exclude conferences and hackathons - they have their own section
  const apiMeetups = events.filter(
    (e) =>
      !e.eventTypes?.includes("conference") &&
      !e.eventTypes?.includes("hackathon")
  )
  const meetupGroups = getMeetupGroups(locale)
  const meetups = [...apiMeetups, ...meetupGroups]

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
      <PageJsonLD locale={locale} contributors={contributors} />

      <PageHero
        breadcrumbs={{ slug: "/community/events" }}
        heroImg={heroImage}
        title={t("page-events-hero-title", { year: getLocaleYear(locale) })}
        description={t("page-events-hero-subtitle")}
      />

      {/* What's on this page? + TabNav */}
      <StickyContainer className="top-6 space-y-4 p-4 md:top-2 md:p-8">
        <p>{t("page-events-whats-on-page")}</p>
        <TabNav
          sections={sections}
          className="justify-start [&>nav]:mx-0 [&>nav]:w-fit"
          customEventOptions={{
            eventCategory: "Events_navigation",
            eventAction: "Menu_top",
          }}
        />
      </StickyContainer>

      <main className="px-page pt-page-2x pb-page">
        <MainArticle className="flow **:[p]:max-w-3xl">
          {/* Major blockchain conferences */}
          <Section id="highlights">
            <h2>{t("page-events-section-major-conferences")}</h2>
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
                      eventCategory: "Events",
                      eventAction: "events_clicked",
                      eventName: "highlighted_conf",
                    }}
                  />
                </EdgeScrollItem>
              ))}
            </EdgeScrollContainer>
          </Section>

          {/* Ethereum community hubs */}
          <Section id={SECTION_IDS.hubs} scrollMargin="tabNav">
            <h2>{t("page-events-section-hubs")}</h2>
            <p className="max-w-4xl">
              {t("page-events-section-hubs-subtitle")}
            </p>
            <Grid columns={3} size="wider">
              {communityHubs.map(
                ({
                  id,
                  location,
                  descriptionKey,
                  cadenceKey,
                  coworkingSignupUrl,
                  meetupUrl,
                  banner,
                  brandColor,
                }) => (
                  <div
                    key={id}
                    className={cn(
                      "flex gap-4 rounded-4xl border p-6 shadow-lg sm:gap-6 sm:p-8",
                      brandColor
                    )}
                  >
                    <div className="size-16 shrink-0 overflow-hidden rounded-full sm:size-20">
                      <Image
                        src={banner}
                        alt=""
                        className="size-full object-cover object-center"
                        sizes="5rem"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-3">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                        <h3 className="text-2xl">
                          {location}
                          <span className="sr-only">
                            &nbsp;
                            {t("page-events-meta-ethereum-community-hub")}
                          </span>
                        </h3>
                        <Tag size="small" status="tag-green">
                          {t(cadenceKey)}
                        </Tag>
                      </div>
                      <p>{t(descriptionKey)}</p>
                      <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-2">
                        <Link
                          href={coworkingSignupUrl}
                          className="font-bold no-underline"
                          customEventOptions={{
                            eventCategory: "Events",
                            eventAction: "hubs",
                            eventName: `${location}_cowork`,
                          }}
                        >
                          {t("page-events-hub-cowork-signup")}
                        </Link>
                        <Link
                          href={meetupUrl}
                          className="font-bold no-underline"
                          customEventOptions={{
                            eventCategory: "Events",
                            eventAction: "hubs",
                            eventName: `${location}_meetup`,
                          }}
                        >
                          {t("page-events-hub-meetups")}
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              )}
            </Grid>
            <ButtonLink
              href="https://esp.ethereum.foundation/applicants/rfp/community-hubs"
              variant="outline"
              className="group w-full gap-2 rounded-4xl border-body-light p-5"
              customEventOptions={{
                eventCategory: "Events",
                eventAction: "hubs",
                eventName: "apply",
              }}
            >
              <div className="rounded-full border border-dashed border-primary p-3">
                <Plus className="size-4 transition-transform group-hover:scale-150 group-hover:transition-transform" />
              </div>
              {t("page-events-hub-apply-cta")}
            </ButtonLink>
          </Section>

          {/* Find events near you */}
          <Section
            id="search"
            className="rounded-t-[4rem] bg-gradient-banner px-6 py-12 text-center md:px-12 md:py-16 dark:bg-radial-b"
          >
            <h2>{t("page-events-section-find-events")}</h2>
            <p className="mx-auto max-w-2xl">
              {t("page-events-section-find-events-subtitle")}
            </p>

            <I18nProvider locale={locale} messages={messages}>
              <FilterEvents events={[...meetups, ...conferences]} />
            </I18nProvider>
          </Section>

          {/* Local Ethereum community meetups */}
          <Section id={SECTION_IDS.meetups} scrollMargin="tabNav">
            <h2>{t("page-events-section-local-meetups")}</h2>
            <p className="max-w-4xl">
              {t("page-events-section-local-meetups-subtitle")}
            </p>
            <Grid columns={3}>
              {meetups.slice(0, 6).map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  variant="grid"
                  locale={locale}
                  showTypeTag
                  customEventOptions={{
                    eventCategory: "Events",
                    eventAction: "events_clicked",
                    eventName: "meetups",
                  }}
                />
              ))}
            </Grid>
            <div className="flex justify-center">
              <ButtonLink
                href="/community/events/meetups/"
                size="lg"
                className="max-md:w-full"
                customEventOptions={{
                  eventCategory: "Events_navigation",
                  eventAction: "subpages",
                  eventName: "meetups",
                }}
              >
                {t("page-events-see-all")} ({meetups.length})
              </ButtonLink>
            </div>
          </Section>

          {/* Upcoming Ethereum conferences - TABLE/ROW view */}
          <Section id={SECTION_IDS.conferences} scrollMargin="tabNav">
            <h2 className="text-h1 md:text-center">
              {t("page-events-section-upcoming-conferences")}
            </h2>
            <p className="mb-space-3x md:mx-auto md:text-center">
              {t("page-events-section-upcoming-conferences-subtitle")}
            </p>
            <ContinentTabs
              events={conferences}
              labels={continentLabels}
              locale={locale}
              noEventsMessage={t("page-events-no-upcoming")}
              onlineLabel={t("page-events-tag-online")}
              maxEvents={8}
              matomoNavOptions={{
                eventCategory: "Events_navigation",
                eventAction: "Menu_conference",
              }}
              matomoLinkOptions={{
                eventCategory: "Events",
                eventName: "regular_conf",
              }}
            />
            <p className="text-body-medium">
              {t.rich("page-events-data-source-callout", {
                a: (chunks) => (
                  <Link href="https://ethstars.xyz/">{chunks}</Link>
                ),
              })}
            </p>
            <div className="flex justify-center">
              <ButtonLink
                href="/community/events/conferences/"
                size="lg"
                className="max-md:w-full"
                customEventOptions={{
                  eventCategory: "Events_navigation",
                  eventAction: "subpages",
                  eventName: "conferences",
                }}
              >
                {t("page-events-see-all")} ({conferences.length})
              </ButtonLink>
            </div>
          </Section>

          {/* For event organizers */}
          <Section id={SECTION_IDS.organizers} scrollMargin="tabNav">
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
                <h3 className="mb-2 text-xl">
                  {t("page-events-section-organizers-planning")}
                </h3>
                <p className="mb-4 max-w-4xl">
                  {t("page-events-section-organizers-planning-description")}
                </p>
                <ButtonLink
                  href="/community/events/organizing"
                  size="lg"
                  className="max-md:w-full"
                  customEventOptions={{
                    eventCategory: "Events",
                    eventAction: "organizer",
                    eventName: "read_guide",
                  }}
                >
                  {t("page-events-section-organizers-planning-cta")}
                </ButtonLink>
              </div>
            </div>
          </Section>

          {/* Looking for support? */}
          <Section id="support">
            <h2>{t("page-events-section-support")}</h2>
            <p className="max-w-4xl">
              {t("page-events-section-support-subtitle")}
            </p>

            <Grid columns={2} size="wide">
              {/* Ethereum Everywhere Card */}
              <Card
                size="lg"
                hoverEffect="lift"
                className="bg-linear-to-b from-accent-a/5 to-accent-a/15 dark:from-accent-a/10 dark:to-accent-a/20"
              >
                <CardHeader className="flex items-center gap-3">
                  <div className="size-16 overflow-hidden rounded-full">
                    <Image src={ethereumEverywhereLogo} alt="" sizes="4rem" />
                  </div>
                  <h3 className="text-h4">
                    {t("page-events-support-ethereum-everywhere")}
                  </h3>
                </CardHeader>

                <CardContent>
                  <p>
                    {t("page-events-support-ethereum-everywhere-description")}
                  </p>

                  <p className="mb-space-half">
                    <strong>
                      {t("page-events-support-ethereum-everywhere-guidance")}
                    </strong>
                  </p>
                  <p>
                    {t(
                      "page-events-support-ethereum-everywhere-guidance-description"
                    )}
                  </p>

                  <p className="mb-space-half">
                    <strong>
                      {t("page-events-support-ethereum-everywhere-resources")}
                    </strong>
                  </p>
                  <p>
                    {t(
                      "page-events-support-ethereum-everywhere-resources-description"
                    )}
                  </p>

                  <p className="mb-space-half">
                    <strong>
                      {t("page-events-support-ethereum-everywhere-connections")}
                    </strong>
                  </p>
                  <p>
                    {t(
                      "page-events-support-ethereum-everywhere-connections-description"
                    )}
                  </p>
                </CardContent>

                <CardFooter>
                  <ButtonLink
                    href="https://docs.google.com/forms/d/e/1FAIpQLSeA-W8iy2PJxrY3TD4lMYXyky_wLd4QB_7NRwqSxCd0e19MUg/viewform"
                    size="lg"
                    className="lg:w-fit!"
                    customEventOptions={{
                      eventCategory: "Events",
                      eventAction: "organizer",
                      eventName: "EE_get_in_touch",
                    }}
                  >
                    {t("page-events-get-in-touch")}
                  </ButtonLink>
                </CardFooter>
              </Card>

              {/* Geode Labs Card */}
              <Card
                size="lg"
                hoverEffect="lift"
                className="bg-linear-to-b from-accent-c/5 to-accent-c/15 dark:from-accent-c/10 dark:to-accent-c/20"
              >
                <CardHeader className="flex items-center gap-3">
                  <div className="size-16 overflow-hidden rounded-full">
                    <Image src={geodeLabsLogo} alt="" sizes="4rem" />
                  </div>
                  <h3 className="text-h4">
                    {t("page-events-support-geode-labs")}
                  </h3>
                </CardHeader>

                <CardContent className="[&_a]:no-underline">
                  <p>{t("page-events-support-geode-labs-description")}</p>

                  <Link
                    href="https://geode.build/grants"
                    className="mb-space-half block font-bold"
                    customEventOptions={{
                      eventCategory: "Events",
                      eventAction: "organizer",
                      eventName: "geode_grants",
                    }}
                  >
                    {t("page-events-support-geode-labs-grants")}
                  </Link>
                  <p>
                    {t("page-events-support-geode-labs-grants-description")}
                  </p>

                  <Link
                    href="https://localethereum.substack.com/"
                    className="mb-space-half block font-bold"
                    customEventOptions={{
                      eventCategory: "Events",
                      eventAction: "organizer",
                      eventName: "geode_local",
                    }}
                  >
                    {t("page-events-support-geode-labs-local")}
                  </Link>
                  <p>{t("page-events-support-geode-labs-local-description")}</p>

                  <Link
                    href="https://ethstars.xyz"
                    className="mb-space-half block font-bold"
                    customEventOptions={{
                      eventCategory: "Events",
                      eventAction: "organizer",
                      eventName: "geode_stars",
                    }}
                  >
                    {t("page-events-support-geode-labs-ethstars")}
                  </Link>
                  <p>
                    {t("page-events-support-geode-labs-ethstars-description")}
                  </p>
                </CardContent>

                <CardFooter>
                  <ButtonLink
                    href="https://geode.build/"
                    size="lg"
                    className="lg:w-fit!"
                    customEventOptions={{
                      eventCategory: "Events",
                      eventAction: "organizer",
                      eventName: "Geode_get_in_touch",
                    }}
                  >
                    {t("page-events-get-in-touch")}
                  </ButtonLink>
                </CardFooter>
              </Card>
            </Grid>
          </Section>
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
    slug: ["community", "events"],
    title: t("page-events-meta-title", { year }),
    description: t("page-events-meta-description", { year }),
  })
}

export default Page
