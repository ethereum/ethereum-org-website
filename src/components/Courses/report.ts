/** Keeps the Matomo event name readable; reports are triage notes */
export const NOTE_MAX = 300

export interface ReportContext {
  courseId: string
  lessonId: string
  stepId: string
  /** The learner's current answer, if any, to reproduce the report */
  answer?: string[]
}

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
    answer?.length ? `answer: ${answer.join(",")}` : "",
    note.trim().replace(/\s+/g, " ").slice(0, NOTE_MAX),
  ]
    .filter(Boolean)
    .join(" | ")
