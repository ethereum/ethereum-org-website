"use client"

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react"
import { useLocale, useTranslations } from "next-intl"

import { Label } from "@/components/ui/label"
import Switch from "@/components/ui/switch"

import { cn } from "@/lib/utils/cn"
import { numberFormat } from "@/lib/utils/numbers"

import { createRandom } from "../shared/random"
import { richTags } from "../shared/rich-tags"
import { trackPrivacyLessonEvent } from "../shared/track"

const NS = "component-anonymity-crowd"

/** Roughly 1 in this many deposits match an unusual amount (simplified model) */
export const AMOUNT_RATIO = 250
/** Roughly 1 in this many deposits land within ten minutes of yours */
export const TIMING_RATIO = 30
/** The example unusual amount, in ETH */
const ODD_AMOUNT = 1.337
/** Most dots drawn; above this each dot stands for several people */
const MAX_DOTS = 2400
/** Slider 0-100 maps to 10^(v/20): 1 person to 100,000 */
const DEFAULT_SLIDER = 60
const SEED = 8141

// Seeded, so the crowd looks the same on every render and in snapshots.
// Dot 0 is "you", in the middle.
const POINTS: Array<[number, number]> = (() => {
  const random = createRandom(SEED)
  const points = Array.from(
    { length: MAX_DOTS },
    () => [random.next(), random.next()] as [number, number]
  )
  points[0] = [0.5, 0.5]
  return points
})()

/** People per drawn dot: one decimal below 10 (e.g. 1.3), whole numbers above */
const peoplePerDot = (size: number) => {
  const ratio = size / MAX_DOTS
  return ratio < 10 ? Math.round(ratio * 10) / 10 : Math.round(ratio)
}

export const crowdSize = (sliderValue: number) =>
  Math.round(Math.pow(10, sliderValue / 20))

export const effectiveCrowd = (
  size: number,
  { amount, timing }: { amount: boolean; timing: boolean }
) => {
  let effective = size
  if (amount) effective = Math.max(1, Math.round(effective / AMOUNT_RATIO))
  if (timing) effective = Math.max(1, Math.round(effective / TIMING_RATIO))
  return effective
}

/** Reads a semantic token (an HSL triplet) from the element's computed style */
const tokenColor = (element: Element, name: string, fallback: string) => {
  const value = getComputedStyle(element).getPropertyValue(name).trim()
  return value ? `hsla(${value})` : fallback
}

export interface AnonymityCrowdProps {
  /** "lesson" drops the title and intro, which the lesson chapter provides */
  variant?: "lesson" | "standalone"
  /** Initial slider position (0-100); 60 is a crowd of 1,000 */
  initialValue?: number
  className?: string
}

