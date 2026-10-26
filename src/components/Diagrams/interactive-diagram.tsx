"use client"

import { type ReactNode, type Ref, useId, useMemo } from "react"
import { RotateCcw } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import { ChevronNext, ChevronPrev } from "@/components/Chevron"
import { Button } from "@/components/ui/buttons/Button"
import { RadioGroup, RadioGroupSegment } from "@/components/ui/radio-group"

import { cn } from "@/lib/utils/cn"
import { trackCustomEvent } from "@/lib/utils/matomo"
import { numberFormat } from "@/lib/utils/numbers"

import { DiagramStage } from "./anatomy/stage"
import { anatomyFill, type AnatomyHue } from "./anatomy/tokens"
import { useCountUp } from "./anatomy/use-count-up"
import { DiagramFigure } from "./diagram-figure"
import {
  DiagramHoverProvider,
  useDiagramHover,
  useHoverTargets,
} from "./diagram-hover"

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"

/*
 * The shell every interactive diagram uses, so controls and framing sit in
 * the same places everywhere. One card holds the illustration and a panel;
 * from a 640px card width the panel (15rem) sits on the inline-end side,
 * narrower it stacks under the illustration.
 *
 * Illustration column, top to bottom: the figure header ("Fig. N", title, in
 * small caps), the drawing, a status line (the step, or the hovered
 * part's definition) and a legend of the role colours.
 * Panel, top to bottom: presets ("Choose scenario"), transport (primary
 * action, then previous / "Step x of n" / next / reset), caption, readout.
 *
 * Hover and focus are built in (see diagram-hover.tsx). Pass `inViewRef`
 * and `paused` from `useDiagramInView` so animations hold while the diagram
 * is off screen.
 */

export interface DiagramPartText {
  label: ReactNode
  definition: ReactNode
}

export interface DiagramLegendItem {
  hue: AnatomyHue
  label: ReactNode
}

export interface InteractiveDiagramProps {
  /** What the diagram shows, centred under the card as the figcaption. */
  caption: ReactNode
  /** Screen-reader description of the whole figure. */
  description: ReactNode
  /** e.g. "Fig. 2"; omitted when the page does not number its figures. */
  figLabel?: ReactNode
  /** Short title, shown in the figure header. */
  title: ReactNode
  illustration: ReactNode
  /** The status line at rest: what the current step does, in a few words. */
  status: ReactNode
  /** Label and definition per part id, for the status line on hover. */
  parts: Record<string, DiagramPartText>
  legend: DiagramLegendItem[]
  /** A `DiagramPresets`, for diagrams with example values. */
  presets?: ReactNode
  transport: ReactNode
  /** A `DiagramCaption`. */
  stepCaption: ReactNode
  /** A `DiagramReadout`. */
  readout: ReactNode
  inViewRef?: Ref<HTMLDivElement>
  /** Off screen: hold animations still. */
  paused?: boolean
  className?: string
}

export function InteractiveDiagram({
  caption,
  description,
  figLabel,
  title,
  illustration,
  status,
  parts,
  legend,
  presets,
  transport,
  stepCaption,
  readout,
  inViewRef,
  paused,
  className,
}: InteractiveDiagramProps) {
  return (
    <DiagramHoverProvider>
      <DiagramFigure
        caption={caption}
        description={description}
        className={className}
      >
        <div ref={inViewRef} data-paused={paused ? "" : undefined}>
          <DiagramStage
            illustration={
              <DiagramIllustration
                figLabel={figLabel}
                title={title}
                status={status}
                parts={parts}
                legend={legend}
              >
                {illustration}
              </DiagramIllustration>
            }
            panel={
              <>
                {presets}
                {transport}
                {stepCaption}
                {readout}
              </>
            }
          />
        </div>
      </DiagramFigure>
    </DiagramHoverProvider>
  )
}

const LEGEND_BORDER: Record<AnatomyHue, string> = {
  entity: "border-diagram-entity",
  gas: "border-diagram-gas",
  neutral: "border-diagram-line",
}

