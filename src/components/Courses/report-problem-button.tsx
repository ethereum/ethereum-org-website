"use client"

import { useId, useState } from "react"
import { Flag } from "lucide-react"
import { useTranslations } from "next-intl"
import * as RadioGroup from "@radix-ui/react-radio-group"

import { Button, ButtonLink } from "@/components/ui/buttons/Button"
import { commonControlClasses } from "@/components/ui/checkbox"
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
import { Label } from "@/components/ui/label"

import { cn } from "@/lib/utils/cn"
import { isTrackingEnabled, trackCustomEvent } from "@/lib/utils/matomo"

import { NOTE_MAX, type ReportContext, reportEventName } from "./report"

const REASONS = ["inaccurate", "question", "answer", "other"] as const
type Reason = (typeof REASONS)[number]

const ISSUE_URL = "https://github.com/ethereum/ethereum-org-website/issues/new"

/**
 * Flag in the lesson footer. A report is an anonymous Matomo event; when
 * tracking is off it can't be sent, so the learner gets a GitHub issue link.
 */
const ReportProblemButton = ({
  className,
  ...props
}: ReportContext & { className?: string }) => {
  const t = useTranslations("page-courses")
  const baseId = useId()
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
          // Not isSecondary: its attribute selector would override the colour
          className={cn(
            "shrink-0 rounded-full px-2 text-body-medium",
            className
          )}
          aria-label={t("page-courses-report-open")}
        >
          <Flag />
        </Button>
      </DialogTrigger>
      <DialogContent>
        {sent ? (
          <>
            <DialogHeader>
              <DialogTitle>
                {sent === "tracked"
                  ? t("page-courses-report-thanks")
                  : t("page-courses-report-blocked-title")}
              </DialogTitle>
            </DialogHeader>
            <DialogDescription>
              {sent === "tracked"
                ? t("page-courses-report-thanks-line")
                : t("page-courses-report-blocked-line")}
            </DialogDescription>
            <DialogFooter className="flex flex-wrap justify-end gap-2">
              <DialogClose asChild>
                <Button
                  variant={sent === "tracked" ? "solid" : "outline"}
                  isSecondary={sent !== "tracked"}
                >
                  {t("page-courses-report-close")}
                </Button>
              </DialogClose>
              {sent === "blocked" && (
                <ButtonLink href={issueHref}>
                  {t("page-courses-report-github")}
                </ButtonLink>
              )}
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{t("page-courses-report-title")}</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              {t("page-courses-report-description")}
            </DialogDescription>
            <div className="flex flex-col gap-3">
              <p id={`${baseId}-reason`} className="m-0 font-bold">
                {t("page-courses-report-reason")}
              </p>
              <RadioGroup.Root
                aria-labelledby={`${baseId}-reason`}
                className="flex flex-col gap-3"
                value={reason}
                onValueChange={(next) => setReason(next as Reason)}
              >
                {REASONS.map((id) => (
                  <div key={id} className="flex items-start gap-2">
                    <RadioGroup.Item
                      id={`${baseId}-${id}`}
                      value={id}
                      className={cn(
                        commonControlClasses,
                        "mt-1 shrink-0 rounded-full"
                      )}
                    >
                      <RadioGroup.Indicator className="grid size-full place-items-center after:size-1.5 after:rounded-full after:bg-background" />
                    </RadioGroup.Item>
                    <Label
                      htmlFor={`${baseId}-${id}`}
                      className="text-md leading-snug font-normal"
                    >
                      {t(`page-courses-report-reason-${id}`)}
                    </Label>
                  </div>
                ))}
              </RadioGroup.Root>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor={`${baseId}-note`} className="text-md font-bold">
                {t("page-courses-report-note")}
              </Label>
              {/* No ui textarea yet; styled to match ui/input */}
              <textarea
                id={`${baseId}-note`}
                value={note}
                maxLength={NOTE_MAX}
                rows={3}
                aria-describedby={`${baseId}-hint`}
                onChange={(event) => setNote(event.target.value)}
                className="resize-y rounded border border-body bg-background p-2 placeholder:text-disabled hover:not-disabled:border-primary-hover focus-visible:outline focus-visible:outline-[3px] focus-visible:-outline-offset-2 focus-visible:outline-primary-hover"
              />
              <p id={`${baseId}-hint`} className="m-0 text-sm text-body-medium">
                {t("page-courses-report-note-hint")}
              </p>
            </div>
            <DialogFooter className="flex flex-wrap justify-end gap-2">
              <DialogClose asChild>
                <Button variant="outline" isSecondary>
                  {t("page-courses-report-cancel")}
                </Button>
              </DialogClose>
              <Button disabled={!reason} onClick={send}>
                {t("page-courses-report-send")}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ReportProblemButton
