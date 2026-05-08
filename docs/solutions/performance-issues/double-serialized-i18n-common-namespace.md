---
title: Double serialization of common i18n namespace in HTML payload
date: 2026-02-27
category: Performance
severity: high
component: Internationalization (i18n), Next.js App Router, Layout and Page Providers
tags:
  - performance
  - i18n
  - payload-optimization
  - next-intl
  - serialization
  - html-size
related_prs:
  - 17661
symptoms:
  - "Common i18n namespace serialized twice in HTML output"
  - "Unnecessary bytes in page payload from duplicate namespace"
  - "Layout-level provider messages replaced by page-level provider"
root_cause: "Layout-level NextIntlClientProvider serialized 'common' namespace, but page-level providers atomically replaced it (per next-intl behavior), forcing pages to re-include 'common' and doubling the serialized bytes."
resolution_type: architecture-change
---

# Double Serialization of "common" i18n Namespace

## Problem

The ethereum.org website serialized the `common` i18n namespace twice in the HTML of every page:

1. **Layout-level** `NextIntlClientProvider` in `app/[locale]/providers.tsx` serialized "common" for layout components (Nav, Footer, FeedbackWidget)
2. **Page-level** `NextIntlClientProvider` (29 of 46 pages) also included "common" via `getRequiredNamespacesForPage()`

Per [next-intl's documentation](https://next-intl.dev/docs/usage/configuration), nested `NextIntlClientProvider` instances treat individual props as **atomic** — the page-level `messages` prop completely replaced the layout's messages rather than merging with them. This forced every page to re-include "common" to keep it accessible to page components.

## Root Cause

In `src/lib/utils/translations.ts`, `getRequiredNamespacesForPage()` always included `"common"` in its base namespaces:

```ts
const baseNamespaces = ["common"]
```

This meant every page picked and serialized the entire "common" namespace, even though it was already serialized by the layout provider. The duplication resulted in ~26KB of wasted bytes per page.

## Investigation

1. Explored the full layout component tree to understand which components are client vs server and which use `useTranslation`/`useLocale` hooks
2. Initially designed a 20+ file refactor to remove the layout-level I18nProvider entirely and pass translations as props from server components
3. Discovered PR #17661 lazy-loads mobile menu content via `React.lazy()` — `MobileMenuContent` is a `"use client"` component that internally calls `useTranslation`/`useNavigation`/`useLocale`. Passing translations as props from the server would put ~82KB back in the initial payload, undoing that optimization
4. Researched next-intl's nested provider behavior — found that `useMessages()` inside a nested provider reads from the **parent** provider's context
5. Realized we could keep both providers but have the page-level one merge parent messages instead of replacing them

## Solution

Three files changed:

### 1. `app/[locale]/providers.tsx` — Root provider uses `NextIntlClientProvider` directly

The layout-level provider doesn't need merging logic — it's the first provider in the tree. Changed from using the `I18nProvider` wrapper to `NextIntlClientProvider` directly:

```tsx
// Before
<I18nProvider locale={locale} messages={messages}>
  ...
</I18nProvider>

// After
<NextIntlClientProvider locale={locale} messages={messages} ...>
  ...
</NextIntlClientProvider>
```

### 2. `src/components/I18nProvider.tsx` — Page provider merges parent messages

Added `useMessages()` to read from the parent (layout) provider and merge with page-specific messages:

```tsx
import { NextIntlClientProvider, useMessages } from "next-intl"

export default function I18nProvider({ children, locale, messages }) {
  const parentMessages = useMessages()
  const merged = { ...parentMessages, ...messages }

  return (
    <NextIntlClientProvider locale={locale} messages={merged} ...>
      {children}
    </NextIntlClientProvider>
  )
}
```

**Key insight**: `useMessages()` is called in the component body, which executes in the context of the parent provider. The new `NextIntlClientProvider` hasn't rendered yet, so `useMessages()` returns the layout provider's messages (`{ common: {...} }`).

### 3. `src/lib/utils/translations.ts` — Remove "common" from page base namespaces

```ts
// Before
const baseNamespaces = ["common"]

// After
const baseNamespaces: string[] = []
```

Pages no longer pick/serialize "common". It comes from the layout provider via the client-side merge in `I18nProvider`.

## Data Flow After Fix

```
Layout: serializes { common: {...} } once → NextIntlClientProvider
  └── Page: serializes only { "page-wallets": {...} } → I18nProvider
        ├── useMessages() returns { common: {...} } from parent
        ├── merged = { common: {...}, "page-wallets": {...} }
        └── NextIntlClientProvider gets merged messages
```

"common" bytes appear only once in the HTML. Pages only add their page-specific namespaces.

## Why This Approach

| Alternative | Why rejected |
|---|---|
| Remove layout provider, pass translations as props | 20+ file refactor; conflicts with lazy-loaded mobile menu (PR #17661) which uses `useTranslation` client-side |
| Keep both providers, no change | Wastes ~26KB per page from double serialization |
| Split "common" into "layout" + "common" namespaces | More files to maintain, translation coordination overhead |

The chosen solution is 3 files, zero page-level changes, and preserves the lazy-loading optimization.

## Prevention

### Warning signs
- HTML payload grows without feature additions
- Same namespace key appearing multiple times in RSC payload
- `grep -o '"common":{' page.html | wc -l` returns > 1

### Best practices for next-intl provider nesting
- **Root provider**: Use `NextIntlClientProvider` directly, owns globally-needed namespaces
- **Nested providers**: Always merge parent messages via `useMessages()` before passing to `NextIntlClientProvider`
- **Page namespace lists**: Never include namespaces already provided by parent providers

### Verification

```bash
# Build and check a page
pnpm build
curl -sL http://localhost:3000/en/wallets/ -o /tmp/page.html
wc -c /tmp/page.html                           # Total size
gzip -c /tmp/page.html | wc -c                 # Gzipped size
grep -o '"common":' /tmp/page.html | wc -l     # Should be 1, not 2+
```

## Related Documentation

- `docs/translation-namespace-split.md` — Earlier proposal to split "common" into "layout" + "common"
- `docs/performance-analysis-html-size.md` — Root cause analysis identifying the 3x serialization
- `docs/performance-analysis-post-optimizations.md` — Post-optimization metrics (603KB → 275KB HTML)
- `docs/performance-analysis-find-wallet-translations.md` — Case study of unused namespace loading
