"use client"

import { useLocale } from "next-intl"

import type { Lang } from "@/lib/types"
import type { BlogFrontmatter } from "@/lib/interfaces"

import Emoji from "@/components/Emoji"

import { getLocaleTimestamp } from "@/lib/utils/time"

import { Flex } from "./ui/flex"
import { Tag } from "./ui/tag"

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

  return (
    <Flex className="flex-col justify-between border-b-0 border-border pb-2 lg:border-b">
      {frontmatter.tags && frontmatter.tags.length > 0 && (
        <Flex className="mb-4 w-full flex-wrap gap-2">
          {frontmatter.tags.map((tag) => (
            <Tag key={tag} variant="outline" className="mb-0">
              {tag}
            </Tag>
          ))}
        </Flex>
      )}
      <Flex className="text-text300 mb-6 flex-wrap gap-4 text-sm">
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
