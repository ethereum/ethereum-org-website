import { Fragment, lazy, Suspense } from "react"
import type { GetStaticProps, InferGetStaticPropsType } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { FaDiscord, FaGithub } from "react-icons/fa6"
import { MdChevronRight } from "react-icons/md"
import { Flex, Skeleton } from "@chakra-ui/react"

import type {
  AllMetricData,
  BasePageProps,
  CommunityBlog,
  Lang,
  RSSItem,
} from "@/lib/types"

import SvgButtonLink from "@/components/Buttons/SvgButtonLink"
import CodeModal from "@/components/CodeModal"
import HomeHero from "@/components/Hero/HomeHero"
import BentoCard from "@/components/Homepage/BentoCard"
import { useHome } from "@/components/Homepage/useHome"
import AngleBrackets from "@/components/icons/angle-brackets.svg"
import Calendar from "@/components/icons/calendar.svg"
import CalendarAdd from "@/components/icons/calendar-add.svg"
import { TwImage } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import PageMetadata from "@/components/PageMetadata"
import Swiper from "@/components/Swiper"
import { TranslatathonBanner } from "@/components/Translatathon/TranslatathonBanner"
import { ButtonLink } from "@/components/ui/buttons/Button"
import {
  Card,
  CardBanner,
  CardContent,
  CardHighlight,
  CardSubTitle,
  CardTitle,
} from "@/components/ui/card"
import Link from "@/components/ui/Link"
import {
  Section,
  SectionBanner,
  SectionContent,
  SectionHeader,
  SectionTag,
} from "@/components/ui/section"
import WindowBox from "@/components/WindowBox"

import { cn } from "@/lib/utils/cn"
import { isValidDate } from "@/lib/utils/date"
import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { polishRSSList } from "@/lib/utils/rss"
import { runOnlyOnce } from "@/lib/utils/runOnlyOnce"
import { breakpointAsNumber } from "@/lib/utils/screen"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import {
  BASE_TIME_UNIT,
  BLOG_FEEDS,
  BLOGS_WITHOUT_FEED,
  CALENDAR_DISPLAY_COUNT,
  GITHUB_REPO_URL,
  RSS_DISPLAY_COUNT,
} from "@/lib/constants"

import "swiper/css/effect-cards"

import { fetchCommunityEvents } from "@/lib/api/calendarEvents"
import { fetchEthPrice } from "@/lib/api/fetchEthPrice"
import { fetchGrowThePie } from "@/lib/api/fetchGrowThePie"
import { fetchAttestantPosts } from "@/lib/api/fetchPosts"
import { fetchRSS } from "@/lib/api/fetchRSS"
import { fetchTotalEthStaked } from "@/lib/api/fetchTotalEthStaked"
import { fetchTotalValueLocked } from "@/lib/api/fetchTotalValueLocked"
import EventFallback from "@/public/images/events/event-placeholder.png"
import BuildersImage from "@/public/images/heroes/developers-hub-hero.jpg"
import ActivityImage from "@/public/images/heroes/layer-2-hub-hero.jpg"
import LearnImage from "@/public/images/heroes/learn-hub-hero.png"
import CommunityImage from "@/public/images/heroes/quizzes-hub-hero.png"
import Hero from "@/public/images/home/hero.png"

// lazy loaded components
const Codeblock = lazy(() =>
  Promise.all([
    import("@/components/Codeblock"),
    // Add a delay to prevent the skeleton from flashing
    new Promise((resolve) => setTimeout(resolve, 1000)),
  ]).then(([module]) => module)
)

const StatsBoxGrid = lazy(() => import("@/components/StatsBoxGrid"))

const cachedEthPrice = runOnlyOnce(fetchEthPrice)
const cachedFetchTotalEthStaked = runOnlyOnce(fetchTotalEthStaked)
const cachedFetchTotalValueLocked = runOnlyOnce(fetchTotalValueLocked)
const cachedXmlBlogFeeds = runOnlyOnce(async () => await fetchRSS(BLOG_FEEDS))
const cachedAttestantBlog = runOnlyOnce(fetchAttestantPosts)
const cachedGrowThePieData = runOnlyOnce(fetchGrowThePie)
const cachedFetchCommunityEvents = runOnlyOnce(fetchCommunityEvents)

type Props = BasePageProps & {
  metricResults: AllMetricData
  rssData: { rssItems: RSSItem[]; blogLinks: CommunityBlog[] }
}

