import { getTranslations } from "next-intl/server"

import type { FooterLinkSection } from "@/lib/types"

import Discord from "@/components/icons/discord.svg"
import Farcaster from "@/components/icons/farcaster.svg"
import Github from "@/components/icons/github.svg"
import Twitter from "@/components/icons/twitter.svg"
import { BaseLink } from "@/components/ui/Link"
import { List, ListItem } from "@/components/ui/list"

import { cn } from "@/lib/utils/cn"

import GoToTopButton from "./GoToTopButton"

import {
  buildFooterDipperLinks,
  buildFooterLinkSections,
} from "@/lib/nav/footerLinks"

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/ethereum/ethereum-org-website",
    ariaLabel: "GitHub",
  },
  {
    icon: Farcaster,
    href: "https://farcaster.xyz/ethdotorg",
    ariaLabel: "Farcaster",
  },
  {
    icon: Twitter,
    href: "https://x.com/ethdotorg",
    ariaLabel: "X",
  },
  {
    icon: Discord,
    href: "https://discord.gg/ethereum-org",
    ariaLabel: "Discord",
  },
]

type FooterProps = {
  lastDeployLocaleTimestamp: string
}

const Footer = async ({ lastDeployLocaleTimestamp }: FooterProps) => {
  const t = await getTranslations("common")

  const linkSections = buildFooterLinkSections(t)
  const dipperLinks = buildFooterDipperLinks(t)

  const footerLinkClassName =
    "text-body-medium no-underline hover:text-primary hover:after:text-primary"

  return (
    <footer className="px-4 py-4">
      <div className="flex flex-wrap items-center justify-center gap-8 border-t border-body-light px-4 py-4 md:justify-between">
        <p className="text-sm text-body-medium italic">
          {t("website-last-updated")}:{" "}
          {/* Deploy date changes every release; exclude it from visual diffs
              so it doesn't flake every page snapshot in Chromatic. */}
          <span data-chromatic="ignore">{lastDeployLocaleTimestamp}</span>
        </p>

        <GoToTopButton label={t("go-to-top")} />
      </div>

      <div className="px-4 py-4">
        <BaseLink
          href="/"
          className="text-lg font-bold no-underline hover:text-primary"
        >
          ethereum.org
        </BaseLink>
      </div>

      <div className="grid auto-cols-auto justify-between gap-4 px-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        {linkSections.map((section: FooterLinkSection, idx) => (
          <div key={idx}>
            <h3 className="my-5 text-sm">{section.title}</h3>
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
              className="text-body hover:text-primary"
            >
              <Icon
                aria-hidden="true"
                className="h-9 w-9 hover:transform hover:transition-colors"
              />
              <span className="sr-only">{ariaLabel}</span>
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
