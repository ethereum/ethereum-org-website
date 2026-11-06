---
name: image-gen
description: Generate illustration images (heroes, decorations, section art) for ethereum.org via the OpenRouter image API, then key/trim/check and place them in the repo. Trigger on "make an image for", "generate a hero", "new illustration for <page>", "fix the glyph", "redraw this image", "chroma key this", or edits to `src/scripts/image-gen/`. Not for screenshots, logos, or brand assets.
---

# Image generation

The user asks in chat ("make a hero for /privacy"); Claude drives the flow below. The script is Claude's tool for the parts that need the key or pixel math: it wraps OpenRouter's `POST /api/v1/images` and the post-processing. Three subcommands:

```bash
pnpm tsx src/scripts/image-gen/main.ts models [--filter gemini]          # live params per model (aspect, resolution, background, n, ref limit)
pnpm tsx src/scripts/image-gen/main.ts generate --type cutout|full-bleed --prompt-file <f> [--ref <img>]... [--model <id>] [--aspect 16:9] [--quality <q>] [--eth-glyph auto|on|off] [--n 1] [--name <slug>] [--out-dir <dir>] [--dry-run]
pnpm tsx src/scripts/image-gen/main.ts process <img> --type cutout|full-bleed --out <file> [--key-color green|magenta] [--pad 0] [--max-size <px>]
```

## The key

`OPENROUTER_API_KEY` lives in `.env.local`, loaded by the script itself. **Never read `.env.local`** (`.claude/settings.json` denies it; `.env.example` is fine to read). Never echo, log, or pass the key on a command line. Each person uses their own OpenRouter key with a spend limit set.

**If a key ever appears in your context** (tool output, an error body, a file you read), tell the user right away that it was exposed and should be revoked and replaced at openrouter.ai/settings/keys, without repeating the key. Then carry on with the task; rotation happens separately.

## Workflow

1. **Context.** Read the target page and component, then decide the type. If the page doesn't settle it, ask with AskUserQuestion; never guess.
   - **cutout** -- subject on transparency, nothing touching any edge (`PageHero` `heroImg`, section decorations).
   - **full-bleed** -- scene fills the frame edge to edge (`HubHero` backgrounds, banners).
