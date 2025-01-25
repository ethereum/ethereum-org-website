import { useRouter } from "next/router"
import type { GetStaticProps } from "next/types"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

import type { BasePageProps, Lang } from "@/lib/types"

import Callout from "@/components/Callout"
import { ContentHero, ContentHeroProps } from "@/components/Hero"
import Layer2NetworksTable from "@/components/Layer2NetworksTable"
import MainArticle from "@/components/MainArticle"
import PageMetadata from "@/components/PageMetadata"
import { ButtonLink } from "@/components/ui/buttons/Button"

import { dataLoader } from "@/lib/utils/data/dataLoader"
import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { networkMaturity } from "@/lib/utils/networkMaturity"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { ethereumNetworkData, layer2Data } from "@/data/networks/networks"
import { walletsData } from "@/data/wallets/wallet-data"

import { BASE_TIME_UNIT } from "@/lib/constants"

import { fetchEthereumMarketcap } from "@/lib/api/fetchEthereumMarketcap"
import { fetchGrowThePie } from "@/lib/api/fetchGrowThePie"
import { fetchGrowThePieBlockspace } from "@/lib/api/fetchGrowThePieBlockspace"
import { fetchGrowThePieMaster } from "@/lib/api/fetchGrowThePieMaster"
import { fetchL2beat } from "@/lib/api/fetchL2beat"
import Callout2Image from "@/public/images/layer-2/layer-2-walking.png"
import Callout1Image from "@/public/images/man-and-dog-playing.png"

// In seconds
const REVALIDATE_TIME = BASE_TIME_UNIT * 1

const loadData = dataLoader(
  [
    ["ethereumMarketcapData", fetchEthereumMarketcap],
    ["growThePieData", fetchGrowThePie],
    ["growThePieBlockspaceData", fetchGrowThePieBlockspace],
    ["growThePieMasterData", fetchGrowThePieMaster],
    ["l2beatData", fetchL2beat],
  ],
  REVALIDATE_TIME * 1000
)

export const getStaticProps = (async ({ locale }) => {
  const [
    ethereumMarketcapData,
    growThePieData,
    growThePieBlockspaceData,
    growThePieMasterData,
    l2beatData,
  ] = await loadData()

  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  const requiredNamespaces = getRequiredNamespacesForPage("/layer-2/networks")

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])

  const layer2DataCompiled = layer2Data
    .map((network) => {
      return {
        ...network,
        txCosts: growThePieData.dailyTxCosts[network.growthepieID],
        tvl: l2beatData.data.projects[network.l2beatID].tvl.breakdown.total,
        networkMaturity: networkMaturity(
          l2beatData.data.projects[network.l2beatID]
        ),
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

      const maturityDiff =
        maturityOrder[b.networkMaturity] - maturityOrder[a.networkMaturity]

      if (maturityDiff === 0) {
        return (b.tvl || 0) - (a.tvl || 0)
      }

      return maturityDiff
    })

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      contentNotTranslated,
      lastDeployLocaleTimestamp,
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
      },
    },
  }
}) satisfies GetStaticProps<BasePageProps>

const Layer2Networks = ({ layer2Data, locale, mainnetData }) => {
  const { pathname } = useRouter()

  const heroProps: ContentHeroProps = {
    breadcrumbs: { slug: pathname, startDepth: 1 },
    heroImg: "/images/layer-2/learn-hero.png",
    blurDataURL: "/images/layer-2/learn-hero.png",
    title: "Explore networks",
    description:
      "Using Ethereum today means interacting with hundreds of different networks and apps. All backed by Ethereum as the foundational backbone.",
  }

  return (
    <MainArticle className="relative flex flex-col">
      <PageMetadata
        title="Ethereum Layer 2:Explore networks"
        description="Using Ethereum today means interacting with hundreds of different networks and apps. All backed by Ethereum as the foundational backbone."
        image="/images/layer-2/learn-hero.png"
      />

      <ContentHero {...heroProps} />

      <Layer2NetworksTable
        layer2Data={layer2Data}
        locale={locale}
        mainnetData={mainnetData}
      />

      <div id="more-advanced-cta" className="w-full px-8 py-9">
        <div className="flex flex-col gap-8 bg-main-gradient px-12 py-14">
          <h3>Looking for more advanced overview?</h3>
          <div className="flex max-w-[768px] flex-col gap-8">
            <p>
              Many of the projects are{" "}
              <strong>still young and somewhat experimental.</strong>
            </p>
            <p>
              For more information on the technology, risks and trust
              assumptions of these networks, we recommend checking out L2BEAT,
              which provides a comprehensive risk assessment framework of each
              project and growthepie for general data analysis.
            </p>
          </div>
          <div className="flex flex-col gap-6 sm:flex-row">
            <ButtonLink href="https://l2beat.com">Visit l2beat.com</ButtonLink>
            <ButtonLink href="https://growthepie.xyz">
              Visit growthepie.xyz
            </ButtonLink>
          </div>
        </div>
      </div>

      <div
        id="callout-cards"
        className="flex w-full flex-col px-8 py-9 lg:flex-row lg:gap-16"
      >
        <Callout
          image={Callout1Image}
          title={"What are the benefits?"}
          description={
            "Ethereum's strength and security provides a platform for other networks to build upon."
          }
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
              Learn more
            </ButtonLink>
          </div>
        </Callout>
        <Callout
          image={Callout2Image}
          title={"Interested in more details?"}
          description={
            "Curious about the technology and reasons for this scaling approach? Learn more about the thinking and different technological approaches."
          }
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
              Learn more
            </ButtonLink>
          </div>
        </Callout>
      </div>
    </MainArticle>
  )
}

export default Layer2Networks
