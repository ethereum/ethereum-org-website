import { Box, Flex, type HeadingProps, Icon, chakra } from "@chakra-ui/react"
import { useRouter } from "next/router"

import Breadcrumbs from "@/components/Breadcrumbs"
import EnergyConsumptionChart from "@/components/EnergyConsumptionChart"
import FeedbackCard from "@/components/FeedbackCard"
import GlossaryDefinition from "@/components/Glossary/GlossaryDefinition"
import Link from "@/components/Link"
import MeetupList from "@/components/MeetupList"
import NetworkUpgradeSummary from "@/components/History/NetworkUpgradeSummary"
import TableOfContents from "@/components/TableOfContents"
import Text from "@/components/OldText"
import UpcomingEventsList from "@/components/UpcomingEventsList"

import { isLangRightToLeft } from "@/lib/utils/translations"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { CONTENT_DIR } from "@/lib/constants"

import type { ChildOnlyProp, Lang } from "@/lib/types"
import type { MdPageContent, StaticFrontmatter } from "@/lib/interfaces"
import {
  Heading1 as MdHeading1,
  Heading2 as MdHeading2,
  Heading3 as MdHeading3,
  Heading4 as MdHeading4,
} from "@/components/MdComponents"

const Heading1 = (props: HeadingProps) => (
  <MdHeading1 fontSize={{ base: "2.5rem", md: "5xl" }} {...props} />
)
const Heading2 = (props: HeadingProps) => (
  <MdHeading2 fontSize={{ base: "2xl", md: "2rem" }} {...props} />
)
const Heading3 = (props: HeadingProps) => (
  <MdHeading3 fontSize={{ base: "xl", md: "2xl" }} {...props} />
)
const Heading4 = (props: HeadingProps) => (
  <MdHeading4 fontSize={{ base: "md", md: "xl" }} {...props} />
)

const ListItem = (props: ChildOnlyProp) => (
  <chakra.li color="text300" {...props} />
)

// Static layout components
export const staticComponents = {
  a: Link,
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  li: ListItem,
  EnergyConsumptionChart,
  GlossaryDefinition,
  Icon,
  Link,
  MeetupList,
  NetworkUpgradeSummary,
  UpcomingEventsList,
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
  const { locale } = useRouter()
  const isRightToLeft = isLangRightToLeft(frontmatter.lang as Lang)

  const repo =
    process.env.NEXT_PUBLIC_GITHUB_REPO ||
    "ethereum/ethereum-org-website"
  const baseEditPath = `https://github.com/${repo}/tree/dev/${CONTENT_DIR}/`
  const absoluteEditPath = baseEditPath + slug + "index.md"

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
            dir={isLangRightToLeft(locale as Lang) ? "rtl" : "ltr"}
          >
            {/* TODO: add Translation when i18n is set up  */}
            {/* <Translation id="page-last-updated" />:{" "} */}
            Page last updated:{" "}
            {getLocaleTimestamp(locale as Lang, lastUpdatedDate!)}
          </Text>
          <TableOfContents
            position="relative"
            zIndex={2}
            items={tocItems}
            isMobile
            maxDepth={frontmatter.sidebarDepth || 2}
            hideEditButton={!!frontmatter.hideEditButton}
          />
          {children}

          <FeedbackCard isArticle />
        </Box>
        <TableOfContents
          editPath={absoluteEditPath}
          items={tocItems}
          maxDepth={frontmatter.sidebarDepth || 2}
          hideEditButton={!!frontmatter.hideEditButton}
        />
      </Flex>
    </Box>
  )
}
