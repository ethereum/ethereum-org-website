"use client"

import InlineLink from "@/components/ui/Link"

import { cn } from "@/lib/utils/cn"

import type { CommunityHub } from "@/data/community-hubs"

interface HubCardProps {
  hub: CommunityHub
  className?: string
}

export default function HubCard({ hub, className }: HubCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl border border-body-light bg-background",
        className
      )}
    >
      {/* Colored header with circular logo */}
      <div className={cn("flex items-start p-4", hub.bgColor)}>
        <div
          className={cn(
            "flex size-16 shrink-0 items-center justify-center rounded-full text-center text-[10px] font-bold leading-tight text-white",
            hub.logoBgColor
          )}
        >
          <div>
            <div className="text-xs">{hub.location}</div>
            <div className="text-[8px] font-normal">ethereum</div>
            <div className="text-[7px] font-normal text-white/80">
              community hub
            </div>
          </div>
        </div>
      </div>

      {/* Card content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-xl font-bold text-body">{hub.location}</h3>
        <p className="flex-1 text-sm text-body-medium">{hub.description}</p>
        <p className="text-sm text-body-medium">{hub.cta}</p>
        <div className="flex gap-6">
          <InlineLink
            href={hub.coworkingSignupUrl}
            hideArrow
            className="text-sm font-medium text-primary hover:underline"
          >
            Cowork sign up
          </InlineLink>
          <InlineLink
            href={hub.meetupUrl}
            hideArrow
            className="text-sm font-medium text-primary hover:underline"
          >
            Meetups
          </InlineLink>
        </div>
      </div>
    </div>
  )
}
