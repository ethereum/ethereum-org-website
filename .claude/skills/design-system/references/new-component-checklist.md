# New Component Checklist

Use before opening a PR that introduces a new UI component.

## Step 0: Should this even be a new component?

Before writing a new file, run through `references/variant-vs-new.md`. The answer is usually "add a variant to an existing primitive." A new component file should encapsulate _fundamentally different behavior_, not just different styling.

If you've justified the new file, continue.

## Where Does It Live?

| Use scope                                                                                                | Location                                                                                      |
| -------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| UI primitive, reusable anywhere on the site                                                              | `src/components/ui/`                                                                          |
| shadcn-regenerable primitive                                                                             | `src/components/ui/` (mixed with custom; that's OK)                                           |
| Reused across many pages                                                                                 | `src/components/ComponentName/index.tsx`                                                      |
| Reused across a sub-tree (e.g. `/community/**`), or required as a separate file due to client-side needs | `_components/` directory inside that page folder (e.g. `app/[locale]/community/_components/`) |
| Used only ONCE                                                                                           | Inline in the page file -- don't extract                                                      |
| Markdown shortcode                                                                                       | Add to `src/components/MdComponents/`                                                         |

**Default to inlining single-use JSX in the page file.** A separate component file is justified by _reuse_ or by a _technical need_ (client-component split, hook isolation), not by length.

## File Structure

For `ui/` primitives: source co-located in `src/components/ui/`, stories under `src/components/ui/__stories__/` (NOT co-located alongside the source). **Story filenames are kebab-case**, matching the repo's file convention and enforced by `tests/unit/storybook/story-titles.spec.ts` -- so `app-card.stories.tsx`, not `AppCard.stories.tsx`, even inside a PascalCase component directory (component filenames are a separate migration; don't rename those here).

```
src/components/ui/
  my-component.tsx                      # Source
  __stories__/
    my-component.stories.tsx            # Story (REQUIRED for ui/ primitives)
```

For feature components with sub-parts, use a directory and co-locate the story:

```
src/components/MyComponent/
  index.tsx
  my-component.stories.tsx
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

// Use ComponentPropsWithRef when callers may need the DOM node (ref is a regular prop in React 19):
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

return (
  <div
    className={cn(myComponentVariants({ variant, size }), className)}
    {...props}
  />
)
```

### Refs: accept `ref` as a regular prop (React 19)

**Don't write new `forwardRef` components.** React 19 passes `ref` as a regular prop -- when the component needs to expose its DOM node (it wraps an interactive element, a ref-accepting Radix primitive, or participates in focus management), just accept and spread it:

```tsx
type MyComponentProps = React.ComponentPropsWithRef<"div"> &
  VariantProps<typeof myComponentVariants>

function MyComponent({ className, variant, size, ...props }: MyComponentProps) {
  return (
    <div
      className={cn(myComponentVariants({ variant, size }), className)}
      {...props} // `ref` rides along in props
    />
  )
}
```

Many existing `ui/` files still use `React.forwardRef` -- that's legacy; leave it in place when you're not otherwise touching the component, but don't copy it into new ones. Components that never need a ref (feature/business components, pure layout wrappers) just don't accept one.

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
// src/components/ui/__stories__/my-component.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs"
import { MyComponent } from "../my-component"

const meta = {
  title: "UI / MyComponent",
  component: MyComponent,
  tags: ["autodocs"],
  parameters: {
    chromatic: { disableSnapshot: true }, // house norm for every `ui/` story
    docs: {
      description: {
        component: "What it's for, and the constraint a caller needs to know.",
      },
    },
  },
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

The title convention (path-derived section, second-level groups, uniqueness, the deprecated-no-story rule, and the "green build doesn't prove a story renders" caveat) lives in **CLAUDE.md's "Storybook stories" section** -- follow it; `tests/unit/storybook/story-titles.spec.ts` enforces the title rules.

## Pre-Merge Checklist

### Implementation

- [ ] Component justifies its existence (not just a variant of an existing one)
- [ ] Lives in the correct directory
- [ ] Accepts `className?: string`
- [ ] Uses `tv()` for variants (not `cva`)
- [ ] Uses `cn()` for className merging
- [ ] Accepts `ref` as a regular prop if callers need the DOM node; no new `forwardRef`
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

- [ ] `my-component.stories.tsx` exists
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
