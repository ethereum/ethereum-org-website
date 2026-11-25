/** Reports are triage notes: short is plenty */
export const NOTE_MAX = 300

export const REPORT_REASONS = [
  "inaccurate",
  "question",
  "answer",
  "other",
] as const
export type ReportReason = (typeof REPORT_REASONS)[number]

/** Reports one address can send per hour, to the learner database */
export const REPORTS_PER_HOUR = 20

export interface ReportContext {
  courseId: string
  lessonId: string
  stepId: string
  /** The learner's current answer, if any, to reproduce the report; a
   * match or fill answer has a slot per term or blank, "" if unfilled */
  answer?: string[]
}

/** The note as stored and tracked: one line, capped */
export const cleanNote = (note: string) =>
  note.trim().replace(/\s+/g, " ").slice(0, NOTE_MAX)

/** Matomo event name: where the report came from, then the learner's words */
export const reportEventName = ({
  courseId,
  lessonId,
  stepId,
  answer,
  note,
}: ReportContext & { note: string }) =>
  [
    `${courseId}/${lessonId}/${stepId}`,
    answer?.some(Boolean) ? `answer: ${answer.join(",")}` : "",
    cleanNote(note),
  ]
    .filter(Boolean)
    .join(" | ")
