/*
 * Minimal isometric projection, adapted from the devdocs diagram primitives
 * (PRs 19456/19467/19662). x runs to the front-right, y to the front-left,
 * z up.
 */

export type Point = [number, number]

const COS30 = Math.cos(Math.PI / 6)
const r1 = (n: number) => Math.round(n * 10) / 10

export const isoProjection = (originX: number, originY: number) => {
  const P = (x: number, y: number, z = 0): Point => [
    r1(originX + (x - y) * COS30),
    r1(originY + (x + y) * 0.5 - z),
  ]
  const pts = (...ps: Point[]) => ps.map((p) => p.join(",")).join(" ")

  const box = (
    x: number,
    y: number,
    z: number,
    w: number,
    d: number,
    h: number
  ) => {
    const t = z + h
    return {
      top: pts(P(x, y, t), P(x + w, y, t), P(x + w, y + d, t), P(x, y + d, t)),
      left: pts(
        P(x, y + d, z),
        P(x + w, y + d, z),
        P(x + w, y + d, t),
        P(x, y + d, t)
      ),
      right: pts(
        P(x + w, y, z),
        P(x + w, y + d, z),
        P(x + w, y + d, t),
        P(x + w, y, t)
      ),
    }
  }

  const disc = (x: number, y: number, z: number, r: number) => {
    const [cx, cy] = P(x, y, z)
    return { cx, cy, rx: r1(r * Math.SQRT2 * COS30), ry: r1(r * Math.SQRT1_2) }
  }

  const cylinder = (x: number, y: number, z: number, r: number, h: number) => {
    const base = disc(x, y, z, r)
    const top = disc(x, y, z + h, r)
    const l = r1(base.cx - base.rx)
    const rt = r1(base.cx + base.rx)
    return {
      body: `M${l},${top.cy} L${l},${base.cy} A${base.rx},${base.ry} 0 0 0 ${rt},${base.cy} L${rt},${top.cy} Z`,
      top,
      base,
    }
  }

  return { P, pts, box, disc, cylinder }
}
