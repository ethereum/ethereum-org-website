# AGENTS.md - Ethereum.org Website

The ethereum.org website: a Next.js 16 App Router site (React 19, TypeScript, Tailwind 4, next-intl with 25 locales) that is Ethereum's main educational and community hub. Stack and scripts are in `package.json`; deeper guides are in `docs/` and the skills under `.claude/skills/`. This file holds the conventions and gotchas you can't see from the code. `docs/solutions/` records past problems and fixes; where a note and the code disagree, trust the code.

## Code

- **Unused variables or parameters fail the CI lint job** (`unused-imports/no-unused-vars`). The only allowed unused arg is a bare `_`; never `_prefixed` names.
- Types shared across modules go in `@/lib/types`; a type used by one module stays beside it. No explicit `any` (ESLint fixes it to `unknown`).
- **Comments**: default to none. Add one only for a non-obvious "why" or a hidden constraint, in one or two lines.
- **Shared code** goes in an existing related module (`src/lib/constants.ts`, a file in `src/lib/utils/`), never a new file for one function or constant.
- **Bug fixes** cover every code path that produces the symptom; fix it once in the shared function rather than in each caller.
- **New files go where files of the same kind already live** (e.g. Netlify plugins next to `netlify/edge-functions/`). A new top-level or sibling directory needs a reason no existing one covers.
- File names: `src/components/ui/` and story files are kebab-case; elsewhere, follow the neighbouring components (mostly a PascalCase folder with `index.tsx`).
- Server Components by default. React 19: take `ref` as a prop; `forwardRef` only survives in legacy components.

## UI

The **`design-system` skill** is the canonical guide for components, tokens, RTL and server/client boundaries; load it for any UI change. The rules people trip on most:

- New variant definitions use `tailwind-variants` (`tv`); add variants to an existing `cva` component in place. Merge classes with `cn()`.
- RTL: logical classes only (`text-start`, `ms-*`, `ps-*`), never `text-left`, `ml-*`, `pl-*`.
- Numbers and dates: `numberFormat()` (`src/lib/utils/numbers.ts`) and `dateTimeFormat()` / `formatDate()` (`src/lib/utils/date.ts`) instead of `new Intl.NumberFormat` / `Intl.DateTimeFormat` or `.toLocale*String()`; they set Urdu/Arabic numbering. For rendered dates use `formatDateTime()`, whose UTC and space normalization keep SSR and client equal. Other `Intl` APIs (`ListFormat`, `DisplayNames`) are fine directly.

## Adding a page

Specs in `tests/unit/routing/` catch missed registration, namespace and tracing entries; the rest is on you.

- `generateMetadata` calls `getMetadata` with `slug` = the route path; JSON-LD goes in a colocated `page-jsonld.tsx`.
- A UI-only page maps its primary namespace in `src/lib/utils/translations.ts`; a `[param]` route is listed in `getDynamicIntlPagePaths()` (`src/lib/i18n/translationRegistry.ts`). Both feed canonical, hreflang and the sitemap.
- `getAppPageContributorInfo` takes the folder path under `app/[locale]/` (`"wallets/find-wallet"`).
- A `noIndex` page also goes in `EXCLUDED_PATHS` (`app/sitemaps/sitemap.ts`). Every new page gets an inbound link (nav, footer or a related page).

## i18n and content

- All user-facing text goes through `t()`, including JSON-LD strings, `alt`, `aria-*`, sr-only text and API error messages. Server: `getTranslations` / `getLocale` from `next-intl/server`. Client: `useTranslations` from `next-intl`, one bound function per namespace (`const tCommon = useTranslations("common")`), never `t("ns:key")`.
- A key built from data needs a fallback for ids without a key: a missing key renders its last segment as text.
- Editing English strings: reuse an existing translated key before adding one; leave keys you aren't changing byte-identical (any value edit, even quoting, re-translates it in 24 locales). Rename a key or ICU argument only alongside an Intl Pipeline run: a renamed argument renders the raw key in every locale. English copy changes reach locales only when someone runs the Intl Pipeline workflow after merge.
- New keys go only in `src/intl/en/`. `common`'s `language-*` and `region-*` keys are looked up dynamically; never delete them as unused.
- **Never hand-propagate English changes into non-English files**: the intl-pipeline (`src/scripts/intl-pipeline/`) does it and its manifests break otherwise. Fixing a translation error is fine when the English hasn't moved. Details: the `intl-pipeline` skill; translation review: the `intl-review` skill.
- Markdown in `public/content/`: every h1–h4 needs a `{#lower-kebab-id}` (`pnpm lint:md:fix` adds them; markdownlint enforces in CI). Images are co-located with the markdown and referenced with `./` paths; `/images/` paths break the MDX render. `public/images/` is for component imagery. A new MDX component prop with visible text must be in `TRANSLATABLE_ATTRIBUTES` (`src/scripts/intl-pipeline/lib/shared-patterns.ts`) or it stays English in every locale.

