"use client"

import { useEffect, useId, useState } from "react"
import { Fingerprint } from "lucide-react"
import { useTranslations } from "next-intl"

import Input from "@/components/ui/input"

import { cn } from "@/lib/utils/cn"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

const keccak = async (text: string) => {
  const { keccak256, stringToHex } = await import("viem")
  return keccak256(stringToHex(text)).slice(2)
}

// One hue per hex digit; fixed lightness reads on both themes
const cellColor = (digit: string) =>
  `hsl(${parseInt(digit, 16) * 22.5} 70% 58%)`

const HashPlaygroundWidget = ({ onComplete }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const inputId = useId()
  const original = t("page-courses-widget-hash-default")

  const [text, setText] = useState(original)
  const [hash, setHash] = useState<string | null>(null)
  const [baseline, setBaseline] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let active = true
    keccak(text).then((h) => {
      if (!active) return
      setHash(h)
      setBaseline((b) => b ?? h)
    })
    return () => {
      active = false
    }
  }, [text])

  useEffect(() => {
    if (!done && hash && baseline && hash !== baseline && text !== original) {
      setDone(true)
      onComplete()
    }
  }, [hash, baseline, text, original, done, onComplete])

  // Number-free readout: the beginner course has no counts
  const changed = !!hash && !!baseline && hash !== baseline

  return (
    <WidgetShell>
      <div className="flex flex-col gap-2">
        <label htmlFor={inputId} className="text-sm font-bold">
          {t("page-courses-widget-hash-input")}
        </label>
        <Input
          id={inputId}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="text-lg"
          spellCheck={false}
          autoComplete="off"
        />
        <p className="m-0 text-sm text-body-medium">
          {t("page-courses-widget-hash-hint")}
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 rounded-2xl bg-background p-4 md:flex-row md:items-start">
        <div
          aria-hidden
          className="grid shrink-0 grid-cols-8 gap-1 rounded-xl bg-background-highlight p-2"
        >
          {Array.from({ length: 64 }, (_, i) => {
            const digit = hash?.[i] ?? "0"
            const diff = !!baseline && !!hash && baseline[i] !== hash[i]
            return (
              <span
                key={i}
                className={cn(
                  "size-5 rounded-[5px] transition-[background-color,transform] duration-300 md:size-6",
                  diff && "scale-90"
                )}
                style={{ backgroundColor: hash ? cellColor(digit) : undefined }}
              />
            )
          })}
        </div>
        <div className="flex min-w-0 flex-col gap-2">
          <p className="m-0 flex items-center gap-2 text-sm font-bold">
            <Fingerprint
              className="size-5 text-(--course-strong) dark:text-(--course-bright)"
              aria-hidden
            />
            {t("page-courses-widget-hash-output")}
          </p>
          <code dir="ltr" className="text-sm break-all">
            {hash ? `0x${hash}` : "…"}
          </code>
          <p
            role="status"
            className={cn(
              "m-0 font-bold",
              changed
                ? "text-(--course-strong) dark:text-(--course-bright)"
                : "text-body-medium"
            )}
          >
            {t(
              changed
                ? "page-courses-widget-hash-changed"
                : done
                  ? "page-courses-widget-hash-back"
                  : "page-courses-widget-hash-same"
            )}
          </p>
        </div>
      </div>
    </WidgetShell>
  )
}

export default HashPlaygroundWidget
