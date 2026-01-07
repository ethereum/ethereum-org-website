"use client"

import { ExternalLink } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"

import type { CommunityHub } from "@/lib/events/types"

interface CommunityHubsProps {
  hubs: CommunityHub[]
}

// Banner gradient overlays for each hub
const HUB_GRADIENTS: Record<string, string> = {
  london: "from-blue-500/80 to-blue-700/90",
  berlin: "from-purple-500/80 to-purple-700/90",
}

const CommunityHubs = ({ hubs }: CommunityHubsProps) => {
  const t = useTranslations("page-events")

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {hubs.map((hub) => (
        <article
          key={hub.id}
          className="flex flex-col overflow-hidden rounded-xl border border-body-light bg-background"
        >
          {/* Banner image with overlay */}
          <div className="relative h-44 w-full overflow-hidden">
            {hub.bannerUrl ? (
              <img
                src={hub.bannerUrl}
                alt={`${hub.name} community hub`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div
                className={`h-full w-full bg-gradient-to-br ${HUB_GRADIENTS[hub.id] || "from-primary/80 to-primary-high-contrast/90"}`}
              />
            )}
            {/* Ethereum branding overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 text-white">
              <span className="text-sm font-medium tracking-wide opacity-90">
                community hub
              </span>
              <span className="text-lg font-semibold tracking-wider">
                ethereum
              </span>
              <span className="text-3xl font-bold">{hub.name}</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col gap-3 p-6">
            {/* Header */}
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-body-medium">
                Community Hub
              </span>
              <h3 className="text-lg font-bold text-body">
                {hub.city}, {hub.country}
              </h3>
            </div>

            {/* Description */}
            <p className="flex-1 text-sm leading-relaxed text-body-medium">
              {hub.description}
            </p>

            {/* Buttons */}
            <div className="flex gap-3">
              {hub.links.cowork && (
                <Button variant="outline" size="sm" asChild>
                  <Link
                    href={hub.links.cowork}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("page-events-cowork-signup")}
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </Button>
              )}
              {hub.links.meetups && (
                <Button variant="outline" size="sm" asChild>
                  <Link
                    href={hub.links.meetups}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("page-events-meetups-link")}
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

export default CommunityHubs
