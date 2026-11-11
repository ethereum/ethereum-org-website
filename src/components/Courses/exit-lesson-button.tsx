"use client"

import { DoorOpen, X } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button, ButtonLink } from "@/components/ui/buttons/Button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog-modal"

import { cn } from "@/lib/utils/cn"

import { chunkyButton, lessonThemeStyle } from "./theme"

interface ExitLessonButtonProps {
  href: string
  /** Confirm first when leaving would throw away answers */
  confirm: boolean
  /** Runs as the learner actually leaves */
  onLeave?: () => void
}

const triggerClasses = "shrink-0 rounded-full px-2 text-body-medium"

const ExitLessonButton = ({
  href,
  confirm,
  onLeave,
}: ExitLessonButtonProps) => {
  const t = useTranslations("page-courses")
  const label = t("page-courses-exit-lesson")

  if (!confirm) {
    return (
      <ButtonLink
        href={href}
        onClick={onLeave}
        variant="ghost"
        isSecondary
        hideArrow
        className={triggerClasses}
        aria-label={label}
      >
        <X />
      </ButtonLink>
    )
  }

  return (
    <Dialog variant="stacked">
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          isSecondary
          className={triggerClasses}
          aria-label={label}
        >
          <X />
        </Button>
      </DialogTrigger>
      <DialogContent
        style={lessonThemeStyle()}
        className="max-w-md justify-items-center p-6 text-center md:p-8"
      >
        <DialogHeader className="w-full items-center gap-4">
          <div className="grid size-20 place-items-center rounded-full bg-(--course-soft) text-(--course-strong) dark:text-(--course-bright)">
            <DoorOpen className="size-10" aria-hidden />
          </div>
          <DialogTitle className="m-0 text-h3 font-black">
            {t("page-courses-exit-title")}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="m-0 text-lg text-body-medium">
          {t("page-courses-exit-description")}
        </DialogDescription>
        <div className="mt-2 flex w-full flex-col gap-3">
          <DialogClose asChild>
            <Button variant="ghost" className={cn(chunkyButton, "w-full")}>
              {t("page-courses-exit-stay")}
            </Button>
          </DialogClose>
          <ButtonLink
            href={href}
            onClick={onLeave}
            variant="ghost"
            hideArrow
            className="min-h-12 w-full rounded-2xl font-bold tracking-wide text-error uppercase dark:text-red-400 hover-link:bg-error-light hover-link:!text-error dark:hover-link:bg-error-dark dark:hover-link:!text-red-400"
          >
            {t("page-courses-exit-leave")}
          </ButtonLink>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ExitLessonButton
