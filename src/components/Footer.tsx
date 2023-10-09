import {
  Box,
  Flex,
  Heading,
  Icon,
  List,
  ListItem,
  SimpleGrid,
  useToken,
} from "@chakra-ui/react"
// TODO
// import { useI18next, useTranslation } from "gatsby-plugin-react-i18next"
import React from "react"
import { FaDiscord, FaGithub, FaTwitter } from "react-icons/fa"

// TODO
// import { Lang } from "../utils/languages"
// import { getLocaleTimestamp } from "../utils/time"
// import { isLangRightToLeft } from "../utils/translations"

import { TranslationKey } from "@/lib/types"
import { BaseLink } from "./Link"
// TODO
// import Translation from "./Translation"

const socialLinks = [
  {
    icon: FaGithub,
    to: "https://github.com/ethereum/ethereum-org-website",
    ariaLabel: "GitHub",
    color: "#333",
  },
  {
    icon: FaTwitter,
    to: "https://twitter.com/ethdotorg",
    ariaLabel: "Twitter",
    color: "#1DA1F2",
  },
  {
    icon: FaDiscord,
    to: "https://discord.gg/CetY6Y4",
    ariaLabel: "Discord",
    color: "#7289da",
  },
]
export interface LinkSection {
  title: TranslationKey
  links: Array<{
    to: string
    text: TranslationKey
    isPartiallyActive?: boolean
  }>
}

export interface IProps {}

