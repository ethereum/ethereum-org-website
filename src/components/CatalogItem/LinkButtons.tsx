import { Code } from "lucide-react"
import type { ComponentType, SVGProps } from "react"

import type { CatalogItem, CatalogItemLinkKind } from "@/lib/types"

import Discord from "@/components/icons/discord.svg"
import Farcaster from "@/components/icons/farcaster.svg"
import GitHub from "@/components/icons/github.svg"
import Reddit from "@/components/icons/reddit.svg"
import Telegram from "@/components/icons/telegram.svg"
import X from "@/components/icons/twitter.svg"
import { ButtonLink } from "@/components/ui/buttons/Button"

const LINKS: Record<
  CatalogItemLinkKind,
  { Icon: ComponentType<SVGProps<SVGSVGElement>>; platform?: string }
> = {
  x: { Icon: X, platform: "X" },
  discord: { Icon: Discord, platform: "Discord" },
  telegram: { Icon: Telegram, platform: "Telegram" },
  reddit: { Icon: Reddit, platform: "Reddit" },
  farcaster: { Icon: Farcaster, platform: "Farcaster" },
  github: { Icon: GitHub, platform: "GitHub" },
  code: { Icon: Code },
}
const LINK_ORDER = Object.keys(LINKS) as CatalogItemLinkKind[]

export const detailEvent = (
  item: Pick<CatalogItem, "kind" | "name">,
  eventName: string
) => ({
  eventCategory: "detail",
  eventAction: `${item.kind} name ${item.name}`,
  eventName,
})

// Keeps the event names that Matomo history and goals already use.
const linkEvent = (
  item: Pick<CatalogItem, "kind" | "name">,
  name: CatalogItemLinkKind | "visit"
) => {
  if (item.kind !== "wallet")
    return detailEvent(item, name === "x" ? "twitter" : name)
  return name === "visit"
    ? {
        eventCategory: "WalletExternalLinkList",
        eventAction: "Tap main button",
        eventName: item.name,
      }
    : {
        eventCategory: "WalletExternalLinkList",
        eventAction: "Go to wallet",
        eventName: `${name === "x" ? "Twitter" : (LINKS[name].platform ?? name)}: ${item.name}`,
      }
}

export type CatalogItemLinkLabels = {
  /** Raw message with `{name}` and `{platform}` placeholders. */
  link: string
  sourceCode: string
}

/** Hook-free so the client-side wallet modal can render it with server-built labels. */
const CatalogItemLinkButtons = ({
  item,
  labels,
}: {
  item: Pick<
    CatalogItem,
    "kind" | "name" | "primaryLink" | "secondaryLinks" | "socialLinks"
  >
  labels: CatalogItemLinkLabels
}) => {
  const links = [...item.socialLinks].sort(
    (a, b) => LINK_ORDER.indexOf(a.kind) - LINK_ORDER.indexOf(b.kind)
  )
  const secondaryLinks = item.secondaryLinks ?? []
  if (!item.primaryLink && !secondaryLinks.length && !links.length) return null

  return (
    <div className="flex flex-wrap gap-4">
      {item.primaryLink && (
        <ButtonLink
          href={item.primaryLink.href}
          hideArrow
          className="w-full sm:w-fit"
          customEventOptions={linkEvent(item, "visit")}
        >
          {item.primaryLink.label}
        </ButtonLink>
      )}
      {secondaryLinks.map(({ href, label }) => (
        <ButtonLink
          key={href}
          href={href}
          variant="outline"
          className="w-full sm:w-fit"
          customEventOptions={detailEvent(item, label)}
        >
          {label}
        </ButtonLink>
      ))}
      {links.map(({ kind, href }) => {
        const { Icon, platform = labels.sourceCode } = LINKS[kind]
        return (
          <ButtonLink
            key={href}
            href={href}
            variant="outline"
            isSecondary
            hideArrow
            customEventOptions={linkEvent(item, kind)}
          >
            <Icon aria-hidden />
            <span className="sr-only">
              {labels.link
                .replace("{name}", item.name)
                .replace("{platform}", platform)}
            </span>
          </ButtonLink>
        )
      })}
    </div>
  )
}

export default CatalogItemLinkButtons
