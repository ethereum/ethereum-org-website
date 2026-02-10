---
name: ab-testing
description: This skill provides patterns for working with the A/B testing infrastructure using Vercel Flags SDK and Matomo. Use when adding new experiments, creating A/B tested routes, or debugging variant assignment.
---

# A/B Testing

## Architecture Overview

The site uses a GDPR-compliant, cookie-less A/B testing system:

```
Request Flow:
1. User visits /en/learn
2. middleware.ts checks AB_TEST_ROUTES
3. If matched, calls precompute(abTestFlags) → signed code "abc123"
4. Rewrites to /en/abc123/learn
5. app/[locale]/[code]/learn/page.tsx renders with precomputed variants
```

```
Key Files:
middleware.ts                           # Precomputes flags, rewrites URLs
src/lib/ab-testing/flags.ts             # Flag definitions
src/lib/ab-testing/matomo-adapter.ts    # Matomo API integration
app/[locale]/[code]/page.tsx            # Homepage precomputed route
src/components/AB/ABTest.tsx            # Variant rendering component
src/components/AB/TestDebugPanel.tsx    # Debug panel (dev/preview only)
```

## URL Rewriting Pattern

The middleware rewrites A/B tested routes to include a signed code:

| Original Path | Rewritten Path | Page File Location |
|---------------|----------------|-------------------|
| `/en/` | `/en/abc123` | `app/[locale]/[code]/page.tsx` |
| `/en/learn` | `/en/abc123/learn` | `app/[locale]/[code]/learn/page.tsx` |
| `/en/foo/bar` | `/en/abc123/foo/bar` | `app/[locale]/[code]/foo/bar/page.tsx` |

Each A/B tested route requires its own page file under the `[code]` dynamic segment.

## Adding a New A/B Test

### Step 0: Set Up Goals in Matomo (Design/Product Team)

Before creating experiments, ensure you have proper **Goals** configured in Matomo to measure test success:

1. Go to **Goals** → **Manage Goals** in your Matomo dashboard
2. Create relevant goals for your test (e.g., "Newsletter Signup", "Wallet Connection", "Page Engagement")
3. Define conversion criteria (URL visits, events, etc.)

This step is important for measuring experiment effectiveness and should be done by the design/product team before technical implementation.

### Step 1: Create experiment in Matomo

1. Go to Experiments → Manage Experiments
2. Create new experiment (name must match flag key exactly)
3. Add variations with weights (original is implicit)
4. Set status to "running"

### Step 2: Add flag definition

In `src/lib/ab-testing/flags.ts`:

```typescript
export const learnHeroFlag = flag<number, MatomoEntities>({
  key: "LearnHero", // Must match Matomo experiment name exactly
  defaultValue: 0,
  description: "Learn page hero A/B test",
  options: [
    { value: 0, label: "Original" },
    { value: 1, label: "Variant A" },
  ],
  identify,
  adapter: createMatomoAdapter("LearnHero")(),
})

// Add to abTestFlags array - this enables precomputation
export const abTestFlags = [homepageHeroFlag, learnHeroFlag] as const
```

### Step 3: Add route to AB_TEST_ROUTES (if new route)

In `middleware.ts`:

```typescript
const AB_TEST_ROUTES = new Set(["/", "/learn"])
```

### Step 4: Create precomputed page (if new route)

Create `app/[locale]/[code]/learn/page.tsx`:

```typescript
import { generatePermutations, getPrecomputed } from "flags/next"
import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"

import type { Lang } from "@/lib/types"
import { DEFAULT_LOCALE, LOCALES_CODES } from "@/lib/constants"
import OriginalLearnPage from "../../learn/page"
import { abTestFlags, learnHeroFlag } from "@/lib/ab-testing/flags"

export async function generateStaticParams() {
  const codes = await generatePermutations(abTestFlags)
  return codes.map((code) => ({
    locale: DEFAULT_LOCALE,
    code,
  }))
}

interface PageProps {
  params: Promise<{ locale: string; code: string }>
}

export default async function PrecomputedLearnPage({ params }: PageProps) {
  const { locale, code } = await params

  if (!LOCALES_CODES.includes(locale)) {
    notFound()
  }

  setRequestLocale(locale)

  const [learnVariant] = await getPrecomputed(
    [learnHeroFlag],
    abTestFlags,
    code
  )

  return (
    <OriginalLearnPage
      params={{ locale: locale as Lang }}
      heroVariant={learnVariant}
    />
  )
}
```

### Step 5: Update the original page to accept variant prop

Modify the original page to accept and use the variant:

```typescript
interface PageProps {
  params: PageParams
  heroVariant?: number // Optional for non-A/B route access
}

export default async function LearnPage({ params, heroVariant = 0 }: PageProps) {
  // Use heroVariant to conditionally render content
}
```

### Step 6: Use ABTest component for variant rendering

```typescript
import { ABTest } from "@/components/AB/ABTest"

<ABTest
  testKey="LearnHero"
  variantIndex={heroVariant}
  variants={[
    <OriginalHero key="original" />,
    <VariantAHero key="variant-a" />,
  ]}
/>
```

