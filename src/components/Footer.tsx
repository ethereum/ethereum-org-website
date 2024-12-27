import { useTranslation } from "next-i18next"
import { FaDiscord, FaGithub, FaXTwitter } from "react-icons/fa6"
import { IoChevronUpSharp } from "react-icons/io5"

import type { FooterLink, FooterLinkSection } from "@/lib/types"

import Translation from "@/components/Translation"

import { cn } from "@/lib/utils/cn"
import { scrollIntoView } from "@/lib/utils/scrollIntoView"

import { Button } from "./ui/buttons/Button"
import { BaseLink } from "./ui/Link"
import { List, ListItem } from "./ui/list"

const socialLinks = [
  {
    icon: FaGithub,
    href: "https://github.com/ethereum/ethereum-org-website",
    ariaLabel: "GitHub",
  },
  {
    icon: FaXTwitter,
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

  const footerLinkClassName =
    "text-body-medium no-underline hover:text-primary hover:after:text-primary"

  return (
    <footer className="px-4 py-4">
      <div className="flex flex-wrap items-center justify-center gap-8 border-t border-body-light px-4 py-4 md:justify-between">
        <p className="text-sm italic text-body-medium">
          <Translation id="website-last-updated" />: {lastDeployLocaleTimestamp}
        </p>

        <Button
          variant="outline"
          isSecondary
          onClick={() => scrollIntoView("__next")}
        >
          <IoChevronUpSharp /> Go to top
        </Button>
      </div>

      <div className="grid auto-cols-auto justify-between gap-4 px-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        {linkSections.map((section: FooterLinkSection, idx) => (
          <div key={idx}>
            <h3 className="my-5 text-sm font-bold">
              <Translation id={section.title} />
            </h3>
            <List className="m-0 mb-4 list-none text-sm">
              {section.links.map((link, linkIdx) => (
                <ListItem key={linkIdx} className="mb-4">
                  <BaseLink
                    href={link.href}
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
          {socialLinks.map(({ href, ariaLabel, icon: Icon }) => (
            <BaseLink
              key={href}
              href={href}
              hideArrow
              aria-label={ariaLabel}
              className="text-body hover:text-primary"
            >
              <Icon className="h-9 w-9 hover:transform hover:transition-colors" />
            </BaseLink>
          ))}
        </div>
        <List className="m-0 flex list-none flex-col flex-wrap justify-center p-5 text-sm font-normal sm:flex-row sm:justify-between md:justify-center">
          {dipperLinks.map(({ href, text }) => (
            <ListItem key={text} className="px-2 text-center">
              <BaseLink
                href={href}
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
