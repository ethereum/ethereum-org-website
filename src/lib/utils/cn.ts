import { type ClassValue, clsx } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// Teach tailwind-merge about our custom background-image utilities
// (bg-tint-*, bg-fade-* -- see src/styles/utilities.css). Without this they
// pattern-match as bg-color and wrongly conflict with bg-background, dropping
// the solid base. Grouping them under bg-image makes them conflict with each
// other and native gradients (last wins) while coexisting with bg-color.
// `text-h1`-`text-h6` (src/styles/utilities.css) are font sizes, but pattern-match
// as text-color -- so `cn("text-h2", "text-primary")` silently dropped the size.
// Grouping them under font-size makes them conflict with other sizes, not colors.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "bg-image": [
        {
          bg: [
            (value: string) =>
              value.startsWith("tint-") || value.startsWith("fade-"),
          ],
        },
      ],
      "font-size": [{ text: [(value: string) => /^h[1-6]$/.test(value)] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
