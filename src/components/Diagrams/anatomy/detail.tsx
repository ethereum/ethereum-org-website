import type { ReactElement } from "react"

import type { IsoCylinderGeometry, IsoProjection } from "./iso"
import { r1 } from "./iso"
import { anatomyFill, type AnatomyHue } from "./tokens"

/*
 * Static detail for anatomy drawings: the small mechanical marks that say
 * what a part is (seams, a label plate, a rim and level marks, a bevel, a
 * slot). Every helper returns an element meant to be built once, at module
 * level, and rendered as-is: React skips an element it has seen before, so a
 * step change or a hover never re-renders the detail.
 *
 * All detail is drawn in `line-faint` hairlines and never takes pointer
 * events or animates.
 */

const DETAIL = "pointer-events-none stroke-diagram-line-faint"

type Seg = [[number, number, number], [number, number, number]]

export function isoDetail({ P, pts, line, disc }: IsoProjection) {
  const segs = (segments: Seg[], key = "d") => (
    <g className={DETAIL} fill="none" strokeLinecap="round">
      {segments.map(([a, b], i) => (
        <path key={`${key}-${i}`} d={line(P(...a), P(...b))} />
      ))}
    </g>
  )

  /**
   * Seams on a box's two visible side faces: vertical lines at the given
   * fractions of its width (end face, x-max) and depth (start face, y-max).
   */
  const seams = (
    [x, y, z, w, d, h]: [number, number, number, number, number, number],
    {
      start = [],
      end = [],
      ring,
    }: { start?: number[]; end?: number[]; ring?: number }
  ) =>
    segs([
      ...start.map(
        (f): Seg => [
          [x + w * f, y + d, z],
          [x + w * f, y + d, z + h],
        ]
      ),
      ...end.map(
        (f): Seg => [
          [x + w, y + d * f, z],
          [x + w, y + d * f, z + h],
        ]
      ),
      // A horizontal band round both faces, e.g. a lid line.
      ...(ring !== undefined
        ? ([
            [
              [x, y + d, z + h * ring],
              [x + w, y + d, z + h * ring],
            ],
            [
              [x + w, y + d, z + h * ring],
              [x + w, y, z + h * ring],
            ],
          ] as Seg[])
        : []),
    ])

  /** A small plate on a box's start face (y = const), e.g. an account's name plate. */
  const plate = (
    y: number,
    x0: number,
    x1: number,
    z0: number,
    z1: number,
    hue: AnatomyHue = "neutral"
  ) => (
    <g className={DETAIL}>
      <polygon
        points={pts(P(x0, y, z0), P(x1, y, z0), P(x1, y, z1), P(x0, y, z1))}
        style={{ fill: anatomyFill(hue, "top") }}
      />
      <path
        fill="none"
        d={line(
          P(x0 + (x1 - x0) * 0.2, y, (z0 + z1) / 2),
          P(x1 - (x1 - x0) * 0.2, y, (z0 + z1) / 2)
        )}
      />
    </g>
  )

  /** An inset outline on a top face: a bevel round a plate, or a lid. */
  const inset = (
    [x, y, z, w, d]: [number, number, number, number, number],
    by: number
  ) => (
    <polygon
      className={DETAIL}
      fill="none"
      points={pts(
        P(x + by, y + by, z),
        P(x + w - by, y + by, z),
        P(x + w - by, y + d - by, z),
        P(x + by, y + d - by, z)
      )}
    />
  )

  /** A rim on a cylinder's top and level marks down its front. */
  const cylinderMarks = (
    geometry: IsoCylinderGeometry,
    { marks = 3, rimInset = 0.8 }: { marks?: number; rimInset?: number } = {}
  ) => {
    const { cx, cy, rx, ry } = geometry.top
    const { y: top, height } = geometry.fill
    const bottom = top + height - ry
    const x0 = r1(cx - rx * 0.62)
    return (
      <g className={DETAIL} fill="none" strokeLinecap="round">
        <ellipse
          cx={cx}
          cy={cy}
          rx={r1(rx * rimInset)}
          ry={r1(ry * rimInset)}
        />
        {Array.from({ length: marks }, (_, i) => {
          const yy = r1(
            top + ((bottom - top) * (i + 1)) / (marks + 1) + ry * 0.7
          )
          return (
            <path
              key={i}
              d={`M${x0},${yy} L${r1(x0 + rx * (i % 2 ? 0.18 : 0.3))},${yy}`}
            />
          )
        })}
      </g>
    )
  }

  /** A slot cut in a top face (z), e.g. on a transaction slip or a tray. */
  const slot = (z: number, x0: number, x1: number, y: number) =>
    segs([
      [
        [x0, y, z],
        [x1, y, z],
      ],
    ])

  /** Vent lines on a start face: short horizontal strokes. */
  const vents = (
    y: number,
    x0: number,
    x1: number,
    zs: number[]
  ): ReactElement =>
    segs(
      zs.map(
        (z): Seg => [
          [x0, y, z],
          [x1, y, z],
        ]
      )
    )

  /** A ring on the ground (z) round a footprint, e.g. a cylinder's base flange. */
  const flange = (x: number, y: number, z: number, r: number) => {
    const e = disc(x, y, z, r)
    return <ellipse className={DETAIL} fill="none" {...e} />
  }

  return { segs, seams, plate, inset, cylinderMarks, slot, vents, flange }
}
