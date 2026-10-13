import type { StaticImageData } from "next/image"

import ethdevIcon from "@/public/images/community/online/r-ethdev-icon.webp"
import ethereumIcon from "@/public/images/community/online/r-ethereum-icon.webp"
import ethtraderBanner from "@/public/images/community/online/r-ethtrader-banner.webp"
import ethtraderIcon from "@/public/images/community/online/r-ethtrader-icon.webp"
import guidesHubHero from "@/public/images/heroes/guides-hub-hero.jpg"
import homeHero from "@/public/images/home/hero.png"

export type RedditCommunity = {
  /** Subreddit handle, e.g. "r/ethereum" (brand string, not translated). */
  handle: string
  href: string
  /** Approximate subscriber count; formatted compactly at render. */
  members: number
  /** Key in the "page-community" namespace for the one-line description. */
  descriptionKey: string
  icon: StaticImageData
  banner: StaticImageData
  iconClass?: string
}

// Static until a reliable Reddit source exists -- their API blocks datacenter
// IPs even with OAuth. Counts are approximate; refresh manually. r/ethereum and
// r/ethdev reuse existing site heroes for their banners.
export const redditCommunities: RedditCommunity[] = [
  {
    handle: "r/ethereum",
    href: "https://www.reddit.com/r/ethereum/",
    members: 3_700_000,
    descriptionKey: "page-community-online-ethereum-description",
    icon: ethereumIcon,
    banner: homeHero,
    iconClass: "bg-[#DAE0E6]", // Brand hex-code
  },
  {
    handle: "r/ethtrader",
    href: "https://www.reddit.com/r/ethtrader/",
    members: 2_300_000,
    descriptionKey: "page-community-online-ethtrader-description",
    icon: ethtraderIcon,
    banner: ethtraderBanner,
  },
  {
    handle: "r/ethdev",
    href: "https://www.reddit.com/r/ethdev/",
    members: 120_000,
    descriptionKey: "page-community-online-ethdev-description",
    icon: ethdevIcon,
    banner: guidesHubHero,
    iconClass: "bg-[#12234E]", // Brand hex-code
  },
]
