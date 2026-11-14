# Authoring

How to add courses, lessons and steps, and how to write them. Vocabulary and ordering rules are in `curriculum.md`.

## Add a course

1. Pick an `id` (kebab-case, also the route segment), its track in `TRACKS` and its place in that track. Its `level` is the track's level (see `SKILL.md`). If the course was announced as a teaser, reuse the teaser's id and strings and move the entry from the track's `upcoming` to its `courses`.
2. Create `src/data/courses/<id>.ts` exporting a `Course`; add it to its track in `TRACKS` (a new track also needs `page-courses-track-<id>-title` and `-description` strings). Every course needs its own colour: use an unused preset, or `theme: { hue: <0-360> }` for a generated OKLCH palette (`course-palette.ts` solves lightness per hue to meet the contrast targets; avoid hues near green and red, which read as answer verdicts). `tests/unit/courses/palette.spec.ts` fails on a repeated theme. Add a new `CourseArtId` or `LessonIconId` only if no existing one fits (icons map in `lesson-icons.ts`).
3. Write the strings in `src/intl/en/page-courses.json` using the key conventions documented on the types in `src/data/courses/types.ts`. English only: other locales come from the intl pipeline.
4. Add the lesson rows to the ledger in `curriculum.md`.
5. Run the checks below.

Routes, metadata and static params are generated from `COURSES` (all tracks, in order), so no page files change. Course URLs never include the track, so a course can move between tracks.

## Announce a course (teaser)

Add `{ id, level, art }` to the track's `upcoming`, plus `{id}-title` and `{id}-description` strings. It shows as a muted "Coming soon" card after the track's live courses, with no page, route, sitemap entry, JSON-LD or progress. Give it an `href` instead to make a link card to another site page (an "Explore" button, no "Coming soon" tag). Reuse an existing `CourseArtId`; the strings spec requires the keys and treats them as used.

## Lesson anatomy

Three to six minutes, roughly five to seven steps:

1. **Hook**: a concept step (optionally with `art`) that opens with a misconception or a concrete situation, then introduces one or two terms.
2. **Predict or explore**: a choice step asking for a guess, or a widget. Prediction before play makes the widget land.
3. **Do**: a widget or order step where the idea is discovered rather than told.
4. **Apply**: one or two choice steps that transfer the idea to a realistic situation, often a safety one. A match or fill step suits the end of a lesson, to consolidate its terms just before the takeaway.
5. **Takeaway**: a concept step with `takeaway: true`, one sentence the learner could repeat to a friend.

One new idea per lesson. If the takeaway needs "and" twice, split the lesson.

For animated explanations, prefer the dev-docs interactive diagrams (`src/components/Diagrams/`, on `dev`) over a new widget when one shows the idea: embed them in concept steps for future lessons. Recolour their objects with the courses' more saturated palette (`theme.ts`), brighter than the dev docs use. Existing lessons need not be retrofitted.

Every lesson sets `learnMore`: one ethereum.org page offered on the completion screen, never mid-lesson, so it costs no momentum. Pick the page closest to the lesson's idea at the course's level. It is further reading, not a citation, so a whole page is fine; an `#anchor` is optional. The link text is the page's own title, so it needs no string; `tests/unit/courses/links.spec.ts` checks the page, title and anchor exist.

## Writing questions

- Three options for single choice (preferred: simpler, and it reads as a teaching moment rather than an exam; an occasional fourth is fine), four for multi. Every option teaches a distinct misconception. Distractors get more realistic as the skill level rises: an obviously wrong option is fine in a newcomer course if its feedback makes a teaching point, but never one that is only there to be dismissed.
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
- One attempt per question, graded by the server: the right option and the `-explain` show only after a pass (see `accounts.md`). So there are no per-option `fb-` notes, just one `-explain` that works whether the learner was right or wrong (don't open with "Right" or "Wrong"), shown again in the review screen.
- Which option is right goes in the encrypted answer key, not the course file: update `.learner-exam-key.json`, run `pnpm courses:exam-key check` and `encrypt`, and commit `src/data/courses/exam-key.ts` with the question (`accounts.md`).
- `multi` at most twice per check.
- Every question sets `source`: the ethereum.org page that states the fact it tests, as specific as possible (use the section anchor where one exists), because it is a citation. It shows as "Learn more" in the review screen and is what the content review checks the question against. Never the glossary (for `learnMore` either): a one-line definition is a poor "Learn more" destination, so cite the page that explains the idea; the links spec rejects `/glossary/`.

## Checks

```bash
npx playwright test --project=unit tests/unit/courses   # keys, ids, answers
pnpm type-check && pnpm lint
```

Then read the lesson top to bottom against the ledger: every term is either above it in the ledger or defined on first use.
