# Widgets and course UI

## Two kinds of widget

The `graded` flag on each `WIDGETS` entry in `interactive-step.tsx` decides which kind a widget is. Pick it per widget, not per lesson.

|                                  | Sandbox (`graded: false`)                                           | Puzzle (`graded: true`)                                                                                  |
| -------------------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Use for                          | Showing a property by playing with it (hashing, signing, tampering) | A target the learner must land on (an exact fee, the narrowest approval)                                 |
| Calls                            | `onComplete()` once the key action has happened                     | `onAnswer({ correct, hint })` on every change; `null` when there's no answer                             |
| Footer                           | Neutral tip with the step's `-explain` text; Continue unlocks       | Check, then Correct or Try again with the `hint`                                                         |
| Counts toward accuracy and combo | No                                                                  | Yes                                                                                                      |
| Rules                            | Never show a verdict                                                | Never auto-complete or reveal success before Check; freeze controls when `locked`; snap to stops (below) |

Graded picks take the verdict's colours alone: `pickedTile` and `pickedMarker(result)` in `theme.ts` drop the course colour once a pick is marked correct or incorrect. Single-pick puzzles mark only the learner's pick, using the `wrong` prop, so a wrong answer never reveals the right one.

Puzzle inputs snap to a handful of meaningful stops, and the answer is always one of them, so the learner reasons rather than pixel-hunts. For a range input that means roughly 20 positions at most (the approval slider has five named stops, not 1% steps); give it `aria-valuetext` with the human label.

The widget contract and props are documented in `src/components/Courses/widgets/types.ts`.

A lesson that plays with an idea before naming it can use an everyday skin with no crypto words: `snack-machine` (`vending-machine-widget.tsx`) is a coin-operated snack machine, used by the Everyday course before smart contracts are named.

## Building one

1. Add the id to `CourseWidgetId` in `src/data/courses/types.ts`, the component in `src/components/Courses/widgets/`, the registry entry (a `load: () => import(...)`, so each widget is its own chunk) and its string names in `WIDGET_KEYS` (`src/lib/courses/widgets.ts`).
2. Wrap it in `WidgetShell`. Widget chrome strings use `page-courses-widget-<name>-*` keys. A lesson page sends the browser only its widgets' strings, so every name the widget reads (shared ones like `sort` included) goes in its `WIDGET_KEYS` entry; `tests/unit/courses/messages.spec.ts` reads the widget's source and fails on any it misses. Build keys from string literals so the spec can follow them. The step's `-prompt` and `-explain` keys come from the step itself.
3. Load heavy dependencies on demand (e.g. `await import("viem/accounts")`) so lessons without the widget don't pay for them.
4. Make it keyboard- and screen-reader-operable: native range inputs or `Button`s, labels on every control, `role="status"` for live results, `aria-hidden` on decorative SVG. Hex output gets `dir="ltr"` on the value only, never on its label.
5. Respect `useReducedMotion` for anything that moves.
6. Fit the lesson column (`max-w-2xl`) down to 320px wide. Stack repeated units vertically rather than squeezing them side by side; labels must never wrap mid-badge.
7. Add or extend a story in `src/components/Courses/stories/lesson-player.stories.tsx`.

## Course UI conventions

- Prose (concept paragraphs, options, feedback) is 16px (`text-md`). Prompts are `h2` styled as reading text (`stepPrompt` in `theme.ts`), because they run to full sentences; keep headline styling (large or `font-black`) for short labels only, and give sentence-length status and feedback lines regular weight. The lesson title is the page `h1`: visible only on the first step (under a concept step's art), `sr-only` on later steps. Choice prompts put the `h2` inside the `legend`. Keywords in concept paragraphs (`<strong>`) are plain bold, never coloured, so they don't read as links. Nothing in the courses UI is smaller than `text-sm`.
- Course-coloured text uses `text-(--course-strong) dark:text-(--course-bright)`; white text sits only on `--course` fills. Success and error text uses `text-green-700 dark:text-green-400` and `text-error dark:text-red-400`; the base `text-success` fails contrast on light tints.
- Never fade text with opacity on a coloured fill: it drops below 4.5:1.
- Pressable skins (`chunkyButton`, `chunkyButtonSecondary`, `chunkyTile`) layer on `<Button variant="ghost">`, or on a native `<button>` for answer tiles that Button's own styles would fight (match, fill, draggable tiles); don't hand-roll button styles. Every action button, widget buttons included, uses `chunkyButton` (primary) or `chunkyButtonSecondary`, never a plain solid or outline `Button`. The button skins take ui/Button's radius (`rounded`); answer tiles keep their rounder `rounded-2xl`.
- Anything draggable (order-step tiles, sort cards) is a `DraggableTile` (`widgets/draggable-tile.tsx`), so it can be dragged or selected. Touch drags start from the grip so swipes still scroll. In a sort each group is a `data-drop-target`, and once a card is picked the whole group is the tap target; no separate "Place here" button. A new sort is a `SortConfig` skin of `widgets/sort-widget.tsx` (groups, cards and a string prefix; see `sort-skins.tsx`), not a new widget.
- Instructions (`StepHint` and widget how-tos) say "select" or "drag or select", never "tap" or "click", so they read right on touch and mouse alike.
- Streak and XP live in the header chips (`ProgressChips`). The streak gets a full screen only once a day, after the summary of the lesson that extends it (`StreakCelebration`); never add it to the per-lesson summary. The flame and orange belong to the day streak alone: the in-lesson combo (right answers in a row) is `CheckCheck` in the course colour.
- Every step change and completion screen opens at the top of the page. Enter takes the footer's primary action unless focus is on a control (text field, link, enabled button), which keeps its own Enter; a completion screen takes Enter only from a press that started on it, once its buttons have appeared.
- Overview cards are `ui/card` (`Card href variant="nested" border`, banner in `CardHeader`); follow the design-system card walkthrough rather than hand-rolling borders. Lists inside a `.flow` region use `ms-0`, never `m-0`, or they lose their flow gap.
- Art: one hero per course (`art/course-art.tsx`, `CourseArt`; one module per piece in `art/course/`, and client components import `art/lazy-course-art.tsx`, which loads only the pieces shown) for the hub card and course banner; path decorations come from the shared `art/scenery.tsx` set via `sceneryFor`, never the hero again. New pieces go in `SCENERY` and draw in the shared 200x160 `ArtFrame` with the `TOP`/`LEFT`/`RIGHT` shades from `art/shared.tsx`.
- Lesson nodes on the path are the rounded rhombus in `lesson-node.tsx` (chosen over Duolingo-style circles). Anything sitting on the road, like the locked trophy slot, gets an opaque fill so the road never shows through. `--course-soft` and `--course-softer` already use a stronger mix in dark mode (the courses layout sets their amounts), so they need no `dark:` overrides.
- Attention loops (the next lesson, an earned trophy) breathe by scale only (`BREATHE` in `lesson-path.tsx`). Never pulse opacity: the path shows through and the element reads as disabled.
- No Twemoji or other CDN-loaded assets (privacy).
