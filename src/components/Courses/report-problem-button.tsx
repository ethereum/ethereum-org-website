"use client"

import { useId, useState } from "react"
import { Flag } from "lucide-react"
import { useTranslations } from "next-intl"
import * as RadioGroup from "@radix-ui/react-radio-group"

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
import { isTrackingEnabled, trackCustomEvent } from "@/lib/utils/matomo"

import { NOTE_MAX, type ReportContext, reportEventName } from "./report"
import {
  chunkyButton,
  chunkyTile,
  lessonThemeStyle,
  pickedMarker,
  pickedTile,
} from "./theme"

const REASONS = ["inaccurate", "question", "answer", "other"] as const
type Reason = (typeof REASONS)[number]

const ISSUE_URL = "https://github.com/ethereum/ethereum-org-website/issues/new"

/**
 * Flag beside the footer's main button. A report is an anonymous Matomo event; when
 * tracking is off it can't be sent, so the learner gets a GitHub issue link.
 */
const ReportProblemButton = (props: ReportContext) => {
  const t = useTranslations("page-courses")
  const noteId = useId()
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState<Reason | "">("")
  const [note, setNote] = useState("")
  const [sent, setSent] = useState<"tracked" | "blocked" | null>(null)

  const reset = () => {
    setReason("")
    setNote("")
    setSent(null)
  }

  const eventName = reportEventName({ ...props, note })

  const send = () => {
    if (!reason) return
    if (!isTrackingEnabled()) return setSent("blocked")
    trackCustomEvent(
      {
        eventCategory: "Courses problem report",
        eventAction: reason,
        eventName,
      },
      { immediate: true }
    )
    setSent("tracked")
  }

  const issueHref = `${ISSUE_URL}?${new URLSearchParams({
    title: `Courses: problem in ${props.courseId}/${props.lessonId}/${props.stepId}`,
    body: `Reason: ${reason}\n\n${eventName}`,
  })}`

  return (
    <Dialog
      variant="stacked"
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (!next) reset()
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          isSecondary
          className="shrink-0 rounded-full px-2 text-body-medium"
          aria-label={t("page-courses-report-open")}
        >
          <Flag />
        </Button>
      </DialogTrigger>
      <DialogContent style={lessonThemeStyle()} className="max-w-md p-6 md:p-8">
        {sent ? (
          <>
            <DialogHeader>
              <DialogTitle className="m-0 text-h3 font-black">
                {sent === "tracked"
                  ? t("page-courses-report-thanks")
                  : t("page-courses-report-blocked-title")}
              </DialogTitle>
            </DialogHeader>
            <DialogDescription className="m-0 text-lg text-body-medium">
              {sent === "tracked"
                ? t("page-courses-report-thanks-line")
                : t("page-courses-report-blocked-line")}
            </DialogDescription>
            <div className="mt-2 flex flex-col gap-3">
              {sent === "blocked" && (
                <ButtonLink
                  href={issueHref}
                  variant="ghost"
                  hideArrow
                  className={cn(chunkyButton, "w-full")}
                >
                  {t("page-courses-report-github")}
                </ButtonLink>
              )}
              <DialogClose asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    sent === "tracked" ? chunkyButton : undefined,
                    "w-full"
                  )}
                >
                  {t("page-courses-report-close")}
                </Button>
              </DialogClose>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="m-0 text-h3 font-black">
                {t("page-courses-report-title")}
              </DialogTitle>
            </DialogHeader>
            <DialogDescription className="m-0 text-body-medium">
              {t("page-courses-report-description")}
            </DialogDescription>
            <RadioGroup.Root
              aria-label={t("page-courses-report-reason")}
              className="flex flex-col gap-2"
              value={reason}
              onValueChange={(next) => setReason(next as Reason)}
            >
              {REASONS.map((id) => (
                <RadioGroup.Item
                  key={id}
                  value={id}
                  className={cn(
                    chunkyTile,
                    pickedTile,
                    "group/option flex w-full items-center gap-3 p-3 text-start focus-visible:outline-4 focus-visible:outline-(--course-soft)"
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "size-5 shrink-0 rounded-full",
                      pickedMarker()
                    )}
                  />
                  {t(`page-courses-report-reason-${id}`)}
                </RadioGroup.Item>
              ))}
            </RadioGroup.Root>
            <div className="flex flex-col gap-1">
              <label htmlFor={noteId} className="font-bold">
                {t("page-courses-report-note")}
              </label>
              <textarea
                id={noteId}
                value={note}
                maxLength={NOTE_MAX}
                rows={3}
                onChange={(event) => setNote(event.target.value)}
                className="resize-y rounded-xl border-2 border-border bg-background p-3 placeholder:text-disabled focus-visible:outline-4 focus-visible:outline-(--course-soft)"
              />
              <span className="text-sm text-body-medium">
                {t("page-courses-report-note-hint")}
              </span>
            </div>
            <div className="mt-2 flex flex-col gap-3">
              <Button
                variant="ghost"
                disabled={!reason}
                onClick={send}
                className={cn(chunkyButton, "w-full")}
              >
                {t("page-courses-report-send")}
              </Button>
              <DialogClose asChild>
                <Button variant="ghost" className="w-full">
                  {t("page-courses-report-cancel")}
                </Button>
              </DialogClose>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ReportProblemButton
