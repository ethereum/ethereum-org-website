/**
 * Course rules shared by the browser and the server, which enforces them for
 * signed-in learners. Rationale: the courses skill's accounts reference.
 */

export const XP_LESSON = 10
export const XP_PERFECT_BONUS = 5
export const XP_REPLAY = 5
export const XP_EXAM_PASS = 30

/** Shortest believable time per lesson step */
export const MIN_STEP_MS = 2000

/** Shortest believable time between Course Mastery answers */
export const MIN_ANSWER_MS = 3000

/** Course Mastery attempts per course per calendar day */
export const EXAM_ATTEMPTS_PER_DAY = 2

/** The same picks, in any order */
export const samePicks = (a: string[], b: string[]) =>
  a.length === b.length && a.every((id) => b.includes(id))

/**
 * The daily limit counts the learner's own calendar day (the time zone their
 * browser last reported). Switching zones can't stack days: no more than
 * twice the limit in any 24 hours, the most an honest late-night and
 * early-morning learner can reach.
 */
export const EXAM_ATTEMPTS_PER_24H = EXAM_ATTEMPTS_PER_DAY * 2

const DAY_MS = 86_400_000

/**
 * Attempts left at `now` from when earlier ones started (any order), and
 * when the next one opens if none are
 */
export const examAttemptsLeft = (
  started: Date[],
  todayStart: Date,
  tomorrowStart: Date,
  now = new Date()
) => {
  const window = started
    .filter((at) => at.getTime() > now.getTime() - DAY_MS)
    .sort((a, b) => a.getTime() - b.getTime())
  const today = started.filter((at) => at >= todayStart).length
  const left = Math.max(
    0,
    Math.min(
      EXAM_ATTEMPTS_PER_DAY - today,
      EXAM_ATTEMPTS_PER_24H - window.length
    )
  )
  if (left) return { left, retryAt: undefined }
  const opens = [
    today >= EXAM_ATTEMPTS_PER_DAY ? tomorrowStart.getTime() : 0,
    window.length >= EXAM_ATTEMPTS_PER_24H
      ? window[window.length - EXAM_ATTEMPTS_PER_24H].getTime() + DAY_MS
      : 0,
  ]
  return { left, retryAt: new Date(Math.max(...opens)) }
}
