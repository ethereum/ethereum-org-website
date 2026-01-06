import { getTranslations } from "next-intl/server"

import { Image } from "@/components/Image"
import InlineLink from "@/components/ui/Link"

import { cn } from "@/lib/utils/cn"

import type { CommunityHub } from "@/data/community-hubs"

interface HubCardProps {
  hub: CommunityHub
  className?: string
}

export default async function HubCard({ hub, className }: HubCardProps) {
  const t = await getTranslations({
    namespace: "page-community-events",
  })
  return (
    <div
      className={cn(
        "flex flex-col justify-between gap-4 rounded-4xl border border-body-light p-8 shadow-lg transition-transform hover:scale-[1.02] hover:transition-transform",
        hub.bgColor,
        className
      )}
    >
      <div className="space-y-2 text-gray-900">
        <div className="grid size-fit shrink-0 place-items-center overflow-hidden rounded-full">
          <Image
            src={hub.banner}
            alt=""
            className="size-24 object-cover"
            sizes="6rem"
          />
        </div>
        <h3 className="text-2xl font-bold">{hub.location}</h3>
        <div className="space-y-[1lh]">
          <p>{hub.description}</p>
          <p>{hub.cta}</p>
        </div>
      </div>
      <div className="mt-auto flex justify-between gap-6">
        <InlineLink
          href={hub.coworkingSignupUrl}
          hideArrow
          className="font-bold"
        >
          {t("page-events-hub-cowork-signup")}
        </InlineLink>
        <InlineLink href={hub.meetupUrl} hideArrow className="font-bold">
          {t("page-events-hub-meetups")}
        </InlineLink>
      </div>
    </div>
  )
}
