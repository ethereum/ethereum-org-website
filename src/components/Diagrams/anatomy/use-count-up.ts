import { useEffect, useRef, useState } from "react"

/**
 * A number that counts from its last value to `target` (ease-out), for
 * readouts that should move in step with the drawing. The one JS-driven
 * motion in anatomy diagrams: a one-shot tween of `duration` ms after
 * `delay` ms, and an immediate jump when `instant` (reduced motion).
 */
export function useCountUp(
  target: number,
  {
    duration = 700,
    delay = 0,
    instant = false,
  }: { duration?: number; delay?: number; instant?: boolean } = {}
) {
  const [value, setValue] = useState(target)
  const current = useRef(target)

  useEffect(() => {
    const from = current.current
    const span = instant ? 1 : duration
    const wait = instant ? 0 : delay
    let start: number | null = null
    let frame = 0

    const tick = (now: number) => {
      start ??= now
      const t = Math.min(1, Math.max(0, (now - start - wait) / span))
      const next = Math.round(from + (target - from) * (1 - (1 - t) ** 3))
      current.current = next
      setValue(next)
      if (t < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, duration, delay, instant])

  return value
}
