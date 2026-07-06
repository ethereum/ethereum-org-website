import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils/cn"

// Kept in its own module (no "use client") so Server Components can compute
// button classes without pulling in the interactive Button implementation.
export const buttonVariants = cva(
  cn(
    // Sizing and positioning classes:
    "inline-flex gap-2 items-center justify-center rounded border border-solid transition [&>svg]:shrink-0",
    // Base default styling is "outline" pattern, primary color for text, border matches, no bg
    "text-primary border-current",
    "shadow-none transition-[box-shadow,transform] duration-200",
    // Hover: text/border to --primary-hover for ALL buttons. The hover box-shadow is
    // applied per-variant (solid/outline) below -- NOT on the base -- because ghost/link
    // must stay flat, and shadow-primary-no-blur-* is a custom utility tailwind-merge
    // won't dedupe against a variant-level `shadow-none` reset (it would leak through).
    // `hover-link` also fires when an ancestor `group/link` (e.g. a clickable Card) is
    // hovered, so a Button rendered as a non-interactive child mirrors the card's hover.
    "hover-link:!text-primary-hover hover-link:duration-200 hover-link:transition-[box-shadow,transform]",
    // Focus: Add 4px outline to all buttons, --primary-hover
    "focus-visible:outline focus-visible:outline-primary-hover focus-visible:outline-4 focus-visible:-outline-offset-1",
    // Active: text (border) to --primary-hover instead of primary, hide shadow
    "active:text-primary-hover active:shadow-none",
    // Disabled: Pointer events none, text (border) to --disabled
    "disabled:pointer-events-none disabled:text-disabled",
    // isSecondary: Switch text (border) to --body instead of --primary
    "[&[data-secondary='true']]:text-body"
  ),
  {
    variants: {
      variant: {
        solid: cn(
          "text-white bg-primary-action border-transparent",
          "hover-link:!text-white hover-link:bg-primary-action-hover hover-link:shadow-primary-no-blur-1", // Hover
          "active:bg-primary-action-hover", // Active
          "disabled:bg-disabled disabled:text-background" // Disabled
        ),
        outline: "hover-link:shadow-primary-no-blur-1", // Base styling + hover shadow
        ghost: "border-transparent",
        link: "border-transparent underline !min-h-0 !py-0 !px-1 active:text-primary",
      },
      size: {
        lg: "text-lg py-3 px-8 [&>svg]:size-6 rounded-lg focus-visible:rounded-lg",
        md: "min-h-10.5 px-4 py-2 [&>svg]:size-6",
        sm: "text-xs min-h-[31px] py-1.5 px-2 [&>svg]:size-4",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "md",
    },
  }
)
