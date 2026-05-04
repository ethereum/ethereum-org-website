# Server vs Client Components (Project-Specific)

Default to Server Components. The agent already knows the React Server Components rules; this reference focuses on this codebase's patterns and the boundaries that already exist.

## Boundaries Established by Existing Primitives

These primitives are already `"use client"`. Importing them into a Server Component still works -- the client boundary lives at the primitive, not at your component. So this is fine in a Server Component:

```tsx
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import Modal from "@/components/ui/dialog-modal"

export default async function Page() {
  const t = await getTranslations()
  return (
    <Card href="/about">
      <CardContent>
        <CardTitle>{t("title")}</CardTitle>
      </CardContent>
    </Card>
  )
}
```

`Card` itself isn't `"use client"` -- but it imports `BaseLink`, which is. The boundary establishes there. Your page stays server.

Primitives that handle their own client boundary:

- `Button` / `ButtonLink` (click tracking + scrollIntoView)
- `InlineLink` / `BaseLink` (`usePathname` + tracking)
- `Avatar` (image-error state)
- `Tooltip` (mobile detection, scroll-close)
- `Modal` / `Dialog` / `Sheet` / `Drawer` / `Popover` / `DropdownMenu` / `Select` (open state)
- `Tabs`, `Accordion`, `TabNav` (active-state)
- `Carousel`, `Swiper`, `TerminalTypewriter`, `TruncatedText` (animation/state)
- `LinkBox` / `LinkOverlay`, `PersistentPanel` (interaction state)

## Translation Boundary

`useTranslations` (client) and `getTranslations` (server) serve the same purpose for content. **Don't mark a file `"use client"` just to use `useTranslations`.** Restructure: keep the parent server, let it call `getTranslations`, pass the translated strings down as props.

The `t()` functions returned by these are *similar but not strictly equivalent* -- variable interpolation, ICU pluralization, and rich-text/htmr patterns can behave differently between server and client paths. If a change touches both, test both. Don't assume swapping `useTranslations` for `getTranslations` (or vice versa) is a no-op.

### Existing SSR variants for translation-only client splits

Several components have `*SSR` variants explicitly to keep parent pages server-side:

| Client | SSR equivalent (preferred) |
|---|---|
| `Callout.tsx` | `CalloutSSR.tsx` |
| `CalloutBanner.tsx` | `CalloutBannerSSR.tsx` (canonical; older variant deprecated) |

Use the SSR version whenever the parent can do the translation work via `getTranslations`.

## Patterns Worth Knowing

### Extract the small interactive island

If a page is mostly static with one interactive piece, keep the page server and extract the island as a separate client component. Don't mark the whole page `"use client"`.

```tsx
// app/[locale]/page.tsx -- Server Component
import { ClientWidget } from "./client-widget"

export default async function Page() {
  const t = await getTranslations()
  return (
    <main>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
      <ClientWidget />  {/* Only this becomes client */}
    </main>
  )
}
```

```tsx
// app/[locale]/client-widget.tsx
"use client"
import { useState } from "react"
export function ClientWidget() { /* ... */ }
```

### Server Components can be `async`

Use this for data fetching at render time. Don't fetch in `useEffect` from a Server Component candidate.

```tsx
export default async function Page() {
  const data = await getSomeData()
  return <SomethingThatUsesData data={data} />
}
```

## Common Mistakes in This Codebase

- **`Callout` instead of `CalloutSSR`** when parent could be server
- **`CalloutBanner` instead of `CalloutBannerSSR`** (the latter is canonical post-cva)
- **`useEffect` data fetching** in a component that could be a Server Component
- **`"use client"` at the top of a page** when only a small subtree is interactive
- **`useTranslations` in a leaf component** instead of restructuring so the parent uses `getTranslations`
- **`useColorModeValue`** (Chakra leftover) -- use Tailwind `dark:` variant instead
