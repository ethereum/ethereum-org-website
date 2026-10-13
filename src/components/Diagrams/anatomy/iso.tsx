import type { CSSProperties } from "react"

import { cn } from "@/lib/utils/cn"

import {
  ANATOMY_LIT_STROKE,
  ANATOMY_STROKE,
  anatomyFill,
  type AnatomyHue,
  anatomyStrong,
  DIAGRAM_COLOR,
} from "./tokens"

/*
 * Isometric geometry and solids shared by anatomy diagrams.
 *
 * World axes: x runs back-left to front-right, y back-right to front-left,
 * z up. A box shows its top, its `start` face (the y-max plane, facing the
 * inline-start side) and its `end` face (the x-max plane). The whole SVG is
 * mirrored in RTL, so start/end stay true to reading direction.
 */

export type Point = [number, number]

export const r1 = (n: number) => Math.round(n * 10) / 10

const COS30 = Math.cos(Math.PI / 6)

export interface IsoBox {
  top: string
  start: string
  end: string
}

export interface IsoCylinderGeometry {
  body: string
  top: { cx: number; cy: number; rx: number; ry: number }
  /** Box a level fill spans, from the bottom of the body to its top. */
  fill: { x: number; y: number; width: number; height: number }
}

/** A projection with its origin (the plate's back corner) in viewBox units. */
export function isoProjection(originX: number, originY: number) {
  const P = (x: number, y: number, z = 0): Point => [
    r1(originX + (x - y) * COS30),
    r1(originY + (x + y) * 0.5 - z),
  ]
  const pts = (...ps: Point[]) => ps.map((p) => p.join(",")).join(" ")
  const line = (...ps: Point[]) =>
    ps.map((p, i) => `${i === 0 ? "M" : "L"}${p.join(",")}`).join(" ")

  /** Polyline through world points at one height (pipes). */
  const path = (z: number, ...xy: [number, number][]) =>
    line(...xy.map(([x, y]) => P(x, y, z)))

  const box = (
    x: number,
    y: number,
    z: number,
    w: number,
    d: number,
    h: number
  ): IsoBox => {
    const t = z + h
    return {
      top: pts(P(x, y, t), P(x + w, y, t), P(x + w, y + d, t), P(x, y + d, t)),
      start: pts(
        P(x, y + d, z),
        P(x + w, y + d, z),
        P(x + w, y + d, t),
        P(x, y + d, t)
      ),
      end: pts(
        P(x + w, y, z),
        P(x + w, y + d, z),
        P(x + w, y + d, t),
        P(x + w, y, t)
      ),
    }
  }

  /** A circle lying on a horizontal plane, as ellipse props. */
  const disc = (x: number, y: number, z: number, r: number) => {
    const [cx, cy] = P(x, y, z)
    return {
      cx,
      cy,
      rx: r1(r * Math.SQRT2 * COS30),
      ry: r1(r * Math.SQRT1_2),
    }
  }

  const cylinder = (
    x: number,
    y: number,
    z: number,
    r: number,
    h: number
  ): IsoCylinderGeometry => {
    const base = disc(x, y, z, r)
    const top = disc(x, y, z + h, r)
    const l = r1(base.cx - base.rx)
    const rt = r1(base.cx + base.rx)
    return {
      body: `M${l},${top.cy} L${l},${base.cy} A${base.rx},${base.ry} 0 0 0 ${rt},${base.cy} L${rt},${top.cy} Z`,
      top,
      fill: {
        x: l,
        y: top.cy,
        width: r1(2 * base.rx),
        height: r1(base.cy + base.ry - top.cy),
      },
    }
  }

  return { P, line, path, box, disc, cylinder }
}

/**
 * Classes for the diagram's root `<svg>`: thin strokes at any size
 * (non-scaling), mirrored in RTL, never clipped. Also give the root
 * `data-anatomy-drawing` so AnatomyLabels keeps labels off its shapes.
 */
export const ISO_SVG_CLASS =
  "block h-auto w-full overflow-visible text-diagram-edge rtl:-scale-x-100 [stroke-width:1] [&_*]:[vector-effect:non-scaling-stroke]"

const TRANSITION =
  "transition-transform duration-700 ease-out motion-reduce:transition-none"
/** Classes for a level fill that scales up from its bottom edge. */
export const ISO_LEVEL_CLASS = cn(
  "origin-bottom [transform-box:fill-box]",
  TRANSITION
)

const COLOR_TRANSITION =
  "transition-[fill,stroke] duration-700 ease-out motion-reduce:transition-none"

/**
 * A box solid: three faces tinted from one hue, 1px outline. `glow` (0-1)
 * heats its top face and outline toward the gas hue alone (never a blend of
 * blue and orange, which reads purple), e.g. a contract burning gas.
 * `glowDelay` holds the change until an earlier motion has finished.
 */
