"use client"

import { useEffect, useId, useState } from "react"
import { Link2, Unlink, Wrench } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/buttons/Button"
import Input from "@/components/ui/input"

import { cn } from "@/lib/utils/cn"

import { chunkyButton } from "../theme"

import type { WidgetProps } from "./types"
import WidgetShell from "./widget-shell"

const GENESIS = `0x${"0".repeat(64)}`
const COUNT = 3

const hashBlock = async (n: number, data: string, prev: string) => {
  const { keccak256, stringToHex } = await import("viem")
  return keccak256(stringToHex(`${n}|${data}|${prev}`))
}

const short = (hex: string) => `${hex.slice(0, 8)}…${hex.slice(-4)}`

const ChainTamperWidget = ({ onComplete }: WidgetProps) => {
  const t = useTranslations("page-courses")
  const baseId = useId()
  const originals = Array.from({ length: COUNT }, (_, i) =>
    t(`page-courses-widget-chain-data-${i + 1}`)
  )

  const [data, setData] = useState(originals)
  const [prev, setPrev] = useState<string[] | null>(null)
  const [computed, setComputed] = useState<{
    key: string
    values: string[]
  } | null>(null)
  const [relinks, setRelinks] = useState(0)
  const [done, setDone] = useState(false)

  // Build the initial, correctly linked chain
  useEffect(() => {
    let active = true
    ;(async () => {
      const links = [GENESIS]
      for (let i = 0; i < COUNT - 1; i++) {
        links.push(await hashBlock(i + 1, originals[i], links[i]))
      }
      if (active) setPrev(links)
    })()
    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!prev) return
    let active = true
    const key = JSON.stringify([data, prev])
    Promise.all(data.map((d, i) => hashBlock(i + 1, d, prev[i]))).then(
      (values) => active && setComputed({ key, values })
    )
    return () => {
      active = false
    }
  }, [data, prev])

  // Ignore hashes still being computed for an older chain state
  const hashes =
    computed && computed.key === JSON.stringify([data, prev])
      ? computed.values
      : null
  const shownHashes = computed?.values ?? null

  const linked = (i: number) =>
    !!prev && !!shownHashes && (i === 0 || prev[i] === shownHashes[i - 1])
  const tampered = data.some((d, i) => d !== originals[i])
  const allLinked =
    !!hashes &&
    Array.from({ length: COUNT }, (_, i) => linked(i)).every(Boolean)
  const brokenSomewhere =
    !!shownHashes &&
    Array.from({ length: COUNT }, (_, i) => linked(i)).some((ok) => !ok)

  useEffect(() => {
    if (!done && tampered && relinks > 0 && allLinked) {
      setDone(true)
      onComplete()
    }
  }, [done, tampered, relinks, allLinked, onComplete])

  const relink = (i: number) => {
    if (!prev || !shownHashes) return
    setPrev(prev.map((p, idx) => (idx === i ? shownHashes[i - 1] : p)))
    setRelinks((n) => n + 1)
  }

  const repaired = done && allLinked

  return (
    <WidgetShell>
      {/* Stacked top to bottom so each block gets the full width */}
      <ol className="m-0 flex list-none flex-col items-stretch">
        {data.map((value, i) => {
          const ok = linked(i)
          return (
            <li key={i} className="m-0 flex flex-col items-center">
              {i > 0 && (
                <div
                  aria-hidden
                  className={cn(
                    "flex flex-col items-center transition-colors",
                    ok
                      ? "text-green-700 dark:text-green-400"
                      : "text-error dark:text-red-400"
                  )}
                >
                  <span className="h-3 w-0.5 bg-current" />
                  <span
                    className={cn(
                      "grid place-items-center rounded-full p-1.5 text-white",
                      ok ? "bg-green-700" : "bg-error"
                    )}
                  >
                    {ok ? (
                      <Link2 className="size-5" />
                    ) : (
                      <Unlink className="size-5" />
                    )}
                  </span>
                  <span className="h-3 w-0.5 bg-current" />
                </div>
              )}
              <div
                className={cn(
                  "flex w-full flex-col gap-3 rounded-2xl border-2 border-b-[6px] bg-background p-4 transition-colors",
                  ok ? "border-(--course-soft)" : "border-error",
                  !ok && "motion-safe:animate-[course-shake_0.35s_ease-in-out]"
                )}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded-full bg-(--course) px-3 py-0.5 text-sm font-black whitespace-nowrap text-white">
                    {t("page-courses-widget-chain-block", { number: i + 1 })}
                  </span>
                  <span
                    className={cn(
                      "text-sm font-bold uppercase",
                      ok
                        ? "text-green-700 dark:text-green-400"
                        : "text-error dark:text-red-400"
                    )}
                  >
                    {ok
                      ? t("page-courses-widget-chain-ok")
                      : t("page-courses-widget-chain-broken")}
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor={`${baseId}-${i}`}
                      className="text-sm font-bold text-body-medium"
                    >
                      {t("page-courses-widget-chain-data")}
                    </label>
                    <Input
                      id={`${baseId}-${i}`}
                      value={value}
                      onChange={(e) =>
                        setData(
                          data.map((d, idx) => (idx === i ? e.target.value : d))
                        )
                      }
                    />
                  </div>
                  <dl className="m-0 grid grid-cols-[auto_1fr] content-center gap-x-3 gap-y-1 text-sm">
                    <dt className="font-bold text-body-medium">
                      {t("page-courses-widget-chain-prev")}
                    </dt>
                    <dd
                      dir="ltr"
                      className={cn(
                        "m-0 text-start font-mono",
                        !ok && "text-error line-through dark:text-red-400"
                      )}
                    >
                      {prev ? short(prev[i]) : "…"}
                    </dd>
                    <dt className="font-bold text-body-medium">
                      {t("page-courses-widget-chain-hash")}
                    </dt>
                    <dd dir="ltr" className="m-0 text-start font-mono">
                      {shownHashes ? short(shownHashes[i]) : "…"}
                    </dd>
                  </dl>
                </div>

                {!ok && (
                  <Button
                    variant="ghost"
                    onClick={() => relink(i)}
                    className={cn(chunkyButton, "self-start")}
                  >
                    <Wrench />
                    {t("page-courses-widget-chain-relink")}
                  </Button>
                )}
              </div>
            </li>
          )
        })}
      </ol>
      <p
        role="status"
        className={cn(
          "m-0 min-h-6",
          repaired
            ? "text-green-700 dark:text-green-400"
            : "text-error dark:text-red-400"
        )}
      >
        {repaired
          ? t("page-courses-widget-chain-repaired")
          : brokenSomewhere
            ? t("page-courses-widget-chain-tampered")
            : ""}
      </p>
    </WidgetShell>
  )
}

export default ChainTamperWidget
