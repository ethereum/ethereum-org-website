/**
 * Course content is pure structure: every user-facing string lives in
 * `page-courses.json`, keyed by convention (see `stepKey`) so the intl pipeline
 * translates lessons like any other page namespace.
 */

export type CourseWidgetId =
  | "key-pair"
  | "gas-fee"
  | "sign-verify"
  | "block-builder"
  | "hash-playground"
  | "chain-tamper"
  | "stake-vote"
  | "address-check"
  | "custody-sort"
  | "node-network"
  | "finality-clock"
  | "gas-limit"
  | "explorer-labels"
  | "unit-converter"
  | "supply-balance"
  | "wrap-eth"
  | "vending-machine"
  | "call-sorter"
  | "token-ledger"
  | "approval-scope"

/** Course accent colour; drives the path, buttons and art */
export type CourseTheme = "purple" | "orange" | "teal" | "blue" | "pink"

/** Decorative isometric illustration */
export type CourseArtId =
  | "diamond"
  | "blocks"
  | "coins"
  | "vault"
  | "tank"
  | "contract"

/** Icon on a lesson's path node */
export type LessonIconId =
  | "key"
  | "scroll"
  | "pen"
  | "send"
  | "fuel"
  | "box"
  | "fingerprint"
  | "link"
  | "shield"
  | "at"
  | "wallet"
  | "server"
  | "badge"
  | "alert"
  | "search"
  | "coins"
  | "calculator"
  | "flame"
  | "gift"
  | "piggy"
  | "code"
  | "pointer"
  | "eye"
  | "bug"

interface StepBase {
  /** Unique within its lesson; forms the translation key prefix */
  id: string
}

/** Read-and-continue card. Keys: `-p1` .. `-p{paragraphs}` */
export interface ConceptStep extends StepBase {
  type: "concept"
  paragraphs: number
  /** Renders as a highlighted takeaway card */
  takeaway?: boolean
  /** Illustration above the text */
  art?: CourseArtId
}

/**
 * Multiple choice. Keys: `-prompt`, `-opt-{id}`, `-fb-{id}` for every option,
 * plus `-explain` when `multi`.
 */
export interface ChoiceStep extends StepBase {
  type: "choice"
  options: string[]
  correct: string[]
  multi?: boolean
}

/** Tap-to-order. `items` is the correct order. Keys: `-prompt`, `-item-{id}`, `-explain` */
export interface OrderStep extends StepBase {
  type: "order"
  items: string[]
}

/** Hands-on widget that reports completion. Keys: `-prompt`, `-explain` */
export interface InteractiveStep extends StepBase {
  type: "interactive"
  widget: CourseWidgetId
}

/**
 * Pair each term with its match; the same id names both halves of a pair.
 * Keys: `-prompt`, `-term-{id}`, `-match-{id}`, `-explain`
 */
export interface MatchStep extends StepBase {
  type: "match"
  pairs: string[]
}

/**
 * Fill the blanks in a sentence from a word bank. `blanks` holds the right
 * word for each blank, in order; `extras` are wrong words in the bank.
 * Keys: `-prompt`, `-text` (with `{b1}`, `{b2}`... where the blanks go),
 * `-word-{id}`, `-explain`
 */
export interface FillStep extends StepBase {
  type: "fill"
  blanks: string[]
  extras: string[]
}

export type LessonStep =
  | ConceptStep
  | ChoiceStep
  | OrderStep
  | MatchStep
  | FillStep
  | InteractiveStep

/** Keys: `{course}-{lesson}-title`, `{course}-{lesson}-summary` */
export interface Lesson {
  id: string
  icon: LessonIconId
  steps: LessonStep[]
}

/**
 * Final exam question: a repeat or close variant of a lesson question, never
 * new material. One attempt, so no per-option feedback. Keys under
 * `{course}-exam-{id}`: `-prompt`, `-opt-{id}`, `-explain`.
 */
export type ExamStep = ChoiceStep

/** Keys: `{course}-title`, `{course}-description` */
export interface Course {
  id: string
  level: "beginner"
  theme: CourseTheme
  art: CourseArtId
  lessons: Lesson[]
  /** Earns the course trophy; see `EXAM_PASS_MARK` */
  exam: ExamStep[]
}
