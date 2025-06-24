import Adoption1Image from "@/public/images/10-year-anniversary/adoption-1.png"
import Adoption2Image from "@/public/images/10-year-anniversary/adoption-2.png"
import Adoption3Image from "@/public/images/10-year-anniversary/adoption-3.png"
import DefiSummerImage from "@/public/images/10-year-anniversary/defi-summer.png"
import EthETFImage from "@/public/images/10-year-anniversary/eth-etf.png"
import EthereumLaunchImage from "@/public/images/10-year-anniversary/ethereum-launch.png"
import NftImage from "@/public/images/10-year-anniversary/nft-frontier.png"
import TheMergeImage from "@/public/images/10-year-anniversary/robot-and-crowd-cheering.png"
import Adoption5Image from "@/public/images/10-year-anniversary/robot-walking.png"
import StableCoinImage from "@/public/images/10-year-anniversary/the-pioneer-stablecoin.png"
import Adoption4Image from "@/public/images/10-year-anniversary/walking-talking-1.png"
import Adoption6Image from "@/public/images/10-year-anniversary/walking-talking-2.png"

const adoptionCards = [
  {
    image: Adoption1Image,
    href: "/resources",
  },
  {
    image: Adoption2Image,
    href: "/roadmap",
  },
  {
    image: Adoption3Image,
    href: "/stablecoins",
  },
  {
    image: Adoption4Image,
    href: "/defi",
  },
  {
    image: Adoption5Image,
    href: "/energy-consumption",
  },
  {
    image: Adoption6Image,
    href: "/layer-2",
  },
]

// duplicate 1 2 3, 1 2 3 to fix mobile slider bug where styles are not applied
const adoptionStyles = [
  "bg-background bg-gradient-to-b from-20% to-60% from-accent-c/10 to-accent-c/5 dark:from-accent-c/20 dark:to-accent-c/10 border-accent-c/10",
  "bg-background bg-gradient-to-b from-20% to-60% from-accent-b/10 to-accent-b/5 dark:from-accent-b/20 dark:to-accent-b/10 border-accent-b/10",
  "bg-background bg-gradient-to-b from-20% to-60% from-accent-a/10 to-accent-a/5 dark:from-accent-a/20 dark:to-accent-a/10 border-accent-a/10",
  "bg-background bg-gradient-to-b from-20% to-60% from-accent-c/10 to-accent-c/5 dark:from-accent-c/20 dark:to-accent-c/10 border-accent-c/10",
  "bg-background bg-gradient-to-b from-20% to-60% from-accent-b/10 to-accent-b/5 dark:from-accent-b/20 dark:to-accent-b/10 border-accent-b/10",
  "bg-background bg-gradient-to-b from-20% to-60% from-accent-a/10 to-accent-a/5 dark:from-accent-a/20 dark:to-accent-a/10 border-accent-a/10",
]

const innovationCards = [
  {
    image: EthereumLaunchImage,
  },
  {
    image: StableCoinImage,
  },
  {
    image: NftImage,
  },
  {
    image: DefiSummerImage,
  },
  {
    image: TheMergeImage,
  },
  {
    image: EthETFImage,
  },
]

export { adoptionCards, adoptionStyles, innovationCards }
