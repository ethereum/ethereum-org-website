// Libraries
import {
  Badge,
  Box,
  type BoxProps,
  chakra,
  Divider,
  Flex,
  HeadingProps,
  Kbd,
  Text,
  TextProps,
  useToken,
} from "@chakra-ui/react"
import { useRouter } from "next/router"

// Components
import { ButtonLink } from "@/components/Buttons"
import CallToContribute from "@/components/CallToContribute"
import Card from "@/components/Card"
import Codeblock from "@/components/Codeblock"
// TODO: Implement CrowdinContributors after intl is implemented
// import CrowdinConbtirbutors from "@/components/FileContributorsCrowdin"
import Emoji from "@/components/Emoji"
import EnvWarningBanner from "@/components/EnvWarningBanner"
import FeedbackCard from "@/components/FeedbackCard"
// TODO: Implement FileContribtorsGitHub
// import GitHubContributors from "@/components/FileContributorsGitHub"
import GlossaryTooltip from "@/components/Glossary/GlossaryTooltip"
import InfoBanner from "@/components/InfoBanner"
import {
  Heading1 as MdHeading1,
  Heading2 as MdHeading2,
  Heading3 as MdHeading3,
  Heading4 as MdHeading4,
} from "@/components/MdComponents"
import MdLink from "@/components/MdLink"
// TODO: Import once intl implements?
// import PageMetadata from "@/components/PageMetadata"
import PostMergeBanner from "@/components/Banners/PostMergeBanner"
import TableOfContents from "@/components/TableOfContents"
import TutorialMetadata from "@/components/TutorialMetadata"
import { mdxTableComponents } from "@/components/Table"
import YouTube from "@/components/YouTube"

// Utils
import { EDIT_CONTENT_URL } from "@/lib/constants"
import { isLangRightToLeft } from "@/lib/utils/translations"
import type { MdPageContent, TutorialFrontmatter } from "@/lib/interfaces"

import type { ChildOnlyProp, Lang, TranslationKey } from "@/lib/types"

const ContentContainer = (props: Pick<BoxProps, "id" | "children">) => {
  const boxShadow = useToken("colors", "tableBoxShadow")
  const borderColor = useToken("colors", "primary.base")

  return (
    <Box
      as="article"
      maxW="1000px"
      minW={0}
      background="background.base"
      boxShadow={{ base: "none", lg: boxShadow }}
      m={{ base: "2.5rem 0rem", lg: "2rem 2rem 6rem" }}
      p={{ base: "3rem 2rem", lg: 16 }}
      borderRadius="4px"
      {...props}
      sx={{
        ".featured": {
          pl: "1rem",
          ml: "-1rem",
          borderLeft: `1px dotted ${borderColor}`,
        },
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

const ListItem = (props) => {
  return <chakra.li color="text300" {...props} />
}

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
  a: MdLink,
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  p: Paragraph,
  kbd: KBD,
  li: ListItem,
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
interface TutorialLayoutProps extends MdPageContent, ChildOnlyProp {
  frontmatter: TutorialFrontmatter
  timeToRead: number
}

export const TutorialLayout = ({
  children,
  frontmatter,
  tocItems,
  timeToRead,
}: TutorialLayoutProps) => {
  const { asPath: relativePath } = useRouter()
  const absoluteEditPath = `${EDIT_CONTENT_URL}${relativePath}`
  const borderColor = useToken("colors", "border")
  const isRightToLeft = isLangRightToLeft(frontmatter.lang as Lang)
  const postMergeBannerTranslationString =
    frontmatter.postMergeBannerTranslation as TranslationKey | null

  return (
    <>
      {!!frontmatter.showPostMergeBanner && (
        <PostMergeBanner
          translationString={postMergeBannerTranslationString!}
        />
      )}
      <Flex
        w="100%"
        borderBottom={`1px solid ${borderColor}`}
        dir={isRightToLeft ? "rtl" : "ltr"}
        m={{ base: "2rem 0rem", lg: "0 auto" }}
        p={{ base: "0", lg: "0 2rem 0 0" }}
        background={{ base: "background.base", lg: "ednBackground" }}
      >
        {/* TODO: Implement PageMetaData after intl */}
        {/* <PageMetadata
          title={frontmatter.title}
          description={frontmatter.description}
          canonicalUrl={frontmatter.sourceUrl}
        /> */}
        <ContentContainer>
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
          {frontmatter.lang !== "en" ? (
            <Text>Crowdin contributor</Text>
          ) : (
            // TODO: Implement CrowdinContributors after intl is implemented
            // <CrowdinContributors
            //   relativePath={relativePath}
            //   editPath={absoluteEditPath}
            //   //@ts-ignore
            //   langContributors={allCombinedTranslatorsJson.nodes}
            // />
            <Text>Github contributor</Text>
            // TODO: Implement GitHubContributors
            // <GitHubContributors
            //   relativePath={relativePath}
            //   editPath={absoluteEditPath}
            // />
          )}
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
