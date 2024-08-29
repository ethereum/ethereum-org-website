import { useRouter } from "next/router"

import type { RSSItem } from "@/lib/types"

import { isValidDate } from "@/lib/utils/date"

import {
  Card,
  CardBanner,
  CardContent,
  CardHighlight,
  CardSubTitle,
  CardTitle,
} from "../ui/card"

const PostPreviewCard = ({ pubDate, title, source, link, imgSrc }: RSSItem) => {
  const { locale } = useRouter()
  return (
    <Card href={link}>
      <CardBanner>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imgSrc} alt="" />
      </CardBanner>
      <CardContent>
        <CardTitle>{title}</CardTitle>
        {isValidDate(pubDate) && (
          <CardSubTitle>
            {new Intl.DateTimeFormat(locale, {
              month: "long",
              day: "numeric",
              year: "numeric",
            }).format(new Date(pubDate))}
          </CardSubTitle>
        )}
        <CardHighlight>{source}</CardHighlight>
      </CardContent>
    </Card>
  )
}

export default PostPreviewCard
