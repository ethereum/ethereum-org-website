# A/B Testing

GDPR-compliant, cookie-less A/B testing built on the [Flags SDK](https://flags-sdk.dev) precompute pattern, integrated with Matomo. Variants are assigned at the edge and served as **prerendered static pages** — running an experiment does not force dynamic rendering or give up edge caching.

## How it works

One public URL, several static pages behind it:

1. A request hits `proxy.ts`. If the path is registered in `abTestRoutes`, the proxy fingerprints the request headers (client IP, user agent, accept headers — nothing stored on the device), evaluates the route's flags against the Matomo experiment config, and packs the result into a **signed code** (HMAC, `FLAGS_SECRET`).
2. The proxy **rewrites** (not redirects) to an internal path: `/en/ab-code/<code>/<path>`. The visitor's address bar never changes.
3. That internal page was **prerendered at build time** — `generateStaticParams` emits one page per flag permutation — so the response is an edge cache hit, not a server render.
4. In the browser, `ABTestTracker` pushes `AbTesting::enter` to Matomo with the experiment name and variant, and sets custom dimension 1 for segment queries. Opted-out visitors are skipped.

The same fingerprint always hashes to the same bucket, so returning visitors get a consistent variant without cookies. On any failure (Matomo down, no experiment running, invalid code) everything falls through to the original page — a test can never break the site.

### Config propagation and latency

Next's Data Cache doesn't exist in the proxy runtime, so the adapter caches the Matomo config at **module level per edge isolate with a 1-hour TTL** (plus in-flight dedupe). Cost per request: one ~50–160 ms Matomo round-trip per isolate per TTL window, ~0 otherwise. Dashboard changes (pause, re-weight, scheduling) propagate within ~1 hour — no deploy needed. The fetch is bounded by a 2 s timeout; on failure the isolate keeps serving the last known config (stale-if-error) and retries after 60 s.

### Scope and safety properties

- **Default locale only.** Route keys are locale-less paths and English URLs are unprefixed, so `/es/...` etc. never match — non-English visitors get the original page with no tracker, entirely outside the experiment.
- **Internal URLs are not reachable.** Direct visits to `/ab-code/...` URLs get case-mangled by the sitewide lowercase redirect, fail signature verification, and 404. Coded pages also re-export the original page's metadata, so even a hypothetically reachable variant page declares the public URL as canonical. (Don't add an `X-Robots-Tag` header rule for `/ab-code/*`: if the CDN matched it against the middleware-rewrite target, it would noindex the public pages being A/B tested.)
- **Signed codes.** The variant assignment travels as a JWS signed with `FLAGS_SECRET`; tampered codes 404. Dots in the code are encoded as `~` (`encodeABCode`/`decodeABCode`) — with `trailingSlash: true`, a dotted URL segment reads as a file path and triggers a 308 redirect at the origin that would expose the internal URL (this killed the first attempt, #17265).
- **Bots** are fingerprint-assigned like any visitor (their UA/IP is stable, so they see a consistent variant); Matomo filters known bots from reports. There is no bot exclusion in the proxy.

## Adding an experiment

Example: testing a new hero on `/wallets/` with a Matomo experiment named `WalletsHero`.

### 1. Define the flag and register the route

```ts
// src/lib/ab-testing/flags.ts
export const walletsHeroFlag = defineABFlag(
  "WalletsHero", // must exactly match the Matomo experiment name
  "Wallets landing hero test"
)

export const walletsFlags = [walletsHeroFlag] as const

export const abTestRoutes: Record<string, readonly ABFlag[]> = {
  "/wallets/": walletsFlags, // locale-less canonical path, trailing slash included
}
```

Route keys are locale-less canonical paths — the homepage is `/`, everything else carries its trailing slash. Group flags per route so permutations don't multiply across pages.

### 2. Create the coded page

Mirror the page's path under `ab-code/[code]/`. It's a thin shell: verify the code, extract the variant index, render the real page.

```tsx
// app/[locale]/ab-code/[code]/wallets/page.tsx
import { generatePermutations, getPrecomputed } from "flags/next"
import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"

import type { Lang } from "@/lib/types"

import { DEFAULT_LOCALE } from "@/lib/constants"

import OriginalWalletsPage from "../../../wallets/page"

import { decodeABCode, encodeABCode } from "@/lib/ab-testing/constants"
import { walletsFlags, walletsHeroFlag } from "@/lib/ab-testing/flags"

export { generateMetadata } from "../../../wallets/page"

export async function generateStaticParams() {
  try {
    const codes = await generatePermutations(walletsFlags)
    return codes.map((code) => ({
      locale: DEFAULT_LOCALE,
      code: encodeABCode(code),
    }))
  } catch {
    return [] // CI builds without FLAGS_SECRET fall back to on-demand rendering
  }
}

export default async function PrecomputedWalletsPage({
  params,
}: {
  params: Promise<{ locale: string; code: string }>
}) {
  const { locale, code } = await params
  if (locale !== DEFAULT_LOCALE) notFound()
  setRequestLocale(locale)

  let heroVariant: number
  try {
    ;[heroVariant] = await getPrecomputed(
      [walletsHeroFlag],
      walletsFlags,
      decodeABCode(code)
    )
  } catch {
    notFound() // invalid or tampered code
  }

  return (
    <OriginalWalletsPage
      params={Promise.resolve({ locale: locale as Lang })}
      heroVariant={heroVariant}
    />
  )
}
```

### 3. Wrap the tested component in `ABTest`

In the real page, accept the optional variant prop. When it's absent (non-tested render — e.g. other locales), render the original directly. **Index 0 is always the original.** Variant content must be translatable like any other UI (`getTranslations`).

```tsx
// app/[locale]/wallets/page.tsx
const Page = async (props: {
  params: Promise<PageParams>
  heroVariant?: number
}) => {
  // ...
  {heroVariant !== undefined ? (
    <ABTest
      testKey="WalletsHero"
      variantIndex={heroVariant}
      variants={[
        <CurrentHero key="original" />,    // index 0 = Original
        <RedesignedHero key="variant-a" />, // index 1 = first Matomo variation
      ]}
    />
  ) : (
    <CurrentHero />
  )}
}
```

### 4. Test locally

```bash
# .env.local
FLAGS_SECRET=$(openssl rand -base64 32)
USE_MOCK_EXPERIMENTS=true
```

Add a mock entry to `MOCK_EXPERIMENTS` in `src/lib/ab-testing/matomo-adapter.ts`, run `pnpm dev`, and use the 🧪 debug panel (bottom-right, dev and preview deploys only) to force each variant — it sets a `flag_override_<testKey>` cookie and reloads, which the proxy honors. Verify both variants render and the URL never changes.

### 5. Create the Matomo experiment and ship

In the Matomo dashboard, create an A/B experiment named exactly like the `testKey`. Variations map to the `variants` array **by position**: Matomo's built-in "Original" is index 0, the first variation you add is index 1, and so on. Set traffic weights, start the experiment, merge the PR. Pausing, re-weighting, or scheduling the test afterwards happens entirely in Matomo — no deploy needed (changes propagate within ~1 hour).

An experiment buckets users only while it's **running** (and inside its date window, if set). A merely **created** experiment stays inactive unless it has an explicit `start_date` — so you can safely prepare experiments in the dashboard ahead of launch.

To remove a finished test: delete the flag, the `abTestRoutes` entry, the coded page, and the `ABTest` wrapper.

## The two rules that silently break tests

1. **Names match exactly.** `testKey`, the flag's `key`, and the Matomo experiment name are the same string. A mismatch doesn't error — everyone quietly gets the original.
2. **Order is the contract.** Variants pair with Matomo variations by array index, not by name. Don't insert a variation in the middle of a running experiment.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `FLAGS_SECRET` | Signs/verifies precomputed codes. Required at build time to prerender variant pages (missing → pages render on demand) and at runtime in the proxy. Generate with `openssl rand -base64 32`. |
| `MATOMO_API_TOKEN` | Fetches experiment config (`AbTesting.getAllExperiments`). Needs the "experiments" permission. |
| `NEXT_PUBLIC_MATOMO_URL` / `NEXT_PUBLIC_MATOMO_SITE_ID` | Matomo instance and site. |
| `USE_MOCK_EXPERIMENTS` | `true` = use `MOCK_EXPERIMENTS` instead of calling Matomo (local dev). |

## Architecture map

| File | Role |
| --- | --- |
| `proxy.ts` | Matches `abTestRoutes`, precomputes flags, rewrites to the coded path |
| `src/lib/ab-testing/flags.ts` | `defineABFlag`, header fingerprinting (`identify`), the `abTestRoutes` map |
| `src/lib/ab-testing/matomo-adapter.ts` | Fetches Matomo experiments, deterministic weighted assignment (FNV-1a), mocks |
| `src/lib/ab-testing/constants.ts` | `encodeABCode`/`decodeABCode`, override-cookie prefix, `ab-code` segment |
| `app/[locale]/ab-code/[code]/…` | One thin coded page per tested route |
| `src/components/AB/ABTest.tsx` | Renders the chosen variant + tracker + debug panel |
| `src/components/AB/TestTracker.tsx` | Pushes `AbTesting::enter` + custom dimension 1 to Matomo |
| `src/components/AB/TestDebugPanel.tsx` | Dev/preview variant switcher via override cookies |
