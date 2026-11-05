# AGENTS.md - Ethereum.org Website

The ethereum.org website: a Next.js 16 App Router site (React 19, TypeScript, Tailwind 4, next-intl with 25 locales) that is Ethereum's main educational and community hub. Stack and scripts are in `package.json`; deeper guides are in `docs/` and the skills under `.claude/skills/`. This file holds the conventions and gotchas you can't see from the code. `docs/solutions/` records past problems and fixes; notes marked `status: historical` describe code that no longer exists.

## Code

- **Unused variables or parameters fail the CI lint job** (`unused-imports/no-unused-vars`). The only allowed unused arg is a bare `_`; never `_prefixed` names.
- Types live in `@/lib/types`; no `any` (ESLint fixes it to `unknown`).
- **Comments**: default to none. Add one only for a non-obvious "why" or a hidden constraint, in one or two lines.
- **Shared code** goes in an existing related module (`src/lib/constants.ts`, a file in `src/lib/utils/`), never a new file for one function or constant.
- **Bug fixes** cover every code path that produces the symptom; fix it once in the shared function rather than in each caller.
- File names: `src/components/ui/` and story files are kebab-case; elsewhere, follow the neighbouring components (mostly a PascalCase folder with `index.tsx`).
- Server Components by default. React 19: take `ref` as a prop; `forwardRef` only survives in legacy components.

## UI

The **`design-system` skill** is the canonical guide for components, tokens, RTL and server/client boundaries; load it for any UI change. The rules people trip on most:

- Variants with `tailwind-variants` (`tv`) for new work; existing `cva` components migrate only when touched anyway. Merge classes with `cn()`.
- RTL: logical classes only (`text-start`, `ms-*`, `ps-*`), never `text-left`, `ml-*`, `pl-*`.
- Formatting: `numberFormat()` (`src/lib/utils/numbers.ts`) and `formatDateTime()` / `formatDate()` (`src/lib/utils/date.ts`), never raw `Intl.*Format` or `.toLocale*String()`; they handle Urdu/Arabic numbering and keep SSR and client output equal.

## i18n and content

- All user-facing text is translatable. Server: `getTranslations` / `getLocale` from `next-intl/server`. Client: `useTranslations` from `next-intl`, one bound function per namespace (`const tCommon = useTranslations("common")`).
- New keys go only in `src/intl/en/`. `common`'s `language-*` and `region-*` keys are looked up dynamically; never delete them as unused.
- **Never hand-propagate English changes into non-English files**: the intl-pipeline (`src/scripts/intl-pipeline/`) does it and its manifests break otherwise. Fixing a translation error is fine when the English hasn't moved. Details: the `intl-pipeline` skill; translation review: the `intl-review` skill.
- Markdown in `public/content/`: every h1–h4 needs a `{#lower-kebab-id}` (`pnpm lint:md:fix` adds them; markdownlint enforces in CI). Images are co-located with the markdown and referenced with `./` paths; `/images/` paths break the MDX render. `public/images/` is for component imagery.

## Data

- `chainName` / `supported_chains` take the exact `name` from `src/data/chains.ts` (case-sensitive: `"OP Mainnet"`, not `"Optimism"`), or `NonEVMChainName` / `AppOnlyChainName` from `src/lib/types.ts`. `pnpm type-check` verifies them.
- Data-layer work: the `data-layer` skill. A new fetched field must also be added to `src/data-layer/mocks/*.json`, because previews run with `USE_MOCK_DATA=true`. `@/lib/data` is server-side: importing it from a module a client component imports breaks the build.

## Runtime and deploy (Netlify)

- **`public/content` is not in the Netlify server function.** A page that reads it at render time must stay static (`revalidate: false` getters like `getStaticAppsData`) or get an `outputFileTracingIncludes` entry in `next.config.js`. A finite-`revalidate` getter (e.g. `getEventsData`) turns the whole route into ISR. Details: `docs/solutions/integration-issues/netlify-isr-404-async-server-components.md`.
- `s3-dcl1.ethquokkaops.io` (app, event and logo images) and Netlify Blobs (`src/data-layer/storage.ts`, cached API responses) are team-run services, not third parties.

## Tests and Storybook

- Unit tests (`pnpm test:unit`) can only import plain modules (`src/lib/**`, data files): components fail to load under the runner and `@/` doesn't cover `app/`. Move logic a test needs into `src/lib/`.
- E2E: `docs/e2e-testing.md`. Full-page visual tests: the `page-visual-tests` skill.
- Stories live in `__stories__/` for flat directories (`ui/`, `styles/`) and next to foldered components. Titles are `Section / Group / Name`, with the section set by path: `src/styles` → `Design System`, `src/components/ui` → `UI`, other `src/components` → `Components`, `src/layouts` → `Layouts`, `app` → `Pages`. Use an existing group (Actions, Forms, Layout, Navigation, Overlays, Data Display, Cards, Heroes, Site Chrome, Content, Data Viz, Features) or none; never invent one for a single component. `tests/unit/storybook/story-titles.spec.ts` enforces prefixes, explicit titles and uniqueness.
- No stories for deprecated components or variants. Add `tags: ["autodocs"]` and a `docs.description.component` blurb aimed at someone deciding whether to use it.
- A green Storybook build doesn't mean a story renders, and `UI /` stories skip Chromatic snapshots: open new stories in `pnpm storybook`. New i18n namespaces go in the `ns` array in `.storybook/next-intl.ts`; components using `usePathname` need `parameters.nextjs.navigation.pathname`.

## A/B testing and search

- A/B tests (`docs/ab-testing.md`): variants match Matomo **by array index**, so the `variants` order and the `testKey` must match the Matomo experiment exactly. Only the default locale is tested.
- Site search (`docs/site-search.md`, `typesense/README.md`): ranking hints reach the index as `docsearch:*` meta tags from `src/lib/utils/metadata.ts`, so a change only takes effect after deploy and re-crawl. Block-explorer results come from `src/data/networks/networks.ts`.
