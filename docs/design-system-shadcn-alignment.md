# Design System: shadcn Token Alignment

## Overview

This document tracks changes made to align ethereum.org's design token naming with shadcn/ui conventions while preserving the existing visual style.

## Changes Made

### 1. Added `--input` Token

**File:** `src/styles/semantic-tokens.css`

```css
/* Light mode */
:root {
  --input: var(--gray-900);  /* Same as --body */
}

/* Dark mode */
.dark {
  --input: var(--gray-100);  /* Same as --body */
}
```

The `--input` token uses the same values as `--body` to preserve the existing high-contrast input border style.

### 2. Added Tailwind Color

**File:** `tailwind.config.ts`

```typescript
input: "hsla(var(--input))",
```

### 3. Updated Input Component

**File:** `src/components/ui/input.tsx`

Changed from `border-body` to `border-input`:

```tsx
// Before
"border-body hover:not-disabled:border-primary-hover ..."

// After
"border-input hover:not-disabled:border-primary-hover ..."
```

## No Visual Change

This is a **token naming alignment only**. The visual appearance remains the same:
- Light mode: dark border (gray-900)
- Dark mode: light border (gray-100)

The difference is semantic - we now use `border-input` (the shadcn convention) instead of `border-body` (which was a workaround).

## Token Mapping

| Figma Variable | CSS Variable | Light Value | Dark Value |
|----------------|--------------|-------------|------------|
| `general/input` | `--input` | gray-900 (#121212) | gray-100 (#EDEDED) |
| `general/body` | `--body` | gray-900 (#121212) | gray-100 (#EDEDED) |

## Why This Matters

- **Semantic correctness**: `--input` describes what it's for (input borders)
- **Decoupling**: Input borders are no longer tied to body text color changes
- **shadcn alignment**: Follows the convention where inputs use `border-input`
