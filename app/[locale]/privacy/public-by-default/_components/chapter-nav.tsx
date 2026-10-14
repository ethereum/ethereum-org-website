"use client"

import { useEffect, useState } from "react"
import { List } from "lucide-react"
import { useLocale } from "next-intl"

import type { PrivacyLessonPart } from "@/lib/types"

import { trackPrivacyLessonEvent } from "@/components/PrivacyWidgets/shared/track"
import { Button } from "@/components/ui/buttons/Button"
import Link from "@/components/ui/Link"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import { chapters } from "@/data/privacy-lesson/chapters"

import { DossierSheet } from "./dossier-rail"
import { useLessonTranslations } from "./use-lesson-translations"

import { useActiveHash } from "@/hooks/useActiveHash"

const PART_KEYS: Record<PrivacyLessonPart, string> = {
  start: "nav-part-start",
  "part-1": "nav-part-1",
  "part-2": "nav-part-2",
}

const CHAPTER_IDS = chapters.map(({ id }) => id)

/** How far the reader is through the lesson element, 0-1. */
const useReadingProgress = (targetId: string) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const target = document.getElementById(targetId)
    if (!target) return

    let frame = 0
    const update = () => {
      frame = 0
      const { top, height } = target.getBoundingClientRect()
      const scrollable = height - window.innerHeight
      const value = scrollable > 0 ? -top / scrollable : top <= 0 ? 1 : 0
      setProgress(Math.min(1, Math.max(0, value)))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [targetId])

  return progress
}

/**
 * Sticky lesson bar under the site header: chapter menu, current chapter,
 * reading progress and (below lg) the button that opens the dossier.
 */
const ChapterNav = ({ lessonId }: { lessonId: string }) => {
  const t = useLessonTranslations()
  const locale = useLocale()
  const [open, setOpen] = useState(false)
  const activeHash = useActiveHash(CHAPTER_IDS, "0% 0% -60% 0%")
  const progress = useReadingProgress(lessonId)

  const formatNumber = numberFormat(locale, { minimumIntegerDigits: 2 })
  const active =
    chapters.find(({ id }) => `#${id}` === activeHash) ?? chapters[0]

  return (
    <div className="sticky top-19 z-dropdown -mx-page border-b bg-background">
      <nav
        aria-label={t("nav-chapter-nav-aria")}
        className="flex items-center gap-3 px-page py-2"
      >
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              isSecondary
              size="sm"
              aria-label={t("nav-menu-button-aria")}
              className="min-w-0 flex-1 justify-start text-start lg:flex-none"
            >
              <List aria-hidden />
              <span className="font-mono text-body-medium">
                {formatNumber.format(active.number)}
              </span>
              <span className="truncate">{t(`${active.id}-title`)}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="max-h-[70vh] w-auto max-w-[min(32rem,calc(100vw-2rem))] overflow-y-auto p-4"
          >
            <nav aria-label={t("nav-menu-aria")}>
              {(Object.keys(PART_KEYS) as PrivacyLessonPart[]).map((part) => (
                <div key={part} className="not-first:mt-3">
                  <p className="mb-1 text-xs font-bold text-body-medium uppercase">
                    {t(PART_KEYS[part])}
                  </p>
                  <ol className="m-0 list-none">
                    {chapters
                      .filter((chapter) => chapter.part === part)
                      .map(({ id, number }) => (
                        <li key={id}>
                          <Link
                            href={`#${id}`}
                            onClick={() => {
                              setOpen(false)
                              trackPrivacyLessonEvent("chapter-viewed", id)
                            }}
                            aria-current={
                              active.id === id ? "location" : undefined
                            }
                            className={cn(
                              "flex gap-3 rounded-sm px-2 py-1.5 text-body no-underline hover:bg-background-highlight",
                              active.id === id && "text-primary"
                            )}
                          >
                            <span className="font-mono text-body-medium">
                              {formatNumber.format(number)}
                            </span>
                            <span>{t(`${id}-title`)}</span>
                          </Link>
                        </li>
                      ))}
                  </ol>
                </div>
              ))}
            </nav>
          </PopoverContent>
        </Popover>

        <div className="ms-auto">
          <DossierSheet />
        </div>
      </nav>

      <div
        role="progressbar"
        aria-label={t("nav-progress-aria")}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
        className="flex h-1 bg-background-medium"
      >
        <div className="bg-leak" style={{ flexBasis: `${progress * 100}%` }} />
      </div>
    </div>
  )
}

export default ChapterNav
