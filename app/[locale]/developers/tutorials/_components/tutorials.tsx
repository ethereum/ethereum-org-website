"use client"

import React, { useEffect, useMemo, useState } from "react"
import {
  Code,
  ExternalLink,
  GraduationCap,
  Layers,
  Search,
  Trophy,
  X,
} from "lucide-react"
import { useLocale } from "next-intl"

import { ITutorial, Lang, SectionNavDetails } from "@/lib/types"

import Emoji from "@/components/Emoji"
import Translation from "@/components/Translation"
import { getSkillTranslationId } from "@/components/TutorialMetadata"
import TutorialTags from "@/components/TutorialTags"
import { Button } from "@/components/ui/buttons/Button"
import { Flex } from "@/components/ui/flex"
import Input from "@/components/ui/input"
import { BaseLink } from "@/components/ui/Link"
import TabNav from "@/components/ui/TabNav"
import { Tag } from "@/components/ui/tag"
import TagFilter from "@/components/ui/tag-filter"

import { trackCustomEvent } from "@/lib/utils/matomo"
import { getTagCounts } from "@/lib/utils/tags"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { filterTutorialsByLang } from "@/lib/utils/tutorial"

import externalTutorials from "@/data/externalTutorials.json"

import { DEFAULT_LOCALE } from "@/lib/constants"

import useTranslation from "@/hooks/useTranslation"

const MAX_DEFAULT_TAGS = 12

const published = (locale: string, published: string) => {
  const localeTimestamp = getLocaleTimestamp(locale as Lang, published)

  return localeTimestamp !== "Invalid Date" ? (
    <span>
      <Emoji text=":calendar:" className="ms-2 me-2 text-sm" />
      {localeTimestamp}
    </span>
  ) : null
}

const SKILL_ICONS: Record<string, React.ReactNode> = {
  all: <Layers className="stroke-1" />,
  beginner: <GraduationCap className="stroke-1" />,
  intermediate: <Code className="stroke-1" />,
  advanced: <Trophy className="stroke-1" />,
}

type TutorialsListProps = {
  internalTutorials: ITutorial[]
}

