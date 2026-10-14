"use client"

import { type ReactNode, useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils/cn"

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"

export type LogTone = "default" | "leak" | "alert" | "safe" | "dim"

export interface LogLine {
  /** Stable key; keep ids unique within one log */
  id: string
  content: ReactNode
  tone?: LogTone
  /** Optional machine prefix (a time, a method name), shown LTR in mono */
  prefix?: ReactNode
}

const toneClass: Record<LogTone, string> = {
  default: "text-body",
  leak: "text-leak-high-contrast font-semibold",
  alert: "text-error font-semibold",
  safe: "text-success",
  dim: "text-body-medium",
}

export interface LogLinesProps {
  lines: LogLine[]
  /** Accessible name for the log region */
  label: string
  /** Delay between printed lines, in ms. Ignored with reduced motion. */
  delay?: number
  /** Called once all current lines are shown */
  onDone?: () => void
  className?: string
}

/**
 * A terminal-style log that prints its lines one at a time. Pass the full
 * list; lines appended later print in turn, a shorter list restarts it.
 * With reduced motion every line shows at once.
 */
const LogLines = ({
  lines,
  label,
  delay = 220,
  onDone,
  className,
}: LogLinesProps) => {
  const { prefersReducedMotion } = usePrefersReducedMotion()
  const [shown, setShown] = useState(0)
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  // A shorter list (a reset) starts printing again from the top
  useEffect(() => {
    setShown((count) => (lines.length < count ? 0 : count))
  }, [lines.length])

  useEffect(() => {
    if (shown >= lines.length) {
      if (lines.length) onDoneRef.current?.()
      return
    }
    if (prefersReducedMotion) {
      setShown(lines.length)
      return
    }
    const timer = setTimeout(() => setShown((count) => count + 1), delay)
    return () => clearTimeout(timer)
  }, [shown, lines.length, delay, prefersReducedMotion])

  return (
    <ol
      role="log"
      aria-label={label}
      className={cn(
        "m-0 list-none space-y-1 overflow-x-auto rounded-base border bg-background-highlight p-4 font-mono text-sm",
        className
      )}
    >
      {lines
        .slice(0, shown)
        .map(({ id, content, tone = "default", prefix }) => (
          <li
            key={id}
            className={cn(
              "flex gap-x-3 motion-safe:animate-fade-in",
              toneClass[tone]
            )}
          >
            {prefix && (
              <span dir="ltr" className="shrink-0 text-body-medium">
                {prefix}
              </span>
            )}
            <span className="min-w-0">{content}</span>
          </li>
        ))}
    </ol>
  )
}

export default LogLines
