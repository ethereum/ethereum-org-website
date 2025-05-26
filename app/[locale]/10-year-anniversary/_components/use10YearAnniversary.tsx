import DefiSummerImage from "@/public/images/10-year-anniversary/defi-summer.png"
import EthETFImage from "@/public/images/10-year-anniversary/eth-etf.png"
import EthereumLaunchImage from "@/public/images/10-year-anniversary/ethereum-launch.png"
import MastercardImage from "@/public/images/10-year-anniversary/mastercard.png"
import NftImage from "@/public/images/10-year-anniversary/nft-frontier.png"
import TheMergeImage from "@/public/images/10-year-anniversary/the-merge.png"
import StableCoinImage from "@/public/images/10-year-anniversary/the-pioneer-stablecoin.png"

export const use10YearAnniversary = () => {
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

  return {
    innovationCards,
  }
}