const AnonymityCrowd = ({
  variant = "standalone",
  initialValue = DEFAULT_SLIDER,
  className,
}: AnonymityCrowdProps) => {
  const t = useTranslations(NS)
  const locale = useLocale()
  const id = useId()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const tracked = useRef(false)

  const [sliderValue, setSliderValue] = useState(initialValue)
  const [amount, setAmount] = useState(false)
  const [timing, setTiming] = useState(false)

  const size = crowdSize(sliderValue)
  const effective = effectiveCrowd(size, { amount, timing })
  const format = useMemo(() => numberFormat(locale), [locale])

  const markUsed = () => {
    if (tracked.current) return
    tracked.current = true
    trackPrivacyLessonEvent("widget-used", "anonymity-crowd")
  }

  const youLabel = t(`${NS}-you-label`)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    if (!ctx || !width || !height) return

    const ratio = window.devicePixelRatio || 1
    const bufferWidth = Math.round(width * ratio)
    const bufferHeight = Math.round(height * ratio)
    if (canvas.width !== bufferWidth || canvas.height !== bufferHeight) {
      canvas.width = bufferWidth
      canvas.height = bufferHeight
    }
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0)

    const cover = tokenColor(canvas, "--primary", "#6c24df")
    const dim = tokenColor(canvas, "--body-medium", "#757575")
    const leak = tokenColor(canvas, "--leak", "#c2410c")
    const ground = tokenColor(canvas, "--background-highlight", "#fafafa")
    const rtl = getComputedStyle(canvas).direction === "rtl"

    ctx.globalAlpha = 1
    ctx.fillStyle = ground
    ctx.fillRect(0, 0, width, height)

    const shown = Math.min(size, MAX_DOTS)
    const covering = Math.max(1, Math.round((shown * effective) / size))
    const radius = Math.max(
      1.1,
      Math.min(7, Math.sqrt((width * height) / shown) * 0.2)
    )
    const pad = 16
    const x = (value: number) => pad + value * (width - 2 * pad)
    const y = (value: number) => pad + value * (height - 2 * pad)

    for (let i = shown - 1; i >= 1; i--) {
      const hides = i < covering
      ctx.globalAlpha = hides ? 0.78 : 0.3
      ctx.fillStyle = hides ? cover : dim
      ctx.beginPath()
      ctx.arc(x(POINTS[i][0]), y(POINTS[i][1]), radius, 0, Math.PI * 2)
      ctx.fill()
    }

    // You, ringed in the leak color
    ctx.globalAlpha = 1
    const cx = x(0.5)
    const cy = y(0.5)
    const youRadius = Math.max(radius, 3.5)
    ctx.fillStyle = leak
    ctx.beginPath()
    ctx.arc(cx, cy, youRadius, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = leak
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.arc(cx, cy, youRadius + 6, 0, Math.PI * 2)
    ctx.stroke()

    // The label sits on the inline-end side of the dot, so it mirrors in RTL
    const fontFamily = getComputedStyle(canvas).fontFamily
    ctx.font = `600 13px ${fontFamily}`
    ctx.textBaseline = "middle"
    ctx.textAlign = rtl ? "right" : "left"
    const textWidth = ctx.measureText(youLabel).width
    const gap = youRadius + 12
    const labelX = rtl ? cx - gap : cx + gap
    const boxX = rtl ? labelX - textWidth - 5 : labelX - 5
    ctx.fillStyle = ground
    ctx.beginPath()
    if (ctx.roundRect) ctx.roundRect(boxX, cy - 10, textWidth + 10, 20, 10)
    else ctx.rect(boxX, cy - 10, textWidth + 10, 20)
    ctx.fill()
    ctx.fillStyle = leak
    ctx.fillText(youLabel, labelX, cy)
  }, [size, effective, youLabel])

  // Redraw on state changes, size changes, and theme switches (.dark on <html>)
  useEffect(() => {
    draw()
    const canvas = canvasRef.current
    if (!canvas) return
    const resize =
      "ResizeObserver" in window ? new ResizeObserver(() => draw()) : null
    resize?.observe(canvas)
    const theme = new MutationObserver(() => draw())
    theme.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme", "style", "dir"],
    })
    const scheme = window.matchMedia("(prefers-color-scheme: dark)")
    scheme.addEventListener?.("change", draw)
    document.fonts?.ready.then(() => draw())
    return () => {
      resize?.disconnect()
      theme.disconnect()
      scheme.removeEventListener?.("change", draw)
    }
  }, [draw])

  const verdict =
    size === 1
      ? t(`${NS}-verdict-alone`)
      : effective === 1
        ? t(`${NS}-verdict-habits-collapse`)
        : effective < size
          ? t(`${NS}-verdict-habits-shrink`, { count: effective })
          : size < 100
            ? t(`${NS}-verdict-small`)
            : t(`${NS}-verdict-large`)

  const sliderId = `${id}-size`
  const amountId = `${id}-amount`
  const timingId = `${id}-timing`
  const oddAmount = `${numberFormat(locale, { maximumFractionDigits: 3 }).format(ODD_AMOUNT)} ETH`

  const readouts = [
    { key: "pool", label: t(`${NS}-readout-pool`), value: format.format(size) },
    {
      key: "hiding",
      label: t(`${NS}-readout-hiding`),
      value: effective === 1 ? t(`${NS}-just-you`) : format.format(effective),
      alone: effective === 1,
    },
    {
      key: "odds",
      label: t(`${NS}-readout-odds`),
      value:
        effective === 1
          ? t(`${NS}-odds-certain`)
          : t(`${NS}-odds-value`, { count: format.format(effective) }),
      alone: effective === 1,
    },
  ]

  return (
    <div className={cn("space-y-6", className)}>
      {variant === "standalone" && (
        <div className="space-y-2">
          <h3 className="text-h5">{t(`${NS}-title`)}</h3>
          <p>
            {t.rich(`${NS}-intro`, richTags({ glossary: "shielded-pool" }))}
          </p>
          <p className="text-body-medium">{t(`${NS}-instructions`)}</p>
        </div>
      )}

      <figure className="m-0 space-y-4 rounded-base border p-4 md:p-6">
        <div className="overflow-hidden rounded-base border">
          <canvas
            ref={canvasRef}
            role="img"
            aria-label={t(`${NS}-canvas-label`)}
            className="block h-56 w-full md:h-72"
          />
        </div>
        <p className="text-sm text-body-medium">
          {size > MAX_DOTS
            ? t(`${NS}-dot-scale-many`, { count: peoplePerDot(size) })
            : t(`${NS}-dot-scale-one`)}
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor={sliderId} className="text-base font-semibold">
              {t(`${NS}-slider-label`)}
            </Label>
            <input
              id={sliderId}
              type="range"
              min={0}
              max={100}
              step={1}
              value={sliderValue}
              aria-valuetext={t(`${NS}-slider-value`, { count: size })}
              onChange={(event) => {
                setSliderValue(Number(event.target.value))
                markUsed()
              }}
              className="h-7 w-full cursor-pointer accent-primary"
            />
          </div>

          <div className="space-y-4">
            {[
              {
                key: "amount",
                inputId: amountId,
                checked: amount,
                set: setAmount,
                label: t(`${NS}-habit-amount-label`),
                description: t(`${NS}-habit-amount-description`, {
                  amount: oddAmount,
                }),
              },
              {
                key: "timing",
                inputId: timingId,
                checked: timing,
                set: setTiming,
                label: t(`${NS}-habit-timing-label`),
                description: t(`${NS}-habit-timing-description`),
              },
            ].map(({ key, inputId, checked, set, label, description }) => (
              <div key={key} className="flex items-start gap-3">
                <Switch
                  id={inputId}
                  checked={checked}
                  aria-describedby={`${inputId}-description`}
                  onCheckedChange={(value) => {
                    set(value)
                    markUsed()
                  }}
                  className="mt-1 shrink-0"
                />
                <div className="space-y-1">
                  <Label htmlFor={inputId} className="text-base leading-snug">
                    {label}
                  </Label>
                  <p
                    id={`${inputId}-description`}
                    className="text-sm text-body-medium"
                  >
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <dl className="m-0 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {readouts.map(({ key, label, value, alone }) => (
            <div key={key} className="rounded-base bg-background-highlight p-3">
              <dt className="text-sm text-body-medium">{label}</dt>
              <dd
                className={cn(
                  "m-0 text-xl font-bold",
                  alone ? "text-leak-high-contrast" : "text-body"
                )}
              >
                {/* Isolates "1 in N" so its digits don't reorder in RTL text */}
                <bdi>{value}</bdi>
              </dd>
            </div>
          ))}
        </dl>

        <p aria-live="polite" className="font-semibold">
          {verdict}
        </p>

        <figcaption className="text-sm text-body-medium">
          {t(`${NS}-caption`, {
            amountRatio: format.format(AMOUNT_RATIO),
            timingRatio: format.format(TIMING_RATIO),
          })}
        </figcaption>
      </figure>

      <p>{t.rich(`${NS}-takeaway`, richTags())}</p>
    </div>
  )
}

export default AnonymityCrowd