export const getStaticProps = (async ({ locale }) => {
  const growThePieData = await cachedGrowThePieData()
  const metricResults: AllMetricData = {
    ethPrice: await cachedEthPrice(),
    totalEthStaked: await cachedFetchTotalEthStaked(),
    totalValueLocked: await cachedFetchTotalValueLocked(),
    txCount: growThePieData.txCount,
    txCostsMedianUsd: growThePieData.txCostsMedianUsd,
  }

  const communityEvents = await cachedFetchCommunityEvents()
  const calendar = communityEvents.upcomingEventData
    .sort((a, b) => {
      const dateA = isValidDate(a.date) ? new Date(a.date).getTime() : -Infinity
      const dateB = isValidDate(b.date) ? new Date(b.date).getTime() : -Infinity
      return dateA - dateB
    })
    .slice(0, CALENDAR_DISPLAY_COUNT)

  // load i18n required namespaces for the given page
  const requiredNamespaces = getRequiredNamespacesForPage("/")

  // check if the translated page content file exists for locale
  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[0])

  // load last deploy date to pass to Footer in RootLayout
  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  // load RSS feed items
  const xmlBlogs = await cachedXmlBlogFeeds()
  const attestantBlog = await cachedAttestantBlog()
  const polishedRssItems = polishRSSList(attestantBlog, ...xmlBlogs)
  const rssItems = polishedRssItems.slice(0, RSS_DISPLAY_COUNT)

  const blogLinks = polishedRssItems.map(({ source, sourceUrl }) => ({
    name: source,
    href: sourceUrl,
  })) as CommunityBlog[]
  blogLinks.push(...BLOGS_WITHOUT_FEED)

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      calendar,
      contentNotTranslated,
      lastDeployLocaleTimestamp,
      metricResults,
      rssData: { rssItems, blogLinks },
    },
    revalidate: BASE_TIME_UNIT * 24,
  }
}) satisfies GetStaticProps<Props>

