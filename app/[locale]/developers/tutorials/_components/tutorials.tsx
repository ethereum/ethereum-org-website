"use client"

import React, {
  type ButtonHTMLAttributes,
  forwardRef,
  HTMLAttributes,
  useEffect,
  useMemo,
  useState,
} from "react"
import {
  ChevronDown,
  ChevronUp,
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
import { Flex, FlexProps } from "@/components/ui/flex"
import Input from "@/components/ui/input"
import TabNav from "@/components/ui/TabNav"
import { Tag, TagButton } from "@/components/ui/tag"

import { cn } from "@/lib/utils/cn"
import { trackCustomEvent } from "@/lib/utils/matomo"
import { getLocaleTimestamp } from "@/lib/utils/time"
import {
  filterTutorialsByLang,
  getSortedTutorialTagsForLang,
} from "@/lib/utils/tutorial"

import externalTutorials from "@/data/externalTutorials.json"

import { DEFAULT_LOCALE } from "@/lib/constants"

const MAX_DEFAULT_TAGS = 12

const FilterTag = forwardRef<
  HTMLButtonElement,
  { isActive: boolean; name: string } & ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => {
  const { isActive, name, ...rest } = props
  return (
    <TagButton
      ref={ref}
      variant={isActive ? "solid" : "outline"}
      status={isActive ? "tag" : "normal"}
      className="justify-center"
      {...rest}
    >
      {name}
    </TagButton>
  )
})

FilterTag.displayName = "FilterTag"

const Text = ({ className, ...props }: HTMLAttributes<HTMLHeadElement>) => (
  <p className={cn("mb-6", className)} {...props} />
)

type LinkFlexProps = FlexProps & {
  href: string
}

const LinkFlex = ({ href, children, ...props }: LinkFlexProps) => {
  return (
    <Flex asChild {...props}>
      <a href={href}>{children}</a>
    </Flex>
  )
}

