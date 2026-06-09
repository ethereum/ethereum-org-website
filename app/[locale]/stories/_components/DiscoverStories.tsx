import { getTranslations } from "next-intl/server"

import { Image } from "@/components/Image"
import {
  Card,
  CardBanner,
  CardButtonFake,
  CardContent,
  CardFooter,
  CardHeader,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"

import { FEATURED_STORIES } from "../utils"

import digitalFeudalismCover from "@/public/content/stories/digital-feudalism/tarrence-cover-image.jpeg"
import adoption1 from "@/public/images/10-year-anniversary/adoption-1.png"
import adoption2 from "@/public/images/10-year-anniversary/adoption-2.png"

// Placeholder imagery, keyed by featured slug -- swap for final art later.
const placeholderImages = {
  "escaping-venezuela": adoption1,
  "ukraine-payments": adoption2,
  "digital-feudalism": digitalFeudalismCover,
} as const

const DiscoverStories = async () => {
  const t = await getTranslations("page-stories")

  return (
    <div className="rounded-4xl bg-radial-a px-4 py-12 md:px-8 md:py-16">
      <div className="mx-auto mb-10 flex max-w-2xl flex-col gap-3 text-center">
        <h2>{t("page-stories-discover-title")}</h2>
        <p className="text-lg text-body-medium">
          {t("page-stories-discover-subtitle")}
        </p>
      </div>

      <div className="mx-auto grid max-w-screen-lg grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURED_STORIES.map((story) => (
          <Card
            key={story.slug}
            href={`/stories/${story.slug}/`}
            variant="nested"
            className="border"
          >
            <CardHeader>
              <CardBanner className="h-40">
                <Image
                  src={placeholderImages[story.slug]}
                  alt=""
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                />
              </CardBanner>
            </CardHeader>
            <CardContent>
              <CardTitle variant="semibold">{t(story.titleKey)}</CardTitle>
              <CardParagraph size="sm" className="line-clamp-3">
                {t(story.descriptionKey)}
              </CardParagraph>
            </CardContent>
            <CardFooter>
              <CardButtonFake>
                {t("page-stories-discover-read-full-story")}
              </CardButtonFake>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default DiscoverStories