## Adding a Test to an Existing Route

If the route already has a `[code]` page (e.g., homepage):

1. Create the flag in `flags.ts`
2. Add to `abTestFlags` array
3. Extract the new flag in the existing `[code]` page:

```typescript
const [heroVariant, newTestVariant] = await getPrecomputed(
  [homepageHeroFlag, newTestFlag],
  abTestFlags,
  code
)
```

4. Pass the variant to the component

## Local Development

To use mock experiments instead of fetching from Matomo, set `USE_MOCK_EXPERIMENTS=true` in your `.env.local`.

Mock experiments are defined in `matomo-adapter.ts`:

```typescript
const MOCK_EXPERIMENTS: Record<string, ABTestConfig> = {
  HomepageHero: {
    name: "HomepageHero",
    id: "dev-1",
    enabled: true,
    variants: [
      { name: "Original", weight: 50 },
      { name: "VariantA", weight: 50 },
    ],
  },
  // Add new experiments here for local testing
}
```

## Debug Panel

The debug panel appears in dev/preview environments and allows forcing specific variants:

- Sets cookie: `flag_override_{FlagKey}={variantIndex}`
- Middleware reads override and returns forced variant
- Production users cannot override (security restriction)

## Environment Variables

Required for Matomo integration:

```bash
NEXT_PUBLIC_MATOMO_URL=https://matomo.example.com
NEXT_PUBLIC_MATOMO_SITE_ID=4
MATOMO_API_TOKEN=your-api-token
FLAGS_SECRET=your-secret-key  # Generate with: openssl rand -base64 32

# Optional: use mock experiments instead of Matomo
USE_MOCK_EXPERIMENTS=true
```

## Common Patterns

### Multiple flags on same page

```typescript
const [heroFlag, ctaFlag, layoutFlag] = await getPrecomputed(
  [homepageHeroFlag, homepageCtaFlag, homepageLayoutFlag],
  abTestFlags,
  code
)
```

### Conditional variant logic (beyond component swap)

```typescript
const buttonColor = heroVariant === 1 ? "bg-blue-500" : "bg-green-500"
const showBanner = heroVariant > 0
```

## Rules

### 1. Flag key must match Matomo experiment name exactly

The `key` in the flag definition must match the experiment name in Matomo dashboard.

### 2. Always add flags to abTestFlags array

Flags not in the array will not be precomputed by middleware.

### 3. Each route needs its own [code] page

The `[code]` segment is the signed flags code, not a path. Create nested pages under `[code]/`.

### 4. Use generateStaticParams for static generation

All precomputed pages must export `generateStaticParams` to enable static builds.

### 5. Handle default variant gracefully

Original page should work without variant prop (default to 0):

```typescript
export default function Page({ heroVariant = 0 }: PageProps) {}
```

## Best Practices

### Experiment Naming

- Use clear, descriptive names that match your component purpose
- Be consistent: `key` in flag definition must match Matomo experiment name exactly
- Examples: "HomepageHero", "WalletCardLayout", "CheckoutFlow"

### Component Design

- Keep variants as similar as possible (same props, structure)
- Always provide a meaningful fallback (variant 0 = original)
- Use descriptive keys in ABTest component for debug panel readability
- Ensure variant array order matches flag options order exactly
- Test all variants in Storybook before deploying

### Testing Strategy

1. **Local Development**: Use `USE_MOCK_EXPERIMENTS=true` to test without Matomo
2. **Preview**: Verify debug panel shows correct variants and overrides work
3. **Production**: Start with small traffic allocation (10-20%), then scale up

### Performance

- Server-side rendering via middleware prevents layout shifts
- Minimal JavaScript overhead (variants resolved at build/request time)
- Flag permutations are statically generated for fast responses

## Troubleshooting

### Test Not Showing Variants

1. **Check Matomo**: Ensure experiment status is "running"
2. **Check naming**: Verify flag `key` matches Matomo experiment name exactly
3. **Check abTestFlags**: Ensure your flag is added to the `abTestFlags` array
4. **Check route**: Ensure route is in `AB_TEST_ROUTES` in middleware.ts
5. **Check console**: Look for errors in server logs

### Same Variant Always Shows

1. **Fingerprint consistency**: Same IP + User-Agent = same variant (this is intentional)
2. **Test from different devices/networks** to see other variants
3. **Use debug panel** to manually override variants in dev/preview
4. **Check weights**: Ensure all variants have weight > 0 in Matomo

### Matomo Not Tracking

1. **Verify experiment name**: Must match exactly between flag key and Matomo
2. **Check experiment status**: Must be "running" in Matomo dashboard
3. **Verify user hasn't opted out** of tracking
4. **Preview mode**: No tracking occurs in preview deployments (intentional)

### API/Fetch Issues

1. **Check environment variables**: Ensure all Matomo config is set correctly
2. **Verify API token**: Must have "experiments" permission in Matomo
3. **Check mock mode**: If `USE_MOCK_EXPERIMENTS=true`, ensure mock experiments are defined
4. **Fallback behavior**: When fetch fails, tests show original variant (safe default)
