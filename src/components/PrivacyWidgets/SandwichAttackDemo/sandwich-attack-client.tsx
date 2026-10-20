"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useLocale, useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"
import { Tag } from "@/components/ui/tag"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import LogLines, { type LogLine } from "../shared/log-lines"
import { createRandom } from "../shared/random"
import { richTags } from "../shared/rich-tags"
import { trackPrivacyLessonEvent } from "../shared/track"

import SegmentedControl from "./segmented-control"

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"

const NS = "component-sandwich-attack"

export type SandwichMode = "public" | "private"

// Illustrative numbers, single-sourced here. The quote is what 2 ETH buys at
// the pool price; the sandwich moves the price before your swap lands.
const SWAP = {
  amountIn: 2,
  tokenIn: "ETH",
  tokenOut: "USDC",
  quoted: 7184.2,
  slippage: 0.01,
  received: 7164.8,
  botTrade: 31.5,
  /** How long the swap waits, readable, in the public mempool (s) */
  readableFor: 8,
  /** How soon a bot spots it (s) */
  spottedAfter: 0.4,
  /** Block the swap lands in (the lesson's persona block + 1) */
  blockNumber: 26084114,
} as const

const STEP_DELAY = 1100

/** Wraps a technical value (amount with unit) so it keeps LTR order in RTL text */
const ltr = (value: string) => `⁦${value}⁩`

