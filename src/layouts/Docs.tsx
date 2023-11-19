import { useRouter } from "next/router"
import { ChildOnlyProp, Lang } from "@/lib/types"
import { isLangRightToLeft } from "@/lib/utils/translations"
import {
  Badge,
  Box,
  Divider as ChakraDivider,
  Flex,
  FlexProps,
  HeadingProps,
  ListItem as ChakraListItem,
  ListItemProps,
  ListProps,
  OrderedList as ChakraOrderedList,
  Text,
  UnorderedList as ChakraUnorderedList,
  useToken,
} from "@chakra-ui/react"

import BannerNotification from "@/components/BannerNotification"
import { ButtonLink } from "@/components/Buttons"
import CallToContribute from "@/components/CallToContribute"
import Card from "@/components/Card"
import Codeblock from "@/components/Codeblock"
// TODO: Implement file contributors
// import CrowdinContributors from "@/components/FileContributorsCrowdin"
import DeveloperDocsLinks from "@/components/DeveloperDocsLinks"
import DocsNav from "@/components/DocsNav"
import Emoji from "@/components/Emoji"
import FeedbackCard from "@/components/FeedbackCard"
import GitHubContributors from "@/components/GitHubContributors"
import GlossaryTooltip from "@/components/Glossary/GlossaryTooltip"
import InfoBanner from "@/components/InfoBanner"
import Link from "@/components/Link"
// TODO: IMPLEMENT PAGEMETADATA
// import PageMetadata from "@/components/PageMetadata"
import RollupProductDevDoc from "@/components/RollupProductDevDoc"
import SectionNav from "@/components/SectionNav"
import SideNav from "@/components/SideNav"
import SideNavMobile from "@/components/SideNavMobile"
import { mdxTableComponents } from "@/components/Table"
import TableOfContents from "@/components/TableOfContents"
import Translation from "@/components/Translation"
import YouTube from "@/components/YouTube"

import {
  Heading1 as MdHeading1,
  Heading2 as MdHeading2,
  Heading3 as MdHeading3,
  Heading4 as MdHeading4,
  Paragraph,
} from "@/components/MdComponents"

// Utils
import { EDIT_CONTENT_URL } from "@/lib/constants"
import { DocsFrontmatter, MdPageContent } from "@/lib/interfaces"

const Page = (props: ChildOnlyProp & Pick<FlexProps, "dir">) => (
  <Flex
    direction="column"
    w="full"
    borderBottom="1px"
    borderColor="border"
    {...props}
  />
)

const Divider = () => (
  <ChakraDivider
    my={16}
    w="10%"
    borderBottomWidth={1}
    borderColor="homeDivider"
  />
)

const ContentContainer = (props: ChildOnlyProp) => (
  <Flex
    justify={"space-between"}
    w="full"
    py={0}
    pl={0}
    pr={{ base: 0, lg: 8 }}
    backgroundColor="ednBackground"
    {...props}
  />
)

const baseHeadingStyle: HeadingProps = {
  fontFamily: "mono",
  textTransform: "uppercase",
  fontWeight: "bold",
}

const H1 = (props: HeadingProps) => (
  <MdHeading1
    {...baseHeadingStyle}
    fontSize={{ base: "2rem", md: "2.5rem" }}
    mt={{ base: 0, md: 8 }}
    mb={{ base: 4, md: 8 }}
    {...props}
  />
)

const H2 = (props: HeadingProps) => (
  <MdHeading2
    {...baseHeadingStyle}
    fontSize="2xl"
    lineHeight={{ base: 1.2, md: 1.4 }}
    pb={2}
    mt={12}
    borderBottom="1px"
    borderColor="border"
    {...props}
  />
)

const baseSubHeadingStyles: HeadingProps = {
  lineHeight: 1.4,
  fontWeight: "semibold",
}

const H3 = (props: HeadingProps) => (
  <MdHeading3 {...baseSubHeadingStyles} mt={12} {...props} />
)

const H4 = (props: HeadingProps) => (
  <MdHeading4 {...baseSubHeadingStyles} {...props} />
)

const UnorderedList = (props: ListProps) => (
  <ChakraUnorderedList ms="1.45rem" {...props} />
)
const OrderedList = (props: ListProps) => (
  <ChakraOrderedList ms="1.45rem" {...props} />
)

