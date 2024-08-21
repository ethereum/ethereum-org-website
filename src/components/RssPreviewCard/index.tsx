import { useRouter } from "next/router"

import type { RSSItem } from "@/lib/types"

import { cn } from "@/lib/utils/cn"
import { isValidDate } from "@/lib/utils/date"

import { BaseLink } from "../ui/Link"

type RssPreviewCardProps = RSSItem & {
  className?: string
}

const RssPreviewCard = ({
  pubDate,
  title,
  source,
  link,
  imgSrc,
  className,
}: RssPreviewCardProps) => {
  const { locale } = useRouter()
  return (
    <BaseLink
      href={link}
      className={cn(
        "no-underline duration-100 hover:scale-105 hover:duration-100",
        className
      )}
    >
      <div className="flex flex-col space-y-2.5 text-body">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgSrc}
          alt=""
          className="h-48 w-full rounded-2xl object-cover"
        />
        {isValidDate(pubDate) && (
          <p className="text-sm italic">
            {new Intl.DateTimeFormat(locale, {
              month: "long",
              day: "numeric",
              year: "numeric",
            }).format(new Date(pubDate))}
          </p>
        )}
        <div className="primary-low-contrast w-fit rounded-full bg-accent-a/20 px-4 py-0 text-sm uppercase text-accent-a">
          {source}
        </div>
        <p className="mb-2 text-2xl font-bold">{title}</p>
      </div>
    </BaseLink>
  )
}

export default RssPreviewCard
