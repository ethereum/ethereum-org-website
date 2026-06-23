import { type HTMLAttributes } from "react"

import Codeblock from "@/components/Codeblock"
import { RestakingList } from "@/components/Content/restaking/RestakingList"
import BrowseApps from "@/components/Content/what-are-apps/BrowseApps"
import WhatAreAppsStories from "@/components/Content/what-are-apps/WhatAreAppsStories"
import Contributors from "@/components/Contributors"
import DocLink from "@/components/DocLink"
import Emoji from "@/components/Emoji"
import ExpandableCard, {
  type ExpandableCardProps,
} from "@/components/ExpandableCard"
import FeaturedText from "@/components/FeaturedText"
import GlossaryTooltip from "@/components/Glossary/GlossaryTooltip"
import IdAnchor from "@/components/IdAnchor"
import MarkdownImage from "@/components/Image/MarkdownImage" // TODO: Pull into MdComponents
import IssuesList from "@/components/IssuesList"
import LocaleDateTime from "@/components/LocaleDateTime"
import MarkdownCard from "@/components/MarkdownCard"
import { StandaloneQuizWidget } from "@/components/Quiz/QuizWidget"
import TooltipLink from "@/components/TooltipLink"
import * as AlertComponents from "@/components/ui/alert"
import Blockquote from "@/components/ui/blockquote"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Grid } from "@/components/ui/grid"
import { Divider } from "@/components/ui/hr"
import HR from "@/components/ui/hr"
import KBD from "@/components/ui/kbd"
import { ListItem, OrderedList, UnorderedList } from "@/components/ui/list"
import { mdxTableComponents } from "@/components/ui/mdx-table-components"
import { Tag } from "@/components/ui/tag"
import YouTube from "@/components/YouTube"

import { cn } from "@/lib/utils/cn"

type HeadingProps = HTMLAttributes<HTMLHeadingElement>

export const HeadingWithId = ({
  id,
  children,
  className,
  as,
  ...rest
}: HeadingProps & { as?: "h3" | "h4" }) => {
  const Heading = as || "h2"
  return (
    <Heading
      id={id}
      className={cn("group relative", className)}
      data-group
      {...rest}
    >
      <IdAnchor id={id} />
      {children}
    </Heading>
  )
}

export const Pre = (props: HTMLAttributes<HTMLDivElement>) => {
  const match = props.className?.match(/(language-\S+)/)
  const codeLanguage = match ? match[0] : "plain-text"
  return <Codeblock codeLanguage={codeLanguage} {...props} />
}

// All base html element components
export const htmlElements = {
  a: TooltipLink,
  blockquote: Blockquote,
  h2: (props: HeadingProps) => <HeadingWithId {...props} />,
  h3: (props: HeadingProps) => <HeadingWithId as="h3" {...props} />,
  h4: (props: HeadingProps) => <HeadingWithId as="h4" {...props} />,
  hr: HR,
  img: MarkdownImage,
  kbd: KBD,
  li: ListItem,
  ol: OrderedList,
  pre: Pre,
  time: LocaleDateTime,
  ul: UnorderedList,
  ...mdxTableComponents,
}

/**
 * Custom React components
 */
const { Alert, ...AlertSubComponents } = AlertComponents

const AlertWithMargins = ({ className, ...props }) => (
  <Alert className={cn(className)} {...props} />
)

export const ExpandableCardWithMargin = ({
  className,
  ...props
}: ExpandableCardProps) => (
  <ExpandableCard className={cn("mb-4", className)} {...props} />
)

// All custom React components
export const reactComponents = {
  Alert: AlertWithMargins,
  ...AlertSubComponents,
  BrowseApps,
  ButtonLink,
  Card: MarkdownCard,
  Contributors,
  Divider,
  DocLink,
  Emoji,
  ExpandableCard: ExpandableCardWithMargin,
  FeaturedText,
  GlossaryTooltip,
  Grid,
  QuizWidget: StandaloneQuizWidget,
  IssuesList,
  RestakingList,
  Tag,
  WhatAreAppsStories,
  YouTube,
}

/**
 * All base markdown components as default export
 */
const MdComponents = {
  ...htmlElements,
  ...reactComponents,
}

export default MdComponents
