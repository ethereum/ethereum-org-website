"use client"

import { ExternalLink } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"

import type { CommunityHub } from "@/lib/events/types"

interface CommunityHubsProps {
  hubs: CommunityHub[]
}

// Unique background colors for each hub city
const HUB_COLORS: Record<string, string> = {
  london: "bg-[#fefaf3]",
  berlin: "bg-[#f3e8f6]",
  dubai: "bg-[#f4e0bb]",
  lagos: "bg-[#e6f3f2]",
}

const CommunityHubs = ({ hubs }: CommunityHubsProps) => {
  const t = useTranslations("page-events")

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {hubs.map((hub) => (
        <article
          key={hub.id}
          className={`flex flex-col gap-4 rounded-[32px] p-6 shadow-sm ${HUB_COLORS[hub.id] || "bg-background-highlight"}`}
        >
          {/* Hub header with circular logo */}
          <div className="flex flex-col gap-4">
            <div className="h-16 w-16 overflow-hidden rounded-full bg-white shadow-sm">
              {hub.logoUrl ? (
                <img
                  src={hub.logoUrl}
                  alt={hub.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-primary/10">
                  <span className="text-xl font-bold text-primary">
                    {hub.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            <h3 className="text-xl font-bold text-body">{hub.name}</h3>
          </div>

          {/* Description */}
          <p className="flex-1 text-sm leading-relaxed text-body-medium">
            {hub.description}
          </p>

          {/* Schedule */}
          <p className="text-sm font-medium text-body">{hub.schedule}</p>

          {/* Links - side by side */}
          <div className="flex items-center gap-4">
            {hub.links.cowork && (
              <Link
                href={hub.links.cowork}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm font-medium text-[#6c24df] hover:underline"
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
                className="flex items-center gap-1 text-sm font-medium text-[#6c24df] hover:underline"
              >
                {t("page-events-meetups-link")}
                <ExternalLink className="h-3 w-3" />
              </Link>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}

export default CommunityHubs
