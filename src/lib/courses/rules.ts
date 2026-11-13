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

/** Shortest believable time between mastery check answers */
export const MIN_ANSWER_MS = 3000

/** Mastery check attempts per course per UTC calendar day */
export const EXAM_ATTEMPTS_PER_DAY = 2

/** The same picks, in any order */
export const samePicks = (a: string[], b: string[]) =>
  a.length === b.length && a.every((id) => b.includes(id))
