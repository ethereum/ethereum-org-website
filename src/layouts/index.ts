import * as mdLayouts from "./md"
import { staticComponents, StaticLayout } from "./Static"

export * from "./BaseLayout"
export * from "./Docs"
export * from "./md"
export * from "./Static"
export * from "./Tutorial"

export const layoutMapping = {
  static: StaticLayout,
  "use-cases": mdLayouts.UseCasesLayout,
  staking: mdLayouts.StakingLayout,
  roadmap: mdLayouts.RoadmapLayout,
  upgrade: mdLayouts.UpgradeLayout,
  translatathon: mdLayouts.TranslatathonLayout,
}

export const componentsMapping = {
  ...staticComponents,
  ...mdLayouts.useCasesComponents,
  ...mdLayouts.stakingComponents,
  ...mdLayouts.roadmapComponents,
  ...mdLayouts.upgradeComponents,
  ...mdLayouts.translatathonComponents,
} as const
