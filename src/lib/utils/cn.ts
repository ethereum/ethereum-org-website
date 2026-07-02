import { type ClassValue, clsx } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// Teach tailwind-merge about our custom background-image utilities
// (bg-tint-*, bg-fade-* -- see src/styles/utilities.css). Without this they
// pattern-match as bg-color and wrongly conflict with bg-background, dropping
// the solid base. Grouping them under bg-image makes them conflict with each
// other and native gradients (last wins) while coexisting with bg-color.
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
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
