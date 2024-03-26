import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { FaDiscord, FaGithub, FaTwitter } from "react-icons/fa"
import {
  Box,
  Flex,
  Heading,
  Icon,
  List,
  ListItem,
  SimpleGrid,
} from "@chakra-ui/react"

import type { FooterLink, FooterLinkSection, Lang } from "@/lib/types"

import { BaseLink } from "@/components/Link"
import Translation from "@/components/Translation"

import { getLocaleTimestamp } from "@/lib/utils/time"

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
    to: "https://discord.gg/ethereum-org",
    ariaLabel: "Discord",
    color: "#7289da",
  },
]

type FooterProps = {
  lastDeployDate: string
}

const Footer = ({ lastDeployDate }: FooterProps) => {
  const { locale } = useRouter()
  const { t } = useTranslation("common")

  const linkSections: FooterLinkSection[] = [
    {
      title: t("learn"),
      links: [
        {
          to: "/learn/",
          text: t("learn-hub"),
        },
        {
          to: "/what-is-ethereum/",
          text: t("what-is-ethereum"),
        },
        {
          to: "/eth/",
          text: t("what-is-ether"),
        },
        {
          to: "/wallets/",
          text: t("ethereum-wallets"),
        },
        {
          to: "/web3/",
          text: t("web3"),
        },
        {
          to: "/smart-contracts/",
          text: t("smart-contracts"),
        },
        {
          to: "/gas/",
          text: "Gas fees",
        },
        {
          to: "/run-a-node/",
          text: t("run-a-node"),
        },
        {
          to: "/security/",
          text: t("ethereum-security"),
        },
        {
          to: "/quizzes/",
          text: t("quizzes-title"),
        },
        {
          to: "/glossary/",
          text: t("ethereum-glossary"),
        },
      ],
    },
    {
      title: t("use"),
      links: [
        {
          to: "/guides/",
          text: t("guides"),
        },
        {
          to: "/wallets/find-wallet/",
          text: t("nav-find-wallet-label"),
        },
        {
          to: "/get-eth/",
          text: t("get-eth"),
        },
        {
          to: "/dapps/",
          text: t("decentralized-applications-dapps"),
        },
        {
          to: "/stablecoins/",
          text: t("stablecoins"),
        },
        {
          to: "/nft/",
          text: t("nft-page"),
        },
        {
          to: "/defi/",
          text: t("defi-page"),
        },
        {
          to: "/dao/",
          text: t("dao-page"),
        },
        {
          to: "/decentralized-identity/",
          text: t("decentralized-identity"),
        },
        {
          to: "/staking/",
          text: t("stake-eth"),
        },
        {
          to: "/layer-2/",
          text: t("layer-2"),
        },
      ],
    },
    {
      title: t("build"),
      links: [
        {
          to: "/developers/",
          text: t("nav-builders-home-label"),
          isPartiallyActive: false,
        },
        {
          to: "/developers/tutorials/",
          text: t("tutorials"),
        },
        {
          to: "/developers/docs/",
          text: t("documentation"),
        },
        {
          to: "/developers/learning-tools/",
          text: t("learn-by-coding"),
        },
        {
          to: "/developers/local-environment/",
          text: t("set-up-local-env"),
        },
        {
          to: "/community/grants/",
          text: t("grants"),
        },
        {
          to: "/developers/docs/intro-to-ethereum/",
          text: t("nav-docs-foundation-label"),
        },
        {
          to: "/developers/docs/design-and-ux/",
          text: t("nav-docs-design-label"),
        },
        {
          to: "/enterprise/",
          text: t("enterprise-mainnet"),
        },
        {
          to: "/enterprise/private-ethereum/",
          text: t("enterprise-private"),
        },
      ],
    },
    {
      title: t("participate"),
      links: [
        {
          to: "/community/",
          text: t("community-hub"),
        },
        {
          to: "/community/online/",
          text: t("ethereum-online"),
        },
        {
          to: "/community/events/",
          text: t("ethereum-events"),
        },
        {
          to: "/contributing/",
          text: t("nav-contribute-label"),
        },
        {
          to: "/contributing/translation-program/",
          text: t("translation-program"),
        },
        {
          to: "/bug-bounty/",
          text: t("ethereum-bug-bounty"),
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
          to: "https://devcon.org/",
          text: t("devcon"),
        },
      ],
    },
    {
      title: t("research"),
      links: [
        {
          to: "/whitepaper/",
          text: t("ethereum-whitepaper"),
        },
        {
          to: "/roadmap/",
          text: t("ethereum-roadmap"),
        },
        {
          to: "/roadmap/security/",
          text: t("nav-roadmap-security-label"),
        },
        {
          to: "/history/",
          text: t("nav-history-label"),
        },
        {
          to: "/community/research/",
          text: t("nav-open-research-label"),
        },
        {
          to: "/eips/",
          text: t("eips"),
        },
        {
          to: "/governance/",
          text: t("ethereum-governance"),
        },
      ],
    },
  ]

  const dipperLinks: FooterLink[] = [
    {
      to: "/about/",
      text: t("about-us"),
    },
    {
      to: "/assets/",
      text: t("ethereum-brand-assets"),
    },
    {
      to: "/community/code-of-conduct/",
      text: t("nav-code-of-conduct"),
    },
    {
      to: "/about/#open-jobs",
      text: t("jobs"),
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
  ]

  const hoverStyles = {
    textDecor: "none",
    color: "primary.base",
    _after: {
      color: "primary.base",
    },
    "& svg": {
      fill: "primary.base",
    },
  }
  const linkProps = {
    isPartiallyActive: false,
    textDecor: "none",
    color: "body.medium",
    fontWeight: "normal",
    _hover: hoverStyles,
    sx: {
      "& svg": {
        fill: "text200",
      },
    },
  }

  return (
    <Box as="footer" py="4" px="8">
      <Flex
        fontSize="md"
        justify="space-between"
        alignItems="center"
        flexWrap="wrap"
      >
        {lastDeployDate && (
          <Box color="text200">
            <Translation id="website-last-updated" />:{" "}
            {getLocaleTimestamp(locale as Lang, lastDeployDate)}
          </Box>
        )}
        <Box my={4}>
          {socialLinks.map(({ to, ariaLabel, icon, color }) => (
            <BaseLink
              key={to}
              href={to}
              hideArrow
              color="secondary"
              aria-label={ariaLabel}
              ms="4"
            >
              <Icon
                as={icon}
                _hover={{
                  color,
                  transition:
                    "color 0.2s ease-in-out, transform 0.2s ease-in-out",
                }}
                fontSize="4xl"
              />
            </BaseLink>
          ))}
        </Box>
      </Flex>
      <SimpleGrid
        gap={4}
        justifyContent="space-between"
        templateColumns={{
          base: "auto",
          sm: "repeat(2, auto)",
          md: "repeat(3, auto)",
          xl: "repeat(6, auto)",
        }}
      >
        {linkSections.map((section: FooterLinkSection, idx) => (
          <Box key={idx}>
            <Heading as="h3" fontSize="sm" lineHeight="base" my="1.14em">
              <Translation id={section.title} />
            </Heading>
            <List fontSize="sm" lineHeight="base" fontWeight="normal" m="0">
              {section.links.map((link, linkIdx) => (
                <ListItem key={linkIdx} mb={4}>
                  <BaseLink href={link.to} {...linkProps}>
                    {link.text}
                  </BaseLink>
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
      </SimpleGrid>
      <List
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        my="6"
        mx="0"
        py="8"
        px="2"
        lineHeight="base"
        fontWeight="normal"
        fontSize="sm"
        bg="background.highlight"
      >
        {dipperLinks.map(({ to, text }) => (
          <ListItem key={text} p="2" m="0">
            <BaseLink href={to} {...linkProps}>
              {text}
            </BaseLink>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default Footer
