---
name: courses
description: Use when planning, writing or building anything under /courses — a new course, lesson, step or widget, or edits to lesson copy. Covers `src/data/courses/`, `src/components/Courses/`, `app/[locale]/courses/`, `src/intl/en/page-courses.json` and `tests/unit/courses/`. Provides the progressive-curriculum rules, the lesson and widget contracts, and the add-a-course checklist.
---

# Courses

Gamified lessons at `/courses`: Brilliant-style interactive steps with Duolingo-style progression (path, XP, streak, combo). No accounts yet; progress lives in localStorage. Pages are static and `noIndex`. Read this file on activation, then the reference matching the task.

## Map

| What                                                                         | Where                                                           |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Course, lesson and step shapes, plus the translation-key convention for each | `src/data/courses/types.ts`                                     |
| Course content (structure only, no strings)                                  | `src/data/courses/<course>.ts`                                  |
| Suggested course order, lookups, `stepKey`                                   | `src/data/courses/index.ts` (`COURSES`)                         |
| Every string (English)                                                       | `src/intl/en/page-courses.json`                                 |
| Lesson runtime: steps, grading, footer, XP                                   | `src/components/Courses/lesson-player.tsx`                      |
| Widget registry (`graded` flag)                                              | `src/components/Courses/steps/interactive-step.tsx` (`WIDGETS`) |
| Widget contract                                                              | `src/components/Courses/widgets/types.ts`                       |
| Course colours and pressable skins                                           | `src/components/Courses/theme.ts`                               |
| Progress, XP and streak storage                                              | `src/components/Courses/useCourseProgress.ts`                   |
| Course hero art, path scenery, isometric helpers                             | `src/components/Courses/art/`                                   |

## Top rules

1. **Progressive vocabulary.** Never use a term before it has been introduced; once it has, assume it. Topics spiral: an early pass stays simplified, a later one goes deeper. The rules and the term ledger live in `references/curriculum.md`. Update the ledger in the same change as the copy.
2. **Data holds structure, JSON holds words.** Never put user-facing text in `src/data/courses/` or a component. Keys follow the conventions documented on each type in `types.ts`; `tests/unit/courses/strings.spec.ts` fails on any missing or orphaned key.
3. **Learn by doing.** Every lesson has at least one hands-on step, and every question teaches through its per-option feedback. Lesson anatomy and question craft: `references/authoring.md`.
4. **Only questions get a verdict.** Choice, order and `graded` widgets show Correct/Try again and count toward accuracy. Sandbox widgets just unlock Continue. See `references/widgets.md`.
5. **Course colours are for overview pages only** (hub cards, course page, lesson path, via `courseThemeStyle`). Inside a lesson every course uses `lessonThemeStyle` (the site's primary purple). Either way, colour comes only from the `--course*` vars; the contrast guarantees are documented in `theme.ts`, so never bypass them with a raw palette class.
6. General UI rules (components, RTL, a11y, server/client) come from the `design-system` skill. Course-specific UI conventions are in `references/widgets.md`.

## References

| Read when                                                            | File                       |
| -------------------------------------------------------------------- | -------------------------- |
| Planning a course or lesson, or writing or reviewing any lesson copy | `references/curriculum.md` |
| Adding a course, lesson or step, or writing questions                | `references/authoring.md`  |
| Building or changing a widget, or any course UI                      | `references/widgets.md`    |
