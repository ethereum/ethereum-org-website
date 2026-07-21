import { pick } from "lodash"
import { HandCoins, MessageCircleHeart, Sparkles } from "lucide-react"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { Lang, PageParams } from "@/lib/types"

import ChecklistGrid, {
  type ChecklistGridItem,
} from "@/components/ChecklistGrid"
import ContentFeedback from "@/components/ContentFeedback"
import { HubHero } from "@/components/Hero"
import FloatingCard from "@/components/Homepage/FloatingCard"
import I18nProvider from "@/components/I18nProvider"
import Github from "@/components/icons/github.svg"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import { ButtonLink } from "@/components/ui/buttons/Button"
import Callout from "@/components/ui/callout"
import {
  Card,
  CardBanner,
  CardButtonFake,
  CardContent,
  CardFooter,
  CardHeader,
  CardIconContainer,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import { Grid } from "@/components/ui/grid"
import { Section, SectionContent } from "@/components/ui/section"

import { cn } from "@/lib/utils/cn"
import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getStoriesData } from "@/lib/utils/md"
import { getMetadata } from "@/lib/utils/metadata"
import { formatCompactNumber, numberFormat } from "@/lib/utils/numbers"
import { getVoicesStories } from "@/lib/utils/stories"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { redditCommunities } from "@/data/community/reddit-communities"

import CommunityStories from "../stories/_components/CommunityStories"

import EventCard from "./events/_components/event-card"
import { mapEventTranslations } from "./events/utils"
import PageJsonLD from "./page-jsonld"

import { getEventsData } from "@/lib/data"
import dogeComputerImg from "@/public/images/doge-computer.png"
import ethImg from "@/public/images/eth.png"
import heroImg from "@/public/images/heroes/community-hero.png"
import contributeImg from "@/public/images/three-people-cat-butterflies-petting-dog.png"

