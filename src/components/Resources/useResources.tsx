import { useTranslation } from "next-i18next"

import BigNumber from "../BigNumber"

import type { DashboardBox, DashboardSection } from "./types"

import IconBeaconchain from "@/public/images/resources/beaconcha-in.png"
import IconBlobsGuru from "@/public/images/resources/blobsguru.png"
import IconBlocknative from "@/public/images/resources/blocknative.png"
import IconBlockscout from "@/public/images/resources/blockscout.webp"
import IconCryptwerk from "@/public/images/resources/cryptowerk.png"
import IconDefiLlama from "@/public/images/resources/defi-llama.png"
import IconDefiMarketCap from "@/public/images/resources/defi-market-cap.png"
import IconDefiScan from "@/public/images/resources/defi-scan.png"
import IconEas from "@/public/images/resources/eas.png"
import IconEigenphi from "@/public/images/resources/eigenphi.png"
import IconEthGlyphBlack from "@/public/images/resources/eth-glyph-black.png"
import IconEthGlyphBlueCircle from "@/public/images/resources/eth-glyph-blue-circle.png"
import IconEthGlyphEOrg from "@/public/images/resources/eth-glyph-e-org.png"
import IconEthGlyphRainbowFrame from "@/public/images/resources/eth-glyph-rainbow.frame.png"
import IconEtherscan from "@/public/images/resources/etherscan.png"
import IconEthproofs from "@/public/images/resources/ethproofs.png"
import IconEthstaker from "@/public/images/resources/ethstaker.png"
import IconFarcaster from "@/public/images/resources/farcaster.png"
import IconGrowthepie from "@/public/images/resources/growthepie.png"
import IconL2beat from "@/public/images/resources/l2beat.png"
import IconNftgo from "@/public/images/resources/nftgo.png"
import IconNodewatch from "@/public/images/resources/nodewatch.png"
import IconRatedNetwork from "@/public/images/resources/rated-network.png"
import IconRelayscan from "@/public/images/resources/relayscan.png"
import IconRwa from "@/public/images/resources/rwa.png"
import IconStablecoinsWtf from "@/public/images/resources/stablecoins-wtf.png"
import IconSupermajority from "@/public/images/resources/supermajority.png"
import IconUltrasoundMoney from "@/public/images/resources/ultrasound-money.png"
import IconVisaOnchainAnalytics from "@/public/images/resources/visa-onchain-analytcs.png"

const tempBigNumber = (
  <BigNumber className="items-center" value="$0.006">
    todo: use real big numbers
  </BigNumber>
)

