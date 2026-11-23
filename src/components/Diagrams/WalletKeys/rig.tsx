import { memo, type ReactNode } from "react"
import {
  Key,
  KeyRound,
  type LucideIcon,
  Mailbox,
  ScrollText,
} from "lucide-react"

import { cn } from "@/lib/utils/cn"

import {
  AnatomyLabels,
  type AnatomyLabelSpot,
  DIAGRAM_SVG_FALLBACKS,
  ISO_DIM_CLASS,
  ISO_SVG_CLASS,
} from "../anatomy"
import { anatomyFill, anatomyStroke, DIAGRAM_COLOR } from "../anatomy/tokens"
import { usePartState } from "../diagram-hover"

import {
  CARDS,
  WALLET_KEYS_SIZE,
  type WalletKeysCard,
  type WalletKeysPart,
  type WalletKeysView,
  type WalletKeysZone,
} from "./model"

/*
 * Flat 2D drawing: four cards in a row (recovery phrase, private key, public
 * key, address) joined by one-way arrows; dashed zones mark what to keep
 * secret and what is safe to share; blocked arrows run back the other way.
 */

const { width: W, height: H } = WALLET_KEYS_SIZE
const CARD_W = 78
const CARD_H = 74
const CARD_Y = 52
const GAP = 44
const X0 = (W - CARDS.length * CARD_W - (CARDS.length - 1) * GAP) / 2
const FORWARD_Y = CARD_Y + 28
const BACKWARD_Y = CARD_Y + 50
const ICON = 28
const ZONE_PAD = 10
const LABEL_A_Y = CARD_Y + CARD_H + 18
const LABEL_B_Y = LABEL_A_Y + 34

const cardX = (i: number) => X0 + i * (CARD_W + GAP)
const cardCenter = (i: number) => cardX(i) + CARD_W / 2

const ICONS: Record<WalletKeysCard, LucideIcon> = {
  phrase: ScrollText,
  "private-key": KeyRound,
  "public-key": Key,
  address: Mailbox,
}

// Arrow i joins card i to card i + 1; `back` runs from i + 1 to i.
const arrowPath = (i: number, back = false) => {
  const from = cardX(i) + CARD_W + 5
  const to = cardX(i + 1) - 5
  return back
    ? `M${to},${BACKWARD_Y} H${from + 1}`
    : `M${from},${FORWARD_Y} H${to - 1}`
}
const arrowHead = (i: number, back = false) =>
  back
    ? `M${cardX(i) + CARD_W + 11},${BACKWARD_Y - 4} L${cardX(i) + CARD_W + 5},${BACKWARD_Y} L${cardX(i) + CARD_W + 11},${BACKWARD_Y + 4}`
    : `M${cardX(i + 1) - 11},${FORWARD_Y - 4} L${cardX(i + 1) - 5},${FORWARD_Y} L${cardX(i + 1) - 11},${FORWARD_Y + 4}`
const gapCenter = (i: number) => cardX(i) + CARD_W + GAP / 2

const ZONE_CARDS: Record<WalletKeysZone, [number, number]> = {
  secret: [0, 1],
  shareable: [2, 3],
}
const zoneBox = (zone: WalletKeysZone) => {
  const [a, b] = ZONE_CARDS[zone]
  return {
    x: cardX(a) - ZONE_PAD,
    y: CARD_Y - ZONE_PAD - 2,
    width: cardX(b) + CARD_W - cardX(a) + 2 * ZONE_PAD,
    height: CARD_H + 2 * ZONE_PAD + 4,
  }
}
const zoneCenter = (zone: WalletKeysZone) => {
  const box = zoneBox(zone)
  return box.x + box.width / 2
}

const REVERT = "hsla(var(--diagram-revert, 0, 70%, 42%))"
const ZONE_FILL: Record<WalletKeysZone, string> = {
  secret: `color-mix(in oklab, ${REVERT} 6%, transparent)`,
  shareable: `color-mix(in oklab, ${DIAGRAM_COLOR.entity} 6%, transparent)`,
}
const ZONE_STROKE: Record<WalletKeysZone, string> = {
  secret: "stroke-diagram-revert",
  shareable: "stroke-diagram-entity",
}

// Labels alternate rows so neighbours never touch. The phrase label sits
// inward to fit a 390px screen, and the private key's leader clears it.
const LABEL_SHIFT = [40, 25, 0, 0]
const CARD_SPOTS: AnatomyLabelSpot[] = CARDS.map((card, i) => {
  const x = cardCenter(i) + LABEL_SHIFT[i]
  return {
    id: card,
    tone: "entity",
    target: [i === 0 ? x - 12 : x, CARD_Y + CARD_H + 2],
    anchor: [x, i % 2 === 0 ? LABEL_A_Y : LABEL_B_Y],
    placement: "below",
  }
})
const zoneSpot = (zone: WalletKeysZone): AnatomyLabelSpot => ({
  id: zone,
  tone: zone === "shareable" ? "entity" : "neutral",
  target: [zoneCenter(zone), zoneBox(zone).y - 1],
  anchor: [zoneCenter(zone), zoneBox(zone).y - 8],
  placement: "above",
})
const SPOTS = {
  none: CARD_SPOTS,
  shareable: [zoneSpot("shareable"), ...CARD_SPOTS],
  both: [zoneSpot("shareable"), zoneSpot("secret"), ...CARD_SPOTS],
}

const FLOW = "animate-diagram-flow motion-reduce:animate-none"
const POP =
  "origin-center animate-diagram-pop [transform-box:fill-box] motion-reduce:animate-none"

