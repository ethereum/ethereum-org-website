import { memo, type ReactNode } from "react"
import { useTranslations } from "next-intl"

import { cn } from "@/lib/utils/cn"

import {
  AnatomyLabels,
  type AnatomyLabelSpot,
  DIAGRAM_SVG_FALLBACKS,
  ISO_DIM_CLASS,
  ISO_SVG_CLASS,
  IsoDefs,
  isoDetail,
  IsoPipe,
  IsoPlate,
  isoProjection,
  isoShadow,
  IsoSolid,
} from "../anatomy"
import { usePartState } from "../diagram-hover"

import {
  SOURCE_VERIFY_SIZE,
  type SourceVerifyLink,
  type SourceVerifyPart,
  type SourceVerifyView,
} from "./model"

/*
 * Isometric drawing of source code verification. Server-rendered with the
 * player.
 *
 * The verifier's bench, back lane: source files and the compiler settings
 * feed the compiler, which lays down the recompiled bytecode. Front lane, on
 * its own pad: a short chain of blocks holding the deployed contract, whose
 * code is read into a second bytecode strip. Each strip ends in a short
 * segment, the metadata hash. Both strips run into the verifier at the back
 * end of the bench, which compares them.
 */

const { width: W, height: H } = SOURCE_VERIFY_SIZE
const PROJECTION = isoProjection(168, 57)
const { P, path, box, footprint } = PROJECTION
const D = isoDetail(PROJECTION)
const SHADOW = "source-verify-shadow"

type Box = [number, number, number, number, number, number]

/* ---------- Geometry ---------- */

const BENCH_BOX: Box = [-12, -48, -6, 245, 138, 6]
const BENCH = box(...BENCH_BOX)

// Back lane: sources and settings into the compiler, then its bytecode.
const SOURCE_BOXES: Box[] = [0, 6, 12].map((z) => [0, 2, z, 28, 25, 5])
const SOURCES = SOURCE_BOXES.map((b) => box(...b))
const SETTINGS_BOX: Box = [45, -38, 0, 28, 20, 10]
const SETTINGS = box(...SETTINGS_BOX)
const COMPILER_BOX: Box = [42, -2, 0, 33, 35, 30]
const COMPILER = box(...COMPILER_BOX)

// Bytecode strips, one per lane: the code, then the metadata hash at its end.
const LANE_BACK = 8
const LANE_FRONT = 62
const STRIP_D = 15
const strip = (y: number) => ({
  code: [90, y, 0, 75, STRIP_D, 7] as Box,
  meta: [167, y, 0, 15, STRIP_D, 7] as Box,
})
const STRIP_END = 182
const RECOMPILED_BOXES = strip(LANE_BACK)
const DEPLOYED_BOXES = strip(LANE_FRONT)
const RECOMPILED = box(...RECOMPILED_BOXES.code)
const RECOMPILED_META = box(...RECOMPILED_BOXES.meta)
const DEPLOYED = box(...DEPLOYED_BOXES.code)
const DEPLOYED_META = box(...DEPLOYED_BOXES.meta)

// Front lane: a short chain of blocks, one holding the deployed contract.
const BLOCKS = [0, 20, 40].map((x) => box(x, LANE_FRONT, 0, 15, 15, 15))
const MID_BACK = LANE_BACK + STRIP_D / 2
const MID_FRONT = LANE_FRONT + STRIP_D / 2
// The links between blocks, low enough to hide in them.
const BLOCK_LINK = path(7, [7, MID_FRONT], [47, MID_FRONT])

const VERIFIER_BOX: Box = [197, 0, 0, 22, 85, 20]
const VERIFIER = box(...VERIFIER_BOX)

const LINKS: Record<SourceVerifyLink, string> = {
  // Sources' end face into the compiler's hidden back face.
  sources: path(8, [28, 14], [42, 14]),
  // Settings' start face into the compiler's hidden back face.
  settings: path(5, [59, -18], [59, -2]),
  // Compiler's end face into the recompiled strip.
  compiled: path(3.5, [75, MID_BACK], [90, MID_BACK]),
  // The last block's end face to the deployed strip.
  "get-code": path(3.5, [55, MID_FRONT], [90, MID_FRONT]),
  // Each strip's end face into the verifier's hidden face.
  "compare-recompiled": path(3.5, [STRIP_END, MID_BACK], [197, MID_BACK]),
  "compare-deployed": path(3.5, [STRIP_END, MID_FRONT], [197, MID_FRONT]),
}

