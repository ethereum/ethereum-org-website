import { Fragment } from "react"
import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { ExtendedRollup, Lang, PageParams } from "@/lib/types"

import PageHero from "@/components/Hero/PageHero"
import I18nProvider from "@/components/I18nProvider"
import Layer2NetworksTable from "@/components/Layer2NetworksTable"
import MainArticle from "@/components/MainArticle"
import { ButtonLink } from "@/components/ui/buttons/Button"
import Callout from "@/components/ui/callout"
import { Flex } from "@/components/ui/flex"
import { Grid } from "@/components/ui/grid"
import InlineLink from "@/components/ui/Link"
import { Section } from "@/components/ui/section"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { cn } from "@/lib/utils/cn"
import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { networkMaturity } from "@/lib/utils/networkMaturity"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { ethereumNetworkData, layer2Data } from "@/data/networks/networks"
import { walletsData } from "@/data/wallets/wallet-data"

import PageJsonLD from "./page-jsonld"

import {
  getEthereumMarketcapData,
  getGrowThePieBlockspaceData,
  getGrowThePieData,
  getGrowThePieMasterData,
  getL2beatData,
} from "@/lib/data"
import heroImg from "@/public/images/counter-screen-network-towers-rings-collage-cut-out.png"
import layer2LearnCalloutImage from "@/public/images/network-column-rooftop-piping-construction.png"
import layer2CalloutImage from "@/public/images/man-and-dog-playing.png"
import developingImage from "@/public/images/network-maturity/developing.svg"
import emergingImage from "@/public/images/network-maturity/emerging.svg"
import maturingImage from "@/public/images/network-maturity/maturing.svg"
import robustImage from "@/public/images/network-maturity/robust.svg"

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  // Fetch data using the new data-layer functions (already cached)
  const [
    ethereumMarketcapData,
    growThePieData,
    growThePieBlockspaceData,
    growThePieMasterData,
    l2beatData,
  ] = await Promise.all([
    getEthereumMarketcapData(),
    getGrowThePieData(),
    getGrowThePieBlockspaceData(),
    getGrowThePieMasterData(),
    getL2beatData(),
  ])

  // Handle null cases - throw error if required data is missing
  if (!l2beatData) {
    throw new Error("Failed to fetch L2beat data")
  }

  if (!growThePieData) {
    throw new Error("Failed to fetch GrowThePie data")
  }

  if (!ethereumMarketcapData) {
    throw new Error("Failed to fetch Ethereum marketcap data")
  }

  const layer2DataCompiled = layer2Data
    .map((network) => {
      return {
        ...network,
        txCosts: growThePieData.dailyTxCosts[network.growthepieID],
        tvl: l2beatData.projects[network.l2beatID].tvs.breakdown.total,
        networkMaturity: networkMaturity(l2beatData.projects[network.l2beatID]),
        activeAddresses: growThePieData.activeAddresses[network.growthepieID],
        blockspaceData:
          (growThePieBlockspaceData || {})[network.growthepieID] || null,
        launchDate:
          (growThePieMasterData?.launchDates || {})[
            network.growthepieID.replace(/_/g, "-")
          ] || null,
        walletsSupported: walletsData
          .filter((wallet) =>
            wallet.supported_chains.includes(network.chainName)
          )
          .map((wallet) => wallet.name),
        walletsSupportedCount: `${
          walletsData.filter((wallet) =>
            wallet.supported_chains.includes(network.chainName)
          ).length
        }/${walletsData.length}`,
      }
    })
    .sort((a, b) => {
      const maturityOrder = {
        robust: 4,
        maturing: 3,
        developing: 2,
        emerging: 1,
      }

      const aMaturityValue = a.networkMaturity
        ? maturityOrder[a.networkMaturity]
        : 0
      const bMaturityValue = b.networkMaturity
        ? maturityOrder[b.networkMaturity]
        : 0
      const maturityDiff = bMaturityValue - aMaturityValue

      if (maturityDiff === 0) {
        return (b.tvl || 0) - (a.tvl || 0)
      }

      return maturityDiff
    })

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/layer-2/networks")
  const messages = pick(allMessages, requiredNamespaces)

  const layer2NetworksProps = {
    locale,
    layer2Data: layer2DataCompiled,
    mainnetData: {
      ...ethereumNetworkData,
      txCosts: growThePieData.dailyTxCosts.ethereum,
      tvl: "value" in ethereumMarketcapData ? ethereumMarketcapData.value : 0,
      walletsSupported: walletsData
        .filter((wallet) =>
          wallet.supported_chains.includes("Ethereum Mainnet")
        )
        .map((wallet) => wallet.name),
    } as ExtendedRollup,
  }

  const { contributors } = await getAppPageContributorInfo(
    "layer-2/networks",
    locale as Lang
  )

  const t = await getTranslations("page-layer-2-networks")
  const tCommon = await getTranslations("common")

  const maturityLevels = [
    {
      Icon: robustImage,
      label: t("page-layer-2-networks-robust-label"),
      cellClassName: "bg-blue-700 text-white",
      description: [
        t("page-layer-2-network-maturity-component-10"),
        t("page-layer-2-network-maturity-component-11"),
      ],
    },
    {
      Icon: maturingImage,
      label: t("page-layer-2-networks-maturing-label"),
      cellClassName: "bg-blue-400 text-white",
      description: [
        t("page-layer-2-network-maturity-component-12"),
        t("page-layer-2-network-maturity-component-13"),
        t("page-layer-2-network-maturity-component-14"),
      ],
    },
    {
      Icon: developingImage,
      label: t("page-layer-2-networks-developing-label"),
      cellClassName: "bg-blue-200 text-black",
      description: [
        t("page-layer-2-network-maturity-component-15"),
        t("page-layer-2-network-maturity-component-16"),
        t("page-layer-2-network-maturity-component-13"),
        t("page-layer-2-network-maturity-component-14"),
      ],
    },
    {
      Icon: emergingImage,
      label: t("page-layer-2-networks-emerging-label"),
      cellClassName: "bg-blue-50 text-black",
      description: [
        t("page-layer-2-network-maturity-component-15"),
        t("page-layer-2-network-maturity-component-17"),
        t("page-layer-2-network-maturity-component-18"),
      ],
    },
  ]

  return (
    <>
      <PageJsonLD
        locale={locale}
        layer2Data={layer2DataCompiled}
        contributors={contributors}
      />

      <PageHero
        breadcrumbs={{ slug: "/layer-2/networks", startDepth: 1 }}
        heroImg={heroImg}
        title={tCommon("nav-networks-explore-networks-label")}
        description={t("page-layer-2-networks-hero-description")}
      />

      <I18nProvider locale={locale} messages={messages}>
        <MainArticle className="flow pb-page *:[section]:not-first:px-page">
          {/* Table self-pads and stays full-width; as the first section it's
              exempt from *:[section]:not-first:px-page (no page padding here) */}
          <Section id="networks-table">
            <h2 className="sr-only">{tCommon("nav-ethereum-networks")}</h2>
            <Layer2NetworksTable {...layer2NetworksProps} />
          </Section>

          <Section id="more-advanced">
            <div className="flow rounded-2xl bg-linear-primary p-8 md:p-12">
              <h3>{t("page-layer-2-networks-more-advanced-title")}</h3>
              <p className="max-w-3xl">
                {t("page-layer-2-networks-more-advanced-descripton-1")}{" "}
                <strong>
                  {t("page-layer-2-networks-more-advanced-descripton-2")}
                </strong>
              </p>
              <p className="max-w-3xl">
                {t("page-layer-2-networks-more-advanced-descripton-3")}
              </p>
              <Flex
                data-flow="cta"
                className="gap-4 max-sm:flex-col max-sm:*:[a]:w-full"
              >
                <ButtonLink href="https://l2beat.com">
                  {t("page-layer-2-networks-more-advanced-link-1")}
                </ButtonLink>
                <ButtonLink href="https://growthepie.com">
                  {t("page-layer-2-networks-more-advanced-link-2")}
                </ButtonLink>
              </Flex>
            </div>
          </Section>

          <Section id="network-maturity">
            <h2>{t("page-layer-2-network-maturity-component-title")}</h2>
            <p className="max-w-4xl">
              {t.rich("page-layer-2-network-maturity-intro", {
                link: (chunks) => (
                  <InlineLink href="https://medium.com/l2beat/introducing-stages-a-framework-to-evaluate-rollups-maturity-d290bb22befe">
                    {chunks}
                  </InlineLink>
                ),
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </p>
            <p className="max-w-4xl">
              {t("page-layer-2-network-maturity-component-7")}
            </p>

            <Table variant="minimal" className="w-full max-w-4xl">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/2">
                    {t("page-layer-2-network-maturity-component-8")}
                  </TableHead>
                  <TableHead className="w-1/2">
                    {t("page-layer-2-network-maturity-component-9")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {maturityLevels.map(
                  ({ Icon, label, cellClassName, description }) => (
                    <TableRow key={label}>
                      <TableCell className={cn("align-middle", cellClassName)}>
                        <div className="flex items-center gap-2">
                          <Icon />
                          <strong>{label}</strong>
                        </div>
                      </TableCell>
                      <TableCell>
                        {description.map((line, index) => (
                          <Fragment key={index}>
                            {index > 0 && <br />}
                            {line}
                          </Fragment>
                        ))}
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </Section>

          <Section id="callouts">
            <Grid columns={2} size="wide">
              <Callout
                image={layer2CalloutImage}
                title={t("page-layer-2-networks-callout-1-title")}
                description={t("page-layer-2-networks-callout-1-description")}
              >
                <ButtonLink
                  href="/layer-2/"
                  customEventOptions={{
                    eventCategory: "l2_networks",
                    eventAction: "button_click",
                    eventName: "bottom_hub",
                  }}
                >
                  {tCommon("learn-more")}
                </ButtonLink>
              </Callout>
              <Callout
                image={layer2LearnCalloutImage}
                title={t("page-layer-2-networks-callout-2-title")}
                description={t("page-layer-2-networks-callout-2-description")}
              >
                <ButtonLink
                  href="/layer-2/learn/"
                  customEventOptions={{
                    eventCategory: "l2_networks",
                    eventAction: "button_click",
                    eventName: "bottom_learn",
                  }}
                >
                  {tCommon("learn-more")}
                </ButtonLink>
              </Callout>
            </Grid>
          </Section>
        </MainArticle>
      </I18nProvider>
    </>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const params = await props.params
  const { locale } = params

  const t = await getTranslations("page-layer-2-networks")

  return await getMetadata({
    locale,
    slug: ["layer-2", "networks"],
    title: t("page-layer-2-networks-meta-title"),
    description: t("page-layer-2-networks-hero-description"),
    image: "/images/heroes/layer-2-hub-hero.png",
  })
}

export default Page