interface WalletKeysRigProps {
  view: WalletKeysView
  runKey: string
  labels: Record<WalletKeysPart, ReactNode>
  definitions: Record<WalletKeysPart, ReactNode>
  className?: string
}

function WalletKeysRig({
  view,
  runKey,
  labels,
  definitions,
  className,
}: WalletKeysRigProps) {
  const { state, dimmed } = usePartState(view.litPart)
  const part = (name: WalletKeysPart) => ({
    "data-part": name,
    className: ISO_DIM_CLASS,
    style: { opacity: dimmed(name) ? 0.7 : 1 },
  })
  const spots = view.zones.secret
    ? SPOTS.both
    : view.zones.shareable
      ? SPOTS.shareable
      : SPOTS.none
  const newestBlock = view.blocked[view.blocked.length - 1]

  return (
    <div className={cn("relative", className)}>
      <svg
        aria-hidden
        data-anatomy-drawing=""
        viewBox={`0 0 ${W} ${H}`}
        {...DIAGRAM_SVG_FALLBACKS}
        className={ISO_SVG_CLASS}
      >
        {(["secret", "shareable"] as const).map(
          (zone) =>
            view.zones[zone] && (
              <g key={zone} {...part(zone)}>
                <rect
                  {...zoneBox(zone)}
                  rx={10}
                  strokeDasharray="5 4"
                  style={{ fill: ZONE_FILL[zone] }}
                  className={cn(
                    state(zone) === "hover"
                      ? "stroke-diagram-line-strong"
                      : ZONE_STROKE[zone],
                    view.litPart === zone && POP
                  )}
                />
              </g>
            )
        )}

        <g className="pointer-events-none" fill="none" strokeLinecap="round">
          {CARDS.slice(1).map((_, i) => {
            const flowing = view.flowArrow === i
            // The flowing arrow's line stays neutral so its dashes show.
            const lit = i < view.arrowsLit && !flowing
            return (
              <g key={i}>
                <path
                  d={arrowPath(i)}
                  className={
                    lit ? "stroke-diagram-entity" : "stroke-diagram-line"
                  }
                />
                <path
                  d={arrowHead(i)}
                  strokeLinejoin="round"
                  className={
                    i < view.arrowsLit
                      ? "stroke-diagram-entity"
                      : "stroke-diagram-line"
                  }
                />
                {flowing && (
                  <path
                    key={runKey}
                    d={arrowPath(i)}
                    strokeDasharray="4 5"
                    className={cn(
                      FLOW,
                      "stroke-diagram-entity [stroke-width:1.4]"
                    )}
                  />
                )}
              </g>
            )
          })}

          {view.blocked.map((i) => (
            <g key={i} className="stroke-diagram-revert">
              <g
                key={i === newestBlock ? runKey : "done"}
                strokeDasharray="3 3"
                className={i === newestBlock ? FLOW : undefined}
              >
                <path d={arrowPath(i, true)} />
              </g>
              <path d={arrowHead(i, true)} strokeLinejoin="round" />
              <g
                key={i === newestBlock ? `${runKey}-x` : "x"}
                className={i === newestBlock ? POP : undefined}
                style={
                  i === newestBlock ? { animationDelay: "500ms" } : undefined
                }
              >
                <circle
                  cx={gapCenter(i)}
                  cy={BACKWARD_Y}
                  r={7}
                  style={{
                    fill: `color-mix(in oklab, ${REVERT} 12%, ${DIAGRAM_COLOR.bg})`,
                  }}
                />
                <path
                  d={`M${gapCenter(i) - 3},${BACKWARD_Y - 3} l6,6 M${gapCenter(i) + 3},${BACKWARD_Y - 3} l-6,6`}
                />
              </g>
            </g>
          ))}
        </g>

        {CARDS.map((card, i) => {
          const made = i < view.made
          const cardState = state(card)
          const Icon = ICONS[card]
          const x = cardX(i)
          return (
            <g key={card} {...part(card)}>
              <g
                key={made && i === view.made - 1 && i > 0 ? runKey : "card"}
                className={
                  made && view.flowArrow === i - 1
                    ? cn(POP, "[animation-delay:500ms]")
                    : undefined
                }
              >
                <rect
                  x={x}
                  y={CARD_Y}
                  width={CARD_W}
                  height={CARD_H}
                  rx={8}
                  strokeDasharray={made ? undefined : "4 3"}
                  style={{
                    fill: made
                      ? anatomyFill("entity", "top", cardState)
                      : anatomyFill("neutral", "top"),
                  }}
                  className={anatomyStroke(
                    made ? "entity" : "neutral",
                    cardState
                  )}
                />
                <Icon
                  x={x + (CARD_W - ICON) / 2}
                  y={CARD_Y + 12}
                  width={ICON}
                  height={ICON}
                  strokeWidth={1.5}
                  className={
                    !made
                      ? "text-diagram-line"
                      : cardState === "rest"
                        ? "text-diagram-pipe"
                        : "text-diagram-entity"
                  }
                />
                {[0, 1].map((row) => (
                  <path
                    key={row}
                    d={`M${x + 16},${CARD_Y + 52 + row * 8} h${CARD_W - 32 - row * 14}`}
                    strokeLinecap="round"
                    className="stroke-diagram-line-faint"
                  />
                ))}
              </g>
            </g>
          )
        })}
      </svg>

      <AnatomyLabels
        width={W}
        height={H}
        spots={spots}
        labels={labels}
        definitions={definitions}
        litId={view.litPart}
      />
    </div>
  )
}

export default memo(WalletKeysRig)
