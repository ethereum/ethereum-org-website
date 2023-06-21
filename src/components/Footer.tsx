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
import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { FaGithub, FaTwitter, FaYoutube, FaDiscord } from "react-icons/fa"
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next"

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
  const { t } = useTranslation()

  const isPageRightToLeft = isLangRightToLeft(language as Lang)

  const [medBp] = useToken("breakpoints", ["md"])

  const linkSections: Array<LinkSection> = [
    {
      title: t("use-ethereum"),
      links: [
        {
          text: t("find-wallet"),
          to: "/wallets/find-wallet/",
        },
        {
          to: `/get-eth/`,
          text: t("get-eth"),
        },
        {
          to: `/dapps/`,
          text: t("decentralized-applications-dapps"),
        },
        {
          to: "/layer-2/",
          text: t("layer-2"),
        },
        {
          to: "/run-a-node/",
          text: t("run-a-node"),
        },
        {
          to: `/stablecoins/`,
          text: t("stablecoins"),
        },
        {
          to: `/staking/`,
          text: t("stake-eth"),
        },
      ],
    },
    {
      title: t("learn"),
      links: [
        {
          to: `/learn/`,
          text: t("learn-hub"),
        },
        {
          to: `/what-is-ethereum/`,
          text: t("what-is-ethereum"),
        },
        {
          to: `/eth/`,
          text: t("what-is-ether"),
        },
        {
          to: `/wallets/`,
          text: t("ethereum-wallets"),
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
          text: t("energy-consumption"),
          to: "/energy-consumption/",
        },
        {
          text: t("ethereum-roadmap"),
          to: "/roadmap/",
        },
        {
          to: "/eips/",
          text: t("eips"),
        },
        {
          to: "/history/",
          text: t("history-of-ethereum"),
        },
        {
          to: "/whitepaper/",
          text: t("ethereum-whitepaper"),
        },
        {
          to: `/glossary/`,
          text: t("ethereum-glossary"),
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
        {
          text: t("quizzes-title"),
          to: "/quizzes/",
        },
      ],
    },
    {
      title: t("developers"),
      links: [
        {
          to: `/developers/`,
          text: t("get-started"),
          isPartiallyActive: false,
        },
        {
          to: `/developers/docs/`,
          text: t("documentation"),
        },
        {
          to: `/developers/tutorials/`,
          text: t("tutorials"),
        },
        {
          to: `/developers/learning-tools/`,
          text: t("learn-by-coding"),
        },
        {
          to: `/developers/local-environment/`,
          text: t("set-up-local-env"),
        },
      ],
    },
    {
      title: t("ecosystem"),
      links: [
        {
          to: `/community/`,
          text: t("community-hub"),
        },
        {
          to: "/foundation/",
          text: t("ethereum-foundation"),
        },
        {
          to: "https://blog.ethereum.org/",
          text: t("ef-blog"),
        },
        {
          to: "https://esp.ethereum.foundation",
          text: t("esp"),
        },
        {
          to: "/bug-bounty/",
          text: t("ethereum-bug-bounty"),
        },
        {
          to: "/community/grants",
          text: t("grant-programs"),
        },
        {
          to: "/assets/",
          text: t("ethereum-brand-assets"),
        },
        {
          to: "https://devcon.org/",
          text: t("devcon"),
        },
      ],
    },
    {
      title: t("enterprise"),
      links: [
        {
          to: "/enterprise/",
          text: t("mainnet-ethereum"),
        },
        {
          to: "/enterprise/private-ethereum/",
          text: t("private-ethereum"),
        },
        {
          to: "/enterprise/",
          text: t("enterprise"),
        },
      ],
    },
    {
      title: t("about-ethereum-org"),
      links: [
        {
          to: "/about/",
          text: t("about-us"),
        },
        {
          to: "/about/#open-jobs",
          text: t("jobs"),
        },
        {
          to: "/contributing/",
          text: t("contributing"),
        },
        {
          to: "/languages/",
          text: t("language-support"),
        },
        {
          to: "/privacy-policy/",
          text: t("privacy-policy"),
        },
        {
          to: "/terms-of-use/",
          text: t("terms-of-use"),
        },
        {
          to: "/cookie-policy/",
          text: t("cookie-policy"),
        },
        {
          to: "mailto:press@ethereum.org",
          text: t("contact"),
        },
      ],
    },
  ]

  const data = useStaticQuery(graphql`
    query {
      allSiteBuildMetadata {
        edges {
          node {
            buildTime
          }
        }
      }
    }
  `)

  return (
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
                  </Link>
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
