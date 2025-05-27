"use client"

import { BaseHTMLAttributes, useState } from "react"
import { MdHelpOutline, MdOutlineFilterList } from "react-icons/md"

import CalloutBanner from "@/components/CalloutBanner"
import DataProductCard from "@/components/DataProductCard"
import Emoji from "@/components/Emoji"
import FeedbackCard from "@/components/FeedbackCard"
import GhostCard from "@/components/GhostCard"
import HorizontalCard from "@/components/HorizontalCard"
import { Image } from "@/components/Image"
import InfoBanner from "@/components/InfoBanner"
import MainArticle from "@/components/MainArticle"
import PageHero from "@/components/PageHero"
import ProductList from "@/components/ProductList"
import { StandaloneQuizWidget } from "@/components/Quiz/QuizWidget"
import StablecoinAccordion from "@/components/StablecoinAccordion"
import StablecoinBoxGrid from "@/components/StablecoinBoxGrid"
import StablecoinsTable from "@/components/StablecoinsTable"
import Tooltip from "@/components/Tooltip"
import Translation from "@/components/Translation"
import { Button, ButtonLink } from "@/components/ui/buttons/Button"
import { Divider } from "@/components/ui/divider"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Flex, FlexProps } from "@/components/ui/flex"
import InlineLink from "@/components/ui/Link"

import { cn } from "@/lib/utils/cn"

import { Market } from "../page"
import { StablecoinType } from "../types"

import { useTranslation } from "@/hooks/useTranslation"
import sparkfiImg from "@/public/images/dapps/sparkfi.png"
import summerfiImg from "@/public/images/dapps/summerfi.png"
import dogeComputerImg from "@/public/images/doge-computer.png"
// -- dapps
import aaveImg from "@/public/images/stablecoins/aave.png"
import compoundImg from "@/public/images/stablecoins/compound.png"
// Static assets
import ghoLargeImg from "@/public/images/stablecoins/gho-large.png"
import gloLargeImg from "@/public/images/stablecoins/glo-large.png"
import heroImg from "@/public/images/stablecoins/hero.png"
import duneImg from "@/public/images/stablecoins/tools/dune.png"
import stablePulseImg from "@/public/images/stablecoins/tools/stable-pulse.png"
import stablecoinsWtfImg from "@/public/images/stablecoins/tools/stablecoinswtf.png"
import stablesInfoImg from "@/public/images/stablecoins/tools/stables-info.png"
import stablesWarsImg from "@/public/images/stablecoins/tools/stables-wars.png"
import visaImg from "@/public/images/stablecoins/tools/visa.png"
import usdcLargeImg from "@/public/images/stablecoins/usdc-large.png"
import usdsLargeImg from "@/public/images/stablecoins/usds-large.png"

type Props = {
  markets: Market[]
  marketsHasError: boolean
}

const Content = (props: BaseHTMLAttributes<HTMLDivElement>) => (
  <section className="w-full px-8 py-4" {...props} />
)

const Page = (props: FlexProps) => (
  <Flex className="mx-auto my-0 w-full flex-col items-center" {...props} />
)

const H3 = ({
  className,
  ...props
}: BaseHTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn("mb-8 mt-10", className)} {...props} />
)