/* ---------- Static detail and shadows ---------- */

const SHADOWS = (
  <g className="pointer-events-none">
    {isoShadow(footprint(-8, -44, 245, 138, -22, 6), SHADOW)}
  </g>
)
const CONTACT_SHADOWS = (
  <g className="pointer-events-none">
    {isoShadow(footprint(2, 4, 28, 25, 0, 3), SHADOW)}
    {isoShadow(footprint(47, -36, 28, 20, 0, 3), SHADOW)}
    {isoShadow(footprint(44, 0, 33, 35, 0, 4), SHADOW)}
    {isoShadow(footprint(2, LANE_FRONT + 2, 55, 15, 0, 3), SHADOW)}
    {isoShadow(footprint(199, 2, 22, 85, 0, 4), SHADOW)}
  </g>
)
const BENCH_DETAIL = D.inset([-12, -48, 0, 245, 138], 4)
const COMPILER_DETAIL = (
  <>
    {D.seams(COMPILER_BOX, { end: [0.5], ring: 0.16 })}
    {D.vents(33, 48, 69, [12, 16, 20])}
  </>
)
const SETTINGS_DETAIL = (
  <>
    {D.slot(10, 50, 68, -32)}
    {D.slot(10, 50, 62, -26)}
  </>
)
// Byte boundaries along each strip's code.
const BYTE_SEAMS = [0.2, 0.4, 0.6, 0.8]
const RECOMPILED_DETAIL = D.seams(RECOMPILED_BOXES.code, { start: BYTE_SEAMS })
const DEPLOYED_DETAIL = D.seams(DEPLOYED_BOXES.code, { start: BYTE_SEAMS })
const VERIFIER_DETAIL = D.seams(VERIFIER_BOX, { end: [0.2, 0.8], ring: 0.5 })

/* ---------- Labels ---------- */

const SPOTS: AnatomyLabelSpot[] = [
  {
    id: "compiler",
    tone: "entity",
    target: P(58, 10, 30),
    anchor: [P(58, 10, 30)[0], 22],
    placement: "above",
  },
  {
    id: "deployed",
    tone: "entity",
    target: P(110, 77, 0),
    anchor: [176, 176],
    placement: "start",
  },
  {
    id: "recompiled",
    tone: "entity",
    target: P(165, 8, 7),
    anchor: [398, 90],
    placement: "above",
  },
  {
    id: "metadata",
    tone: "entity",
    target: P(175, 77, 0),
    anchor: [P(175, 77, 0)[0], 228],
    placement: "below",
  },
  {
    id: "verifier",
    tone: "entity",
    target: P(219, 85, 0),
    elbow: [330, P(219, 85, 0)[1]],
    anchor: [330, 214],
    placement: "below",
  },
  {
    id: "sources",
    tone: "entity",
    target: P(0, 14, 12),
    anchor: [140, 52],
    placement: "start",
  },
  {
    id: "chain",
    tone: "entity",
    target: P(0, 70, 0),
    anchor: [92, 122],
    placement: "start",
  },
  {
    id: "settings",
    tone: "entity",
    target: P(73, -30, 10),
    anchor: [322, 50],
    placement: "above",
  },
]

/* ---------- Rig ---------- */

interface SourceVerifyRigProps {
  view: SourceVerifyView
  /** Changes on every step, to restart one-shot animations. */
  runKey: string
  labels: Record<SourceVerifyPart, ReactNode>
  definitions: Record<SourceVerifyPart, ReactNode>
  className?: string
}

const pct = (value: number, of: number) => `${(value / of) * 100}%`
const BADGE_AT = P(219, 42, 10)

