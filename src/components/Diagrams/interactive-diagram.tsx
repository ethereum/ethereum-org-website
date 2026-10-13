import { type ReactNode, useId } from "react"
import { RotateCcw } from "lucide-react"

import type { MatomoEventOptions } from "@/lib/types"

import { ChevronNext, ChevronPrev } from "@/components/Chevron"
import { Button } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"

import { DiagramStage } from "./anatomy/stage"
import { DiagramFigure } from "./diagram-figure"

/*
 * The shell every interactive diagram uses, so controls sit in the same
 * places everywhere. One card holds the illustration and a panel; from a
 * 640px card width the panel (15rem) sits on the inline-end side, narrower it
 * stacks under the illustration. The panel always reads, top to bottom:
 * presets ("Example values"), transport (primary action, then previous /
 * "Step x of n" / next / reset), caption, readout.
 */

export interface InteractiveDiagramProps {
  /** Intro text, shown above the card as the figcaption. */
  caption: ReactNode
  /** Screen-reader description of the whole figure. */
  description: ReactNode
  illustration: ReactNode
  /** A `DiagramPresets`, for diagrams with example values. */
  presets?: ReactNode
  transport: ReactNode
  /** A `DiagramCaption`. */
  stepCaption: ReactNode
  /** A `DiagramReadout`. */
  readout: ReactNode
  className?: string
}

export function InteractiveDiagram({
  caption,
  description,
  illustration,
  presets,
  transport,
  stepCaption,
  readout,
  className,
}: InteractiveDiagramProps) {
  return (
    <DiagramFigure
      caption={caption}
      captionPlacement="top"
      description={description}
      className={className}
    >
      <DiagramStage
        illustration={illustration}
        panel={
          <>
            {presets}
            {transport}
            {stepCaption}
            {readout}
          </>
        }
      />
    </DiagramFigure>
  )
}

/* ---------- Presets ---------- */

export interface DiagramPresetOption<T extends string> {
  id: T
  label: ReactNode
}

/**
 * "Example values": a segmented control, vertical full-width rows in the side
 * panel and a horizontal row when the panel is stacked.
 */
export function DiagramPresets<T extends string>({
  label,
  options,
  value,
  onChange,
  eventCategory = "Diagram",
  eventAction,
}: {
  label: ReactNode
  options: DiagramPresetOption<T>[]
  value: T
  onChange: (id: T) => void
  eventCategory?: string
  eventAction: string
}) {
  const labelId = useId()
  const last = options.length - 1
  return (
    <div className="flex flex-col gap-2">
      <span id={labelId} className="text-sm text-body-medium">
        {label}
      </span>
      <div
        role="group"
        aria-labelledby={labelId}
        className="flex @[640px]:flex-col"
      >
        {options.map((option, i) => (
          <Button
            key={option.id}
            size="sm"
            variant={option.id === value ? "solid" : "outline"}
            aria-pressed={option.id === value}
            onClick={() => onChange(option.id)}
            className={cn(
              "min-w-0 flex-1 whitespace-normal",
              // Joined borders: a row when stacked, a column in the side panel.
              i > 0 && "-ms-px @[640px]:ms-0 @[640px]:-mt-px",
              i === 0 &&
                i !== last &&
                "rounded-e-none @[640px]:rounded @[640px]:rounded-b-none",
              i > 0 && i < last && "rounded-none @[640px]:rounded-none",
              i === last &&
                i !== 0 &&
                "rounded-s-none @[640px]:rounded @[640px]:rounded-t-none"
            )}
            customEventOptions={
              {
                eventCategory,
                eventAction,
                eventName: option.id,
              } satisfies MatomoEventOptions
            }
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  )
}

/* ---------- Transport ---------- */

const ICON_BUTTON = "size-8 min-h-8 shrink-0 p-0"

/**
 * The primary action (full width in the side panel), then one row: previous,
 * "Step x of n", next, reset. Same icons and order on every diagram.
 */
export function DiagramTransport({
  primary,
  counter,
  onPrevious,
  onNext,
  onReset,
  canGoPrevious,
  canGoNext,
  canReset,
  labels,
  eventCategory = "Diagram",
  eventAction,
}: {
  primary: {
    label: ReactNode
    icon: ReactNode
    onClick: () => void
    disabled?: boolean
  }
  /** e.g. "Step 2 of 4". */
  counter: ReactNode
  onPrevious: () => void
  onNext: () => void
  onReset: () => void
  canGoPrevious: boolean
  canGoNext: boolean
  canReset: boolean
  labels: { previous: string; next: string; reset: string }
  eventCategory?: string
  eventAction: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <Button
        size="sm"
        onClick={primary.onClick}
        disabled={primary.disabled}
        className="self-start @[640px]:self-stretch"
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
          aria-label={labels.previous}
          disabled={!canGoPrevious}
          onClick={onPrevious}
          className={ICON_BUTTON}
        >
          <ChevronPrev />
        </Button>
        <span className="min-w-0 flex-1 text-center text-sm text-body-medium tabular-nums">
          {counter}
        </span>
        <Button
          size="sm"
          variant="outline"
          aria-label={labels.next}
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
          aria-label={labels.reset}
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
 * The step caption, in a polite live region. Every possible caption is laid
 * out invisibly in the same cell, so the area is always as tall as its
 * longest step and nothing below it jumps.
 */
export function DiagramCaption({
  current,
  all,
}: {
  current: ReactNode
  /** Every caption this diagram can show (current preset), for sizing. */
  all: ReactNode[]
}) {
  return (
    <div className="grid text-sm text-body">
      <p role="status" className="col-start-1 row-start-1 m-0">
        {current}
      </p>
      {all.map((text, i) => (
        <p
          key={i}
          aria-hidden
          className="invisible col-start-1 row-start-1 m-0"
        >
          {text}
        </p>
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
  /** Accessible name for the list. */
  label: string
  rows: { label: ReactNode; value: ReactNode }[]
}) {
  return (
    <dl
      aria-label={label}
      className="m-0 grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1 border-t border-border pt-3 text-sm"
    >
      {rows.map((row, i) => (
        <div key={i} className="contents">
          <dt className="min-w-0 text-body-medium">{row.label}</dt>
          <dd className="m-0 text-end font-mono font-bold text-body tabular-nums">
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}