function DiagramIllustration({
  figLabel,
  title,
  status,
  parts,
  legend,
  children,
}: Pick<
  InteractiveDiagramProps,
  "figLabel" | "title" | "status" | "parts" | "legend"
> & { children: ReactNode }) {
  const { hovered } = useDiagramHover()
  const hoverTargets = useHoverTargets()
  const part = hovered ? parts[hovered] : undefined

  return (
    <div className="flex w-full min-w-0 flex-col gap-2">
      <p className="m-0 text-sm tracking-wider text-body-medium uppercase">
        {figLabel && (
          <>
            <span className="text-body">{figLabel}</span>
            <span aria-hidden> · </span>
          </>
        )}
        {title}
      </p>
      <div className="mx-auto w-full max-w-2xl py-1" {...hoverTargets}>
        {children}
      </div>
      {/* Visual only: the step is announced by the caption, and a focused
          label carries its definition itself. Two lines are reserved, so
          nothing below moves when the text changes. */}
      <p
        aria-hidden
        className="m-0 line-clamp-2 min-h-[2lh] text-sm leading-snug text-body-medium"
      >
        {part ? (
          <>
            <span className="text-body">{part.label}</span>
            {": "}
            {part.definition}
          </>
        ) : (
          status
        )}
      </p>
      <ul className="m-0 flex list-none flex-wrap gap-x-4 gap-y-1 p-0 text-sm text-body-medium">
        {legend.map((item) => (
          <li key={item.hue} className="m-0 flex items-center gap-1.5">
            <span
              aria-hidden
              className={cn(
                "size-2.5 rounded-[2px] border",
                LEGEND_BORDER[item.hue]
              )}
              style={{ background: anatomyFill(item.hue, "end", "lit") }}
            />
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ---------- Presets ---------- */

export interface DiagramPresetOption<T extends string> {
  id: T
  label: ReactNode
}

/**
 * "Choose scenario": a segmented radio group (one tab stop, arrow keys
 * select), a column in the side panel and a row when the panel is stacked.
 */
export function DiagramPresets<T extends string>({
  label: labelProp,
  options,
  value,
  onChange,
  eventCategory = "Diagram",
  eventAction,
}: {
  /** Defaults to "Choose scenario". */
  label?: ReactNode
  options: DiagramPresetOption<T>[]
  value: T
  onChange: (id: T) => void
  eventCategory?: string
  eventAction: string
}) {
  const t = useTranslations("component-diagrams")
  const label = labelProp ?? t("diagram-presets-label")
  const labelId = useId()
  return (
    <div className="flex flex-col gap-2">
      <span id={labelId} className="text-sm text-body-medium">
        {label}
      </span>
      <RadioGroup
        variant="segmented"
        aria-labelledby={labelId}
        value={value}
        onValueChange={(id) => {
          onChange(id as T)
          trackCustomEvent({ eventCategory, eventAction, eventName: id })
        }}
        className="@[640px]:flex-col @[640px]:divide-x-0 @[640px]:divide-y"
      >
        {options.map((option) => (
          <RadioGroupSegment key={option.id} value={option.id}>
            {option.label}
          </RadioGroupSegment>
        ))}
      </RadioGroup>
    </div>
  )
}

/* ---------- Transport ---------- */

const ICON_BUTTON = "size-8 min-h-8 shrink-0 p-0"

/**
 * The primary action (full width), then one row: previous,
 * "Step x of n", next, reset. Same icons and order on every diagram.
 */
export function DiagramTransport({
  primary,
  current,
  total,
  onPrevious,
  onNext,
  onReset,
  canGoPrevious,
  canGoNext,
  canReset,
  eventCategory = "Diagram",
  eventAction,
}: {
  primary: {
    label: ReactNode
    icon: ReactNode
    onClick: () => void
    disabled?: boolean
  }
  /** 1 to `total` for a step, shown as "Step 2 of 4"; 0 at idle, shown as
   * "4 steps". */
  current: number
  total: number
  onPrevious: () => void
  onNext: () => void
  onReset: () => void
  canGoPrevious: boolean
  canGoNext: boolean
  canReset: boolean
  eventCategory?: string
  eventAction: string
}) {
  const t = useTranslations("component-diagrams")
  const format = useDiagramFormat()
  return (
    <div className="flex flex-col gap-2">
      <Button
        size="sm"
        onClick={primary.onClick}
        disabled={primary.disabled}
        customEventOptions={{
          eventCategory,
          eventAction,
          eventName: "primary",
        }}
      >
        {primary.icon}
        {primary.label}
      </Button>
      <div className="flex items-center gap-1">
        <Button
          size="sm"
          variant="outline"
          aria-label={t("diagram-previous-step")}
          disabled={!canGoPrevious}
          onClick={onPrevious}
          className={ICON_BUTTON}
        >
          <ChevronPrev />
        </Button>
        <span className="min-w-0 flex-1 text-center text-sm text-body-medium tabular-nums">
          {current > 0
            ? t("diagram-step-counter", {
                current: format(current),
                total: format(total),
              })
            : t("diagram-step-total", { count: total, total: format(total) })}
        </span>
        <Button
          size="sm"
          variant="outline"
          aria-label={t("diagram-next-step")}
          disabled={!canGoNext}
          onClick={onNext}
          data-diagram-next=""
          className={ICON_BUTTON}
        >
          <ChevronNext />
        </Button>
        <Button
          size="sm"
          variant="outline"
          aria-label={t("diagram-reset")}
          disabled={!canReset}
          onClick={onReset}
          className={ICON_BUTTON}
        >
          <RotateCcw />
        </Button>
      </div>
    </div>
  )
}

/* ---------- Caption ---------- */

/**
 * The step caption, in a polite live region. Every caption this diagram can
 * show is laid out in the same cell as an empty sizer whose text comes from
 * CSS (`content: attr()`), so the area is as tall as its longest step and
 * nothing below it jumps, without repeating the text in the page.
 */
export function DiagramCaption({
  current,
  all,
}: {
  current: ReactNode
  /** Every caption this diagram can show (current preset), for sizing. */
  all: string[]
}) {
  return (
    <div className="grid text-sm text-body">
      <p role="status" className="col-start-1 row-start-1 m-0">
        {current}
      </p>
      {[...new Set(all)].map((text) => (
        <span
          key={text}
          aria-hidden
          data-sizer={text}
          className="invisible col-start-1 row-start-1 before:content-[attr(data-sizer)]"
        />
      ))}
    </div>
  )
}

/* ---------- Readout ---------- */

/** Compact two-column list: labels, then right-aligned tabular numbers. */
export function DiagramReadout({
  label,
  rows,
}: {
  /** Accessible name for the list; defaults to the gas readout name. */
  label?: string
  rows: { label: ReactNode; value: ReactNode }[]
}) {
  const t = useTranslations("component-diagrams")
  return (
    <dl
      aria-label={label ?? t("diagram-readout-label")}
      className="m-0 grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 border-t border-border pt-3 text-sm"
    >
      {rows.map((row, i) => (
        <div key={i} className="contents">
          <dt className="min-w-0 text-body-medium">{row.label}</dt>
          <dd className="m-0 text-end font-mono text-body tabular-nums">
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}

/* ---------- Numbers ---------- */

/** A memoised `numberFormat` for the current locale (arabext for Urdu). */
export function useDiagramFormat() {
  const locale = useLocale()
  return useMemo(() => {
    const formatter = numberFormat(locale)
    return (value: number) => formatter.format(value)
  }, [locale])
}

/**
 * A readout number that counts up with the drawing. Its own leaf, so the
 * per-frame tween re-renders only this text, not the diagram.
 */
export function DiagramCountUp({
  value,
  delay,
  format,
}: {
  value: number
  /** ms before counting starts, to follow the drawing's motion. */
  delay?: number
  /** Display format; a plain locale number by default. */
  format?: (value: number) => ReactNode
}) {
  const formatNumber = useDiagramFormat()
  const { prefersReducedMotion } = usePrefersReducedMotion()
  const shown = useCountUp(value, { delay, instant: prefersReducedMotion })
  return <>{(format ?? formatNumber)(shown)}</>
}
