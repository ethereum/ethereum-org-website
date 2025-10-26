import { type ComponentProps, type HTMLAttributes } from "react"

import type { ChildOnlyProp } from "@/lib/types"

import ContributorsQuizBanner from "@/components/Banners/ContributorsQuizBanner"
import Card from "@/components/Card"
import BrowseApps from "@/components/Content/what-are-apps/BrowseApps"
import WhatAreAppsStories from "@/components/Content/what-are-apps/WhatAreAppsStories"
import Contributors from "@/components/Contributors"
import DocLink from "@/components/DocLink"
import Emoji from "@/components/Emoji"
import ExpandableCard from "@/components/ExpandableCard"
import FeaturedText from "@/components/FeaturedText"
import GlossaryTooltip from "@/components/Glossary/GlossaryTooltip"
import IdAnchor from "@/components/IdAnchor"
import MarkdownImage from "@/components/Image/MarkdownImage"
import IssuesList from "@/components/IssuesList"
import LocaleDateTime from "@/components/LocaleDateTime"
import MainArticle from "@/components/MainArticle"
import { PieChart } from "@/components/PieChart"
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
    "font-bold leading-xs my-8",
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
  <h4
    {...commonHeadingAttributes(cn("text-xl font-semibold", className), id)}
    {...rest}
  >
    <IdAnchor id={id} />
    {children}
  </h4>
)

export const Pre = (props: ChildOnlyProp) => (
  <pre
    className="max-w-full overflow-x-scroll whitespace-pre-wrap rounded border bg-background-highlight p-4"
    {...props}
  />
)

export const Paragraph = (props: ChildOnlyProp) => (
  <p className="mb-4 mt-8" {...props} />
)

export const Blockquote = (props: ChildOnlyProp) => (
  <blockquote
    className="mb-4 mt-8 border-s-2 border-accent-a bg-accent-a/10 p-6 [&>:first-child]:mt-0 [&>:last-child]:mb-0"
    {...props}
  />
)

export const HR = () => (
  <hr className="mb-4 mt-8 inline-block w-full border-body-medium opacity-60" />
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
export const Page = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <Flex
    className={cn(
      "mx-auto mb-16 w-full flex-col justify-between lg:flex-row lg:pt-16 lg:first-of-type:[&_h2]:mt-0",
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
    <MainArticle className="relative flex-[1_1_992px] px-8 pb-8" {...props} />
  )
}

// All custom React components
export const reactComponents = {
  ...AlertComponents,
  BrowseApps,
  ButtonLink,
  Card,
  ContentContainer,
  Contributors,
  ContributorsQuizBanner,
  Divider,
  DocLink,
  Emoji,
  ExpandableCard,
  FeaturedText,
  GlossaryTooltip,
  Page,
  PieChart,
  QuizWidget: StandaloneQuizWidget,
  IssuesList,
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
