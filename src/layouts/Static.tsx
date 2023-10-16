import {
  Badge,
  Box,
  Divider as ChakraDivider,
  Flex,
  Heading,
  Icon,
  chakra,
} from "@chakra-ui/react"

import Breadcrumbs from "../components/Breadcrumbs"
import { ButtonLink } from "@/components/Buttons"
import DocLink from "@/components/DocLink"
import Emoji from "@/components/Emoji"
import EnergyConsumptionChart from "@/components/EnergyConsumptionChart"
import ExpandableCard from "@/components/ExpandableCard"
import FeedbackCard from "@/components/FeedbackCard"
import GlossaryDefinition from "@/components/Glossary/GlossaryDefinition"
import InfoBanner from "@/components/InfoBanner"
import Link from "@/components/Link"
import MarkdownImage from "@/components/MarkdownImage"
import { mdxTableComponents } from "@/components/Table"
import MeetupList from "@/components/MeetupList"
import NetworkUpgradeSummary from "@/components/History/NetworkUpgradeSummary"
import QuizWidget from "@/components/Quiz/QuizWidget"
import TableOfContents from "@/components/TableOfContents"
import Text from "@/components/OldText"
import UpcomingEventsList from "@/components/UpcomingEventsList"
import YouTube from "@/components/YouTube"

import { isLangRightToLeft } from "@/lib/utils/translations"
import { getLocaleTimestamp } from "@/lib/utils/time"

import type { ChildOnlyProp, Lang } from "@/lib/types"
import type { MdPageContent, StaticFrontmatter } from "@/lib/interfaces"

const Pre = (props: ChildOnlyProp) => (
  <Text
    as="pre"
    maxW="full"
    overflowX="scroll"
    bgColor="preBackground"
    borderRadius="base"
    p={4}
    border="1px solid"
    borderColor="preBorder"
    whiteSpace="pre-wrap"
    {...props}
  />
)

const HR = () => (
  <ChakraDivider
    mt={8}
    mb={4}
    display="inline-block"
    position="inherit"
    bg="border"
  />
)

const Divider = () => <Box my={16} w="10%" h={1} bgColor="homeDivider" />

const Header1 = (props: ChildOnlyProp) => (
  <Heading
    as="h1"
    fontSize={{ base: "2.5rem", md: "5xl" }}
    lineHeight={1.4}
    fontWeight="bold"
    _before={{
      content: `""`,
      display: "block",
      h: "140px",
      mt: "-140px",
      visibility: "hidden",
    }}
    sx={{
      a: {
        display: "none",
      },
    }}
    {...props}
  />
)

const Header2 = (props: ChildOnlyProp) => (
  <Heading
    fontSize={{ base: "2xl", md: "2rem" }}
    lineHeight={1.4}
    fontWeight="bold"
    sx={{ position: "inherit !important" }}
    _before={{
      content: `""`,
      display: "block",
      h: "120px",
      mt: "-120px",
      visibility: "hidden",
    }}
    {...props}
  />
)

const Header3 = (props: ChildOnlyProp) => (
  <Heading
    as="h3"
    fontSize={{ base: "xl", md: "2xl" }}
    lineHeight={1.4}
    sx={{ position: "inherit !important" }}
    _before={{
      content: `""`,
      display: "block",
      h: "120px",
      mt: "-120px",
      visibility: "hidden",
    }}
    {...props}
  />
)

const Header4 = (props: ChildOnlyProp) => (
  <Heading
    as="h4"
    fontSize={{ base: "md", md: "xl" }}
    lineHeight={1.4}
    fontWeight="semibold"
    sx={{ position: "unset !important" }}
    _before={{
      content: `""`,
      display: "block",
      h: "120px",
      mt: "-120px",
      visibility: "hidden",
    }}
    {...props}
  />
)

const Paragraph = (props: ChildOnlyProp) => (
  <Text fontSize="md" mt={8} mb={4} color="text300" {...props} />
)

const ListItem = (props: ChildOnlyProp) => (
  <chakra.li color="text300" {...props} />
)

// Static layout components
export const staticComponents = {
  a: Link,
  h1: Header1,
  h2: Header2,
  h3: Header3,
  h4: Header4,
  hr: HR,
  img: MarkdownImage,
  li: ListItem,
  p: Paragraph,
  pre: Pre,
  ...mdxTableComponents,
  ButtonLink,
  Badge,
  Divider,
  DocLink,
  Emoji,
  EnergyConsumptionChart,
  ExpandableCard,
  GlossaryDefinition,
  Icon,
  InfoBanner,
  Link,
  MeetupList,
  NetworkUpgradeSummary,
  UpcomingEventsList,
  QuizWidget,
  YouTube,
}

interface IProps extends ChildOnlyProp, MdPageContent {
  frontmatter: StaticFrontmatter
}
export const StaticLayout: React.FC<IProps> = ({
  children,
  frontmatter,
  slug,
  tocItems,
  lastUpdatedDate,
}) => {
  // const { language } = useI18next()
  const language = "en"
  const isRightToLeft = isLangRightToLeft(frontmatter.lang as Lang)

  return (
    <Box w="full" ml={2}>
      <Flex
        justifyContent="space-between"
        w="full"
        mx="auto"
        mb={16}
        p={8}
        pt={{ base: 8, lg: 16 }}
        dir={isRightToLeft ? "rtl" : "ltr"}
      >
        <Box
          as="article"
          maxW="container.md"
          w="full"
          sx={{
            ".featured": {
              pl: 4,
              ml: -4,
              borderLeft: "1px dotted",
              borderLeftColor: "primary.base",
            },

            ".citation": {
              p: {
                color: "text200",
              },
            },
          }}
        >
          <Breadcrumbs slug={slug} mb="8" />
          <Text
            color="text200"
            dir={isLangRightToLeft(language as Lang) ? "rtl" : "ltr"}
          >
            {/* TODO: add Translation when i18n is set up  */}
            {/* <Translation id="page-last-updated" />:{" "} */}
            Page last updated:{" "}
            {getLocaleTimestamp(language as Lang, lastUpdatedDate!)}
          </Text>
          <TableOfContents
            position="relative"
            zIndex={2}
            // editPath={absoluteEditPath}
            items={tocItems}
            isMobile
            maxDepth={frontmatter.sidebarDepth || 2}
            hideEditButton={!!frontmatter.hideEditButton}
          />
          {children}

          <FeedbackCard isArticle />
        </Box>
        <TableOfContents
          // editPath={absoluteEditPath}
          items={tocItems}
          maxDepth={frontmatter.sidebarDepth || 2}
          hideEditButton={!!frontmatter.hideEditButton}
        />
      </Flex>
    </Box>
  )
}
