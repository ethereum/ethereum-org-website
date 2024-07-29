import { Suspense, useState } from "react"
import type { GetStaticProps, InferGetStaticPropsType } from "next"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { FaDiscord, FaGithub } from "react-icons/fa"
import { MdChevronRight } from "react-icons/md"
import { RxExternalLink } from "react-icons/rx"
import { Flex, Skeleton } from "@chakra-ui/react"

import { AllMetricData, BasePageProps, Lang } from "@/lib/types"
import type { CodeExample, CommunityEventsReturnType } from "@/lib/interfaces"

import BigNumber from "@/components/BigNumber"
import SvgButtonLink from "@/components/Buttons/SvgButtonLink"
import Codeblock from "@/components/Codeblock"
import CodeModal from "@/components/CodeModal"
import HomeHero from "@/components/Hero/HomeHero"
import HomeSection from "@/components/HomeSection"
import AngleBrackets from "@/components/icons/angle-brackets.svg"
import BlockHeap from "@/components/icons/block-heap.svg"
import Calendar from "@/components/icons/calendar.svg"
import EthTokenIcon from "@/components/icons/eth-token.svg"
import PickWalletIcon from "@/components/icons/eth-wallet.svg"
import ChooseNetworkIcon from "@/components/icons/network-layers.svg"
import TryAppsIcon from "@/components/icons/phone-homescreen.svg"
import RoadmapSign from "@/components/icons/roadmap-sign.svg"
import Whitepaper from "@/components/icons/whitepaper.svg"
import MainArticle from "@/components/MainArticle"
import PageMetadata from "@/components/PageMetadata"
import { TranslatathonBanner } from "@/components/Translatathon/TranslatathonBanner"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import WindowBox from "@/components/WindowBox"

import { cn } from "@/lib/utils/cn"
import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { runOnlyOnce } from "@/lib/utils/runOnlyOnce"
import { getLocaleTimestamp } from "@/lib/utils/time"
import {
  getRequiredNamespacesForPage,
  isLangRightToLeft,
} from "@/lib/utils/translations"

import events from "@/data/community-events.json"

import { BASE_TIME_UNIT, GITHUB_REPO_URL } from "@/lib/constants"

import { Button, ButtonLink } from "../../tailwind/ui/buttons/Button"

import CreateWalletContent from "!!raw-loader!@/data/CreateWallet.js"
import SimpleDomainRegistryContent from "!!raw-loader!@/data/SimpleDomainRegistry.sol"
import SimpleTokenContent from "!!raw-loader!@/data/SimpleToken.sol"
import SimpleWalletContent from "!!raw-loader!@/data/SimpleWallet.sol"
import { fetchCommunityEvents } from "@/lib/api/calendarEvents"
import { fetchNodes } from "@/lib/api/fetchNodes"
import { fetchTotalEthStaked } from "@/lib/api/fetchTotalEthStaked"
import { fetchTotalValueLocked } from "@/lib/api/fetchTotalValueLocked"
import { fetchTxCount } from "@/lib/api/fetchTxCount"
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

type Props = BasePageProps & {
  communityEvents: CommunityEventsReturnType
  metricResults: AllMetricData
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

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      communityEvents,
      contentNotTranslated,
      lastDeployLocaleTimestamp,
      metricResults,
    },
    revalidate: BASE_TIME_UNIT * 24,
  }
}) satisfies GetStaticProps<Props>

