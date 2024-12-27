import { Fragment, lazy, Suspense } from "react"
import type { GetStaticProps, InferGetStaticPropsType } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { FaDiscord, FaGithub } from "react-icons/fa6"
import { IoMdCopy } from "react-icons/io"
import { MdCheck } from "react-icons/md"

import type {
  AllMetricData,
  BasePageProps,
  CommunityBlog,
  Lang,
  RSSItem,
} from "@/lib/types"

import SvgButtonLink, {
  type SvgButtonLinkProps,
} from "@/components/Buttons/SvgButtonLink"
import { ChevronNext } from "@/components/Chevron"
import CodeModal from "@/components/CodeModal"
import HomeHero from "@/components/Hero/HomeHero"
import BentoCard from "@/components/Homepage/BentoCard"
import { useHome } from "@/components/Homepage/useHome"
import ValuesMarquee from "@/components/Homepage/ValuesMarquee"
import AngleBrackets from "@/components/icons/angle-brackets.svg"
import Calendar from "@/components/icons/calendar.svg"
import CalendarAdd from "@/components/icons/calendar-add.svg"
import { TwImage } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import PageMetadata from "@/components/PageMetadata"
import { TranslatathonBanner } from "@/components/Translatathon/TranslatathonBanner"
import { Button, ButtonLink } from "@/components/ui/buttons/Button"
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
import { SkeletonLines } from "@/components/ui/skeleton"
import {
  Swiper,
  SwiperContainer,
  SwiperNavigation,
  SwiperSlide,
} from "@/components/ui/swiper"
import WindowBox from "@/components/WindowBox"

import { cn } from "@/lib/utils/cn"
import { dataLoader } from "@/lib/utils/data/dataLoader"
import { isValidDate } from "@/lib/utils/date"
import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { trackCustomEvent } from "@/lib/utils/matomo"
import { polishRSSList } from "@/lib/utils/rss"
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

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../tailwind/ui/accordion"

import { useClipboard } from "@/hooks/useClipboard"
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

// API calls
const fetchXmlBlogFeeds = async () => {
  return await fetchRSS(BLOG_FEEDS)
}

type Props = BasePageProps & {
  metricResults: AllMetricData
  rssData: { rssItems: RSSItem[]; blogLinks: CommunityBlog[] }
}

// In seconds
const REVALIDATE_TIME = BASE_TIME_UNIT * 1

const loadData = dataLoader(
  [
    ["ethPrice", fetchEthPrice],
    ["totalEthStaked", fetchTotalEthStaked],
    ["totalValueLocked", fetchTotalValueLocked],
    ["growThePieData", fetchGrowThePie],
    ["communityEvents", fetchCommunityEvents],
    ["attestantPosts", fetchAttestantPosts],
    ["rssData", fetchXmlBlogFeeds],
  ],
  REVALIDATE_TIME * 1000
)

