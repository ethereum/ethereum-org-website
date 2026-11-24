"use client"

import { useId, useState } from "react"
import { Flag } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
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

import { requestJson } from "../Account/api"

import {
  NOTE_MAX,
  REPORT_REASONS,
  type ReportContext,
  reportEventName,
  type ReportReason,
} from "@/lib/courses/report"

const ISSUE_URL = "https://github.com/ethereum/ethereum-org-website/issues/new"

/**
 * Flag in the lesson footer. A report is saved, anonymously, to the learner
 * database (and counted in Matomo when tracking is on); if saving fails, the
 * learner gets a GitHub issue link with the details filled in.
 */
const ReportProblemButton = ({
  className,
  ...props
}: ReportContext & { className?: string }) => {
  const t = useTranslations("page-courses")
  const locale = useLocale()
  const baseId = useId()
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState<ReportReason | "">("")
  const [note, setNote] = useState("")
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState<"saved" | "failed" | null>(null)

  const reset = () => {
    setReason("")
    setNote("")
    setSent(null)
  }

  const eventName = reportEventName({ ...props, note })

  const send = async () => {
    if (!reason || sending) return
    setSending(true)
    if (isTrackingEnabled())
      trackCustomEvent(
        {
          eventCategory: "Courses problem report",
          eventAction: reason,
          eventName,
        },
        { immediate: true }
      )
    const { ok } = await requestJson("/api/courses/report", {
      ...props,
      locale,
      reason,
      note,
    })
    setSending(false)
    setSent(ok ? "saved" : "failed")
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
            "shrink-0 rounded-full px-2 text-sm font-bold tracking-wide text-body-medium uppercase md:px-3",
            className
          )}
          aria-label={t("page-courses-report-open")}
        >
          <Flag />
          <span className="max-md:hidden">
            {t("page-courses-report-label")}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        {sent ? (
          <>
            <DialogHeader>
              <DialogTitle>
                {sent === "saved"
                  ? t("page-courses-report-thanks")
                  : t("page-courses-report-failed-title")}
              </DialogTitle>
            </DialogHeader>
            <DialogDescription>
              {sent === "saved"
                ? t("page-courses-report-thanks-line")
                : t("page-courses-report-failed-line")}
            </DialogDescription>
            <DialogFooter className="flex flex-wrap justify-end gap-2">
              <DialogClose asChild>
                <Button
                  variant={sent === "saved" ? "solid" : "outline"}
                  isSecondary={sent !== "saved"}
                >
                  {t("page-courses-report-close")}
                </Button>
              </DialogClose>
              {sent === "failed" && (
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
                onValueChange={(next) => setReason(next as ReportReason)}
              >
                {REPORT_REASONS.map((id) => (
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
              <Button disabled={!reason || sending} onClick={send}>
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
