import { useState } from "react"
// import { useTranslation } from "gatsby-plugin-react-i18next"
import { cloneDeep } from "lodash"
import { useColorMode } from "@chakra-ui/react"

import { IItem, ISections } from "./types"

// TODO: add trackCustomEvent when util is migrated
// import { trackCustomEvent } from "../../utils/matomo"

export const useNav = ({ path }: { path: string }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { colorMode, toggleColorMode } = useColorMode()
  // const { t, i18n } = useTranslation()

  const isDarkTheme = colorMode === "dark"

  const linkSections: ISections = {
    useEthereum: {
      text: "Use Ethereum", // t("use-ethereum"),
      ariaLabel: "Use Ethereum menu", // t("use-ethereum-menu"),
      items: [
        {
          text: "Find wallet", // t("find-wallet"),
          to: "/wallets/find-wallet/",
        },
        {
          text: "Get ETH", // t("get-eth"),
          to: "/get-eth/",
        },
        {
          text: "Decentralized applications (dapps)", // t("decentralized-applications-dapps"),
          to: "/dapps/",
        },
        {
          text: "Layer 2", // t("layer-2"),
          to: "/layer-2/",
        },
        {
          text: "Non-fungible tokens (NFTs)", // t("nft-page"),
          to: "/nft/",
        },
        {
          text: "Decentralized finance (DeFi)", // t("defi-page"),
          to: "/defi/",
        },
        {
          text: "Decentralized autonomous organisations (DAOs)", // t("dao-page"),
          to: "/dao/",
        },
        {
          text: "Stablecoins", // t("stablecoins"),
          to: "/stablecoins/",
        },
        {
          text: "Stake ETH", // t("stake-eth"),
          to: "/staking/",
        },
        {
          text: "Run a node", // t("run-a-node"),
          to: "/run-a-node/",
        },
        {
          text: "Decentralized social networks", // t("decentralized-social-networks"),
          to: "/social-networks/",
        },
        {
          text: "Decentralized identity", // t("decentralized-identity"),
          to: "/decentralized-identity/",
        },
        {
          text: "Decentralized science (DeSci)", // t("decentralized-science"),
          to: "/desci/",
        },
        {
          text: "Regenerative finance (ReFi)", // t("regenerative-finance"),
          to: "/refi/",
        },
      ],
    },
    learn: {
      text: "Learn", // t("learn"),
      ariaLabel: "Learn menu", // t("learn-menu"),
      items: [
        {
          text: "Start here", // t("start-here"),
          items: [
            {
              text: "Learn Hub", // t("learn-hub"),
              to: "/learn/",
            },
            {
              text: "Guides hub", // t("guides-hub"),
              to: "/guides/",
            },
          ],
        },
        {
          text: "Ethereum basics", // t("ethereum-basics"),
          items: [
            {
              text: "What is Ethereum?", // t("what-is-ethereum"),
              to: "/what-is-ethereum/",
            },
            {
              text: "What is ether (ETH)?", // t("what-is-ether"),
              to: "/eth/",
            },
            {
              text: "Ethereum wallets", // t("ethereum-wallets"),
              to: "/wallets/",
            },
            {
              text: "Gas fees",
              to: "/gas/",
            },
            {
              text: "Ethereum security and scam prevention", // t("ethereum-security"),
              to: "/security/",
            },
            {
              text: "What is Web3?", // t("web3"),
              to: "/web3/",
            },
            {
              text: "Smart contracts", // t("smart-contracts"),
              to: "/smart-contracts/",
            },

            {
              text: "Quiz Hub", // t("quizzes-title"),
              to: "/quizzes/",
            },
          ],
        },
        {
          text: "Ethereum protocol", // t("ethereum-protocol"),
          items: [
            {
              text: "Ethereum energy consumption", // t("energy-consumption"),
              to: "/energy-consumption/",
            },
            {
              text: "Ethereum roadmap", // t("ethereum-roadmap"),
              to: "/roadmap/",
            },
            {
              text: "Ethereum Improvement Proposals", // t("eips"),
              to: "/eips/",
            },
            {
              text: "History of Ethereum", // t("history-of-ethereum"),
              to: "/history/",
            },
            {
              text: "Ethereum Whitepaper", // t("ethereum-whitepaper"),
              to: "/whitepaper/",
            },
            {
              text: "Ethereum glossary", // t("ethereum-glossary"),
              to: "/glossary/",
            },
            {
              text: "Ethereum governance", // t("ethereum-governance"),
              to: "/governance/",
            },
            {
              text: "Blockchain bridges", // t("bridges"),
              to: "/bridges/",
            },
            {
              text: "Zero-knowledge proofs", // t("zero-knowledge-proofs"),
              to: "/zero-knowledge-proofs/",
            },
          ],
        },
      ],
    },
    developers: {
      text: "Developers", // t("developers"),
      ariaLabel: "Developers' Menu", // t("page-developers-aria-label"),
      items: [
        {
          text: "Developers' home", // t("developers-home"),
          to: "/developers/",
        },
        {
          text: "Documentation", // t("documentation"),
          to: "/developers/docs/",
        },
        {
          text: "Tutorials", // t("tutorials"),
          to: "/developers/tutorials/",
        },
        {
          text: "Learn by coding", // t("learn-by-coding"),
          to: "/developers/learning-tools/",
        },
        {
          text: "Set up local environment", // t("set-up-local-env"),
          to: "/developers/local-environment/",
        },
      ],
    },
    enterprise: {
      text: "Enterprise", // t("enterprise"),
      ariaLabel: "Enterprise Menu", // t("enterprise-menu"),
      items: [
        {
          text: "Mainnet Ethereum", // t("mainnet-ethereum"),
          to: "/enterprise/",
        },
        {
          text: "Private Ethereum", // t("private-ethereum"),
          to: "/enterprise/private-ethereum/",
        },
      ],
    },
    community: {
      text: "Community", // t("community"),
      ariaLabel: "Community Menu", // t("community-menu"),
      items: [
        {
          text: "Community hub", // t("community-hub"),
          to: "/community/",
        },
        {
          text: "Online communities", // t("ethereum-online"),
          to: "/community/online/",
        },
        {
          text: "Ethereum events", // t("ethereum-events"),
          to: "/community/events/",
        },
        {
          text: "Get involved", // t("get-involved"),
          to: "/community/get-involved/",
        },
        {
          text: "Open research", // t("open-research"),
          to: "/community/research/",
        },
        {
          text: "Grants", // t("grants"),
          to: "/community/grants/",
        },
        {
          text: "Ethereum support", // t("ethereum-support"),
          to: "/community/support/",
        },
        {
          text: "Language resources", // t("language-resources"),
          to: "/community/language-resources/",
        },
      ],
    },
  }

  const ednLinks: Array<IItem> = [
    {
      text: "Home", // t("home"),
      to: "/developers/",
      isPartiallyActive: false,
    },
    {
      text: "Docs", // t("docs"),
      to: "/developers/docs/",
    },
    {
      text: "Tutorials", // t("tutorials"),
      to: "/developers/tutorials/",
    },
    {
      text: "Learn by coding", // t("learn-by-coding"),
      to: "/developers/learning-tools/",
    },
    {
      text: "Set up local environment", // t("set-up-local-env"),
      to: "/developers/local-environment/",
    },
  ]

  let mobileLinkSections = cloneDeep(linkSections)
  const toggleMenu = (): void => {
    setIsMenuOpen((prev) => !prev)
  }

  const shouldShowSubNav = path.includes("/developers/")
  const splitPath = path.split("/")
  const fromPageParameter =
    splitPath.length > 3 && splitPath[2] !== "languages"
      ? `?from=/${splitPath.slice(2).join("/")}`
      : ""

  const changeColorMode = () => {
    toggleColorMode()
    // TODO: add trackCustomEvent when util is migrated
    // trackCustomEvent({
    //   eventCategory: "nav bar",
    //   eventAction: "click",
    //   eventName: isDarkTheme ? "light mode" : "dark mode", // This will be inverted as the state is changing
    // })
  }

  const mobileNavProps = {
    isMenuOpen,
    isDarkTheme,
    toggleMenu,
    toggleTheme: changeColorMode,
    linkSections: mobileLinkSections,
    fromPageParameter,
  }

  return {
    toggleColorMode: changeColorMode,
    // t,
    // i18n,
    isDarkTheme,
    ednLinks,
    linkSections,
    shouldShowSubNav,
    fromPageParameter,
    mobileNavProps,
  }
}
