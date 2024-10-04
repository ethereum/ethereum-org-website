import { useState } from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { FaDiscord, FaGithub, FaXTwitter } from "react-icons/fa6"

import type { EventCardProps } from "@/lib/types"
import type { CodeExample } from "@/lib/interfaces"

import { useBentoBox } from "@/components/Homepage/useBentoBox"
import BlockHeap from "@/components/icons/block-heap.svg"
import EthGlyphIcon from "@/components/icons/eth-glyph.svg"
import EthTokenIcon from "@/components/icons/eth-token.svg"
import PickWalletIcon from "@/components/icons/eth-wallet.svg"
import ChooseNetworkIcon from "@/components/icons/network-layers.svg"
import TryAppsIcon from "@/components/icons/phone-homescreen.svg"
import RoadmapSign from "@/components/icons/roadmap-sign.svg"
import Whitepaper from "@/components/icons/whitepaper.svg"

import { cn } from "@/lib/utils/cn"
import { isValidDate } from "@/lib/utils/date"

import events from "@/data/community-events.json"
import CreateWalletContent from "@/data/CreateWallet"

import { GITHUB_REPO_URL } from "@/lib/constants"

import SimpleDomainRegistryContent from "!!raw-loader!@/data/SimpleDomainRegistry.sol"
import SimpleTokenContent from "!!raw-loader!@/data/SimpleToken.sol"
import SimpleWalletContent from "!!raw-loader!@/data/SimpleWallet.sol"
import { useRtlFlip } from "@/hooks/useRtlFlip"

export const useHome = () => {
  const { t } = useTranslation(["common", "page-index"])
  const { locale, asPath } = useRouter()

  const [isModalOpen, setModalOpen] = useState(false)
  const [activeCode, setActiveCode] = useState(0)

  const bentoItems = useBentoBox()

  const { direction, isRtl } = useRtlFlip()

  const eventCategory = `Homepage - ${locale}`

  const toggleCodeExample = (id: number): void => {
    setActiveCode(id)
    setModalOpen(true)
  }

  const codeExamples: CodeExample[] = [
    {
      title: t("page-index:page-index-developers-code-example-title-0"),
      description: t(
        "page-index:page-index-developers-code-example-description-0"
      ),
      codeLanguage: "language-solidity",
      code: SimpleWalletContent,
      eventName: "bank",
    },
    {
      title: t("page-index:page-index-developers-code-example-title-1"),
      description: t(
        "page-index:page-index-developers-code-example-description-1"
      ),
      codeLanguage: "language-solidity",
      code: SimpleTokenContent,
      eventName: "token",
    },
    {
      title: t("page-index:page-index-developers-code-example-title-2"),
      description: t(
        "page-index:page-index-developers-code-example-description-2"
      ),
      codeLanguage: "language-javascript",
      code: CreateWalletContent,
      eventName: "wallet",
    },
    {
      title: t("page-index:page-index-developers-code-example-title-3"),
      description: t(
        "page-index:page-index-developers-code-example-description-3"
      ),
      codeLanguage: "language-solidity",
      code: SimpleDomainRegistryContent,
      eventName: "dns",
    },
  ]

  const subHeroCTAs = [
    {
      label: t("page-index:page-index-cta-wallet-label"),
      description: t("page-index:page-index-cta-wallet-description"),
      href: "/wallets/find-wallet/",
      Svg: PickWalletIcon,
      className: "text-primary hover:text-primary-hover",
      eventName: "find wallet",
    },
    {
      label: t("page-index:page-index-cta-get-eth-label"),
      description: t("page-index:page-index-cta-get-eth-description"),
      href: "/get-eth/",
      Svg: EthTokenIcon,
      className: "text-accent-a hover:text-accent-a-hover",
      eventName: "get eth",
    },
    {
      label: t("page-index:page-index-cta-networks-label"),
      description: t("page-index:page-index-cta-networks-description"),
      href: "/layer-2/", // TODO: Update with new networks page when ready
      Svg: ChooseNetworkIcon,
      className: "text-accent-b hover:text-accent-b-hover",
      eventName: "L2",
    },
    {
      label: t("page-index:page-index-cta-dapps-label"),
      description: t("page-index:page-index-cta-dapps-description"),
      href: "/dapps/",
      Svg: TryAppsIcon,
      className: cn(
        "text-accent-c hover:text-accent-c-hover",
        isRtl && "[&_svg]:-scale-x-100"
      ),
      eventName: "dapps",
    },
  ]

  const popularTopics = [
    {
      label: t("page-index:page-index-popular-topics-ethereum"),
      Svg: EthTokenIcon,
      href: "/what-is-ethereum/",
      eventName: "ethereum",
    },
    {
      label: t("page-index:page-index-popular-topics-wallets"),
      Svg: PickWalletIcon,
      href: "/wallets/",
      eventName: "wallets",
    },
    {
      label: t("page-index:page-index-popular-topics-start"),
      Svg: BlockHeap,
      href: "/guides/",
      eventName: "start guides",
    },
    {
      label: t("page-index:page-index-popular-topics-whitepaper"),
      Svg: Whitepaper,
      className: cn(isRtl && "[&_div_div:has(svg)]:-scale-x-100"),
      href: "/whitepaper/",
      eventName: "whitepaper",
    },
    {
      label: t("page-index:page-index-popular-topics-roadmap"),
      Svg: RoadmapSign,
      className: cn(isRtl && "[&_div_div:has(svg)]:-scale-x-100 "),
      href: "/roadmap/",
      eventName: "roadmap",
    },
  ]

  const upcomingEvents = events
    .filter((event) => {
      const isValid = isValidDate(event.endDate)
      const beginningOfEndDate = new Date(event.endDate).getTime()
      const endOfEndDate = beginningOfEndDate + 24 * 60 * 60 * 1000
      const isUpcoming = endOfEndDate >= new Date().getTime()
      return isValid && isUpcoming
    })
    .sort(
      (a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
    )
    .slice(0, 3) as EventCardProps[] // Show 3 events ending soonest

  const joinActions = [
    {
      Svg: EthGlyphIcon,
      label: t("page-index:page-index-join-action-contribute-label"),
      href: "/contributing/",
      className: "text-accent-c hover:text-accent-c-hover",
      description: t(
        "page-index:page-index-join-action-contribute-description"
      ),
      eventName: "contribute",
    },
    {
      Svg: FaGithub,
      label: "GitHub",
      href: GITHUB_REPO_URL,
      className: "text-accent-a hover:text-accent-a-hover",
      description: t("page-index:page-index-join-action-github-description"),
      eventName: "GitHub",
    },
    {
      Svg: FaDiscord,
      label: "Discord",
      href: "/discord/",
      className: "text-primary hover:text-primary-hover",
      description: t("page-index:page-index-join-action-discord-description"),
      eventName: "Discord",
    },
    {
      Svg: FaXTwitter,
      label: "X",
      href: "https://x.com/EthDotOrg",
      className: "text-accent-b hover:text-accent-b-hover",
      description: t("page-index:page-index-join-action-twitter-description"),
      eventName: "Twitter",
    },
  ]

  return {
    t,
    locale,
    asPath,
    dir: direction,
    isModalOpen,
    setModalOpen,
    activeCode,
    toggleCodeExample,
    codeExamples,
    subHeroCTAs,
    popularTopics,
    upcomingEvents,
    joinActions,
    bentoItems,
    eventCategory,
  }
}
