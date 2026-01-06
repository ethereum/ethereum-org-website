import { pick } from "lodash"
import {
  Banknote,
  ChartNoAxesCombined,
  Handshake,
  Plus,
  Presentation,
} from "lucide-react"
import { getMessages, getTranslations } from "next-intl/server"

import type { PageParams, SectionNavDetails } from "@/lib/types"

import ContentHero from "@/components/Hero/ContentHero"
import I18nProvider from "@/components/I18nProvider"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Section } from "@/components/ui/section"
import TabNav, { StickyContainer } from "@/components/ui/TabNav"

import { dataLoader } from "@/lib/utils/data/dataLoader"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import communityHubs from "@/data/community-hubs"

import ContinentTabs from "./_components/ContinentTabs"
import EventCard from "./_components/EventCard"
import EventsSwiper from "./_components/EventsSwiper"
import HubCard from "./_components/HubCard"
import SearchSection from "./_components/SearchSection"
import { REVALIDATE_TIME, SECTION_IDS } from "./constants"

import { fetchEvents } from "@/lib/api/fetchEvents"
import heroImage from "@/public/images/enterprise-eth.png"
import organizerImage from "@/public/images/hackathon_transparent.png"

const loadData = dataLoader([["events", fetchEvents]], REVALIDATE_TIME * 1000)

