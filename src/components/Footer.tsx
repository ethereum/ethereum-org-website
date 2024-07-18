import { useTranslation } from "next-i18next"
import { FaDiscord, FaGithub, FaTwitter } from "react-icons/fa"
import { IoChevronUpSharp } from "react-icons/io5"

import type { FooterLink, FooterLinkSection } from "@/lib/types"

import Translation from "@/components/Translation"

import { cn } from "@/lib/utils/cn"
import { scrollIntoView } from "@/lib/utils/scrollIntoView"

import { BaseLink } from "../../tailwind/Link"

import { Button, ButtonIcon } from "./ui/button"
import { List, ListItem } from "./ui/list"

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
    icon: FaDiscord,
    to: "https://discord.gg/ethereum-org",
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

  const footerLinkClassName =
    "text-body-medium no-underline hover:text-primary hover:after:text-primary"

  return (
    <footer className="px-8 py-4">
      <div className="flex flex-wrap items-center justify-center gap-8 border-t border-body-light py-4 md:justify-between">
        <p className="text-sm italic text-body-medium">
          <Translation id="website-last-updated" />: {lastDeployLocaleTimestamp}
        </p>

        <Button variant="secondary" onClick={() => scrollIntoView("__next")}>
          <ButtonIcon icon={<IoChevronUpSharp />} /> Go to top
        </Button>
      </div>

      <div className="grid auto-cols-auto justify-between gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        {linkSections.map((section: FooterLinkSection, idx) => (
          <div key={idx}>
            <h3 className="my-5 text-sm font-bold">
              <Translation id={section.title} />
            </h3>
            <List className="m-0 mb-4 list-none text-sm">
              {section.links.map((link, linkIdx) => (
                <ListItem key={linkIdx} className="mb-4">
                  <BaseLink
                    href={link.to}
                    className={footerLinkClassName}
                    isPartiallyActive={false}
                  >
                    {link.text}
                  </BaseLink>
                </ListItem>
              ))}
            </List>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center bg-background-highlight p-6 text-sm">
        <div className="flex gap-4">
          {socialLinks.map(({ to, ariaLabel, icon: Icon }) => (
            <BaseLink
              key={to}
              href={to}
              hideArrow
              aria-label={ariaLabel}
              className="text-body hover:text-primary"
            >
              <Icon className="h-9 w-9 hover:transform hover:transition-colors" />
            </BaseLink>
          ))}
        </div>
        <List className="m-0 flex list-none flex-col flex-wrap justify-center p-5 text-sm font-normal sm:flex-row sm:justify-between md:justify-center">
          {dipperLinks.map(({ to, text }) => (
            <ListItem key={text} className="px-2 text-center">
              <BaseLink
                href={to}
                className={cn("w-full sm:w-auto", footerLinkClassName)}
                isPartiallyActive={false}
              >
                {text}
              </BaseLink>
            </ListItem>
          ))}
        </List>
      </div>
    </footer>
  )
}

export default Footer