const published = (locale: string, published: string) => {
  const localeTimestamp = getLocaleTimestamp(locale as Lang, published)

  return localeTimestamp !== "Invalid Date" ? (
    <span>
      <Emoji text=":calendar:" className="me-2 ms-2 text-sm" />
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

  const allTags = useMemo(
    () => getSortedTutorialTagsForLang(filteredTutorialsByLang),
    [filteredTutorialsByLang]
  )

  // Build skill level sections for TabNav (same pattern as events ContinentTabs)
  const skillSections: SectionNavDetails[] = useMemo(() => {
    const counts: Record<string, number> = {
      all: filteredTutorialsByLang.length,
    }
    filteredTutorialsByLang.forEach((t) => {
      if (t.skill) counts[t.skill] = (counts[t.skill] || 0) + 1
    })

    return [
      { key: "all", label: `All (${counts.all})`, icon: SKILL_ICONS.all },
      {
        key: "beginner",
        label: `Beginner (${counts.beginner ?? 0})`,
        icon: SKILL_ICONS.beginner,
      },
      {
        key: "intermediate",
        label: `Intermediate (${counts.intermediate ?? 0})`,
        icon: SKILL_ICONS.intermediate,
      },
      {
        key: "advanced",
        label: `Advanced (${counts.advanced ?? 0})`,
        icon: SKILL_ICONS.advanced,
      },
    ]
  }, [filteredTutorialsByLang])

  const [filteredTutorials, setFilteredTutorials] = useState(
    filteredTutorialsByLang
  )
  const [selectedTags, setSelectedTags] = useState<Array<string>>([])
  const [selectedSkill, setSelectedSkill] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showAllTags, setShowAllTags] = useState(false)

  // Split tags into popular (top N by count) and niche (the rest)
  const { popularTags, nicheTags } = useMemo(() => {
    const eligible: Array<[string, number]> = []

    Object.entries(allTags).forEach(([tagName, tagCount]) => {
      const count = tagCount as number
      if (count <= 1) return
      eligible.push([tagName, count])
    })

    // Sort by count descending for visual hierarchy
    eligible.sort((a, b) => b[1] - a[1])

    // Top tags shown by default, rest behind expander
    const popular = eligible.slice(0, MAX_DEFAULT_TAGS)
    const niche = eligible.slice(MAX_DEFAULT_TAGS)

    return { popularTags: popular, nicheTags: niche }
  }, [allTags])

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

  const handleTagSelect = (tagName: string) => {
    const tempSelectedTags = selectedTags

    const index = tempSelectedTags.indexOf(tagName)
    if (index > -1) {
      tempSelectedTags.splice(index, 1)
      trackCustomEvent({
        eventCategory: "tutorial tags",
        eventAction: "click",
        eventName: `${tagName} remove`,
      })
    } else {
      tempSelectedTags.push(tagName)
      trackCustomEvent({
        eventCategory: "tutorial tags",
        eventAction: "click",
        eventName: `${tagName} add`,
      })
    }

    setSelectedTags([...tempSelectedTags])
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

  const visibleTags = showAllTags ? [...popularTags, ...nicheTags] : popularTags

  return (
    <>
      <div className="my-8 w-full max-w-screen-lg shadow-table-box">
        {/* Skill level TabNav + Search */}
        <div className="flex flex-col gap-3 px-8 pt-6 md:max-lg:w-fit lg:flex-row lg:items-center">
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
            <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-body-medium" />
            <Input
              type="text"
              placeholder="Search tutorials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full ps-9 text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute end-3 top-1/2 -translate-y-1/2 text-body-medium hover:text-body"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filter controls */}
        <div className="border-b border-border px-8 pb-6 pt-5">
          {/* Row 2: Topic tags */}
          <div className="mt-5">
            <p className="mb-3 text-xs uppercase tracking-wider text-body-medium">
              Topics
            </p>
            <div className="flex flex-wrap gap-2">
              {visibleTags.map(([tagName, tagCount]) => {
                const isActive = selectedTags.includes(tagName)
                return (
                  <FilterTag
                    key={tagName}
                    onClick={() => handleTagSelect(tagName)}
                    name={`${tagName} (${tagCount})`}
                    isActive={isActive}
                  />
                )
              })}

              {/* Show more / Show less toggle */}
              {nicheTags.length > 0 && (
                <button
                  onClick={() => setShowAllTags(!showAllTags)}
                  className="inline-flex items-center gap-1 rounded-full border border-dashed border-body-medium px-3 py-0.5 text-xs uppercase text-body-medium transition-colors hover:border-primary hover:text-primary"
                >
                  {showAllTags ? (
                    <>
                      Show less <ChevronUp className="size-3" />
                    </>
                  ) : (
                    <>
                      +{nicheTags.length} more{" "}
                      <ChevronDown className="size-3" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Row 3: Active filters summary (only when filters active) */}
          {hasActiveFilters && (
            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
              <span className="text-xs text-body-medium">Filtering by:</span>

              {selectedSkill !== "all" && (
                <Tag
                  status="tag"
                  variant="solid"
                  className="cursor-pointer gap-1"
                  onClick={() => setSelectedSkill("all")}
                >
                  {selectedSkill}
                  <X className="size-3" />
                </Tag>
              )}

              {selectedTags.map((tag) => (
                <Tag
                  key={tag}
                  status="tag"
                  variant="solid"
                  className="cursor-pointer gap-1"
                  onClick={() => handleTagSelect(tag)}
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
        {filteredTutorials.length === 0 && (
          <div className="mt-0 p-12 text-center">
            <Emoji text=":crying_face:" className="my-8 text-5xl" />
            <h2 className="mb-8 mt-12 leading-xs">
              <Translation id="page-developers-tutorials:page-tutorial-tags-error" />
            </h2>
            <Text>
              <Translation id="page-developers-tutorials:page-find-wallet-try-removing" />
            </Text>
          </div>
        )}

        {/* Tutorial cards */}
        {filteredTutorials.map((tutorial) => {
          return (
            <LinkFlex
              className="mb-px w-full flex-col justify-between border-b p-8 text-border no-underline duration-100 hover:bg-background-highlight"
              key={tutorial.href}
              href={tutorial.href ?? undefined}
            >
              <Flex className="mb-8 flex-col items-start justify-between gap-y-4 md:-mb-4 md:flex-row">
                <Text className="relative me-0 text-2xl font-semibold text-body md:me-24">
                  {tutorial.title}
                  {tutorial.isExternal && (
                    <ExternalLink className="mb-[0.25em] ms-[0.25em] inline-block size-[0.875em]" />
                  )}
                </Text>
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
                  <Translation id={getSkillTranslationId(tutorial.skill!)} />
                </Tag>
              </Flex>
              <Text className="mt-6 uppercase text-body-medium">
                <Emoji text=":writing_hand:" className="me-2 text-sm" />
                {tutorial.author}
                {tutorial.published ? (
                  <> •{published(locale!, tutorial.published!)}</>
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
              </Text>
              <Text className="text-body-medium">{tutorial.description}</Text>
              <Flex className="w-full flex-wrap">
                <TutorialTags tags={tutorial.tags ?? []} />
              </Flex>
            </LinkFlex>
          )
        })}
      </div>
    </>
  )
}

export default TutorialsList
