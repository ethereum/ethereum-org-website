# Variants vs New Components

When something *close enough* exists, prefer reuse over reinvention. This is the single highest-leverage habit for keeping the codebase DRY and consistent.

## The Three-Tier Hierarchy

When you need new UI, walk this list top-to-bottom and stop at the first match:

1. **Use an existing variant** of the right component. If `Card` already has `decoration="purple-gradient"` and that's what you need, just use it.
2. **Add a new variant** to the right component. If the right component exists but no existing variant covers the case "closely enough," add a new variant rather than creating a new file. See "When the right component has no variants yet" below if the component isn't already variant-driven.
3. **New component file** -- only if no existing component is the right shape (different *behavior*, not just different *styling*).

The bar gets higher as you go down. Most "new component" instincts are actually "new variant" instincts in disguise.

## The Decision

Before creating a new component file, ask:

1. **Is there an existing primitive that's close to what I need?** (Card, Button, Alert, Tag, Hero variants)
2. **Does an existing variant of that primitive cover my case?**
3. **If not, what's actually different?** (Different colors? Different padding? Different layout? Different content shape?)
4. **Could that difference be expressed as a variant prop?**

If you can stop at any of those steps, you don't need a new file.

## When a Variant Is the Answer

If your "new component" is mostly:

- A wrapper around an existing primitive with different colors/spacing/layout
- The same primitive with different content composition
- A specialization for one specific use case that mostly just changes class names

...it's a variant.

### Example: A new "ghost" card style

**Wrong**: Create `GhostCard.tsx` with the offset-shadow look.

**Right**: Add a `decoration="ghost-shadow"` variant to `Card`. The card primitive already supports composition; the variant just adds the shadow element.

### Example: A horizontal layout for cards

**Wrong**: Create `HorizontalCard.tsx` with `flex items-center gap-8`.

**Right**: Add a `layout="horizontal"` variant to `Card`. Same composition, different flex direction.

### Example: A specialized button

**Wrong**: Create `<DownloadButton>` that wraps `Button` with a download icon.

**Right**: Just use `<Button><Download /> Download</Button>`. If the icon-button pattern is repeated 10+ times, *then* consider a tiny wrapper -- but call it `IconButton` or use `ButtonTwoLines` if it fits.

## When a New Component IS the Answer

A new component is justified when:

- It encapsulates a **different shape of behavior** (e.g., `LinkBox` -- different click semantics, not just styling)
- It composes **multiple primitives in a domain-specific way** (e.g., `Layer2ProductCard` -- Card + Tag + Avatar + specific data shape)
- It manages **its own state or effects** that don't belong in a generic primitive
- It has **a different a11y story** (e.g., `Tooltip` wrapping both `ui/tooltip` for hover AND `ui/popover` for click)

The bar is high. Most "new component" instincts are actually "new variant" instincts in disguise.

## Adding a Variant with `tailwind-variants` (`tv`)

The team prefers `tv` for new and refactored components. No bulk migration of existing `cva` components -- swap to `tv` opportunistically when you're already touching one for another reason. For *new* components, always use `tv`.

### Pattern

```tsx
import { tv, type VariantProps } from "tailwind-variants"

const cardVariants = tv({
  base: "rounded-2xl text-body",
  variants: {
    decoration: {
      none: "",
      "ghost-shadow": "relative before:absolute before:inset-0 before:translate-x-2 before:translate-y-2 before:bg-background-medium before:rounded-2xl before:-z-10",
      "purple-gradient": "border border-primary/10 bg-card-gradient-secondary hover:bg-card-gradient-secondary-hover",
    },
    layout: {
      vertical: "flex flex-col",
      horizontal: "flex flex-row items-center gap-8",
    },
  },
  defaultVariants: {
    decoration: "none",
    layout: "vertical",
  },
})

type CardProps = React.ComponentPropsWithoutRef<"div"> & VariantProps<typeof cardVariants>

export function Card({ decoration, layout, className, ...props }: CardProps) {
  return <div className={cn(cardVariants({ decoration, layout }), className)} {...props} />
}
```

