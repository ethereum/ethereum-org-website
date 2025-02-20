import { DocsLayout } from "./Docs"
import * as mdLayouts from "./md"
import { StaticLayout } from "./Static"
import { TutorialLayout } from "./Tutorial"

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
  docs: DocsLayout,
  translatathon: mdLayouts.TranslatathonLayout,
  tutorial: TutorialLayout,
}
