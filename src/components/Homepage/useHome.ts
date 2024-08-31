import { useState } from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { FaDiscord, FaGithub, FaXTwitter } from "react-icons/fa6"

import type { EventCardProps, Lang } from "@/lib/types"
import type { CodeExample } from "@/lib/interfaces"

import BlockHeap from "@/components/icons/block-heap.svg"
import EthGlyphIcon from "@/components/icons/eth-glyph.svg"
import EthTokenIcon from "@/components/icons/eth-token.svg"
import PickWalletIcon from "@/components/icons/eth-wallet.svg"
import ChooseNetworkIcon from "@/components/icons/network-layers.svg"
import TryAppsIcon from "@/components/icons/phone-homescreen.svg"
import RoadmapSign from "@/components/icons/roadmap-sign.svg"
import Whitepaper from "@/components/icons/whitepaper.svg"

import { isValidDate } from "@/lib/utils/date"
import { isLangRightToLeft } from "@/lib/utils/translations"

import events from "@/data/community-events.json"

import { GITHUB_REPO_URL } from "@/lib/constants"

import CreateWalletContent from "!!raw-loader!@/data/CreateWallet.js"
import SimpleDomainRegistryContent from "!!raw-loader!@/data/SimpleDomainRegistry.sol"
import SimpleTokenContent from "!!raw-loader!@/data/SimpleToken.sol"
import SimpleWalletContent from "!!raw-loader!@/data/SimpleWallet.sol"

export const useHome = () => {
  const { t } = useTranslation(["common", "page-index"])
  const { locale, asPath } = useRouter()
  const dir = isLangRightToLeft(locale as Lang) ? "rtl" : "ltr"

  const [isModalOpen, setModalOpen] = useState(false)
  const [activeCode, setActiveCode] = useState(0)

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
    },
    {
      title: t("page-index:page-index-developers-code-example-title-1"),
      description: t(
        "page-index:page-index-developers-code-example-description-1"
      ),
      codeLanguage: "language-solidity",
      code: SimpleTokenContent,
    },
    {
      title: t("page-index:page-index-developers-code-example-title-2"),
      description: t(
        "page-index:page-index-developers-code-example-description-2"
      ),
      codeLanguage: "language-javascript",
      code: CreateWalletContent,
    },
    {
      title: t("page-index:page-index-developers-code-example-title-3"),
      description: t(
        "page-index:page-index-developers-code-example-description-3"
      ),
      codeLanguage: "language-solidity",
      code: SimpleDomainRegistryContent,
    },
  ]

  const subHeroCTAs = [
    {
      label: t("page-index:page-index-cta-wallet-label"),
      description: t("page-index:page-index-cta-wallet-description"),
      href: "/wallets/find-wallet/",
      Svg: PickWalletIcon,
      className: "text-primary hover:text-primary-hover", // TODO: Confirm hover style
    },
    {
      label: t("page-index:page-index-cta-get-eth-label"),
      description: t("page-index:page-index-cta-get-eth-description"),
      href: "/get-eth/",
      Svg: EthTokenIcon,
      className: "text-accent-a hover:text-accent-a-hover",
    },
    {
      label: t("page-index:page-index-cta-networks-label"),
      description: t("page-index:page-index-cta-networks-description"),
      href: "/layer-2/", // TODO: Update with new networks page when ready
      Svg: ChooseNetworkIcon,
      className: "text-accent-b hover:text-accent-b-hover",
    },
    {
      label: t("page-index:page-index-cta-dapps-label"),
      description: t("page-index:page-index-cta-dapps-description"),
      href: "/dapps/",
      Svg: TryAppsIcon,
      className: "text-accent-c hover:text-accent-c-hover",
    },
  ]

  const popularTopics = [
    {
      label: t("page-index:page-index-popular-topics-ethereum"),
      Svg: EthTokenIcon,
      href: "/what-is-ethereum/",
    },
    {
      label: t("page-index:page-index-popular-topics-wallets"),
      Svg: PickWalletIcon,
      href: "/wallets/",
    },
    {
      label: t("page-index:page-index-popular-topics-start"),
      Svg: BlockHeap,
      href: "/guides/",
    },
    {
      label: t("page-index:page-index-popular-topics-whitepaper"),
      Svg: Whitepaper,
      href: "/whitepaper/",
    },
    {
      label: t("page-index:page-index-popular-topics-roadmap"),
      Svg: RoadmapSign,
      href: "/roadmap/",
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
    },
    {
      Svg: FaGithub,
      label: "GitHub",
      href: GITHUB_REPO_URL,
      className: "text-accent-a hover:text-accent-a-hover",
      description: t("page-index:page-index-join-action-github-description"),
    },
    {
      Svg: FaDiscord,
      label: "Discord",
      href: "/discord/",
      className: "text-primary hover:text-primary-hover",
      description: t("page-index:page-index-join-action-discord-description"),
    },
    {
      Svg: FaXTwitter,
      label: "X",
      href: "https://x.com/EthDotOrg",
      className: "text-accent-b hover:text-accent-b-hover",
      description: t("page-index:page-index-join-action-twitter-description"),
    },
  ]
  return {
    t,
    locale,
    asPath,
    dir,
    isModalOpen,
    setModalOpen,
    activeCode,
    toggleCodeExample,
    codeExamples,
    subHeroCTAs,
    popularTopics,
    upcomingEvents,
    joinActions,
  }
}
