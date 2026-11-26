/**
 * Per-step answer history, kept for a future daily review that resurfaces
 * steps a learner missed or hasn't seen lately.
 */
export interface StepRecord {
  /** Completed runs that included this step */
  seen: number
  /** Runs where the first try was wrong */
  missed: number
  lastAt: string
  lastCorrect: boolean
}

/** History key: `{course}/{lesson}/{step}`; a course check's lesson is `exam` */
export const stepHistoryKey = (
  courseId: string,
  lessonId: string,
  stepId: string
) => `${courseId}/${lessonId}/${stepId}`

/** Adds one finished run's first-try results, by step id */
export const mergeStepResults = (
  history: Record<string, StepRecord> | undefined,
  courseId: string,
  lessonId: string,
  results: Record<string, boolean>,
  now: Date
): Record<string, StepRecord> => {
  const next = { ...history }
  for (const [stepId, correct] of Object.entries(results)) {
    const key = stepHistoryKey(courseId, lessonId, stepId)
    const previous = next[key]
    next[key] = {
      seen: (previous?.seen ?? 0) + 1,
      missed: (previous?.missed ?? 0) + (correct ? 0 : 1),
      lastAt: now.toISOString(),
      lastCorrect: correct,
    }
  }
  return next
}
