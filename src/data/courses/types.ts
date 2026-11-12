/**
 * Course content is pure structure: every user-facing string lives in
 * `page-courses.json`, keyed by convention (see `stepKey`) so the intl pipeline
 * translates lessons like any other page namespace.
 */

export type CourseWidgetId =
  | "eip-sort"
  | "client-bug"
  | "account-sort"
  | "account-rules"
  | "delegation-check"
  | "key-pair"
  | "gas-fee"
  | "sign-verify"
  | "block-builder"
  | "hash-playground"
  | "chain-tamper"
  | "address-check"
  | "custody-sort"
  | "node-network"
  | "finality-clock"
  | "base-fee"
  | "nonce-queue"
  | "ether-sort"
  | "validator-sort"
  | "gas-limit"
  | "explorer-labels"
  | "unit-converter"
  | "supply-balance"
  | "wrap-eth"
  | "fee-lanes"
  | "parcel-pack"
  | "network-match"
  | "bridge-move"
  | "wallet-network"
  | "rollup-replay"
  | "fraud-challenge"
  | "proof-check"
  | "exit-race"
  | "bridge-backing"
  | "call-sorter"
  | "token-ledger"
  | "approval-scope"
  | "token-check"
  | "backing-sort"
  | "backing-vaults"
  | "token-lure"
  | "nft-ledger"
  | "nft-host"
  | "nft-proof"
  | "name-check"
  | "nft-approval"
  | "pool-swap"
  | "swap-limit"
  | "collateral"
  | "reward-sort"
  | "red-flag-sort"
  | "site-check"
  | "sign-request"
  | "claim-site"
  | "next-page"
  | "chain-sort"
  | "track-sort"
  | "node-world"
  | "fee-meter"
  | "next-block"
  | "failed-sorter"
  | "jar-contract"
  | "shared-notebook"
  | "mailbox"
  | "snack-machine"
  | "cash-sort"
  | "postage"
  | "spare-key-sort"
  | "restore-wallet"
  | "phrase-sort"
  | "popup-sort"

/** Hand-tuned course colours from the site palette */
export type CoursePreset = "purple" | "orange" | "teal" | "blue" | "pink"

/**
 * Course accent colour; drives the path, buttons and art. A preset, or any
 * OKLCH hue (0-360) for a generated, contrast-checked palette. Each course
 * needs its own; `tests/unit/courses/palette.spec.ts` enforces that.
 */
export type CourseTheme = CoursePreset | { hue: number }

/** Decorative isometric illustration */
export type CourseArtId =
  | "upgrade"
  | "smart-account"
  | "diamond"
  | "blocks"
  | "coins"
  | "vault"
  | "tank"
  | "validators"
  | "contract"
  | "notebook"
  | "mailbox"
  | "stamp"
  | "vending"
  | "scale"
  | "frame"
  | "crate"
  | "rollup"
  | "tanks"
  | "lure"
  | "platform"

/** Icon on a lesson's path node */
export type LessonIconId =
  | "users"
  | "fork"
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
  | "queue"
  | "clock"
  | "flame"
  | "gift"
  | "piggy"
  | "code"
  | "pointer"
  | "eye"
  | "bug"
  | "layers"
  | "ticket"
  | "globe"

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
  /**
   * ethereum.org page (path, optional `#anchor`) offered once the lesson is
   * done. Its title comes from the page itself, so it needs no string here.
   */
  learnMore: string
  steps: LessonStep[]
}

/**
 * Final exam question: a repeat or close variant of a lesson question, never
 * new material. One attempt, so no per-option feedback. Keys under
 * `{course}-exam-{id}`: `-prompt`, `-opt-{id}`, `-explain`.
 */
export interface ExamStep extends ChoiceStep {
  /** ethereum.org page (path, optional `#anchor`) that backs the answer */
  source: string
}

/** A site page resolved for display: its title in the learner's language */
export interface PageLink {
  href: string
  title: string
}

/**
 * What a course may assume and use. Beginner: ages 10 to 12, analogies first,
 * no numbers, units, formulas or timings. Intermediate: numbers and mechanics.
 * Advanced: internals. Strings: `page-courses-level-{level}`.
 */
export type CourseLevel = "beginner" | "intermediate" | "advanced"

/**
 * A course not built yet, shown as a "coming soon" card at the end of its
 * track. Not in `COURSES`: no pages, routes, sitemap entry or JSON-LD. Keys:
 * `{id}-title`, `{id}-description`, so they carry over when the course ships.
 */
export interface UpcomingCourse {
  id: string
  level: CourseLevel
  art: CourseArtId
  /** Turns the teaser into a link card pointing elsewhere on the site */
  href?: string
}

/**
 * A themed group of courses, shown as one hub section. Strings:
 * `page-courses-track-{id}-title` and `-description`. Course URLs don't
 * include the track, so a course can move between tracks. A track with no
 * courses and no teasers is hidden.
 */
export interface Track {
  id: string
  courses: Course[]
  /** Teasers after the live courses */
  upcoming?: UpcomingCourse[]
}

/** Keys: `{course}-title`, `{course}-description` */
export interface Course {
  id: string
  level: CourseLevel
  theme: CourseTheme
  art: CourseArtId
  lessons: Lesson[]
  /** Earns the course trophy; see `EXAM_PASS_MARK` */
  exam: ExamStep[]
}
