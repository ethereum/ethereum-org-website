# Authoring

How to add courses, lessons and steps, and how to write them. Vocabulary and ordering rules are in `curriculum.md`.

## Add a course

1. Pick an `id` (kebab-case, also the route segment) and its place on the suggested path in `COURSES`.
2. Create `src/data/courses/<id>.ts` exporting a `Course`; register it in `COURSES`. Add a new `CourseTheme`, `CourseArtId` or `LessonIconId` only if no existing one fits (themes need a palette entry in `theme.ts`; icons map in `lesson-icons.ts`).
3. Write the strings in `src/intl/en/page-courses.json` using the key conventions documented on the types in `src/data/courses/types.ts`. English only: other locales come from the intl pipeline.
4. Add the lesson rows to the ledger in `curriculum.md`.
5. Run the checks below.

Routes, metadata and static params are generated from `COURSES`, so no page files change.

## Lesson anatomy

Three to six minutes, roughly five to seven steps:

1. **Hook**: a concept step (optionally with `art`) that opens with a misconception or a concrete situation, then introduces one or two terms.
2. **Predict or explore**: a choice step asking for a guess, or a widget. Prediction before play makes the widget land.
3. **Do**: a widget or order step where the idea is discovered rather than told.
4. **Apply**: one or two choice steps that transfer the idea to a realistic situation, often a safety one. A match or fill step suits the end of a lesson, to consolidate its terms just before the takeaway.
5. **Takeaway**: a concept step with `takeaway: true`, one sentence the learner could repeat to a friend.

One new idea per lesson. If the takeaway needs "and" twice, split the lesson.

## Writing questions

- Three options for single choice, four for multi. Every option teaches a distinct misconception; no joke options.
- Every option gets its own `fb-` feedback that explains why, not just "Correct"/"Wrong". Wrong-answer feedback must not reveal the right option, because the learner retries.
- Use `multi` only when the real-world answer is genuinely plural; add an `-explain` for it.
- Prediction questions may have every answer "accepted" in spirit. The feedback should point to the next step ("Test it in the next step").
- Order steps: four to six items, each one short line; `items` lists them in the correct order (the pool is shuffled deterministically).
- Match steps: three or four pairs; terms at most three words, matches at most seven. Each match fits only its own term, and never repeats the term's word (that answers it by overlap).
- Fill steps: one to three blanks and two or three `extras`, in one plain-text sentence (no tags) with `{b1}`, `{b2}`... where the gaps go. Each gap has exactly one word in the bank that fits, grammatically and factually; extras are tempting to a skimmer, clearly wrong to anyone who followed.
- Strings are plain text, except concept paragraphs, which may use `<strong>`. ICU placeholders (`{count}`) are fine anywhere.
- Prompts state the task, never the UI: no "then check your answer" or "press Continue". The footer buttons carry that.
- Prose is second person, present tense, short sentences, with no exclamation marks outside cheers.

## Course check (exam)

Every course ends in a course check: the trophy node on the path, route `/courses/<id>/exam/`, data in the course's `exam` array (`ExamStep`, keys under `{course}-exam-`). Passing at `EXAM_PASS_MARK` (80%) earns the trophy; it can be retaken any time and is open before every lesson is done, like the lessons themselves.

- Ten choice questions, two per lesson, in lesson order.
- It tests what the course taught and introduces nothing: each question repeats a lesson question, widget puzzle or stated fact with a new scenario or wording. Never copy a lesson string verbatim, and never use a fact the course (or an earlier course on the path) didn't teach.
- One attempt per question, then the right answer shows. So there are no per-option `fb-` notes, just one `-explain` that works whether the learner was right or wrong (don't open with "Right" or "Wrong"). It shows again in the review screen.
- `multi` at most twice per check.

## Checks

```bash
npx playwright test --project=unit tests/unit/courses   # keys, ids, answers
pnpm type-check && pnpm lint
```

Then read the lesson top to bottom against the ledger: every term is either above it in the ledger or defined on first use.
