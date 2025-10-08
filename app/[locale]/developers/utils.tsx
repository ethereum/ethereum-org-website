import { getLocale, getTranslations } from "next-intl/server"

import { CommunityConference } from "@/lib/types"

import events from "@/data/community-events.json"

import { getUpcomingEvents } from "../utils"

import type { DevelopersPath, VideoCourse } from "./types"

import cyfrinBasicBanner from "@/public/images/developers/cyfrin-basic-banner.webp"
import cyfrinFoundryAdvancedBanner from "@/public/images/developers/cyfrin-foundry-advanced-banner.webp"
import cyfrinFoundryFundamentalsBanner from "@/public/images/developers/cyfrin-foundry-fundamentals-banner.webp"
import cyfrinSecurityBanner from "@/public/images/developers/cyfrin-security-banner.webp"
import cyfrinSolidityBanner from "@/public/images/developers/cyfrin-solidity-banner.webp"
import speedrunNFT from "@/public/images/developers/speedrun-tokenization.png"
import speedrunDex from "@/public/images/developers/speedrun-dex.png"
import speedrunStablecoins from "@/public/images/developers/speedrun-stablecoins.png"

export const getBuilderPaths = async (): Promise<DevelopersPath[]> => {
  const locale = await getLocale()
  const t = await getTranslations({
    locale,
    namespace: "page-developers-index",
  })

  return [
    {
      imgSrc: speedrunNFT,
      imgAlt: t("page-developers-speedrun-nft-alt"),
      title: t("page-developers-speedrun-nft-title"),
      description: t("page-developers-speedrun-nft-desc"),
      href: "https://speedrunethereum.com/challenge/tokenization",
      button: t("page-developers-start-quest"),
      tag: t("page-developers-speedrun-challenge-0"),
    },
    {
      imgSrc: speedrunDex,
      imgAlt: t("page-developers-speedrun-dex-alt"),
      title: t("page-developers-speedrun-dex-title"),
      description: t("page-developers-speedrun-dex-desc"),
      href: "https://speedrunethereum.com/challenge/dex",
      button: t("page-developers-start-quest"),
      tag: t("page-developers-speedrun-challenge-4"),
    },
    {
      imgSrc: speedrunStablecoins,
      imgAlt: t("page-developers-speedrun-stablecoins-alt"),
      title: t("page-developers-speedrun-stablecoins-title"),
      description: t("page-developers-speedrun-stablecoins-desc"),
      href: "https://speedrunethereum.com/challenge/stablecoins",
      button: t("page-developers-start-quest"),
      tag: t("page-developers-speedrun-challenge-6"),
    },
  ]
}

export const getVideoCourses = async (): Promise<VideoCourse[]> => {
  const locale = await getLocale()
  const t = await getTranslations({
    locale,
    namespace: "page-developers-index",
  })

  const getDuration = (hours: number) =>
    t.rich("page-developers-course-duration", {
      span: () => <span>{hours}</span>,
    })

  return [
    {
      title: t("page-developers-course-blockchain-basics-title"),
      description: t("page-developers-course-blockchain-basics-desc"),
      hours: getDuration(3),
      imgSrc: cyfrinBasicBanner,
      imgAlt: t("page-developers-course-blockchain-basics-alt"),
      href: "https://updraft.cyfrin.io/courses/blockchain-basics",
    },
    {
      title: t("page-developers-course-solidity-title"),
      description: t("page-developers-course-solidity-desc"),
      hours: getDuration(5),
      imgSrc: cyfrinSolidityBanner,
      imgAlt: t("page-developers-course-solidity-alt"),
      href: "https://updraft.cyfrin.io/courses/solidity",
    },
    {
      title: t("page-developers-course-foundry-fundamentals-title"),
      description: t("page-developers-course-foundry-fundamentals-desc"),
      hours: getDuration(10),
      imgSrc: cyfrinFoundryFundamentalsBanner,
      imgAlt: t("page-developers-course-foundry-fundamentals-alt"),
      href: "https://updraft.cyfrin.io/courses/foundry",
    },
    {
      title: t("page-developers-course-advanced-foundry-title"),
      description: t("page-developers-course-advanced-foundry-desc"),
      hours: getDuration(13),
      imgSrc: cyfrinFoundryAdvancedBanner,
      imgAlt: t("page-developers-course-advanced-foundry-alt"),
      href: "https://updraft.cyfrin.io/courses/advanced-foundry",
    },
    {
      title: t("page-developers-course-security-title"),
      description: t("page-developers-course-security-desc"),
      hours: getDuration(24),
      imgSrc: cyfrinSecurityBanner,
      imgAlt: t("page-developers-course-security-alt"),
      href: "https://updraft.cyfrin.io/courses/security",
    },
  ]
}

export const getHackathons = async (): Promise<CommunityConference[]> => {
  const locale = await getLocale()
  const allUpcomingEvents = getUpcomingEvents(events, locale)
  return allUpcomingEvents.filter((e) => e.hackathon) as CommunityConference[]
}
