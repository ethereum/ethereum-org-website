---
title: "Automated llms.txt and developers/docs/llms.txt Generation"
date: 2026-05-20
category: architecture
module: app/llms.txt, app/developers/docs/llms.txt, src/lib/llms-txt
tags:
  - llms-txt
  - seo
  - automation
  - nav
problem_type: "feature, automation, content-pipeline"
---

# Automated `llms.txt` Generation

Two `force-static` App Router routes replace the hand-maintained `public/llms.txt`. They regenerate on every deploy; no manual maintenance.

- `ethereum.org/llms.txt` — full site index, organized by main-nav top sections.
- `ethereum.org/developers/docs/llms.txt` — developer-docs-only index, organized by the docs sidebar.

The split mirrors `nextjs.org/llms.txt` + `nextjs.org/docs/llms.txt`: the root file points at the docs file rather than inlining 100+ lines of deeply nested developer docs.

## Strategy

### What appears, and where it lives

| Decision           | Choice                                                                                         |
| ------------------ | ---------------------------------------------------------------------------------------------- |
| Which pages appear | Driven by nav files only (main nav, Footer, developer-docs YAML). Never walks `public/content/`. |
| Section structure  | Mirrors the main-nav top sections 1:1 (Learn / Use / Build / Participate / Research) + Legal & Policies from Footer's secondary links. |
| Per-item label     | The nav file's label (resolved via the existing i18n JSON).                                    |
| Per-item URL       | Always the page's pretty URL (`https://ethereum.org/{href}`). Never `/content/*/index.md`.     |
| Per-item description | First non-empty of: page's frontmatter `description` → nav's description → label only.       |
| Locale             | English only at root. Per-locale variants are a later, opt-in extension (no code refactor needed). |

### Per-section layout

```
## {section.label}                ← top sections from main nav

- {top-level leaf items}          ← e.g. Overview, Quizzes, Videos

### {sub-group label}             ← e.g. Ethereum Explained, How Ethereum Works
- {sub-group items}

### More                          ← Footer items not already in main nav, dedup'd by href
- ...
```

### Root file vs docs file

- **Root file (`/llms.txt`)** treats the developer docs as one pointer (the four top-level Documentation entries from main nav) and links out to `/developers/docs/llms.txt` for the full tree.
- **Docs file (`/developers/docs/llms.txt`)** renders `developer-docs-links.yaml` directly — top groups as `##`, nested items as indented bullets at the depth they sit in the YAML.

This keeps the root file scannable (~170 lines) and lets crawlers that want depth follow the cross-link.

## Sources of truth

| Source                                        | Provides                                                                                   |
| --------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `src/lib/nav/buildNavigation.ts`              | Main-nav top sections + sub-groups + items + their nav descriptions.                       |
| `src/lib/nav/footerLinks.ts`                  | Footer link sections + dipper links (Legal & Policies). Extracted so Footer and llms.txt share one source. |
| `src/data/developer-docs-links.yaml`          | The docs sidebar tree, including nested items.                                             |
| `src/intl/en/common.json` + `page-developers-docs.json` | English labels and descriptions for the i18n keys above (via `getTranslations`). |
| `public/content/{slug}/index.md` frontmatter  | The richer per-page `description` used preferentially over the nav description.            |

To change what appears in `llms.txt`, edit one of the sources above. The output regenerates on the next deploy. The generated `.txt` files are not in the repo — there is nothing to hand-edit.

## Failure handling

- Missing i18n key → falls back to the key string via the site-wide `getMessageFallback`. Same behavior as anywhere else on the site.
- Frontmatter `description` missing or unreadable → falls back to the nav description, then to label only. Never throws.
- Nav `href` points at a page with no `index.md` (JSX-only landings, external URLs) → no frontmatter lookup, nav description carries the entry.
