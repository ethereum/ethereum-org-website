"use client"

import { useMemo, useState } from "react"
import { Search, Timer, X } from "lucide-react"
import { useTranslations } from "next-intl"

import type { VideoCardData } from "@/lib/types"

import { Image } from "@/components/Image"
import { Button } from "@/components/ui/buttons/Button"
import {
  Card,
  CardBanner,
  CardContent,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import Input from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tag, TagButton } from "@/components/ui/tag"

import { getVideosByCategory } from "../utils"

type SortOrder = "newest" | "oldest" | "az"

type Category = {
  key: string
  labelKey: string
  tags: readonly string[]
}

interface VideoGalleryFilterProps {
  videos: VideoCardData[]
  categories: readonly Category[]
}

const VideoGalleryFilter = ({
  videos,
  categories,
}: VideoGalleryFilterProps) => {
  const t = useTranslations("page-videos")

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest")

  // Compute video counts per category (from the full, unfiltered list)
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const category of categories) {
      counts[category.key] = getVideosByCategory(videos, [
        ...category.tags,
      ]).length
    }
    return counts
  }, [videos, categories])

  // Filter by category
  const categoryFiltered = useMemo(() => {
    if (!selectedCategory) return videos

    const category = categories.find((c) => c.key === selectedCategory)
    if (!category) return videos

    return getVideosByCategory(videos, [...category.tags])
  }, [videos, categories, selectedCategory])

  // Filter by search query
  const searchFiltered = useMemo(() => {
    if (!searchQuery.trim()) return categoryFiltered

    const query = searchQuery.toLowerCase().trim()
    return categoryFiltered.filter((video) => {
      const titleMatch = video.title.toLowerCase().includes(query)
      const descMatch = video.description.toLowerCase().includes(query)
      const topicMatch = video.topic.join(" ").toLowerCase().includes(query)
      return titleMatch || descMatch || topicMatch
    })
  }, [categoryFiltered, searchQuery])

  // Sort
  const sortedVideos = useMemo(() => {
    const sorted = [...searchFiltered]
    switch (sortOrder) {
      case "newest":
        return sorted.sort((a, b) =>
          b.uploadDate > a.uploadDate ? 1 : b.uploadDate < a.uploadDate ? -1 : 0
        )
      case "oldest":
        return sorted.sort((a, b) =>
          a.uploadDate > b.uploadDate ? 1 : a.uploadDate < b.uploadDate ? -1 : 0
        )
      case "az":
        return sorted.sort((a, b) => a.title.localeCompare(b.title))
      default:
        return sorted
    }
  }, [searchFiltered, sortOrder])

  const hasActiveFilters =
    selectedCategory !== null ||
    searchQuery.trim() !== "" ||
    sortOrder !== "newest"

  const handleClearAll = () => {
    setSelectedCategory(null)
    setSearchQuery("")
    setSortOrder("newest")
  }

  const handleCategoryClick = (key: string) => {
    setSelectedCategory((prev) => (prev === key ? null : key))
  }

  const getCategoryLabel = (key: string): string => {
    const category = categories.find((c) => c.key === key)
    if (!category) return key
    return t(category.labelKey)
  }

  return (
    <div className="space-y-6">
      {/* Toolbar: Category pills + Search + Sort */}
      <div className="space-y-4">
        {/* Category filter pills */}
        <div className="flex flex-wrap gap-2">
          <TagButton
            variant={selectedCategory === null ? "solid" : "outline"}
            status={selectedCategory === null ? "tag" : "normal"}
            className="justify-center"
            onClick={() => setSelectedCategory(null)}
          >
            {t("page-videos-category-all")} ({videos.length})
          </TagButton>
          {categories.map((category) => {
            const isActive = selectedCategory === category.key
            return (
              <TagButton
                key={category.key}
                variant={isActive ? "solid" : "outline"}
                status={isActive ? "tag" : "normal"}
                className="justify-center"
                onClick={() => handleCategoryClick(category.key)}
              >
                {t(category.labelKey)} ({categoryCounts[category.key] ?? 0})
              </TagButton>
            )
          })}
        </div>

        {/* Search + Sort row */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {/* Search input */}
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-body-medium" />
            <Input
              type="text"
              placeholder={t("page-videos-search-placeholder")}
              aria-label={t("page-videos-search-placeholder")}
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

          {/* Sort dropdown */}
          <Select
            value={sortOrder}
            onValueChange={(value) => setSortOrder(value as SortOrder)}
          >
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">
                {t("page-videos-sort-newest")}
              </SelectItem>
              <SelectItem value="oldest">
                {t("page-videos-sort-oldest")}
              </SelectItem>
              <SelectItem value="az">{t("page-videos-sort-az")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active filter strip */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 border-t border-border pt-4">
          <span className="text-xs text-body-medium">
            {t("page-videos-filtering-by")}
          </span>

          {selectedCategory && (
            <Tag
              status="tag"
              variant="solid"
              className="cursor-pointer gap-1"
              onClick={() => setSelectedCategory(null)}
            >
              {getCategoryLabel(selectedCategory)}
              <X className="size-3" />
            </Tag>
          )}

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

          {sortOrder !== "newest" && (
            <Tag
              status="tag"
              variant="solid"
              className="cursor-pointer gap-1"
              onClick={() => setSortOrder("newest")}
            >
              {sortOrder === "oldest"
                ? t("page-videos-sort-oldest")
                : t("page-videos-sort-az")}
              <X className="size-3" />
            </Tag>
          )}

          <Button
            className="cursor-pointer p-0 text-xs text-primary underline"
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
          >
            {t("page-videos-filter-clear-all")}
          </Button>
        </div>
      )}

      {/* Filtered video grid */}
      {sortedVideos.length === 0 ? (
        <div className="p-12 text-center">
          <p className="text-body-medium">{t("page-videos-no-results")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {sortedVideos.map((video) => (
            <Card key={video.slug} href={`/videos/${video.slug}/`}>
              <CardBanner className="aspect-video h-auto">
                <Image
                  src={video.thumbnailUrl}
                  alt={video.title}
                  width={480}
                  height={270}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />
              </CardBanner>
              <CardContent>
                <CardTitle className="text-lg">{video.title}</CardTitle>
                <CardParagraph
                  variant="light"
                  size="sm"
                  className="line-clamp-2"
                >
                  {video.description}
                </CardParagraph>
                <CardParagraph
                  variant="light"
                  size="sm"
                  className="inline-flex items-center gap-1"
                >
                  <Timer className="mb-px size-[1em]" />
                  {video.duration}
                </CardParagraph>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default VideoGalleryFilter
