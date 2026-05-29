# Layouts

> **TL;DR**: Creating a new layout is a very rare exception. There are six canonical layouts and you almost never need a seventh. Reach for a `TopicLayout` config or a small slot prop before opening a new layout file.

## The Canonical Layouts

The site has **six** layouts. All live in `src/layouts/`. Each maps to a `template:` value in markdown frontmatter via `layoutMapping` (`src/layouts/index.ts`).

| Layout | File | When to use | `template:` values it serves |
|---|---|---|---|
| `TopicLayout` | `src/layouts/Topic.tsx` | A topic hub with a shared sub-nav dropdown linking sibling pages. The workhorse for sectioned educational content. | `staking`, `use-cases`, `roadmap`, `upgrade`, `ai-agents` |
| `StaticLayout` | `src/layouts/Static.tsx` | One-off markdown pages with no sub-nav. | `static` (default fallback) |
| `DocsLayout` | `src/layouts/Docs.tsx` | Developer docs with the docs sidebar. | `docs` |
| `TutorialLayout` | `src/layouts/Tutorial.tsx` | Long-form developer tutorials with author/date/skill metadata. | `tutorial` |
| `ContentLayout` | `src/layouts/ContentLayout.tsx` | **Not a top-level layout.** Underlying scaffold consumed by the four above plus a handful of app-router pages (e.g. `/learn/`). | n/a (composed, not selected) |
| `BaseLayout` | `src/layouts/BaseLayout.tsx` | Root document scaffold (`<html>`, providers). Applied automatically by the App Router. | n/a |

That's the whole inventory. If a UI need can be met by configuring one of these (especially `TopicLayout`), it should be.

## The Habit: Configure, Don't Add a New Layout

When you have a page or section that "needs its own layout," walk this list top-to-bottom and stop at the first match:

1. **Does the page render through `[...slug]` with a markdown source?** Pick the right `template:` value. `TopicLayout` for anything with a sub-nav across sibling pages, `static` otherwise. No new layout.
2. **Does the page have a sub-nav dropdown linking related sibling pages?** That's exactly what `TopicLayout` is for. Add a `src/data/topics/<key>.ts` config file. Route `layoutMapping[<key>] = TopicLayout`. No new layout.
3. **Is the variation just a swap-in component (hero, before-content, after-content)?** Use the slots `TopicLayout` already exposes (`afterContent`, `heroSection` override via config `hubHero`) or add a narrow new slot. No new layout.
4. **Is the page a one-off App Router page (`app/[locale]/<route>/page.tsx`) with non-markdown content?** Compose `ContentLayout` directly (see `/learn/`). No new layout.

If you can stop at any of those steps, you don't need a new layout file.

## `TopicLayout` in Practice

`TopicLayout` is the canonical "topic hub" layout. It renders a hero, a TOC, content, a contributors block, a feedback card, and a sub-nav dropdown linking sibling pages. Everything per-topic comes from data.

### Adding a new topic

To add a new topic-style section (e.g. a new `developer-platforms` hub), you need **two** changes — no React layout file required:

#### 1. Create the topic config

```ts
// src/data/topics/developer-platforms.ts
import type { TopicConfig } from "."

export const developerPlatforms: TopicConfig = {
  translationNs: "page-developer-platforms",
  dropdown: {
    textKey: "page-developer-platforms-dropdown",
    ariaLabelKey: "page-developer-platforms-dropdown-aria",
    matomoCategory: "developer platforms menu",
    items: [
      { textKey: "page-developer-platforms-dropdown-home", href: "/developer-platforms/", matomoEvent: "home" },
      { textKey: "page-developer-platforms-dropdown-tools", href: "/developer-platforms/tools/", matomoEvent: "tools" },
      { textKey: "page-developer-platforms-dropdown-frameworks", href: "/developer-platforms/frameworks/", matomoEvent: "frameworks" },
    ],
  },
}
```

#### 2. Wire it into the map

```ts
// src/data/topics/index.ts
import { developerPlatforms } from "./developer-platforms"

export const topics: Partial<Record<Layout, TopicConfig>> = {
  // ...
  "developer-platforms": developerPlatforms,
}

// src/layouts/index.ts
export const layoutMapping = {
  // ...
  "developer-platforms": TopicLayout,
}
```

#### 3. Add translation keys

In `src/intl/en/page-developer-platforms.json`. The intl-pipeline propagates to other locales.

That's it. No new layout component. No new MDX wiring beyond a `componentsMapping` entry (only if the section needs custom MDX components — most don't).

### Slots on `TopicLayout`

When the topic genuinely needs something extra:

- **`config.hubHero`** — Swap `PageHero` for `HubHero` on a specific slug (used by Roadmap on `/roadmap/`). Declarative; lives in the topic config.
- **`config.editBanner`** — Render the top-of-page "edit this page" banner on every page in the topic. Used by UseCases and AiAgents. Per-page opt-out via frontmatter `hideEditBanner: true` if a specific page needs to suppress.
- **`afterContent` prop** — Render arbitrary JSX after the markdown content. Used by Staking for its community callout. Passed by the slug router for the one or two topics that need it. If you find yourself wanting a *third* `afterContent` consumer, consider promoting it to `config.afterContent` (still keyed by topic data).

If your topic needs something none of these expose, the right move is usually a narrow new slot on `TopicLayout`, not a new layout file.

## When a New Layout IS the Answer

The bar is high. A new layout is justified only when:

- The page renders through a fundamentally different content shape (e.g. a JSON-API-backed page vs markdown-content)
- It has a different navigation chrome (e.g. the docs sidebar, the tutorial metadata block) that doesn't fit `ContentLayout`'s scaffolding
- It manages a different content lifecycle (e.g. live data, streamed responses)

Cosmetic variation, different copy, a different sub-nav list, or a different hero image is **never** justification for a new layout. Those are all configuration of an existing layout.

## When You Find a One-Off Layout File

If you encounter a `src/layouts/md/<Something>.tsx` that exports its own `<Something>Layout` component (this is the pattern the topic refactor cleaned up), it's a cleanup target:

1. Confirm it's a topic-hub-with-sub-nav pattern (it almost always is)
2. Extract the dropdown items + translation namespace into `src/data/topics/<key>.ts`
3. Route `layoutMapping[<key>] = TopicLayout`
4. Delete the layout export from the file; keep the MDX components export
5. Smoke the section's pages

See `docs/topic-layout-refactor.md` for the worked example.

## Pre-Merge Checklist for Layout Work

Before opening a PR that touches anything in `src/layouts/`:

- [ ] Am I sure this isn't a `TopicLayout` config addition?
- [ ] Am I sure this isn't a slot/prop addition to an existing layout?
- [ ] Have I checked the `layoutMapping` to confirm no existing layout fits?
- [ ] Have I read `docs/topic-layout-refactor.md` for context on why the topic layouts were consolidated?
- [ ] If introducing a new layout (very rare), do I have explicit signoff from a maintainer?
- [ ] If extending `ContentLayout`, is the new prop genuinely shared across multiple consumers — not a one-section special case?

If you can't say yes to all of these and you're about to add `src/layouts/<NewName>.tsx`, stop and re-read the top of this file.