## Data

- `chainName` / `supported_chains` take the exact `name` from `src/data/chains.ts` (case-sensitive: `"OP Mainnet"`, not `"Optimism"`), or `NonEVMChainName` / `AppOnlyChainName` from `src/lib/types.ts`. `pnpm type-check` verifies them.
- Data-layer work: the `data-layer` skill. Pages and components read data through `@/lib/data` getters, never `@/data-layer` (lint enforces). `@/lib/data` is server-side: importing it from a module a client component imports breaks the build. A new fetched field must also be added to `src/data-layer/mocks/*.json`, because previews run with `USE_MOCK_DATA=true`.
- Fetchers throw on failure so the last good blob survives; returning `[]` or `{ error }` overwrites it. A Trigger task's schedule in `src/data-layer/tasks.ts` matches its getter's `revalidate`, and a new task needs one manual run before the release that ships it (its getter returns `null` until then).

## Runtime and deploy (Netlify)

- **`public/content` is not in the Netlify server function.** A page that reads it at render time must stay static (`revalidate: false` getters like `getStaticAppsData`) or get an `outputFileTracingIncludes` entry in `next.config.js`. A finite-`revalidate` getter (e.g. `getEventsData`) turns the whole route into ISR, even with route-level `revalidate = false` or `force-static`. Details: `docs/solutions/integration-issues/netlify-isr-404-async-server-components.md`.
- A build or deploy step that expected work and found none fails loudly (non-zero exit), never logs and goes green.
- Edge functions read env through `Netlify.env`, not `process.env`. Request-time code never writes to disk.
- `s3-dcl1.ethquokkaops.io` (app, event and logo images) and Netlify Blobs (`src/data-layer/storage.ts`, cached API responses) are team-run services, not third parties.

## Tests and Storybook

- Unit tests (`pnpm test:unit`) can only import plain modules (`src/lib/**`, data files): components fail to load under the runner and `@/` doesn't cover `app/`. Move logic a test needs into `src/lib/`. Tests import the real function; a test that re-implements the logic it checks stays green when the site breaks.
- E2E: `docs/e2e-testing.md`. Full-page visual tests: the `page-visual-tests` skill.
- Stories live in `__stories__/` for flat directories (`ui/`, `styles/`) and next to foldered components. Titles are `Section / Group / Name`, with the section set by path: `src/styles` → `Design System`, `src/components/ui` → `UI`, other `src/components` → `Components`, `src/layouts` → `Layouts`, `app` → `Pages`. Use an existing group (Actions, Forms, Layout, Navigation, Overlays, Data Display, Cards, Heroes, Site Chrome, Content, Data Viz, Features, Typography) or none; never invent one for a single component. `tests/unit/storybook/story-titles.spec.ts` enforces prefixes, explicit titles and uniqueness.
- No stories for deprecated components or variants. Add `tags: ["autodocs"]` and a `docs.description.component` blurb aimed at someone deciding whether to use it.
- A green Storybook build doesn't mean a story renders, and `UI /` stories skip Chromatic snapshots: open new stories in `pnpm storybook`. Namespaces a storied component uses go in the `ns` array in `.storybook/next-intl.ts`; components using `usePathname` need `parameters.nextjs.navigation.pathname`.

## A/B testing and search

- A/B tests (`docs/ab-testing.md`): variants match Matomo **by array index**, so the `variants` order and the `testKey` must match the Matomo experiment exactly. Only the default locale is tested.
- Site search (`docs/site-search.md`, `typesense/README.md`): ranking hints reach the index as `docsearch:*` meta tags from `src/lib/utils/metadata.ts`, so a change only takes effect after deploy and re-crawl. Block-explorer results come from `src/data/networks/networks.ts`.
