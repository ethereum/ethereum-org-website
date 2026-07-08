# New Component Checklist

Use before opening a PR that introduces a new UI component.

## Step 0: Should this even be a new component?

Before writing a new file, run through `references/variant-vs-new.md`. The answer is usually "add a variant to an existing primitive." A new component file should encapsulate *fundamentally different behavior*, not just different styling.

If you've justified the new file, continue.

## Where Does It Live?

| Use scope | Location |
|---|---|
| UI primitive, reusable anywhere on the site | `src/components/ui/` |
| shadcn-regenerable primitive | `src/components/ui/` (mixed with custom; that's OK) |
| Reused across many pages | `src/components/ComponentName/index.tsx` |
| Reused across a sub-tree (e.g. `/community/**`), or required as a separate file due to client-side needs | `_components/` directory inside that page folder (e.g. `app/[locale]/community/_components/`) |
| Used only ONCE | Inline in the page file -- don't extract |
| Markdown shortcode | Add to `src/components/MdComponents/` |

**Default to inlining single-use JSX in the page file.** A separate component file is justified by *reuse* or by a *technical need* (client-component split, hook isolation), not by length.

## File Structure

For `ui/` primitives: source co-located in `src/components/ui/`, stories under `src/components/ui/__stories__/` (NOT co-located alongside the source). Story files use PascalCase names regardless of source casing.

```
src/components/ui/
  my-component.tsx                      # Source
  __stories__/
    MyComponent.stories.tsx             # Story (REQUIRED for ui/ primitives)
```

For feature components with sub-parts, use a directory and co-locate the story:

```
src/components/MyComponent/
  index.tsx
  MyComponent.stories.tsx
  SubComponent.tsx
  useMyComponent.ts  (if there's a custom hook)
```

## Implementation Conventions

### TypeScript

```tsx
// Props extending HTML attributes (for UI primitives that wrap a single element):
type MyComponentProps = React.ComponentPropsWithoutRef<"div"> & {
  customProp: string
} & VariantProps<typeof myComponentVariants>

// Or use ComponentPropsWithRef if forwarding refs:
type MyComponentProps = React.ComponentPropsWithRef<"div"> & { ... }

// Standalone interface for feature components that don't wrap a single HTML element:
interface MyFeatureProps {
  data: SomeDataType
  className?: string
}
```

**Rules**:
- All visible components MUST accept `className?: string`. Non-negotiable for composability.
- Don't use `React.FC<Props>` -- function declarations are preferred.
- Don't `Omit` from HTML attributes unless you genuinely need to.

### Variant Pattern: `tailwind-variants` (`tv`)

```tsx
import { tv, type VariantProps } from "tailwind-variants"

const myComponentVariants = tv({
  base: "rounded-lg border p-4",
  variants: {
    variant: {
      default: "bg-background text-body",
      outline: "border-2 border-primary bg-transparent",
    },
    size: {
      sm: "p-2 text-sm",
      md: "p-4 text-md",
      lg: "p-6 text-lg",
    },
  },
  defaultVariants: { variant: "default", size: "md" },
})
```

Don't use `cva` for new components. (No bulk migration of existing `cva` components -- swap opportunistically when touching them for other reasons.)

### `cn` for className merging

```tsx
import { cn } from "@/lib/utils/cn"

return <div className={cn(myComponentVariants({ variant, size }), className)} {...props} />
```

### `forwardRef` (when applicable)

Use `forwardRef` when:
- The component wraps a single interactive HTML element (button, input, anchor)
- It wraps a Radix primitive that accepts refs
- It needs to participate in focus management

```tsx
const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(myComponentVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)
MyComponent.displayName = "MyComponent"
```

Don't use `forwardRef` on:
- Feature/business components (they aren't composed into other UI)
- Pure layout components (Flex, Stack) unless they need DOM measurement

## Server vs Client

Default to Server Component. Only mark `"use client"` if you genuinely need:
- `useState` / `useReducer` / `useEffect`
- Browser APIs (`window`, `document`, `localStorage`)
- Inline event handlers (`onClick`, `onChange`, etc.)
- Context consumers for client-only context

See `references/server-vs-client.md` for boundary patterns.

## Internationalization

- All user-facing text comes from `t()` -- never hard-code English.
- Number formatting via `numberFormat()` from `@/lib/utils/numbers`.
- Date formatting via `dateTimeFormat()` from `@/lib/utils/date`.
- Spacing/positioning uses logical CSS (`start-`, `end-`, `ms-`, `me-`, `ps-`, `pe-`).
- Directional icons use `useRtlFlip` (or the project's `ChevronNext` / `ChevronPrev`).

See `references/i18n-rtl.md`.

## Accessibility

- Semantic HTML first (`<button>`, `<a>`, `<nav>`, etc., or the project's primitives).
- Icon-only interactive elements need `aria-label`.
- Images: `alt=""` only for purely decorative; otherwise describe.
- Heading hierarchy: one `<h1>` per page; don't skip levels.
- Use Radix primitives where they exist -- they handle focus, ARIA, keyboard for free.

See `references/a11y.md`.

## Storybook Story (REQUIRED for `ui/`)

```tsx
// src/components/ui/__stories__/MyComponent.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs"
import { MyComponent } from "../my-component"

const meta = {
  title: "UI / MyComponent",
  component: MyComponent,
} satisfies Meta<typeof MyComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Variants: StoryObj = {
  render: () => (
    <div className="flex gap-4">
      <MyComponent variant="default" />
      <MyComponent variant="outline" />
    </div>
  ),
}
```

Title hierarchy:
- `UI / Primitives / [Name]` -- shadcn-regenerable
- `UI / [Name]` -- custom project primitives
- `Components / [Name]` -- feature components
- `Layouts / [Name]` -- layout components

## Pre-Merge Checklist

### Implementation
- [ ] Component justifies its existence (not just a variant of an existing one)
- [ ] Lives in the correct directory
- [ ] Accepts `className?: string`
- [ ] Uses `tv()` for variants (not `cva`)
- [ ] Uses `cn()` for className merging
- [ ] `forwardRef` if appropriate (and not if not)
- [ ] No raw color hex / `rgb()` -- semantic tokens only
- [ ] No `left-`/`right-`/`ml-`/`mr-`/`pl-`/`pr-` -- logical equivalents
- [ ] No raw `<a>` or `<button>` inside -- uses project primitives
- [ ] No `useColorModeValue` -- Tailwind `dark:` instead
- [ ] No hard-coded English strings
- [ ] No `toLocaleString()` / `Intl.*` directly -- locale wrappers

### Server / Client
- [ ] Server Component unless `"use client"` is genuinely required
- [ ] If client, the boundary is as deep as possible (not at the top of a page)

### Story
- [ ] `MyComponent.stories.tsx` exists
- [ ] Story shows all variants
- [ ] Title follows the hierarchy convention

### Verification
- [ ] Renders in light AND dark mode (check Storybook)
- [ ] Renders in RTL (Arabic) -- spacing, icons, alignment all sensible
- [ ] Renders in verbose-language (German/Spanish) without overflow
- [ ] Tab-reachable -- keyboard navigation works
- [ ] Focus-visible ring shows on keyboard focus (and not mouse)
- [ ] Screen-reader announces sensibly (test with VoiceOver / NVDA / TalkBack)

### Cleanup
- [ ] No commented-out code
- [ ] No `console.log` debug statements
- [ ] No TODO comments without an owner / issue link
- [ ] Type errors clean (`pnpm type-check`)
- [ ] Lint clean (`pnpm lint`)
- [ ] Format clean (`pnpm format`)
