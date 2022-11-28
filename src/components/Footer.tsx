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
import { graphql, StaticQuery } from "gatsby"
import React from "react"
import { FaGithub, FaTwitter, FaYoutube, FaDiscord } from "react-icons/fa"
import { useI18next } from "gatsby-plugin-react-i18next"

import { Lang } from "../utils/languages"
import { getLocaleTimestamp } from "../utils/time"
import { isLangRightToLeft, TranslationKey } from "../utils/translations"
import Link from "./Link"
import Translation from "./Translation"

const socialLinks = [
  {
    icon: FaGithub,
    to: "https://github.com/ethereum/ethereum-org-website",
    ariaLabel: "GitHub",
  },
  {
    icon: FaTwitter,
    to: "https://twitter.com/ethdotorg",
    ariaLabel: "Twitter",
  },
  {
    icon: FaYoutube,
    to: "https://youtube.com/channel/UCNOfzGXD_C9YMYmnefmPH0g",
    ariaLabel: "Youtube",
  },
  {
    icon: FaDiscord,
    to: "https://discord.gg/CetY6Y4",
    ariaLabel: "Discord",
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
  const { language } = useI18next()

  const isPageRightToLeft = isLangRightToLeft(language as Lang)

  const [medBp] = useToken("breakpoints", ["md"])

  const linkSections: Array<LinkSection> = [
    {
      title: "use-ethereum",
      links: [
        {
          text: "find-wallet",
          to: "/wallets/find-wallet/",
        },
        {
          to: `/get-eth/`,
          text: "get-eth",
        },
        {
          to: `/dapps/`,
          text: "decentralized-applications-dapps",
        },
        {
          to: "/layer-2/",
          text: "layer-2",
        },
        {
          to: "/run-a-node/",
          text: "run-a-node",
        },
        {
          to: `/stablecoins/`,
          text: "page-stablecoins-title",
        },
        {
          to: `/staking/`,
          text: "page-upgrades-get-involved-stake-eth",
        },
      ],
    },
    {
      title: "learn",
      links: [
        {
          to: `/what-is-ethereum/`,
          text: "what-is-ethereum",
        },
        {
          to: `/eth/`,
          text: "what-is-ether",
        },
        {
          to: `/wallets/`,
          text: "ethereum-wallets",
        },
        {
          to: `/learn/`,
          text: "guides-and-resources",
        },
        {
          to: "/history/",
          text: "history-of-ethereum",
        },
        {
          to: "/whitepaper/",
          text: "ethereum-whitepaper",
        },
        {
          text: "ethereum-upgrades",
          to: "/upgrades/",
        },
        {
          text: "ethereum-security",
          to: "/security/",
        },
        {
          to: `/glossary/`,
          text: "ethereum-glossary",
        },
        {
          text: "ethereum-governance",
          to: "/governance/",
        },
        {
          text: "bridges",
          to: "/bridges/",
        },
        {
          text: "zero-knowledge-proofs",
          to: "/zero-knowledge-proofs/",
        },
        {
          text: "energy-consumption",
          to: "/energy-consumption/",
        },
        {
          text: "web3",
          to: "/web3/",
        },
        {
          to: "/eips/",
          text: "eips",
        },
      ],
    },
    {
      title: "developers",
      links: [
        {
          to: `/developers/`,
          text: "get-started",
          isPartiallyActive: false,
        },
        {
          to: `/developers/docs/`,
          text: "documentation",
        },
        {
          to: `/developers/tutorials/`,
          text: "tutorials",
        },
        {
          to: `/developers/learning-tools/`,
          text: "learn-by-coding",
        },
        {
          to: `/developers/local-environment/`,
          text: "set-up-local-env",
        },
      ],
    },
    {
      title: "ecosystem",
      links: [
        {
          to: `/community/`,
          text: "community-hub",
        },
        {
          to: "/foundation/",
          text: "ethereum-foundation",
        },
        {
          to: "https://blog.ethereum.org/",
          text: "ef-blog",
        },
        {
          to: "https://esp.ethereum.foundation",
          text: "esp",
        },
        {
          to: "/bug-bounty/",
          text: "ethereum-bug-bounty",
        },
        {
          to: "/community/grants",
          text: "grant-programs",
        },
        {
          to: "/assets/",
          text: "ethereum-brand-assets",
        },
        {
          to: "https://devcon.org/",
          text: "devcon",
        },
      ],
    },
    {
      title: "enterprise",
      links: [
        {
          to: "/enterprise/",
          text: "mainnet-ethereum",
        },
        {
          to: "/enterprise/private-ethereum/",
          text: "private-ethereum",
        },
        {
          to: "/enterprise/",
          text: "enterprise",
        },
      ],
    },
    {
      title: "about-ethereum-org",
      links: [
        {
          to: "/about/",
          text: "about-us",
        },
        {
          to: "/about/#open-jobs",
          text: "jobs",
        },
        {
          to: "/contributing/",
          text: "contributing",
        },
        {
          to: "/languages/",
          text: "language-support",
        },
        {
          to: "/privacy-policy/",
          text: "privacy-policy",
        },
        {
          to: "/terms-of-use/",
          text: "terms-of-use",
        },
        {
          to: "/cookie-policy/",
          text: "cookie-policy",
        },
        {
          to: "mailto:press@ethereum.org",
          text: "contact",
        },
      ],
    },
  ]

  return (
    <StaticQuery
      query={graphql`
        query FooterQuery {
          allSiteBuildMetadata {
            edges {
              node {
                buildTime
              }
            }
          }
        }
      `}
      render={(data) => (
        <Box as="footer" p="1rem 2rem">
          <Flex
            fontSize="sm"
            justify="space-between"
            alignItems="center"
            flexWrap="wrap"
          >
            <Box color="text200">
              <Translation id="website-last-updated" />:{" "}
              {getLocaleTimestamp(
                language as Lang,
                data.allSiteBuildMetadata.edges[0].node.buildTime
              )}
            </Box>
            <Box my={4}>
              {socialLinks.map((link, idk) => {
                return (
                  <Link
                    key={idk}
                    to={link.to}
                    hideArrow
                    color="secondary"
                    aria-label={link.ariaLabel}
                  >
                    <Icon as={link.icon} fontSize="4xl" ml={4} />
                  </Link>
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
                  <Translation id={section.title} />
                </Heading>
                <List fontSize="sm" lineHeight="1.6" fontWeight="400" m={0}>
                  {section.links.map((link, linkIdx) => (
                    <ListItem key={linkIdx} mb={4}>
                      <Link
                        to={link.to}
                        isPartiallyActive={false}
                        dir={isPageRightToLeft ? "auto" : "ltr"}
                        textDecor="none"
                        color="text200"
                        _hover={{
                          textDecor: "none",
                          color: "primary",
                          _after: {
                            color: "primary",
                          },
                          "& svg": {
                            fill: "primary",
                          },
                        }}
                        sx={{
                          "& svg": {
                            fill: "text200",
                          },
                        }}
                      >
                        <Translation id={link.text} />
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      )}
    />
  )
}

export default Footer
