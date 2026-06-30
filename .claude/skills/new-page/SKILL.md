---
name: new-page
description: Interview-then-scaffold guide for adding a new page to ethereum.org. Forks first on markdown-backed vs App Router page, then picks the layout and hero, maps the Figma design to existing components, and builds it reuse-first. Invoke with /new-page.
disable-model-invocation: true
---

# New Page

A new ethereum.org page is **reuse-first**: every region maps to a layout, hero, primitive, or variant that already exists — you *configure* what's there, you don't build a parallel version of it. This skill interviews you for the missing context, then scaffolds the page against the design system.

Work the steps in order. Each ends on a checkable condition — don't start the next until the current one is met.

## Step 0 — Load the design system

Invoke the `design-system` skill and read its `SKILL.md` fully before asking anything else. It is the source of truth for component choices, tokens, layouts, RTL/i18n, and the server/client boundary. **Do not restate its catalog here** — when you need the layout inventory read `design-system/references/layouts.md`, and verify it against `src/layouts/index.ts` (layouts get refactored).

**Done when:** `design-system` SKILL.md has been read this session.

## Step 1 — Interview

The primary fork is **markdown-backed or not**. It decides the layout system, the build, and how the page is translated — so settle it first. It is an *authoring* decision (how the content is written and maintained), **not** a visual one: a hero-topped prose page can be either, because `ContentLayout` gives markdown `TopicLayout` and App Router pages the same hero + card-TOC chrome. So **ask it; never infer it from the design.**

Use `AskUserQuestion`:

1. **Markdown page or App Router page?**
   - *Markdown page* — content authored in `public/content/<route>/index.md`, rendered through `[...slug]`, translated by the intl-pipeline, built from a fixed set of MDX shortcodes. Choose for editorial/educational content a writer maintains in markdown.
   - *App Router page* — a hand-built `app/[locale]/<route>/page.tsx` that composes `ContentLayout`. Choose when the page is interactive, data-backed, or needs layout/components the markdown shortcodes can't express. Translated via `getTranslations` JSON keys.
2. **Route** — the URL path (e.g. `/stablecoins/`). The folder name *is* the route.
3. **Design source** — a Figma link/selection, a written description, or none.
4. **Content** (markdown only) — does the user have the body ready, or should you draft it?

Then **check the route is free**: no existing `public/content/<route>/index.md` or `app/[locale]/<route>/page.tsx`. If one exists you're *editing*, not creating — surface it and confirm before any write; never silently overwrite a page you didn't author.

**Done when:** markdown-vs-App-Router, route, and design source are known, and the route is confirmed free (or editing is okayed).

## Step 2 — Pull the design (only if Figma was provided)

Read the design **fresh** with the Figma MCP (designs change between runs — never rely on a read from an earlier turn): `get_metadata` for the frame tree, then `get_design_context` / `get_screenshot` on each region; `search_design_system` / `get_code_connect_map` for existing code mappings. Load the `figma-use` skill before any `use_figma` call.

Produce a **component map** and **always show it to the user as a table** — three columns: **Region** (each design region, top to bottom) · **Maps to** (the existing primitive + variant that renders it — `PageHero`, `Card`, `BigNumber`, …) · **Status** (`reuse`, `missing asset`, `placeholder copy`, `missing data`, …). The map must be **exhaustive** — walk the frame top to bottom; a region you don't map is a region that silently won't ship. The table is the user's only window into what you saw in the frame — it's how they catch a misread or omission *before* it ships, so render it every run; never just reason about the mapping internally.

**Node names lie.** A node called `Screenshot 2026-…` or `Frame 1789` is routinely real content — a stat band (`BigNumber`), a video embed (`YouTube`), a callout (`Alert`) — not a throwaway. Never omit a region because its name *looks* like a draft; `get_screenshot` it and see what it actually is before deciding.

**Missing data → ask, don't guess.** When a region needs a value the design doesn't carry — a YouTube ID behind a thumbnail, a real destination URL, a live data source — you can't extract it from the frame. Flag it and ask the user; a guessed embed or invented link is worse than an open question.

**Match, don't mimic.** Reproduce the design with existing components and their variants. Do **not** layer custom Tailwind/CSS on a primitive to chase pixel parity. If a region has no fitting primitive or variant, the answer is *add a variant* (`references/variant-vs-new.md`) — never a one-off component or bespoke styles. Flag any such gap and confirm before inventing.

**Pressure-test the authoring fork.** The map can reveal a region markdown shortcodes can't express — an interactive widget, a data-backed list, a bespoke multi-column grid, or cards with **lucide** icons (the markdown `<Card>`/`MarkdownCard` shortcode takes only an `emoji` prop, no lucide). Any of these means the page wants to be App Router. If Step 1 said markdown, surface the conflict and re-confirm before scaffolding — flipping it later is a rewrite.

**Done when:** the component-map table has been shown to the user and they've confirmed or corrected it; every region is accounted for — mapped, flagged for an approved variant, or raised as missing data — and the authoring fork still holds.

## Step 3 — Pick the layout and hero

Branches on Step 1.

### Markdown page — pick the `template:`

The layout is selected by the `template:` frontmatter value (default `static`). Full inventory in `design-system/references/layouts.md`; live set in `src/layouts/index.ts`.

