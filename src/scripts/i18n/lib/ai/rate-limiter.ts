/**
 * Simple semaphore-based concurrency limiter with delay between requests.
 */

export interface RateLimiter {
  acquire(): Promise<void>
  release(): void
}

export function createRateLimiter(
  maxConcurrent: number,
  delayBetweenMs: number = 1000
): RateLimiter {
  let active = 0
  const queue: Array<() => void> = []

  return {
    acquire(): Promise<void> {
      return new Promise((resolve) => {
        const tryRun = () => {
          if (active < maxConcurrent) {
            active++
            // Stagger requests with minimum floor to prevent burst
            const minDelay = Math.max(delayBetweenMs * 0.25, 100)
            setTimeout(resolve, minDelay + delayBetweenMs * 0.75 * Math.random())
          } else {
            queue.push(tryRun)
          }
        }
        tryRun()
      })
    },
    release() {
      active--
      const next = queue.shift()
      if (next) next()
    },
  }
}