export const getStaticProps = (async ({ locale }) => {
  const [
    ethPrice,
    totalEthStaked,
    totalValueLocked,
    growThePieData,
    communityEvents,
    attestantPosts,
    xmlBlogs,
  ] = await loadData()

  const metricResults: AllMetricData = {
    ethPrice,
    totalEthStaked,
    totalValueLocked,
    txCount: growThePieData.txCount,
    txCostsMedianUsd: growThePieData.txCostsMedianUsd,
  }

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

  // RSS feed items
  const polishedRssItems = polishRSSList(attestantPosts, ...xmlBlogs)
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
    eventCategory,
  } = useHome()

  const { onCopy, hasCopied } = useClipboard()

  return (
    <MainArticle className="flex w-full flex-col items-center" dir={dir}>
      <PageMetadata
        title={t("page-index:page-index-meta-title")}
        description={t("page-index:page-index-meta-description")}
      />
      <TranslatathonBanner pathname={asPath} />
      <HomeHero heroImg={Hero} className="w-full" />
      <div className="w-full space-y-32 px-4 md:mx-6 lg:space-y-48">
        <div className="my-20 grid w-full grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-10">
          {subHeroCTAs.map(
            ({ label, description, href, className, Svg }, idx) => {
              const Link = (
                props: Omit<
                  SvgButtonLinkProps,
                  "Svg" | "href" | "label" | "children"
                >
              ) => (
                <SvgButtonLink
                  Svg={Svg}
                  href={href}
                  label={label}
                  customEventOptions={{
                    eventCategory,
                    eventAction: "Top 4 CTAs",
                    eventName: subHeroCTAs[idx].eventName,
                  }}
                  {...props}
                >
                  <p className="text-body">{description}</p>
                </SvgButtonLink>
              )
              return (
                <Fragment key={label}>
                  <Link className={cn("xl:hidden", className)} variant="col" />
                  <Link
                    className={cn("hidden xl:block", className)}
                    variant="row"
                  />
                </Fragment>
              )
            }
          )}
        </div>

        {/* Use Cases - A new way to use the internet */}
        <Section
          id="use"
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
          <SwiperContainer
            className={cn(
              "lg:hidden", // Mobile only
              "[&_.swiper-slide]:overflow-visible [&_.swiper-slide]:rounded-2xl [&_.swiper-slide]:shadow-card-hover",
              "[&_.swiper-slide-shadow]:!bg-transparent",
              "[&_.swiper]:mx-auto [&_.swiper]:mt-4 [&_.swiper]:!flex [&_.swiper]:h-fit [&_.swiper]:max-w-128 [&_.swiper]:flex-col [&_.swiper]:items-center"
            )}
          >
            <Swiper
              effect="cards"
              onSlideChange={({ activeIndex }) => {
                trackCustomEvent({
                  eventCategory,
                  eventAction: "mobile use cases",
                  eventName: `swipe to card ${activeIndex + 1}`,
                })
              }}
            >
              {bentoItems.map(({ className, ...item }) => (
                <SwiperSlide key={item.title}>
                  <BentoCard
                    imgHeight={220}
                    {...item}
                    className={cn(className, "bg-background text-body")}
                    imgWidth={undefined} // Intentionally last to override box
                    eventCategory={eventCategory}
                  />
                </SwiperSlide>
              ))}
              <SwiperNavigation />
            </Swiper>
          </SwiperContainer>
          {/* Desktop */}
          {bentoItems.map(({ className, ...item }) => (
            <BentoCard
              key={item.title}
              {...item}
              className={cn(className, "max-lg:hidden")} // Desktop only
              eventCategory={eventCategory}
            />
          ))}
        </Section>

        {/* Activity - The strongest ecosystem */}
        <Section id="activity" variant="responsiveFlex">
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
              <Suspense fallback={<SkeletonLines noOfLines={10} />}>
                <StatsBoxGrid metricResults={metricResults} />
              </Suspense>
            </div>
          </SectionContent>
        </Section>

        {/* Learn - Understand Ethereum */}
        <Section
          id="learn"
          variant="responsiveFlex"
          className="md:flex-row-reverse"
        >
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
                  {popularTopics.map(
                    ({ label, Svg, href, eventName, className }) => (
                      <SvgButtonLink
                        key={label}
                        Svg={Svg}
                        href={href}
                        className={cn(
                          "text-accent-b hover:text-accent-b-hover [&>:first-child]:flex-row",
                          className
                        )}
                        customEventOptions={{
                          eventCategory,
                          eventAction: "popular topics",
                          eventName,
                        }}
                      >
                        <p className="text-start text-xl font-bold text-body group-hover:underline">
                          {label}
                        </p>
                      </SvgButtonLink>
                    )
                  )}
                </div>
                <div className="flex py-8 sm:justify-center">
                  <ButtonLink
                    href="/learn/"
                    size="lg"
                    variant="outline"
                    isSecondary
                    className="max-sm:self-start"
                    customEventOptions={{
                      eventCategory,
                      eventAction: "learn",
                      eventName: "learn",
                    }}
                  >
                    {t("page-index:page-index-popular-topics-action")}{" "}
                    <ChevronNext />
                  </ButtonLink>
                </div>
              </div>
            </div>{" "}
          </SectionContent>
        </Section>

        {/* Values - The Internet Is Changing */}
        <ValuesMarquee />

        {/* Builders - Blockchain's biggest builder community */}
        <Section id="builders" variant="responsiveFlex">
          <SectionBanner className="relative">
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
              <ButtonLink
                href="/developers/"
                size="lg"
                className="w-fit"
                customEventOptions={{
                  eventCategory,
                  eventAction: "builders",
                  eventName: "developers",
                }}
              >
                {t("page-index:page-index-builders-action-primary")}{" "}
                <ChevronNext />
              </ButtonLink>
              <ButtonLink
                href="/developers/docs/"
                size="lg"
                variant="outline"
                isSecondary
                className="w-fit"
                customEventOptions={{
                  eventCategory,
                  eventAction: "builders",
                  eventName: "dev docs",
                }}
              >
                {t("page-index:page-index-builders-action-secondary")}
              </ButtonLink>
            </div>
            <div className="py-8 md:pb-16 md:pt-8 lg:pb-32 lg:pt-16">
              <WindowBox
                title={t("page-index:page-index-developers-code-examples")}
                Svg={AngleBrackets}
              >
                {/* Desktop */}
                {codeExamples.map(({ title, description, eventName }, idx) => (
                  <button
                    key={title}
                    className={cn(
                      "flex flex-col gap-y-0.5 border-t px-6 py-4 hover:bg-background-highlight max-md:hidden",
                      isModalOpen &&
                        idx === activeCode &&
                        "bg-background-highlight"
                    )}
                    onClick={() => {
                      toggleCodeExample(idx)
                      trackCustomEvent({
                        eventCategory,
                        eventAction: "Code Examples",
                        eventName,
                      })
                    }}
                  >
                    <p className="font-bold">{title}</p>
                    <p className="text-start text-sm text-body-medium">
                      {description}
                    </p>
                  </button>
                ))}
                {/* Mobile */}
                <Accordion type="single" collapsible className="md:hidden">
                  {codeExamples.map(
                    ({ title, description, code, codeLanguage }) => (
                      <AccordionItem
                        key={title}
                        value={title}
                        className="relative"
                      >
                        <AccordionTrigger className="flex border-t px-6 py-4 hover:bg-background-highlight">
                          <div className="flex flex-col items-start gap-y-0.5">
                            <p className="text-start text-md font-bold text-body">
                              {title}
                            </p>
                            <p className="text-start text-sm text-body-medium">
                              {description}
                            </p>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent
                          className="relative border-t"
                          dir="ltr"
                        >
                          <Suspense fallback={<SkeletonLines noOfLines={16} />}>
                            <div className="-m-2 max-h-[50vh] overflow-auto">
                              <Codeblock
                                codeLanguage={codeLanguage}
                                allowCollapse={false}
                                className="[&>div]:-m-//2 [&>div]:rounded-none [&_*]:!text-xs [&_pre]:p-4"
                                fromHomepage
                              >
                                {code}
                              </Codeblock>
                              <Button
                                onClick={() => onCopy(code)}
                                className="absolute end-4 top-4"
                              >
                                {hasCopied ? <MdCheck /> : <IoMdCopy />}
                              </Button>
                            </div>
                          </Suspense>
                        </AccordionContent>
                      </AccordionItem>
                    )
                  )}
                </Accordion>
              </WindowBox>
              {isModalOpen && (
                // TODO: Migrate CodeModal, CodeBlock from Chakra-UI to tailwind/shad-cn
                <CodeModal
                  isOpen={isModalOpen}
                  setIsOpen={setModalOpen}
                  title={codeExamples[activeCode].title}
                >
                  <Suspense
                    fallback={<SkeletonLines noOfLines={16} dir="ltr" />}
                  >
                    <Codeblock
                      codeLanguage={codeExamples[activeCode].codeLanguage}
                      allowCollapse={false}
                      className="[&_pre]:p-6"
                      fromHomepage
                    >
                      {codeExamples[activeCode].code}
                    </Codeblock>
                  </Suspense>
                </CodeModal>
              )}
            </div>
          </SectionContent>
        </Section>

        {/* Ethereum.org community - Built by the community */}
        <Section
          id="community"
          variant="responsiveFlex"
          className="md:flex-row-reverse"
        >
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
              <ButtonLink
                href="/community/"
                size="lg"
                customEventOptions={{
                  eventCategory,
                  eventAction: "community",
                  eventName: "community",
                }}
              >
                {t("page-index:page-index-community-action")} <ChevronNext />
              </ButtonLink>
              <div className="flex gap-3">
                <ButtonLink
                  href="/discord/"
                  size="lg"
                  variant="outline"
                  isSecondary
                  hideArrow
                  customEventOptions={{
                    eventCategory,
                    eventAction: "community",
                    eventName: "discord",
                  }}
                >
                  <FaDiscord />
                </ButtonLink>
                <ButtonLink
                  href={GITHUB_REPO_URL}
                  size="lg"
                  variant="outline"
                  isSecondary
                  hideArrow
                  customEventOptions={{
                    eventCategory,
                    eventAction: "community",
                    eventName: "github",
                  }}
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
                  calendar.map(({ date, title, calendarLink }) => {
                    const customEventOptions = {
                      eventCategory,
                      eventAction: "Community Events Widget",
                      eventName: "upcoming",
                    }
                    return (
                      <div
                        key={title + date}
                        className="flex flex-col justify-between gap-6 border-t px-6 py-4 xl:flex-row"
                      >
                        <div className="flex flex-col gap-y-0.5 text-center text-base sm:text-start">
                          <Link
                            href={calendarLink}
                            className="text-sm font-bold text-body no-underline hover:underline"
                            customEventOptions={customEventOptions}
                            hideArrow
                          >
                            {title}
                          </Link>
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
                          customEventOptions={customEventOptions}
                        >
                          <CalendarAdd />{" "}
                          {t("page-index:page-index-calendar-add")}
                        </ButtonLink>
                      </div>
                    )
                  })
                ) : (
                  <div className="flex flex-col justify-between gap-6 border-t px-6 py-4 lg:flex-row">
                    {t("page-index:page-index-calendar-fallback")}
                  </div>
                )}
              </WindowBox>
            </div>
          </SectionContent>
        </Section>

        {/* Recent posts */}
        <Section id="recent">
          <h3 className="mb-4 mt-2 text-4xl font-black lg:text-5xl">
            {t("page-index:page-index-posts-header")}
          </h3>
          <p>{t("page-index:page-index-posts-subtitle")}</p>

          <SwiperContainer className="mt-4 md:mt-16">
            <Swiper
              spaceBetween={32}
              breakpoints={{
                [breakpointAsNumber.sm]: {
                  slidesPerView: 2,
                  slidesPerGroup: 2,
                },
                [breakpointAsNumber.lg]: {
                  slidesPerView: 3,
                  slidesPerGroup: 3,
                },
              }}
            >
              {rssItems.map(({ pubDate, title, source, link, imgSrc }) => (
                <SwiperSlide key={title}>
                  <Card
                    href={link}
                    customEventOptions={{
                      eventCategory,
                      eventAction: "blogs_posts",
                      eventName: source,
                    }}
                  >
                    <CardBanner>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imgSrc}
                        alt=""
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null
                          e.currentTarget.src = EventFallback.src
                        }}
                      />
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
                </SwiperSlide>
              ))}
              <SwiperNavigation />
            </Swiper>
          </SwiperContainer>

          <div className="mt-8 flex flex-col gap-4 rounded-2xl border p-8">
            <p className="text-lg">{t("page-index:page-index-posts-action")}</p>
            <div className="flex flex-wrap gap-x-6 gap-y-4">
              {blogLinks.map(({ name, href }) => (
                <Link
                  href={href}
                  key={name}
                  customEventOptions={{
                    eventCategory,
                    eventAction: "blogs_read_more",
                    eventName: name!,
                  }}
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>
        </Section>

        {/* Events */}
        <Section id="events">
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
                    customEventOptions={{
                      eventCategory,
                      eventAction: "posts",
                      eventName: title,
                    }}
                  >
                    <CardBanner>
                      {imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={imageUrl}
                          alt=""
                          onError={(e) => {
                            e.currentTarget.onerror = null
                            e.currentTarget.src = EventFallback.src
                          }}
                          className="max-w-full object-cover object-center"
                          loading="lazy"
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
          <div className="flex py-8 sm:justify-center">
            <ButtonLink
              href="/community/events/"
              size="lg"
              customEventOptions={{
                eventCategory,
                eventAction: "events",
                eventName: "community events",
              }}
            >
              {t("page-index:page-index-events-action")} <ChevronNext />
            </ButtonLink>
          </div>
        </Section>

        {/* Join ethereum.org */}
        <Section
          id="join"
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
                ({ Svg, label, href, className, description, eventName }) => (
                  <SvgButtonLink
                    key={label}
                    Svg={Svg}
                    label={label}
                    href={href}
                    className={cn("max-w-screen-sm", className)}
                    variant="row"
                    customEventOptions={{
                      eventCategory,
                      eventAction: "join",
                      eventName,
                    }}
                  >
                    <p className="text-body">{description}</p>
                  </SvgButtonLink>
                )
              )}
            </div>
          </div>
        </Section>
      </div>
    </MainArticle>
  )
}

export default HomePage
