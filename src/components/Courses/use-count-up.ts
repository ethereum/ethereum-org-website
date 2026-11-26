import { useEffect, useState } from "react"

/** Eased number tween; returns `to` immediately when disabled */
export const useCountUp = (
  from: number,
  to: number,
  {
    enabled,
    delay = 0,
    duration = 900,
  }: { enabled: boolean; delay?: number; duration?: number }
) => {
  const [value, setValue] = useState(enabled ? from : to)
  useEffect(() => {
    if (!enabled) return
    let frame = 0
    const timer = setTimeout(() => {
      const start = performance.now()
      const tick = (now: number) => {
        // A frame timestamp can predate `start`; below 0 the ease goes negative
        const p = Math.min(Math.max((now - start) / duration, 0), 1)
        setValue(from + (to - from) * (1 - Math.pow(1 - p, 3)))
        if (p < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }, delay * 1000)
    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(frame)
    }
  }, [from, to, enabled, delay, duration])
  return value
}
