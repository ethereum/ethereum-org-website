import type { CSSProperties } from "react"

import { cn } from "@/lib/utils/cn"

import {
  anatomyFill,
  type AnatomyHue,
  type AnatomyState,
  anatomyStroke,
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

  /** A footprint on the ground (z), grown by `pad` on every side. */
  const footprint = (
    x: number,
    y: number,
    w: number,
    d: number,
    z = 0,
    pad = 0
  ) =>
    pts(
      P(x - pad, y - pad, z),
      P(x + w + pad, y - pad, z),
      P(x + w + pad, y + d + pad, z),
      P(x - pad, y + d + pad, z)
    )

  return { P, pts, line, path, box, disc, cylinder, footprint }
}

export type IsoProjection = ReturnType<typeof isoProjection>

/**
 * Classes for the diagram's root `<svg>`: hairline strokes at any size
 * (1px, non-scaling), mirrored in RTL, never clipped. Also give the root
 * `data-anatomy-drawing` so AnatomyLabels keeps labels off its shapes. When
 * the diagram is off screen (`data-paused` on an ancestor) its animations
 * hold still.
 */
export const ISO_SVG_CLASS =
  "block h-auto w-full overflow-visible text-diagram-line rtl:-scale-x-100 [stroke-width:1] [&_*]:[vector-effect:non-scaling-stroke] [[data-paused]_&_*]:[animation-play-state:paused]"

/** Classes for a level fill that scales up from its bottom edge. */
export const ISO_LEVEL_CLASS =
  "origin-bottom [transform-box:fill-box] transition-transform duration-700 ease-out motion-reduce:transition-none"

/** Classes for a part that dims while another part is hovered. */
export const ISO_DIM_CLASS =
  "transition-opacity duration-200 motion-reduce:transition-none"

/**
 * Shared defs for one drawing: the soft radial gradient every shadow uses.
 * Give each diagram its own `id`; shadows reference `url(#<id>)`.
 */
export function IsoDefs({ id }: { id: string }) {
  return (
    <defs>
      <radialGradient id={id} cx="50%" cy="50%" r="50%">
        <stop
          offset="0%"
          style={{ stopColor: DIAGRAM_COLOR.shadow, stopOpacity: 0.16 }}
        />
        <stop
          offset="55%"
          style={{ stopColor: DIAGRAM_COLOR.shadow, stopOpacity: 0.08 }}
        />
        <stop
          offset="100%"
          style={{ stopColor: DIAGRAM_COLOR.shadow, stopOpacity: 0 }}
        />
      </radialGradient>
    </defs>
  )
}

/**
 * A static soft shadow: a footprint filled with the drawing's shadow
 * gradient. No filters or blur. Use under the plate (ground shadow) and under
 * objects (contact shadow); build it once, at module level.
 */
export function isoShadow(points: string, gradientId: string) {
  return (
    <polygon
      points={points}
      stroke="none"
      fill={`url(#${gradientId})`}
      data-anatomy-shadow=""
      className="pointer-events-none"
    />
  )
}

/**
 * A box solid: three faces tinted from one hue, hairline outline. `state`
 * picks the tints and outline: light at rest, the role colour when active in
 * this step, the strongest line when hovered. `glow` (0-1) heats its top face
 * toward the gas hue alone (never a blend of blue and orange, which reads
 * purple), e.g. a contract burning gas; it fades in (opacity only) after
 * `glowDelay`.
 */
export function IsoSolid({
  box,
  hue,
  state = "rest",
  glow = 0,
  glowDelay,
  className,
}: {
  box: IsoBox
  hue: AnatomyHue
  state?: AnatomyState
  glow?: number
  glowDelay?: string
  className?: string
}) {
  const heat = Math.max(0, Math.min(1, glow))
  return (
    <g
      className={cn(
        "[stroke-linejoin:round]",
        anatomyStroke(hue, state),
        className
      )}
    >
      <polygon
        points={box.start}
        style={{ fill: anatomyFill(hue, "start", state) }}
      />
      <polygon
        points={box.end}
        style={{ fill: anatomyFill(hue, "end", state) }}
      />
      <polygon
        points={box.top}
        style={{ fill: anatomyFill(hue, "top", state) }}
      />
      {/* Heat: an orange top face and outline over the top, faded in. */}
      <polygon
        points={box.top}
        className="stroke-diagram-gas transition-opacity duration-700 ease-out motion-reduce:transition-none"
        style={{
          fill: `color-mix(in oklab, ${DIAGRAM_COLOR.gas} ${Math.round(15 + 30 * heat)}%, ${DIAGRAM_COLOR.bg})`,
          opacity: heat > 0 ? 1 : 0,
          transitionDelay: heat > 0 ? glowDelay : "0ms",
        }}
      />
    </g>
  )
}

/** The world-state plate: a neutral slab under everything. */
export function IsoPlate({
  box,
  state = "rest",
  className,
}: {
  box: IsoBox
  state?: AnatomyState
  className?: string
}) {
  return (
    <g data-anatomy-plate="">
      <IsoSolid box={box} hue="neutral" state={state} className={className} />
    </g>
  )
}

/**
 * A vertical cylinder (e.g. a tank). With `level` (0-1) it shows a fill of
 * the hue rising from the bottom (a transform); `levelStyle` can delay it.
 */
export function IsoCylinder({
  geometry,
  hue,
  clipId,
  level,
  levelStyle,
  state = "rest",
}: {
  geometry: IsoCylinderGeometry
  hue: Exclude<AnatomyHue, "neutral">
  /** Unique id for the body's clip path. */
  clipId: string
  level?: number
  levelStyle?: CSSProperties
  state?: AnatomyState
}) {
  const stroke = anatomyStroke(hue, state)
  return (
    <g>
      <clipPath id={clipId}>
        {/* Never painted, but given a token fill so no paint resolves to black. */}
        <path d={geometry.body} style={{ fill: anatomyFill(hue, "start") }} />
      </clipPath>
      <path
        d={geometry.body}
        className={stroke}
        style={{ fill: anatomyFill(hue, "start", state) }}
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
        style={{ fill: anatomyFill(hue, "top", state) }}
      />
    </g>
  )
}

/**
 * A pipe: a thin neutral tube at rest (a stroke with a hairline highlight
 * down its middle). While gas flows through it, a one-shot orange dash flow
 * runs along it (static under reduced motion). Change `flowKey` to restart.
 */
export function IsoPipe({
  d,
  flowing,
  flowD,
  flowKey,
  flowEmphasis,
  state = "rest",
  className,
}: {
  d: string
  flowing?: boolean
  /** A stronger, longer pulse (e.g. an expensive operation). */
  flowEmphasis?: boolean
  /** The stretch gas flows along, if not the whole pipe. */
  flowD?: string
  flowKey?: string
  state?: AnatomyState
  className?: string
}) {
  return (
    <g
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path
        d={d}
        className={cn(
          "[stroke-width:1.4]",
          state === "hover"
            ? "stroke-diagram-line-strong"
            : "stroke-diagram-pipe"
        )}
      />
      <path d={d} className="stroke-diagram-plate [stroke-width:0.4]" />
      {flowing && (
        <path
          key={flowKey}
          d={flowD ?? d}
          strokeDasharray="4 5"
          className={cn(
            "animate-diagram-flow stroke-diagram-gas motion-reduce:animate-none",
            flowEmphasis
              ? "[stroke-width:2] [animation-duration:1400ms]"
              : "[stroke-width:1.4]"
          )}
        />
      )}
    </g>
  )
}
