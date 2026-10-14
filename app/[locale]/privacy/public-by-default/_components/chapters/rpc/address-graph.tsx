"use client"

import { persona } from "@/data/privacy-lesson/persona"

import { useLessonTranslations } from "../../use-lesson-translations"

import type { RpcMode } from "./rpc-provider-view"

// Symmetric layout (hub in the middle, addresses in the corners), so it reads
// the same in LTR and RTL without mirroring. Labels are centred on fixed
// points and never sized from their text.
const W = 320
const H = 200
const HUB = { x: W / 2, y: H / 2 }
const SPOTS = [
  { x: 60, y: 36 },
  { x: W - 60, y: 36 },
  { x: 60, y: H - 36 },
  { x: W - 60, y: H - 36 },
]
const EXITS = [
  { x: 120, y: 66 },
  { x: W - 120, y: 66 },
  { x: 120, y: H - 66 },
  { x: W - 120, y: H - 66 },
]

const AddressGraph = ({ mode, time }: { mode: RpcMode; time: string }) => {
  const t = useLessonTranslations()

  if (mode === "node") {
    return (
      <div
        role="img"
        aria-label={t("rpc-view-graph-aria-node")}
        className="grid aspect-[8/5] place-items-center rounded-base border border-dashed p-4 text-center text-sm text-body-medium"
      >
        <span>
          {t("rpc-view-graph-empty-1")}
          <br />
          {t("rpc-view-graph-empty-2")}
        </span>
      </div>
    )
  }

  const ariaKey = {
    default: "rpc-view-graph-aria-default",
    "tor-one": "rpc-view-graph-aria-tor-one",
    "tor-each": "rpc-view-graph-aria-tor-each",
  }[mode]

  const hubLabel = mode === "default" ? persona.ip : t("rpc-view-graph-hub-tor")

  return (
    <figure className="m-0 space-y-1">
      <figcaption className="text-sm font-bold text-body-medium">
        {t("rpc-view-graph-label")}
      </figcaption>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={t(ariaKey)}
        className="h-auto w-full overflow-visible text-body"
      >
        {mode === "tor-each" ? (
          <>
            {/* Each address arrives through its own exit... */}
            {SPOTS.map((spot, i) => (
              <line
                key={`l-${i}`}
                x1={spot.x}
                y1={spot.y}
                x2={EXITS[i].x}
                y2={EXITS[i].y}
                className="stroke-primary"
                strokeWidth={2}
              />
            ))}
            {EXITS.map((exit, i) => (
              <circle
                key={`e-${i}`}
                cx={exit.x}
                cy={exit.y}
                r={7}
                className="fill-primary"
              />
            ))}
            {/* ...but they all start at the same time */}
            <circle
              cx={HUB.x}
              cy={HUB.y}
              r={58}
              fill="none"
              strokeDasharray="4 4"
              strokeWidth={1.5}
              className="stroke-leak"
            />
            <text
              x={HUB.x}
              y={HUB.y + 4}
              textAnchor="middle"
              className="fill-leak-high-contrast text-[11px] font-bold"
            >
              {t("rpc-view-graph-same-time", { time })}
            </text>
          </>
        ) : (
          <>
            {SPOTS.map((spot, i) => (
              <line
                key={`l-${i}`}
                x1={spot.x}
                y1={spot.y}
                x2={HUB.x}
                y2={HUB.y}
                strokeWidth={2}
                className={
                  mode === "default" ? "stroke-leak" : "stroke-primary"
                }
              />
            ))}
            <circle
              cx={HUB.x}
              cy={HUB.y}
              r={30}
              className={
                mode === "default"
                  ? "fill-leak-low-contrast stroke-leak"
                  : "fill-primary-low-contrast stroke-primary"
              }
              strokeWidth={2}
            />
            <text
              x={HUB.x}
              y={HUB.y + 46}
              textAnchor="middle"
              direction={mode === "default" ? "ltr" : undefined}
              className="fill-current text-[11px] font-bold"
            >
              {hubLabel}
            </text>
          </>
        )}
        {SPOTS.map((spot, i) => (
          <g key={`a-${i}`}>
            <circle
              cx={spot.x}
              cy={spot.y}
              r={9}
              className="fill-background stroke-current"
              strokeWidth={2}
            />
            <text
              x={spot.x}
              y={spot.y + (spot.y < HUB.y ? -14 : 24)}
              textAnchor="middle"
              direction="ltr"
              className="fill-current font-mono text-[10px]"
            >
              {persona.addresses[i]}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  )
}

export default AddressGraph