const Page = async ({ params }: { params: PageParams }) => {
  const { locale } = params

  const [events] = await loadData()

  const t = await getTranslations({
    locale,
    namespace: "page-community-events",
  })

  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/community/events")
  const messages = pick(allMessages, requiredNamespaces)

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
      label: t(`page-events-nav-${SECTION_IDS.hubs}`),
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
    <I18nProvider locale={locale} messages={messages}>
      <ContentHero
        breadcrumbs={{ slug: "/community/events" }}
        title={t("page-events-hero-title", { year: new Date().getFullYear() })}
        description={t("page-events-hero-subtitle")}
        heroImg={heroImage}
      />

      {/* What's on this page? + TabNav */}
      <StickyContainer className="top-2 space-y-4 p-4 md:p-8">
        <p className="">{t("page-events-whats-on-page")}</p>
        <TabNav sections={sections} className="justify-start [&>nav]:mx-0" />
      </StickyContainer>

      <MainArticle className="space-y-20 px-4 py-10 md:px-8">
        {/* Major blockchain conferences */}
        <Section>
          <h2 className="mb-6 font-bold">
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

        {/* Ethereum community hubs */}
        <Section
          id={SECTION_IDS.hubs}
          scrollMargin="tabNav"
          className="space-y-8"
        >
          <div className="space-y-2">
            <h2>{t("page-events-section-hubs")}</h2>
            <p>{t("page-events-section-hubs-subtitle")}</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {communityHubs.map((hub) => (
              <HubCard key={hub.id} hub={hub} className="rounded-4xl" />
            ))}
          </div>
          <ButtonLink
            href="#"
            variant="outline"
            className="w-full gap-2 rounded-4xl border-body-light p-4"
          >
            <div className="rounded-full border border-dashed border-primary p-4">
              <Plus className="size-4" />
            </div>
            {t("page-events-hub-apply-cta")}
          </ButtonLink>
          {/* <div className="mt-8 flex justify-center">
          </div> */}
        </Section>

        {/* Find events near you */}
        <SearchSection
          title={t("page-events-section-find-events")}
          subtitle={t("page-events-section-find-events-subtitle")}
          placeholder={t("page-events-search-placeholder")}
          locale={locale}
        />

        {/* Local Ethereum community meetups */}
        <Section id={SECTION_IDS.meetups} scrollMargin="tabNav">
          <div className="mb-6">
            <h2>{t("page-events-section-local-meetups")}</h2>
            <p className="mt-2 text-body-medium">
              {t("page-events-section-local-meetups-subtitle")}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {meetups.slice(0, 8).map((event) => (
              <EventCard
                key={event.id}
                event={event}
                variant="grid"
                locale={locale}
              />
            ))}
          </div>
        </Section>

        {/* Upcoming Ethereum conferences - TABLE/ROW view */}
        <Section id={SECTION_IDS.conferences} scrollMargin="tabNav">
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
            seeAllLabel={t("page-events-see-all")}
            displayMode="row"
            showCounts={true}
            showSeeAll={true}
            maxEvents={10}
          />
        </Section>

        {/* For event organizers */}
        <Section id={SECTION_IDS.organizers} scrollMargin="tabNav">
          <div className="mb-6">
            <h2 className="text-3xl font-bold">
              {t("page-events-section-organizers")}
            </h2>
            <p className="mt-2 text-body-medium">
              {t("page-events-section-organizers-subtitle")}
            </p>
          </div>
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="flex size-32 shrink-0 items-center justify-center md:size-40">
              <Image
                src={organizerImage}
                alt="Planning an event"
                width={160}
                height={160}
                className="object-contain"
              />
            </div>
            <div>
              <h3 className="mb-2 text-xl font-bold">
                {t("page-events-section-organizers-planning")}
              </h3>
              <p className="mb-4 text-body-medium">
                {t("page-events-section-organizers-planning-description")}
              </p>
              <ButtonLink href="https://ethereum.org/community/events/organizing">
                {t("page-events-section-organizers-planning-cta")}
              </ButtonLink>
            </div>
          </div>
        </Section>

        {/* Looking for support? */}
        <Section>
          <div className="mb-6">
            <h2 className="text-3xl font-bold">
              {t("page-events-section-support")}
            </h2>
            <p className="mt-2 text-body-medium">
              {t("page-events-section-support-subtitle")}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Ethereum Everywhere Card */}
            <div className="flex flex-col rounded-2xl bg-primary-low-contrast/30 p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-full bg-primary/20">
                  <span className="text-2xl">✦</span>
                </div>
                <h3 className="text-xl font-bold">
                  {t("page-events-support-ethereum-everywhere")}
                </h3>
              </div>
              <p className="mb-6 text-body-medium">
                {t("page-events-support-ethereum-everywhere-description")}
              </p>

              <div className="mb-4">
                <h4 className="mb-1 font-bold">
                  {t("page-events-support-ethereum-everywhere-guidance")}
                </h4>
                <p className="text-sm text-body-medium">
                  {t(
                    "page-events-support-ethereum-everywhere-guidance-description"
                  )}
                </p>
              </div>

              <div className="mb-4">
                <h4 className="mb-1 font-bold">
                  {t("page-events-support-ethereum-everywhere-resources")}
                </h4>
                <p className="text-sm text-body-medium">
                  {t(
                    "page-events-support-ethereum-everywhere-resources-description"
                  )}
                </p>
              </div>

              <div className="mb-6">
                <h4 className="mb-1 font-bold">
                  {t("page-events-support-ethereum-everywhere-connections")}
                </h4>
                <p className="text-sm text-body-medium">
                  {t(
                    "page-events-support-ethereum-everywhere-connections-description"
                  )}
                </p>
              </div>

              <div className="mt-auto">
                <ButtonLink href="https://ethereum-everywhere.com">
                  {t("page-events-get-in-touch")}
                </ButtonLink>
              </div>
            </div>

            {/* Geode Labs Card */}
            <div className="flex flex-col rounded-2xl bg-[#E8F4F8] p-6 dark:bg-[#1a3a4a]">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-full bg-[#0EA5E9]/20">
                  <span className="text-2xl">🌐</span>
                </div>
                <h3 className="text-xl font-bold">
                  {t("page-events-support-geode-labs")}
                </h3>
              </div>
              <p className="mb-6 text-body-medium">
                {t("page-events-support-geode-labs-description")}
              </p>

              <div className="mb-4">
                <a
                  href="https://geodelabs.org/grants"
                  className="mb-1 font-bold text-primary hover:underline"
                >
                  {t("page-events-support-geode-labs-grants")}
                </a>
                <p className="text-sm text-body-medium">
                  {t("page-events-support-geode-labs-grants-description")}
                </p>
              </div>

              <div className="mb-4">
                <a
                  href="https://localethereum.com"
                  className="mb-1 font-bold text-primary hover:underline"
                >
                  {t("page-events-support-geode-labs-local")}
                </a>
                <p className="text-sm text-body-medium">
                  {t("page-events-support-geode-labs-local-description")}
                </p>
              </div>

              <div className="mb-6">
                <a
                  href="https://ethstars.com"
                  className="mb-1 font-bold text-primary hover:underline"
                >
                  {t("page-events-support-geode-labs-ethstars")}
                </a>
                <p className="text-sm text-body-medium">
                  {t("page-events-support-geode-labs-ethstars-description")}
                </p>
              </div>

              <div className="mt-auto">
                <ButtonLink href="https://geodelabs.org">
                  {t("page-events-get-in-touch")}
                </ButtonLink>
              </div>
            </div>
          </div>
        </Section>
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
    slug: ["community", "events"],
    title: t("page-events-meta-title", { year }),
    description: t("page-events-meta-description", { year }),
  })
}

export default Page
