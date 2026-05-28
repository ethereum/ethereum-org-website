"use client"

import { useLocale } from "next-intl"

import { Lang, Skill, TranslationKey } from "@/lib/types"
import { TutorialFrontmatter } from "@/lib/interfaces"

import CopyToClipboard from "@/components/CopyToClipboard"
import Emoji from "@/components/Emoji"
import Translation from "@/components/Translation"
import TutorialTags from "@/components/TutorialTags"

import { cn } from "@/lib/utils/cn"
import { getLocaleTimestamp } from "@/lib/utils/time"

import { Flex } from "./ui/flex"
import InlineLink from "./ui/Link"
import { Tag } from "./ui/tag"

import { useTranslation } from "@/hooks/useTranslation"

export type TutorialMetadataProps = {
  frontmatter: TutorialFrontmatter
  timeToRead: number
}

export const getSkillTranslationId = (skill: Skill): TranslationKey =>
  `page-developers-tutorials:page-tutorial-${
    Skill[skill.toUpperCase() as keyof typeof Skill]
  }`

const TutorialMetadata = ({
  frontmatter,
  timeToRead,
}: TutorialMetadataProps) => {
  const locale = useLocale()
  const { t } = useTranslation("page-developers-tutorials")

  const hasSource = frontmatter.source && frontmatter.sourceUrl
  const published = frontmatter.published
  const author = frontmatter.author
  const team = frontmatter.team
  const address = frontmatter.address
  const hasTags = !!frontmatter.tags?.length
  const hasSkill = !!frontmatter.skill
  const hasTopRow = hasTags || hasSkill

  return (
    <Flex className="flex-col justify-between border-b-0 border-border pb-2 lg:border-b">
      {hasTopRow && (
        <Flex className="mb-8 w-full items-center justify-between">
          {hasTags && (
            <Flex className="w-full flex-wrap">
              <TutorialTags tags={frontmatter.tags!} />
            </Flex>
          )}
          {hasSkill && (
            <Tag
              variant="outline"
              className="mb-2 self-start whitespace-nowrap"
            >
              {t(getSkillTranslationId(frontmatter.skill as Skill))}
            </Tag>
          )}
        </Flex>
      )}
      <Flex
        className={cn(
          "text-text300 mb-6 flex-wrap gap-4 text-sm",
          hasTopRow && "-mt-4"
        )}
      >
        {author && (
          <div>
            <Emoji className="me-2 text-sm" text=":writing_hand:" />
            {author}
          </div>
        )}
        {team && (
          <div>
            <Emoji className="me-2 text-sm" text=":office_building:" />
            {team}
          </div>
        )}
        {hasSource && (
          <div>
            <Emoji className="me-2 text-sm" text=":books:" />
            <InlineLink href={frontmatter.sourceUrl}>
              {frontmatter.source}
            </InlineLink>
          </div>
        )}
        {published && (
          <div>
            <Emoji className="me-2 text-sm" text=":calendar:" />{" "}
            {getLocaleTimestamp(locale! as Lang, published)}
          </div>
        )}
        <div>
          <Emoji className="me-2 text-sm" text=":stopwatch:" />
          {timeToRead} {t("comp-tutorial-metadata-minute-read")}
        </div>
      </Flex>
      {address && (
        <Flex className="text-text300 -mt-4 mb-6 flex-wrap text-sm">
          <CopyToClipboard text={address}>
            {(isCopied) => (
              <div className="cursor-pointer overflow-hidden bg-background-highlight px-1 font-mono text-sm text-ellipsis text-primary hover:bg-primary-hover hover:text-body-inverse">
                <span className="uppercase">
                  <Translation id="page-developers-tutorials:comp-tutorial-metadata-tip-author" />
                </span>{" "}
                {address} {isCopied && <Translation id="copied" />}{" "}
                {isCopied && (
                  <Emoji className="text-sm" text=":white_check_mark:" />
                )}
              </div>
            )}
          </CopyToClipboard>
        </Flex>
      )}
    </Flex>
  )
}

export default TutorialMetadata
