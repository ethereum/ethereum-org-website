import { ExternalLink } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import type { ITutorial, Lang, TranslationKey } from "@/lib/types"

import Emoji from "@/components/Emoji"
import TutorialTags from "@/components/TutorialTags"
import { Flex } from "@/components/ui/flex"
import { BaseLink } from "@/components/ui/Link"
import { Tag } from "@/components/ui/tag"

import { getLocaleTimestamp } from "@/lib/utils/time"

const SKILL_STATUS = {
  beginner: "tag-green",
  intermediate: "tag-yellow",
  advanced: "tag-red",
} as const

const TutorialCard = ({ tutorial }: { tutorial: ITutorial }) => {
  const t = useTranslations("page-developers-tutorials")
  const locale = useLocale()
  const published =
    tutorial.published && getLocaleTimestamp(locale as Lang, tutorial.published)

  return (
    <BaseLink
      href={tutorial.href}
      className="flow block border-b px-page py-8 no-underline duration-100 hover:bg-background-highlight"
      hideArrow
    >
      <Flex className="items-start justify-between gap-4 max-md:flex-col">
        <h3 className="relative me-0 text-2xl text-body md:me-24">
          {tutorial.title}
          {tutorial.isExternal && (
            <ExternalLink className="ms-[0.25em] mb-[0.25em] inline-block size-[0.875em]" />
          )}
        </h3>
        {tutorial.skill && (
          <Tag
            variant="outline"
            status={SKILL_STATUS[tutorial.skill] ?? "normal"}
          >
            {t(`page-tutorial-${tutorial.skill}` as TranslationKey)}
          </Tag>
        )}
      </Flex>
      <p className="text-body-medium uppercase">
        <Emoji text=":writing_hand:" className="me-2 text-sm" />
        {tutorial.author}
        {published && published !== "Invalid Date" && (
          <>
            {" "}
            •<Emoji text=":calendar:" className="mx-2 text-sm" />
            {published}
          </>
        )}
        {tutorial.timeToRead && (
          <>
            {" "}
            •<Emoji text=":stopwatch:" className="mx-2 text-sm" />
            {tutorial.timeToRead} {t("page-tutorial-read-time")}
          </>
        )}
        {tutorial.isExternal && (
          <>
            {" "}
            •<Emoji text=":link:" className="mx-2 text-sm" />
            <span className="cursor-pointer text-primary">
              {t("page-tutorial-external-link")}
            </span>
          </>
        )}
      </p>
      <p className="text-body-medium">{tutorial.description}</p>
      <Flex className="flex-wrap gap-2">
        <TutorialTags tags={tutorial.tags ?? []} />
      </Flex>
    </BaseLink>
  )
}

export default TutorialCard
