import { MDXRemoteProps } from "next-mdx-remote"

import { Layout } from "@/lib/types"

import * as topicComponents from "@/components/MdComponents/topics"

import { docsComponents, DocsLayout } from "./Docs"
import { staticComponents, StaticLayout } from "./Static"
import { TopicLayout } from "./Topic"
import { TutorialLayout, tutorialsComponents } from "./Tutorial"

export * from "./BaseLayout"
export * from "./Docs"
export * from "./Static"
export * from "./Topic"
export * from "./Tutorial"

export const layoutMapping = {
  static: StaticLayout,
  "ai-agents": TopicLayout,
  "use-cases": TopicLayout,
  staking: TopicLayout,
  roadmap: TopicLayout,
  upgrade: TopicLayout,
  docs: DocsLayout,
  tutorial: TutorialLayout,
}

export const componentsMapping: Record<Layout, MDXRemoteProps["components"]> = {
  static: staticComponents,
  "ai-agents": topicComponents.aiAgentsComponents,
  "use-cases": topicComponents.useCasesComponents,
  staking: topicComponents.stakingComponents,
  roadmap: topicComponents.roadmapComponents,
  upgrade: topicComponents.upgradeComponents,
  docs: docsComponents,
  tutorial: tutorialsComponents,
}
