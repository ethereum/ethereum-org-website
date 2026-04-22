import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { ExtendedRollup, Lang, PageParams } from "@/lib/types"

import CalloutSSR from "@/components/CalloutSSR"
import { ContentHero, type ContentHeroProps } from "@/components/Hero"
import I18nProvider from "@/components/I18nProvider"
import Layer2NetworksTable from "@/components/Layer2NetworksTable/lazy"
import MainArticle from "@/components/MainArticle"
import NetworkMaturity from "@/components/NetworkMaturity"
import { ButtonLink } from "@/components/ui/buttons/Button"

import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { networkMaturity } from "@/lib/utils/networkMaturity"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { ethereumNetworkData, layer2Data } from "@/data/networks/networks"
import { walletsData } from "@/data/wallets/wallet-data"

import Layer2NetworksPageJsonLD from "./page-jsonld"

import {
  getEthereumMarketcapData,
  getGrowThePieBlockspaceData,
  getGrowThePieData,
  getGrowThePieMasterData,
  getL2beatData,
} from "@/lib/data"
import heroImg from "@/public/images/heroes/layer-2-hub-hero.png"
import Callout2Image from "@/public/images/layer-2/layer-2-walking.png"
import Callout1Image from "@/public/images/man-and-dog-playing.png"

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

  const heroProps: ContentHeroProps = {
    breadcrumbs: { slug: "/layer-2/networks", startDepth: 1 },
    heroImg,
    title: tCommon("nav-networks-explore-networks-label"),
    description: t("page-layer-2-networks-hero-description"),
  }

  return (
    <I18nProvider locale={locale} messages={messages}>
      <Layer2NetworksPageJsonLD
        locale={locale}
        layer2Data={layer2DataCompiled}
        contributors={contributors}
      />
      <MainArticle className="relative flex flex-col">
        <ContentHero {...heroProps} />

        <Layer2NetworksTable {...layer2NetworksProps} />

        <div id="more-advanced-cta" className="w-full px-8 py-9">
          <div className="bg-main-gradient flex flex-col gap-8 px-12 py-14">
            <h3>{t("page-layer-2-networks-more-advanced-title")}</h3>
            <div className="flex max-w-[768px] flex-col gap-8">
              <p>
                {t("page-layer-2-networks-more-advanced-descripton-1")}{" "}
                <strong>
                  {t("page-layer-2-networks-more-advanced-descripton-2")}
                </strong>
              </p>
              <p>{t("page-layer-2-networks-more-advanced-descripton-3")}</p>
            </div>
            <div className="flex flex-col gap-6 sm:flex-row">
              <ButtonLink href="https://l2beat.com">
                {t("page-layer-2-networks-more-advanced-link-1")}
              </ButtonLink>
              <ButtonLink href="https://growthepie.com">
                {t("page-layer-2-networks-more-advanced-link-2")}
              </ButtonLink>
            </div>
          </div>
        </div>

        <NetworkMaturity />

        <div
          id="callout-cards"
          className="flex w-full flex-col px-8 py-9 lg:flex-row lg:gap-16"
        >
          <CalloutSSR
            image={Callout1Image}
            title={t("page-layer-2-networks-callout-1-title")}
            description={t("page-layer-2-networks-callout-1-description")}
          >
            <div>
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
            </div>
          </CalloutSSR>
          <CalloutSSR
            image={Callout2Image}
            title={t("page-layer-2-networks-callout-2-title")}
            description={t("page-layer-2-networks-callout-2-description")}
          >
            <div>
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
            </div>
          </CalloutSSR>
        </div>
      </MainArticle>
    </I18nProvider>
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
