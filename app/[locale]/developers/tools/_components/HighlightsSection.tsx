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
import { stripMarkdown } from "@/lib/utils/md"

import { DEV_TOOL_CATEGORY_SLUGS } from "../constants"
import type { DeveloperTool } from "../types"
import { getCategoryTagStyle } from "../utils"

const HighlightsSection = async ({ tools }: { tools: DeveloperTool[] }) => {
  const locale = await getLocale()
  const t = await getTranslations({
    locale,
    namespace: "page-developers-tools",
  })

  // Don't render section if no tools to highlight
  if (tools.length === 0) return null

  return (
    <Section id="highlights" className="space-y-4">
      <h2>{t("page-developers-tools-highlights")}</h2>
      <EdgeScrollContainer>
        {tools.map((tool) => {
          // Safety check - skip tools without required images
          if (!tool.banner_url || !tool.thumbnail_url) return null

          const categorySlug = DEV_TOOL_CATEGORY_SLUGS[tool.category]

          return (
            <EdgeScrollItem
              key={tool.id}
              asChild
              className="ms-6 w-[calc(100%-4rem)] max-w-md md:min-w-96 md:flex-1 lg:max-w-[33%]"
            >
              <LinkBox
                className={cn(
                  "group/appcard rounded-xl p-2",
                  "hover:bg-background-highlight"
                )}
              >
                <LinkOverlay
                  href={`?toolId=${tool.id}`}
                  scroll={false}
                  className="space-y-6 no-underline"
                >
                  <div className="space-y-4">
                    <CardBanner background="accent-a" fit="contain">
                      <Image
                        src={tool.banner_url!}
                        alt=""
                        sizes="(max-width: 23rem) 100vw, 23rem"
                        width={23 * 16}
                        height={23 * 4}
                      />
                    </CardBanner>
                    <CardParagraph variant="base" className="line-clamp-2">
                      {stripMarkdown(tool.description)}
                    </CardParagraph>
                  </div>
                  <AppCard
                    name={tool.name}
                    thumbnail={tool.thumbnail_url}
                    category={t(
                      `page-developers-tools-category-${categorySlug}-title`
                    )}
                    categoryTagStatus={getCategoryTagStyle(categorySlug)}
                    tags={tool.tags.map((tag) =>
                      t(`page-developers-tools-tag-${tag}`)
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
