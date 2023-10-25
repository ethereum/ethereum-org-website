import { ChildOnlyProp, Lang } from "@/lib/types"
import { isLangRightToLeft } from "@/lib/utils/translations"
import { Box, Flex, FlexProps, HeadingProps, Text, useToken } from "@chakra-ui/react"

import BannerNotification from "@/components/BannerNotification"
// TODO: Implement file contributors
// import CrowdinContributors from "@/components/FileContributorsCrowdin"
// import GitHubContributors from "@/components/FileContributorsGitHub"
// TODO: IMPLEMENT PAGEMETADATA
// import PageMetadata from "@/components/PageMetadata"
import TableOfContents from "@/components/TableOfContents"
import Translation from "@/components/Translation"

import {
  Heading1 as MdHeading1,
} from "@/components/MdComponents"
import { useRouter } from "next/router"

// Utils
import { EDIT_CONTENT_URL } from "@/lib/constants"

const Page = (props: ChildOnlyProp & Pick<FlexProps, "dir">) => (
  <Flex
    direction="column"
    w="full"
    borderBottom="1px"
    borderColor="border"
    {...props}
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

const H1 = (props: HeadingProps) => (
  <MdHeading1
    fontFamily="mono"
    textTransform="uppercase"
    fontWeight="bold"
    fontSize={{ base: "2rem", md: "2.5rem" }}
    mt={{ base: 0, md: 8 }}
    mb={{ base: 4, md: 8 }}
    {...props}
  />
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

export const docsComponents = {

}

export const DocsLayout = ({ children, frontmatter, slug, tocItems }) => {
  const isRightToLeft = isLangRightToLeft(frontmatter.lang as Lang)
  const isPageIncomplete = !!frontmatter.incomplete
  const { asPath: relativePath} = useRouter()
  const absoluteEditPath = `${EDIT_CONTENT_URL}${relativePath}`

  return (
    <Page dir={isRightToLeft ? "rtl" : "ltr"}>
      {/* // TODO: IMPLEMENT PAGEMETADATA */}
      {/* <PageMetadata
        title={frontmatter.title}
        description={frontmatter.description}
      /> */}
      {isPageIncomplete && (
        <BannerNotification shouldShow={isPageIncomplete}>
          <Translation id="banner-page-incomplete" />
        </BannerNotification>
      )}
      <ContentContainer>
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
            // TODO: Implement file contributors
            // <GitHubContributors
            //   relativePath={relativePath}
            //   editPath={absoluteEditPath}
            // />
            <Text>GitHubContributors</Text>
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
