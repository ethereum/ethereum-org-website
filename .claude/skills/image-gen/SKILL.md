---
name: image-gen
description: Generate illustration images (heroes, decorations, section art) for ethereum.org via the OpenRouter image API, then key/trim/check and place them in the repo. Trigger on "make an image for", "generate a hero", "new illustration for <page>", "nano banana", "chroma key this", or edits to `src/scripts/image-gen/`. Not for screenshots, logos, or brand assets.
---

# Image generation

The user asks in chat ("make a hero for /privacy"); Claude drives the flow below. The script is Claude's tool for the parts that need the key or pixel math: it wraps OpenRouter's `POST /api/v1/images` and the post-processing. Three subcommands:

```bash
pnpm tsx src/scripts/image-gen/main.ts models [--filter gemini]          # live params per model (aspect, resolution, background, n, ref limit)
pnpm tsx src/scripts/image-gen/main.ts generate --type cutout|full-bleed --prompt-file <f> [--ref <img>]... [--model <id>] [--aspect 16:9] [--n 1] [--name <slug>] [--out-dir <dir>] [--dry-run]
pnpm tsx src/scripts/image-gen/main.ts process <img> --type cutout|full-bleed --out <file> [--key-color green|magenta] [--pad 0.02] [--max-size <px>]
```

## The key

`OPENROUTER_API_KEY` lives in `.env.local`, loaded by the script itself. **Never read `.env.local`** (`.claude/settings.json` denies it; `.env.example` is fine to read). Never echo, log, or pass the key on a command line. Each person uses their own OpenRouter key with a spend limit set.

**If a key ever appears in your context** (tool output, an error body, a file you read), tell the user right away that it was exposed and should be revoked and replaced at openrouter.ai/settings/keys, without repeating the key. Then carry on with the task; rotation happens separately.

## Workflow

1. **Context.** Read the target page and component, then decide the type. If the page doesn't settle it, ask with AskUserQuestion; never guess.
   - **cutout** -- subject on transparency, nothing touching any edge (`PageHero` `heroImg`, section decorations).
   - **full-bleed** -- scene fills the frame edge to edge (`HubHero` backgrounds, banners).
2. **References.** Pick 2-6 existing images from `public/images/` that match the target style (look at them first). More refs pull harder toward house style; mismatched refs muddy it.
3. **Prompt.** Write the subject/scene and style only. The script appends the cutout or full-bleed constraints (key color, margins, no borders), so don't restate them.
4. **Confirm before spending.** Show the prompt, refs, model, aspect, and `--dry-run` output. Generate only after the user agrees.
5. **Generate** with `--n 1` unless asked, and a stable kebab `--name` describing the subject (see **Naming** below); reuse it for every iteration on that target, even if the subject drifts. Don't pass `--out-dir`: the default archive, `/tmp/image-gen/<name>/`, sits outside the repo and the session scratchpad, so candidates survive across iterations and sessions. Numbering continues (`-1`, `-2`, ...) and nothing is ever overwritten. Each candidate gets `<name>-<i>-raw.*`, a processed `<name>-<i>.png`, and `<name>-<i>.json` (prompt, refs, params, cost, check results).
6. **Review.** Look at every output. `CHECK` lines are automatic failures (subject touching an edge, flat border strip, background not a key color); regenerate those rather than placing them.
7. **Place in situ, automatically.** Don't wait for a pick: put the best passing candidate at its target location right away so the user can judge it on the real page in their running dev server.
   - `process` the archived raw (or `cp` the archived `.png`) to its final path, `public/images/<area>/<descriptive-name>.png`, sized to roughly 2x its largest rendered width with `--max-size`.
   - Wire it into the target component (camelCase raster import, see the design-system skill's `page-hero-walkthrough.md`). If it replaces an existing image, repoint the import and leave the old file alone, so reverting is just `git checkout` on the component.
   - Tell the user the URL to check (e.g. `/organizations/`) and list the other candidates by path.
   - Never commit, and never start a dev server; the user runs their own.
8. **Iterate in place.** Each new trial is copied from the archive over the same in-repo file, so the page updates without touching the import again. Static imports pick up the change through their content hash; for a plain `/images/...` string `src`, tell the user to hard-refresh. Revise by adding a candidate as a `--ref` with an updated prompt. To go back to an earlier candidate ("I prefer the first one"), copy that archived file in; never regenerate it. Always say which archive number is currently in situ.
9. **Never delete the archive.** Leave `/tmp/image-gen/<name>/` alone, even after the image is placed. The user decides when it's done. When the user is happy, show `git status` so they can see exactly which files changed.

## Naming

Name images for what they depict, never for where they're used: a town square with people used as the `/some-page/` hero is `town-square-buildings-with-people.png`, not `some-page-hero.png`. Placement changes; content doesn't. Kebab-case, specific enough to tell it apart from neighbors in the same folder. The `--name` passed to `generate` follows the same rule, so the archive folder and the final file match. If the final image ends up depicting something different from the original name, rename the in-repo file to match what's in the image (the archive folder keeps its name).

## Models

Default `google/gemini-3-pro-image` (Nano Banana Pro). Switch with `--model` when the user asks; run `models` to see what a model accepts -- the script validates flags against that list and drops options a model lacks.

- **Cutouts:** if the model supports `background: transparent` (some OpenAI image models do), the script requests real alpha and skips keying. Otherwise it asks for a flat key background and removes it.
- `n` is 1 per call on Gemini; `--n 3` makes three calls. Models that accept a higher `n` batch it.

## Chroma keying

- Green (`#00FF00`) by default. Use `--key-color magenta` when the subject itself is green or teal; a green subject keyed on green turns partly transparent.
- Alpha comes from how strongly a pixel leans toward the sampled border color, then the background is unmixed from partially transparent pixels. Despill applies only to a 2px rim near transparency, so interior colors are untouched.
- Prefer PNG sources. JPEG compression smears the key into dark outlines, which leaves a faint tinted rim.
- `process` works on any existing chroma image, e.g. one generated by hand on the OpenRouter site.
