// TODO: Refactor for intl
import type { DashboardBox, DashboardSection } from "./types"

const tempBigNumber = (
  <div className="flex flex-col items-center py-4">
    <div className="text-center text-4xl font-bold">$0.006</div>
    <div className="text-center text-sm text-body-medium">
      todo: use real big numbers
    </div>
  </div>
)

export const useResources = (): DashboardSection[] => {
  const networkBoxes: DashboardBox[] = [
    {
      title: "Ethereum Networks - Layer 2",
      metric: tempBigNumber,
      items: [
        {
          title: "L2 Beat",
          description:
            "L2BEAT was created to provide transparent and verifiable insights into emerging layer two (L2) technologies which, in line with the rollup-centric Ethereum scaling roadmap, are aimed at scaling Ethereum.",
          href: "https://l2beat.com/",
          icon: "todo",
        },
        {
          title: "Growthepie",
          description:
            "Mastering Ethereum Layer 2s. Your gateway to curated analytics and knowledge.",
          href: "https://www.growthepie.xyz/",
          icon: "todo",
        },
        {
          title: "L2 Fees",
          description: "How much does it cost to use Layer 2?",
          href: "https://l2fees.info/",
          icon: "todo",
        },
      ],
    },
    {
      title: "Block explorers",
      metric: "todo",
      items: [
        {
          title: "Blockscout",
          description: "Open source block explorer better than Etherscan.",
          href: "https://ethereum.blockscout.com",
          icon: "todo",
        },
        {
          title: "Etherscan",
          description:
            "Etherscan is a block explorer and analytics platform for Ethereum, a decentralized smart contracts platform.",
          href: "https://etherscan.io",
          icon: "todo",
        },
        {
          title: "Beaconcha.in",
          description:
            "Open source Ethereum explorer showing the Ethereum Mainnet 🚀.",
          href: "https://beaconcha.in",
          icon: "todo",
        },
        {
          title: "Txcity.io",
          description:
            "A funny visualizer of the Ethereum blocks in real-time.",
          href: "https://txcity.io/",
          icon: "todo",
        },
      ],
    },
    {
      title: "ETH the asset",
      metric: "todo - semi-circle progress chart",
      items: [
        {
          title: "Etherealize Dashboard",
          description:
            "Ethereum is the largest, most secure, and most open blockchain for the world to use. And Ethereum is open for business.",
          href: "https://dashboard.etherealize.io/",
          icon: "todo",
        },
        {
          title: "Ultra Sound Money",
          description:
            "Ultra sound money is an Ethereum meme focusing on the likely decrease of the ETH supply.",
          href: "https://ultrasound.money/",
          icon: "todo",
        },
        {
          title: "ETH is Money",
          description:
            "ETH is money is a tribe of believers who hold, stake, and propagate ETH as money.",
          href: "https://www.ethismoney.xyz/",
          icon: "todo",
        },
        {
          title: "Ethereum Now",
          description:
            "Ethernow enables you to see what is happening at the core of Ethereum, in real-time. Go hands-on now.",
          href: "https://www.ethernow.xyz",
          icon: "todo",
        },
      ],
    },
    {
      title: "Gas",
      metric: "todo",
      items: [
        {
          title: "Ethereum Gas Tracker",
          description: "Track all the KPIs on gas.",
          href: "https://etherscan.io/gastracker",
          icon: "todo",
        },
        {
          title: "Blocknative Gas Estimator",
          description: "Web3's most accurate gas fee prediction.",
          href: "https://www.blocknative.com/gas-estimator",
          icon: "todo",
        },
        {
          title: "GasFees.io",
          description: "Gas costs data tracker for Ethereum networks.",
          href: "https://www.gasfees.io/",
          icon: "todo",
        },
      ],
    },
  ]

  const usingBoxes: DashboardBox[] = [
    {
      title: "DeFi",
      metric: tempBigNumber,
      items: [
        {
          title: "DeFi Llama",
          description:
            "DefiLlama is the largest TVL aggregator for DeFi (Decentralized Finance).",
          href: "https://defillama.com",
          icon: "todo",
        },
        {
          title: "DeFi Market Cap",
          description: "Top 100 DeFi tokens by market capitalization.",
          href: "https://defimarketcap.io",
          icon: "todo",
        },
        {
          title: "EigenPhi",
          description:
            "Wanna understand DeFi transactions and trading strategies?",
          href: "https://www.eigenphi.io",
          icon: "todo",
        },
        {
          title: "DeFiScan",
          description:
            "Verifiable insights into the maturity and risks of DeFi.",
          href: "https://defiscan.info",
          icon: "todo",
        },
      ],
    },
    {
      title: "Stablecoins",
      metric: tempBigNumber,
      items: [
        {
          title: "stablecoins.wtf",
          description:
            "The purpose of this website is to educate degens about stablecoins.",
          href: "https://stablecoins.wtf/",
          icon: "todo",
        },
        {
          title: "Visa Onchain Analytics Dashboard",
          description:
            "The Visa Onchain Analytics Dashboard showcases how fiat-backed stablecoins move via public blockchains globally.",
          href: "https://visaonchainanalytics.com",
          icon: "todo",
        },
        {
          title: "Real World Assets",
          description:
            "Explore the activity behind crypto and asset-backed stablecoins.",
          href: "https://app.rwa.xyz/stablecoins",
          icon: "todo",
        },
      ],
    },
    {
      title: "NFT",
      metric: "todo - bar chart",
      items: [
        {
          title: "Etherscan - Top NFT",
          description: "Top NFT contracts.",
          href: "https://etherscan.io/nft-top-contracts",
          icon: "todo",
        },
        {
          title: "NFTgo",
          description: "Real-time global NFT market data.",
          href: "https://nftgo.io/macro/market-overview",
          icon: "todo",
        },
      ],
    },
    {
      title: "Applications",
      items: [
        {
          title: "Ethereum Ecosystem",
          description:
            "Immerse yourself in the Ethereum ecosystem and get familiar with hundreds of popular apps & tools.",
          href: "https://www.ethereum-ecosystem.com/apps",
          icon: "todo",
        },
        {
          title: "Farcaster Network",
          description: "Data from Farcaster usage.",
          href: "https://www.farcaster.network",
          icon: "todo",
        },
        {
          title: "Dapp Radar",
          description:
            "Explore top blockchain dapps, NFTs, games, DeFi projects, tokens, and airdrops. Track rankings, explore market insights, find trending projects, and unlock rewards with the world’s dapp store.",
          href: "https://dappradar.com",
          icon: "todo",
        },
      ],
    },
    {
      title: "Ethereum Adoption",
      items: [
        {
          title: "Ethereum Adoption",
          description: "Ethereum Censorability Monitor.",
          href: "https://ethereumadoption.com",
          icon: "todo",
        },
        {
          title: "Cryptowerk",
          description:
            "Ethereum adoption analytics based on Cryptwerk merchants database - map, countries, companies, businesses, categories, rating.",
          href: "https://cryptwerk.com/analytics/ethereum/",
          icon: "todo",
        },
      ],
    },
  ]

  const scalingBoxes: DashboardBox[] = [
    {
      title: "Ethereum Roadmap",
      metric: "todo",
      items: [
        {
          title: "Ethereum Roadmap",
          description:
            "Detailed visualization on Ethereum roadmap and the next network upgrade.",
          href: "https://ethroadmap.com",
          icon: "todo",
        },
      ],
    },
    {
      title: "Blobs",
      metric: "todo",
      items: [
        {
          title: "Blob Scan",
          description: "Comprehensive blob scanner.",
          href: "https://blobscan.com",
          icon: "todo",
        },
        {
          title: "Blobsguru",
          description:
            "Ethereum Blobs Explorer: Analyze L2 transactions & EIP-4844 data.",
          href: "https://blobs.guru",
          icon: "todo",
        },
      ],
    },
  ]

  const resilienceBoxes: DashboardBox[] = [
    {
      title: "Nodes",
      metric: tempBigNumber,
      items: [
        {
          title: "Node Watch",
          description: "Overview of the nodes.",
          href: "https://nodewatch.io",
          icon: "todo",
        },
        {
          title: "Ethernodes",
          description: "Ethereum Mainnet statistics.",
          href: "https://ethernodes.org",
          icon: "todo",
        },
        {
          title: "Etherscan - Ethereum Node Tracker",
          description: "Daily.",
          href: "https://etherscan.io/nodetracker",
          icon: "todo",
        },
        {
          title: "luckystaker.com",
          description: "Daily proposal probability of getting a block.",
          href: "https://luckystaker.com",
          icon: "todo",
        },
        {
          title: "Ethereum Validator Queue",
          description:
            "A dashboard showing the Ethereum validator enter and exit queue and estimated wait times.",
          href: "https://www.validatorqueue.com",
          icon: "todo",
        },
      ],
    },
    {
      title: "Network resilience",
      items: [
        {
          title: "Neutrality Watch",
          description: "Ethereum Censorability Monitor.",
          href: "https://eth.neutralitywatch.com",
          icon: "todo",
        },
        {
          title: "Project Sunshine",
          description:
            "A dashboard to measure the health of Ethereum's decentralization.",
          href: "https://ethsunshine.com",
          icon: "todo",
        },
        {
          title: "Client Diversity",
          description:
            "Improve Ethereum's resilience by using a minority client.",
          href: "https://clientdiversity.org",
          icon: "todo",
        },
        {
          title: "Super Majority",
          description:
            "The supermajority client risk of the Ethereum execution layer, especially the client usage of staking services.",
          href: "https://supermajority.info",
          icon: "todo",
        },
      ],
    },
    {
      title: "Attestations",
      items: [
        {
          title: "Ethereum Attestation Service",
          description:
            "EAS enables anyone to create and validate on-chain and off-chain attestations on Ethereum.",
          href: "https://easscan.org",
          icon: "todo",
        },
      ],
    },
  ]

  const privacySecurityBoxes: DashboardBox[] = [
    {
      title: "Relays",
      metric: tempBigNumber,
      items: [
        {
          title: "Beaconchain Relays",
          description:
            "Validators can use relays to outsource their block production to entities specialized in extracting extra revenue.",
          href: "https://beaconcha.in/relays",
          icon: "todo",
        },
        {
          title: "Relay Landscape | Ethereum Mainnet",
          description:
            "MEV relay market share, total value relayed, value per block, and other statistics for Ethereum network.",
          href: "https://explorer.rated.network/relays?network=mainnet",
          icon: "todo",
        },
        {
          title: "Relay Scan",
          description: "MEV-Boost analytics.",
          href: "https://www.relayscan.io",
          icon: "todo",
        },
      ],
    },
    {
      title: "MEV",
      metric: tempBigNumber,
      items: [
        {
          title: "MEV-Boost Dashboard",
          description:
            "The purpose of this website is to educate degens about stablecoins.",
          href: "https://mevboost.pics",
          icon: "todo",
        },
        {
          title: "MEV Watch",
          description:
            "Some MEV-Boost relays are regulated under OFAC and will censor certain transactions. Use this tool to observe the effect it's having on Ethereum blocks.",
          href: "https://www.mevwatch.info",
          icon: "todo",
        },
      ],
    },
    {
      title: "ZK adoption",
      items: [
        {
          title: "ETH Proofs",
          description: "SNARKs that scale Ethereum.",
          href: "https://ethproofs.org",
          icon: "todo",
        },
        {
          title: "L2beat - ZK Catalog",
          description:
            "ZK Catalog by L2BEAT is a community-driven resource offering detailed insights into the ZK technology utilized by various blockchain projects.",
          href: "https://l2beat.com/zk-catalog",
          icon: "todo",
        },
      ],
    },
    {
      title: "Mempool",
      items: [
        {
          title: "Ethereum Mempool Dashboard",
          description:
            "Selected comparative visualizations on Ethereum's mempool.",
          href: "https://mempool.pics",
          icon: "todo",
        },
      ],
    },
  ]

  return [
    {
      key: "network",
      title: "The network",
      boxes: networkBoxes,
    },
    { key: "using", title: "Using Ethereum", boxes: usingBoxes },
    {
      key: "scaling",
      title: "Scaling Ethereum",
      boxes: scalingBoxes,
    },
    {
      key: "resilience",
      title: "Ethereum resilience",
      boxes: resilienceBoxes,
    },
    {
      key: "privacySecurity",
      title: "Privacy & Security",
      boxes: privacySecurityBoxes,
    },
  ]
}