## When the Right Component Has No Variants Yet

Sometimes the right component is structurally correct, but its styling is hard-coded -- no `tv()` variants exist yet. You need a new visual variation. The wrong move is to create a wrapper component or fork the file. The right move is a backward-compatible refactor:

1. **Refactor the existing component to use `tv()`**, with the current/existing styles becoming the **default variant**. No consumer behavior changes -- everyone using the component without specifying a variant still gets exactly what they had.
2. **Add the new variant** for the new case. Use it where you need it.
3. Existing consumers continue to work unchanged. Future consumers can pick from the available variants or contribute new ones.

This pattern preserves backward compatibility while opening the component for extension. Don't introduce variants that *change* default behavior -- the goal is "now-extensible, same baseline."

### Example refactor

```tsx
// Before -- no variants, single hard-coded style:
export function MyComponent({ className, ...props }: Props) {
  return <div className={cn("bg-background p-4 rounded-lg", className)} {...props} />
}

// After -- introduce tv() with current style as default:
const myComponentVariants = tv({
  base: "rounded-lg",
  variants: {
    tone: {
      default: "bg-background p-4",      // existing style preserved as default
      highlight: "bg-accent-a p-6",      // new variant added
    },
  },
  defaultVariants: { tone: "default" },
})

type Props = React.ComponentPropsWithoutRef<"div"> & VariantProps<typeof myComponentVariants>

export function MyComponent({ tone, className, ...props }: Props) {
  return <div className={cn(myComponentVariants({ tone }), className)} {...props} />
}
```

All existing `<MyComponent>` usages keep their look. New `<MyComponent tone="highlight">` usages get the new style.

### `tv` features worth knowing

- **`base`** — the always-applied classes
- **`variants`** — discrete options (one selected at a time)
- **`compoundVariants`** — apply specific classes only when multiple variants combine ("when `size=sm` AND `variant=outline`, also add ...")
- **`defaultVariants`** — what's applied when the consumer doesn't specify
- **`slots`** — for components with multiple parts (used in `Modal`, `Avatar`, `Table`)
- **`VariantProps<typeof variants>`** — derive the type for prop typing

See `tailwind-variants` docs for slot patterns; the project's `Modal` (`ui/dialog-modal.tsx`) and `Table` (`ui/table.tsx`) are good examples.

## Checklist Before Creating a New Component File

Run through these. If you can't say "yes" to all of them, you should be adding a variant or composing existing primitives instead:

- [ ] **Is the behavior fundamentally different from existing primitives?** (Not just styling.)
- [ ] **Does it have a name that's not already a variant of an existing thing?** (`Card` with `decoration="ghost"` is not "GhostCard.")
- [ ] **Will it be reused in multiple places?** (One-off doesn't justify a new file -- inline the JSX.)
- [ ] **Is its API stable enough to commit to?** (Or is it actually a variant of something in flux?)
- [ ] **Does it pull its weight?** (More than 50 lines of custom logic, or a complex composition pattern that simplifies callers significantly.)
- [ ] **Does the team know about it?** (For a new shared primitive, propose it before building.)

## When You Find Inlining

If you're auditing existing code and find a long inline Tailwind chain that reproduces what a primitive already does, the right move is:

1. Replace the inline chain with the primitive (compose, don't inline)
2. If the primitive doesn't quite fit, *add a variant to the primitive* and use it
3. **Don't** create a new component file just to wrap the primitive with extra classes

## Examples of Things That Should Be Variants

These are all current candidates for absorption (each is a one-off that could be a variant on an existing primitive):

| Existing one-off | Should be |
|---|---|
| `GhostCard.tsx` | `Card` `decoration="ghost-shadow"` |
| `SubpageCard.tsx` | `Card` `decoration="purple-gradient"` |
| `HorizontalCard.tsx` | `Card` `layout="horizontal"` |
| `FloatingCard.tsx` | `Card` `tone="primary-gradient"` |
| `FeedbackCard.tsx` | `Card` `tone="feedback-gradient"` |

See `cleanup-playbook.md` for the full list of cleanup-track items.
