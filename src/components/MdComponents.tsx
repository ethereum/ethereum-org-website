import { ComponentProps } from "react"
import {
  Badge,
  Box,
  calc,
  chakra,
  Divider as ChakraDivider,
  Flex,
  Text,
  type BoxProps,
  type FlexProps,
  type HeadingProps,
  useToken,
  ListItem,
  UnorderedList,
  OrderedList,
} from "@chakra-ui/react"
import ButtonDropdown, {
  type IProps as ButtonDropdownProps,
} from "@/components/ButtonDropdown"
import { ButtonLink } from "@/components/Buttons"
import { mdxTableComponents } from "@/components/Table"
import MarkdownImage from "@/components/MarkdownImage"
import MdLink from "@/components/MdLink"
import OldHeading from "@/components/OldHeading"
import YouTube from "@/components/YouTube"
import type { ChildOnlyProp } from "@/lib/types"
import Emoji from "./Emoji"
import ExpandableCard from "./ExpandableCard"
import GlossaryTooltip from "./Glossary/GlossaryTooltip"
import InfoBanner from "./InfoBanner"
import Card from "./Card"
import QuizWidget from "./Quiz/QuizWidget"
import DocLink from "./DocLink"
// import Contributors from "@/components/Contributors"
// import Logo from "@/components/Logo"
// import MeetupList from "@/components/MeetupList"

/**
 * Base HTML elements
 */
export const commonHeadingProps: HeadingProps = {
  fontWeight: 700,
  lineHeight: 1.4,
}

export const Heading1 = (props: HeadingProps) => (
  <OldHeading as="h1" {...commonHeadingProps} fontSize="2.5rem" {...props} />
)

export const Heading2 = (props: HeadingProps) => (
  <OldHeading
    as="h2"
    {...commonHeadingProps}
    fontSize="2rem"
    mt={16}
    {...props}
  />
)

export const Heading3 = (props: HeadingProps) => (
  <OldHeading as="h3" {...commonHeadingProps} fontSize="2xl" {...props} />
)

export const Heading4 = (props: HeadingProps) => (
  <OldHeading
    as="h4"
    {...commonHeadingProps}
    fontSize="xl"
    fontWeight={600}
    {...props}
  />
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
  <Text color="text300" mt={8} mb={4} {...props} />
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
  a: MdLink,
  div: Box,
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  hr: HR,
  img: MarkdownImage,
  ol: OrderedList,
  ul: UnorderedList,
  li: ListItem,
  p: Paragraph,
  pre: Pre,
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
      as="article"
      flex={`1 1 ${lgBp}`}
      position="relative"
      px={8}
      pb={8}
      {...props}
      sx={{
        ".featured": {
          pl: 4,
          ml: -4,
          borderLeft: "1px dotted",
          borderColor: "primary.base",
        },
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
    ml={8}
    mr={16}
    position="sticky"
    top="6.25rem"
    height={calc("100vh").subtract("80px").toString()}
    {...props}
  />
)

export const InfoTitle = (props: ChildOnlyProp) => (
  <Heading2
    fontSize={{ base: "2.5rem", lg: "5xl" }}
    textAlign={{ base: "left", lg: "right" }}
    mt={0}
    {...props}
  />
)

export const MobileButton = (props: ChildOnlyProp) => {
  const borderColor = useToken("colors", "border")
  return (
    <Box
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
  DocLink,
  Divider,
  Emoji,
  ExpandableCard,
  GlossaryTooltip,
  InfoBanner,
  InfoColumn,
  InfoTitle,
  MobileButton,
  QuizWidget,
  MobileButtonDropdown,
  Page,
  StyledButtonDropdown,
  Title,
  YouTube,
  // Contributors,
  // Logo,
  // MeetupList,
}

/**
 * All base markdown components as default export
 */
export default {
  ...htmlElements,
  ...reactComponents,
}