const Footer: React.FC<IProps> = () => {
  // const { language } = useI18next()
  // const { t } = useTranslation()

  // TODO
  // const isPageRightToLeft = isLangRightToLeft(language as Lang)
  const isPageRightToLeft = false

  const [medBp] = useToken("breakpoints", ["md"])

  const linkSections: Array<LinkSection> = [
    {
      title: "Use Ethereum", // t("use-ethereum"),
      links: [
        {
          to: "/wallets/find-wallet/",
          text: "Find wallet", // t("find-wallet"),
        },
        {
          to: `/get-eth/`,
          text: "Get ETH", // t("get-eth"),
        },
        {
          to: `/dapps/`,
          text: "Decentralized applications (dapps)", // t("decentralized-applications-dapps"),
        },
        {
          to: "/layer-2/",
          text: "Layer 2", // t("layer-2"),
        },
        {
          to: "/run-a-node/",
          text: "Run a node", // t("run-a-node"),
        },
        {
          to: `/stablecoins/`,
          text: "Stablecoins", // t("stablecoins"),
        },
        {
          to: `/staking/`,
          text: "Stake ETH", // t("stake-eth"),
        },
      ],
    },
    {
      title: "Learn", // t("learn"),
      links: [
        {
          to: `/learn/`,
          text: "Learn Hub", // t("learn-hub"),
        },
        {
          to: `/what-is-ethereum/`,
          text: "What is Ethereum?", // t("what-is-ethereum"),
        },
        {
          to: `/eth/`,
          text: "What is ether (ETH)?", // t("what-is-ether"),
        },
        {
          to: `/wallets/`,
          text: "Ethereum wallets", // t("ethereum-wallets"),
        },
        {
          to: "/gas/",
          text: "Gas fees",
        },
        {
          to: "/security/",
          text: "Ethereum security and scam prevention", // t("ethereum-security"),
        },
        {
          to: "/web3/",
          text: "What is Web3?", // t("web3"),
        },
        {
          to: "/smart-contracts/",
          text: "Smart contracts", // t("smart-contracts"),
        },
        {
          to: "/energy-consumption/",
          text: "Ethereum energy consumption", // t("energy-consumption"),
        },
        {
          to: "/roadmap/",
          text: "Ethereum roadmap", // t("ethereum-roadmap"),
        },
        {
          to: "/eips/",
          text: "Ethereum Improvement Proposals", // t("eips"),
        },
        {
          to: "/history/",
          text: "History of Ethereum", // t("history-of-ethereum"),
        },
        {
          to: "/whitepaper/",
          text: "Ethereum Whitepaper", // t("ethereum-whitepaper"),
        },
        {
          to: `/glossary/`,
          text: "Ethereum glossary", // t("ethereum-glossary"),
        },
        {
          to: "/governance/",
          text: "Ethereum governance", // t("ethereum-governance"),
        },
        {
          to: "/bridges/",
          text: "Blockchain bridges", // t("bridges"),
        },
        {
          to: "/zero-knowledge-proofs/",
          text: "Zero-knowledge proofs", // t("zero-knowledge-proofs"),
        },
        {
          to: "/quizzes/",
          text: "Quiz Hub", // t("quizzes-title"),
        },
      ],
    },
    {
      title: "Developers", // t("developers"),
      links: [
        {
          to: `/developers/`,
          text: "Get started", // t("get-started"),
          isPartiallyActive: false,
        },
        {
          to: `/developers/docs/`,
          text: "Documentation", // t("documentation"),
        },
        {
          to: `/developers/tutorials/`,
          text: "Tutorials", // t("tutorials"),
        },
        {
          to: `/developers/learning-tools/`,
          text: "Learn by coding", // t("learn-by-coding"),
        },
        {
          to: `/developers/local-environment/`,
          text: "Set up local environment", // t("set-up-local-env"),
        },
      ],
    },
    {
      title: "Ecosystem", // t("ecosystem"),
      links: [
        {
          to: `/community/`,
          text: "Community hub", // t("community-hub"),
        },
        {
          to: "/foundation/",
          text: "Ethereum Foundation", // t("ethereum-foundation"),
        },
        {
          to: "https://blog.ethereum.org/",
          text: "Ethereum Foundation Blog", // t("ef-blog"),
        },
        {
          to: "https://esp.ethereum.foundation",
          text: "Ecosystem Support Program", // t("esp"),
        },
        {
          to: "/bug-bounty/",
          text: "Ethereum bug bounty program", // t("ethereum-bug-bounty"),
        },
        {
          to: "/community/grants",
          text: "Ecosystem Grant Programs", // t("grant-programs"),
        },
        {
          to: "/assets/",
          text: "Ethereum brand assets", // t("ethereum-brand-assets"),
        },
        {
          to: "https://devcon.org/",
          text: "Devcon", // t("devcon"),
        },
      ],
    },
    {
      title: "Enterprise", // t("enterprise"),
      links: [
        {
          to: "/enterprise/",
          text: "Mainnet Ethereum", // t("mainnet-ethereum"),
        },
        {
          to: "/enterprise/private-ethereum/",
          text: "Private Ethereum", // t("private-ethereum"),
        },
        {
          to: "/enterprise/",
          text: "Enterprise", // t("enterprise"),
        },
      ],
    },
    {
      title: "About ethereum.org", // t("about-ethereum-org"),
      links: [
        {
          to: "/about/",
          text: "About us", // t("about-us"),
        },
        {
          to: "/about/#open-jobs",
          text: "Jobs", // t("jobs"),
        },
        {
          to: "/contributing/",
          text: "Contributing", // t("contributing"),
        },
        {
          to: "/languages/",
          text: "Language support", // t("language-support"),
        },
        {
          to: "/privacy-policy/",
          text: "Privacy policy", // t("privacy-policy"),
        },
        {
          to: "/terms-of-use/",
          text: "Terms of use", // t("terms-of-use"),
        },
        {
          to: "/cookie-policy/",
          text: "Cookie policy", // t("cookie-policy"),
        },
        {
          to: "mailto:press@ethereum.org",
          text: "Contact", // t("contact"),
        },
      ],
    },
  ]

  return (
    <Box as="footer" p="1rem 2rem">
      <Flex
        fontSize="sm"
        justify="space-between"
        alignItems="center"
        flexWrap="wrap"
      >
        <Box color="text200">
          {/* TODO */}
          {/* <Translation id="website-last-updated" />:{" "} */}
          Website last updated: August 17, 2023
          {/* {getLocaleTimestamp(
            language as Lang,
            data.allSiteBuildMetadata.edges[0].node.buildTime
          )} */}
        </Box>
        <Box my={4}>
          {socialLinks.map((link, idk) => {
            return (
              <BaseLink
                key={idk}
                to={link.to}
                hideArrow
                color="secondary"
                aria-label={link.ariaLabel}
              >
                <Icon
                  as={link.icon}
                  _hover={{
                    color: link.color,
                    transition:
                      "color 0.2s ease-in-out, transform 0.2s ease-in-out",
                  }}
                  fontSize="4xl"
                  ml={4}
                />
              </BaseLink>
            )
          })}
        </Box>
      </Flex>
      <SimpleGrid
        gap={4}
        justifyContent="space-between"
        gridTemplateColumns="repeat(6, auto)"
        sx={{
          "@media (max-width: 1300px)": {
            gridTemplateColumns: "repeat(3, auto)",
          },
          [`@media (max-width: ${medBp})`]: {
            gridTemplateColumns: "repeat(2, auto)",
          },
          "@media (max-width: 500px)": {
            gridTemplateColumns: "auto",
          },
        }}
      >
        {linkSections.map((section: LinkSection, idx) => (
          <Box key={idx}>
            <Heading as="h3" fontSize="sm" lineHeight="1.6" my="1.14em">
              {/* TODO */}
              {/* <Translation id={section.title} /> */}
              {section.title}
            </Heading>
            <List fontSize="sm" lineHeight="1.6" fontWeight="400" m={0}>
              {section.links.map((link, linkIdx) => (
                <ListItem key={linkIdx} mb={4}>
                  <BaseLink
                    to={link.to}
                    isPartiallyActive={false}
                    dir={isPageRightToLeft ? "auto" : "ltr"}
                    textDecor="none"
                    color="text200"
                    fontWeight="normal"
                    _hover={{
                      textDecor: "none",
                      color: "primary.base",
                      _after: {
                        color: "primary.base",
                      },
                      "& svg": {
                        fill: "primary.base",
                      },
                    }}
                    sx={{
                      "& svg": {
                        fill: "text200",
                      },
                    }}
                  >
                    {link.text}
                  </BaseLink>
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default Footer
