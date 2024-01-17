import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { useColorMode, useColorModeValue, useDisclosure } from "@chakra-ui/react"

import { trackCustomEvent } from "@/lib/utils/matomo"

import { FROM_QUERY } from "@/lib/constants"

import type { NavSections } from "./types"

export const useNav = () => {
  const { asPath } = useRouter()
  const { isOpen, onToggle } = useDisclosure()
  const { t } = useTranslation("common")

  const colorToggleEvent = useColorModeValue("dark mode", "light mode") // This will be inverted as the state is changing
  const { toggleColorMode: chakraToggleColorMode } = useColorMode()

  const linkSections: NavSections = {
    learn: {
      label: t("learn"),
      ariaLabel: t("learn-menu"),
      items: [
        {
          label: "Overview",
          description: "All things Ethereum education",
          href: "/learn"
        },
        {
          label: "Basics",
          description: "Understand the fundamentals of Ethereum",
          items: [
            {
              label: t("what-is-ethereum"),
              description: "Understand what makes Ethereum special",
              href: "/what-is-ethereum",
            },
            {
              label: t("what-is-ether"),
              description: "The currency of Ethereum apps",
              href: "/eth",
            },
            {
              label: t("ethereum-wallets"),
              description: "An app to interact with your Ethereum account",
              href: "/wallets",
            },
            {
              label: "What is Web3?",
              description: "An alternative to centralized monopolies dictating the rules",
              href: "/web3",
            },
            {
              label: t("smart-contracts"),
              description: "The fundamental buliding blocks of the Ethereum ecosystem",
              href: "/smart-contracts",
            },
          ],
        },
        {
          label: "Advanced",
          description: "Learn the more complex topics",
          items: [
            {
              label: "Gas fees",
              description: "How are ETH transaction fees calculated",
              href: "/gas",
            },
            {
              label: t("bridges"),
              description: "Web3 has evolved into an ecosystem of primary L1 blockchains and L2 scaling solutions",
              href: "/bridges",
            },
            {
              label: t("zero-knowledge-proofs"),
              description: "A way to prove the validity of a statement without reveling the statement itself",
              href: "/zero-knowledge-proofs",
            },
            {
              label: t("run-a-node"),
              description: "Become fully sovereign while helping secure the network",
              href: "/run-a-node",
            },
            {
              label: t("ethereum-security"),
              description: "Learn best practices when using cryptocurrency",
              href: "/security",
            },
          ],
        },
        {
          label: "Test your knowledge",
          description: "Find out how well you understand Ethereum and cryptocurrencies",
          href: "/quizzes",
        }
      ],
    },
    use: {
      label: t("use"),
      ariaLabel: t("use-menu"),
      items: [
        {
          label: "Get started",
          description: "Your first steps to use Ethereum",
          items: [
            {
              label: "Choose your wallet",
              description: "Wallets allow you to use crypto",
              href: "/wallets/find-wallet",
            },
            {
              label: t("get-eth"),
              description: "You need ether (ETH) to use Ethereum applications",
              href: "/get-eth",
            },
            {
              label: t("decentralized-applications-dapps"),
              description: "Explore a rich ecosystem of apps using Ethereum",
              href: "/dapps",
            },
            {
              label: "How to guides",
              description: "Practical step-by-step guides to help you get started",
              items: [
                // TODO: Add /guides/ link as first sub-item?
                {
                  label: "How to create an Ethereum account",
                  description: "Anyone can create an Ethereum account at any time, for free with a wallet app",
                  href: "/guides/how-to-create-an-ethereum-account",
                },
                {
                  label: "How to use a wallet",
                  description: "Learn how to operate all the basic functions of a wallet",
                  href: "/guides/how-to-use-a-wallet",
                },
                {
                  label: "How to revoke smart contract access",
                  description: "Stay safe when interacting with smart contracts and applications in the Ethereum ecosystem",
                  href: "/guides/how-to-revoke-token-access",
                },
              ]
            },
          ],
        },
        {
          label: "Use cases",
          description: "Discover different ideas for Ethereum usage",
          items: [
            {
              label: t("stablecoins"),
              description: "Stablecoins are Ethereum tokens designed to stay at a fixed value",
              href: "/stablecoins",
            },
            {
              label: t("nft-page"),
              description: "A way to represent anything unique as an Ethereum-based asset",
              href: "/nft",
            },
            {
              label: t("defi-page"),
              description: "A global, open alternative to the traditional financial market",
              href: "/defi",
            },
            {
              label: t("dao-page"),
              description: "Member-owned communities without centralized authority",
              href: "/dao",
            },
            {
              label: "Emerging use cases",
              description: "Get to know other newer use cases for Ethereum",
              items: [
                {
                  label: t("decentralized-identity"),
                  description: "Issue and own your unique decentralized identifiers",
                  href: "/decentralized-identity",
                },
                {
                  label: t("decentralized-social-networks"),
                  description: "Blockchain-based platforms for social interaction and content creation",
                  href: "/social-networks",
                },
                {
                  label: t("decentralized-science"),
                  description: "A global, open alternative to th current scientific system",
                  href: "/desci",
                },
                {
                  label: t("regenerative-finance"),
                  description: "An alternative economic system build on regenerative principles",
                  href: "/refi",
                },
              ]
            }
          ],
        },
        {
          label: "Stake",
          description: "Earn rewards for securing Ethereum",
          items: [
            {
              label: "Staking home",
              description: "An overview of different options for staking",
              href: "/staking",
            },
            {
              label: "Staking from home",
              description: "Run home hardware and personally add to the security and decentralization of the Ethereum network",
              href: "/staking/solo",
            },
            {
              label: "Staking with a service",
              description: "Third-party node operators handle the operation of your validator client",
              href: "/staking/saas",
            },
            {
              label: "Pooled staking",
              description: "Stake and earn rewards with any amount of ETH by joining with others",
              href: "/staking/pools",
            },
          ],
        },
        {
          label: t("layer-2"),
          description: "Cheaper and faster transactions for Ethereum",
          href: "/layer-2",
        }
      ]
    },
    build: {
      label: t("build"),
      ariaLabel: t("build-menu"),
      items: [
        {
          label: "Builder's home",
          description: "A builder's manual for Ethereum—by builders, for builders",
          href: "/developers",
        },
        {
          label: "Get started",
          description: "Useful information for newcomers",
          items: [
            {
              label: "Tutorials",
              description: "Curated list of community tutorials",
              href: "/developers/tutorials",
            },
            {
              label: "Learn by coding",
              description: "Tools that help you experiment with Ethereum",
              href: "/developers/learning-tools",
            },
            {
              label: "Set up local environment",
              description: "Choose and set up your Ethereum development stack",
              href: "/developers/local-environment",
            },
            {
              label: "Grants",
              description: "A curated list by our community on projects that provide grant funding programs",
              href: "/community/grants",
            }
          ]
        },
        {
          label: "Documentation",
          description: "Docs to help you understand and build with Ethereum",
          items: [
            {
              label: "Overview",
              description: "Your home for developer docs",
              href: "/developers/docs",
            },
            {
              label: "Foundational topics",
              description: "Core fundamentals to develop on Ethereum",
              href: "/developers/docs/intro-to-ethereum",
            },
            {
              label: "Ethereum stack",
              description: "Understand all the details of the Ethereum stack",
              href: "/developers/docs/ethereum-stack",
            },
            {
              label: "UX/UI design fundamentals",
              description: "Description of unique web3 design challenges, best practices and user research insights",
              href: "/developers/docs/design-and-ux"
            }
          ],
        },
        {
          label: "Enterprise",
          description: "Business applications for Ethereum",
          items: [
            {
              label: "Mainnet Ethereum",
              description: "Enterprise blockchain applications can be built on the public Ethereum Mainnet",
              href: "/enterprise",
            },
            {
              label: "Private Ethereum",
              description: "Developer resources for private enterprise Ethereum",
              href: "/enterprise/private-ethereum"
            }
          ]
        }
      ],
    },
    participate: {
      label: t("participate"),
      ariaLabel: t("participate-menu"),
      items: [
        {
          label: t("community-hub"),
          description: "Overview on how to participate",
          href: "/community",
        },
        {
          label: "Communities and events",
          description: "Decentralization and freedom to participate for anyone",
          items: [
            {
              label: t("ethereum-online"),
              description: "Hundreds of thousands of Ethereum enthusiasts father in these online communities",
              href: "/community/online",
            },
            {
              label: t("ethereum-events"),
              description: "Every month there are major Ethereum events in-person and online",
              href: "/community/events",
            },
          ]
        },
        {
          label: "Ethereum.org",
          description: "This website is community driven—join us and contribute too",
          items: [
            {
              label: "Contributing to ethereum.org",
              description: "If you want to help, this will guide you",
              href: "/contributing",
            },
            {
              label: "Translation program",
              description: "A collaborative effort to translate ethereum.org to all languages",
              href: "/contributing/translation-program",
            },
            {
              label: "About ethereum.org",
              description: "A public, open-source project for the Ethereum community",
              href: "/about",
            },
          ],
        }
      ],
    },
    research: {
      label: t("research"),
      ariaLabel: t("research-menu"),
      items: [
        {
          label: t("ethereum-whitepaper"),
          description: "The original Ethereum whitepaper written by Vitalik Buterin in 2014",
          href: "/whitepaper",
        },
        {
          label: "Roadmap",
          description: "The path to more scalability, security and sustainabillity for Ethereum",
          items: [
            {
              label: "Improved security",
              description: "Making sure Ethereum stays resilient to all kinds of attacks into the future",
              href: "/roadmap/security",
            },
            {
              label: "Cheaper transactions",
              description: "Network updates to further reduce transaction costs and speed",
              href: "/roadmap/scaling",
            },
            {
              label: "Better user experience",
              description: "Using Ethereum needs to be simplified",
              href: "/roadmap/user-experience",
            },
            {
              label: "Future-proofing",
              description: "Solidifying Ethereum as a robust and decentralized network",
              href: "/roadmap/future-proofing",
            },
          ]
        },
        {
          label: "Research and development",
          description: "PRocesses used to improve Ethereum",
          items: [
            {
              label: "Technical history of Ethereum",
              description: "A timeline of all the major forks and updates",
              href: "/history",
            },
            {
              label: "Open research",
              description: "One of the primary strengths of Ethereum is its active research community",
              href: "/community/research",
            },
            {
              label: "Ethereum improvement proposals (EIPs)",
              description: "Standards that specify new features or processes",
              href: "/eips",
            },
            {
              label: "Governance",
              description: "The process involved in upgrading the Ethereum protocol",
              href: "/governance",
            },
          ]
        },
      ],
    },
  }

  const splitPath = asPath.split("/")
  const fromPageParameter =
    splitPath.length > 1 && splitPath[1] !== "languages"
      ? `?${FROM_QUERY}=/${splitPath.slice(1).join("/")}`
      : ""

  const toggleColorMode = () => {
    chakraToggleColorMode()
    trackCustomEvent({
      eventCategory: "nav bar",
      eventAction: "click",
      eventName: colorToggleEvent,
    })
  }

  const mobileNavProps = {
    fromPageParameter,
    isOpen,
    toggleColorMode,
    onToggle,
  }

  return {
    fromPageParameter,
    linkSections,
    mobileNavProps,
    toggleColorMode,
  }
}
