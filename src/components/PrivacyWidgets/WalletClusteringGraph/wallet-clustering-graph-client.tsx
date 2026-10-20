"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useLocale, useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"
import { Tag } from "@/components/ui/tag"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import LogLines, { type LogLine } from "../shared/log-lines"
import { Ltr, richTags } from "../shared/rich-tags"
import { trackPrivacyLessonEvent } from "../shared/track"

import {
  type ClusterEdge,
  type ClusterLayout,
  countClusters,
  EDGES,
  HEURISTIC_STEPS,
  NODE_ADDRESSES,
  NODES,
  TALL,
  TOTAL_STEPS,
  WIDE,
} from "./layout"

const NS = "component-wallet-clustering"
/** Below this container width the tall layout is used */
const WIDE_MIN_WIDTH = 560
/** The amount moved through the pool in step 4 */
const POOL_AMOUNT = 1.337
const DEFAULT_ENS = "yourname.eth"

export type ClusteringCollectId = "cluster" | "label"

export interface WalletClusteringGraphProps {
  /** "lesson" drops the title and intro (the lesson's prose covers them) */
  variant?: "lesson" | "standalone"
  /** Public name revealed in the last step */
  ensName?: string
  /** Called with "cluster" when all seven join, and "label" after the name lookup */
  onCollect?: (ids: ClusteringCollectId[]) => void
  /** Start at a later step (stories) */
  initialStep?: number
  className?: string
}

/** Only one of the three "first gas" links carries a label, to avoid clutter */
const isLabelled = (edge: ClusterEdge) =>
  edge.label !== "first-gas" || edge.to === "staking"

const percent = (value: number, total: number) => `${(value / total) * 100}%`