export function IsoSolid({
  box,
  hue,
  lit,
  glow = 0,
  glowDelay,
  className,
}: {
  box: IsoBox
  hue: AnatomyHue
  lit?: boolean
  glow?: number
  glowDelay?: string
  className?: string
}) {
  const heat = Math.max(0, Math.min(1, glow))
  return (
    <g
      className={cn(
        "[stroke-linejoin:round]",
        lit ? ANATOMY_LIT_STROKE[hue] : ANATOMY_STROKE[hue],
        className
      )}
    >
      <polygon points={box.start} style={{ fill: anatomyFill(hue, "start") }} />
      <polygon points={box.end} style={{ fill: anatomyFill(hue, "end") }} />
      <polygon
        points={box.top}
        className={COLOR_TRANSITION}
        style={{
          // Same three-tint family, switched to the gas hue: 15% at no burn
          // up to 45% at a full burn.
          fill:
            heat > 0
              ? `color-mix(in oklab, ${DIAGRAM_COLOR.gas} ${Math.round(15 + 30 * heat)}%, ${DIAGRAM_COLOR.bg})`
              : anatomyFill(hue, "top"),
          transitionDelay: glowDelay,
        }}
      />
      {/* Glowing outline over the top face: orange, stronger with more burn. */}
      <polygon
        points={box.top}
        fill="none"
        className={COLOR_TRANSITION}
        style={{
          stroke:
            heat > 0
              ? `color-mix(in oklab, ${DIAGRAM_COLOR.gas} ${Math.round(50 + 50 * heat)}%, ${DIAGRAM_COLOR.bg})`
              : "none",
          strokeWidth: heat > 0 ? 2 : 1,
          transitionDelay: glowDelay,
        }}
      />
    </g>
  )
}

/** The world-state plate: a neutral slab under everything. */
export function IsoPlate({
  box,
  lit,
  className,
}: {
  box: IsoBox
  lit?: boolean
  className?: string
}) {
  return (
    <g data-anatomy-plate="">
      <IsoSolid box={box} hue="neutral" lit={lit} className={className} />
    </g>
  )
}

/**
 * A vertical cylinder (e.g. a tank). With `level` (0-1) it shows a fill of
 * the hue rising from the bottom; `levelStyle` can delay the transition.
 */
export function IsoCylinder({
  geometry,
  hue,
  clipId,
  level,
  levelStyle,
  lit,
}: {
  geometry: IsoCylinderGeometry
  hue: Exclude<AnatomyHue, "neutral">
  /** Unique id for the body's clip path (from `useId`). */
  clipId: string
  level?: number
  levelStyle?: CSSProperties
  lit?: boolean
}) {
  const stroke = lit ? ANATOMY_LIT_STROKE[hue] : ANATOMY_STROKE[hue]
  return (
    <g>
      <clipPath id={clipId}>
        {/* Never painted, but given a token fill so no paint resolves to black. */}
        <path d={geometry.body} style={{ fill: anatomyFill(hue, "start") }} />
      </clipPath>
      <path
        d={geometry.body}
        className={stroke}
        style={{ fill: anatomyFill(hue, "start") }}
      />
      {level !== undefined && (
        <g clipPath={`url(#${clipId})`}>
          <rect
            {...geometry.fill}
            stroke="none"
            className={ISO_LEVEL_CLASS}
            style={{
              fill: anatomyStrong(hue),
              transform: `scaleY(${level})`,
              ...levelStyle,
            }}
          />
        </g>
      )}
      <ellipse
        {...geometry.top}
        className={stroke}
        style={{ fill: anatomyFill(hue, "top") }}
      />
    </g>
  )
}

/**
 * A pipe: a neutral tube at rest (a stroke with a thin highlight down its
 * middle). While gas flows through it, it turns orange with a one-shot dash
 * flow (static under reduced motion). Change `flowKey` to restart the flow.
 */
export function IsoPipe({
  d,
  flowing,
  flowD,
  flowKey,
  flowEmphasis,
  className,
}: {
  d: string
  flowing?: boolean
  /** A stronger, longer pulse (e.g. an expensive operation). */
  flowEmphasis?: boolean
  /** The stretch gas flows along, if not the whole pipe. */
  flowD?: string
  flowKey?: string
  className?: string
}) {
  return (
    <g
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d={d} className="stroke-diagram-pipe [stroke-width:2.5]" />
      <path d={d} className="stroke-diagram-plate [stroke-width:0.75]" />
      {flowing && (
        <path
          key={flowKey}
          d={flowD ?? d}
          strokeDasharray="5 6"
          className={cn(
            "animate-diagram-flow stroke-diagram-gas motion-reduce:animate-none",
            flowEmphasis
              ? "[stroke-width:4] [animation-duration:1400ms]"
              : "[stroke-width:2.5]"
          )}
        />
      )}
    </g>
  )
}
