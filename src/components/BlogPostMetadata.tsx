"use client"

import { useLocale } from "next-intl"

import type { Lang } from "@/lib/types"
import type { BlogFrontmatter } from "@/lib/interfaces"

import Emoji from "@/components/Emoji"
import TutorialTags from "@/components/TutorialTags"

import { cn } from "@/lib/utils/cn"
import { getLocaleTimestamp } from "@/lib/utils/time"

import { Flex } from "./ui/flex"

import { useTranslation } from "@/hooks/useTranslation"

export type BlogPostMetadataProps = {
  frontmatter: BlogFrontmatter
  timeToRead: number
}

const BlogPostMetadata = ({
  frontmatter,
  timeToRead,
}: BlogPostMetadataProps) => {
  const locale = useLocale()
  const { t } = useTranslation("page-developers-blog")

  const published = frontmatter.published
  const author = frontmatter.author

  const hasTags = !!frontmatter.tags && frontmatter.tags.length > 0

  return (
    <Flex className="flex-col justify-between border-b-0 border-border pb-2 lg:border-b">
      {hasTags && (
        <Flex className="mb-8 w-full flex-wrap">
          <TutorialTags tags={frontmatter.tags!} />
        </Flex>
      )}
      <Flex
        className={cn(
          "text-text300 mb-6 flex-wrap gap-4 text-sm",
          hasTags && "-mt-4"
        )}
      >
        {author && (
          <div>
            <Emoji className="me-2 text-sm" text=":writing_hand:" />
            {author}
          </div>
        )}
        <div>
          <Emoji className="me-2 text-sm" text=":office_building:" />
          {frontmatter.team ?? t("page-blog-team-attribution")}
        </div>
        {published && (
          <div>
            <Emoji className="me-2 text-sm" text=":calendar:" />{" "}
            {getLocaleTimestamp(locale! as Lang, published)}
          </div>
        )}
        <div>
          <Emoji className="me-2 text-sm" text=":stopwatch:" />
          {timeToRead} {t("page-blog-minute-read")}
        </div>
      </Flex>
    </Flex>
  )
}

export default BlogPostMetadata
