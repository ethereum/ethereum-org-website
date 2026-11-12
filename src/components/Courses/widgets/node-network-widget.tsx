"use client"

import { useEffect, useRef, useState } from "react"
import { Plus, Power, PowerOff, Server } from "lucide-react"
import { useReducedMotion } from "motion/react"
import { useLocale, useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import { isoProjection } from "../art/iso"
import { chunkyButton, chunkyButtonSecondary, courseText } from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

const COUNT = 5
const START = 100
const SYNC_TICK_MS = 160

interface Node {
  on: boolean
  height: number
}

type Event =
  | { kind: "offline" | "syncing" | "synced" | "back"; node: number }
  | { kind: "block"; height: number }
  | { kind: "all-off" }

// Ring of server cubes on the iso ground plane; fixed so SSR and client agree
const iso = isoProjection(150, 30)
const CUBE = 26
const RADIUS = 62
const servers = Array.from({ length: COUNT }, (_, i) => {
  const angle = -Math.PI / 2 + (i * 2 * Math.PI) / COUNT
  const x = 60 + RADIUS * Math.cos(angle)
  const y = 60 + RADIUS * Math.sin(angle)
  return {
    box: iso.box(x - CUBE / 2, y - CUBE / 2, 0, CUBE, CUBE, CUBE + 6),
    center: iso.P(x, y, CUBE / 2),
    label: iso.P(x + CUBE / 2, y + CUBE / 2, -14),
  }
})
const links = Array.from({ length: COUNT }, (_, a) =>
  Array.from({ length: COUNT - a - 1 }, (_, j) => [a, a + 1 + j] as const)
).flat()

const tipOf = (nodes: Node[]) =>
  Math.max(0, ...nodes.filter((n) => n.on).map((n) => n.height))

const NodeNetworkWidget = ({ onComplete }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const locale = useLocale()
  const reduceMotion = useReducedMotion()
  const int = numberFormat(locale)

  const [nodes, setNodes] = useState<Node[]>(() =>
    Array.from({ length: COUNT }, () => ({ on: true, height: START }))
  )
  const [event, setEvent] = useState<Event | null>(null)
  const done = useRef(false)

  const tip = tipOf(nodes)
  const online = nodes.filter((n) => n.on).length
  const lagging = nodes.findIndex((n) => n.on && n.height < tip)

  // A returning node downloads and checks the blocks it missed
  useEffect(() => {
    if (lagging < 0) return
    const step = () => {
      const target = tipOf(nodes)
      const next = nodes.map((n) =>
        n.on && n.height < target
          ? {
              ...n,
              height: reduceMotion
                ? target
                : n.height + Math.max(1, Math.ceil((target - n.height) / 4)),
            }
          : n
      )
      setNodes(next)
      const finished = nodes.findIndex(
        (n, i) => n.on && n.height < target && next[i].height === target
      )
      if (finished >= 0) {
        setEvent({ kind: "synced", node: finished })
        if (!done.current) {
          done.current = true
          onComplete()
        }
      }
    }
    if (reduceMotion) {
      step()
      return
    }
    const timer = setTimeout(step, SYNC_TICK_MS)
    return () => clearTimeout(timer)
  }, [lagging, nodes, reduceMotion, onComplete])

  const toggle = (i: number) => {
    const node = nodes[i]
    const next = nodes.map((n, idx) => (idx === i ? { ...n, on: !n.on } : n))
    setNodes(next)
    if (node.on) {
      setEvent(
        next.some((n) => n.on)
          ? { kind: "offline", node: i }
          : { kind: "all-off" }
      )
      return
    }
    setEvent({
      kind: node.height < tipOf(next) ? "syncing" : "back",
      node: i,
    })
  }

  const addBlock = () => {
    const height = tip + 1
    setNodes(
      nodes.map((n) => (n.on && n.height === tip ? { ...n, height } : n))
    )
    setEvent({ kind: "block", height })
  }

  const nodeName = (i: number) =>
    t("page-courses-widget-node-name", { number: int.format(i + 1) })

  const status = (() => {
    if (!event) return t("page-courses-widget-node-start")
    switch (event.kind) {
      case "block":
        return t(
          online < COUNT
            ? "page-courses-widget-node-block-partial"
            : "page-courses-widget-node-block",
          { number: int.format(event.height) }
        )
      case "all-off":
        return t("page-courses-widget-node-all-off")
      default:
        return t(`page-courses-widget-node-${event.kind}`, {
          node: nodeName(event.node),
        })
    }
  })()

  return (
    <WidgetShell>
      <svg
        viewBox="40 0 215 172"
        aria-hidden
        className="mx-auto w-full max-w-xs"
      >
        {links.map(([a, b]) => {
          const live = nodes[a].on && nodes[b].on
          return (
            <line
              key={`${a}-${b}`}
              x1={servers[a].center[0]}
              y1={servers[a].center[1]}
              x2={servers[b].center[0]}
              y2={servers[b].center[1]}
              strokeWidth={2}
              strokeDasharray={live ? undefined : "4 5"}
              className={
                live
                  ? "stroke-(--course)"
                  : "stroke-gray-300 dark:stroke-gray-600"
              }
            />
          )
        })}
        {servers.map(({ box, label }, i) => {
          const { on } = nodes[i]
          return (
            <g key={i}>
              <polygon
                points={box.left}
                className={
                  on ? "fill-(--course)" : "fill-gray-400 dark:fill-gray-600"
                }
              />
              <polygon
                points={box.right}
                className={
                  on
                    ? "fill-(--course-strong)"
                    : "fill-gray-500 dark:fill-gray-700"
                }
              />
              <polygon
                points={box.top}
                className={on ? undefined : "fill-gray-200 dark:fill-gray-500"}
                fill={
                  on
                    ? "color-mix(in oklab, var(--course) 55%, white)"
                    : undefined
                }
              />
              <text
                x={label[0]}
                y={label[1]}
                textAnchor="middle"
                fontSize={16}
                className="fill-body font-bold"
              >
                {int.format(i + 1)}
              </text>
            </g>
          )
        })}
      </svg>

      <ul className="m-0 flex list-none flex-col gap-2">
        {nodes.map(({ on, height }, i) => {
          const state = !on ? "off" : height < tip ? "syncing" : "synced"
          return (
            <li
              key={i}
              className="m-0 flex flex-wrap items-center justify-between gap-3 rounded-2xl border-2 border-(--course-soft) bg-background p-3"
            >
              <div className="flex items-center gap-3">
                <Server
                  aria-hidden
                  className={cn(
                    "size-6 shrink-0",
                    on ? courseText : "text-body-medium"
                  )}
                />
                <div className="flex flex-col gap-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-bold whitespace-nowrap">
                      {nodeName(i)}
                    </span>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-sm font-bold whitespace-nowrap",
                        state === "synced" &&
                          "bg-success-light text-green-700 dark:bg-success-dark dark:text-green-400",
                        state === "syncing" &&
                          "bg-warning-light text-body dark:bg-warning-dark",
                        state === "off" && "bg-background-highlight text-body"
                      )}
                    >
                      {t(`page-courses-widget-node-state-${state}`)}
                    </span>
                  </span>
                  <span className="text-sm text-body-medium">
                    {t("page-courses-widget-node-height", {
                      number: int.format(height),
                    })}
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                onClick={() => toggle(i)}
                aria-label={t(
                  on
                    ? "page-courses-widget-node-off-label"
                    : "page-courses-widget-node-on-label",
                  { node: nodeName(i) }
                )}
                className={cn(chunkyButtonSecondary, "min-h-10 px-4 text-sm")}
              >
                {on ? <PowerOff aria-hidden /> : <Power aria-hidden />}
                {t(
                  on
                    ? "page-courses-widget-node-off"
                    : "page-courses-widget-node-on"
                )}
              </Button>
            </li>
          )
        })}
      </ul>

      <p role="status" className="m-0 min-h-12 rounded-2xl bg-background p-3">
        {status}
      </p>

      <Button
        variant="ghost"
        onClick={addBlock}
        disabled={online === 0}
        className={cn(chunkyButton, "self-center")}
      >
        <Plus aria-hidden />
        {t("page-courses-widget-node-add")}
      </Button>
    </WidgetShell>
  )
}

export default NodeNetworkWidget
