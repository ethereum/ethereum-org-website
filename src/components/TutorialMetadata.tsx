import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { Badge } from "@chakra-ui/react"

import type { Lang, TranslationKey } from "@/lib/types"
import { TutorialFrontmatter } from "@/lib/interfaces"

import CopyToClipboard from "@/components/CopyToClipboard"
import Emoji from "@/components/Emoji"
import InlineLink from "@/components/Link"
import Translation from "@/components/Translation"
import TutorialTags from "@/components/TutorialTags"

import { getLocaleTimestamp } from "@/lib/utils/time"

import { Flex } from "./ui/flex"

export type TutorialMetadataProps = {
  frontmatter: TutorialFrontmatter
  timeToRead: number
}

export enum Skill {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
}

export const getSkillTranslationId = (skill: Skill): TranslationKey =>
  `page-developers-tutorials:page-tutorial-${
    Skill[skill.toUpperCase() as keyof typeof Skill]
  }`

const TutorialMetadata = ({
  frontmatter,
  timeToRead,
}: TutorialMetadataProps) => {
  const { locale } = useRouter()
  const { t } = useTranslation("page-developers-tutorials")

  const hasSource = frontmatter.source && frontmatter.sourceUrl
  const published = frontmatter.published
  const author = frontmatter.author
  const address = frontmatter.address

  return (
    <Flex className="flex-col justify-between border-b-0 border-border pb-2 lg:border-b">
      <Flex className="mb-8 w-full items-center justify-between">
        <Flex className="w-full flex-wrap">
          <TutorialTags tags={frontmatter.tags} />
        </Flex>
        <Badge
          variant="secondary"
          className="mb-2 self-start whitespace-nowrap"
        >
          {t(getSkillTranslationId(frontmatter.skill as Skill))}
        </Badge>
      </Flex>
      <Flex className="text-text300 mb-6 mt-[-1rem] flex-wrap gap-4 text-sm">
        {author && (
          <div>
            <Emoji className="me-2 text-sm" text=":writing_hand:" />
            {author}
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
          {timeToRead} {t("comp-tutorial-metadata-minute-read")} minute read
        </div>
      </Flex>
      {address && (
        <Flex className="text-text300 -mt-4 mb-6 flex-wrap text-sm">
          <CopyToClipboard text={address}>
            {(isCopied) => (
              <div className="cursor-pointer overflow-hidden text-ellipsis bg-background-highlight px-1 font-mono text-sm text-primary hover:bg-primary-hover hover:text-body-inverse">
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