const HomePage = ({
  calendar,
  metricResults,
  rssData: { rssItems, blogLinks },
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const {
    t,
    locale,
    asPath,
    dir,
    isModalOpen,
    setModalOpen,
    activeCode,
    toggleCodeExample,
    codeExamples,
    subHeroCTAs,
    popularTopics,
    upcomingEvents,
    joinActions,
    bentoItems,
  } = useHome()

  return (
    <Flex
      as={MainArticle}
      flexDirection="column"
      alignItems="center"
      dir={dir}
      width="full"
    >
      <PageMetadata
        title={t("page-index:page-index-meta-title")}
        description={t("page-index:page-index-meta-description")}
      />
      <TranslatathonBanner pathname={asPath} />
      <HomeHero heroImg={Hero} className="w-full" />
      <div className="w-full space-y-16 px-4 sm:px-6 md:space-y-32">
        <div className="my-20 grid w-full grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-10">
          {subHeroCTAs.map(({ label, description, href, className, Svg }) => (
            <Fragment key={label}>
              <SvgButtonLink
                Svg={Svg}
                href={href}
                label={label}
                className={cn("xl:hidden", className)}
                variant="col"
              >
                <p className="text-body">{description}</p>
              </SvgButtonLink>
              <SvgButtonLink
                Svg={Svg}
                href={href}
                label={label}
                className={cn("hidden xl:block", className)}
                variant="row"
              >
                <p className="text-body">{description}</p>
              </SvgButtonLink>
            </Fragment>
          ))}
        </div>

        {/* Use Cases - A new way to use the internet */}
        <section
          className={cn(
            "max-lg:-mx-4 max-lg:flex max-lg:w-[100vw] max-lg:flex-col max-lg:overflow-hidden max-lg:px-4 sm:max-lg:-mx-6 sm:max-lg:px-6", // Mobile: Swiper cards
            "lg:grid lg:grid-cols-bento lg:gap-4" // Desktop: BentoBox grid
          )}
        >
          <div
            className={cn(
              "flex flex-col",
              "lg:col-span-12 xl:col-span-3 xl:col-start-2"
            )}
          >
            <div className="w-fit rounded-full bg-primary-low-contrast px-4 py-0 text-sm uppercase text-primary">
              {t("common:nav-use-cases-label")}
            </div>
            <h2 className="mb-4 me-4 mt-2 text-5xl font-black xl:mb-6 xl:text-7xl">
              {t("page-index:page-index-bento-header")}
            </h2>
          </div>

          {/* Mobile */}
          <Swiper
            options={{ effect: "cards", createElements: true }}
            className={cn(
              "lg:hidden", // Mobile only
              "[&_.swiper-slide]:overflow-visible [&_.swiper-slide]:rounded-2xl [&_.swiper-slide]:shadow-card-hover",
              "[&_.swiper]:mx-auto [&_.swiper]:mt-4 [&_.swiper]:!flex [&_.swiper]:h-fit [&_.swiper]:max-w-128 [&_.swiper]:flex-col [&_.swiper]:items-center"
            )}
          >
            {bentoItems.map(({ className, ...item }) => (
              <BentoCard
                key={item.title}
                imgHeight={220}
                {...item}
                className={cn(className, "bg-background text-body")}
                imgWidth={undefined} // Intentionally last to override box
              />
            ))}
          </Swiper>

          {/* Desktop */}
          {bentoItems.map(({ className, ...item }) => (
            <BentoCard
              key={item.title}
              {...item}
              className={cn(className, "max-lg:hidden")} // Desktop only
            />
          ))}
        </section>

        {/* Activity - The strongest ecosystem */}
        <Section>
          <SectionBanner>
            <TwImage src={ActivityImage} alt="" />
          </SectionBanner>

          <SectionContent>
            <SectionTag>{t("page-index:page-index-activity-tag")}</SectionTag>
            <SectionHeader>
              {t("page-index:page-index-activity-header")}
            </SectionHeader>
            <div className="py-16 lg:py-32">
              <p className="mt-8 text-xl font-bold">
                {t("page-index:page-index-activity-description")}
              </p>
              <StatsBoxGrid metricResults={metricResults} />
            </div>
          </SectionContent>
        </Section>

        {/* Learn - Understand Ethereum */}
        <Section className="md:flex-row-reverse">
          <SectionBanner>
            <TwImage src={LearnImage} alt="" />
          </SectionBanner>

          <SectionContent>
            <SectionTag>{t("page-index:page-index-learn-tag")}</SectionTag>
            <SectionHeader>
              {t("page-index:page-index-learn-header")}
            </SectionHeader>
            <div className="flex flex-col gap-y-16 lg:gap-y-32">
              <p className="text-lg">
                {t("page-index:page-index-learn-description")}
              </p>
              <div className="flex flex-col gap-y-8">
                <h3 className="text-xl font-bold">
                  {t("page-index:page-index-popular-topics-header")}
                </h3>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                  {popularTopics.map(({ label, Svg, href }) => (
                    <SvgButtonLink
                      key={label}
                      Svg={Svg}
                      href={href}
                      className="text-accent-b hover:text-accent-b-hover [&>:first-child]:flex-row"
                    >
                      <p className="text-start text-xl font-bold text-body group-hover:underline">
                        {label}
                      </p>
                    </SvgButtonLink>
                  ))}
                </div>
                <div className="flex justify-center py-8 md:justify-start">
                  <ButtonLink href="/learn/" size="lg" variant="outline">
                    {t("page-index:page-index-popular-topics-action")}{" "}
                    <MdChevronRight />
                  </ButtonLink>
                </div>
              </div>
            </div>{" "}
          </SectionContent>
        </Section>

        {/* TODO: Add "The Internet Is Changing" section */}

        {/* Builders - Blockchain's biggest builder community */}
        <Section>
          <SectionBanner>
            <TwImage src={BuildersImage} alt="" />
          </SectionBanner>

          <SectionContent>
            <SectionTag>{t("page-index:page-index-builders-tag")}</SectionTag>
            <SectionHeader>
              {t("page-index:page-index-builders-header")}
            </SectionHeader>
            <p className="text-lg">
              {t("page-index:page-index-builders-description")}
            </p>
            <div className="flex flex-wrap gap-6 py-8">
              <ButtonLink href="/developers/" size="lg" className="w-fit">
                {t("page-index:page-index-builders-action-primary")}{" "}
                <MdChevronRight />
              </ButtonLink>
              <ButtonLink
                href="/developers/docs/"
                size="lg"
                variant="outline"
                className="w-fit"
              >
                {t("page-index:page-index-builders-action-secondary")}
              </ButtonLink>
            </div>
            <div className="py-8 md:pb-16 md:pt-8 lg:pb-32 lg:pt-16">
              <WindowBox
                title={t("page-index:page-index-developers-code-examples")}
                Svg={AngleBrackets}
              >
                {codeExamples.map(({ title, description }, idx) => (
                  <button
                    key={title}
                    className="flex flex-col gap-y-0.5 border-t px-6 py-4 hover:bg-background-highlight"
                    onClick={() => toggleCodeExample(idx)}
                  >
                    <p className="font-bold">{title}</p>
                    <p className="text-start text-sm text-body-medium">
                      {description}
                    </p>
                  </button>
                ))}
              </WindowBox>
            </div>

            {isModalOpen && (
              // TODO: Migrate CodeModal, CodeBlock, Skeleton from Chakra-UI to tailwind/shad-cn
              <CodeModal
                isOpen={isModalOpen}
                setIsOpen={setModalOpen}
                title={codeExamples[activeCode].title}
              >
                <Suspense fallback={<Skeleton />}>
                  <Codeblock
                    codeLanguage={codeExamples[activeCode].codeLanguage}
                    allowCollapse={false}
                    fromHomepage
                  >
                    {codeExamples[activeCode].code}
                  </Codeblock>
                </Suspense>
              </CodeModal>
            )}
          </SectionContent>
        </Section>

        {/* Ethereum.org community - Built by the community */}
        <Section className="md:flex-row-reverse">
          <SectionBanner>
            <TwImage src={CommunityImage} alt="" />
          </SectionBanner>

          <SectionContent>
            <SectionTag>{t("page-index:page-index-community-tag")}</SectionTag>
            <SectionHeader>
              {t("page-index:page-index-community-header")}
            </SectionHeader>
            <div className="mt-8 flex flex-col gap-8 text-lg">
              <p>{t("page-index:page-index-community-description-1")}</p>
              <p>{t("page-index:page-index-community-description-2")}</p>
              <p>{t("page-index:page-index-community-description-3")}</p>
            </div>
            <div className="flex flex-wrap gap-3 py-8">
              <ButtonLink href="/community/" size="lg">
                {t("page-index:page-index-community-action")} <MdChevronRight />
              </ButtonLink>
              <div className="flex gap-3">
                <ButtonLink
                  href="/discord/"
                  size="lg"
                  variant="outline"
                  hideArrow
                >
                  <FaDiscord />
                </ButtonLink>
                <ButtonLink
                  href={GITHUB_REPO_URL}
                  size="lg"
                  variant="outline"
                  hideArrow
                >
                  <FaGithub />
                </ButtonLink>
              </div>
            </div>
            <div className="py-8 md:pt-8 lg:pt-16">
              <WindowBox
                title={t("page-index:page-index-calendar-title")}
                Svg={Calendar}
              >
                {calendar.length > 0 ? (
                  calendar.map(({ date, title, calendarLink }) => (
                    <div
                      key={title}
                      className="flex flex-col justify-between gap-6 border-t px-6 py-4 xl:flex-row"
                    >
                      <div className="flex flex-col gap-y-0.5 text-center text-base sm:text-start">
                        <a
                          href={calendarLink}
                          className="text-sm font-bold text-body no-underline hover:underline"
                        >
                          {title}
                        </a>
                        <p className="italic text-body-medium">
                          {new Intl.DateTimeFormat(locale, {
                            month: "long",
                            day: "2-digit",
                            year: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                          }).format(new Date(date))}
                        </p>
                      </div>
                      <ButtonLink
                        className="h-fit w-full text-nowrap px-5 sm:w-fit xl:self-center"
                        size="md"
                        variant="ghost"
                        href={calendarLink}
                        hideArrow
                      >
                        <CalendarAdd />{" "}
                        {t("page-index:page-index-calendar-add")}
                      </ButtonLink>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col justify-between gap-6 border-t px-6 py-4 lg:flex-row">
                    {t("page-index:page-index-calendar-fallback")}
                  </div>
                )}
              </WindowBox>
            </div>{" "}
          </SectionContent>
        </Section>

        {/* Recent posts */}
        <div className="w-full">
          <h3 className="mb-4 mt-2 text-4xl font-black lg:text-5xl">
            {t("page-index:page-index-posts-header")}
          </h3>
          <p>{t("page-index:page-index-posts-subtitle")}</p>

          <Swiper
            className="mt-4 md:mt-16"
            options={{
              spaceBetween: 32,
              breakpoints: {
                [breakpointAsNumber.sm]: {
                  slidesPerView: 2,
                  slidesPerGroup: 2,
                },
                [breakpointAsNumber.lg]: {
                  slidesPerView: 3,
                  slidesPerGroup: 3,
                },
              },
            }}
          >
            {rssItems.map(({ pubDate, title, source, link, imgSrc }) => (
              <Card key={title} href={link}>
                <CardBanner>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imgSrc} alt="" />
                </CardBanner>
                <CardContent>
                  <CardTitle>{title}</CardTitle>
                  {isValidDate(pubDate) && (
                    <CardSubTitle>
                      {new Intl.DateTimeFormat(locale, {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }).format(new Date(pubDate))}
                    </CardSubTitle>
                  )}
                  <CardHighlight>{source}</CardHighlight>
                </CardContent>
              </Card>
            ))}
          </Swiper>

          <div className="mt-8 flex flex-col gap-4 rounded-2xl border p-8">
            <p className="text-lg">{t("page-index:page-index-posts-action")}</p>
            <div className="flex flex-wrap gap-x-6 gap-y-4">
              {blogLinks.map(({ name, href }) => (
                <Link href={href} key={name}>
                  {name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Event */}
        <div className="w-full">
          <h3 className="mb-4 mt-2 text-4xl font-black lg:text-5xl">
            {t("page-index:page-index-events-header")}
          </h3>
          <p>{t("page-index:page-index-events-subtitle")}</p>
          <div className="mt-4 md:mt-16">
            <div className="grid grid-cols-1 gap-8 self-stretch sm:grid-cols-2 md:grid-cols-3">
              {upcomingEvents.map(
                (
                  {
                    title,
                    href,
                    location,
                    description,
                    startDate,
                    endDate,
                    imageUrl,
                  },
                  idx
                ) => (
                  <Card
                    key={title + description}
                    href={href}
                    className={cn(
                      idx === 0 && "col-span-1 sm:col-span-2 md:col-span-1"
                    )}
                  >
                    <CardBanner>
                      {imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={imageUrl}
                          alt=""
                          className="max-w-full object-cover object-center"
                        />
                      ) : (
                        <TwImage src={EventFallback} alt="" />
                      )}
                    </CardBanner>
                    <CardContent>
                      <CardTitle>{title}</CardTitle>
                      <CardSubTitle>
                        {(isValidDate(startDate) || isValidDate(endDate)) &&
                          new Intl.DateTimeFormat(locale, {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }).formatRange(
                            new Date(
                              isValidDate(startDate) ? startDate : endDate
                            ),
                            new Date(isValidDate(endDate) ? endDate : startDate)
                          )}
                      </CardSubTitle>
                      <CardHighlight>{location}</CardHighlight>
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          </div>
          <div className="flex justify-center py-8 md:justify-start">
            <ButtonLink href="/community/events/" size="lg" className="mx-auto">
              {t("page-index:page-index-events-action")} <MdChevronRight />
            </ButtonLink>
          </div>
        </div>

        {/* Join ethereum.org */}
        <div
          className={cn(
            "before:absolute before:-inset-px before:bottom-0 before:z-hide before:rounded-[calc(theme(borderRadius.4xl)+1px)] before:content-['']", // Border/gradient positioning
            "before:bg-gradient-to-b before:from-primary-hover/[0.24] before:to-primary-hover/[0.08] before:dark:from-primary-hover/40 before:dark:to-primary-hover/20", // Border/gradient coloring
            "relative inset-0 rounded-4xl bg-background" // Paint background color over card portion
          )}
        >
          <div className="mb-12 flex flex-col gap-y-8 rounded-4xl bg-radial-a px-8 py-12 lg:mb-32 xl:mb-36">
            <div className="flex flex-col gap-y-4 text-center">
              <h2>{t("page-index:page-index-join-header")}</h2>
              <p>{t("page-index:page-index-join-description")}</p>
            </div>
            <div className="mx-auto grid grid-cols-1 gap-16 md:grid-cols-2">
              {joinActions.map(
                ({ Svg, label, href, className, description }) => (
                  <SvgButtonLink
                    key={label}
                    Svg={Svg}
                    label={label}
                    href={href}
                    className={cn("max-w-screen-sm", className)}
                    variant="row"
                  >
                    <p className="text-body">{description}</p>
                  </SvgButtonLink>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </Flex>
  )
}

export default HomePage
