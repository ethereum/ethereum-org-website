"use client"

import { useEffect, useState } from "react"

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"

/**
 * Step state shared by every interactive diagram. `idle` is the state before
 * the primary action; steps run from `idle + 1` to `last`. `run` starts the
 * first step (or carries on from the current one) and advances on its own,
 * one dwell per step; `goTo` stops a run and jumps. With reduced motion
 * nothing moves, so steps get longer reading time. `last` may change with
 * the preset (e.g. a run that fails early).
 */
export function useStepPlayer({
  idle,
  last,
  initial = idle,
  dwellMs = 2000,
  dwellReducedMs = 2400,
  paused = false,
}: {
  idle: number
  last: number
  initial?: number
  dwellMs?: number
  dwellReducedMs?: number
  /** Off screen: a run holds where it is and carries on when unpaused. */
  paused?: boolean
}) {
  const { prefersReducedMotion } = usePrefersReducedMotion()
  const clamp = (index: number) => Math.min(Math.max(index, idle), last)
  const [requested, setRequested] = useState(initial)
  const [isRunning, setIsRunning] = useState(false)
  const step = clamp(requested)
  const atEnd = step >= last

  useEffect(() => {
    if (!isRunning || paused || atEnd) return
    const timeout = window.setTimeout(
      () => {
        setRequested(step + 1)
        if (step + 1 >= last) setIsRunning(false)
      },
      prefersReducedMotion ? dwellReducedMs : dwellMs
    )
    return () => window.clearTimeout(timeout)
  }, [
    isRunning,
    paused,
    atEnd,
    step,
    last,
    prefersReducedMotion,
    dwellMs,
    dwellReducedMs,
  ])

  const goTo = (index: number) => {
    setIsRunning(false)
    setRequested(clamp(index))
  }

  const run = () => {
    const next = atEnd || step === idle ? idle + 1 : step + 1
    setRequested(next)
    setIsRunning(next < last)
  }

  return {
    step,
    isRunning,
    atEnd,
    run,
    goTo,
    reset: () => goTo(idle),
    prefersReducedMotion,
  }
}
