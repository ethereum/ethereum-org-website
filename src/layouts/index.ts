import { MDXRemoteProps } from "next-mdx-remote"

import { Layout } from "@/lib/types"

import * as topicComponents from "@/components/MdComponents/topics"

import { docsComponents, DocsLayout } from "./Docs"
import * as mdLayouts from "./md"
import { staticComponents, StaticLayout } from "./Static"
import { TopicLayout } from "./Topic"
import { TutorialLayout, tutorialsComponents } from "./Tutorial"

export * from "./BaseLayout"
export * from "./Docs"
export * from "./md"
export * from "./Static"
export * from "./Topic"
export * from "./Tutorial"

export const layoutMapping = {
  static: StaticLayout,
  "use-cases": TopicLayout,
  staking: TopicLayout,
  roadmap: TopicLayout,
  upgrade: TopicLayout,
  translatathon: mdLayouts.TranslatathonLayout,
  docs: DocsLayout,
  tutorial: TutorialLayout,
}

export const componentsMapping: Record<Layout, MDXRemoteProps["components"]> = {
  static: staticComponents,
  "use-cases": topicComponents.useCasesComponents,
  staking: topicComponents.stakingComponents,
  roadmap: topicComponents.roadmapComponents,
  upgrade: topicComponents.upgradeComponents,
  translatathon: mdLayouts.translatathonComponents,
  docs: docsComponents,
  tutorial: tutorialsComponents,
}
