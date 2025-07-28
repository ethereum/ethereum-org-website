import { ReactNode } from "react"

import InlineLink from "@/components/ui/Link"
import { LinkBox, LinkOverlay } from "@/components/ui/link-box"

import { cn } from "@/lib/utils/cn"
import { MatomoEventOptions } from "@/lib/utils/matomo"

interface InlineLinkData {
  text: string
  className?: string
}

interface SubpageCardProps {
  title: string
  description: string
  icon: ReactNode
  href: string
  className?: string
  inlineLink?: InlineLinkData
  matomoEvent?: MatomoEventOptions
}

const SubpageCard = ({
  title,
  description,
  icon,
  href,
  className,
  inlineLink,
  matomoEvent,
}: SubpageCardProps) => {
  return (
    <LinkBox
      className={cn(
        "flex flex-col gap-3 rounded-3xl border border-[rgba(159,43,212,0.11)] bg-card-gradient-secondary p-6 hover:bg-card-gradient-secondary-hover hover:shadow-lg",
        className
      )}
    >
      <div className="flex gap-4">
        <div className="text-primary">{icon}</div>
        <h3 className="text-xl">{title}</h3>
      </div>
      <p className="m-0 p-0 text-body-medium">{description}</p>

      {inlineLink ? (
        <LinkOverlay href={href} asChild matomoEvent={matomoEvent}>
          <InlineLink
            href={href}
            className={cn("hover:text-primary-hover", inlineLink.className)}
          >
            {inlineLink.text}
          </InlineLink>
        </LinkOverlay>
      ) : (
        <LinkOverlay href={href} />
      )}
    </LinkBox>
  )
}

export default SubpageCard
