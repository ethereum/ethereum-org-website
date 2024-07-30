import { useTranslation } from "next-i18next"
import { FaDiscord, FaGithub, FaTwitter } from "react-icons/fa"
import { IoChevronUpSharp } from "react-icons/io5"
import {
  Box,
  Flex,
  Heading,
  Icon,
  List,
  ListItem,
  SimpleGrid,
  Text,
} from "@chakra-ui/react"

import type { FooterLink, FooterLinkSection } from "@/lib/types"

import { BaseLink } from "@/components/Link"
import Translation from "@/components/Translation"

import { scrollIntoView } from "@/lib/utils/scrollIntoView"

import { Button } from "./Buttons"

const socialLinks = [
  {
    icon: FaGithub,
    href: "https://github.com/ethereum/ethereum-org-website",
    ariaLabel: "GitHub",
  },
  {
    icon: FaTwitter,
    href: "https://twitter.com/ethdotorg",
    ariaLabel: "Twitter",
  },
  {
    icon: FaDiscord,
    href: "https://discord.gg/ethereum-org",
    ariaLabel: "Discord",
  },
]

type FooterProps = {
  lastDeployLocaleTimestamp: string
}

const Footer = ({ lastDeployLocaleTimestamp }: FooterProps) => {
  const { t } = useTranslation("common")

  const linkSections: FooterLinkSection[] = [
    {
      title: t("learn"),
      links: [
        {
          href: "/learn/",
          text: t("learn-hub"),
        },
        {
          href: "/what-is-ethereum/",
          text: t("what-is-ethereum"),
        },
        {
          href: "/eth/",
          text: t("what-is-ether"),
        },
        {
          href: "/wallets/",
          text: t("ethereum-wallets"),
        },
        {
          href: "/web3/",
          text: t("web3"),
        },
        {
          href: "/smart-contracts/",
          text: t("smart-contracts"),
        },
        {
          href: "/gas/",
          text: "Gas fees",
        },
        {
          href: "/run-a-node/",
          text: t("run-a-node"),
        },
        {
          href: "/security/",
          text: t("ethereum-security"),
        },
        {
          href: "/quizzes/",
          text: t("quizzes-title"),
        },
        {
          href: "/glossary/",
          text: t("ethereum-glossary"),
        },
      ],
    },
    {
      title: t("use"),
      links: [
        {
          href: "/guides/",
          text: t("guides"),
        },
        {
          href: "/wallets/find-wallet/",
          text: t("nav-find-wallet-label"),
        },
        {
          href: "/get-eth/",
          text: t("get-eth"),
        },
        {
          href: "/dapps/",
          text: t("decentralized-applications-dapps"),
        },
        {
          href: "/stablecoins/",
          text: t("stablecoins"),
        },
        {
          href: "/nft/",
          text: t("nft-page"),
        },
        {
          href: "/defi/",
          text: t("defi-page"),
        },
        {
          href: "/dao/",
          text: t("dao-page"),
        },
        {
          href: "/decentralized-identity/",
          text: t("decentralized-identity"),
        },
        {
          href: "/staking/",
          text: t("stake-eth"),
        },
        {
          href: "/layer-2/",
          text: t("layer-2"),
        },
      ],
    },
    {
      title: t("build"),
      links: [
        {
          href: "/developers/",
          text: t("nav-builders-home-label"),
          isPartiallyActive: false,
        },
        {
          href: "/developers/tutorials/",
          text: t("tutorials"),
        },
        {
          href: "/developers/docs/",
          text: t("documentation"),
        },
        {
          href: "/developers/learning-tools/",
          text: t("learn-by-coding"),
        },
        {
          href: "/developers/local-environment/",
          text: t("set-up-local-env"),
        },
        {
          href: "/community/grants/",
          text: t("grants"),
        },
        {
          href: "/developers/docs/intro-to-ethereum/",
          text: t("nav-docs-foundation-label"),
        },
        {
          href: "/developers/docs/design-and-ux/",
          text: t("nav-docs-design-label"),
        },
        {
          href: "/enterprise/",
          text: t("enterprise-mainnet"),
        },
        {
          href: "/enterprise/private-ethereum/",
          text: t("enterprise-private"),
        },
      ],
    },
    {
      title: t("participate"),
      links: [
        {
          href: "/community/",
          text: t("community-hub"),
        },
        {
          href: "/community/online/",
          text: t("ethereum-online"),
        },
        {
          href: "/community/events/",
          text: t("ethereum-events"),
        },
        {
          href: "/contributing/",
          text: t("nav-contribute-label"),
        },
        {
          href: "/contributing/translation-program/",
          text: t("translation-program"),
        },
        {
          href: "/bug-bounty/",
          text: t("ethereum-bug-bounty"),
        },
        {
          href: "/foundation/",
          text: t("ethereum-foundation"),
        },
        {
          href: "https://blog.ethereum.org/",
          text: t("ef-blog"),
        },
        {
          href: "https://esp.ethereum.foundation",
          text: t("esp"),
        },
        {
          href: "https://devcon.org/",
          text: t("devcon"),
        },
      ],
    },
    {
      title: t("research"),
      links: [
        {
          href: "/whitepaper/",
          text: t("ethereum-whitepaper"),
        },
        {
          href: "/roadmap/",
          text: t("ethereum-roadmap"),
        },
        {
          href: "/roadmap/security/",
          text: t("nav-roadmap-security-label"),
        },
        {
          href: "/history/",
          text: t("nav-history-label"),
        },
        {
          href: "/community/research/",
          text: t("nav-open-research-label"),
        },
        {
          href: "/eips/",
          text: t("eips"),
        },
        {
          href: "/governance/",
          text: t("ethereum-governance"),
        },
      ],
    },
  ]

  const dipperLinks: FooterLink[] = [
    {
      href: "/about/",
      text: t("about-us"),
    },
    {
      href: "/assets/",
      text: t("ethereum-brand-assets"),
    },
    {
      href: "/community/code-of-conduct/",
      text: t("nav-code-of-conduct"),
    },
    {
      href: "/about/#open-jobs",
      text: t("jobs"),
    },
    {
      href: "/privacy-policy/",
      text: t("privacy-policy"),
    },
    {
      href: "/terms-of-use/",
      text: t("terms-of-use"),
    },
    {
      href: "/cookie-policy/",
      text: t("cookie-policy"),
    },
    {
      href: "mailto:press@ethereum.org",
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
        fill: "body.medium",
      },
    },
  }

  return (
    <Box as="footer" py="4" px="8">
      <Flex
        justify={{ base: "center", md: "space-between" }}
        alignItems="center"
        flexWrap="wrap"
        gap={8}
        pt={4}
        pb={4}
        borderTop={"1px solid"}
        borderColor={"body.light"}
      >
        <Text fontSize={"sm"} fontStyle={"italic"} color={"body.medium"}>
          <Translation id="website-last-updated" />: {lastDeployLocaleTimestamp}
        </Text>

        <Button
          leftIcon={<IoChevronUpSharp />}
          variant="outline"
          isSecondary
          onClick={() => scrollIntoView("__next")}
        >
          {t("go-to-top")}
        </Button>
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
                  <BaseLink href={link.href} {...linkProps}>
                    {link.text}
                  </BaseLink>
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
      </SimpleGrid>
      <Flex
        p={6}
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        fontSize="sm"
        bg="background.highlight"
      >
        <Box display="flex" gap={4}>
          {socialLinks.map(({ href, ariaLabel, icon }) => (
            <BaseLink
              key={href}
              href={href}
              hideArrow
              color="body.base"
              aria-label={ariaLabel}
              _focus={{ color: "primary.base" }}
            >
              <Icon
                as={icon}
                _hover={{
                  transition:
                    "color 0.2s ease-in-out, transform 0.2s ease-in-out",
                }}
                fontSize="4xl"
              />
            </BaseLink>
          ))}
        </Box>
        <List
          display="flex"
          flexDir={{ base: "column", sm: "row" }}
          flexWrap="wrap"
          justifyContent={{ base: "center", sm: "space-between", md: "center" }}
          fontWeight="normal"
          fontSize="sm"
          p={5}
          m={0}
        >
          {dipperLinks.map(({ href, text }) => (
            <ListItem key={text} textAlign="center" px="2">
              <BaseLink href={href} w={["100%", null]} {...linkProps}>
                {text}
              </BaseLink>
            </ListItem>
          ))}
        </List>
      </Flex>
    </Box>
  )
}

export default Footer
