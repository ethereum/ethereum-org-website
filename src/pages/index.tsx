import { Suspense, useState } from "react"
import type { GetStaticProps, InferGetStaticPropsType } from "next"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { FaDiscord, FaGithub, FaXTwitter } from "react-icons/fa6"
import { MdChevronRight } from "react-icons/md"
import { Flex, Skeleton } from "@chakra-ui/react"

import type {
  AllMetricData,
  BasePageProps,
  EventCardProps,
  Lang,
  RSSItem,
} from "@/lib/types"
import type { CodeExample, CommunityEventsReturnType } from "@/lib/interfaces"

import BentoBox from "@/components/BentoBox"
import SvgButtonLink from "@/components/Buttons/SvgButtonLink"
import Codeblock from "@/components/Codeblock"
import CodeModal from "@/components/CodeModal"
import HomeHero from "@/components/Hero/HomeHero"
import HomeSection from "@/components/HomeSection"
import AngleBrackets from "@/components/icons/angle-brackets.svg"
import BlockHeap from "@/components/icons/block-heap.svg"
import Calendar from "@/components/icons/calendar.svg"
import CalendarAdd from "@/components/icons/calendar-add.svg"
import EthTokenIcon from "@/components/icons/eth-token.svg"
import PickWalletIcon from "@/components/icons/eth-wallet.svg"
import Layer2Icon from "@/components/icons/layer-2.svg"
import ChooseNetworkIcon from "@/components/icons/network-layers.svg"
import TryAppsIcon from "@/components/icons/phone-homescreen.svg"
import RoadmapSign from "@/components/icons/roadmap-sign.svg"
import Whitepaper from "@/components/icons/whitepaper.svg"
import { TwImage } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import PageMetadata from "@/components/PageMetadata"
import StatsBoxGrid from "@/components/StatsBoxGrid"
import SwiperCards from "@/components/SwiperCards"
import { TranslatathonBanner } from "@/components/Translatathon/TranslatathonBanner"
import { ButtonLink } from "@/components/ui/buttons/Button"
import {
  Card,
  CardBanner,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import WindowBox from "@/components/WindowBox"

import { cn } from "@/lib/utils/cn"
import { isValidDate } from "@/lib/utils/date"
import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { polishRSSList } from "@/lib/utils/rss"
import { runOnlyOnce } from "@/lib/utils/runOnlyOnce"
import { getLocaleTimestamp } from "@/lib/utils/time"
import {
  getRequiredNamespacesForPage,
  isLangRightToLeft,
} from "@/lib/utils/translations"

import events from "@/data/community-events.json"

import { BASE_TIME_UNIT, GITHUB_REPO_URL, XML_FEEDS } from "@/lib/constants"

import CreateWalletContent from "!!raw-loader!@/data/CreateWallet.js"
import SimpleDomainRegistryContent from "!!raw-loader!@/data/SimpleDomainRegistry.sol"
import SimpleTokenContent from "!!raw-loader!@/data/SimpleToken.sol"
import SimpleWalletContent from "!!raw-loader!@/data/SimpleWallet.sol"
import { fetchCommunityEvents } from "@/lib/api/calendarEvents"
import { fetchNodes } from "@/lib/api/fetchNodes"
import { fetchAttestantPosts } from "@/lib/api/fetchPosts"
import { fetchRSS } from "@/lib/api/fetchRSS"
import { fetchTotalEthStaked } from "@/lib/api/fetchTotalEthStaked"
import { fetchTotalValueLocked } from "@/lib/api/fetchTotalValueLocked"
import { fetchTxCount } from "@/lib/api/fetchTxCount"
import EventFallback from "@/public/images/events/event-placeholder.png"
import buildersImage from "@/public/images/heroes/developers-hub-hero.jpg"
import activityImage from "@/public/images/heroes/layer-2-hub-hero.jpg"
import learnImage from "@/public/images/heroes/learn-hub-hero.png"
import communityImage from "@/public/images/heroes/quizzes-hub-hero.png"
import hero from "@/public/images/home/hero.png"

const cachedFetchCommunityEvents = runOnlyOnce(fetchCommunityEvents)
const cachedFetchTotalEthStaked = runOnlyOnce(fetchTotalEthStaked)
const cachedFetchNodes = runOnlyOnce(fetchNodes)
const cachedFetchTotalValueLocked = runOnlyOnce(fetchTotalValueLocked)
const cachedFetchTxCount = runOnlyOnce(fetchTxCount)
const cachedXmlBlogFeeds = runOnlyOnce(async () => await fetchRSS(XML_FEEDS))
const cachedAttestantBlog = runOnlyOnce(fetchAttestantPosts)

type Props = BasePageProps & {
  communityEvents: CommunityEventsReturnType
  metricResults: AllMetricData
  rssItems: RSSItem[]
}

export const getStaticProps = (async ({ locale }) => {
  const metricResults: AllMetricData = {
    totalEthStaked: await cachedFetchTotalEthStaked(),
    nodeCount: await cachedFetchNodes(),
    totalValueLocked: await cachedFetchTotalValueLocked(),
    txCount: await cachedFetchTxCount(),
  }

  const communityEvents = await cachedFetchCommunityEvents()

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
  const rssItems = polishRSSList(xmlBlogs, attestantBlog)

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      communityEvents,
      contentNotTranslated,
      lastDeployLocaleTimestamp,
      metricResults,
      rssItems,
    },
    revalidate: BASE_TIME_UNIT * 24,
  }
}) satisfies GetStaticProps<Props>

