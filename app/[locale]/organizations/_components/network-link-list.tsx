import type { StaticImageData } from "next/image"
import type { ReactNode } from "react"

import { Image } from "@/components/Image"
import { Card, CardButtonFake, CardContent } from "@/components/ui/card"

import { cn } from "@/lib/utils/cn"

export type NetworkLink = {
  key: string
  href: string
  logo: StaticImageData
  name: ReactNode
  description: ReactNode
}

type NetworkLinkListProps = {
  networks: NetworkLink[]
  /** Label for each row's call-to-action */
  ctaLabel: ReactNode
  /** Optional "Powered by Ethereum" style badge shown under the list */
  badge?: {
    logo: StaticImageData
    label: ReactNode
  }
  className?: string
}

/**
 * A list of external network links, one row per network: logo, name,
 * description and a call-to-action. Each row is a link `Card`, so the link,
 * external-link handling and hover state come from the shared primitive.
 */
const NetworkLinkList = ({
  networks,
  ctaLabel,
  badge,
  className,
}: NetworkLinkListProps) => (
  <div className={cn("rounded-4xl bg-tint-primary p-page", className)}>
    <ul className="ms-0 list-none divide-y divide-background">
      {networks.map(({ key, href, logo, name, description }) => (
        <li key={key} className="py-2 first:pt-0">
          <Card
            href={href}
            variant="ghost"
            size="sm"
            className="-mx-(--card-pad)"
          >
            <CardContent
              spacing="none"
              className="flex flex-wrap items-center gap-4"
            >
              <Image
                src={logo}
                alt=""
                className="size-14 shrink-0 rounded-md bg-background object-contain p-1 shadow-md"
                sizes="56px"
              />
              <div className="min-w-48 flex-1">
                <h3 className="text-h5">{name}</h3>
                <p>{description}</p>
              </div>
              <CardButtonFake variant="outline" size="sm">
                {ctaLabel}
              </CardButtonFake>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
    {badge && (
      <div className="mt-space flex">
        <div className="mx-auto inline-flex items-center justify-center gap-2 rounded-full bg-background px-4 py-2 text-sm font-bold">
          <Image
            src={badge.logo}
            // decorative: the adjacent label already names the network
            alt=""
            className="size-6 object-contain"
            sizes="24px"
          />
          <p>{badge.label}</p>
        </div>
      </div>
    )}
  </div>
)

export default NetworkLinkList