const ListItem = (props: ListItemProps) => (
  <ChakraListItem color="text300" {...props} />
)

// Apply styles for classes within markdown here
const Content = (props: ChildOnlyProp) => {
  const mdBreakpoint = useToken("breakpoints", "md")

  return (
    <Box
      as="article"
      flex={`1 1 ${mdBreakpoint}`}
      maxW={{ base: "full", lg: mdBreakpoint }}
      pt={{ base: 32, md: 12 }}
      pb={{ base: 8, md: 16 }}
      px={{ base: 8, md: 16 }}
      m="0 auto"
      sx={{
        ".featured": {
          paddingLeft: 4,
          marginLeft: -4,
          borderLeft: "1px dotted",
          borderColor: "primary",
        },
        ".citation": {
          p: {
            color: "text200",
          },
        },
      }}
      {...props}
    />
  )
}

const BackToTop = (props: ChildOnlyProp) => (
  <Flex
    display={{ lg: "none" }}
    mt={12}
    pt={8}
    borderTop="1px"
    borderColor="border"
    {...props}
  >
    <Link to="#top">
      <Translation id="back-to-top" /> ↑
    </Link>
  </Flex>
)

export const docsComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  p: Paragraph,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  pre: Codeblock,
  ...mdxTableComponents,
  Badge,
  ButtonLink,
  Card,
  CallToContribute,
  DeveloperDocsLinks,
  Divider,
  Emoji,
  GlossaryTooltip,
  InfoBanner,
  RollupProductDevDoc,
  SectionNav,
  YouTube,
}

interface DocsLayoutProps extends MdPageContent, ChildOnlyProp {
  frontmatter: DocsFrontmatter
}

export const DocsLayout = ({
  children,
  frontmatter,
  slug,
  tocItems,
  lastUpdatedDate,
}: DocsLayoutProps) => {
  const isRightToLeft = isLangRightToLeft(frontmatter.lang as Lang)
  const isPageIncomplete = !!frontmatter.incomplete
  const { asPath: relativePath } = useRouter()
  const absoluteEditPath = `${EDIT_CONTENT_URL}${relativePath}`

  return (
    <Page dir={isRightToLeft ? "rtl" : "ltr"}>
      {/* // TODO: IMPLEMENT PAGEMETADATA */}
      {/* <PageMetadata
        title={frontmatter.title}
        description={frontmatter.description}
      /> */}
      <SideNavMobile path={relativePath} />
      {isPageIncomplete && (
        <BannerNotification shouldShow={isPageIncomplete}>
          <Translation id="page-developers-docs:banner-page-incomplete" />
        </BannerNotification>
      )}
      <ContentContainer>
        <SideNav path={relativePath} />
        <Content>
          <H1 id="top">{frontmatter.title}</H1>
          {frontmatter.lang !== "en" ? (
            // TODO: Implement file contributors
            <Text>CrowdinContributors</Text>
            // <CrowdinContributors
            //   relativePath={relativePath}
            //   editPath={absoluteEditPath}
            //   langContributors={allCombinedTranslatorsJson.nodes}
            // />
          ) : (
            <GitHubContributors
              relativePath={relativePath}
              lastUpdatedDate={lastUpdatedDate!}
            />
          )}
          <TableOfContents
            slug={slug}
            editPath={absoluteEditPath}
            items={tocItems}
            isMobile
            maxDepth={frontmatter.sidebarDepth!}
            hideEditButton={!!frontmatter.hideEditButton}
          />
          {children}
          {isPageIncomplete && <CallToContribute editPath={absoluteEditPath} />}
          <BackToTop />
          <FeedbackCard isArticle />
          <DocsNav relativePath={relativePath} />
        </Content>
        {tocItems && (
          <TableOfContents
            slug={slug}
            editPath={absoluteEditPath}
            items={tocItems}
            maxDepth={frontmatter.sidebarDepth!}
            hideEditButton={!!frontmatter.hideEditButton}
            pt={isPageIncomplete ? "5rem" : "3rem"}
          />
        )}
      </ContentContainer>
    </Page>
  )
}
