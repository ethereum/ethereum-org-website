import type { ChildOnlyProp } from "@/lib/types"

import DocLink from "@/components/DocLink"
import ProductDisclaimer from "@/components/ProductDisclaimer"
import StakingComparison from "@/components/Staking/StakingComparison"
import StakingConsiderations from "@/components/Staking/StakingConsiderations"
import StakingGuides from "@/components/Staking/StakingGuides"
import StakingHowSoloWorks from "@/components/Staking/StakingHowSoloWorks"
import StakingLaunchpadWidget from "@/components/Staking/StakingLaunchpadWidget"
import StakingProductsCardGrid from "@/components/Staking/StakingProductsCardGrid"
import WithdrawalCredentials from "@/components/Staking/WithdrawalCredentials"
import WithdrawalsTabComparison from "@/components/Staking/WithdrawalsTabComparison"
import UpgradeStatus from "@/components/UpgradeStatus"

const TableContainer = (props: ChildOnlyProp) => (
  <div className="mx-auto w-fit lg:mx-0" {...props} />
)

// MDX components available to staking markdown pages.
// The layout itself lives in `src/layouts/Topic.tsx`; per-section config is
// in `src/data/topics/staking.ts`.
export const stakingComponents = {
  DocLink,
  ProductDisclaimer,
  StakingComparison,
  StakingConsiderations,
  StakingGuides,
  StakingHowSoloWorks,
  StakingLaunchpadWidget,
  StakingProductsCardGrid,
  TableContainer,
  UpgradeStatus,
  WithdrawalCredentials,
  WithdrawalsTabComparison,
}
