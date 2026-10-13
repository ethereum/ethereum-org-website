"use client"

import { useEffect, useRef, useState } from "react"
import { useLocale } from "next-intl"

import type { PrivacyLessonDossierEntry } from "@/lib/types"

import { Button } from "@/components/ui/buttons/Button"
import {
  Sheet,
  SheetContent,
  SheetDismiss,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Tag } from "@/components/ui/tag"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import { catalogue, witnesses } from "@/data/privacy-lesson/catalogue"
import { fixes } from "@/data/privacy-lesson/fixes"
import { persona } from "@/data/privacy-lesson/persona"

import {
  deriveLesson,
  type DossierStatus,
  type LessonState,
  useLesson,
} from "./lesson-provider"
import { useLessonTranslations } from "./use-lesson-translations"

const statusDot: Record<DossierStatus, string> = {
  known: "bg-leak",
  hidden: "bg-primary",
  unknown: "border border-body-medium",
}

const DossierItem = ({
  entry,
  status,
}: {
  entry: PrivacyLessonDossierEntry
  status: DossierStatus
}) => {
  const t = useLessonTranslations()
  // Only the friend entry takes a value in its label; extra values are ignored
  const vars = { friend: persona.friend }

  return (
    <li className="flex items-start gap-x-3 py-1.5">
      <span
        aria-hidden
        className={cn(
          "mt-1.5 size-2.5 shrink-0 rounded-full",
          statusDot[status]
        )}
      />
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "font-semibold",
            status === "unknown" && "font-normal text-body-medium",
            status === "hidden" && "text-primary-high-contrast"
          )}
        >
          {t(entry.labelKey, vars)}
        </p>
        <p
          className={cn(
            "text-sm text-body-medium",
            status === "hidden" && "text-primary"
          )}
        >
          {status === "known" && t(entry.seenByKey, vars)}
          {status === "hidden" && t("dossier-redacted-aria")}
          {status === "unknown" && t("fixes-legend-unknown")}
        </p>
      </div>
      {status !== "unknown" && (
        <Tag
          size="small"
          status="normal"
          variant="outline"
          className="shrink-0"
        >
          <span aria-hidden>
            {t(
              entry.source === "live"
                ? "dossier-tag-live"
                : "dossier-tag-example"
            )}
          </span>
          <span className="sr-only">
            {t(
              entry.source === "live"
                ? "dossier-tag-live-aria"
                : "dossier-tag-example-aria"
            )}
          </span>
        </Tag>
      )}
    </li>
  )
}

const ResetControl = ({ onReset }: { onReset: () => void }) => {
  const t = useLessonTranslations()
  const [confirming, setConfirming] = useState(false)
  const cancelRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const wasConfirming = useRef(false)

  // Move focus into the confirmation, and back to the trigger when it closes
  useEffect(() => {
    if (confirming) cancelRef.current?.focus()
    else if (wasConfirming.current) triggerRef.current?.focus()
    wasConfirming.current = confirming
  }, [confirming])

  if (!confirming) {
    return (
      <Button
        ref={triggerRef}
        variant="outline"
        isSecondary
        size="sm"
        onClick={() => setConfirming(true)}
      >
        {t("dossier-reset")}
      </Button>
    )
  }

  return (
    <div
      role="group"
      aria-labelledby="dossier-reset-title"
      className="space-y-2 rounded-base border p-4"
    >
      <p id="dossier-reset-title" className="font-bold">
        {t("dossier-reset-confirm-title")}
      </p>
      <p className="text-sm">{t("dossier-reset-confirm-body")}</p>
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          onClick={() => {
            onReset()
            setConfirming(false)
          }}
        >
          {t("dossier-reset-confirm-yes")}
        </Button>
        <Button
          ref={cancelRef}
          size="sm"
          variant="ghost"
          isSecondary
          onClick={() => setConfirming(false)}
        >
          {t("dossier-reset-confirm-cancel")}
        </Button>
      </div>
    </div>
  )
}

export interface DossierRailProps {
  state: LessonState
  onReset: () => void
  /** Hide the heading when a container (e.g. the sheet) already titles it */
  hideTitle?: boolean
  className?: string
}

