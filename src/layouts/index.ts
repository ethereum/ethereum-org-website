import { MDXRemoteProps } from "next-mdx-remote"

import { Layout } from "@/lib/types"

import { docsComponents, DocsLayout } from "./Docs"
import * as mdLayouts from "./md"
import { staticComponents, StaticLayout } from "./Static"
import { TutorialLayout, tutorialsComponents } from "./Tutorial"

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
  docs: DocsLayout,
  tutorial: TutorialLayout,
}

export const componentsMapping: Record<Layout, MDXRemoteProps["components"]> = {
  static: staticComponents,
  "use-cases": mdLayouts.useCasesComponents,
  staking: mdLayouts.stakingComponents,
  roadmap: mdLayouts.roadmapComponents,
  upgrade: mdLayouts.upgradeComponents,
  translatathon: mdLayouts.translatathonComponents,
  docs: docsComponents,
  tutorial: tutorialsComponents,
}
