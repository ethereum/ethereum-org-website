"use client"

import { ExternalLink } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"

import type { CommunityHub } from "@/lib/events/types"

interface CommunityHubsProps {
  hubs: CommunityHub[]
}

const CommunityHubs = ({ hubs }: CommunityHubsProps) => {
  const t = useTranslations("page-events")

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {hubs.map((hub) => (
        <article
          key={hub.id}
          className="flex flex-col gap-6 rounded-lg border border-body-light bg-background p-6"
        >
          {/* Hub header with logo */}
          <div className="flex flex-col gap-4">
            <div className="h-24 w-24 overflow-hidden rounded-lg bg-background-highlight">
              {hub.logoUrl ? (
                <img
                  src={hub.logoUrl}
                  alt={hub.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-primary/10">
                  <span className="text-2xl font-bold text-primary">
                    {hub.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-xl font-bold">{hub.name}</h3>
              <p className="text-sm text-body-medium">{hub.organization}</p>
            </div>
          </div>

          {/* Description */}
          <p className="flex-1 text-sm text-body-medium">{hub.description}</p>

          {/* Schedule */}
          <p className="text-sm font-medium">{hub.schedule}</p>

          {/* Links */}
          <div className="flex flex-wrap gap-4">
            {hub.links.cowork && (
              <Link
                href={hub.links.cowork}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                {t("page-events-cowork-signup")}
                <ExternalLink className="h-3 w-3" />
              </Link>
            )}
            {hub.links.meetups && (
              <Link
                href={hub.links.meetups}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                {t("page-events-meetups-link")}
                <ExternalLink className="h-3 w-3" />
              </Link>
            )}
          </div>
        </article>
      ))}

      {/* Apply to host a hub card */}
      <article className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-body-light bg-background-highlight p-6">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
          <span className="text-3xl">+</span>
        </div>
        <p className="text-center text-sm font-medium">
          {t("page-events-apply-host-hub")}
        </p>
      </article>
    </div>
  )
}

export default CommunityHubs
