import { useColorMode } from "@chakra-ui/react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { cloneDeep } from "lodash"
import { useRef, useState } from "react"
import { IItem, ISections } from "./types"

import { trackCustomEvent } from "../../utils/matomo"

export const useNav = ({ path }: { path: string }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { colorMode, toggleColorMode } = useColorMode()
  const { t, i18n } = useTranslation()

  const isDarkTheme = colorMode === "dark"

  const linkSections: ISections = {
    useEthereum: {
      text: t("use-ethereum"),
      ariaLabel: t("use-ethereum-menu"),
      items: [
        {
          text: t("find-wallet"),
          to: "/wallets/find-wallet/",
        },
        {
          text: t("get-eth"),
          to: "/get-eth/",
        },
        {
          text: t("decentralized-applications-dapps"),
          to: "/dapps/",
        },
        {
          text: t("layer-2"),
          to: "/layer-2/",
        },
        {
          text: t("nft-page"),
          to: "/nft/",
        },
        {
          text: t("defi-page"),
          to: "/defi/",
        },
        {
          text: t("dao-page"),
          to: "/dao/",
        },
        {
          text: t("stablecoins"),
          to: "/stablecoins/",
        },
        {
          text: t("stake-eth"),
          to: "/staking/",
        },
        {
          text: t("run-a-node"),
          to: "/run-a-node/",
        },
        {
          text: t("decentralized-social-networks"),
          to: "/social-networks/",
        },
        {
          text: t("decentralized-identity"),
          to: "/decentralized-identity/",
        },
        {
          text: t("decentralized-science"),
          to: "/desci/",
        },
      ],
    },
    learn: {
      text: t("learn"),
      ariaLabel: t("learn-menu"),
      items: [
        {
          text: "Start here",
          items: [
            {
              text: t("learn-hub"),
              to: "/learn/",
            },
            {
              text: t("guides-hub"),
              to: "/guides/",
            },
          ],
        },
        {
          text: "Ethereum basics",
          items: [
            {
              text: t("what-is-ethereum"),
              to: "/what-is-ethereum/",
            },
            {
              text: t("what-is-ether"),
              to: "/eth/",
            },
            {
              text: t("ethereum-wallets"),
              to: "/wallets/",
            },
            {
              text: t("ethereum-security"),
              to: "/security/",
            },
            {
              text: t("web3"),
              to: "/web3/",
            },
            {
              text: t("smart-contracts"),
              to: "/smart-contracts/",
            },
            {
              text: t("quizzes-title"),
              to: "/quizzes/",
            },
          ],
        },
        {
          text: "Ethereum protocol",
          items: [
            {
              text: t("energy-consumption"),
              to: "/energy-consumption/",
            },
            {
              text: t("ethereum-roadmap"),
              to: "/roadmap/",
            },
            {
              text: t("eips"),
              to: "/eips/",
            },
            {
              text: t("history-of-ethereum"),
              to: "/history/",
            },
            {
              text: t("ethereum-whitepaper"),
              to: "/whitepaper/",
            },
            {
              text: t("ethereum-glossary"),
              to: "/glossary/",
            },
            {
              text: t("ethereum-governance"),
              to: "/governance/",
            },
            {
              text: t("bridges"),
              to: "/bridges/",
            },
            {
              text: t("zero-knowledge-proofs"),
              to: "/zero-knowledge-proofs/",
            },
          ],
        },
      ],
    },
    developers: {
      text: t("developers"),
      ariaLabel: t("page-developers-aria-label"),
      items: [
        {
          text: t("developers-home"),
          to: "/developers/",
        },
        {
          text: t("documentation"),
          to: "/developers/docs/",
        },
        {
          text: t("tutorials"),
          to: "/developers/tutorials/",
        },
        {
          text: t("learn-by-coding"),
          to: "/developers/learning-tools/",
        },
        {
          text: t("set-up-local-env"),
          to: "/developers/local-environment/",
        },
      ],
    },
    enterprise: {
      text: t("enterprise"),
      ariaLabel: t("enterprise-menu"),
      items: [
        {
          text: t("mainnet-ethereum"),
          to: "/enterprise/",
        },
        {
          text: t("private-ethereum"),
          to: "/enterprise/private-ethereum/",
        },
      ],
    },
    community: {
      text: t("community"),
      ariaLabel: t("community-menu"),
      items: [
        {
          text: t("community-hub"),
          to: "/community/",
        },
        {
          text: t("ethereum-online"),
          to: "/community/online/",
        },
        {
          text: t("ethereum-events"),
          to: "/community/events/",
        },
        {
          text: t("get-involved"),
          to: "/community/get-involved/",
        },
        {
          text: t("open-research"),
          to: "/community/research/",
        },
        {
          text: t("grants"),
          to: "/community/grants/",
        },
        {
          text: t("ethereum-support"),
          to: "/community/support/",
        },
        {
          text: t("language-resources"),
          to: "/community/language-resources/",
        },
      ],
    },
  }

  const ednLinks: Array<IItem> = [
    {
      text: t("home"),
      to: "/developers/",
      isPartiallyActive: false,
    },
    {
      text: t("docs"),
      to: "/developers/docs/",
    },
    {
      text: t("tutorials"),
      to: "/developers/tutorials/",
    },
    {
      text: t("learn-by-coding"),
      to: "/developers/learning-tools/",
    },
    {
      text: t("set-up-local-env"),
      to: "/developers/local-environment/",
    },
  ]

  let mobileLinkSections = cloneDeep(linkSections)
  const toggleMenu = (): void => {
    setIsMenuOpen((prev) => !prev)
  }

  const searchRef = useRef<HTMLButtonElement>(null)

  const toggleSearch = (): void => {
    searchRef.current?.click()
  }
  const shouldShowSubNav = path.includes("/developers/")
  const splitPath = path.split("/")
  const fromPageParameter =
    splitPath.length > 3 && splitPath[2] !== "languages"
      ? `?from=/${splitPath.slice(2).join("/")}`
      : ""

  const changeColorMode = () => {
    toggleColorMode()
    trackCustomEvent({
      eventCategory: "nav bar",
      eventAction: "click",
      eventName: isDarkTheme ? "light mode" : "dark mode", // This will be inverted as the state is changing
    })
  }

  const mobileNavProps = {
    isMenuOpen,
    isDarkTheme,
    toggleMenu,
    toggleTheme: changeColorMode,
    toggleSearch,
    linkSections: mobileLinkSections,
    fromPageParameter,
  }

  return {
    toggleColorMode: changeColorMode,
    t,
    i18n,
    isDarkTheme,
    ednLinks,
    linkSections,
    searchRef,
    shouldShowSubNav,
    fromPageParameter,
    mobileNavProps,
  }
}
