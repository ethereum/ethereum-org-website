import Link from "@/components/ui/Link"

import Adoption1Image from "@/public/images/10-year-anniversary/adoption-1.png"
import Adoption2Image from "@/public/images/10-year-anniversary/adoption-2.png"
import Adoption3Image from "@/public/images/10-year-anniversary/adoption-3.png"
import DefiSummerImage from "@/public/images/10-year-anniversary/defi-summer.png"
import EthETFImage from "@/public/images/10-year-anniversary/eth-etf.png"
import EthereumLaunchImage from "@/public/images/10-year-anniversary/ethereum-launch.png"
import NftImage from "@/public/images/10-year-anniversary/nft-frontier.png"
import Adoption5Image from "@/public/images/10-year-anniversary/robot-walking.png"
import TheMergeImage from "@/public/images/10-year-anniversary/the-merge.png"
import StableCoinImage from "@/public/images/10-year-anniversary/the-pioneer-stablecoin.png"
import Adoption4Image from "@/public/images/10-year-anniversary/walking-talking-1.png"
import Adoption6Image from "@/public/images/10-year-anniversary/walking-talking-2.png"

const adoptionCards = [
  {
    image: Adoption1Image,
    title: "Decade of Decentralization",
    description: (
      <p className="mb-8">
        What began as a specialized ecosystem now spans <b>80+ countries</b>{" "}
        with <b>870,000 validators</b>, <b>13,600 physical nodes</b>, and
        millions of users across continents.
      </p>
    ),
    href: "/resources",
    linkText: "Check Ethereum stats",
  },
  {
    image: Adoption2Image,
    title: "10 years, 16 upgrades, 0 downtime",
    description: (
      <p className="mb-8">
        Ethereum has turned continuous innovation into a decade-long uptime
        record. While few times Ethereum network became congested, it never went
        down.
      </p>
    ),
    href: "/roadmap",
    linkText: "See Roadmap",
  },
  {
    image: Adoption3Image,
    title: "$122.6 billion in stablecoin market cap",
    description: (
      <p className="mb-8">
        In Q2 2025, Ethereum and its extensions moved over $122.6 billion in
        stablecoins —{" "}
        <Link href="https://defillama.com/stablecoins/chains">
          comprising ~49.85% of the stablecoin market share
        </Link>
        .
      </p>
    ),
    href: "/stablecoins",
    linkText: "More on stablecoins",
  },
  {
    image: Adoption4Image,
    title: "~75 billion secured on Ethereum",
    description: (
      <p className="mb-8">
        In Q2 2025, Ethereum secures over $75 billion in{" "}
        <Link href="https://defillama.com/chains">
          DeFi for mainnet and its layer 2s
        </Link>
        .
      </p>
    ),
    href: "/defi",
    linkText: "More on DeFi",
  },
  {
    image: Adoption5Image,
    title: "0.01 TWh per year",
    description: (
      <p className="mb-8">
        Following The Merge, Ethereum&apos;s energy consumption dropped
        dramatically to just{" "}
        <Link href="https://digiconomist.net/ethereum-energy-consumption">
          0.01 TWh per year
        </Link>
        , down from its peak of 93.95 TWh per year.
      </p>
    ),
    href: "/energy-consumption",
    linkText: "More on Ethereum energy consumption",
  },
  {
    image: Adoption6Image,
    title: "Over 250 TPS",
    description: (
      <p className="mb-8">
        Ethereum&apos;s throughput has increased significantly since its
        inception, with the network now capable of handling over{" "}
        <Link href="https://l2beat.com/scaling/activity">
          250 transactions per second
        </Link>{" "}
        between mainnet and its layer 2s.
      </p>
    ),
    href: "/layer-2",
    linkText: "More on layer 2s",
  },
]

const adoptionStyles = [
  "bg-background bg-gradient-to-t from-20% to-60% from-accent-c/10 to-accent-c/5 dark:from-accent-c/20 dark:to-accent-c/10 border-accent-c/10",
  "bg-background bg-gradient-to-b from-20% to-60% from-accent-b/10 to-accent-b/5 dark:from-accent-b/20 dark:to-accent-b/10 border-accent-b/10",
  "bg-background bg-gradient-to-r from-20% to-60% from-accent-a/10 to-accent-a/5 dark:from-accent-a/20 dark:to-accent-a/10 border-accent-a/10",
]

const innovationCards = [
  {
    title: "Ethereum Launch",
    date: "July 30, 2015",
    description: [
      'The genesis block of Ethereum was mined, marking the official launch of the "Frontier" network. This initial version was a barebones release, allowing developers to start building decentralized applications and experiment.',
      "The network launches with a vision to build a more open internet — one where users own their data, applications run without intermediaries, and value moves freely.",
    ],
    image: EthereumLaunchImage,
  },
  {
    title: "DAI: The pioneer stablecoin",
    date: "December, 2015",
    description: [
      "Launch of the first stablecoin. DAI was designed to maintain a soft peg to the U.S. dollar while being backed by various cryptocurrencies deposited in smart-contract vaults.",
      "Unlike centralized stablecoins, DAI's main advantage is that it is managed by a decentralized autonomous organization (DAO) rather than a private company. ",
    ],
    image: StableCoinImage,
  },
  {
    title: "CryptoKitties and the NFT Frontier",
    date: "November, 2017",
    description: [
      "CryptoKitties bring digital ownership to life. This early NFT game showed how Ethereum can enable new forms of expression, collectibility, and culture on the internet",
      "It captured global attention and demonstrated that Ethereum could scale beyond finance into gaming, art, and digital identity.",
    ],
    image: NftImage,
  },
  {
    title: "DeFi Summer",
    date: "June, 2020",
    description: [
      "A period of explosive growth redefines finance. Protocols for lending, trading, and yield generation gain momentum — showcasing the power of open, composable financial infrastructure.",
      "This period sparked enormous user growth, attracting billions in value and building confidence in Ethereum as the home of decentralized finance. ",
    ],
    image: DefiSummerImage,
  },
  {
    title: "The Merge update",
    date: "September 15, 2022",
    description: [
      "Arguably the most significant upgrade in Ethereum's history. The Merge saw the seamless transition of the Ethereum mainnet from Proof-of-Work (PoW) to the Proof-of-Stake (PoS) consensus mechanism.",
      "This event drastically reduced Ethereum's energy consumption by ~99.95%, enhanced network security, and laid the groundwork for future scalability improvements. ",
    ],
    image: TheMergeImage,
  },
  {
    title: "Spot ETH ETFs",
    date: "May 23, 2024",
    description: [
      "The approval and launch of Spot Ethereum ETFs in various jurisdictions provided traditional investors with regulated exposure to ETH, further legitimizing it as an asset class.",
      "A growing trend of tokenizing real-world assets (like real estate, private credit, and treasuries) on Ethereum also gained significant traction, with major financial institutions exploring and launching RWA initiatives.",
    ],
    image: EthETFImage,
  },
]

export { adoptionCards, adoptionStyles, innovationCards }
