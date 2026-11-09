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
4. **Apply**: one or two choice steps that transfer the idea to a realistic situation, often a safety one.
5. **Takeaway**: a concept step with `takeaway: true`, one sentence the learner could repeat to a friend.

One new idea per lesson. If the takeaway needs "and" twice, split the lesson.

## Writing questions

- Three options for single choice, four for multi. Every option teaches a distinct misconception; no joke options.
- Every option gets its own `fb-` feedback that explains why, not just "Correct"/"Wrong". Wrong-answer feedback must not reveal the right option, because the learner retries.
- Use `multi` only when the real-world answer is genuinely plural; add an `-explain` for it.
- Prediction questions may have every answer "accepted" in spirit. The feedback should point to the next step ("Test it in the next step").
- Order steps: four to six items, each one short line; `items` lists them in the correct order (the pool is shuffled deterministically).
- Strings are plain text, except concept paragraphs, which may use `<strong>`. ICU placeholders (`{count}`) are fine anywhere.
- Prompts state the task, never the UI: no "then check your answer" or "press Continue". The footer buttons carry that.
- Prose is second person, present tense, short sentences, with no exclamation marks outside cheers.

## Checks

```bash
npx playwright test --project=unit tests/unit/courses   # keys, ids, answers
pnpm type-check && pnpm lint
```

Then read the lesson top to bottom against the ledger: every term is either above it in the ledger or defined on first use.
