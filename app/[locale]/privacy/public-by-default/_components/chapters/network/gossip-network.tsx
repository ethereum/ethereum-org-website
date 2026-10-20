"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useMediaQuery } from "usehooks-ts"

import SegmentedControl from "@/components/PrivacyWidgets/SandwichAttackDemo/segmented-control"
import { useBrowserInfo } from "@/components/PrivacyWidgets/shared/browser-info"
import LogLines, {
  type LogLine,
} from "@/components/PrivacyWidgets/shared/log-lines"
import { trackPrivacyLessonEvent } from "@/components/PrivacyWidgets/shared/track"
import { Button } from "@/components/ui/buttons/Button"
import { Tag } from "@/components/ui/tag"

import { cn } from "@/lib/utils/cn"

import { persona } from "@/data/privacy-lesson/persona"

import { useLesson } from "../../lesson-provider"
import { useLessonTranslations } from "../../use-lesson-translations"

import { getLayout, YOU } from "./graph"

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"

type Route = "public" | "relay"

const LETTERS = ["A", "B", "C", "D", "E"]
const PUBLIC_MS = 2600
const RELAY_MS = 1600
// Keeps IPs and other technical values in LTR order inside translated text
const ltr = (value: string) => `⁦${value}⁩`

/** Seeded gossip simulation: who hears your transaction first. */
const GossipNetwork = () => {
  const t = useLessonTranslations()
  const { collect } = useLesson()
  const { prefersReducedMotion } = usePrefersReducedMotion()
  const info = useBrowserInfo()
  const wide = useMediaQuery("(min-width: 640px)")
  const layout = useMemo(() => getLayout(wide ? "wide" : "narrow"), [wide])

  const [route, setRoute] = useState<Route>("public")
  // progress 0..1 through the current run; null before the first run
  const [progress, setProgress] = useState<number | null>(null)
  const [runId, setRunId] = useState(0)
  const frame = useRef(0)

  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  const changeRoute = (next: Route) => {
    cancelAnimationFrame(frame.current)
    setRoute(next)
    setProgress(null)
  }

  const run = () => {
    cancelAnimationFrame(frame.current)
    trackPrivacyLessonEvent("widget-used", "gossip-network")
    setRunId((id) => id + 1)
    if (prefersReducedMotion) {
      setProgress(1)
      return
    }
    const duration = route === "public" ? PUBLIC_MS : RELAY_MS
    const start = performance.now()
    const tick = (now: number) => {
      const k = Math.min(1, (now - start) / duration)
      setProgress(k)
      if (k < 1) frame.current = requestAnimationFrame(tick)
    }
    setProgress(0)
    frame.current = requestAnimationFrame(tick)
  }

  const finished = progress === 1
  useEffect(() => {
    if (finished && route === "public") collect("origin")
  }, [finished, route, collect])

  const now = (progress ?? 0) * layout.maxArrival
  const reached = (i: number) =>
    route === "public" && progress !== null && layout.arrival[i] <= now
  const pos = (i: number) => (i === YOU ? layout.you : layout.nodes[i])

  const ip = ltr(persona.ip)
  const lines = useMemo<LogLine[]>(() => {
    if (!finished) return []
    if (route === "relay") {
      return [
        { id: "relay-send", content: t("network-gossip-log-relay-send") },
        {
          id: "relay-silent",
          tone: "safe",
          content: t("network-gossip-log-relay-silent"),
        },
        {
          id: "relay-saw",
          tone: "leak",
          content: t("network-gossip-log-relay-saw"),
        },
        {
          id: "relay-after",
          tone: "dim",
          content: t("network-gossip-log-relay-after"),
        },
      ]
    }
    const order = layout.listeners
      .map((node, i) => ({ node, letter: LETTERS[i] }))
      .sort((a, b) => layout.arrival[a.node] - layout.arrival[b.node])
    const direct = order.filter(({ node }) => layout.parent[node] === YOU)
    return [
      {
        id: "you-send",
        content: t("network-gossip-log-you-send", { ip }),
      },
      ...order.map<LogLine>(({ node, letter }) => {
        const from = layout.parent[node]
        return from === YOU
          ? {
              id: `heard-${letter}`,
              tone: "leak",
              content: t("network-gossip-log-heard-direct", {
                listener: letter,
              }),
            }
          : {
              id: `heard-${letter}`,
              tone: "dim",
              content: t("network-gossip-log-heard-hops", {
                listener: letter,
                hops: layout.hops[from],
              }),
            }
      }),
      {
        id: "summary-direct",
        tone: "leak",
        content: t("network-gossip-log-summary-direct", {
          direct: direct.length,
          total: order.length,
        }),
      },
      {
        id: "summary-others",
        content: t("network-gossip-log-summary-others", {
          others: order.length - direct.length,
        }),
      },
      {
        id: "summary-guess",
        tone: "leak",
        content: info?.city
          ? t("network-gossip-log-summary-guess", { ip, city: info.city })
          : t("network-gossip-log-summary-guess-no-city", { ip }),
      },
    ]
    // runId restarts the log when the same route runs again
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished, route, layout, info?.city, runId, t])

  // Relay path: you -> relay -> builder, drawn as progress advances
  const relayK = route === "relay" && progress !== null ? progress : 0
  const firstLeg = Math.min(1, relayK * 2)
  const secondLeg = Math.max(0, relayK * 2 - 1)
  const lerp = (a: number, b: number, k: number) => a + (b - a) * k

  const labelClass =
    "fill-body text-[13px] font-semibold [paint-order:stroke] stroke-background stroke-[4px]"

  return (
    <figure className="m-0 space-y-4 rounded-base border bg-background p-4 md:p-6">
      <div className="flex flex-wrap items-center gap-3">
        <p className="m-0 font-bold">{t("network-gossip-title")}</p>
        <Tag size="small" status="normal" variant="outline">
          {t("network-gossip-badge")}
        </Tag>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <SegmentedControl
          label={t("network-gossip-route-group-label")}
          value={route}
          onValueChange={changeRoute}
          options={[
            { value: "public", label: t("network-gossip-route-public") },
            { value: "relay", label: t("network-gossip-route-relay") },
          ]}
        />
        <Button onClick={run} disabled={progress !== null && !finished}>
          {route === "public"
            ? t(
                finished
                  ? "network-gossip-button-broadcast-again"
                  : "network-gossip-button-broadcast"
              )
            : t(
                finished
                  ? "network-gossip-button-relay-again"
                  : "network-gossip-button-relay"
              )}
        </Button>
      </div>

      <svg
        role="img"
        aria-label={t("network-gossip-svg-label", {
          count: layout.listeners.length,
        })}
        viewBox={`0 0 ${layout.width} ${layout.height}`}
        className="h-auto w-full rounded-base bg-background-highlight"
      >
        {layout.edges.map(([a, b]) => {
          const lit =
            route === "public" &&
            (layout.parent[b] === a || layout.parent[a] === b) &&
            reached(layout.parent[b] === a ? b : a)
          return (
            <line
              key={`${a}-${b}`}
              x1={pos(a).x}
              y1={pos(a).y}
              x2={pos(b).x}
              y2={pos(b).y}
              className={cn(
                "stroke-border motion-safe:transition-colors",
                lit && "stroke-leak/70"
              )}
              strokeWidth={lit ? 2 : 1}
            />
          )
        })}

        {route === "relay" && (
          <g className="stroke-primary" strokeWidth={3} strokeLinecap="round">
            <line
              x1={layout.you.x}
              y1={layout.you.y}
              x2={lerp(layout.you.x, layout.relay.x, firstLeg)}
              y2={lerp(layout.you.y, layout.relay.y, firstLeg)}
              strokeDasharray="6 6"
            />
            {secondLeg > 0 && (
              <line
                x1={layout.relay.x}
                y1={layout.relay.y}
                x2={lerp(layout.relay.x, layout.builder.x, secondLeg)}
                y2={lerp(layout.relay.y, layout.builder.y, secondLeg)}
                strokeDasharray="6 6"
              />
            )}
          </g>
        )}

        {layout.nodes.map((node, i) => (
          <circle
            key={i}
            cx={node.x}
            cy={node.y}
            r={6}
            className={cn(
              "motion-safe:transition-colors",
              reached(i)
                ? "fill-leak"
                : "fill-background-high stroke-body-medium"
            )}
            strokeWidth={1}
          />
        ))}

        {layout.listeners.map((node, i) => (
          <g key={node}>
            <circle
              cx={layout.nodes[node].x}
              cy={layout.nodes[node].y}
              r={12}
              fill="none"
              strokeWidth={2.5}
              className={cn(
                reached(node) ? "stroke-leak-high-contrast" : "stroke-body"
              )}
            />
            <text
              x={layout.nodes[node].x}
              y={layout.nodes[node].y - 18}
              textAnchor="middle"
              className={labelClass}
            >
              {LETTERS[i]}
            </text>
          </g>
        ))}

        {route === "relay" && (
          <>
            <circle
              cx={layout.relay.x}
              cy={layout.relay.y}
              r={10}
              className="fill-primary"
            />
            <text
              x={layout.relay.x}
              y={layout.relay.y + 28}
              textAnchor="middle"
              className={labelClass}
            >
              {t("network-gossip-svg-relay")}
            </text>
            <rect
              x={layout.builder.x - 10}
              y={layout.builder.y - 10}
              width={20}
              height={20}
              rx={3}
              className={secondLeg >= 1 ? "fill-primary" : "fill-body-medium"}
            />
            <text
              x={layout.builder.x}
              y={layout.builder.y + 28}
              textAnchor="end"
              className={labelClass}
            >
              {t("network-gossip-svg-builder")}
            </text>
          </>
        )}

        <circle
          cx={layout.you.x}
          cy={layout.you.y}
          r={9}
          className={progress !== null ? "fill-leak" : "fill-body"}
        />
        <text
          x={layout.you.x}
          y={layout.you.y + 26}
          textAnchor="middle"
          className={labelClass}
        >
          {t("network-gossip-svg-you")}
        </text>
      </svg>

      <ul className="m-0 flex list-none flex-wrap gap-x-5 gap-y-2 text-sm text-body-medium">
        <li className="flex items-center gap-2">
          <span aria-hidden className="size-3 rounded-full bg-body" />
          {t("network-gossip-legend-you")}
        </li>
        <li className="flex items-center gap-2">
          <span
            aria-hidden
            className="size-3 rounded-full border border-body-medium bg-background-high"
          />
          {t("network-gossip-legend-node")}
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden className="size-3 rounded-full bg-leak" />
          {t("network-gossip-legend-has-tx")}
        </li>
        <li className="flex items-center gap-2">
          <span
            aria-hidden
            className="size-3.5 rounded-full border-2 border-body"
          />
          {t("network-gossip-legend-listener")}
        </li>
      </ul>
      <p className="m-0 text-sm text-body-medium">
        {t("network-gossip-svg-band")}
      </p>

      <div className="space-y-2">
        <p className="m-0 text-sm font-bold">
          {t("network-gossip-log-heading")}
        </p>
        {lines.length ? (
          <LogLines
            key={`${route}-${runId}`}
            label={t("network-gossip-log-heading")}
            lines={lines}
            delay={350}
          />
        ) : (
          <p
            aria-live="polite"
            className="m-0 rounded-base border border-dashed p-4 text-sm text-body-medium"
          >
            {t(
              route === "public"
                ? "network-gossip-log-idle-public"
                : "network-gossip-log-idle-relay"
            )}
          </p>
        )}
      </div>

      <figcaption className="text-xs text-body-medium">
        {t("network-gossip-caption")}
      </figcaption>
    </figure>
  )
}

export default GossipNetwork
