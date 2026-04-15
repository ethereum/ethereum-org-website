/**
 * Concurrency task pool with per-language tracking.
 *
 * Wraps the rate limiter semaphore with:
 * - Language-aware task submission
 * - Per-language completion callbacks (fires once when all tasks for a language finish)
 * - Token usage accumulation per language
 *
 * See CONCURRENCY-SPEC.md Part 1.
 */

import { createRateLimiter } from "./rate-limiter"

export interface TokenUsage {
  input: number
  output: number
}

export interface TaskResult {
  tokens?: TokenUsage
}

export interface TaskPoolOptions {
  concurrency: number
  delayBetweenMs?: number
  onLanguageComplete?: (language: string, stats: LanguageStats) => void
}

export interface LanguageStats {
  tasksCompleted: number
  totalInputTokens: number
  totalOutputTokens: number
}

export interface TaskPool {
  submit(language: string, task: () => Promise<TaskResult | void>): void
  drain(): Promise<void>
  getStats(): Record<string, LanguageStats>
  hasErrors(): boolean
  getErrors(): Array<{ language: string; error: Error }>
}

export function createTaskPool(options: TaskPoolOptions): TaskPool
export function createTaskPool(concurrency: number): TaskPool
export function createTaskPool(
  optionsOrConcurrency: TaskPoolOptions | number
): TaskPool {
  const opts: TaskPoolOptions =
    typeof optionsOrConcurrency === "number"
      ? { concurrency: optionsOrConcurrency }
      : optionsOrConcurrency

  const limiter = createRateLimiter(opts.concurrency, opts.delayBetweenMs ?? 0)

  const stats: Record<string, LanguageStats> = {}
  const pendingByLanguage: Record<string, number> = {}
  const completedByLanguage: Set<string> = new Set()
  const allTasks: Promise<void>[] = []
  const errors: Array<{ language: string; error: Error }> = []

  function ensureLanguage(lang: string) {
    if (!stats[lang]) {
      stats[lang] = {
        tasksCompleted: 0,
        totalInputTokens: 0,
        totalOutputTokens: 0,
      }
      pendingByLanguage[lang] = 0
    }
  }

  function submit(
    language: string,
    task: () => Promise<TaskResult | void>
  ): void {
    ensureLanguage(language)
    pendingByLanguage[language]++

    const wrapped = (async () => {
      await limiter.acquire()
      try {
        const result = await task()
        if (result?.tokens) {
          stats[language].totalInputTokens += result.tokens.input
          stats[language].totalOutputTokens += result.tokens.output
        }
        stats[language].tasksCompleted++
      } catch (err) {
        errors.push({
          language,
          error: err instanceof Error ? err : new Error(String(err)),
        })
      } finally {
        limiter.release()
        pendingByLanguage[language]--

        if (
          pendingByLanguage[language] === 0 &&
          !completedByLanguage.has(language)
        ) {
          completedByLanguage.add(language)
          opts.onLanguageComplete?.(language, { ...stats[language] })
        }
      }
    })()

    allTasks.push(wrapped)
  }

  async function drain(): Promise<void> {
    await Promise.all(allTasks)
  }

  function getStats(): Record<string, LanguageStats> {
    return { ...stats }
  }

  return {
    submit,
    drain,
    getStats,
    hasErrors: () => errors.length > 0,
    getErrors: () => [...errors],
  }
}
