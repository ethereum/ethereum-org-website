/** Result of a server-graded Course Mastery attempt */
export interface ExamFinish {
  score: number
  passed: boolean
  /** Right or wrong, by question id: only after a pass */
  results?: Record<string, boolean>
  /** Right options by question id: only after a pass */
  review?: Record<string, string[]>
  attemptsLeft: number
  /** When the daily limit resets, once it's used up */
  retryAt?: string
}

/**
 * A Course Mastery attempt held by the server, as the lesson player sees it.
 * Answers are saved without a verdict; `finish` grades them all at once.
 */
export interface ExamSession {
  /** Attempts left today after this one */
  attemptsLeft: number
  /** Picks already saved in a resumed attempt, by question id */
  answered: Record<string, string[]>
  /** Save (or change) an answer; false when the request failed */
  submit: (questionId: string, optionIds: string[]) => Promise<boolean>
  finish: () => Promise<ExamFinish | null>
  /** Start another attempt, if today's limit allows */
  restart: () => void
}
