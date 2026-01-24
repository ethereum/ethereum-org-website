# Developer Apps Page with Query Param Modal + Categories

## Overview
Create `/developers/apps` page listing developer apps. Clicking an item opens a modal with details via query param `?app=[appId]`. URL structure supports both the main list and category pages.

**URL Structure:**
```
/developers/apps                      → All apps (grid)
/developers/apps?app=hardhat          → App modal overlay
/developers/apps/[categoryId]         → Category page (filtered grid)
/developers/apps/[categoryId]?app=X   → Category + app modal
```

## Architecture: Query Params for Modal State

This pattern ensures:
- Soft navigation (click): Modal overlays list, URL updates with query param
- Hard navigation (direct URL/refresh): List renders, modal opens if `?app=` present
- Shareable URLs work correctly
- No route collision between apps and categories

## File Structure

```
app/[locale]/developers/apps/
├── layout.tsx                    # Simple passthrough layout
├── page.tsx                      # Apps list + modal (server component)
├── loading.tsx                   # List skeleton
├── [categoryId]/
│   └── page.tsx                  # Category page (filtered grid + modal)
└── _components/
    ├── AppCard.tsx               # Card for list (uses query param links)
    ├── AppGrid.tsx               # Grid layout
    ├── AppModal.tsx              # Modal wrapper (client)
    ├── AppModalServer.tsx        # Server component for modal content
    ├── CategoryHeader.tsx        # Category page header
    └── ModalSkeleton.tsx         # Modal loading skeleton

src/data/developer-apps/
├── types.ts                      # TypeScript interfaces
├── index.ts                      # Mock data + utilities
└── content/                      # MDX files
    ├── hardhat.mdx
    ├── foundry.mdx
    └── wagmi.mdx
```

## Implementation Steps

### Step 1: Data Layer
Create `src/data/developer-apps/`:

**types.ts**
```typescript
export interface DeveloperAppMeta {
  id: string           // URL slug
  title: string
  summary: string
  icon?: string
  category: string
}

export interface DeveloperAppContent extends DeveloperAppMeta {
  description: string  // MDX source
  website?: string
  github?: string
}

export interface Category {
  id: string
  title: string
  description: string
}
```

**index.ts** - Mock data with 5-6 apps, utility functions:
- `getAllApps()` - Returns metadata only (for list)
- `getAppById(id)` - Returns full content (for modal)
- `getAppContent(id)` - Returns raw MDX string
- `getAllCategories()` - Returns all categories
- `getCategoryById(id)` - Returns single category

### Step 2: Simplify Layout
`app/[locale]/developers/apps/layout.tsx`:
```typescript
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
```

### Step 3: Main List Page with Modal
`app/[locale]/developers/apps/page.tsx`:
```typescript
export default async function AppsPage({
  searchParams
}: {
  searchParams: Promise<{ app?: string }>
}) {
  const { app: selectedAppId } = await searchParams
  const { apps } = await getDeveloperAppsData()

  return (
    <>
      <AppGrid apps={apps} />
      {selectedAppId && (
        <Suspense fallback={<ModalSkeleton />}>
          <AppModalServer appId={selectedAppId} />
        </Suspense>
      )}
    </>
  )
}
```

### Step 4: Category Page
`app/[locale]/developers/apps/[categoryId]/page.tsx`:
```typescript
export default async function CategoryPage({
  params,
  searchParams
}: {
  params: Promise<{ categoryId: string }>
  searchParams: Promise<{ app?: string }>
}) {
  const { categoryId } = await params
  const { app: selectedAppId } = await searchParams
  const { apps } = await getDeveloperAppsData()
  const category = getCategoryById(categoryId)
  const filteredApps = apps.filter(app => app.category === categoryId)

  if (!category || filteredApps.length === 0) notFound()

  return (
    <>
      <CategoryHeader category={category} />
      <AppGrid apps={filteredApps} />
      {selectedAppId && (
        <Suspense fallback={<ModalSkeleton />}>
          <AppModalServer appId={selectedAppId} />
        </Suspense>
      )}
    </>
  )
}
```

### Step 5: AppCard Component
`_components/AppCard.tsx`:
```typescript
// Use query param instead of path-based navigation
<Link href={`?app=${app.id}`} scroll={false}>
  {/* Card content */}
</Link>
```