const TutorialsList = ({ internalTutorials }: TutorialsListProps) => {
  const { t } = useTranslation("page-developers-tutorials")
  const locale = useLocale()
  const effectiveLocale = internalTutorials.length > 0 ? locale : DEFAULT_LOCALE
  const filteredTutorialsByLang = useMemo(
    () =>
      filterTutorialsByLang(
        internalTutorials,
        externalTutorials,
        effectiveLocale as Lang
      ),
    [internalTutorials, effectiveLocale]
  )

  // Count-descending tag entries, dropping one-off tags (count <= 1) which add
  // noise to the filter row.
  const eligibleTags = useMemo(
    () =>
      getTagCounts(filteredTutorialsByLang, (tutorial) => tutorial.tags).filter(
        ([, count]) => count > 1
      ),
    [filteredTutorialsByLang]
  )

  // Build skill level sections for TabNav (same pattern as events ContinentTabs)
  const skillSections: SectionNavDetails[] = useMemo(() => {
    const counts: Record<string, number> = {
      all: filteredTutorialsByLang.length,
    }
    filteredTutorialsByLang.forEach((tutorial) => {
      if (tutorial.skill)
        counts[tutorial.skill] = (counts[tutorial.skill] || 0) + 1
    })

    return [
      {
        key: "all",
        label: `${t("page-tutorial-all")} (${counts.all})`,
        icon: SKILL_ICONS.all,
      },
      {
        key: "beginner",
        label: `${t("page-tutorial-beginner")} (${counts.beginner ?? 0})`,
        icon: SKILL_ICONS.beginner,
      },
      {
        key: "intermediate",
        label: `${t("page-tutorial-intermediate")} (${counts.intermediate ?? 0})`,
        icon: SKILL_ICONS.intermediate,
      },
      {
        key: "advanced",
        label: `${t("page-tutorial-advanced")} (${counts.advanced ?? 0})`,
        icon: SKILL_ICONS.advanced,
      },
    ]
  }, [filteredTutorialsByLang, t])

  const [filteredTutorials, setFilteredTutorials] = useState(
    filteredTutorialsByLang
  )
  const [selectedTags, setSelectedTags] = useState<Array<string>>([])
  const [selectedSkill, setSelectedSkill] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Combined filtering: skill + tags + search
  useEffect(() => {
    let tutorials = filteredTutorialsByLang

    // Skill filter
    if (selectedSkill !== "all") {
      tutorials = tutorials.filter(
        (tutorial) => tutorial.skill === selectedSkill
      )
    }

    // Tag filter (AND logic)
    if (selectedTags.length) {
      tutorials = tutorials.filter((tutorial) => {
        return selectedTags.every((tag) => (tutorial.tags || []).includes(tag))
      })
    }

    // Search filter (matches title, description, tags, author)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      tutorials = tutorials.filter((tutorial) => {
        const titleMatch = tutorial.title?.toLowerCase().includes(query)
        const descMatch = tutorial.description?.toLowerCase().includes(query)
        const tagMatch = (tutorial.tags || []).some((tag) =>
          tag.toLowerCase().includes(query)
        )
        const authorMatch = tutorial.author?.toLowerCase().includes(query)
        return titleMatch || descMatch || tagMatch || authorMatch
      })
    }

    setFilteredTutorials(tutorials)
  }, [filteredTutorialsByLang, selectedTags, selectedSkill, searchQuery])

  // Assumes a single-tag delta per call (chip toggle or one active-filter
  // removal) and reports exactly one Matomo event. A multi-tag change (e.g. a
  // future "clear all") would only track the first diff.
  const handleTagsChange = (next: Array<string>) => {
    const added = next.find((tag) => !selectedTags.includes(tag))
    const removed = selectedTags.find((tag) => !next.includes(tag))

    if (added || removed) {
      trackCustomEvent({
        eventCategory: "tutorial tags",
        eventAction: "click",
        eventName: `${added ?? removed} ${added ? "add" : "remove"}`,
      })
    }

    setSelectedTags(next)
  }

  const handleSkillSelect = (key: string) => {
    setSelectedSkill(key)
    trackCustomEvent({
      eventCategory: "tutorial tags",
      eventAction: "click",
      eventName: `skill:${key}`,
    })
  }

  const handleClearAll = () => {
    setSelectedTags([])
    setSelectedSkill("all")
    setSearchQuery("")
    trackCustomEvent({
      eventCategory: "tutorial tags",
      eventAction: "click",
      eventName: "clear",
    })
  }

  const hasActiveFilters =
    selectedTags.length > 0 ||
    selectedSkill !== "all" ||
    searchQuery.trim() !== ""

  return (
    <>
      {/* Skill level TabNav + Search */}
      <div className="flex gap-6 px-page pt-page max-lg:flex-col md:max-lg:w-fit lg:items-center">
        <TabNav
          sections={skillSections}
          activeSection={selectedSkill}
          onSelect={handleSkillSelect}
          useMotion
          motionLayoutId="tutorial-skill-highlight"
          className="w-auto justify-start md:w-fit [&>nav]:mx-0 [&>nav]:w-auto [&>nav]:max-w-none"
          customEventOptions={{
            eventCategory: "tutorial tags",
            eventAction: "click",
          }}
        />
        <div className="relative w-full lg:ms-auto lg:w-44">
          <Search className="pointer-events-none absolute inset-s-3 top-1/2 size-4 -translate-y-1/2 text-body-medium" />
          <Input
            type="text"
            placeholder={t("page-tutorial-search-placeholder")}
            aria-label={t("page-tutorial-search-placeholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full ps-9 text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-e-3 top-1/2 -translate-y-1/2 text-body-medium hover:text-body"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filter controls */}
      <div className="border-b p-page">
        {/* Row 2: Topic tags */}
        <p className="mb-space-half text-xs tracking-wider text-body-medium uppercase">
          <Translation id="page-developers-tutorials:page-tutorial-topics" />
        </p>
        <TagFilter
          tags={eligibleTags}
          value={selectedTags}
          onChange={handleTagsChange}
          defaultVisible={MAX_DEFAULT_TAGS}
        />

        {/* Row 3: Active filters summary (only when filters active) */}
        {hasActiveFilters && (
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t pt-4">
            <span className="text-xs text-body-medium">
              <Translation id="page-developers-tutorials:page-tutorial-filtering-by" />
            </span>

            {selectedSkill !== "all" && (
              <Tag
                status="tag"
                variant="solid"
                className="cursor-pointer gap-1"
                onClick={() => setSelectedSkill("all")}
              >
                {t(`page-tutorial-${selectedSkill}`)}
                <X className="size-3" />
              </Tag>
            )}

            {selectedTags.map((tag) => (
              <Tag
                key={tag}
                status="tag"
                variant="solid"
                className="cursor-pointer gap-1"
                onClick={() =>
                  handleTagsChange(selectedTags.filter((t) => t !== tag))
                }
              >
                {tag}
                <X className="size-3" />
              </Tag>
            ))}

            {searchQuery.trim() && (
              <Tag
                status="accent-a"
                variant="subtle"
                className="cursor-pointer gap-1"
                onClick={() => setSearchQuery("")}
              >
                &ldquo;{searchQuery.trim()}&rdquo;
                <X className="size-3" />
              </Tag>
            )}

            <Button
              className="cursor-pointer p-0 text-xs text-primary underline"
              variant="ghost"
              size="sm"
              onClick={handleClearAll}
            >
              <Translation id="page-developers-tutorials:page-find-wallet-clear" />
            </Button>
          </div>
        )}
      </div>

      {/* Empty state */}
      {filteredTutorials.length === 0 ? (
        <div className="flow px-page py-page-2x text-center">
          <Emoji text=":crying_face:" className="text-6xl" />
          <h2>
            <Translation id="page-developers-tutorials:page-tutorial-tags-error" />
          </h2>
          <p className="text-body-medium">
            <Translation id="page-developers-tutorials:page-find-wallet-try-removing" />
          </p>
        </div>
      ) : (
        <h2 className="sr-only">{t("page-tutorials-available")}</h2>
      )}

      {/* Tutorial cards */}
      {filteredTutorials.map((tutorial) => (
        <BaseLink
          key={tutorial.href}
          href={tutorial.href ?? undefined}
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
                status={
                  tutorial.skill === "beginner"
                    ? "tag-green"
                    : tutorial.skill === "intermediate"
                      ? "tag-yellow"
                      : tutorial.skill === "advanced"
                        ? "tag-red"
                        : "normal"
                }
              >
                <Translation id={getSkillTranslationId(tutorial.skill)} />
              </Tag>
            )}
          </Flex>
          <p className="text-body-medium uppercase">
            <Emoji text=":writing_hand:" className="me-2 text-sm" />
            {tutorial.author}
            {tutorial.published ? (
              <> •{published(locale, tutorial.published!)}</>
            ) : null}
            {tutorial.timeToRead && (
              <>
                {" "}
                •
                <Emoji text=":stopwatch:" className="mx-2 text-sm" />
                {tutorial.timeToRead}{" "}
                <Translation id="page-developers-tutorials:page-tutorial-read-time" />
              </>
            )}
            {tutorial.isExternal && (
              <>
                {" "}
                •<Emoji text=":link:" className="mx-2 text-sm" />
                <span className="cursor-pointer text-primary">
                  <Translation id="page-developers-tutorials:page-tutorial-external-link" />
                </span>
              </>
            )}
          </p>
          <p className="text-body-medium">{tutorial.description}</p>
          <Flex className="flex-wrap gap-2">
            <TutorialTags tags={tutorial.tags ?? []} />
          </Flex>
        </BaseLink>
      ))}
    </>
  )
}

export default TutorialsList
