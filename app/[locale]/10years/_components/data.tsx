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
        with <b>870,000 validators</b>, <b>13,600 physical nodes</b>, and{" "}
        <b>millions of users</b> across continents.
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
        Ethereum has maintained perfect uptime while continuously evolving. The
        blockchain has never gone offline.
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
        In Q2 2025, the Ethereum ecosystem moved over $122.6 billion in
        stablecoins,{" "}
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
      'Ethereum\'s genesis block went live, launching the "Frontier" network. This barebones release gave developers their first chance to build decentralized applications and experiment with smart contracts.',
      "Ethereum's mission: an open internet where users control their data, applications run without gatekeepers, and value flows freely between people.",
    ],
    image: EthereumLaunchImage,
  },
  {
    title: "DAI: The pioneer stablecoin",
    date: "December, 2015",
    description: [
      "The first decentralized stablecoin launched. DAI maintains a soft peg to the U.S. dollar through cryptocurrency collateral locked in smart contracts.",
      "Unlike centralized stablecoins controlled by companies, DAI is governed by a decentralized autonomous organization (DAO), making it trustless and community-driven.",
    ],
    image: StableCoinImage,
  },
  {
    title: "CryptoKitties and the NFT Frontier",
    date: "November, 2017",
    description: [
      "CryptoKitties brought digital ownership to life. This early NFT game showed how blockchain could enable new forms of expression, collectibility, and culture online.",
      "It proved Ethereum could scale beyond finance into gaming, art, and digital identity, opening entirely new creative possibilities.",
    ],
    image: NftImage,
  },
  {
    title: "DeFi Summer",
    date: "June, 2020",
    description: [
      "Explosive DeFi growth redefined how the world thinks about finance. Protocols for lending, trading, and yield generation gained massive momentum, showcasing the power of open, composable financial infrastructure.",
      "This period brought billions in value on-chain and established Ethereum as the home of decentralized finance.",
    ],
    image: DefiSummerImage,
  },
  {
    title: "The Merge update",
    date: "September 15, 2022",
    description: [
      "Ethereum's biggest transformation yet. The network seamlessly transitioned from energy-intensive proof-of-work to proof-of-stake. With billions in value on Ethereum, the change was described as like changing an aircraft's engine mid-flight.",
      "The Merge cut Ethereum's energy consumption by 99.95%, strengthened network security, and set the groundwork for future scaling upgrades.",
    ],
    image: TheMergeImage,
  },
  {
    title: "Spot ETH ETFs",
    date: "May 23, 2024",
    description: [
      "Wall Street embraces Ethereum. Spot ETH ETFs launched, bringing institutional capital and regulatory legitimacy to the world's leading smart contract platform.",
      "The approval signaled broader acceptance of tokenized real-world assets, with major financial institutions now building on Ethereum to bring everything from real estate to treasury bonds on-chain.",
    ],
    image: EthETFImage,
  },
]

export { adoptionCards, adoptionStyles, innovationCards }