2. **References.** Pick 2-6 existing images that match the target style (look at them first); see **House style** below. More refs pull harder toward house style; mismatched refs muddy it.
3. **Prompt.** Write the subject/scene and style only. The script appends the cutout or full-bleed constraints (key color, margins, no borders) and, when the prompt mentions Ethereum, the ETH glyph spec and reference (see **The ETH glyph**), so don't restate them.
4. **Confirm before spending.** Show the prompt, refs, model, aspect, and `--dry-run` output. Generate only after the user agrees, and get a fresh go-ahead for every further call; agreement to one generation isn't agreement to the next. A call costs about $0.11-0.26 and the price follows output pixels (21:9 is the cheapest, 1:1 and 3:2 the most).
5. **Generate** one image per call: `--n 1`, never higher unless the user asks for a batch. Use a stable kebab `--name` describing the subject (see **Naming** below); reuse it for every iteration on that target, even if the subject drifts. Don't pass `--out-dir`: the default archive, `/tmp/image-gen/<name>/`, sits outside the repo and the session scratchpad, so candidates survive across iterations and sessions. Numbering continues (`-1`, `-2`, ...) and nothing is ever overwritten. Each candidate gets `<name>-<i>-raw.*`, a processed `<name>-<i>.png`, and `<name>-<i>.json` (prompt, refs, params, cost, check results).
6. **Review.** Look at every output. `CHECK` lines are automatic failures (subject touching an edge, flat border strip, background not a key color); regenerate those rather than placing them. Then zoom in (crop at 3-4x) on every ETH glyph and every structure the user has flagged before, and check them against **The ETH glyph** and **Compositions that fail**. Report defects you find rather than letting the user discover them.
7. **Place in situ, automatically.** Don't wait for a pick: put the best passing candidate at its target location right away so the user can judge it on the real page in their running dev server.
   - `process` the archived raw (or `cp` the archived `.png`) to its final path, `public/images/<area>/<descriptive-name>.png`, sized to roughly 2x its largest rendered width with `--max-size`. Cutouts are trimmed to zero margin (`--pad 0`, the default); the page sets the spacing. Run a lossless PNG optimizer (oxipng) on the result.
   - If the target also uses a portrait version on small viewports (a `*-portrait.png` beside it, e.g. some `HubHero` backgrounds), crop it from the landscape image rather than generating it separately, so both stay identical.
   - Wire it into the target component (camelCase raster import, see the design-system skill's `page-hero-walkthrough.md`). If it replaces an existing image, repoint the import and leave the old file alone, so reverting is just `git checkout` on the component.
   - Tell the user the URL to check (e.g. `/organizations/`) and list the other candidates by path.
   - Never commit, and never start a dev server; the user runs their own.
8. **Iterate in place.** Each new trial is copied from the archive over the same in-repo file, so the page updates without touching the import again. Static imports pick up the change through their content hash; for a plain `/images/...` string `src`, tell the user to hard-refresh. Revise by adding a candidate as a `--ref` with an updated prompt. To go back to an earlier candidate ("I prefer the first one"), copy that archived file in; never regenerate it. Always say which archive number is currently in situ.
9. **Never delete the archive.** Leave `/tmp/image-gen/<name>/` alone, even after the image is placed. The user decides when it's done. When the user is happy, show `git status` so they can see exactly which files changed.

## Editing an existing image

Most work after the first generation is fixing details. Doing it well:

- **Fix only what the user flagged.** Starting over or "improving" unflagged areas changes sizes, colors and objects the user had already accepted, and is usually worse.
- **Redraw faithfully.** Pass the approved image as the sole (first) `--ref` and open with "Redraw the reference image faithfully: identical camera, framing, <list every element>, same colors, same linework. Change only <X>: <exact description of the fix>. Everything else stays exactly as it is." OpenAI reproduces the rest closely.
- **Take the whole redraw.** Patching just the fixed region back into the old image fails: a redraw shifts edges by around 10px. If everything else matches, place the full redraw.
- **Check the neighbors.** Removing or changing one element can break an adjacent one (removing an elevator shaft truncated the next one). Compare the whole image against the previous version before placing.
- **If the user supplies an edited version, it becomes the source.** Archive it in `/tmp/image-gen/<name>/`, place it, and use it as ref 1 for any later redraw. Never assume the user can edit images; for a detail the model keeps getting wrong, a manual edit can be suggested, not expected.

## House style

ethereum.org illustrations are hand-drawn, airy and utopian. Good references: `public/images/home/hero.png` (plus a full-resolution crop of its palms and strokes, which shows the line texture better than the whole image), `public/images/heroes/developers-hub-hero.png`, `learn-hub-hero.png` and `guides-hub-hero.jpg`. Avoid the roadmap, garden and quizzes heroes as references; they lean purple and pink.

Cues that work in prompts:

- Lines: hand-drawn in cobalt and royal blue, never black, lighter periwinkle for distant details. Gentle crayon quality: "lines waver a little in weight and have slightly soft, lightly textured edges, fills carry a faint paper grain; subtle and clean, mostly crisp, not scratchy". Full crayon wording overshoots into grain the user doesn't want (aim for about 75% clean, 25% texture).
- Color: mostly white and pale blue with peach, orange and cyan accents; red awnings are fine. Flat fills, no gradients, glow or halos.
- Architecture: sci-fi, white and rounded, slender columns, curved balconies, glass as pale blue panels with thin white grid lines, thin peach accent bands, rooftop plants. Classical forms (columns, pediments, domes) stay but in that white style. No brick or boxy present-day buildings.
- Ground: white or pale-blue tiles; floating slab edges in pale periwinkle, not brown earth.
- Plants: palms with feathery fronds of thin cobalt and periwinkle strokes, in white planters. No green, no round deciduous trees.
- People: simple outlined figures, flat-colored clothes, simple hair, low detail.
- Always add "No text, letters, numbers or currency symbols anywhere, no logos other than the Ethereum diamond, no UI labels." Clock faces get no numbers.

## The ETH glyph

Image models get the Ethereum diamond wrong more than anything else: one solid rhombus, a white fill or a line bridging the gap, an extra lattice of facets, a glyph rotated off the surface it sits on, or a smudge on a small coin. The **shape** must match `src/components/icons/eth-home-icon.svg` exactly. Its **colors don't matter**: they can change to suit the design (a coin imprint in coin tones, a white glyph on a pediment).

The shape, for checking outputs and describing fixes (the script's reference renders it as unfilled outlines for this reason):

- Two separate pieces stacked vertically, with an open gap between them where the background shows through.
- Upper piece: a tall kite with exactly four facets. Its side corners sit about halfway down the whole glyph and its bottom point about two-thirds down. A center line runs top to bottom, and a line from each side corner rises to meet it about a third of the way down.
- Lower piece: a downward chevron with exactly two facets. Its top edge is a shallow V parallel to the upper piece's bottom edges, and its tips sit just below the upper piece's corners.
- About 1.6 times as tall as wide, symmetric, the same width top and bottom. On a tilted or foreshortened surface it follows that surface's perspective and keeps the same structure.

How the script helps: with `--eth-glyph auto` (the default), any prompt that mentions Ethereum, ETH, a glyph or a diamond gets the detailed shape spec (`src/scripts/image-gen/eth-glyph.ts`) appended and a rendering of the canonical glyph attached as the **last** reference image. User refs keep their order, so "the first reference image" still means yours; never call the glyph anything but "the last reference image" in your own prompt. Use `--eth-glyph on` to force it, `off` when the image has no glyph and the prompt only names Ethereum in passing, or when the reference slot is needed.

In prompts, also:

- Ask for few glyphs, each drawn large. A glyph below about 15px in the output, or lying on foreshortened paper, is unreadable at any prompt fidelity; leave it off small coins and badges.
- Say where each glyph sits and which way it faces ("upright and centered at the top of the certificate", "lying flat in the center of the floor square, aligned with its edges").
- Don't ask for glows, highlights or "dimensional" facets on it; they turn into extra lines inside the shape.
- To fix a wrong glyph on an otherwise approved image, redraw faithfully (see **Editing an existing image**) with "Change only the Ethereum diamond on <where>" and its position, size and facing; the spec and reference supply the shape.

## Compositions that fail

These cost several failed generations each. Design them out in the prompt instead of fighting them:

- **Merging or branching rail tracks:** the model can't draw a clean switch, and "hide it under a train" produced two misaligned trains. Use a single continuous track.
- **Hard occlusion:** legs under tables, columns behind foreground objects, a bridge running behind a floating object. Use a solid-front desk or counter that reaches the floor, a single colonnade, fewer overlapping layers.
- **Repeated structure:** column rows, colonnades and dome drums come out unevenly spaced. Spell it out ("exactly four identical columns at exactly equal spacing on the same base line") and check spacing at zoom.
- **Impossible layering:** floors that don't continue behind objects, staircases that loop. Keep depth simple: one island, one level change.

## Naming

Name images for what they depict, never for where they're used: a town square with people used as the `/some-page/` hero is `town-square-buildings-with-people.png`, not `some-page-hero.png`. Placement changes; content doesn't. Kebab-case, specific enough to tell it apart from neighbors in the same folder. The `--name` passed to `generate` follows the same rule, so the archive folder and the final file match. If the final image ends up depicting something different from the original name, rename the in-repo file to match what's in the image (the archive folder keeps its name).

## Models

Default `openai/gpt-image-2.5-sunburst` at the highest `quality` it offers. It matches the house style (clothing, palms, architecture, ground, people, flat color) where `google/gemini-3-pro-image` (Nano Banana Pro) kept drawing black vector lines, purple and red casts and ordinary buildings despite explicit prompts. Switch with `--model` only when the user asks; run `models` to see what a model accepts -- the script validates flags against that list and drops options a model lacks.

- **Cutouts:** OpenAI supports `background: transparent`, so the script requests real alpha and skips keying. Models without it get a flat key background that the script removes.
- **Size:** OpenRouter exposes no size parameter; output tops out around 1536px on the long side (21:9 comes back 1536x656). For a wide hero that needs more, a local Real-ESRGAN upscale reads better on the page than the raw 1536px, though it flattens some crayon texture.
- `n` is 1 per call on Gemini; `--n 3` makes three calls. Models that accept a higher `n` batch it.

## Chroma keying

Only for models without native alpha, or for chroma images made elsewhere.

- Green (`#00FF00`) by default. Use `--key-color magenta` when the subject itself is green or teal; a green subject keyed on green turns partly transparent.
- Alpha comes from how strongly a pixel leans toward the sampled border color, then the background is unmixed from partially transparent pixels. Despill applies only to a 2px rim near transparency, so interior colors are untouched.
- Prefer PNG sources. JPEG compression smears the key into dark outlines, which leaves a faint tinted rim.
- `process` works on any existing chroma image, e.g. one generated by hand on the OpenRouter site.
