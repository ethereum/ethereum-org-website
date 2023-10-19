// Libraries
import {
  Badge,
  Box,
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
import dynamic from 'next/dynamic'
 


// Components
import { ButtonLink } from "@/components/Buttons"
import CallToContribute from "@/components/CallToContribute"
import Card from "@/components/Card"
import Codeblock from "@/components/Codeblock"
// TODO: Implement CrowdinContributors after intl is implemented
// import CrowdinConbtirbutors from "@/components/FileContributorsCrowdin"
import Emoji from "@/components/Emoji"
import EnvWarningBanner from "@/components/EnvWarningBanner"
const FeedbackCard = dynamic(() => import("@/components/FeedbackCard"), { ssr: false })
import GitHubContributors from "@/components/FileContributorsGitHub"
import GlossaryTooltip from "@/components/Glossary/GlossaryTooltip"
import InfoBanner from "@/components/InfoBanner"
import MdLink from "@/components/MdLink"
import OldHeading from "@/components/OldHeading"
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

import type { ChildOnlyProp, Lang, TranslationKey } from "@/lib/types"

const ContentContainer = (props) => {
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

const H1 = (props: HeadingProps) => {
  const monospaceFont = useToken("fonts", "monospace")
  return (
    <OldHeading
      as="h1"
      fontWeight="bold"
      fontFamily={monospaceFont}
      textTransform="uppercase"
      fontSize={{ base: "1.75rem", lg: "2.5rem" }}
      lineHeight="1.4"
      _before={{
        content: '""',
        display: "block",
        h: "140px",
        mt: "-140px",
        visibility: "hidden",
      }}
      sx={{
        a: { display: "none" },
      }}
      {...props}
    />
  )
}

const H2 = (props: HeadingProps) => {
  const monospaceFont = useToken("fonts", "monospace")

  return (
    <OldHeading
      as="h2"
      fontFamily={monospaceFont}
      textTransform="uppercase"
      fontWeight="bold"
      fontSize={{ base: "2xl", md: "2rem" }}
      sx={{ position: "inherit !important" }}
      lineHeight="1.4"
      _before={{
        content: '""',
        display: "block",
        h: "120px",
        mt: "-120px",
        visibility: "hidden",
      }}
      {...props}
    />
  )
}

const H3 = (props: HeadingProps) => {
  return (
    <OldHeading
      as="h3"
      fontWeight={{ base: "semibold" }}
      fontSize={{ base: "1rem", md: "1.5rem" }}
      lineHeight="1.4"
      sx={{ position: "inherit !important" }}
      _before={{
        content: '""',
        display: "block",
        h: "120px",
        mt: "-120px",
        visibility: "hidden",
      }}
      {...props}
    />
  )
}

const H4 = (props: HeadingProps) => {
  return (
    <OldHeading
      as="h4"
      fontWeight={{ base: "semibold" }}
      fontSize={{ base: "1rem", md: "1.25rem" }}
      lineHeight="1.4"
      sx={{ position: "unset !important" }}
      _before={{
        content: '""',
        display: "block",
        h: "120px",
        mt: "-120px",
        visibility: "hidden",
      }}
      {...props}
    />
  )
}

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
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
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

export const TutorialLayout = ({
  children,
  frontmatter,
  tocItems
}) => {
  const { asPath: relativePath} = useRouter()
  const absoluteEditPath = `${EDIT_CONTENT_URL}${relativePath}`
  const borderColor = useToken("colors", "border")
  const isRightToLeft = isLangRightToLeft(frontmatter.lang as Lang)
  const postMergeBannerTranslationString = frontmatter
    .postMergeBannerTranslation as TranslationKey | null

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
          <H1>{frontmatter.title}</H1>
          <TutorialMetadata frontmatter={frontmatter} />
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
              // TODO: Implement CrowdinContributors after intl is implemented
              // <CrowdinContributors
              //   relativePath={relativePath}
              //   editPath={absoluteEditPath}
              //   //@ts-ignore
              //   langContributors={allCombinedTranslatorsJson.nodes}
              // />
            ) : (
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