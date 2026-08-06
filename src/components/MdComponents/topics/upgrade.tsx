import MergeArticleList from "@/components/MergeArticleList"
import MergeInfographic from "@/components/MergeInfographic"
import UpgradeStatus from "@/components/UpgradeStatus"

// MDX components available to upgrade markdown pages.
// The layout itself lives in `src/layouts/Topic.tsx`; per-section config is
// in `src/data/topics/upgrade.ts`.
//
// Note: `UpgradeSummary` is deliberately absent. It is rendered by
// `TopicLayout` for any page with a file in `src/data/upgrades`, so that it
// reaches every locale without a tag in 25 markdown files. Not to be confused
// with `UpgradeStatus` below, the "when shipping" aside on the Beacon Chain
// and Merge pages.
export const upgradeComponents = {
  MergeArticleList,
  MergeInfographic,
  UpgradeStatus,
}
