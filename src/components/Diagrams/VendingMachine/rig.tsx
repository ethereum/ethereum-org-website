"use client"

import { memo, type ReactNode, useId, useMemo } from "react"
import { Check, Minus, X } from "lucide-react"

import { cn } from "@/lib/utils/cn"

import {
  anatomyFill,
  AnatomyLabels,
  type AnatomyLabelSpot,
  anatomyStroke,
  anatomyStrong,
  DIAGRAM_COLOR,
  DIAGRAM_SVG_FALLBACKS,
  ISO_DIM_CLASS,
  ISO_SVG_CLASS,
  IsoDefs,
} from "../anatomy"
import { usePartState } from "../diagram-hover"

import {
  type RuleState,
  START_STOCK,
  VENDING_MACHINE_SIZE,
  type VendingMachinePart,
  type VendingMachineView,
} from "./model"

/*
 * Flat front view of the machine: controls (price display, buttons, coin
 * slot and return cup) beside the window of cupcakes, the tray below. The
 * rules checklist is HTML under the drawing so its text never scales down.
 */

const { width: W, height: H } = VENDING_MACHINE_SIZE
const SHADOW = "vending-machine-shadow"
const BODY = { x: 128, y: 36, w: 180, h: 264 }
const DISPLAY = { x: 135, y: 50, w: 79, h: 28 }
const BUTTONS = [
  [150, 88],
  [176, 88],
  [150, 108],
  [176, 108],
] as const
const FACEPLATE = { x: 158, y: 132, w: 30, h: 40 }
const SLIT = { x: 171.5, y: 140, w: 3, h: 24 }
const CUP = { x: 156, y: 184, w: 34, h: 24 }
const WINDOW = { x: 218, y: 50, w: 78, h: 166 }
const SHELVES = [104, 156, 208]
const TRAY = { x: 142, y: 228, w: 154, h: 50 }
const CUPCAKE_X = WINDOW.x + WINDOW.w / 2
const TRAY_BASE = TRAY.y + TRAY.h - 5
const LOW_SHELF_BASE = SHELVES[SHELVES.length - 1] - 2
/** Fall from the bottom shelf to the tray. */
const FALL = TRAY_BASE - LOW_SHELF_BASE

const pct = (value: number, of: number) => `${(value / of) * 100}%`

const POP =
  "origin-center animate-diagram-pop [transform-box:fill-box] motion-reduce:animate-none"
const DROP =
  "animate-diagram-travel-y [transform-box:fill-box] motion-reduce:animate-none"
const FALL_CLASS =
  "animate-diagram-travel-y [animation-timing-function:cubic-bezier(0.5,0,1,0.6)] [transform-box:fill-box] motion-reduce:animate-none"

const ground = (
  <ellipse
    cx={BODY.x + BODY.w / 2}
    cy={BODY.y + BODY.h}
    rx={BODY.w / 2 + 14}
    ry={7}
    stroke="none"
    fill={`url(#${SHADOW})`}
    className="pointer-events-none"
  />
)

const coil = (y: number) => (
  <path
    key={y}
    d={`M${WINDOW.x + 8},${y} H${WINDOW.x + WINDOW.w - 8}`}
    className="stroke-diagram-line-faint"
  />
)

function Cupcake({ x, base }: { x: number; base: number }) {
  return (
    <g>
      <path
        d={`M${x - 13},${base - 18} L${x + 13},${base - 18} L${x + 10},${base} L${x - 10},${base} Z`}
        style={{ fill: anatomyFill("neutral", "end") }}
        className="stroke-diagram-line"
      />
      <path
        d={`M${x - 6},${base - 18} L${x - 5},${base} M${x + 6},${base - 18} L${x + 5},${base}`}
        className="stroke-diagram-line-faint"
      />
      <path
        d={`M${x - 15},${base - 18} C${x - 17},${base - 30} ${x - 6},${base - 36} ${x},${base - 36} C${x + 6},${base - 36} ${x + 17},${base - 30} ${x + 15},${base - 18} Z`}
        style={{ fill: anatomyFill("neutral", "top") }}
        className="stroke-diagram-line"
      />
      <circle
        cx={x}
        cy={base - 39}
        r={3}
        style={{ fill: DIAGRAM_COLOR.pipe }}
        stroke="none"
      />
    </g>
  )
}

function Coin({
  x,
  y,
  className,
}: {
  x: number
  y: number
  className?: string
}) {
  return (
    <g className={className}>
      <circle
        cx={x}
        cy={y}
        r={8}
        style={{ fill: anatomyStrong("gas") }}
        className="stroke-diagram-gas"
      />
      <circle cx={x} cy={y} r={4.5} className="stroke-diagram-bg" />
    </g>
  )
}

const RULE_ICON: Record<RuleState, ReactNode> = {
  pending: null,
  pass: <Check className="size-3.5" strokeWidth={3} />,
  fail: <X className="size-3.5" strokeWidth={3} />,
  skipped: <Minus className="size-3.5" strokeWidth={3} />,
}

