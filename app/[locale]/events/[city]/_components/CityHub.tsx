"use client"

import { ExternalLink } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"

import type { CommunityHub } from "@/lib/events/types"

interface CityHubProps {
  hub: CommunityHub
}

const CityHub = ({ hub }: CityHubProps) => {
  const t = useTranslations("page-events")

  return (
    <article className="flex flex-col gap-6 rounded-lg border border-primary/20 bg-primary/5 p-6 md:flex-row md:items-start md:gap-8">
      {/* Hub logo */}
      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-background">
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

      {/* Hub info */}
      <div className="flex flex-1 flex-col gap-4">
        <div>
          <h3 className="text-xl font-bold">{hub.name}</h3>
          <p className="text-sm text-body-medium">{hub.organization}</p>
        </div>

        <p className="text-body-medium">{hub.description}</p>

        <p className="font-medium">{hub.schedule}</p>

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
          {hub.links.website && (
            <Link
              href={hub.links.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              {t("page-events-website")}
              <ExternalLink className="h-3 w-3" />
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}

export default CityHub
