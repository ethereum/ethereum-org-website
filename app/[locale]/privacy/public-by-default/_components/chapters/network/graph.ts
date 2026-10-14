import { createRandom } from "@/components/PrivacyWidgets/shared/random"

export type LayoutKind = "wide" | "narrow"

export interface Point {
  x: number
  y: number
}

export interface GossipLayout {
  width: number
  height: number
  you: Point
  relay: Point
  builder: Point
  nodes: Point[]
  /** Indices into `nodes` of the listening nodes, labelled A-E in order */
  listeners: number[]
  /** Undirected links; `YOU` stands for your node */
  edges: [number, number][]
  /** When each node first receives the transaction (abstract units) */
  arrival: number[]
  /** The peer each node first heard it from (`YOU` for your node) */
  parent: number[]
  /** Hops from your node to each node along that first path */
  hops: number[]
  maxArrival: number
}

/** Index used for your own node in `edges` and `parent` */
export const YOU = -1

const SPECS: Record<
  LayoutKind,
  { width: number; height: number; count: number; minGap: number }
> = {
  wide: { width: 800, height: 440, count: 44, minGap: 72 },
  narrow: { width: 400, height: 560, count: 30, minGap: 56 },
}

const LISTENER_COUNT = 5
const dist = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y)

const generate = (kind: LayoutKind, seed: number): GossipLayout => {
  const { width, height, count, minGap } = SPECS[kind]
  const random = createRandom(seed)
  const pad = 28
  // The top band holds the private relay and the block builder
  const top = kind === "wide" ? 96 : 104
  const you: Point = { x: pad + 12, y: (top + height) / 2 }
  const relay: Point = { x: width * 0.5, y: 44 }
  const builder: Point = { x: width - pad - 30, y: 44 }

  const nodes: Point[] = []
  for (let tries = 0; nodes.length < count && tries < 4000; tries++) {
    const p = {
      x: pad + 70 + random.next() * (width - 2 * pad - 70),
      y: top + random.next() * (height - top - pad),
    }
    if (dist(p, you) < minGap) continue
    if (nodes.every((n) => dist(n, p) >= minGap)) nodes.push(p)
  }

  // Listeners: spread out (farthest-point sampling), away from your node
  const candidates = nodes
    .map((_, i) => i)
    .filter((i) => dist(nodes[i], you) > width * 0.22)
  const listeners: number[] = [
    candidates.reduce((best, i) =>
      dist(nodes[i], you) < dist(nodes[best], you) ? i : best
    ),
  ]
  while (listeners.length < LISTENER_COUNT) {
    const next = candidates
      .filter((i) => !listeners.includes(i))
      .reduce(
        (best, i) => {
          const score = Math.min(
            ...listeners.map((l) => dist(nodes[i], nodes[l]))
          )
          const bestScore = Math.min(
            ...listeners.map((l) => dist(nodes[best], nodes[l]))
          )
          return score > bestScore ? i : best
        },
        candidates.find((i) => !listeners.includes(i))!
      )
    listeners.push(next)
  }
  // Label A-E from your side outwards
  listeners.sort((a, b) => nodes[a].x - nodes[b].x)

  const pos = (i: number) => (i === YOU ? you : nodes[i])
  const nearest = (from: number, k: number) =>
    nodes
      .map((_, i) => i)
      .filter((i) => i !== from)
      .sort((a, b) => dist(pos(from), nodes[a]) - dist(pos(from), nodes[b]))
      .slice(0, k)

  const weights = new Map<string, number>()
  const edges: [number, number][] = []
  const link = (a: number, b: number, jitter: [number, number]) => {
    const key = a < b ? `${a}:${b}` : `${b}:${a}`
    if (weights.has(key)) return
    const f = jitter[0] + random.next() * (jitter[1] - jitter[0])
    weights.set(key, dist(pos(a), pos(b)) * f)
    edges.push([a, b])
  }
  nearest(YOU, 3).forEach((i) => link(YOU, i, [1, 1.5]))
  nodes.forEach((_, i) => nearest(i, 3).forEach((j) => link(i, j, [1, 1.5])))
  // Listeners keep many peers, your node among them, but long links are slower
  listeners.forEach((l) => {
    nearest(l, 6).forEach((j) => link(l, j, [1, 1.5]))
    link(l, YOU, [1.1, 1.9])
  })

  // Dijkstra from your node
  const total = nodes.length
  const arrival = Array(total).fill(Infinity)
  const parent = Array(total).fill(YOU)
  const hops = Array(total).fill(0)
  const neighbours = (i: number) =>
    edges
      .filter(([a, b]) => a === i || b === i)
      .map(([a, b]) => (a === i ? b : a))
  const weight = (a: number, b: number) =>
    weights.get(a < b ? `${a}:${b}` : `${b}:${a}`)!
  neighbours(YOU).forEach((i) => {
    arrival[i] = weight(YOU, i)
    hops[i] = 1
  })
  const done = new Set<number>()
  while (done.size < total) {
    let current = -2
    for (let i = 0; i < total; i++)
      if (!done.has(i) && (current === -2 || arrival[i] < arrival[current]))
        current = i
    if (current === -2 || arrival[current] === Infinity) break
    done.add(current)
    neighbours(current).forEach((n) => {
      if (n === YOU || done.has(n)) return
      const candidate = arrival[current] + weight(current, n)
      if (candidate < arrival[n]) {
        arrival[n] = candidate
        parent[n] = current
        hops[n] = hops[current] + 1
      }
    })
  }
  const reachable = arrival.filter((a) => a !== Infinity)
  return {
    width,
    height,
    you,
    relay,
    builder,
    nodes,
    listeners,
    edges,
    arrival,
    parent,
    hops,
    maxArrival: Math.max(...reachable),
  }
}

const cache = new Map<LayoutKind, GossipLayout>()

/**
 * A seeded network whose listeners show a mix of outcomes: some hear your
 * transaction straight from you, others through your neighbours. The seed
 * search is deterministic, so every render produces the same layout.
 */
export const getLayout = (kind: LayoutKind): GossipLayout => {
  const hit = cache.get(kind)
  if (hit) return hit
  let layout = generate(kind, 1)
  for (let seed = 1; seed < 200; seed++) {
    const candidate = generate(kind, seed)
    const direct = candidate.listeners.filter(
      (l) => candidate.parent[l] === YOU
    ).length
    const connected = candidate.arrival.every((a) => a !== Infinity)
    if (connected && direct >= 2 && direct <= 3) {
      layout = candidate
      break
    }
  }
  cache.set(kind, layout)
  return layout
}
