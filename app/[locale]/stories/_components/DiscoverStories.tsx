import { getTranslations } from "next-intl/server"

import type { StoryPreview } from "@/lib/types"

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
import { Grid } from "@/components/ui/grid"

type DiscoverStoriesProps = {
  stories: StoryPreview[]
}

const DiscoverStories = async ({ stories }: DiscoverStoriesProps) => {
  const t = await getTranslations("page-stories")

  if (stories.length === 0) return null

  return (
    <div className="rounded-4xl bg-radial-a px-4 py-12 md:px-8 md:py-16">
      <div className="mx-auto mb-10 flex max-w-2xl flex-col gap-3 text-center">
        <h2>{t("page-stories-discover-title")}</h2>
        <p className="text-lg text-body-medium">
          {t("page-stories-discover-subtitle")}
        </p>
      </div>

      <Grid columns={3} className="mx-auto max-w-screen-lg">
        {stories.map((story) => (
          <Card
            key={story.slug}
            href={`/stories/${story.slug}/`}
            variant="nested"
            className="border"
          >
            <CardHeader>
              <CardBanner className="h-40">
                <Image
                  src={story.image}
                  alt=""
                  width={640}
                  height={360}
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                />
              </CardBanner>
            </CardHeader>
            <CardContent>
              <CardTitle>{story.title}</CardTitle>
              <CardParagraph size="sm" className="line-clamp-3">
                {story.description}
              </CardParagraph>
            </CardContent>
            <CardFooter>
              <CardButtonFake>
                {t("page-stories-discover-read-full-story")}
              </CardButtonFake>
            </CardFooter>
          </Card>
        ))}
      </Grid>
    </div>
  )
}

export default DiscoverStories
