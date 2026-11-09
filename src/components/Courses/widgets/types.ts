/** A puzzle widget's current answer, graded when the learner presses Check */
export interface WidgetAnswer {
  correct: boolean
  /** Translated nudge shown when the answer is wrong */
  hint?: string
}

export interface WidgetProps {
  /** Exploration widgets: called once the learner has done what the step asks */
  onComplete: () => void
  /** Puzzle widgets: report the answer as it changes; null until there is one */
  onAnswer: (answer: WidgetAnswer | null) => void
  /** True once the step is answered correctly; controls should freeze */
  locked: boolean
  /**
   * True after Check marks the current answer wrong, until it changes.
   * Single-pick widgets mark only the learner's pick, never the right one.
   */
  wrong?: boolean
}
