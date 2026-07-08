import MergeArticleList from "@/components/MergeArticleList"
import MergeInfographic from "@/components/MergeInfographic"
import UpgradeStatus from "@/components/UpgradeStatus"

// MDX components available to upgrade markdown pages.
// The layout itself lives in `src/layouts/Topic.tsx`; per-section config is
// in `src/data/topics/upgrade.ts`.
export const upgradeComponents = {
  MergeArticleList,
  MergeInfographic,
  UpgradeStatus,
}
