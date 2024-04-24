import { ComponentProps } from "react"
import { CiLink } from "react-icons/ci"
import {
  Badge,
  Box,
  type BoxProps,
  calc,
  chakra,
  Divider as ChakraDivider,
  Flex,
  type FlexProps,
  type HeadingProps,
  Icon,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
  useToken,
} from "@chakra-ui/react"

import type { ChildOnlyProp } from "@/lib/types"

import ButtonDropdown, {
  type ButtonDropdownProps,
} from "@/components/ButtonDropdown"
import { ButtonLink } from "@/components/Buttons"
import Contributors from "@/components/Contributors"
import Link from "@/components/Link"
import MarkdownImage from "@/components/MarkdownImage"
import OldHeading from "@/components/OldHeading"
import { mdxTableComponents } from "@/components/Table"
import TooltipLink from "@/components/TooltipLink"
import YouTube from "@/components/YouTube"

import GlossaryTooltip from "./Glossary/GlossaryTooltip"
import { StandaloneQuizWidget } from "./Quiz/QuizWidget"
import Card from "./Card"
import DocLink from "./DocLink"
import Emoji from "./Emoji"
import ExpandableCard from "./ExpandableCard"
import FeaturedText from "./FeaturedText"
import InfoBanner from "./InfoBanner"
import IssuesList from "./IssuesList"
import LocaleDateTime from "./LocaleDateTime"
import MainArticle from "./MainArticle"
import VideoIframe from "./VideoIframe"

/**
 * Base HTML elements
 */
const headingPropsForAnchor = (id?: string): HeadingProps => {
  if (!id) return {}
  return {
    scrollMarginTop: 28,
    id,
    "data-group": true,
    position: "relative",
  } as HeadingProps
}

export const commonHeadingProps = (id?: string): HeadingProps => ({
  fontWeight: 700,
  lineHeight: 1.4,
  ...headingPropsForAnchor(id),
})

const IdAnchor = ({ id }: { id?: string }) => {
  if (!id) return null
  return (
    <Link
      href={"#" + id}
      position="absolute"
      insetInlineEnd="100%"
      aria-label={id.replaceAll("-", " ") + " permalink"}
      opacity={0}
      _groupHover={{ opacity: 1 }}
      _focus={{ opacity: 1 }}
      transition="opacity 0.1s ease-in-out"
    >
      <Icon as={CiLink} fontSize="xl" me="1" />
    </Link>
  )
}

export const Heading1 = ({ children, ...rest }: HeadingProps) => (
  <OldHeading as="h1" {...commonHeadingProps()} fontSize="2.5rem" {...rest}>
    {children}
  </OldHeading>
)

export const Heading2 = ({ id, children, ...rest }: HeadingProps) => (
  <OldHeading
    as="h2"
    {...commonHeadingProps(id)}
    fontSize="2rem"
    mt={16}
    {...rest}
  >
    <IdAnchor id={id} />
    {children}
  </OldHeading>
)

export const Heading3 = ({ id, children, ...rest }: HeadingProps) => (
  <OldHeading as="h3" {...commonHeadingProps(id)} fontSize="2xl" {...rest}>
    <IdAnchor id={id} />
    {children}
  </OldHeading>
)

export const Heading4 = ({ id, children, ...rest }: HeadingProps) => (
  <OldHeading
    as="h4"
    {...commonHeadingProps(id)}
    fontSize="xl"
    fontWeight={600}
    {...rest}
  >
    <IdAnchor id={id} />
    {children}
  </OldHeading>
)

export const Pre = (props: ChildOnlyProp) => (
  <chakra.pre
    bg="preBackground"
    border="1px"
    borderColor="preBorder"
    borderRadius="base"
    maxW="full"
    overflowX="scroll"
    p={4}
    whiteSpace="pre-wrap"
    {...props}
  />
)

export const Paragraph = (props: ChildOnlyProp) => (
  <Text mt={8} mb={4} {...props} />
)

export const HR = () => (
  <ChakraDivider
    mt={8}
    mb={4}
    display="inline-block"
    position="inherit"
    bg="border"
  />
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
  iframe: VideoIframe,
  ...mdxTableComponents,
}

/**
 * Custom React components
 */
export const Page = (props: FlexProps) => (
  <Flex
    flexDirection={{ base: "column", lg: "row" }}
    justifyContent="space-between"
    mx="auto"
    mb={16}
    pt={{ lg: 16 }}
    width="full"
    sx={{ "h2:first-of-type": { mt: { lg: 0 } } }}
    {...props}
  />
)

export const Title = (props: ChildOnlyProp) => <Heading1 mt={4} {...props} />

export const ContentContainer = (props: Pick<BoxProps, "id" | "children">) => {
  const lgBp = useToken("breakpoints", "lg")

  return (
    <Box
      as={MainArticle}
      flex={`1 1 ${lgBp}`}
      position="relative"
      px={8}
      pb={8}
      {...props}
      sx={{
        ".citation p": {
          color: "text200",
        },
      }}
    />
  )
}

export const InfoColumn = (props: ChildOnlyProp) => (
  <Flex
    as="aside"
    flexDirection="column"
    flex="0 1 400px"
    ms={8}
    me={16}
    position="sticky"
    top="6.25rem"
    height={calc("100vh").subtract("80px").toString()}
    {...props}
  />
)

export const InfoTitle = (props: ChildOnlyProp) => (
  <Heading2
    fontSize={{ base: "2.5rem", lg: "5xl" }}
    textAlign={{ base: "start", lg: "end" }}
    mt={0}
    {...props}
  />
)

export const MobileButton = (props: ChildOnlyProp) => {
  const borderColor = useToken("colors", "border")
  return (
    <Box
      hideFrom="lg"
      bg="background.base"
      boxShadow={`0 -1px 0 ${borderColor}`}
      position="sticky"
      bottom={0}
      zIndex={99}
      p={8}
      width="full"
      {...props}
    />
  )
}

export const StyledButtonDropdown = ({
  list,
  ...rest
}: FlexProps & Pick<ButtonDropdownProps, "list">) => (
  <Flex align="flex-end" justify="flex-end" mb={8} {...rest}>
    <ButtonDropdown list={list} w={{ base: "full", lg: "auto" }} minW="240px" />
  </Flex>
)

export const MobileButtonDropdown = (
  props: ComponentProps<typeof StyledButtonDropdown>
) => <StyledButtonDropdown mb={0} {...props} />

export const Divider = () => <Box my={16} w="10%" h={1} bgColor="homeDivider" />

// All custom React components
export const reactComponents = {
  Badge,
  ButtonLink,
  Card,
  ContentContainer,
  Contributors,
  Divider,
  DocLink,
  Emoji,
  ExpandableCard,
  FeaturedText,
  GlossaryTooltip,
  InfoBanner,
  InfoColumn,
  InfoTitle,
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
