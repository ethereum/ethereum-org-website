import {
  Box,
  Flex,
  type HeadingProps,
  Icon,
  Text,
  chakra,
} from "@chakra-ui/react"

import Breadcrumbs from "../components/Breadcrumbs"
import EnergyConsumptionChart from "@/components/EnergyConsumptionChart"
import FeedbackCard from "@/components/FeedbackCard"
import GlossaryDefinition from "@/components/Glossary/GlossaryDefinition"
import Link from "@/components/Link"
import NetworkUpgradeSummary from "@/components/History/NetworkUpgradeSummary"
import UpcomingEventsList from "@/components/UpcomingEventsList"

import { isLangRightToLeft } from "@/lib/utils/translations"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getLastModifiedDate } from "@/lib/utils/gh"

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
  NetworkUpgradeSummary,
  UpcomingEventsList,
}

interface IProps extends ChildOnlyProp, MdPageContent {
  frontmatter: StaticFrontmatter
}
export const StaticLayout = ({
  children,
  frontmatter,
  slug,
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
          <Breadcrumbs slug={slug} />
          <Text
            color="text200"
            dir={isLangRightToLeft(language as Lang) ? "rtl" : "ltr"}
          >
            {/* TODO: add Translation when i18n is set up  */}
            {/* <Translation id="page-last-updated" />:{" "} */}
            Page last updated:{" "}
            {getLocaleTimestamp(language as Lang, lastUpdatedDate)}
          </Text>

          {children}

          <FeedbackCard isArticle />
        </Box>
      </Flex>
    </Box>
  )
}