const WalletClusteringGraph = ({
  variant = "standalone",
  ensName = DEFAULT_ENS,
  onCollect,
  initialStep = 0,
  className,
}: WalletClusteringGraphProps) => {
  const t = useTranslations(NS)
  const k = (key: string) => `${NS}-${key}`
  const locale = useLocale()
  const [step, setStep] = useState(
    Math.min(Math.max(initialStep, 0), TOTAL_STEPS)
  )
  const [wide, setWide] = useState(true)
  const graphRef = useRef<HTMLDivElement>(null)
  const tracked = useRef(false)

  // Pick the layout from the space the widget actually has
  useEffect(() => {
    const element = graphRef.current?.parentElement
    if (!element) return
    const observer = new ResizeObserver(([entry]) =>
      setWide(entry.contentRect.width >= WIDE_MIN_WIDTH)
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const layout: ClusterLayout = wide ? WIDE : TALL
  const format = numberFormat(locale)
  // Isolated so the number and unit keep their order inside RTL text
  const amount = `\u2066${numberFormat(locale, { maximumFractionDigits: 3 }).format(POOL_AMOUNT)} ETH\u2069`
  const appliedHeuristics = Math.min(step, HEURISTIC_STEPS)
  const clusters = countClusters(appliedHeuristics)
  const links = EDGES.filter((edge) => edge.step <= appliedHeuristics).length
  const named = step === TOTAL_STEPS ? NODES.length : 0
  const merged = clusters === 1
  const linkedNodes = new Set(
    EDGES.filter((edge) => edge.step <= appliedHeuristics).flatMap((edge) => [
      edge.from,
      edge.to,
    ])
  )

  const stepTitle = (number: number) => t(k(`step-${number}-title`))

  const lines = useMemo<LogLine[]>(() => {
    const out: LogLine[] = [
      { id: "initial", content: t(k("log-initial")), tone: "dim" },
    ]
    for (let number = 1; number <= step; number++) {
      const heuristic = number <= HEURISTIC_STEPS
      out.push(
        {
          id: `${number}-heading`,
          content: heuristic
            ? t(k("log-step-heading"), {
                number: format.format(number),
                title: stepTitle(number),
              })
            : stepTitle(number),
        },
        {
          id: `${number}-evidence`,
          content: t.rich(k(`step-${number}-evidence`), {
            ...richTags({ glossary: number === 4 ? "shielded-pool" : "ens" }),
            amount,
            ensName,
          }),
        },
        {
          id: `${number}-explanation`,
          content: t(k(`step-${number}-explanation`)),
          tone: "dim",
        },
        heuristic
          ? {
              id: `${number}-result`,
              content: t(k("log-clusters"), {
                before: format.format(countClusters(number - 1)),
                after: format.format(countClusters(number)),
              }),
              tone: "leak",
            }
          : {
              id: `${number}-result`,
              content: t(k("log-named"), {
                before: format.format(0),
                after: format.format(NODES.length),
              }),
              tone: "leak",
            }
      )
    }
    return out
    // t and format are stable for a locale; step drives the log
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, locale, amount, ensName])

  const advance = () => {
    if (!tracked.current) {
      trackPrivacyLessonEvent("widget-used", "wallet-clustering")
      tracked.current = true
    }
    const next = Math.min(step + 1, TOTAL_STEPS)
    setStep(next)
    if (next === HEURISTIC_STEPS) onCollect?.(["cluster"])
    if (next === TOTAL_STEPS) onCollect?.(["label"])
  }

  const graphLabel =
    step === TOTAL_STEPS
      ? t(k("graph-label-named"), { ensName })
      : merged
        ? t(k("graph-label-joined"))
        : t(k("graph-label-initial"))

  const nodePosition = (x: number, y: number) => ({
    // Inline-start offsets mirror automatically in RTL, matching the
    // horizontally flipped SVG underneath
    insetInlineStart: percent(x, layout.width),
    top: percent(y, layout.height),
  })

  const HeadingTag = variant === "standalone" ? "h3" : "h4"

  return (
    <div className={cn("space-y-4", className)}>
      {variant === "standalone" && (
        <div className="space-y-2">
          <h3>{t(k("title"))}</h3>
          <p>{t(k("intro"))}</p>
        </div>
      )}

      <div className="space-y-4 rounded-base border bg-background p-4 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <HeadingTag className="m-0 text-lg">{t(k("demo-title"))}</HeadingTag>
          <Tag status="normal" variant="outline" size="small">
            {step === 0
              ? t(k("state-initial"))
              : t(k("state-step"), {
                  current: format.format(step),
                  total: format.format(TOTAL_STEPS),
                })}
          </Tag>
        </div>

        <div
          ref={graphRef}
          role="img"
          aria-label={graphLabel}
          className="relative w-full"
          style={{ aspectRatio: `${layout.width} / ${layout.height}` }}
        >
          <svg
            viewBox={`0 0 ${layout.width} ${layout.height}`}
            className="absolute inset-0 size-full rtl:-scale-x-100"
            aria-hidden
          >
            <rect
              x={16}
              y={16}
              width={layout.width - 32}
              height={layout.height - 32}
              rx={28}
              strokeDasharray="8 8"
              className={cn(
                "fill-leak-low-contrast/40 stroke-leak stroke-2 motion-safe:transition-opacity motion-safe:duration-500",
                merged ? "opacity-100" : "opacity-0"
              )}
            />
            {EDGES.map((edge) => {
              const from = layout.nodes[edge.from]
              const to = layout.nodes[edge.to]
              const shown = edge.step <= appliedHeuristics
              return (
                <line
                  key={`${edge.from}-${edge.to}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={shown ? 0 : 1}
                  className="stroke-leak stroke-3 motion-safe:transition-[stroke-dashoffset] motion-safe:duration-700"
                />
              )
            })}
          </svg>

          {merged && (
            <span
              className="absolute top-0 max-w-[80%] -translate-x-1/2 rounded-full bg-leak px-3 py-0.5 text-center text-xs font-bold text-body-inverse rtl:translate-x-1/2"
              style={{ insetInlineStart: "50%" }}
            >
              {step === TOTAL_STEPS
                ? t(k("hull-label-named"), { ensName, count: NODES.length })
                : t(k("hull-label"), { count: NODES.length })}
            </span>
          )}

          {EDGES.filter(
            (edge) => edge.step <= appliedHeuristics && isLabelled(edge)
          ).map((edge) => {
            const from = layout.nodes[edge.from]
            const to = layout.nodes[edge.to]
            return (
              <span
                key={`label-${edge.from}-${edge.to}`}
                className="absolute max-w-[24%] -translate-x-1/2 -translate-y-1/2 rounded-sm bg-background px-1 text-center text-2xs leading-tight text-leak-high-contrast motion-safe:animate-fade-in rtl:translate-x-1/2"
                style={nodePosition(
                  from.x + (to.x - from.x) * (edge.labelAt ?? 0.5),
                  from.y + (to.y - from.y) * (edge.labelAt ?? 0.5)
                )}
              >
                {edge.label === "amount"
                  ? t(k("edge-amount"), { amount })
                  : t(k(`edge-${edge.label}`))}
              </span>
            )
          })}

          {NODES.map((id) => {
            const { x, y } = layout.nodes[id]
            const linked = linkedNodes.has(id)
            return (
              <span
                key={id}
                className={cn(
                  "absolute flex max-w-[34%] -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-lg border-2 bg-background px-2 py-1 text-center text-xs leading-tight shadow-sm rtl:translate-x-1/2",
                  linked ? "border-leak" : "border-border",
                  step === TOTAL_STEPS && "bg-leak-low-contrast"
                )}
                style={nodePosition(x, y)}
              >
                <span className="font-semibold">{t(k(`node-${id}`))}</span>
                <span className="text-2xs text-body-medium">
                  <Ltr>{NODE_ADDRESSES[id]}</Ltr>
                </span>
              </span>
            )
          })}
        </div>

        <p
          aria-live="polite"
          className="m-0 flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold"
        >
          <span className="text-leak-high-contrast">
            {t(k("stat-clusters"), { count: clusters })}
          </span>
          <span>{t(k("stat-links"), { count: links })}</span>
          <span>{t(k("stat-named"), { count: named })}</span>
        </p>

        <div className="flex flex-wrap gap-2">
          {step < TOTAL_STEPS ? (
            <Button onClick={advance}>
              {step < HEURISTIC_STEPS
                ? t(k("button-next"), { title: stepTitle(step + 1) })
                : t(k("button-name"))}
            </Button>
          ) : (
            <Button disabled>{t(k("button-done"))}</Button>
          )}
          {step > 0 && (
            <Button variant="outline" isSecondary onClick={() => setStep(0)}>
              {t(k("button-reset"))}
            </Button>
          )}
        </div>

        <div className="space-y-2">
          <p className="m-0 text-sm font-bold">{t(k("log-heading"))}</p>
          <LogLines lines={lines} label={t(k("log-heading"))} delay={160} />
        </div>

        {step === TOTAL_STEPS && (
          <p className="m-0 font-semibold">{t(k("verdict"))}</p>
        )}
      </div>

      <p className="text-sm text-body-medium">{t(k("caption"))}</p>
    </div>
  )
}

export default WalletClusteringGraph