const HomePage = ({
  communityEvents,
  metricResults,
  rssItems,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation(["common", "page-index"])
  const { locale, asPath } = useRouter()
  const dir = isLangRightToLeft(locale as Lang) ? "rtl" : "ltr"

  const [isModalOpen, setModalOpen] = useState(false)
  const [activeCode, setActiveCode] = useState(0)

  const toggleCodeExample = (id: number): void => {
    setActiveCode(id)
    setModalOpen(true)
  }

  const codeExamples: CodeExample[] = [
    {
      title: t("page-index:page-index-developers-code-example-title-0"),
      description: t(
        "page-index:page-index-developers-code-example-description-0"
      ),
      codeLanguage: "language-solidity",
      code: SimpleWalletContent,
    },
    {
      title: t("page-index:page-index-developers-code-example-title-1"),
      description: t(
        "page-index:page-index-developers-code-example-description-1"
      ),
      codeLanguage: "language-solidity",
      code: SimpleTokenContent,
    },
    {
      title: t("page-index:page-index-developers-code-example-title-2"),
      description: t(
        "page-index:page-index-developers-code-example-description-2"
      ),
      codeLanguage: "language-javascript",
      code: CreateWalletContent,
    },
    {
      title: t("page-index:page-index-developers-code-example-title-3"),
      description: t(
        "page-index:page-index-developers-code-example-description-3"
      ),
      codeLanguage: "language-solidity",
      code: SimpleDomainRegistryContent,
    },
  ]

  const subHeroCTAs = [
    {
      label: "Pick a wallet",
      description: "Create accounts, manage assets",
      href: "/wallets/find-wallet/",
      Svg: PickWalletIcon,
      colorClass: "text-primary hover:text-primary/80", // TODO: Confirm hover style
    },
    {
      label: "Get ETH",
      description: "The currency of Ethereum",
      href: "/get-eth/",
      Svg: EthTokenIcon,
      colorClass: "text-accent-a hover:text-accent-a/80",
    },
    {
      label: "Choose a network",
      description: "Enjoy minimal fees",
      href: "/layer-2/", // TODO: Update with new networks page when ready
      Svg: ChooseNetworkIcon,
      colorClass: "text-accent-b hover:text-accent-b/80",
    },
    {
      label: "Try apps",
      description: "See what Ethereum can do",
      href: "/dapps/",
      Svg: TryAppsIcon,
      colorClass: "text-accent-c hover:text-accent-c/80",
    },
  ]

  const popularTopics = [
    {
      label: "What is Ethereum?",
      Svg: EthTokenIcon,
      href: "/what-is-ethereum/",
    },
    {
      label: "What are crypto wallets?",
      Svg: PickWalletIcon,
      href: "/wallets/",
    },
    {
      label: "How to start? (step by step)",
      Svg: BlockHeap,
      href: "/guides/",
    },
    {
      label: "Ethereum Whitepaper",
      Svg: Whitepaper,
      href: "/whitepaper/",
    },
    {
      label: "Ethereum roadmap",
      Svg: RoadmapSign,
      href: "/roadmap/",
    },
  ]

  const upcomingEvents = events
    .filter((event) => {
      const isValid = isValidDate(event.endDate)
      const isUpcoming =
        new Date(event.endDate).getTime() > new Date().getTime()
      return isValid && isUpcoming
    })
    .sort(
      (a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
    )
    .slice(0, 3) as EventCardProps[] // Show 3 events ending soonest

  const calendar = communityEvents.upcomingEventData
    .sort((a, b) => {
      const dateA = isValidDate(a.date) ? new Date(a.date).getTime() : -Infinity
      const dateB = isValidDate(b.date) ? new Date(b.date).getTime() : -Infinity
      return dateA - dateB
    })
    .slice(0, 4) // Show next 4 events on the calendar

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
      <HomeHero heroImg={hero} className="w-full" />
      <div className="w-full space-y-16 px-4 sm:px-6 md:space-y-32">
        <div className="grid w-full grid-cols-2 gap-x-4 gap-y-8 py-20 md:grid-cols-4 md:gap-x-10">
          {subHeroCTAs.map(({ label, description, href, colorClass, Svg }) => (
            <SvgButtonLink
              key={label}
              Svg={Svg}
              href={href}
              label={label}
              className={colorClass}
            >
              {description}
            </SvgButtonLink>
          ))}
        </div>

        {/* Mobile */}
        <SwiperCards className="my-16 lg:hidden" />

        {/* Desktop */}
        <BentoBox className="hidden lg:block" />

        <HomeSection
          tag="Activity"
          title="The strongest ecosystem"
          imgSrc={activityImage}
        >
          <div className="mt-16 lg:mt-32">
            <p className="mt-8 text-xl font-bold">
              Activity from all Ethereum networks
            </p>
            <StatsBoxGrid metricResults={metricResults} />
          </div>
        </HomeSection>

        <HomeSection
          tag="Learn"
          title="Understanding Ethereum"
          imgSrc={learnImage}
          isFlipped
        >
          <div className="flex flex-col space-y-16 lg:space-y-32">
            <p className="text-lg">
              Crypto can feel overwhelming. Don&apos;t worry, these materials
              are designed to help you understand Ethereum in just a few
              minutes.
            </p>
            <div className="flex flex-col space-y-8">
              <p className="text-xl font-bold">Popular topics</p>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                {popularTopics.map(({ label, Svg, href }) => (
                  <SvgButtonLink
                    key={label}
                    Svg={Svg}
                    href={href}
                    className="text-primary [&>:first-child]:flex-row"
                  >
                    <p className="text-start text-xl font-bold text-body">
                      {label}
                    </p>
                  </SvgButtonLink>
                ))}
              </div>
              <div className="flex justify-center py-8 md:justify-start">
                <ButtonLink href="/learn/" size="lg">
                  Other topics <MdChevronRight />
                </ButtonLink>
              </div>
            </div>
          </div>
        </HomeSection>

        {/* TODO: Add "The Internet Is Changing" section */}

        <HomeSection
          tag="Builders"
          title="Blockchain's biggest builder community"
          imgSrc={buildersImage}
        >
          <p className="text-lg">
            Ethereum is home to Web3’s largest and most vibrant developer
            ecosystem. Use JavaScript and Python, or learn a smart contract
            language like Solidity or Vyper to write your own app.
          </p>
          <div className="flex flex-wrap gap-6 py-8">
            <ButtonLink href="/developers/" size="lg" className="w-fit">
              Builder&apos;s Portal <MdChevronRight />
            </ButtonLink>
            <ButtonLink
              href="/developers/docs/"
              size="lg"
              variant="outline"
              className="w-fit"
            >
              Documentation
            </ButtonLink>
          </div>
          <WindowBox
            title={t("page-index:page-index-developers-code-examples")}
            Svg={AngleBrackets}
          >
            {codeExamples.map(({ title, description }, idx) => (
              <button
                key={title}
                className="flex flex-col space-y-0.5 border-t px-6 py-4 hover:bg-black/5"
                onClick={() => toggleCodeExample(idx)}
              >
                <p className="font-bold">{title}</p>
                <p className="text-start text-sm text-body-medium">
                  {description}
                </p>
              </button>
            ))}
          </WindowBox>

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
        </HomeSection>

        <HomeSection
          tag="Ethereum.org Community"
          title="Built by the community"
          imgSrc={communityImage}
          isFlipped
        >
          <div className="mt-8 flex flex-col gap-8">
            <p className="text-lg">
              The ethereum.org website is built and maintained by hundreds of
              translators, coders, designers, copywriters, and enthusiastic
              community members each month.
            </p>
            <p className="text-lg">
              Come ask questions, connect with people around the world and
              contribute to the website. You will get relevant practical
              experience and be guided during the process!
            </p>
            <p className="text-lg">
              Ethereum.org community is the perfect place to start and learn.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 py-8">
            <ButtonLink
              href="/discord/"
              size="lg"
              variant="outline-color"
              hideArrow
            >
              <FaDiscord />
            </ButtonLink>
            <ButtonLink
              href={GITHUB_REPO_URL}
              size="lg"
              variant="outline-color"
              hideArrow
            >
              <FaGithub />
            </ButtonLink>
            <ButtonLink href="/community/" size="lg">
              More on ethereum.org <MdChevronRight />
            </ButtonLink>
          </div>

          <WindowBox title="Next calls" Svg={Calendar}>
            {calendar.map(({ date, title, calendarLink }, idx) => (
              <div
                key={title}
                className={cn(
                  "flex flex-col justify-between gap-6 border-t px-6 py-4 lg:flex-row",
                  idx === 0 && "bg-accent-gradient-a"
                )}
              >
                <div className="flex flex-col space-y-0.5 text-center text-base sm:text-start">
                  <p className="italic text-body-medium">
                    {new Intl.DateTimeFormat(locale, {
                      month: "long",
                      day: "2-digit",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    }).format(new Date(date))}
                  </p>
                  <p
                    className={cn(
                      "text-sm text-body",
                      idx === 0 && "font-bold"
                    )}
                  >
                    {title}
                  </p>
                </div>
                <ButtonLink
                  className="h-fit w-full text-nowrap px-5 sm:w-fit lg:self-center"
                  size="md"
                  variant="outline"
                  href={calendarLink}
                  hideArrow
                >
                  <CalendarAdd /> Add to calendar
                </ButtonLink>
              </div>
            ))}
          </WindowBox>

          {/* TODO: News sub-section */}
        </HomeSection>

        <div className="w-full">
          <h3 className="mb-4 mt-2 text-5xl font-black lg:mb-6 lg:text-7xl">
            Recent posts
          </h3>
          <p>The latest blog posts and updates from the community</p>
          <div className="mt-4 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-3 md:flex-row">
            {rssItems.map(({ pubDate, title, source, link, imgSrc }) => (
              <Card key={title} href={link}>
                <CardBanner>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imgSrc} alt="" />
                </CardBanner>
                <CardContent className="">
                  {isValidDate(pubDate) && (
                    <p className="text-sm italic">
                      {new Intl.DateTimeFormat(locale, {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }).format(new Date(pubDate))}
                    </p>
                  )}
                  <div className="primary-low-contrast w-fit rounded-full bg-accent-a/20 px-4 py-0 text-sm uppercase text-accent-a">
                    {source}
                  </div>
                  <CardTitle variant="strong">{title}</CardTitle>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="w-full">
          <h3 className="mb-4 mt-2 text-5xl font-black lg:mb-6 lg:text-7xl">
            Events
          </h3>
          <p>We have many community events scheduled around the globe</p>
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
                    <CardContent className="space-y-8 p-2">
                      <div>
                        <CardTitle>{title}</CardTitle>
                        <CardDescription className="italic">
                          {(isValidDate(startDate) || isValidDate(endDate)) &&
                            new Intl.DateTimeFormat(locale, {
                              month: "2-digit",
                              day: "2-digit",
                              year: "numeric",
                            }).formatRange(
                              new Date(
                                isValidDate(startDate) ? startDate : endDate
                              ),
                              new Date(
                                isValidDate(endDate) ? endDate : startDate
                              )
                            )}
                        </CardDescription>
                        <p className="text-sm italic text-body-medium">
                          {location}
                        </p>
                      </div>
                      <p>{description}</p>
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          </div>
          <div className="flex justify-center py-8 md:justify-start">
            <ButtonLink href="/community/events/" size="lg" className="mx-auto">
              See all events <MdChevronRight />
            </ButtonLink>
          </div>
        </div>

        <div className="flex flex-col gap-y-8 rounded-4xl border border-b-0 border-black/[0.04] bg-accent-gradient-b px-4 py-8">
          <div className="flex flex-col space-y-4 text-center">
            <h2>Join ethereum.org</h2>
            <p>
              This website is open source with hundreds of community
              contributors. You can propose edits to any of the content on this
              site.
            </p>
          </div>
          {/* TODO: Fix icon sizing, fix button/icon layout on mobile */}
          <div className="max-w-105 mx-auto grid grid-cols-1 gap-16 sm:grid-cols-2 md:max-w-screen-md">
            <SvgButtonLink
              Svg={Layer2Icon}
              label="How to contribute"
              href="/contributing/"
              className="text-accent-c hover:text-accent-c/80" // TODO: Confirm hover style
            >
              <p className="text-body">
                Find out all the different ways you can help ethereum.org grow
                and be better.
              </p>
            </SvgButtonLink>
            <SvgButtonLink
              Svg={FaGithub}
              label="GitHub"
              href={GITHUB_REPO_URL}
              className="text-accent-a hover:text-accent-a/80"
            >
              <p className="text-body">
                Contribute to code, content, articles etc.
              </p>
            </SvgButtonLink>
            <SvgButtonLink
              Svg={FaDiscord}
              label="Discord"
              href="/discord/"
              className="text-primary hover:text-primary/80"
            >
              <p className="text-body">
                To ask questions, coordinate contribution and join community
                calls.
              </p>
            </SvgButtonLink>
            <SvgButtonLink
              Svg={FaXTwitter}
              label="Twitter"
              href="https://x.com/EthDotOrg"
              className="text-accent-b hover:text-accent-b/80"
            >
              <p className="text-body">
                To keep up with our updates and important news.
              </p>
            </SvgButtonLink>
          </div>
        </div>
      </div>
    </Flex>
  )
}

export default HomePage