function SourceVerifyRig({
  view,
  runKey,
  labels,
  definitions,
  className,
}: SourceVerifyRigProps) {
  const t = useTranslations("component-diagrams")
  const { state, dimmed } = usePartState(view.litPart)
  const part = (name: SourceVerifyPart) => ({
    "data-part": name,
    className: ISO_DIM_CLASS,
    style: { opacity: dimmed(name) ? 0.7 : 1 },
  })
  const pipe = (name: SourceVerifyLink, owner: SourceVerifyPart) => (
    <IsoPipe
      d={LINKS[name]}
      hue="entity"
      flowing={!!view.flows[name]}
      flowKey={runKey}
      state={state(owner)}
    />
  )
  // A strip that doesn't exist yet is a dashed outline.
  const pending = (ready: boolean) => (ready ? undefined : "2 2")
  const differs = (comparison: SourceVerifyView["code"]) =>
    comparison === "differs" ? "stroke-diagram-revert" : undefined

  return (
    <div className={cn("relative", className)}>
      <svg
        aria-hidden
        data-anatomy-drawing=""
        viewBox={`0 0 ${W} ${H}`}
        {...DIAGRAM_SVG_FALLBACKS}
        className={ISO_SVG_CLASS}
      >
        <IsoDefs id={SHADOW} />
        {SHADOWS}

        <IsoPlate box={BENCH} />
        {BENCH_DETAIL}
        {CONTACT_SHADOWS}

        <g {...part("settings")}>
          <IsoSolid box={SETTINGS} hue="entity" state={state("settings")} />
          {SETTINGS_DETAIL}
        </g>
        <g {...part("settings")}>{pipe("settings", "settings")}</g>

        <g {...part("sources")}>
          {SOURCES.map((source) => (
            <IsoSolid
              key={source.top}
              box={source}
              hue="entity"
              state={state("sources")}
            />
          ))}
        </g>
        <g {...part("sources")}>{pipe("sources", "sources")}</g>

        <g {...part("compiler")}>
          <IsoSolid box={COMPILER} hue="entity" state={state("compiler")} />
          {COMPILER_DETAIL}
        </g>
        <g {...part("compiler")}>{pipe("compiled", "compiler")}</g>

        <g {...part("recompiled")} strokeDasharray={pending(view.compiled)}>
          <IsoSolid
            box={RECOMPILED}
            hue="entity"
            state={state("recompiled")}
            className={differs(view.code)}
          />
          {RECOMPILED_DETAIL}
        </g>
        <g {...part("metadata")} strokeDasharray={pending(view.compiled)}>
          <IsoSolid
            box={RECOMPILED_META}
            hue="entity"
            state={state("metadata")}
            className={differs(view.metadata)}
          />
        </g>

        <g {...part("chain")}>
          <path
            d={BLOCK_LINK}
            fill="none"
            className="stroke-diagram-pipe [stroke-width:1.4]"
          />
          {BLOCKS.map((block) => (
            <IsoSolid
              key={block.top}
              box={block}
              hue="entity"
              state={state("chain")}
            />
          ))}
        </g>

        <g {...part("chain")}>{pipe("get-code", "deployed")}</g>

        <g {...part("deployed")} strokeDasharray={pending(view.fetched)}>
          <IsoSolid box={DEPLOYED} hue="entity" state={state("deployed")} />
          {DEPLOYED_DETAIL}
        </g>
        <g {...part("metadata")} strokeDasharray={pending(view.fetched)}>
          <IsoSolid
            box={DEPLOYED_META}
            hue="entity"
            state={state("metadata")}
          />
        </g>

        <g {...part("verifier")}>
          {pipe("compare-recompiled", "verifier")}
          {pipe("compare-deployed", "verifier")}
          <IsoSolid box={VERIFIER} hue="entity" state={state("verifier")} />
          {VERIFIER_DETAIL}
        </g>
      </svg>

      {view.result && (
        <span
          key={view.result}
          className={cn(
            "pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 animate-diagram-pop rounded-base border bg-diagram-entity-fill px-2 py-0.5 text-sm font-bold whitespace-nowrap motion-reduce:animate-none rtl:translate-x-1/2",
            view.result === "none"
              ? "border-diagram-revert text-diagram-revert"
              : "border-diagram-entity text-diagram-entity"
          )}
          style={{
            insetInlineStart: pct(BADGE_AT[0], W),
            top: pct(BADGE_AT[1], H),
          }}
        >
          {t(`source-verify-result-${view.result}`)}
        </span>
      )}

      <AnatomyLabels
        width={W}
        height={H}
        spots={SPOTS}
        labels={labels}
        definitions={definitions}
        litId={view.litPart}
      />
    </div>
  )
}

// Memoised: the player re-renders on visibility and run state; the drawing
// only needs to when its view, labels or hover state change.
export default memo(SourceVerifyRig)
