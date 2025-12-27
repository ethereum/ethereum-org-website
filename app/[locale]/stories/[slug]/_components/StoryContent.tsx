"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"

import type { HumanityStory, Lang } from "@/lib/types"

import { Button } from "@/components/ui/buttons/Button"

interface StoryContentProps {
  story: HumanityStory
  locale: Lang
}

const StoryContent = ({ story }: StoryContentProps) => {
  const t = useTranslations("page-stories")
  const [showOriginal, setShowOriginal] = useState(false)

  const hasOriginal = !!story.storyOriginal

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {hasOriginal && (
        <div className="mb-4 flex items-center gap-4">
          <p className="m-0 text-sm text-body-medium">
            {showOriginal
              ? t("page-stories-original-language")
              : t("page-stories-english-translation")}
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowOriginal(!showOriginal)}
            className="text-sm"
          >
            {showOriginal
              ? t("page-stories-show-english")
              : t("page-stories-show-original")}
          </Button>
        </div>
      )}

      <div className="whitespace-pre-wrap text-lg leading-relaxed">
        {showOriginal && story.storyOriginal
          ? story.storyOriginal
          : story.storyEnglish}
      </div>
    </div>
  )
}

export default StoryContent