| `template:` | Layout | Use for | Hero it renders |
|---|---|---|---|
| `static` (default) | `StaticLayout` | one-off editorial prose, no sub-nav | title + breadcrumbs only (`PageHero variant="no-divider"`, **no image**) |
| `use-cases` / `staking` / `roadmap` / `upgrade` | `TopicLayout` | topic hub: full side-image hero + sibling sub-nav | image `PageHero` from frontmatter `image` / `summary` / `buttons` |
| `docs` | `DocsLayout` | developer docs with the docs sidebar | — |
| `tutorial` | `TutorialLayout` | developer tutorial with author/date/skill metadata | — |

- Each Topic template carries a distinct **MDX component list** (`componentsMapping`, `src/layouts/index.ts`) — pick the one whose shortcodes match the content.
- **Side-image hero in the design → a Topic template.** If there's no sub-nav across sibling pages, add `showDropdown: false` (exemplar: `public/content/what-are-apps/index.md`). **`static` renders only a title hero, never a side-image one** — so a side-image design on `static` is wrong; switch templates, don't fight it with custom markup.
- A new layout is essentially never the answer. A new topic hub is a `src/data/topics/<key>.ts` config + `layoutMapping`/`componentsMapping` entries + a translation namespace — not a new layout file.

### App Router page — compose `ContentLayout`, pass the hero that fits

Hand-build `app/[locale]/<route>/page.tsx` composing `ContentLayout`, and choose the hero from the design:

- `PageHero` — breadcrumbs + title + optional `heroImg` + description + buttons. The workhorse; covers both image and title-only heroes.
- `HubHero` — large hub hero (exemplar: `/learn/`).

Build the `tocItems` array by hand and wrap each prose section in `<Section id>`. `ContentLayout` owns the card TOC, contributors block, and feedback. Exemplars: `/learn/`, `/what-is-ethereum/`.

**Done when:** markdown → `template:` (and `showDropdown` if relevant) chosen; App Router → hero component chosen. Confirmed with the user.

## Step 4 — Scaffold

Build from the Step 2 component map. Reuse-first throughout — no raw `<a>`/`<button>`, no hex colors, logical CSS props (`ms-`/`me-`/…), locale-aware `numberFormat()`/`dateTimeFormat()`. Icons: **lucide in `.tsx`, emoji in markdown** (the `<Card>` shortcode is emoji-only).

**Markdown page:**
- Create `public/content/<route>/index.md` with frontmatter (`title`, `description`, `lang: en`, plus `template:` unless static). English only — never hand-write translated copies; the intl-pipeline propagates them.
- **Inline images co-locate**: drop them next to `index.md` and reference them relatively (`![alt](./hero.png)`). A `/images/...` path on an inline image 500s the MDX render. (The frontmatter `image:` hero on `TopicLayout` is the exception — it takes a `/images/...` public path.)
- Every h1–h4 needs a `{#kebab-id}`; run `pnpm lint:md:fix`.
- If using `TopicLayout`: add `src/data/topics/<key>.ts`, wire `layoutMapping`/`componentsMapping` in `src/layouts/index.ts`, and add `src/intl/en/page-<key>.json`.

**App Router page:**
- Create `app/[locale]/<route>/page.tsx` composing `ContentLayout` (mirror `/learn/` or `/what-is-ethereum/`): pass `heroSection`, the hand-built `tocItems`, and `contributors`; wrap prose in `<Section id>`. Server Component unless it needs state/effects/handlers.
- All user-facing strings via `getTranslations`; add keys to `src/intl/en/`.

**Done when:** the page renders through its layout with content/strings in place and no inlined reinventions of existing primitives.

## Step 5 — Verify (static checks)

- `pnpm type-check` (catches invalid chain names and type errors).
- Walk the design-system **Pre-Merge Smoke Test** checklist.
- Add a `.stories.tsx` for any genuinely new UI primitive.

**Done when:** type-check passes and the smoke checklist is clean.

## Step 6 — QA via the adversarial review loop

Static checks pass on pages that are visibly broken — a wrong image path, a failed MDX compile, a section that silently didn't render. So the page must be run and audited. QA here is **not** an eyeball comparison — it's the **adversarial reviewer loop**: copy and design-system reviewer subagents audit the live page against the design, you triage and fix, and re-review until a fresh round comes back **green**. Scaffolding a page and not running this loop is leaving the job half-done.

1. **Run it.** Start `pnpm dev`, wait for "Ready", load the page (locale-stripped for `en`: `/<route>/`). Confirm **HTTP 200** — a 500 is almost always an MDX or asset error; read the dev log (a non-co-located inline image is the classic one). There is nothing to review on a broken page.
2. **Run the review loop.** Read `review-page/SKILL.md` and execute its loop (its Steps 1–5) against this route: capture the Figma + live-page artifacts, spawn the two reviewers from `review-page/reviewers/` in parallel, triage their findings, fix, and re-review until green. You already hold the design source and route from Steps 1–2, so its Step 0 (running page + known design source) is already satisfied — go straight into capture-and-spawn. Read and run that procedure; don't try to invoke `/review-page` as a skill from here.
   - **A hero finding is a template bug, not a CSS gap.** When the design-system reviewer flags a title-only hero against a side-image design: on a markdown page that's a wrong-`template:` (use a Topic template, not `static`); on an App Router page, pass `heroImg` to `PageHero`. Never rebuild a hero with custom markup.
3. **Hand off.** Leave the dev server running and give the user the local URL the server printed (e.g. `http://localhost:3000/<route>/`).

**Done when:** the review loop is green (or hits its round cap with the remaining findings handed off), and the user has the live URL.
