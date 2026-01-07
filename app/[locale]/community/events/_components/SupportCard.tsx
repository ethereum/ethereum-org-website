// TODO: Remove?
import { ExternalLink } from "lucide-react"
import type { StaticImageData } from "next/image"

import { Image } from "@/components/Image"
import { LinkBox, LinkOverlay } from "@/components/ui/link-box"

import { cn } from "@/lib/utils/cn"

interface SupportCardProps {
  title: string
  description: string
  href: string
  image?: string | StaticImageData
  className?: string
}

export default function SupportCard({
  title,
  description,
  href,
  image,
  className,
}: SupportCardProps) {
  return (
    <LinkBox
      className={cn(
        "group rounded-xl border border-body-light p-6 transition-colors hover:border-primary hover:bg-background-highlight",
        className
      )}
    >
      <LinkOverlay href={href} className="no-underline ring" hideArrow>
        <div className="flex items-start gap-4">
          {image && (
            <div className="flex size-12 shrink-0 overflow-hidden rounded-full bg-background-highlight">
              <Image
                src={image}
                alt={title}
                width={48}
                height={48}
                className="size-full object-cover"
              />
            </div>
          )}
          <div className="flex-1">
            <h3 className="mb-2 text-xl font-bold text-primary group-hover:text-primary-hover">
              {title}
            </h3>
            <p className="text-body-medium">{description}</p>
          </div>
          <ExternalLink className="mt-1 size-5 shrink-0 text-body-medium group-hover:text-primary" />
        </div>
      </LinkOverlay>
    </LinkBox>
  )
}
