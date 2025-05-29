import Adoption1Image from "@/public/images/10-year-anniversary/adoption-1.png"
import Adoption2Image from "@/public/images/10-year-anniversary/adoption-2.png"
import Adoption3Image from "@/public/images/10-year-anniversary/adoption-3.png"
import DefiSummerImage from "@/public/images/10-year-anniversary/defi-summer.png"
import EthETFImage from "@/public/images/10-year-anniversary/eth-etf.png"
import EthereumLaunchImage from "@/public/images/10-year-anniversary/ethereum-launch.png"
import MastercardImage from "@/public/images/10-year-anniversary/mastercard.png"
import NftImage from "@/public/images/10-year-anniversary/nft-frontier.png"
import TheMergeImage from "@/public/images/10-year-anniversary/the-merge.png"
import StableCoinImage from "@/public/images/10-year-anniversary/the-pioneer-stablecoin.png"

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
    title: "$3.2 trillion stablecoin volume",
    description: (
      <p className="mb-8">
        In Q1 2025, Ethereum and its extensions moved over $3.2 trillion in
        stablecoins — thats 1.3x more than Visa and 2.6x more than Mastercard in
        the same period.
      </p>
    ),
    href: "/stablecoins",
    linkText: "More on stablecoins",
  },
]

const adoptionStyles = [
  "bg-gradient-to-t from-20% to-60% from-accent-c/10 to-accent-c/5 dark:from-accent-c/20 dark:to-accent-c/10 border-accent-c/10",
  "bg-gradient-to-b from-20% to-60% from-accent-b/10 to-accent-b/5 dark:from-accent-b/20 dark:to-accent-b/10 border-accent-b/10 ml-auto -mt-20",
  "bg-gradient-to-r from-20% to-60% from-accent-a/10 to-accent-a/5 dark:from-accent-a/20 dark:to-accent-a/10 border-accent-a/10 -mt-20",
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
  {
    title: "Ethereum Surpasses Mastercard",
    date: "2022 - 2025",
    description: [
      "Ethereum becomes one of the most used financial networks in the world, processing more value than legacy payment systems — powered by stablecoins and decentralized applications.",
      "It highlights the growing real-world utility of Ethereum as a global settlement layer for both retail and enterprise use cases.",
    ],
    image: MastercardImage,
  },
]

export { adoptionCards, adoptionStyles, innovationCards }