/** Animates a number towards `target`; instant with reduced motion. */
const useCountUp = (target: number, from: number, reduced: boolean) => {
  const [value, setValue] = useState(target)
  useEffect(() => {
    if (reduced || target === from) {
      setValue(target)
      return
    }
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const k = Math.min(1, (now - start) / 800)
      const eased = 1 - Math.pow(1 - k, 3)
      setValue(from + (target - from) * eased)
      if (k < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, from, reduced])
  return value
}

export interface SandwichAttackClientProps {
  /** "lesson" drops the widget's own heading (the chapter has one) */
  variant?: "lesson" | "standalone"
  /** Called once a run finishes, with the mode it used */
  onComplete?: (mode: SandwichMode) => void
  /** Seed for the background mempool traffic; fixed so renders are identical */
  seed?: number
  className?: string
}

const SandwichAttackClient = ({
  variant = "standalone",
  onComplete,
  seed = 3,
  className,
}: SandwichAttackClientProps) => {
  const t = useTranslations(NS)
  const locale = useLocale()
  const { prefersReducedMotion } = usePrefersReducedMotion()
  const tk = (key: string, values?: Parameters<typeof t>[1]) =>
    t(`${NS}-${key}`, values)

  const [mode, setMode] = useState<SandwichMode>("public")
  // 0 idle, 1 sent, 2 spotted (public), 3 bundled (public), 4 done
  const [step, setStep] = useState(0)
  const [runId, setRunId] = useState(0)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  const fmt = useMemo(() => {
    const two = numberFormat(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    const plain = numberFormat(locale, { maximumFractionDigits: 2 })
    const seconds = numberFormat(locale, {
      style: "unit",
      unit: "second",
      unitDisplay: "long",
      maximumFractionDigits: 1,
    })
    return {
      token: (amount: number, symbol: string, decimals = true) =>
        ltr(`${(decimals ? two : plain).format(amount)} ${symbol}`),
      gwei: (amount: number) => ltr(`${two.format(amount)} gwei`),
      percent: numberFormat(locale, { style: "percent" }).format(SWAP.slippage),
      seconds: (value: number) => seconds.format(value),
      block: numberFormat(locale).format(SWAP.blockNumber),
    }
  }, [locale])

  const minAmount = SWAP.quoted * (1 - SWAP.slippage)
  const amountIn = fmt.token(SWAP.amountIn, SWAP.tokenIn, false)

  // Background traffic in the mempool: seeded, so every render matches
  const traffic = useMemo<LogLine[]>(() => {
    const random = createRandom(seed)
    const tip = () => fmt.gwei(0.6 + random.int(0, 180) / 100)
    return [
      {
        id: "t1",
        prefix: tk("log-tip", { amount: tip() }),
        content: tk("log-send", {
          amount: fmt.token(random.int(5, 90) / 100, "ETH"),
        }),
        tone: "dim",
      },
      {
        id: "t2",
        prefix: tk("log-tip", { amount: tip() }),
        content: tk("log-mint", { count: random.int(2, 5) }),
        tone: "dim",
      },
      {
        id: "t3",
        prefix: tk("log-tip", { amount: tip() }),
        content: tk("log-swap", {
          amountIn: fmt.token(random.int(300, 2400), "USDC", false),
          amountOut: fmt.token(random.int(10, 60) / 100, "ETH"),
        }),
        tone: "dim",
      },
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed, fmt])

  const clearTimers = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }
  useEffect(() => clearTimers, [])

  const reset = (nextMode: SandwichMode) => {
    clearTimers()
    setMode(nextMode)
    setStep(0)
  }

  const run = () => {
    clearTimers()
    setRunId((id) => id + 1)
    trackPrivacyLessonEvent("widget-used", "sandwich-attack")
    const last = mode === "public" ? 4 : 2
    const delay = prefersReducedMotion ? 0 : STEP_DELAY
    setStep(1)
    for (let s = 2; s <= last; s++) {
      timers.current.push(
        setTimeout(
          () => {
            setStep(mode === "private" && s === 2 ? 4 : s)
            if (s === last) onCompleteRef.current?.(mode)
          },
          delay * (s - 1)
        )
      )
    }
  }

  const done = step === 4
  const isPublic = mode === "public"
  const received = done ? (isPublic ? SWAP.received : SWAP.quoted) : 0
  const lost = done && isPublic ? SWAP.quoted - SWAP.received : 0
  const shownReceived = useCountUp(received, SWAP.quoted, prefersReducedMotion)
  const shownLost = useCountUp(lost, 0, prefersReducedMotion)

  const youTag = (text: string, tone: "leak" | "primary") => (
    <span
      className={cn(
        "ms-2 inline-block rounded px-1.5 text-xs font-semibold",
        tone === "leak"
          ? "bg-leak-low-contrast text-leak-high-contrast"
          : "bg-primary-low-contrast text-primary-high-contrast"
      )}
    >
      {text}
    </span>
  )

  const mempoolLines: LogLine[] = [...traffic]
  if (step >= 1 && isPublic) {
    mempoolLines.push({
      id: `you-${runId}`,
      tone: "leak",
      content: (
        <>
          {tk("log-swap-min", {
            amountIn,
            minAmount: fmt.token(minAmount, SWAP.tokenOut),
          })}
          {youTag(
            tk("log-tag-you-public", {
              duration: fmt.seconds(SWAP.readableFor),
            }),
            "leak"
          )}
        </>
      ),
    })
  }
  if (step >= 2 && isPublic) {
    mempoolLines.push({
      id: `bundle-${runId}`,
      tone: "dim",
      content: tk("log-mempool-bundle"),
    })
  }
  if (step >= 1 && !isPublic) {
    mempoolLines.push({
      id: `private-${runId}`,
      tone: "safe",
      content: tk("log-mempool-private"),
    })
  }

  const blockLines: LogLine[] = []
  if (done && isPublic) {
    blockLines.push(
      {
        id: `front-${runId}`,
        prefix: "#0",
        tone: "alert",
        content: (
          <>
            {tk("log-bot-sell", { amount: fmt.token(SWAP.botTrade, "ETH") })}
            {youTag(tk("log-tag-front-run"), "leak")}
          </>
        ),
      },
      {
        id: `swap-${runId}`,
        prefix: "#1",
        content: (
          <>
            {tk("log-swap", {
              amountIn,
              amountOut: fmt.token(SWAP.received, SWAP.tokenOut),
            })}
            {youTag(tk("log-tag-you"), "primary")}
          </>
        ),
      },
      {
        id: `back-${runId}`,
        prefix: "#2",
        tone: "alert",
        content: (
          <>
            {tk("log-bot-buy-back", {
              amount: fmt.token(SWAP.botTrade, "ETH"),
            })}
            {youTag(tk("log-tag-back-run"), "leak")}
          </>
        ),
      }
    )
  }
  if (done && !isPublic) {
    blockLines.push({
      id: `swap-${runId}`,
      prefix: "#0",
      tone: "safe",
      content: (
        <>
          {tk("log-swap", {
            amountIn,
            amountOut: fmt.token(SWAP.quoted, SWAP.tokenOut),
          })}
          {youTag(tk("log-tag-you"), "primary")}
        </>
      ),
    })
  }

  const verdicts: string[] = []
  if (step === 0)
    verdicts.push(tk(isPublic ? "verdict-idle-public" : "verdict-idle-private"))
  if (step >= 1 && isPublic) verdicts.push(tk("verdict-waiting"))
  if (step >= 2 && isPublic)
    verdicts.push(
      tk("verdict-spotted", { duration: fmt.seconds(SWAP.spottedAfter) })
    )
  if (step >= 3 && isPublic) verdicts.push(tk("verdict-bundle"))
  if (step >= 1 && !isPublic) verdicts.push(tk("verdict-private-sent"))

  const HeadingTag = variant === "lesson" ? "h4" : "h3"

  return (
    <div
      className={cn(
        "space-y-6 rounded-base border bg-background p-4 md:p-6",
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-3">
        <HeadingTag className="m-0 text-h5">{tk("title")}</HeadingTag>
        <Tag size="small" status="normal" variant="outline">
          {tk("badge")}
        </Tag>
      </div>

      <div className="space-y-3">
        {variant === "standalone" && (
          <p>{t.rich(`${NS}-intro-1`, richTags({ glossary: "mempool" }))}</p>
        )}
        <p>
          {t.rich(`${NS}-intro-2`, richTags({ glossary: "block-builder" }))}
        </p>
        <p>{tk("intro-3")}</p>
      </div>

      <div className="space-y-3 rounded-base bg-background-highlight p-4">
        <p className="m-0 font-bold">
          {tk("swap-heading", { amountIn, tokenOut: SWAP.tokenOut })}
        </p>
        <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
          <dt className="text-body-medium">{tk("label-you-pay")}</dt>
          <dd className="m-0 font-mono">{amountIn}</dd>
          <dt className="text-body-medium">{tk("label-you-get")}</dt>
          <dd className="m-0 font-mono">
            {fmt.token(SWAP.quoted, SWAP.tokenOut)}
          </dd>
          <dt className="text-body-medium">{tk("label-max-slippage")}</dt>
          <dd className="m-0">
            {tk("value-max-slippage", {
              percent: fmt.percent,
              minAmount: fmt.token(minAmount, SWAP.tokenOut),
            })}
          </dd>
        </dl>
        <p className="m-0 text-sm text-body-medium">
          {t.rich(`${NS}-slippage-help`, richTags({ glossary: "slippage" }))}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <SegmentedControl
          label={tk("mode-group-label")}
          value={mode}
          onValueChange={reset}
          options={[
            { value: "public", label: tk("mode-public") },
            { value: "private", label: tk("mode-private") },
          ]}
        />
        <Button onClick={run} disabled={step > 0 && !done}>
          {tk(done ? "button-swap-again" : "button-swap")}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="min-w-0 space-y-2">
          <p className="m-0 text-sm font-bold">{tk("panel-mempool")}</p>
          <p className="m-0 text-xs text-body-medium">
            {t.rich(`${NS}-panel-mempool-help`, richTags({ glossary: "gwei" }))}
          </p>
          <LogLines
            label={tk("panel-mempool")}
            lines={mempoolLines}
            delay={180}
          />
        </div>
        <div className="min-w-0 space-y-2">
          <p className="m-0 text-sm font-bold">
            {tk("panel-block", { blockNumber: fmt.block })}
          </p>
          {blockLines.length ? (
            <LogLines
              label={tk("panel-block", { blockNumber: fmt.block })}
              lines={blockLines}
              delay={260}
            />
          ) : (
            <p className="m-0 rounded-base border border-dashed p-4 text-sm text-body-medium">
              {tk("block-empty")}
            </p>
          )}
        </div>
      </div>

      <div aria-live="polite" className="space-y-2">
        {verdicts.map((verdict) => (
          <p key={verdict} className="m-0">
            {verdict}
          </p>
        ))}
        {done && isPublic && (
          <>
            <p className="m-0">
              {tk("verdict-result-public-1", {
                received: fmt.token(SWAP.received, SWAP.tokenOut),
                quoted: fmt.token(SWAP.quoted, SWAP.tokenOut),
              })}
            </p>
            <p className="m-0 text-leak-high-contrast">
              {t.rich(`${NS}-verdict-result-public-2`, {
                ...richTags(),
                lost: fmt.token(lost, SWAP.tokenOut),
              })}
            </p>
          </>
        )}
        {done && !isPublic && (
          <p className="m-0 text-success">{tk("verdict-result-private")}</p>
        )}
      </div>

      <dl
        className="m-0 grid grid-cols-1 gap-3 sm:grid-cols-3"
        aria-hidden={!done}
      >
        {[
          {
            label: tk("result-quoted"),
            value: fmt.token(SWAP.quoted, SWAP.tokenOut),
            className: "",
          },
          {
            label: tk("result-received"),
            value: done ? fmt.token(shownReceived, SWAP.tokenOut) : "–",
            className: "",
          },
          {
            label: tk("result-lost"),
            value: done ? fmt.token(shownLost, SWAP.tokenOut) : "–",
            className:
              done && isPublic ? "text-leak-high-contrast" : "text-success",
          },
        ].map(({ label, value, className: valueClass }) => (
          <div key={label} className="rounded-base border p-3">
            <dt className="text-xs text-body-medium">{label}</dt>
            <dd className={cn("m-0 font-mono text-lg font-bold", valueClass)}>
              {value}
            </dd>
          </div>
        ))}
      </dl>

      {!isPublic && (
        <div className="space-y-2 rounded-base border-s-4 border-primary bg-primary-low-contrast/40 p-4 text-sm">
          <p className="m-0">{tk("private-caveat-1")}</p>
          <p className="m-0">
            {t.rich(`${NS}-private-caveat-2`, richTags({ glossary: "mev" }))}
          </p>
        </div>
      )}

      <details className="rounded-base border p-4 text-sm">
        <summary className="cursor-pointer font-semibold">
          {tk("tech-summary")}
        </summary>
        <div className="mt-3 space-y-2">
          <p className="m-0">{tk("tech-1")}</p>
          <p className="m-0">{tk("tech-2")}</p>
          <p className="m-0">{tk("tech-3")}</p>
        </div>
      </details>

      <p className="m-0 text-xs text-body-medium">{tk("caption")}</p>
    </div>
  )
}

export default SandwichAttackClient