const StablecoinsPage = ({ markets, marketsHasError }: Props) => {
  const { t } = useTranslation("page-stablecoins")

  const [visibleTypes, setVisibleTypes] = useState<Record<string, boolean>>({
    FIAT: true,
    CRYPTO: true,
    ASSET: true,
    ALGORITHMIC: true,
  })

  const uniquePegsWithCount = Object.values(markets).reduce(
    (acc, market) => {
      const peg = market.peg || "USD"
      const existingPeg = acc.find((item) => item.peg === peg)
      if (existingPeg) {
        existingPeg.count++
      } else {
        acc.push({ peg, count: 1 })
      }
      return acc
    },
    [] as Array<{ peg: string; count: number }>
  )

  // Sort by count in descending order (most popular first)
  uniquePegsWithCount.sort((a, b) => b.count - a.count)

  const uniquePegs = uniquePegsWithCount.map((item) => item.peg)

  const [visiblePegs, setVisiblePegs] = useState<Record<string, boolean>>(
    Object.fromEntries(uniquePegs.map((peg) => [peg, true]))
  )

  const [visibleRows, setVisibleRows] = useState(10)

  const tooltipContent = (
    <div>
      {t("common:data-provided-by")}{" "}
      <InlineLink href="https://www.coingecko.com/en/api">
        coingecko.com
      </InlineLink>
    </div>
  )

  const features = [
    {
      title: t("page-stablecoins-fiat-backed"),
      description: t("page-stablecoins-fiat-backed-description"),
      emoji: ":dollar:",
      pros: [
        t("page-stablecoins-fiat-backed-pro-1"),
        t("page-stablecoins-fiat-backed-pro-2"),
      ],
      cons: [
        t("page-stablecoins-fiat-backed-con-1"),
        t("page-stablecoins-fiat-backed-con-2"),
      ],
      links: [
        { text: "USDC", url: "https://www.circle.com/en/usdc" },
        { text: "USDT", url: "https://tether.to/" },
      ],
    },
    {
      title: t("page-stablecoins-crypto-backed"),
      description: t("page-stablecoins-crypto-backed-description"),
      emoji: ":unicorn:",
      pros: [
        t("page-stablecoins-crypto-backed-pro-1"),
        t("page-stablecoins-crypto-backed-pro-2"),
        t("page-stablecoins-crypto-backed-pro-3"),
      ],
      cons: [
        t("page-stablecoins-crypto-backed-con-1"),
        t("page-stablecoins-crypto-backed-con-2"),
      ],
      links: [
        { text: "USDS", url: "https://sky.money/" },
        { text: "LUSD", url: "https://www.liquity.org/" },
        { text: "crvUSD", url: "https://www.curve.finance/" },
        { text: "HAI", url: "https://letsgethai.com/" },
      ],
    },
    {
      title: t("page-stablecoins-precious-metals"),
      description: t(
        "page-stablecoins:page-stablecoins-precious-metals-description"
      ),
      emoji: ":gem_stone:",
      pros: [t("page-stablecoins-precious-metals-pro-1")],
      cons: [
        t("page-stablecoins-precious-metals-con-1"),
        t("page-stablecoins-precious-metals-con-2"),
      ],
      links: [
        { text: "Pax Gold", url: "https://paxos.com/paxgold/" },
        { text: "Tether Gold", url: "https://gold.tether.to/" },
      ],
    },
    {
      title: t("page-stablecoins-algorithmic"),
      description: t("page-stablecoins-algorithmic-description"),
      disclaimer: t("page-stablecoins-algorithmic-disclaimer"),
      emoji: ":chart_with_downwards_trend:",
      pros: [
        t("page-stablecoins-algorithmic-pro-1"),
        t("page-stablecoins-algorithmic-pro-2"),
      ],
      cons: [
        t("page-stablecoins-algorithmic-con-1"),
        t("page-stablecoins-algorithmic-con-2"),
      ],
      links: [
        { text: "Ampleforth", url: "https://www.ampleforth.org/" },
        { text: "FRAX", url: "https://frax.finance/" },
      ],
    },
  ]

  const tokens = [
    {
      emoji: ":globe_showing_americas:",
      description: (
        <Translation id="page-stablecoins:page-stablecoins-stablecoins-feature-1" />
      ),
    },
    {
      emoji: ":chart_with_upwards_trend:",
      description: (
        <Translation id="page-stablecoins:page-stablecoins-stablecoins-feature-2" />
      ),
    },
    {
      emoji: ":handshake:",
      description: (
        <Translation id="page-stablecoins:page-stablecoins-stablecoins-feature-3" />
      ),
    },
    {
      emoji: ":key:",
      description: (
        <Translation id="page-stablecoins:page-stablecoins-stablecoins-feature-4" />
      ),
    },
  ]

  const dapps = [
    {
      url: "https://aave.com",
      alt: t("aave-logo"),
      image: aaveImg,
      width: 64 * 3,
      name: "Aave",
      description: t("page-stablecoins-stablecoins-dapp-description-1"),
      className:
        "[&>[data-label='banner']]:bg-gradient-to-tr from-[#5cb8c4] to-[#aa589b]",
    },
    {
      url: "https://compound.finance",
      alt: t("compound-logo"),
      image: compoundImg,
      width: 64 * 2,
      name: "Compound",
      description: t("page-stablecoins-stablecoins-dapp-description-2"),
      className:
        "[&>[data-label='banner']]:bg-gradient-to-tr dark:from-white/5 ",
    },
    {
      url: "https://summer.fi/",
      alt: t("summerfi-logo"),
      image: summerfiImg,
      width: (64 * 3) / 2,
      name: "Summer.fi",
      description: t("page-stablecoins-stablecoins-dapp-description-4"),
      className:
        "[&>[data-label='banner']]:bg-gradient-to-br from-[#c7efe6] to-[#eeeac7]",
    },
    {
      url: "https://spark.fi/",
      alt: t("sparkfi-logo"),
      image: sparkfiImg,
      width: 64 * 2,
      name: "Spark Protocol",
      description: t("page-stablecoins-stablecoins-dapp-description-5"),
      className:
        "[&>[data-label='banner']]:bg-gradient-to-tr dark:from-white/5",
    },
  ]

  const stablecoinsType: Record<StablecoinType, string> = {
    FIAT: t("page-stablecoins-stablecoins-table-type-fiat-backed"),
    CRYPTO: t("page-stablecoins-stablecoins-table-type-crypto-backed"),
    ASSET: t("page-stablecoins-stablecoins-table-type-precious-metals-backed"),
    ALGORITHMIC: t("page-stablecoins-algorithmic"),
  }

  const filteredContent = markets.filter(
    (item) => visibleTypes[item.type] && visiblePegs[item.peg || "USD"]
  )
  const hasMoreRows = filteredContent.length > visibleRows
  const displayedContent = filteredContent.slice(0, visibleRows)

  const typeFilters: { id: StablecoinType; label: string }[] = [
    { id: "FIAT", label: stablecoinsType.FIAT },
    { id: "CRYPTO", label: stablecoinsType.CRYPTO },
    { id: "ASSET", label: stablecoinsType.ASSET },
    { id: "ALGORITHMIC", label: stablecoinsType.ALGORITHMIC },
  ]

  // Peg filters sorted by most common (uniquePegsWithCount is already sorted)
  const pegFilters = uniquePegsWithCount.map((item) => ({
    id: item.peg,
    label: item.peg,
  }))

  const noFiltersActive = Object.values(visibleTypes).every((value) => !value)

  const toggleType = (type: string) => {
    setVisibleTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }))
  }

  const selectOnlyType = (type: string) => {
    setVisibleTypes(
      Object.fromEntries(Object.keys(visibleTypes).map((k) => [k, k === type]))
    )
  }

  const showAllTypes = () => {
    setVisibleTypes(
      Object.fromEntries(Object.keys(visibleTypes).map((k) => [k, true]))
    )
  }

  const togglePeg = (peg: string) => {
    setVisiblePegs((prev) => ({
      ...prev,
      [peg]: !prev[peg],
    }))
  }

  const selectOnlyPeg = (peg: string) => {
    setVisiblePegs(
      Object.fromEntries(Object.keys(visiblePegs).map((k) => [k, k === peg]))
    )
  }

  const showAllPegs = () => {
    setVisiblePegs(
      Object.fromEntries(Object.keys(visiblePegs).map((k) => [k, true]))
    )
  }

  // Count active filters for type and peg
  const activeTypeCount = Object.values(visibleTypes).filter(Boolean).length
  const activePegCount = Object.values(visiblePegs).filter(Boolean).length
  const totalTypeCount = Object.keys(visibleTypes).length
  const totalPegCount = Object.keys(visiblePegs).length

  const tableColumns = [
    t("page-stablecoins-stablecoins-table-header-column-1"),
    <div key="market-cap-header" className="text-end">
      {t("page-stablecoins-stablecoins-table-header-column-2")}
    </div>,
    <DropdownMenu key="type-filter">
      <DropdownMenuTrigger className="ms-auto flex items-center gap-2 text-end">
        {t("page-stablecoins-stablecoins-table-header-column-3")}
        {activeTypeCount !== totalTypeCount && (
          <span className="self-baseline text-sm text-body-medium">
            ({activeTypeCount})
          </span>
        )}
        <MdOutlineFilterList size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {typeFilters.map((filter) => (
          <div
            key={filter.id}
            className="flex items-center justify-between pr-2"
          >
            <DropdownMenuCheckboxItem
              checked={visibleTypes[filter.id]}
              onCheckedChange={() => toggleType(filter.id)}
            >
              {filter.label}
            </DropdownMenuCheckboxItem>
            <Button
              variant="link"
              size="sm"
              className="h-auto px-1 py-0 text-xs text-body-medium no-underline hover:underline"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                selectOnlyType(filter.id)
              }}
            >
              (only)
            </Button>
          </div>
        ))}
        {Object.values(visibleTypes).some((v) => !v) && (
          <div className="mt-2 flex justify-center">
            <Button
              variant="link"
              size="sm"
              className="text-xs text-body-medium no-underline hover:underline"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                showAllTypes()
              }}
            >
              Show all
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>,
    <DropdownMenu key="peg-filter">
      <DropdownMenuTrigger className="ms-auto flex items-center gap-2 text-end">
        {t("page-stablecoins-stablecoins-table-header-column-4")}
        {activePegCount !== totalPegCount && (
          <span className="text-xs text-body-medium">({activePegCount})</span>
        )}
        <MdOutlineFilterList size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {pegFilters.map((filter) => (
          <div
            key={filter.id}
            className="flex items-center justify-between pr-2"
          >
            <DropdownMenuCheckboxItem
              checked={visiblePegs[filter.id]}
              onCheckedChange={() => togglePeg(filter.id)}
            >
              {filter.label}
            </DropdownMenuCheckboxItem>
            <Button
              variant="link"
              size="sm"
              className="h-auto px-1 py-0 text-xs text-body-medium no-underline hover:underline"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                selectOnlyPeg(filter.id)
              }}
            >
              (only)
            </Button>
          </div>
        ))}
        {Object.values(visiblePegs).some((v) => !v) && (
          <div className="mt-2 flex justify-center">
            <Button
              variant="link"
              size="sm"
              className="text-xs text-body-medium no-underline hover:underline"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                showAllPegs()
              }}
            >
              Show all
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>,
  ]

  const getMarketCapByName = (name: string) =>
    markets.find((m) => m.symbol.toUpperCase() === name.toUpperCase())
      ?.marketCap

  const editorsChoices = [
    {
      title: "USDS",
      body: t("page-stablecoins-usds-banner-body"),
      image: usdsLargeImg,
      alt: t("page-stablecoins-usds-logo"),
      swapUrl: "https://swap.cow.fi/#/1/swap/ETH/USDS",
      swapButtonText: t("page-stablecoins-usds-banner-swap-button"),
      learnUrl: "https://sky.money/",
      learnButtonText: t("page-stablecoins-usds-banner-learn-button"),
      shadowColor: "amber",
      marketCap: getMarketCapByName("usds"),
    },
    {
      title: "USDC",
      body: t("page-stablecoins-usdc-banner-body"),
      image: usdcLargeImg,
      alt: t("page-stablecoins-usdc-logo"),
      swapUrl: "https://www.usdc.com/providers",
      swapButtonText: t("page-stablecoins-usdc-banner-swap-button"),
      learnUrl: "https://www.circle.com/en/usdc",
      learnButtonText: t("page-stablecoins-usdc-banner-learn-button"),
      shadowColor: "blue",
      marketCap: getMarketCapByName("usdc"),
    },
    {
      title: "GHO",
      body: t("page-stablecoins-gho-banner-body"),
      image: ghoLargeImg,
      alt: t("page-stablecoins-gho-logo"),
      swapUrl:
        "https://matcha.xyz/tokens/ethereum/eth?buyChain=1&buyAddress=0x40d16fc0246ad3160ccc09b8d0d3a2cd28ae6c2f&sellChain=1&sellAddress=0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      swapButtonText: t("page-stablecoins-gho-banner-swap-button"),
      learnUrl: "https://aave.com/docs/primitives/gho",
      learnButtonText: t("page-stablecoins-gho-banner-learn-button"),
      shadowColor: "green",
      marketCap: getMarketCapByName("gho"),
    },
    {
      title: "Glo Dollar",
      body: t("page-stablecoins-glo-banner-body"),
      image: gloLargeImg,
      alt: t("page-stablecoins-glo-logo"),
      swapUrl: "https://app.glodollar.org/",
      swapButtonText: t("page-stablecoins-glo-banner-swap-button"),
      learnUrl: "https://www.glodollar.org/",
      learnButtonText: t("page-stablecoins-glo-banner-learn-button"),
      shadowColor: "cyan",
      marketCap: getMarketCapByName("usdglo"),
    },
  ]

  const heroContent = {
    title: t("page-stablecoins-title"),
    header: t("page-stablecoins-hero-header"),
    subtitle: t("page-stablecoins-hero-subtitle"),
    image: heroImg,
    alt: t("page-stablecoins-hero-alt"),
    buttons: [
      {
        content: t("page-stablecoins-hero-button"),
        toId: "explore",
        matomo: {
          eventCategory: "stablecoins hero buttons",
          eventAction: "click",
          eventName: "get stablecoins",
        },
      },
      {
        content: t("page-stablecoins-how-they-work-button"),
        toId: "how",
        variant: "outline" as const,
        matomo: {
          eventCategory: "stablecoins hero buttons",
          eventAction: "click",
          eventName: "how they work",
        },
      },
    ],
  }

  const toolsData = [
    {
      title: "Stablecoins.wtf",
      description: t("page-stablecoins-tools-stablecoinswtf-description"),
      link: "https://stablecoins.wtf",
      image: stablecoinsWtfImg,
      alt: "Stablecoins.wtf",
    },
    {
      title: "Stablepulse",
      description: t("page-stablecoins-tools-stablepulse-description"),
      link: "https://www.stablepulse.org/",
      image: stablePulseImg,
      alt: "Stablepulse logo",
      className: "[&_img]:p-1",
    },
    {
      title: "Stables.info",
      description: t("page-stablecoins-tools-stablesinfo-description"),
      link: "https://stables.info/",
      image: stablesInfoImg,
      alt: "Stables.info logo",
    },
    {
      title: "Dune Stablecoin Metrics",
      description: t("page-stablecoins-tools-dune-description"),
      link: "https://dune.com/overview/stablecoin",
      image: duneImg,
      alt: "Dune Stablecoin Metrics logo",
      className: "dark:[&_img]:invert [&_img]:p-2",
    },
    {
      title: "Visa Onchain Analytics",
      description: t("page-stablecoins-tools-visa-description"),
      link: "https://visaonchainanalytics.com/",
      image: visaImg,
      alt: "Visa Onchain Analytics logo",
    },
    {
      title: "Stablewars",
      description: t("page-stablecoins-tools-stablewars-description"),
      link: "https://stablewars.xyz/",
      image: stablesWarsImg,
      alt: "Stablewars logo",
      className: "[&_img]:p-1",
    },
  ]

  const resetFilters = () => {
    showAllTypes()
    showAllPegs()
  }

  return (
    <Page asChild>
      <MainArticle>
        <PageHero isReverse content={heroContent} />
        <Divider />
        <Content>
          <Flex className="mb-8 me-8 w-full flex-col items-start lg:flex-row">
            <div className="me-auto ms-auto w-full lg:me-2 lg:ms-0">
              <h2 className="mb-8">{t("page-stablecoins-why-stablecoins")}</h2>
              <p className="mb-6">
                {t("page-stablecoins-prices-definition")}{" "}
                <InlineLink href="#how">
                  {t("page-stablecoins-prices-definition-how")}
                </InlineLink>
              </p>
            </div>
          </Flex>
          <Flex className="mb-8 me-0 w-full flex-col items-start lg:me-8 lg:flex-row">
            <Flex className="mx-auto w-full flex-col gap-2 lg:mx-8 lg:my-0">
              {tokens.map((token, index) => (
                <div key={index} className="my-2 min-w-full">
                  <HorizontalCard
                    emoji={token.emoji}
                    description={token.description}
                  />
                </div>
              ))}
            </Flex>
            <GhostCard className="me-0 mt-16 max-w-[640px] lg:me-8 lg:mt-2">
              <Emoji text=":pizza:" className="text-5xl" />
              <H3>{t("page-stablecoins-bitcoin-pizza")}</H3>
              <p className="mb-6">
                {t("page-stablecoins-bitcoin-pizza-body")}{" "}
              </p>
            </GhostCard>
          </Flex>
        </Content>
        <div
          className={cn(
            "my-8 w-full py-16 shadow-inner",
            "bg-gradient-to-r from-accent-a/10 to-accent-c/10",
            "dark:bg-gradient-to-tr dark:from-primary/20 dark:from-20% dark:via-accent-a/20 dark:via-60% dark:to-accent-c/20 dark:to-95%"
          )}
        >
          <div className="-mb-8 w-full px-8 py-4">
            <h2 className="mb-8">{t("page-stablecoins-find-stablecoin")}</h2>
            <Flex className="me-auto ms-auto w-full flex-col justify-center lg:me-2 lg:ms-0 lg:w-1/2">
              <p className="mb-6">
                {t("page-stablecoins-find-stablecoin-intro")}
              </p>
              <ul>
                <li>
                  <InlineLink href="#how">
                    {t("page-stablecoins-find-stablecoin-types-link")}
                  </InlineLink>
                </li>
                <li>
                  <InlineLink href="#explore">
                    {t("page-stablecoins-find-stablecoin-how-to-get-them")}
                  </InlineLink>
                </li>
              </ul>
            </Flex>

            <H3 className="mb-4 mt-0">
              {t("page-stablecoins-editors-choice")}
            </H3>
            <p className="mb-6">{t("page-stablecoins-editors-choice-intro")}</p>

            <div className="mb-16 grid grid-cols-1 gap-16 lg:grid-cols-2">
              {editorsChoices.map((choice, idx) => (
                <Flex
                  className="w-full flex-col-reverse justify-between gap-x-8 rounded-sm border border-border-high-contrast bg-background p-8 text-body sm:flex-row"
                  key={idx}
                  style={{
                    boxShadow: `0.75rem 0.75rem 0 hsla(var(--${choice.shadowColor}-500), 0.25)`,
                  }}
                >
                  <Flex className="flex-col">
                    <div>
                      <h4 className="mb-2 text-3xl">{choice.title}</h4>
                      <p className="mb-6 text-body-medium">{choice.body}</p>
                    </div>
                    <div className="mt-auto">
                      <Flex className="flex-col">
                        <div>
                          <ButtonLink
                            className="mb-4 me-4"
                            href={choice.swapUrl}
                          >
                            {choice.swapButtonText}
                          </ButtonLink>
                        </div>
                        <div>
                          <ButtonLink
                            variant="outline"
                            href={choice.learnUrl}
                            isSecondary
                          >
                            {choice.learnButtonText}
                          </ButtonLink>
                        </div>
                      </Flex>
                    </div>
                  </Flex>
                  <Flex className="items-center justify-between gap-x-8 gap-y-4 max-sm:mb-8 max-sm:max-h-16 sm:flex-col sm:justify-center">
                    <div className="relative isolate my-8 max-w-24 self-center bg-cover bg-repeat max-sm:w-16 sm:min-w-40 sm:max-w-40 md:my-0">
                      <Image
                        src={choice.image}
                        alt=""
                        data-label="blur-decorator"
                        aria-disabled
                        className="absolute inset-0 z-[-1] blur-[12px]"
                      />
                      <Image src={choice.image} alt={choice.alt} />
                    </div>
                    <div>
                      <div className="text-center">
                        {choice.marketCap ? (
                          <span className="text-lg font-semibold">
                            {choice.marketCap}
                          </span>
                        ) : (
                          <span className="text-lg text-body-medium">-</span>
                        )}
                      </div>
                      <div className="text-center text-sm text-body-medium">
                        <Translation id="page-stablecoins:page-stablecoins-stablecoins-table-header-column-2" />
                      </div>
                    </div>
                  </Flex>
                </Flex>
              ))}
            </div>

            <H3>
              {t("page-stablecoins-top-coins")}
              <Tooltip content={tooltipContent}>
                <MdHelpOutline className="ms-2 fill-body" size={16} />
              </Tooltip>
            </H3>
            <InfoBanner className="mb-4" emoji="⚠️" isWarning>
              {t("page-stablecoins-algorithmic-disclaimer")}
            </InfoBanner>
            <p className="mb-6">
              {t("page-stablecoins-top-coins-intro")}{" "}
              {t("page-stablecoins-top-coins-intro-code")}
            </p>
          </div>
          <div className="mx-auto w-full max-w-screen-xl overflow-x-auto px-8 py-4">
            <StablecoinsTable
              columns={tableColumns}
              content={displayedContent}
              hasError={marketsHasError}
              intlTypeNames={stablecoinsType}
              noFiltersActive={noFiltersActive}
            />
            {hasMoreRows && (
              <div className="mt-4 flex justify-center">
                <Button
                  onClick={() => setVisibleRows((prev) => prev + 10)}
                  variant="outline"
                >
                  {t("page-stablecoins-show-more")}
                </Button>
              </div>
            )}
            {displayedContent.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12">
                <p className="mb-4 text-lg text-body-medium">
                  {t("page-stablecoins-no-results")}
                </p>
                <Button variant="outline" onClick={resetFilters}>
                  {t("page-stablecoins-reset-filters")}
                </Button>
              </div>
            )}
          </div>
        </div>
        <Content id="explore">
          <h2 className="mb-8">{t("page-stablecoins-get-stablecoins")}</h2>
          <Flex className="w-full items-center pb-4 pe-0 ps-0 lg:pe-8 lg:ps-8">
            <StablecoinAccordion />
          </Flex>
        </Content>
        <Divider />
        <Content>
          <CalloutBanner
            className="mx-0 mb-16 mt-8"
            titleKey={
              "page-stablecoins:page-stablecoins-stablecoins-dapp-callout-title"
            }
            descriptionKey={
              "page-stablecoins:page-stablecoins-stablecoins-dapp-callout-description"
            }
            image={dogeComputerImg}
            imageWidth={600}
            alt={t("page-stablecoins-stablecoins-dapp-callout-image-alt")}
          >
            <div className="flex flex-wrap gap-4">
              <ButtonLink href="/dapps/">
                {t("page-stablecoins-explore-dapps")}
              </ButtonLink>
              <ButtonLink
                variant="outline"
                href="/defi/"
                className="whitespace-normal"
                isSecondary
              >
                {t("page-stablecoins-more-defi-button")}
              </ButtonLink>
            </div>
          </CalloutBanner>
          <h2>{t("page-stablecoins-save-stablecoins")}</h2>
          <Flex className="mb-8 me-8 w-full flex-col items-start lg:flex-row">
            <div className="me-auto ms-auto w-full lg:me-2 lg:ms-0">
              <p className="mb-6">
                {t("page-stablecoins-save-stablecoins-body")}
              </p>
              <H3>{t("page-stablecoins-interest-earning-dapps")}</H3>
              <p className="mb-6">{t("page-stablecoins-saving")}</p>
            </div>
          </Flex>
          <div className="mb-16 grid grid-cols-[repeat(auto-fill,_minmax(min(100%,_280px),_1fr))] gap-8">
            {dapps.map((dapp, idx) => (
              <DataProductCard
                key={idx}
                url={dapp.url}
                alt={dapp.alt}
                image={dapp.image!}
                imgWidth={dapp.width!}
                name={dapp.name}
                description={dapp.description}
                className={dapp.className}
              />
            ))}
          </div>
        </Content>
        <Divider />
        <Content id="how">
          <h2 className="mb-8">{t("page-stablecoins-types-of-stablecoin")}</h2>
          <InfoBanner emoji="⚠️" isWarning>
            <H3 className="mb-4 mt-0">
              {t("page-stablecoins-research-warning-title")}
            </H3>
            {t("page-stablecoins-algorithmic-disclaimer")}
          </InfoBanner>
          <StablecoinBoxGrid items={features} />
        </Content>
        <div id="tools" className="w-full px-8 py-12">
          <h2 className="mb-8">{t("page-stablecoins-tools-title")}</h2>

          <div
            className={cn(
              "[&_[aria-labelledby='category-name']]:grid [&_[aria-labelledby='category-name']]:grid-cols-1 [&_[aria-labelledby='category-name']]:gap-x-16 md:[&_[aria-labelledby='category-name']]:grid-cols-2",
              toolsData.length % 2 === 0 &&
                "md:[&_[aria-labelledby='category-name']>:not(:nth-last-child(-n+2))]:border-b md:[&_[aria-labelledby='category-name']>:nth-last-child(-n+2)]:border-b-0"
            )}
          >
            <ProductList
              actionLabel={t("page-stablecoins:page-dapps-ready-button")}
              category={t("page-stablecoins-category-dashboard-and-education")}
              content={toolsData}
            />
          </div>
        </div>
        <Content>
          <StandaloneQuizWidget quizKey="stablecoins" />
          <FeedbackCard />
        </Content>
      </MainArticle>
    </Page>
  )
}

export default StablecoinsPage
