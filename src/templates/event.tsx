import React from "react"
import { graphql, PageProps } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import {
  Box,
  BoxProps,
  chakra,
  Flex,
  FlexProps,
  Heading,
  HeadingProps,
  Show,
  Text,
  useToken,
} from "@chakra-ui/react"

import ButtonLink from "../components/ButtonLink"
import InfoBanner from "../components/InfoBanner"
import Link from "../components/Link"
import ExpandableCard from "../components/ExpandableCard"
import PageMetadata from "../components/PageMetadata"
import { type Item as ItemTableOfContents } from "../components/TableOfContents"
import UpgradeTableOfContents from "../components/UpgradeTableOfContents"

import { ChildOnlyProp, Context } from "../types"

const commonHeadingProps: HeadingProps = {
  fontWeight: 700,
  lineHeight: 1.4,
}

export const H1 = (props: HeadingProps) => (
  <Heading as="h1" {...commonHeadingProps} fontSize="2.5rem" {...props} />
)

export const H2 = (props: HeadingProps) => (
  <Heading {...commonHeadingProps} fontSize="2rem" mt={16} {...props} />
)

export const H3 = (props: HeadingProps) => (
  <Heading as="h3" {...commonHeadingProps} fontSize="2xl" {...props} />
)

export const H4 = (props: HeadingProps) => (
  <Heading
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

export const Page = (props: FlexProps) => (
  <Flex
    flexDirection={{ base: "column", lg: "row" }}
    justifyContent="space-between"
    mx="auto"
    my={16}
    width="full"
    sx={{ "p:first-of-type": { mt: { lg: 0 } } }}
    {...props}
  />
)

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
    {...props}
  />
)

const HeroContainer = (props: ChildOnlyProp) => (
  <Flex
    flexDirection={{ base: "column-reverse", lg: "row" }}
    alignItems="flex-start"
    minHeight="608px"
    gap="10px"
    flexShrink={0}
    {...props}
  />
)

// Note: you must pass components to MDXProvider in order to render them in markdown files
// https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/#mdxprovider
const components = {
  a: Link,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  p: Paragraph,
  li: chakra.li,
  pre: Pre,
  ExpandableCard,
  InfoBanner,
}

const HeroImage = chakra(GatsbyImage, {
  baseStyle: {
    alignSelf: {
      base: "center",
      lg: "normal",
    },
    backgroundSize: "contain",
    flex: "1 1 100%",
    right: 0,
    bottom: 0,
    width: "full",
    overflow: "initial",
  },
})

const EventPage = ({
  data: { pageData: mdx },
}: PageProps<Queries.EventPageQuery, Context>) => {
  const lgBp = useToken("breakpoints", "lg")
  const tocItems = mdx.tableOfContents?.items as ItemTableOfContents[]

  return (
    <Box position="relative" width="full">
      <HeroContainer>
        <HeroImage as={GatsbyImage} image={getImage(mdx.frontmatter.image)!} />
        <Box
          position="absolute"
          left="32px"
          top={{ base: "125px", md: "178px" }}
          borderRadius="4px"
          background="rgba(255, 255, 255, 0.80)"
          width={{ base: "300px", md: "384px" }}
          p={8}
        >
          <H1 color="gray.900" fontSize={{ base: "2rem", md: "2.5rem" }}>
            {mdx.frontmatter.title}
          </H1>
          <Text color="gray.900">{mdx?.frontmatter?.description}</Text>
          {mdx?.frontmatter?.buttons && (
            <ButtonLink to={mdx.frontmatter.buttons[0].to}>
              {mdx.frontmatter.buttons[0].label}
            </ButtonLink>
          )}
        </Box>
      </HeroContainer>
      <Page>
        <PageMetadata
          title={mdx.frontmatter.title}
          description={mdx.frontmatter.description}
        />
        <Show above={lgBp}>
          <InfoColumn>
            {tocItems && (
              <UpgradeTableOfContents
                items={tocItems}
                maxDepth={mdx.frontmatter.sidebarDepth!}
              />
            )}
          </InfoColumn>
        </Show>
        <ContentContainer id="content">
          <MDXProvider components={components}>
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </MDXProvider>
        </ContentContainer>
      </Page>
    </Box>
  )
}

export const eventPageQuery = graphql`
  query EventPage($languagesToFetch: [String!]!, $relativePath: String) {
    locales: allLocale(
      filter: {
        language: { in: $languagesToFetch }
        ns: { in: ["template-event", "learn-quizzes", "common"] }
      }
    ) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
    pageData: mdx(fields: { relativePath: { eq: $relativePath } }) {
      fields {
        slug
      }
      frontmatter {
        title
        description
        lang
        summaryPoint1
        alt
        buttons {
          label
          to
        }
        image {
          childImageSharp {
            gatsbyImageData(
              layout: FULL_WIDTH
              placeholder: BLURRED
              quality: 100
            )
          }
        }
      }
      body
      tableOfContents
    }
  }
`

export default EventPage