const HomePage = ({
  communityEvents,
  metricResults,
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

  // TODO: Remove when used
  console.log("Values to use:", {
    communityEvents,
    metricResults,
    codeExamples,
  })

  const SubHeroCTAs = [
    {
      label: "Pick a wallet",
      description: "Create accounts, manage assets",
      href: "/wallets/find-wallet/",
      Svg: PickWalletIcon,
      colorClass: "text-primary",
    },
    {
      label: "Get ETH",
      description: "The currency of Ethereum",
      href: "/get-eth/",
      Svg: EthTokenIcon,
      colorClass: "text-accent-a",
    },
    {
      label: "Choose a network",
      description: "Enjoy minimal fees",
      href: "/layer-2/", // TODO: Update with new networks page when ready
      Svg: ChooseNetworkIcon,
      colorClass: "text-accent-b",
    },
    {
      label: "Try apps",
      description: "See what Ethereum can do",
      href: "/dapps/",
      Svg: TryAppsIcon,
      colorClass: "text-accent-c",
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

  const dummyCalendarData = [
    {
      date: "May 29, 2024 at 18:00",
      title: "ethereum.org Community Call - May 2024",
    },
    {
      date: "Jul 25, 2024",
      title: "☎️ ethereum.org Community Call - July 2024",
    },
    {
      date: "Jul 3, 2024",
      title: "🛠 QA session - ethereum.org portal",
    },
    {
      date: "May 8, 2024",
      title:
        "👾 Live coding session - Implementing a visual testing component on ethereum.org",
    },
  ]

  const comingSoon = [
    { title: "Ethereum news", tag: "" },
    { title: "Join ethereum.org", tag: "" },
  ]

  const upcomingEvents = events
    .sort(
      (a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
    )
    .slice(0, 3)

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
      <div className="w-full">
        <HomeHero heroImg={hero} />
      </div>

      <div className="space-y-16 px-4 md:px-6 lg:space-y-32">
        <div className="grid w-full grid-cols-2 gap-x-4 gap-y-8 py-20 lg:grid-cols-4 lg:gap-x-10">
          {SubHeroCTAs.map(({ label, description, href, colorClass, Svg }) => (
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

        <HomeSection tag="Use cases" title="A new way to use the internet">
          <span className="text-[5rem]">👷‍♀️🚧🔜</span>
        </HomeSection>

        <HomeSection
          tag="Activity"
          title="The strongest ecosystem"
          imgSrc={activityImage}
        >
          <div className="mt-16 xl:mt-32">
            <p className="mt-8 text-xl font-bold">
              Activity from all Ethereum networks
            </p>
            <div className="grid w-full grid-cols-1 xl:grid-cols-2">
              {/* TODO: Plug in real data */}
              <BigNumber
                className="border-b border-body-light xl:border-e xl:pe-8"
                value="$44.89B"
                sourceName="Defi Llama"
              >
                Total value held on Ethereum
              </BigNumber>

              <BigNumber
                className="border-b border-body-light xl:ps-8"
                value="8.36M"
                sourceName="Etherscan"
                sourceUrl="https://etherscan.io/"
              >
                Transactions in the last 24h
              </BigNumber>

              <BigNumber
                className="border-b border-body-light xl:border-b-0 xl:border-e xl:pe-8"
                value="$0.01"
              >
                Average transaction cost
              </BigNumber>

              <BigNumber
                className="xl:ps-8"
                value="$115B"
                sourceName="Dune Analytics"
                sourceUrl="https://dune.xyz/"
              >
                Value protecting Ethereum
              </BigNumber>
            </div>
          </div>
        </HomeSection>

        <HomeSection
          tag="Learn"
          title="Understanding Ethereum"
          imgSrc={learnImage}
          isFlipped
        >
          <div className="flex flex-col space-y-16 xl:space-y-32">
            <p className="text-lg">
              Cryptocurrency can feel overwhelming. Don&apos;t worry, these
              materials are designed to help you understand Ethereum in just a
              few minutes.
            </p>
            <div className="flex flex-col space-y-8">
              <p className="text-xl font-bold">Popular topics</p>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
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
              <div className="flex justify-center py-8 lg:justify-start">
                <ButtonLink
                  linkProps={{ href: "/learn/" }}
                  className="w-fit text-lg"
                >
                  Other topics <MdChevronRight />
                </ButtonLink>
              </div>
            </div>
          </div>
        </HomeSection>

        <HomeSection tag="" title="The internet is changing">
          <span className="text-[5rem]">👷‍♀️🚧🔜</span>
        </HomeSection>

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
          <div className="flex flex-col justify-center gap-6 py-8 md:flex-row lg:justify-start">
            <ButtonLink
              linkProps={{ href: "/developers/" }}
              className="w-fit text-lg"
            >
              Builder&apos;s Portal <MdChevronRight />
            </ButtonLink>
            <ButtonLink
              linkProps={{ href: "/developers/docs/" }}
              className="w-fit text-lg"
              variant="outline"
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
          <div className="BUTTON_GROUP flex flex-wrap gap-3 py-8">
            <ButtonLink
              linkProps={{ href: "/discord/", hideArrow: true }}
              className="w-fit text-lg"
              variant="outline"
            >
              <FaDiscord />
            </ButtonLink>
            <ButtonLink
              linkProps={{ href: GITHUB_REPO_URL, hideArrow: true }}
              className="w-fit text-lg"
              variant="outline"
            >
              <FaGithub />
            </ButtonLink>
            <ButtonLink
              linkProps={{ href: "/community/" }}
              className="w-fit text-lg"
            >
              More on ethereum.org <MdChevronRight />
            </ButtonLink>
          </div>

          <WindowBox title="Next calls" Svg={Calendar}>
            {dummyCalendarData.map(({ date, title }, idx) => (
              <div
                key={title}
                className={cn(
                  "flex flex-col justify-between gap-6 border-t px-6 py-4 xl:flex-row",
                  idx === 0 && "bg-accent-gradient"
                )}
              >
                <div
                  className={cn(
                    "flex flex-col space-y-0.5 text-center text-base sm:text-start"
                  )}
                >
                  <p className="italic text-body-medium">{date}</p>
                  <p
                    className={cn(
                      "text-sm text-body",
                      idx === 0 && "font-bold"
                    )}
                  >
                    {title}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-fit w-full text-nowrap border-body !text-body sm:w-fit xl:self-center"
                >
                  Add to calendar <RxExternalLink />
                </Button>
              </div>
            ))}
          </WindowBox>

          {/* TODO: News sub-section */}
        </HomeSection>

        <HomeSection tag="" title="Ethereum events">
          <p>We have many community events scheduled around the globe</p>
          <div className="mt-4 lg:mt-16">
            <div className="flex flex-col gap-8 self-stretch md:flex-row">
              {upcomingEvents.map(
                ({
                  title,
                  href,
                  location,
                  description,
                  startDate,
                  endDate,
                  imageUrl,
                }) => {
                  return (
                    <a
                      href={href}
                      className="md:w-1/3 md:max-w-128"
                      key={title}
                    >
                      <Card
                        className={cn(
                          "w-full space-y-4",
                          "border-none shadow-none",
                          "transition-transform duration-100 hover:scale-105 hover:transition-transform hover:duration-100"
                        )}
                      >
                        <CardHeader className="bgBACKUP-bg-main-gradient h-48 w-full self-stretch overflow-hidden rounded-2xl bg-bg-main-gradient p-0">
                          {imageUrl && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={imageUrl}
                              alt=""
                              className="object-cover object-center"
                            />
                          )}
                          {/* TODO: Handle event image */}
                        </CardHeader>
                        <CardContent className="space-y-8 p-2">
                          <div>
                            <p className="text-2xl">{title}</p>
                            <p className="text-sm italic text-body-medium">
                              {new Intl.DateTimeFormat(locale, {
                                month: "2-digit",
                                day: "2-digit",
                                year: "numeric",
                              }).formatRange(
                                new Date(startDate),
                                new Date(endDate)
                              )}
                            </p>
                            <p className="text-sm italic text-body-medium">
                              {location}
                            </p>
                          </div>
                          <p>{description}</p>
                        </CardContent>
                      </Card>
                    </a>
                  )
                }
              )}
            </div>
          </div>
        </HomeSection>
        {/* Temporary coming soon section template */}
        {comingSoon.map((item) => (
          <HomeSection {...item} key={item.title} />
        ))}
      </div>
    </Flex>
  )
}

export default HomePage