### Step 6: AppModal Component (Client)
`_components/AppModal.tsx`:
```typescript
"use client"

import { usePathname, useRouter } from "@/i18n/routing"
import { Dialog } from "@/components/ui/dialog-modal"

export function AppModal({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  const handleClose = () => {
    router.push(pathname, { scroll: false })
  }

  return (
    <Dialog open onOpenChange={(open) => !open && handleClose()}>
      {children}
    </Dialog>
  )
}
```

### Step 7: AppModalServer Component
`_components/AppModalServer.tsx`:
```typescript
import { getAppById, getAppContent } from "@/data/developer-apps"
import { AppModal } from "./AppModal"
import { compileMDX } from "@/lib/md/compile"
import { notFound } from "next/navigation"

export async function AppModalServer({ appId }: { appId: string }) {
  const app = await getAppById(appId)
  if (!app) notFound()

  const content = await getAppContent(appId)
  const { content: mdxContent } = await compileMDX(content)

  return (
    <AppModal>
      <h2>{app.title}</h2>
      {mdxContent}
      {app.website && <a href={app.website}>Website</a>}
      {app.github && <a href={app.github}>GitHub</a>}
    </AppModal>
  )
}
```

### Step 8: CategoryHeader Component
`_components/CategoryHeader.tsx`:
```typescript
import { Category } from "@/data/developer-apps/types"

export function CategoryHeader({ category }: { category: Category }) {
  return (
    <div>
      <h1>{category.title}</h1>
      <p>{category.description}</p>
    </div>
  )
}
```

### Step 9: ModalSkeleton Component
`_components/ModalSkeleton.tsx`:
```typescript
export function ModalSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Skeleton UI */}
    </div>
  )
}
```

### Step 10: MDX Content
Create `src/data/developer-apps/content/*.mdx`:
- Simple MDX files with frontmatter
- Compile on-demand in AppModalServer

## Migration from Intercepting Routes

**Files to Delete:**
- `app/[locale]/developers/apps/@modal/` (entire directory)
- `app/[locale]/developers/apps/[appId]/page.tsx` (original hard nav route)

**Files to Modify:**
- `layout.tsx` - Remove modal slot
- `page.tsx` - Add searchParams handling
- `AppCard.tsx` - Change to query param links
- `AppModal.tsx` - Use pathname for close behavior

**Files to Create:**
- `[categoryId]/page.tsx` - Category pages
- `_components/AppModalServer.tsx` - Server-side modal content
- `_components/CategoryHeader.tsx` - Category header
- `_components/ModalSkeleton.tsx` - Loading state

## Performance Strategy

1. **List page**: Only loads metadata (no MDX) - fast initial render
2. **Modal content**: Streamed with Suspense - progressive loading
3. **MDX compilation**: On-demand, only when modal opens
4. **Static generation**: Use `generateStaticParams` for categories

## Key Files to Reference

| File | Purpose |
|------|---------|
| `src/components/ui/dialog-modal.tsx` | Modal component with size variants |
| `src/i18n/routing.ts` | `Link`, `useRouter`, `usePathname` for i18n navigation |
| `src/lib/md/compile.ts` | Pattern for MDX compilation |
| `app/[locale]/developers/tutorials/page.tsx` | Developer page patterns |

## Mock Data

### Apps (5)
1. **Hardhat** - Ethereum development environment (category: "development")
2. **Foundry** - Blazing fast toolkit (category: "development")
3. **Wagmi** - React hooks for Ethereum (category: "libraries")
4. **Viem** - TypeScript interface for Ethereum (category: "libraries")
5. **Remix** - Browser-based IDE (category: "ide")

### Categories (3)
1. **development** - Development Frameworks
2. **libraries** - Web3 Libraries
3. **ide** - IDEs & Editors

## Trade-offs

**Pros:**
- No routing collision - clean solution
- Simpler file structure (no intercepting routes)
- Modal works identically on both list and category pages
- Easy to add more query params later

**Cons:**
- Query params may be stripped by some sharing contexts
- SEO: individual app pages less discoverable (no dedicated URLs)
- Loses streaming benefit of intercepting routes for initial modal load
