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

type LinkedItem = Pick<
  CatalogItem,
  "kind" | "name" | "primaryLink" | "socialLinks"
>

export const detailEvent = (item: LinkedItem, eventName: string) => ({
  eventCategory: "detail",
  eventAction: `${item.kind} name ${item.name}`,
  eventName,
})

/** Primary CTA plus icon buttons; i18n-free so the client modals can render it. */
const CatalogItemLinkButtons = ({
  item,
  sourceCodeLabel,
  linkLabel,
}: {
  item: LinkedItem
  sourceCodeLabel: string
  linkLabel: (platform: string) => string
}) => {
  const links = [...item.socialLinks].sort(
    (a, b) => LINK_ORDER.indexOf(a.kind) - LINK_ORDER.indexOf(b.kind)
  )
  if (!item.primaryLink && links.length === 0) return null

  return (
    <div className="flex flex-wrap gap-4">
      {item.primaryLink && (
        <ButtonLink
          href={item.primaryLink.href}
          hideArrow
          className="w-full sm:w-fit"
          customEventOptions={detailEvent(item, "visit")}
        >
          {item.primaryLink.label}
        </ButtonLink>
      )}
      {links.map(({ kind, href }) => {
        const { Icon, platform = sourceCodeLabel } = LINKS[kind]
        return (
          <ButtonLink
            key={href}
            href={href}
            variant="outline"
            isSecondary
            hideArrow
            aria-label={linkLabel(platform)}
            customEventOptions={detailEvent(item, kind)}
          >
            <Icon />
          </ButtonLink>
        )
      })}
    </div>
  )
}

export default CatalogItemLinkButtons
