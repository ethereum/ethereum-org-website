"use client"

import { useEffect, useState } from "react"
import { Flame, Zap } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog-modal"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import { getActiveStreak, isStreakExtendedToday } from "./streak"
import { statChip as chip } from "./theme"
import { useCourseProgress } from "./useCourseProgress"

/**
 * Compact streak and XP for page headers. The flame stays grey until today's
 * lesson is done; the big streak moment lives on the lesson-complete screen.
 */
export const ProgressChips = ({ className }: { className?: string }) => {
  const t = useTranslations("page-courses")
  const locale = useLocale()
  const { progress } = useCourseProgress()
  // Progress loads from localStorage after mount; hide the initial zeros
  const [ready, setReady] = useState(false)
  useEffect(() => setReady(true), [])

  const format = numberFormat(locale).format
  const streak = getActiveStreak(progress.streak)
  const safe = isStreakExtendedToday(progress.streak)
  const pending = t("page-courses-stats-streak-pending")

  return (
    <ul
      aria-label={t("page-courses-stats-title")}
      className={cn(
        "m-0 flex list-none items-center gap-2 transition-opacity",
        !ready && "opacity-0",
        className
      )}
    >
      <li className={chip} title={safe ? undefined : pending}>
        <Flame
          aria-hidden
          className={cn(
            "size-5",
            safe
              ? "fill-orange-500 text-orange-700 dark:text-orange-400"
              : "text-disabled"
          )}
        />
        <span
          className={
            safe ? "text-orange-700 dark:text-orange-400" : "text-body-medium"
          }
        >
          {format(streak)}
        </span>
        <span className="sr-only">
          {t("page-courses-stats-streak")}
          {!safe && `. ${pending}`}
        </span>
      </li>
      <li className={chip}>
        <Zap
          aria-hidden
          className="size-5 fill-yellow-400 text-yellow-700 dark:text-yellow-400"
        />
        <span>{format(progress.xp)}</span>
        <span className="sr-only">{t("page-courses-stats-xp")}</span>
      </li>
    </ul>
  )
}

/** Clears everything in this browser, after a confirm dialog */
const ResetProgressButton = () => {
  const t = useTranslations("page-courses")
  const { resetProgress } = useCourseProgress()
  return (
    <Dialog variant="stacked">
      <DialogTrigger asChild>
        <Button variant="link" size="sm">
          {t("page-courses-stats-reset")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("page-courses-stats-reset-title")}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {t("page-courses-stats-reset-description")}
        </DialogDescription>
        <DialogFooter className="flex flex-wrap justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline" isSecondary>
              {t("page-courses-stats-reset-cancel")}
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={resetProgress}>
              {t("page-courses-stats-reset")}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

/** Where progress lives, and a way to clear it */
export const ProgressNote = ({ privacy = true }: { privacy?: boolean }) => {
  const t = useTranslations("page-courses")
  const { progress } = useCourseProgress()

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2",
        privacy ? "justify-between" : "justify-end"
      )}
    >
      {privacy && (
        <p className="m-0 text-sm text-body-medium">
          {t("page-courses-stats-privacy")}
        </p>
      )}
      {progress.xp > 0 && <ResetProgressButton />}
    </div>
  )
}
