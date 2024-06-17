import { useRouter } from "next/router"
import {
  Badge,
  Box,
  type BoxProps,
  Divider,
  Flex,
  type HeadingProps,
  Kbd,
  Text,
  type TextProps,
  useToken,
} from "@chakra-ui/react"

import type { ChildOnlyProp } from "@/lib/types"
import type { MdPageContent, TutorialFrontmatter } from "@/lib/interfaces"

import { ButtonLink } from "@/components/Buttons"
import CallToContribute from "@/components/CallToContribute"
import Card from "@/components/Card"
import Codeblock from "@/components/Codeblock"
import Emoji from "@/components/Emoji"
import EnvWarningBanner from "@/components/EnvWarningBanner"
import FeedbackCard from "@/components/FeedbackCard"
import FileContributors from "@/components/FileContributors"
import GlossaryTooltip from "@/components/Glossary/GlossaryTooltip"
import InfoBanner from "@/components/InfoBanner"
import MainArticle from "@/components/MainArticle"
import {
  Heading1 as MdHeading1,
  Heading2 as MdHeading2,
  Heading3 as MdHeading3,
  Heading4 as MdHeading4,
} from "@/components/MdComponents"
import { mdxTableComponents } from "@/components/Table"
import TableOfContents from "@/components/TableOfContents"
import TooltipLink from "@/components/TooltipLink"
import TutorialMetadata from "@/components/TutorialMetadata"
import YouTube from "@/components/YouTube"

import { getEditPath } from "@/lib/utils/editPath"

type ContentContainerProps = Pick<BoxProps, "children" | "dir">

const ContentContainer = (props: ContentContainerProps) => {
  const boxShadow = useToken("colors", "tableBoxShadow")

  return (
    <Box
      as={MainArticle}
      maxW="1000px"
      minW={0}
      background="background.base"
      boxShadow={{ base: "none", lg: boxShadow }}
      m={{ base: "2.5rem 0rem", lg: "2rem 2rem 6rem" }}
      p={{ base: "3rem 2rem", lg: 16 }}
      borderRadius="4px"
      {...props}
      sx={{
        ".citation": {
          p: { color: "text200" },
        },
      }}
    />
  )
}

const Heading1 = (props: HeadingProps) => (
  <MdHeading1
    fontSize={{ base: "1.75rem", lg: "2.5rem" }}
    fontFamily="monospace"
    textTransform="uppercase"
    {...props}
  />
)

const Heading2 = (props: HeadingProps) => (
  <MdHeading2
    fontSize={{ base: "2xl", md: "2rem" }}
    fontFamily="monospace"
    textTransform="uppercase"
    scrollMarginTop={40}
    mt={12}
    {...props}
  />
)

const Heading3 = (props: HeadingProps) => (
  <MdHeading3
    fontWeight={{ base: "semibold" }}
    fontSize={{ base: "1rem", md: "1.5rem" }}
    scrollMarginTop={40}
    {...props}
  />
)

const Heading4 = (props: HeadingProps) => (
  <MdHeading4
    fontWeight={{ base: "semibold" }}
    fontSize={{ base: "1rem", md: "1.25rem" }}
    scrollMarginTop={40}
    {...props}
  />
)

const StyledDivider = (props) => (
  <Divider
    my={16}
    w="10%"
    h="1"
    opacity="1"
    backgroundColor="homeDivider"
    {...props}
  />
)

const Paragraph = (props: TextProps) => (
  <Text as="p" mt={8} mb={4} mx={0} color="text300" fontSize="md" {...props} />
)

const KBD = (props) => {
  const borderColor = useToken("colors", "primary.base")

  return (
    <Kbd
      verticalAlign="middle"
      p="0.15rem 0.45rem"
      borderRadius="2px"
      border={`1px solid ${borderColor}`}
      {...props}
    />
  )
}

export const tutorialsComponents = {
  a: TooltipLink,
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  p: Paragraph,
  kbd: KBD,
  pre: Codeblock,
  ...mdxTableComponents,
  Badge,
  ButtonLink,
  CallToContribute,
  Card,
  Emoji,
  EnvWarningBanner,
  GlossaryTooltip,
  InfoBanner,
  StyledDivider,
  YouTube,
}
type TutorialLayoutProps = ChildOnlyProp &
  Pick<MdPageContent, "tocItems" | "contributors" | "contentNotTranslated"> &
  Required<Pick<MdPageContent, "lastEditLocaleTimestamp">> & {
    frontmatter: TutorialFrontmatter
    timeToRead: number
  }

export const TutorialLayout = ({
  children,
  frontmatter,
  tocItems,
  timeToRead,
  lastEditLocaleTimestamp,
  contributors,
  contentNotTranslated,
}: TutorialLayoutProps) => {
  const { asPath: relativePath } = useRouter()
  const absoluteEditPath = getEditPath(relativePath)

  const borderColor = useToken("colors", "border")

  return (
    <>
      <Flex
        w="100%"
        borderBottom={`1px solid ${borderColor}`}
        m={{ base: "2rem 0rem", lg: "0 auto" }}
        p={{ base: "0", lg: "0 2rem 0 0" }}
        background={{ base: "background.base", lg: "ednBackground" }}
      >
        <ContentContainer dir={contentNotTranslated ? "ltr" : "unset"}>
          <Heading1>{frontmatter.title}</Heading1>
          <TutorialMetadata frontmatter={frontmatter} timeToRead={timeToRead} />
          <TableOfContents
            items={tocItems}
            maxDepth={frontmatter.sidebarDepth!}
            editPath={absoluteEditPath}
            isMobile
            pt={8}
          />
          {children}
          <FileContributors
            contributors={contributors}
            lastEditLocaleTimestamp={lastEditLocaleTimestamp}
          />
          <FeedbackCard />
        </ContentContainer>
        {tocItems && (
          <TableOfContents
            items={tocItems}
            maxDepth={frontmatter.sidebarDepth!}
            editPath={absoluteEditPath}
            hideEditButton={!!frontmatter.hideEditButton}
            pt={16}
          />
        )}
      </Flex>
    </>
  )
}
