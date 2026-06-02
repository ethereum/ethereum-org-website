import { type ComponentProps, type HTMLAttributes } from "react"

import type { ChildOnlyProp } from "@/lib/types"

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
import MarkdownImage from "@/components/Image/MarkdownImage"
import IssuesList from "@/components/IssuesList"
import LocaleDateTime from "@/components/LocaleDateTime"
import MainArticle from "@/components/MainArticle"
import MarkdownCard from "@/components/MarkdownCard"
import { StandaloneQuizWidget } from "@/components/Quiz/QuizWidget"
import TooltipLink from "@/components/TooltipLink"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Divider } from "@/components/ui/divider"
import { Flex } from "@/components/ui/flex"
import { ListItem, OrderedList, UnorderedList } from "@/components/ui/list"
import { mdxTableComponents } from "@/components/ui/mdx-table-components"
import { Tag } from "@/components/ui/tag"
import YouTube from "@/components/YouTube"

import { cn } from "@/lib/utils/cn"

import * as AlertComponents from "../ui/alert"

export const commonHeadingAttributes = (className: string, id?: string) => ({
  id,
  className: cn(
    "leading-xs my-8",
    id && "scroll-mt-28 relative group",
    className
  ),
  "data-group": !!id || undefined,
})

type HeadingProps = HTMLAttributes<HTMLHeadingElement>

export const Heading1 = ({ children, className, ...rest }: HeadingProps) => (
  <h1 {...commonHeadingAttributes(cn("text-[2.5rem]", className))} {...rest}>
    {children}
  </h1>
)

export const Heading2 = ({
  id,
  children,
  className,
  ...rest
}: HeadingProps) => (
  <h2
    {...commonHeadingAttributes(cn("text-[2rem] mt-16", className), id)}
    {...rest}
  >
    <IdAnchor id={id} />
    {children}
  </h2>
)

export const Heading3 = ({
  id,
  children,
  className,
  ...rest
}: HeadingProps) => (
  <h3
    {...commonHeadingAttributes(cn("text-2xl mt-10", className), id)}
    {...rest}
  >
    <IdAnchor id={id} />
    {children}
  </h3>
)

export const Heading4 = ({
  id,
  children,
  className,
  ...rest
}: HeadingProps) => (
  <h4 {...commonHeadingAttributes(cn("text-xl", className), id)} {...rest}>
    <IdAnchor id={id} />
    {children}
  </h4>
)

export const Pre = (props: HTMLAttributes<HTMLDivElement>) => {
  const match = props.className?.match(/(language-\S+)/)
  const codeLanguage = match ? match[0] : "plain-text"
  return <Codeblock codeLanguage={codeLanguage} {...props} />
}

type ParagraphProps = ChildOnlyProp & { className?: string }

export const Paragraph = ({ className, ...props }: ParagraphProps) => (
  <p className={cn("mt-8 mb-4", className)} {...props} />
)

export const Blockquote = (props: ChildOnlyProp) => (
  <blockquote
    className="mt-8 mb-4 border-s-2 border-accent-a bg-accent-a/10 p-6 [&>:first-child]:mt-0 [&>:last-child]:mb-0"
    {...props}
  />
)

export const HR = () => (
  <hr className="mt-8 mb-4 inline-block w-full border-body-medium opacity-60" />
)

// All base html element components
export const htmlElements = {
  a: TooltipLink,
  blockquote: Blockquote,
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  hr: HR,
  img: MarkdownImage,
  li: ListItem,
  ol: OrderedList,
  p: Paragraph,
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
  <Alert className={cn("my-8", className)} {...props} />
)

export const Page = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <Flex
    className={cn(
      "mx-auto mb-16 w-full flex-col justify-between lg:flex-row lg:pt-16",
      className
    )}
    {...props}
  />
)

export const Title = (props: ChildOnlyProp) => (
  <Heading1 className="mt-4" {...props} />
)

export const ContentContainer = (props: ComponentProps<"article">) => {
  return (
    <MainArticle
      className="relative flex-[1_1_992px] px-8 pb-8 *:first:mt-0"
      {...props}
    />
  )
}

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
  ContentContainer,
  Contributors,
  Divider,
  DocLink,
  Emoji,
  ExpandableCard: ExpandableCardWithMargin,
  FeaturedText,
  GlossaryTooltip,
  Page,
  QuizWidget: StandaloneQuizWidget,
  IssuesList,
  RestakingList,
  Tag,
  Title,
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
