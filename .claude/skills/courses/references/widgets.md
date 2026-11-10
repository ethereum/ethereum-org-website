# Widgets and course UI

## Two kinds of widget

The `graded` flag on each `WIDGETS` entry in `interactive-step.tsx` decides which kind a widget is. Pick it per widget, not per lesson.

|                                  | Sandbox (`graded: false`)                                           | Puzzle (`graded: true`)                                                                                  |
| -------------------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Use for                          | Showing a property by playing with it (hashing, signing, tampering) | A target the learner must land on (an exact fee, the minimum stake)                                      |
| Calls                            | `onComplete()` once the key action has happened                     | `onAnswer({ correct, hint })` on every change; `null` when there's no answer                             |
| Footer                           | Neutral tip with the step's `-explain` text; Continue unlocks       | Check, then Correct or Try again with the `hint`                                                         |
| Counts toward accuracy and combo | No                                                                  | Yes                                                                                                      |
| Rules                            | Never show a verdict                                                | Never auto-complete or reveal success before Check; freeze controls when `locked`; snap to stops (below) |

Graded picks take the verdict's colours alone: `pickedTile` and `pickedMarker(result)` in `theme.ts` drop the course colour once a pick is marked correct or incorrect. Single-pick puzzles mark only the learner's pick, using the `wrong` prop, so a wrong answer never reveals the right one.

Puzzle inputs snap to a handful of meaningful stops, and the answer is always one of them, so the learner reasons rather than pixel-hunts. For a range input that means roughly 20 positions at most (the stake slider uses sixths, not 1% steps); give it `aria-valuetext` with the human label.

The widget contract and props are documented in `src/components/Courses/widgets/types.ts`.

## Building one

1. Add the id to `CourseWidgetId` in `src/data/courses/types.ts`, the component in `src/components/Courses/widgets/`, and the registry entry.
2. Wrap it in `WidgetShell`. Widget chrome strings use `page-courses-widget-<name>-*` keys. The step's `-prompt` and `-explain` keys come from the step itself.
3. Load heavy dependencies on demand (e.g. `await import("viem/accounts")`) so lessons without the widget don't pay for them.
4. Make it keyboard- and screen-reader-operable: native range inputs or `Button`s, labels on every control, `role="status"` for live results, `aria-hidden` on decorative SVG. Hex output gets `dir="ltr"` on the value only, never on its label.
5. Respect `useReducedMotion` for anything that moves.
6. Fit the lesson column (`max-w-2xl`) down to 320px wide. Stack repeated units vertically rather than squeezing them side by side; labels must never wrap mid-badge.
7. Add or extend a story in `src/components/Courses/stories/lesson-player.stories.tsx`.

## Course UI conventions

- Prose (concept paragraphs, options, feedback) is 16px (`text-md`). Prompts are `h2` styled `text-h3`; the lesson title is the page `h1`. Choice prompts put the `h2` inside the `legend`. Nothing in the courses UI is smaller than `text-sm`.
- Course-coloured text uses `text-(--course-strong) dark:text-(--course-bright)`; white text sits only on `--course` fills. Success and error text uses `text-green-700 dark:text-green-400` and `text-error dark:text-red-400`; the base `text-success` fails contrast on light tints.
- Never fade text with opacity on a coloured fill: it drops below 4.5:1.
- Pressable skins (`chunkyButton`, `chunkyButtonSecondary`, `chunkyTile`) layer on `<Button variant="ghost">`, or on a native `<button>` for answer tiles that Button's own styles would fight (match, fill, draggable tiles); don't hand-roll button styles.
- Sorting into groups: cards are `DraggableTile` (`widgets/draggable-tile.tsx`), so they can be dragged or tapped. Each group is a `data-drop-target`, and once a card is picked the whole group is the tap target; no separate "Place here" button. Touch drags start from the grip so swipes still scroll.
- Streak and XP live in the header chips (`ProgressChips`). The streak gets a full screen only once a day, after the summary of the lesson that extends it (`StreakCelebration`); never add it to the per-lesson summary.
- Overview cards are `ui/card` (`Card href variant="nested" border`, banner in `CardHeader`); follow the design-system card walkthrough rather than hand-rolling borders. Lists inside a `.flow` region use `ms-0`, never `m-0`, or they lose their flow gap.
- Art: one hero per course (`art/course-art.tsx`, `CourseArt`) for the hub card and course banner; path decorations come from the shared `art/scenery.tsx` set via `sceneryFor`, never the hero again. New pieces go in `SCENERY` and draw in the shared 200x160 `ArtFrame` with the `TOP`/`LEFT`/`RIGHT` shades from `art/shared.tsx`.
- Lesson nodes on the path are the rounded rhombus in `lesson-node.tsx` (chosen over Duolingo-style circles). Anything sitting on the road, like the locked trophy slot, gets an opaque fill so the road never shows through. Tints made from `--course-soft` nearly vanish on the dark background; give them a stronger `dark:` mix.
- Attention loops (the next lesson, an earned trophy) breathe by scale only (`BREATHE` in `lesson-path.tsx`). Never pulse opacity: the path shows through and the element reads as disabled.
- No Twemoji or other CDN-loaded assets (privacy).
