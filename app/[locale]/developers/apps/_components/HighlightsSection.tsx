import Image from "next/image"
import { getLocale, getTranslations } from "next-intl/server"

import AppCard from "@/components/AppCard"
import { CardBanner, CardParagraph } from "@/components/ui/card"
import {
  EdgeScrollContainer,
  EdgeScrollItem,
} from "@/components/ui/edge-scroll-container"
import { LinkBox, LinkOverlay } from "@/components/ui/link-box"
import { Section } from "@/components/ui/section"

import { cn } from "@/lib/utils/cn"

import { DEV_APP_CATEGORY_SLUGS } from "../constants"
import type { DeveloperApp } from "../types"
import { getCategoryTagStyle } from "../utils"

const HighlightsSection = async ({ apps }: { apps: DeveloperApp[] }) => {
  const locale = await getLocale()
  const t = await getTranslations({ locale, namespace: "page-developers-apps" })

  // Don't render section if no apps to highlight
  if (apps.length === 0) return null

  return (
    <Section id="highlights" className="space-y-4">
      <h2>{t("page-developers-apps-highlights")}</h2>
      <EdgeScrollContainer>
        {apps.map((app) => {
          // Safety check - skip apps without required images
          if (!app.banner_url || !app.thumbnail_url) return null

          const categorySlug = DEV_APP_CATEGORY_SLUGS[app.category]

          return (
            <EdgeScrollItem
              key={app.id}
              asChild
              className="ms-6 w-[calc(100%-4rem)] max-w-md md:min-w-96 md:flex-1 lg:max-w-[33%]"
            >
              <LinkBox
                className={cn(
                  "group rounded-xl p-2",
                  "hover:bg-background-highlight"
                )}
              >
                <LinkOverlay
                  href={`?appId=${app.id}`}
                  scroll={false}
                  className="space-y-6 no-underline"
                >
                  <div className="space-y-4">
                    <CardBanner background="accent-a" fit="contain">
                      <Image
                        src={app.banner_url!}
                        alt=""
                        sizes="(max-width: 23rem) 100vw, 23rem"
                        width={23 * 16}
                        height={23 * 4}
                      />
                    </CardBanner>
                    <CardParagraph variant="base" className="line-clamp-2">
                      {app.description}
                    </CardParagraph>
                  </div>
                  <AppCard
                    name={app.name}
                    thumbnail={app.thumbnail_url}
                    category={t(
                      `page-developers-apps-category-${categorySlug}-title`
                    )}
                    categoryTagStatus={getCategoryTagStyle(categorySlug)}
                    tags={app.tags.map((tag) =>
                      t(`page-developers-apps-tag-${tag}`)
                    )}
                    layout="horizontal"
                    imageSize="medium"
                  />
                </LinkOverlay>
              </LinkBox>
            </EdgeScrollItem>
          )
        })}
      </EdgeScrollContainer>
    </Section>
  )
}

export default HighlightsSection