export const useResources = (): DashboardSection[] => {
  const { t } = useTranslation("page-resources")
  const networkBoxes: DashboardBox[] = [
    {
      title: t("page-resources-network-layer2-title"),
      metric: tempBigNumber,
      items: [
        {
          title: "L2 Beat",
          description: t("page-resources-network-layer2-l2beat-description"),
          href: "https://l2beat.com/",
          imgSrc: IconL2beat,
        },
        {
          title: "Growthepie",
          description: t(
            "page-resources-network-layer2-growthepie-description"
          ),
          href: "https://www.growthepie.xyz/",
          imgSrc: IconGrowthepie,
        },
        {
          title: "L2 Fees",
          description: t("page-resources-network-layer2-l2fees-description"),
          href: "https://l2fees.info/",
          imgSrc: IconEthGlyphBlueCircle,
        },
      ],
    },
    {
      title: t("page-resources-block-explorers-title"),
      metric: "todo",
      items: [
        {
          title: "Blockscout",
          description: t(
            "page-resources-block-explorers-blockscout-description"
          ),
          href: "https://ethereum.blockscout.com",
          imgSrc: IconBlockscout,
        },
        {
          title: "Etherscan",
          description: t(
            "page-resources-block-explorers-etherscan-description"
          ),
          href: "https://etherscan.io",
          imgSrc: IconEtherscan,
        },
        {
          title: "Beaconcha.in",
          description: t(
            "page-resources-block-explorers-beaconchain-description"
          ),
          href: "https://beaconcha.in",
          imgSrc: IconBeaconchain,
        },
        {
          title: "Txcity.io",
          description: t("page-resources-block-explorers-txcity-description"),
          href: "https://txcity.io/",
          imgSrc: IconEthGlyphBlueCircle,
        },
      ],
    },
    {
      title: t("page-resources-eth-asset-title"),
      metric: "todo - semi-circle progress chart",
      items: [
        {
          title: "Etherealize Dashboard",
          description: t("page-resources-eth-asset-etherealize-description"),
          href: "https://dashboard.etherealize.io/",
          imgSrc: IconEthGlyphBlueCircle,
        },
        {
          title: "Ultra Sound Money",
          description: t("page-resources-eth-asset-ultrasound-description"),
          href: "https://ultrasound.money/",
          imgSrc: IconUltrasoundMoney,
        },
        {
          title: "ETH is Money",
          description: t("page-resources-eth-asset-ethismoney-description"),
          href: "https://www.ethismoney.xyz/",
          imgSrc: IconEthGlyphBlueCircle,
        },
        {
          title: "Ethereum Now",
          description: t("page-resources-eth-asset-ethernow-description"),
          href: "https://www.ethernow.xyz",
          imgSrc: IconBlocknative,
        },
      ],
    },
    {
      title: t("page-resources-gas-title"),
      metric: "todo",
      items: [
        {
          title: "Ethereum Gas Tracker",
          description: t("page-resources-gas-etherscan-description"),
          href: "https://etherscan.io/gastracker",
          imgSrc: IconEthGlyphBlueCircle,
        },
        {
          title: "Blocknative Gas Estimator",
          description: t("page-resources-gas-blocknative-description"),
          href: "https://www.blocknative.com/gas-estimator",
          imgSrc: IconBlocknative,
        },
        {
          title: "GasFees.io",
          description: t("page-resources-gas-gasfees-description"),
          href: "https://www.gasfees.io/",
          imgSrc: IconEthGlyphBlueCircle,
        },
      ],
    },
  ]

  const usingBoxes: DashboardBox[] = [
    {
      title: t("page-resources-defi-title"),
      metric: tempBigNumber,
      items: [
        {
          title: "DeFi Llama",
          description: t("page-resources-defi-defillama-description"),
          href: "https://defillama.com",
          imgSrc: IconDefiLlama,
        },
        {
          title: "DeFi Market Cap",
          description: t("page-resources-defi-defimarketcap-description"),
          href: "https://defimarketcap.io",
          imgSrc: IconDefiMarketCap,
        },
        {
          title: "EigenPhi",
          description: t("page-resources-defi-eigenphi-description"),
          href: "https://www.eigenphi.io",
          imgSrc: IconEigenphi,
        },
        {
          title: "DeFiScan",
          description: t("page-resources-defi-defiscan-description"),
          href: "https://defiscan.info",
          imgSrc: IconDefiScan,
        },
      ],
    },
    {
      title: t("page-resources-stablecoins-title"),
      metric: tempBigNumber,
      items: [
        {
          title: "stablecoins.wtf",
          description: t(
            "page-resources-stablecoins-stablecoinswtf-description"
          ),
          href: "https://stablecoins.wtf/",
          imgSrc: IconStablecoinsWtf,
        },
        {
          title: "Visa Onchain Analytics Dashboard",
          description: t("page-resources-stablecoins-visa-description"),
          href: "https://visaonchainanalytics.com",
          imgSrc: IconVisaOnchainAnalytics,
        },
        {
          title: "Real World Assets",
          description: t("page-resources-stablecoins-rwa-description"),
          href: "https://app.rwa.xyz/stablecoins",
          imgSrc: IconRwa,
        },
      ],
    },
    {
      title: t("page-resources-nft-title"),
      metric: "todo - bar chart",
      items: [
        {
          title: "Etherscan - Top NFT",
          description: t("page-resources-nft-etherscan-description"),
          href: "https://etherscan.io/nft-top-contracts",
          imgSrc: IconEtherscan,
        },
        {
          title: "NFTgo",
          description: t("page-resources-nft-nftgo-description"),
          href: "https://nftgo.io/macro/market-overview",
          imgSrc: IconNftgo,
        },
      ],
    },
    {
      title: t("page-resources-applications-title"),
      items: [
        {
          title: "Ethereum Ecosystem",
          description: t("page-resources-applications-ecosystem-description"),
          href: "https://www.ethereum-ecosystem.com/apps",
          imgSrc: IconEthGlyphEOrg,
        },
        {
          title: "Farcaster Network",
          description: t("page-resources-applications-farcaster-description"),
          href: "https://www.farcaster.network",
          imgSrc: IconFarcaster,
        },
        {
          title: "Dapp Radar",
          description: t("page-resources-applications-dappradar-description"),
          href: "https://dappradar.com",
          imgSrc: IconEthGlyphBlueCircle,
        },
      ],
    },
    {
      title: t("page-resources-adoption-title"),
      items: [
        {
          title: "Ethereum Adoption",
          description: t(
            "page-resources-adoption-ethereumadoption-description"
          ),
          href: "https://ethereumadoption.com",
          imgSrc: IconEthGlyphEOrg,
        },
        {
          title: "Cryptowerk",
          description: t("page-resources-adoption-cryptowerk-description"),
          href: "https://cryptwerk.com/analytics/ethereum/",
          imgSrc: IconCryptwerk,
        },
      ],
    },
  ]

  const scalingBoxes: DashboardBox[] = [
    {
      title: t("page-resources-roadmap-title"),
      metric: "todo",
      items: [
        {
          title: "Ethereum Roadmap",
          description: t("page-resources-roadmap-ethroadmap-description"),
          href: "https://ethroadmap.com",
          imgSrc: IconEthGlyphRainbowFrame,
        },
      ],
    },
    {
      title: t("page-resources-blobs-title"),
      metric: "todo",
      items: [
        {
          title: "Blob Scan",
          description: t("page-resources-blobs-blobscan-description"),
          href: "https://blobscan.com",
          imgSrc: IconEthGlyphBlueCircle,
        },
        {
          title: "Blobsguru",
          description: t("page-resources-blobs-blobsguru-description"),
          href: "https://blobs.guru",
          imgSrc: IconBlobsGuru,
        },
      ],
    },
  ]

  const resilienceBoxes: DashboardBox[] = [
    {
      title: t("page-resources-nodes-title"),
      metric: tempBigNumber,
      items: [
        {
          title: "Node Watch",
          description: t("page-resources-nodes-nodewatch-description"),
          href: "https://nodewatch.io",
          imgSrc: IconNodewatch,
        },
        {
          title: "Ethernodes",
          description: t("page-resources-nodes-ethernodes-description"),
          href: "https://ethernodes.org",
          imgSrc: IconEthGlyphBlueCircle,
        },
        {
          title: "Etherscan - Ethereum Node Tracker",
          description: t("page-resources-nodes-etherscan-description"),
          href: "https://etherscan.io/nodetracker",
          imgSrc: IconEtherscan,
        },
        {
          title: "luckystaker.com",
          description: t("page-resources-nodes-luckystaker-description"),
          href: "https://luckystaker.com",
          imgSrc: IconEthstaker,
        },
        {
          title: "Ethereum Validator Queue",
          description: t("page-resources-nodes-validatorqueue-description"),
          href: "https://www.validatorqueue.com",
          imgSrc: IconEthGlyphBlueCircle,
        },
      ],
    },
    {
      title: t("page-resources-network-resilience-title"),
      items: [
        {
          title: "Neutrality Watch",
          description: t(
            "page-resources-network-resilience-neutralitywatch-description"
          ),
          href: "https://eth.neutralitywatch.com",
          imgSrc: IconEthGlyphBlueCircle,
        },
        {
          title: "Project Sunshine",
          description: t(
            "page-resources-network-resilience-sunshine-description"
          ),
          href: "https://ethsunshine.com",
          imgSrc: IconEthGlyphEOrg,
        },
        {
          title: "Client Diversity",
          description: t(
            "page-resources-network-resilience-clientdiversity-description"
          ),
          href: "https://clientdiversity.org",
          imgSrc: IconEthGlyphEOrg,
        },
        {
          title: "Super Majority",
          description: t(
            "page-resources-network-resilience-supermajority-description"
          ),
          href: "https://supermajority.info",
          imgSrc: IconSupermajority,
        },
      ],
    },
    {
      title: t("page-resources-attestations-title"),
      items: [
        {
          title: "Ethereum Attestation Service",
          description: t("page-resources-attestations-eas-description"),
          href: "https://easscan.org",
          imgSrc: IconEas,
        },
      ],
    },
  ]

  const privacySecurityBoxes: DashboardBox[] = [
    {
      title: t("page-resources-relays-title"),
      metric: tempBigNumber,
      items: [
        {
          title: "Beaconchain Relays",
          description: t("page-resources-relays-beaconchain-description"),
          href: "https://beaconcha.in/relays",
          imgSrc: IconBeaconchain,
        },
        {
          title: "Relay Landscape | Ethereum Mainnet",
          description: t("page-resources-relays-ratednetwork-description"),
          href: "https://explorer.rated.network/relays?network=mainnet",
          imgSrc: IconRatedNetwork,
        },
        {
          title: "Relay Scan",
          description: t("page-resources-relays-relayscan-description"),
          href: "https://www.relayscan.io",
          imgSrc: IconRelayscan,
        },
      ],
    },
    {
      title: t("page-resources-mev-title"),
      metric: tempBigNumber,
      items: [
        {
          title: "MEV-Boost Dashboard",
          description: t("page-resources-mev-mevboost-description"),
          href: "https://mevboost.pics",
          imgSrc: IconEthGlyphBlack,
        },
        {
          title: "MEV Watch",
          description: t("page-resources-mev-mevwatch-description"),
          href: "https://www.mevwatch.info",
          imgSrc: IconEthGlyphBlueCircle,
        },
      ],
    },
    {
      title: t("page-resources-zk-adoption-title"),
      items: [
        {
          title: "Ethproofs",
          description: t("page-resources-zk-adoption-ethproofs-description"),
          href: "https://ethproofs.org",
          imgSrc: IconEthproofs,
        },
        {
          title: "L2beat - ZK Catalog",
          description: t("page-resources-zk-adoption-l2beat-description"),
          href: "https://l2beat.com/zk-catalog",
          imgSrc: IconL2beat,
        },
      ],
    },
    {
      title: t("page-resources-mempool-title"),
      items: [
        {
          title: "Ethereum Mempool Dashboard",
          description: t("page-resources-mempool-mempool-description"),
          href: "https://mempool.pics",
          imgSrc: IconEthGlyphBlueCircle,
        },
      ],
    },
  ]

  const resources = [
    {
      key: "network",
      title: t("page-resources-network-title"),
      boxes: networkBoxes,
    },
    {
      key: "using",
      title: t("page-resources-using-title"),
      boxes: usingBoxes,
    },
    {
      key: "scaling",
      title: t("page-resources-scaling-title"),
      boxes: scalingBoxes,
    },
    {
      key: "resilience",
      title: t("page-resources-resilience-title"),
      boxes: resilienceBoxes,
    },
    {
      key: "privacySecurity",
      title: t("page-resources-privacy-security-title"),
      boxes: privacySecurityBoxes,
    },
  ]

  return resources
}
