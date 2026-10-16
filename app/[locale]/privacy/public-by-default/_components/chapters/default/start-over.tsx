"use client"

import { useEffect, useRef, useState } from "react"

import { Button } from "@/components/ui/buttons/Button"

import { useLesson } from "../../lesson-provider"
import { useLessonTranslations } from "../../use-lesson-translations"

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"

/** Clears the reader's dossier, fixes and progress, then returns to chapter 0 */
const StartOver = () => {
  const t = useLessonTranslations()
  const { reset } = useLesson()
  const { prefersReducedMotion } = usePrefersReducedMotion()
  const [confirming, setConfirming] = useState(false)
  const cancelRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const wasConfirming = useRef(false)

  useEffect(() => {
    if (confirming) cancelRef.current?.focus()
    else if (wasConfirming.current) triggerRef.current?.focus()
    wasConfirming.current = confirming
  }, [confirming])

  return (
    <div className="space-y-3">
      <p className="text-sm text-body-medium">{t("default-start-over-note")}</p>
      {confirming ? (
        <div
          role="group"
          aria-labelledby="default-start-over-confirm"
          className="space-y-3 rounded-base border p-4"
        >
          <p id="default-start-over-confirm" className="font-semibold">
            {t("default-start-over-confirm")}
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              onClick={() => {
                reset()
                setConfirming(false)
                wasConfirming.current = false
                document.getElementById("send")?.scrollIntoView({
                  behavior: prefersReducedMotion ? "auto" : "smooth",
                  block: "start",
                })
              }}
            >
              {t("default-start-over-confirm-yes")}
            </Button>
            <Button
              ref={cancelRef}
              size="sm"
              variant="ghost"
              isSecondary
              onClick={() => setConfirming(false)}
            >
              {t("default-start-over-confirm-cancel")}
            </Button>
          </div>
        </div>
      ) : (
        <Button
          ref={triggerRef}
          variant="outline"
          isSecondary
          onClick={() => setConfirming(true)}
        >
          {t("default-start-over-button")}
        </Button>
      )}
    </div>
  )
}

export default StartOver
