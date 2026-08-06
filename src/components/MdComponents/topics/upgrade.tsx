import MergeArticleList from "@/components/MergeArticleList"
import MergeInfographic from "@/components/MergeInfographic"
import UpgradeStatus from "@/components/UpgradeStatus"
import UpgradeSummary from "@/components/UpgradeSummary"

// MDX components available to upgrade markdown pages.
// The layout itself lives in `src/layouts/Topic.tsx`; per-section config is
// in `src/data/topics/upgrade.ts`.
export const upgradeComponents = {
  MergeArticleList,
  MergeInfographic,
  // `UpgradeStatus` is the "when shipping" aside on the Beacon Chain and Merge
  // pages; `UpgradeSummary` is the data-driven status block on upcoming
  // upgrades. Similar names, unrelated components.
  UpgradeStatus,
  UpgradeSummary,
}
