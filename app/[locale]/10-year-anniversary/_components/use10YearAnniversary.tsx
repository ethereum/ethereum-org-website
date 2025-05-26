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

export const use10YearAnniversary = () => {
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
          record. While few times Ethereum network became congested, it never
          went down.
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
          stablecoins — thats 1.3x more than Visa and 2.6x more than Mastercard
          in the same period.
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

  const stories = [
    {
      name: "John Doe",
      storyEnglish:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      storyOriginal:
        "이더리움을 5년 동안 사용해왔는데 정말 좋습니다. 탈중앙화 애플리케이션을 구축하기에 훌륭한 플랫폼이에요.",
      country: "South Korea",
      date: "2025-02-15",
    },
    {
      name: "Jane Doe",
      storyEnglish:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      storyOriginal:
        "Nimetumia Ethereum kwa miaka 5 sasa na naipenda. Ni jukwaa zuri la kujenga programu zisizo na kituo kimoja.",
      twitter: "https://twitter.com/janedoe",
      country: "Kenya",
      date: "2025-03-22",
    },
    {
      name: "James Doe",
      storyEnglish:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
      storyOriginal: null,
      country: "United States",
      date: "2025-01-08",
    },
    {
      name: "Jim Doe",
      storyEnglish:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      storyOriginal: null,
      twitter: "https://twitter.com/jimdoe",
      country: "United Kingdom",
      date: "2025-04-01",
    },
    {
      name: "Maria Santos",
      storyEnglish:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
      storyOriginal: null,
      country: "Brazil",
      date: "2025-02-28",
    },
    {
      name: "Ahmed Hassan",
      storyEnglish:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      storyOriginal:
        "نشأت في القاهرة، وكنت دائماً أحلم بربط الفنانين من جميع أنحاء الشرق الأوسط. كانت المعارض التقليدية حصرية وغالباً ما كانت بعيدة عن متناول العديد من المبدعين الموهوبين. عندما اكتشفت الإيثيريوم، رأيت فرصة لتغيير هذا. قمت ببناء منصة تسمح للفنانين بتحويل أعمالهم إلى NFTs، ولكن مع لمسة خاصة - نستخدم نظام عقود ذكية فريد يضمن حصول الفنانين على حقوق ملكية في كل مرة يتم فيها إعادة بيع أعمالهم. الجانب المجتمعي هو ما يجعلها مميزة. لقد أنشأنا DAO حيث يمكن للفنانين التصويت على معارض المعرض، ومقترحات التمويل، ومبادرات المجتمع. من خلال هذه المنصة، رأيت فنانين من دول ليس لديها حتى علاقات دبلوماسية يتعاونون في المشاريع. أصبحت التكنولوجيا جسراً للتبادل الثقافي، والنتائج مذهلة. لقد ساعدنا أكثر من 500 فنان في الحصول على اعتراف دولي، والمنصة تستضيف الآن معارض افتراضية شهرية تجذب زواراً من جميع أنحاء العالم.",
      twitter: "https://twitter.com/ahmedhassan",
      country: "Egypt",
      date: "2025-03-15",
    },
    {
      name: "Yuki Tanaka",
      storyEnglish:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      storyOriginal:
        "イーサリアムを通じて、地域社会のための分散型投票システムを作ることができました。技術が人々を結びつけるのを見るのは素晴らしいことです。",
      country: "Japan",
      date: "2025-01-25",
    },
    {
      name: "Priya Patel",
      storyEnglish:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      storyOriginal: null,
      twitter: "https://twitter.com/priyapatel",
      country: "India",
      date: "2025-02-10",
    },
    {
      name: "Lucas Silva",
      storyEnglish:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      storyOriginal: null,
      country: "Portugal",
      date: "2025-03-05",
    },
    {
      name: "Sarah Chen",
      storyEnglish:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
      storyOriginal: null,
      twitter: "https://twitter.com/sarahchen",
      country: "Singapore",
      date: "2025-01-15",
    },
  ]

  return {
    adoptionCards,
    adoptionStyles,
    innovationCards,
    stories,
  }
}
