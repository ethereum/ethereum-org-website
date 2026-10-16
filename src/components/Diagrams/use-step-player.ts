"use client"

import { useEffect, useState } from "react"

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion"

/**
 * Step state for a diagram with no presets: step 0 is idle, then 1 to
 * `lastStep`. `run` starts from step 1 (or carries on from the current
 * step) and advances on its own, one dwell per step; `goTo` stops a run and
 * jumps. With reduced motion nothing moves, so steps get longer reading time.
 */
export function useStepPlayer({
  lastStep,
  initialStep = 0,
  dwellMs = 2000,
  dwellReducedMs = 2400,
  paused = false,
}: {
  lastStep: number
  initialStep?: number
  dwellMs?: number
  dwellReducedMs?: number
  /** Off screen: a run holds where it is and carries on when unpaused. */
  paused?: boolean
}) {
  const { prefersReducedMotion } = usePrefersReducedMotion()
  const [step, setStep] = useState(Math.min(Math.max(initialStep, 0), lastStep))
  const [isRunning, setIsRunning] = useState(false)
  const atEnd = step >= lastStep

  useEffect(() => {
    if (!isRunning || paused || atEnd) return
    const timeout = window.setTimeout(
      () => {
        setStep(step + 1)
        if (step + 1 >= lastStep) setIsRunning(false)
      },
      prefersReducedMotion ? dwellReducedMs : dwellMs
    )
    return () => window.clearTimeout(timeout)
  }, [
    isRunning,
    paused,
    atEnd,
    step,
    lastStep,
    prefersReducedMotion,
    dwellMs,
    dwellReducedMs,
  ])

  const goTo = (index: number) => {
    setIsRunning(false)
    setStep(Math.min(Math.max(index, 0), lastStep))
  }

  const run = () => {
    const next = atEnd || step === 0 ? 1 : step + 1
    setStep(next)
    setIsRunning(next < lastStep)
  }

  return { step, isRunning, atEnd, run, goTo, prefersReducedMotion }
}