const RULE_MARK: Record<RuleState, string> = {
  pending: "border-diagram-line text-diagram-line",
  pass: "border-diagram-entity bg-diagram-entity text-diagram-bg",
  fail: "border-diagram-revert bg-diagram-revert text-diagram-bg",
  skipped: "border-diagram-line text-body-medium",
}

const RULE_TEXT: Record<RuleState, string> = {
  pending: "text-body-medium",
  pass: "text-diagram-entity",
  fail: "text-diagram-revert",
  skipped: "text-body-medium",
}

interface VendingMachineRigProps {
  view: VendingMachineView
  /** Changes on every step, to restart one-shot animations. */
  runKey: string
  /** Price as shown on the machine's display. */
  priceText: ReactNode
  /** Tag shown when the purchase is undone. */
  undoneText: ReactNode
  rulesTitle: ReactNode
  rules: { id: "paid" | "stock"; question: ReactNode }[]
  ruleStateText: Record<RuleState, ReactNode>
  labels: Record<VendingMachinePart, ReactNode>
  definitions: Record<VendingMachinePart, ReactNode>
  className?: string
}

function VendingMachineRig({
  view,
  runKey,
  priceText,
  undoneText,
  rulesTitle,
  rules,
  ruleStateText,
  labels,
  definitions,
  className,
}: VendingMachineRigProps) {
  const { state, dimmed } = usePartState(view.litPart)
  const clipId = `vending-machine-openings-${useId()}`

  const part = (name: VendingMachinePart) => ({
    "data-part": name,
    className: ISO_DIM_CLASS,
    style: { opacity: dimmed(name) ? 0.7 : 1 },
  })

  const spots = useMemo<AnatomyLabelSpot[]>(
    () => [
      {
        id: "display",
        tone: "entity",
        target: [DISPLAY.x, DISPLAY.y + 14],
        anchor: [118, DISPLAY.y + 14],
        placement: "start",
      },
      {
        id: "slot",
        tone: "gas",
        target: [FACEPLATE.x, FACEPLATE.y + 20],
        anchor: [118, FACEPLATE.y + 20],
        placement: "start",
      },
      {
        id: "stock",
        tone: "neutral",
        target: [CUPCAKE_X, WINDOW.y],
        anchor: [CUPCAKE_X, 26],
        placement: "above",
      },
      {
        id: "tray",
        tone: "neutral",
        target: [TRAY.x, TRAY.y + TRAY.h / 2],
        anchor: [118, TRAY.y + TRAY.h / 2],
        placement: "start",
      },
      {
        id: "buttons",
        tone: "entity",
        target: [BUTTONS[0][0], BUTTONS[0][1] + 7],
        anchor: [118, BUTTONS[0][1] + 7],
        placement: "start",
      },
    ],
    []
  )

  const buttonsState = state("buttons")
  const slotState = state("slot")
  const stockState = state("stock")
  const trayState = state("tray")
  const displayState = state("display")
  const rulesState = state("rules")
  const coinInSlot = view.paid > 0 && !view.reverted && view.released === 0

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="relative">
        <svg
          aria-hidden
          data-anatomy-drawing=""
          viewBox={`0 0 ${W} ${H}`}
          {...DIAGRAM_SVG_FALLBACKS}
          className={ISO_SVG_CLASS}
        >
          <IsoDefs id={SHADOW} />
          <clipPath id={clipId}>
            {[WINDOW, TRAY].map(({ x, y, w, h }) => (
              <rect
                key={y}
                x={x + 1}
                y={y + 1}
                width={w - 2}
                height={h - 2}
                rx={5}
                fill="#000"
              />
            ))}
          </clipPath>
          {ground}

          <rect
            x={BODY.x}
            y={BODY.y}
            width={BODY.w}
            height={BODY.h}
            rx={12}
            style={{ fill: anatomyFill("entity", "start") }}
            className="stroke-diagram-line"
          />

          <g {...part("display")}>
            <rect
              x={DISPLAY.x}
              y={DISPLAY.y}
              width={DISPLAY.w}
              height={DISPLAY.h}
              rx={4}
              style={{ fill: anatomyFill("entity", "end", displayState) }}
              className={anatomyStroke("entity", displayState)}
            />
          </g>

          <g {...part("buttons")}>
            {BUTTONS.map(([x, y], i) => {
              const pressed = i === 0 && view.chosen
              return (
                <rect
                  key={i}
                  x={x}
                  y={y}
                  width={20}
                  height={14}
                  rx={3}
                  style={{
                    fill: pressed
                      ? anatomyStrong("entity")
                      : anatomyFill("entity", "top", buttonsState),
                  }}
                  className={anatomyStroke("entity", buttonsState)}
                />
              )
            })}
          </g>

          <g {...part("slot")}>
            <rect
              x={FACEPLATE.x}
              y={FACEPLATE.y}
              width={FACEPLATE.w}
              height={FACEPLATE.h}
              rx={4}
              style={{ fill: anatomyFill("gas", "top", slotState) }}
              className={anatomyStroke("gas", slotState)}
            />
            <rect
              x={SLIT.x}
              y={SLIT.y}
              width={SLIT.w}
              height={SLIT.h}
              rx={1.5}
              style={{
                fill: coinInSlot ? anatomyStrong("gas") : DIAGRAM_COLOR.pipe,
              }}
              stroke="none"
            />
            {coinInSlot && (
              <Coin
                key={`in-${runKey}`}
                x={SLIT.x + SLIT.w / 2}
                y={SLIT.y + SLIT.h / 2}
                className={view.motion === "pay" ? POP : undefined}
              />
            )}
            <rect
              x={CUP.x}
              y={CUP.y}
              width={CUP.w}
              height={CUP.h}
              rx={4}
              style={{ fill: DIAGRAM_COLOR.plate }}
              className={anatomyStroke("gas", slotState)}
            />
            {view.reverted && (
              <Coin
                key={`back-${runKey}`}
                x={CUP.x + CUP.w / 2}
                y={CUP.y + CUP.h / 2 + 2}
                className={DROP}
              />
            )}
          </g>

          <g {...part("stock")}>
            <rect
              x={WINDOW.x}
              y={WINDOW.y}
              width={WINDOW.w}
              height={WINDOW.h}
              rx={6}
              style={{ fill: DIAGRAM_COLOR.plate }}
              className={anatomyStroke("neutral", stockState)}
            />
            {SHELVES.map(coil)}
            {SHELVES.slice(0, Math.min(view.stockLeft, START_STOCK)).map(
              (base) => (
                <Cupcake key={base} x={CUPCAKE_X} base={base - 2} />
              )
            )}
          </g>

          <g {...part("tray")}>
            <rect
              x={TRAY.x}
              y={TRAY.y}
              width={TRAY.w}
              height={TRAY.h}
              rx={6}
              style={{ fill: anatomyFill("neutral", "start") }}
              className={anatomyStroke("neutral", trayState)}
            />
            {view.released > 0 && (
              // Clipped to the openings: falls behind the front panel. The
              // spacer sets the box height, so travel-y's -100% is the fall.
              <g clipPath={`url(#${clipId})`}>
                <g key={`out-${runKey}`} className={FALL_CLASS}>
                  <rect
                    x={CUPCAKE_X}
                    y={TRAY_BASE - FALL}
                    width={1}
                    height={FALL}
                    fill="none"
                    stroke="none"
                  />
                  <Cupcake x={CUPCAKE_X} base={TRAY_BASE} />
                </g>
              </g>
            )}
          </g>
        </svg>

        <div aria-hidden className="pointer-events-none absolute inset-0">
          {view.chosen && (
            <span
              className="absolute -translate-x-1/2 -translate-y-1/2 text-sm leading-none font-bold whitespace-nowrap text-diagram-entity rtl:translate-x-1/2"
              style={{
                insetInlineStart: pct(DISPLAY.x + DISPLAY.w / 2, W),
                top: pct(DISPLAY.y + DISPLAY.h / 2, H),
              }}
            >
              {priceText}
            </span>
          )}
          {view.reverted && (
            <span
              key={runKey}
              className="absolute -translate-x-1/2 -translate-y-1/2 animate-diagram-pop rounded-base border border-diagram-revert bg-diagram-entity-fill px-2 py-0.5 text-sm font-bold whitespace-nowrap text-diagram-revert motion-reduce:animate-none rtl:translate-x-1/2"
              style={{
                insetInlineStart: pct(TRAY.x + TRAY.w / 2, W),
                top: pct(TRAY.y + TRAY.h / 2, H),
              }}
            >
              {undoneText}
            </span>
          )}
        </div>

        <AnatomyLabels
          width={W}
          height={H}
          spots={spots}
          labels={labels}
          definitions={definitions}
          litId={view.litPart}
        />
      </div>

      <div
        aria-hidden
        {...part("rules")}
        className={cn(
          ISO_DIM_CLASS,
          "mx-auto flex w-full max-w-md flex-col gap-2 rounded-base border px-3 py-2",
          rulesState === "hover"
            ? "border-diagram-line-strong"
            : rulesState === "lit"
              ? "border-diagram-entity"
              : "border-diagram-line"
        )}
      >
        <p
          className={cn(
            "m-0 text-sm font-bold",
            rulesState === "lit" ? "text-diagram-entity" : "text-body"
          )}
        >
          {rulesTitle}
        </p>
        <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
          {rules.map(({ id, question }) => {
            const rule = view.rules[id]
            return (
              <li key={id} className="m-0 flex items-center gap-2 text-sm">
                <span
                  key={`${rule}-${runKey}`}
                  className={cn(
                    "flex size-5 shrink-0 items-center justify-center rounded-full border",
                    RULE_MARK[rule],
                    rule !== "pending" && POP
                  )}
                >
                  {RULE_ICON[rule]}
                </span>
                <span className="text-body">{question}</span>
                {rule !== "pending" && (
                  <span className={cn("ms-auto font-bold", RULE_TEXT[rule])}>
                    {ruleStateText[rule]}
                  </span>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default memo(VendingMachineRig)
