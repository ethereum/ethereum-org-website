import { useRouter } from "next/router"

import type { RSSItem } from "@/lib/types"

import { isValidDate } from "@/lib/utils/date"

import { Card, CardBanner, CardContent, CardTitle } from "../ui/card"

const PostPreviewCard = ({ pubDate, title, source, link, imgSrc }: RSSItem) => {
  const { locale } = useRouter()
  return (
    <Card href={link}>
      <CardBanner>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imgSrc} alt="" />
      </CardBanner>
      <CardContent className="">
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
        <CardTitle variant="strong">{title}</CardTitle>
      </CardContent>
    </Card>
  )
}

export default PostPreviewCard