export default async function Page(props: { params: Promise<PageParams> }) {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const { contributors } = await getAppPageContributorInfo(
    "community",
    locale as Lang
  )

  const t = await getTranslations("page-community")
  const tEvents = await getTranslations("page-community-events")

  // Client story components (StoryCard / TagFilter) read the "common" and
  // "component-story-card" namespaces -- provide them for the voices grid.
  const allMessages = await getMessages({ locale })
  const messages = pick(
    allMessages,
    getRequiredNamespacesForPage("/community/")
  )

  const whyGetInvolvedCards = [
    {
      icon: <Sparkles />,
      title: t("page-community-why-get-involved-card-1-title"),
      description: t("page-community-why-get-involved-card-1-description"),
      cta: t("page-community-why-get-involved-card-1-cta"),
      href: "/community/events/",
    },
    {
      icon: <HandCoins />,
      title: t("page-community-why-get-involved-card-2-title"),
      description: t("page-community-why-get-involved-card-2-description"),
      cta: t("page-community-why-get-involved-card-2-cta"),
      href: "/community/get-involved#ethereum-jobs",
    },
    {
      icon: <MessageCircleHeart />,
      title: t("page-community-why-get-involved-card-3-title"),
      description: t("page-community-why-get-involved-card-3-description"),
      cta: t("page-community-why-get-involved-card-3-cta"),
      href: "/community/get-involved/",
    },
  ]

  const checklistItems: ChecklistGridItem[] = [
    {
      heading: t("page-community-get-paid-skill-title"),
      description: t("page-community-get-paid-skill-description"),
    },
    {
      heading: t("page-community-get-paid-idea-title"),
      description: t("page-community-get-paid-idea-description"),
    },
    {
      heading: t("page-community-get-paid-lasts-title"),
      description: t("page-community-get-paid-lasts-description"),
    },
    {
      heading: t("page-community-get-paid-sovereignty-title"),
      description: t("page-community-get-paid-sovereignty-description"),
    },
  ]

  // Upcoming conferences for the strip, reusing the events data + card.
  const rawEvents = (await getEventsData()) ?? []
  const events = mapEventTranslations(rawEvents, tEvents, locale)
  const conferences = events
    .filter(
      (e) =>
        e.eventTypes?.includes("conference") ||
        e.eventTypes?.includes("hackathon")
    )
    .slice(0, 6)

  const featuredStories = (await getStoriesData(locale))
    .filter((story) => story.image)
    .slice(0, 3)

  const voices = await getVoicesStories(locale)

  return (
    <>
      <PageJsonLD locale={locale} contributors={contributors} />

      <HubHero
        heroImg={heroImg}
        title={t("page-community-hero-title")}
        header={t("page-community-hero-header")}
        description={t("page-community-hero-subtitle")}
      />

      <main className="py-page">
        <MainArticle className="flow **:data-[label=button-link]:max-md:w-full *:[section]:px-page *:[section]:py-space-2x">
          {/* Why get involved */}
          <Section id="why-get-involved">
            <h2 className="md:text-center">
              {t("page-community-why-get-involved-title")}
            </h2>
            <Grid columns={3}>
              {whyGetInvolvedCards.map((card, idx) => (
                <Card key={idx} href={card.href} hoverLift>
                  <CardHeader>
                    <CardIconContainer>{card.icon}</CardIconContainer>
                  </CardHeader>
                  <CardContent>
                    <CardTitle>{card.title}</CardTitle>
                    <CardParagraph>{card.description}</CardParagraph>
                  </CardContent>
                  <CardFooter>
                    <CardButtonFake>{card.cta}</CardButtonFake>
                  </CardFooter>
                </Card>
              ))}
            </Grid>
          </Section>

          {/* Creator? Builder? Get paid for your work. */}
          <Section
            id="get-paid"
            data-flow="skip"
            className="grid gap-space-3x lg:grid-cols-2 lg:items-center"
          >
            <div className="flow">
              <h2>{t("page-community-open-source")}</h2>
              <p>{t("page-community-get-paid-subtitle")}</p>
              <div className="flex gap-4 max-md:flex-col max-md:items-start">
                <ButtonLink href="/community/grants/">
                  {t("page-community-explore-grants")}
                </ButtonLink>
                <ButtonLink
                  variant="outline"
                  href="/community/get-involved#ethereum-jobs"
                  isSecondary
                >
                  {t("page-community-find-a-job")}
                </ButtonLink>
              </div>
            </div>
            <ChecklistGrid items={checklistItems} />
          </Section>

          {/* Join an online community */}
          <Section id="online-communities">
            <div className="mx-auto flex max-w-2xl flex-col gap-3 md:text-center">
              <h2>{t("page-community-card-1-title")}</h2>
              <p className="text-lg text-body-medium">
                {t("page-community-card-1-description")}
              </p>
            </div>
            <Grid columns={3}>
              {redditCommunities.map((community) => (
                <Card
                  key={community.handle}
                  href={community.href}
                  variant="ghost"
                  hoverLift
                  size="sm"
                >
                  <CardHeader>
                    <CardBanner background="none" fit="cover" className="h-40">
                      <Image
                        src={community.banner}
                        alt=""
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      />
                    </CardBanner>
                  </CardHeader>
                  <CardContent className="flex gap-3 pt-6">
                    <Image
                      src={community.icon}
                      alt=""
                      width={64}
                      height={64}
                      className={cn("size-16 rounded-lg", community.iconClass)}
                      sizes="64x"
                    />
                    <div>
                      <CardTitle>{community.handle}</CardTitle>
                      <CardParagraph size="sm">
                        {t(community.descriptionKey)}
                      </CardParagraph>
                      <p className="text-sm text-body-medium">
                        {t("page-community-online-members", {
                          count: formatCompactNumber(community.members, locale),
                        })}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </Grid>
            <div className="flex justify-center">
              <ButtonLink href="/community/online/">
                {t("page-community-online-see-all")}
              </ButtonLink>
            </div>
          </Section>

          {/* Major blockchain conferences */}
          {conferences.length > 0 && (
            <Section id="conferences">
              <div className="flex max-w-2xl flex-col gap-3">
                <h2>{t("page-community-conferences-title")}</h2>
                <p className="text-lg text-body-medium">
                  {t("page-community-conferences-subtitle")}
                </p>
              </div>
              <Grid columns={3}>
                {conferences.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    variant="grid"
                    locale={locale}
                    customEventOptions={{
                      eventCategory: "Community",
                      eventAction: "events_clicked",
                      eventName: "conferences",
                    }}
                  />
                ))}
              </Grid>
              <div className="flex justify-center">
                <ButtonLink href="/community/events/">
                  {t("page-community-conferences-see-all")}
                </ButtonLink>
              </div>
            </Section>
          )}

          {/* Community stories */}
          {featuredStories.length > 0 && (
            <Section id="community-stories" data-flow="skip">
              <div className="rounded-4xl bg-radial-primary px-4 py-12 md:px-8 md:py-16">
                <div className="mx-auto mb-10 flex max-w-2xl flex-col gap-3 text-center">
                  <h2>{t("page-community-stories-title")}</h2>
                  <p className="text-lg text-body-medium">
                    {t("page-community-stories-subtitle")}
                  </p>
                </div>
                <Grid columns={3} className="mx-auto max-w-screen-lg">
                  {featuredStories.map((story) => (
                    <Card
                      key={story.slug}
                      href={`/stories/${story.slug}/`}
                      variant="nested"
                      className="border"
                    >
                      <CardHeader>
                        <CardBanner className="h-40">
                          <Image
                            src={story.image}
                            alt=""
                            width={640}
                            height={360}
                            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                          />
                        </CardBanner>
                      </CardHeader>
                      <CardContent>
                        <CardTitle>{story.title}</CardTitle>
                        <CardParagraph size="sm" className="line-clamp-3">
                          {story.description}
                        </CardParagraph>
                      </CardContent>
                      <CardFooter>
                        <CardButtonFake>
                          {t("page-community-stories-read-full-story")}
                        </CardButtonFake>
                      </CardFooter>
                    </Card>
                  ))}
                </Grid>
              </div>
            </Section>
          )}

          {/* Ethereum voices */}
          <Section id="ethereum-voices" className="mt-0">
            <div className="mx-auto flex max-w-2xl flex-col gap-3 text-center">
              <h2>{t("page-community-voices-title")}</h2>
              <p className="text-lg text-body-medium">
                {t("page-community-voices-subtitle")}
              </p>
            </div>
            <I18nProvider locale={locale} messages={messages}>
              <CommunityStories stories={voices} />
            </I18nProvider>
          </Section>

          {/* Contribute to ethereum.org */}
          <Section
            id="contribute"
            data-flow="skip"
            variant="responsiveFlex"
            className="justify-between md:items-center"
          >
            <div className="relative shrink-0 md:w-96 lg:w-128">
              <FloatingCard className="absolute -top-2 left-2 z-10 shadow-lg md:top-6 md:-left-6">
                <p className="text-xs font-semibold text-body-medium uppercase">
                  {t("page-community-contribute-eyebrow")}
                </p>
                <p className="text-xl font-bold text-body md:text-2xl">
                  {t("page-community-contribute-count", {
                    count: numberFormat(locale).format(12000),
                  })}
                </p>
              </FloatingCard>
              <Image
                src={contributeImg}
                alt=""
                sizes="(min-width: 1024px) 32rem, (min-width: 768px) 24rem, 100vw"
                className="w-full"
              />
            </div>
            <SectionContent className="flex max-w-[660px] flex-1 flex-col gap-6">
              <h2>{t("page-community-contribute")}</h2>
              <p className="text-lg text-body-medium">
                {t("page-community-contribute-description")}
              </p>
              <div className="flex gap-4 max-md:flex-col max-md:items-start">
                <ButtonLink href="/contributing/">
                  {t("page-community-contribute-button")}
                </ButtonLink>
                <ButtonLink
                  variant="outline"
                  href="https://github.com/ethereum/ethereum-org-website/"
                  isSecondary
                  hideArrow
                >
                  <Github className="text-2xl" />
                  {t("page-community-contribute-secondary-button")}
                </ButtonLink>
              </div>
            </SectionContent>
          </Section>

          {/* Try Ethereum */}
          <Section id="try-ethereum">
            <h2>{t("page-community-try-ethereum")}</h2>
            <Grid columns={2} size="wide">
              <Callout
                title={t("page-community-get-eth-title")}
                description={t("page-community-get-eth-description")}
                image={ethImg}
              >
                <ButtonLink href="/get-eth/">
                  {t("page-community-get-eth")}
                </ButtonLink>
              </Callout>
              <Callout
                title={t("page-community-explore-dapps-title")}
                description={t("page-community-explore-dapps-description")}
                image={dogeComputerImg}
              >
                <ButtonLink href="/apps/">
                  {t("page-community-explore-dapps")}
                </ButtonLink>
              </Callout>
            </Grid>
          </Section>
        </MainArticle>

        {/* End-of-page actions */}
        <div className="px-page">
          <ContentFeedback />
        </div>
      </main>
    </>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const t = await getTranslations("page-community")
  return await getMetadata({
    locale,
    slug: ["community"],
    title: t("page-community-meta-title"),
    description: t("page-community-meta-description"),
  })
}
