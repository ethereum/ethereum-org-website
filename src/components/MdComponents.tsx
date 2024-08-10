import { ComponentProps, type HTMLAttributes } from "react"
import {
  Badge,
  Box,
  type BoxProps,
  ListItem,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react"

import type { ChildOnlyProp } from "@/lib/types"

import ButtonDropdown, {
  type ButtonDropdownProps,
} from "@/components/ButtonDropdown"
import { ButtonLink } from "@/components/Buttons"
import Contributors from "@/components/Contributors"
import MarkdownImage from "@/components/MarkdownImage"
import { mdxTableComponents } from "@/components/Table"
import TooltipLink from "@/components/TooltipLink"
import YouTube from "@/components/YouTube"

import { cn } from "@/lib/utils/cn"

import ContributorsQuizBanner from "./Banners/ContributorsQuizBanner"
import GlossaryTooltip from "./Glossary/GlossaryTooltip"
import { StandaloneQuizWidget } from "./Quiz/QuizWidget"
import { Flex } from "./ui/flex"
import Card from "./Card"
import DocLink from "./DocLink"
import Emoji from "./Emoji"
import ExpandableCard from "./ExpandableCard"
import FeaturedText from "./FeaturedText"
import IdAnchor from "./IdAnchor"
import InfoBanner from "./InfoBanner"
import IssuesList from "./IssuesList"
import LocaleDateTime from "./LocaleDateTime"
import MainArticle from "./MainArticle"

export const commonHeadingAttributes = (className: string, id?: string) => ({
  id,
  className: cn(
    "font-bold leading-xs my-8",
    id && "scroll-mt-28 relative",
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
  <h3 {...commonHeadingAttributes(cn("text-2xl", className), id)} {...rest}>
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
    className="max-w-full overflow-x-scroll whitespace-pre-wrap rounded border-[1px] border-[rgba(0,0,0,.05)] bg-[#f2f2f2] p-4 dark:border-[hsla(0,0%,100%,.05)] dark:bg-[#191919]"
    {...props}
  />
)

export const Paragraph = (props: ChildOnlyProp) => (
  <p className="mb-4 mt-8" {...props} />
)

export const HR = () => (
  <hr className="mb-4 mt-8 inline-block w-full bg-[#e5e5e5] opacity-60 dark:bg-[#333]" />
)

// All base html element components
export const htmlElements = {
  a: TooltipLink,
  div: Box,
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

export const ContentContainer = (props: Pick<BoxProps, "id" | "children">) => {
  return (
    <MainArticle
      className="relative flex-[1_1_992px] px-8 pb-8 [&_.citation_p]:text-[#666] dark:[&_.citation_p]:text-[#080808]"
      {...props}
    />
  )
}

export const MobileButton = (props: ChildOnlyProp) => {
  return (
    <div
      className="sticky bottom-0 z-[99] w-full bg-background p-8 shadow-[0_-1px_0_#e5e5e5] lg:hidden dark:shadow-[0_-1px_0_#333]"
      {...props}
    />
  )
}

export const StyledButtonDropdown = ({
  list,
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement> & Pick<ButtonDropdownProps, "list">) => (
  <Flex className={cn("mb-8 items-end justify-end", className)} {...rest}>
    <ButtonDropdown list={list} w={{ base: "full", lg: "auto" }} minW="240px" />
  </Flex>
)

export const MobileButtonDropdown = ({
  className,
  ...props
}: ComponentProps<typeof StyledButtonDropdown>) => (
  <StyledButtonDropdown className={cn("mb-0", className)} {...props} />
)

export const Divider = () => (
  <div className="my-16 h-1 w-[10%] bg-[#a4a4f3] dark:bg-[#ffc7a7]" />
)

// All custom React components
export const reactComponents = {
  Badge,
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
  InfoBanner,
  MobileButton,
  MobileButtonDropdown,
  Page,
  QuizWidget: StandaloneQuizWidget,
  StyledButtonDropdown,
  IssuesList,
  Title,
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
