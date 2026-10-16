import type { PrivacyLessonFix, PrivacyLessonFixId } from "@/lib/types"

import { catalogue } from "./catalogue"

/** Part II fixes, easiest first (the order the fix cards appear in) */
const fixIds: PrivacyLessonFixId[] = [
  "wallet",
  "privtx",
  "browser",
  "ens",
  "tor",
  "separate",
  "timing",
  "stealth",
  "cex",
  "pool",
  "node",
]

/** Which entries each fix hides is derived from the catalogue, the single source. */
export const fixes: PrivacyLessonFix[] = fixIds.map((id) => ({
  id,
  nameKey: `fixes-fix-${id}-name`,
  shortKey: `fixes-fix-${id}-short`,
  hides: catalogue
    .filter((entry) => entry.fixes.includes(id))
    .map((entry) => entry.id),
}))