/** The "What they know" dossier. Presentational: pass the lesson state in. */
export const DossierRail = ({
  state,
  onReset,
  hideTitle,
  className,
}: DossierRailProps) => {
  const t = useLessonTranslations()
  const locale = useLocale()
  const {
    statusOf,
    visibleShare,
    hiddenShare,
    knownCount,
    hiddenCount,
    activeFixes,
  } = deriveLesson(state)

  const percent = numberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 0,
  }).format(visibleShare)

  return (
    <div className={cn("space-y-6", className)}>
      <div className="space-y-2">
        {!hideTitle && <h2 className="text-h4">{t("dossier-title")}</h2>}
        <p className="text-sm text-body-medium">{t("dossier-intro")}</p>
      </div>

      <div className="space-y-2">
        <p aria-live="polite" className="font-bold text-leak-high-contrast">
          {t("dossier-meter-visible", { percent })}
        </p>
        {/* Flex keeps the fill starting at the inline start, so it reads correctly in RTL */}
        <div
          aria-hidden
          className="flex h-2.5 overflow-hidden rounded-full bg-background-medium"
        >
          <div
            className="bg-leak motion-safe:transition-[flex-basis] motion-safe:duration-500"
            style={{ flexBasis: `${visibleShare * 100}%` }}
          />
          <div
            className="bg-primary motion-safe:transition-[flex-basis] motion-safe:duration-500"
            style={{ flexBasis: `${hiddenShare * 100}%` }}
          />
        </div>
        <p className="flex flex-wrap gap-x-4 text-sm text-body-medium">
          <span>{t("dossier-meter-known", { count: knownCount })}</span>
          <span>{t("dossier-meter-hidden", { count: hiddenCount })}</span>
        </p>
        <p className="text-sm text-body-medium">
          {activeFixes.length
            ? t("dossier-fixes-count", {
                count: activeFixes.length,
                total: fixes.length,
              })
            : t("dossier-fixes-none")}
        </p>
      </div>

      {state.collected.length === 0 && (
        <p className="rounded-base bg-background-highlight p-4 text-sm">
          {t("dossier-empty")}
        </p>
      )}

      {witnesses.map((witness) => {
        const entries = catalogue.filter((entry) => entry.witness === witness)
        return (
          <section key={witness} aria-labelledby={`dossier-group-${witness}`}>
            <h3
              id={`dossier-group-${witness}`}
              className="mb-1 text-sm font-bold text-body-medium"
            >
              {t(`dossier-group-${witness}`)}
            </h3>
            <ul className="m-0 list-none">
              {entries.map((entry) => (
                <DossierItem
                  key={entry.id}
                  entry={entry}
                  status={statusOf(entry.id)}
                />
              ))}
            </ul>
          </section>
        )
      })}

      <ResetControl onReset={onReset} />
    </div>
  )
}

/** Desktop: the sticky right-hand rail, fed by the lesson state. */
export const DossierAside = ({ className }: { className?: string }) => {
  const t = useLessonTranslations()
  const { collected, fixesOn, privateMode, reset } = useLesson()

  return (
    <aside
      aria-label={t("dossier-aria")}
      // Same sticky pattern as TableOfContents (variant="card"), offset to
      // clear the lesson bar that sticks under the site header
      className={cn(
        "sticky top-36 h-fit max-h-[calc(100vh-10rem)] w-80 shrink-0 self-start overflow-y-auto rounded-base border bg-background p-6 max-lg:hidden",
        className
      )}
    >
      <DossierRail
        state={{ collected, fixesOn, privateMode }}
        onReset={reset}
      />
    </aside>
  )
}

/** Below lg: a button in the lesson bar that opens the dossier in a bottom sheet. */
export const DossierSheet = () => {
  const t = useLessonTranslations()
  const locale = useLocale()
  const { collected, fixesOn, privateMode, reset, knownCount } = useLesson()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="lg:hidden"
          aria-label={t("dossier-open-button-aria", { count: knownCount })}
        >
          <span>{t("dossier-open-button")}</span>
          <span
            aria-hidden
            className="min-w-6 rounded-full bg-leak px-1.5 text-center text-body-inverse"
          >
            {numberFormat(locale).format(knownCount)}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        aria-describedby={undefined}
        className="max-h-[85vh] overflow-y-auto rounded-t-base px-page pt-4 pb-page"
      >
        <SheetHeader className="flex-row items-center justify-between space-y-0 text-start sm:text-start">
          <SheetTitle className="text-h4 font-bold text-body">
            {t("dossier-title")}
          </SheetTitle>
          <SheetDismiss>
            <Button variant="ghost" isSecondary size="sm">
              {t("dossier-close")}
            </Button>
          </SheetDismiss>
        </SheetHeader>
        <DossierRail
          hideTitle
          className="mt-4"
          state={{ collected, fixesOn, privateMode }}
          onReset={reset}
        />
      </SheetContent>
    </Sheet>
  )
}
