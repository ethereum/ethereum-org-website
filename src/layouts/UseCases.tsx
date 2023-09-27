import {
  Badge,
  Box,
  calc,
  chakra,
  Flex,
  type FlexProps,
  Heading,
  type HeadingProps,
  Icon,
  ListItem,
  Show,
  Text,
  UnorderedList,
  useToken,
  type BoxProps,
  Hide,
} from "@chakra-ui/react"
// import { type ComponentProps } from "react"
import { MdExpandMore } from "react-icons/md"

import BannerNotification from "@/components/BannerNotification"
// import ButtonDropdown, {
//   type IProps as ButtonDropdownProps,
//   List as ButtonDropdownList,
// } from "@/components/ButtonDropdown"
import ButtonLink from "@/components/ButtonLink"
import Card from "@/components/Card"
// import Contributors from "@/components/Contributors"
import DocLink from "@/components/DocLink"
import Emoji from "@/components/Emoji"
import ExpandableCard from "@/components/ExpandableCard"
import FeedbackCard from "@/components/FeedbackCard"
// import GlossaryTooltip from "@/components/Glossary/GlossaryTooltip"
import { Image } from "@/components/Image"
import InfoBanner from "@/components/InfoBanner"
import { /* InlineLink, */ BaseLink } from "@/components/Link"
import Link from "@/components/Link"
// import Logo from "@/components/Logo"
// import MdLink from "@/components/MdLink"
import MeetupList from "@/components/MeetupList"
// import PageMetadata from "@/components/PageMetadata"
// import QuizWidget from "@/components/Quiz/QuizWidget"
import RandomAppList from "@/components/RandomAppList"
import SectionNav from "@/components/SectionNav"
import { mdxTableComponents } from "@/components/Table"
import UpgradeStatus from "@/components/UpgradeStatus"
import YouTube from "@/components/YouTube"

import { getSummaryPoints } from "@/lib/utils/getSummaryPoints"
import { isLangRightToLeft } from "@/lib/utils/translations"
import type { ChildOnlyProp, Lang } from "@/lib/types"

const commonHeadingProps: HeadingProps = {
  fontWeight: 700,
  lineHeight: 1.4,
}

const Heading1 = (props: HeadingProps) => (
  <Heading as="h1" {...commonHeadingProps} fontSize="2.5rem" {...props} />
)

const Heading2 = (props: HeadingProps) => (
  <Heading as="h2" {...commonHeadingProps} fontSize="2rem" mt={16} {...props} />
)

const Heading3 = (props: HeadingProps) => (
  <Heading as="h3" {...commonHeadingProps} fontSize="2xl" {...props} />
)

const Heading4 = (props: HeadingProps) => (
  <Heading
    as="h4"
    {...commonHeadingProps}
    fontSize="xl"
    fontWeight={600}
    {...props}
  />
)

const Divider = () => (
  <Box my={16} w="10%" h={1} bgColor="primary.hover" />
)

const Pre = (props: ChildOnlyProp) => (
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

const Paragraph = (props: ChildOnlyProp) => (
  <Text color="text300" mt={8} mb={4} {...props} />
)

// Note: you must pass components to MDXProvider in order to render them in markdown files
// https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/#mdxprovider
export const useCasesComponents = {
  // a: MdLink,
  a: Link,
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  p: Paragraph,
  li: chakra.li,
  pre: Pre,
  ...mdxTableComponents,
  MeetupList,
  RandomAppList,
  // Logo,
  ButtonLink,
  // Contributors,
  InfoBanner,
  Card,
  Divider,
  SectionNav,
  Badge,
  Emoji,
  UpgradeStatus,
  DocLink,
  ExpandableCard,
  YouTube,
  // QuizWidget,
  // GlossaryTooltip,
}

const HeroContainer = (props: ChildOnlyProp) => (
  <Flex
    bg="cardGradient"
    boxShadow="inset 0px -1px 0px rgba(0, 0, 0, 0.1)"
    flexDirection={{ base: "column-reverse", lg: "row" }}
    justifyContent="flex-end"
    minHeight="608px"
    maxHeight={{ base: "full", lg: "608px" }}
    width="full"
    {...props}
  />
)

const TitleCard = (props: ChildOnlyProp) => {
  const boxShadow = useToken("colors", "cardBoxShadow")

  return (
    <Flex
      bg={{ base: "ednBackground", lg: "background.base" }}
      border="1px"
      borderColor="border"
      borderRadius="base"
      boxShadow={{ lg: boxShadow }}
      flexDirection="column"
      maxWidth={{ base: "full", lg: "container.sm" }}
      mt={{ base: 0, lg: 12 }}
      zIndex="docked"
      p={8}
      position={{ base: "relative", lg: "absolute" }}
      top={{ lg: 24 }}
      left={{ lg: 24 }}
      {...props}
    />
  )
}

const Title = (props: ChildOnlyProp) => <Heading1 mt={4} {...props} />

// const HeroImage = (props) => (
//   <Image
//     alignSelf={{
//       base: "center",
//       lg: "normal",
//     }}
//     backgroundSize="cover"
//     flex="1 1 100%"
//     right={0}
//     bottom={0}
//     width="full"
//     overflow="initial"
//     maxH={{
//       base: "340px",
//       lg: "full",
//     }}
//     {...props}
//   />
// )

const Page = (props: FlexProps) => (
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

const InfoColumn = (props: ChildOnlyProp) => (
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

const InfoTitle = (props: ChildOnlyProp) => (
  <Heading2
    fontSize={{ base: "2.5rem", lg: "5xl" }}
    textAlign={{ base: "left", lg: "right" }}
    mt={0}
    {...props}
  />
)

// const StyledButtonDropdown = ({
//   list,
//   ...rest
// }: FlexProps & Pick<ButtonDropdownProps, "list">) => (
//   <Flex align="flex-end" justify="flex-end" mb={8} {...rest}>
//     <ButtonDropdown list={list} w={{ base: "full", lg: "auto" }} minW="240px" />
//   </Flex>
// )

// const MobileButtonDropdown = (
//   props: ComponentProps<typeof StyledButtonDropdown>
// ) => <StyledButtonDropdown mb={0} {...props} />

const ContentContainer = (props: Pick<BoxProps, "id" | "children">) => {
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

const MobileButton = (props: ChildOnlyProp) => {
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

export const UseCasesLayout = ({ children, frontmatter, slug }) => {
  if (/* !siteData ||  */ !frontmatter)
    throw new Error(
      "UseCases page template query does not return expected values"
    )
  if (!frontmatter?.title)
    throw new Error("Required `title` property missing for use-cases template")

  const isRightToLeft = isLangRightToLeft(frontmatter.lang as Lang)
  // const tocItems = mdx.tableOfContents?.items as ItemTableOfContents[]
  const summaryPoints = getSummaryPoints(frontmatter)

  // const { editContentUrl } = siteData.siteMetadata || {}
  // const { relativePath } = pageContext
  // const absoluteEditPath = `${editContentUrl}${relativePath}`

  /* Assign hero styling, default to "defi" */
  let useCase = "defi"
  if (slug.includes("dao") || slug.includes("identity")) {
    useCase = "dao"
  }
  if (slug.includes("nft")) {
    useCase = "nft"
  }

  // const dropdownLinks: ButtonDropdownList = {
  //   text: "Ethereum use cases", // t("template-usecase-dropdown"),
  //   ariaLabel: "Use case dropdown menu", // t("template-usecase-dropdown-aria"),
  //   items: [
  //     {
  //       text: "Decentralized finance (DeFi)", // t("template-usecase-dropdown-defi"),
  //       to: "/defi/",
  //       matomo: {
  //         eventCategory: "use cases menu",
  //         eventAction: "click",
  //         eventName: "defi",
  //       },
  //     },
  //     {
  //       text: "Non-fungible tokens (NFTs)", // t("template-usecase-dropdown-nft"),
  //       to: "/nft/",
  //       matomo: {
  //         eventCategory: "use cases menu",
  //         eventAction: "click",
  //         eventName: "nft",
  //       },
  //     },
  //     {
  //       text: "Decentralized autonomous organisations (DAOs)", // t("template-usecase-dropdown-dao"),
  //       to: "/dao/",
  //       matomo: {
  //         eventCategory: "use cases menu",
  //         eventAction: "click",
  //         eventName: "dao",
  //       },
  //     },
  //     {
  //       text: "Decentralized social networks", // t("template-usecase-dropdown-social-networks"),
  //       to: "/social-networks/",
  //       matomo: {
  //         eventCategory: "use cases menu",
  //         eventAction: "click",
  //         eventName: "social-networks",
  //       },
  //     },
  //     {
  //       text: "Decentralized identity", // t("template-usecase-dropdown-identity"),
  //       to: "/decentralized-identity/",
  //       matomo: {
  //         eventCategory: "use cases menu",
  //         eventAction: "click",
  //         eventName: "decentralized-identity",
  //       },
  //     },
  //     {
  //       text: "Decentralized science (DeSci)", // t("template-usecase-dropdown-desci"),
  //       to: "/desci/",
  //       matomo: {
  //         eventCategory: "use cases menu",
  //         eventAction: "click",
  //         eventName: "desci",
  //       },
  //     },
  //     {
  //       text: "Regenerative finance (ReFi)", // t("template-usecase-dropdown-refi"),
  //       to: "/refi/",
  //       matomo: {
  //         eventCategory: "use cases menu",
  //         eventAction: "click",
  //         eventName: "refi",
  //       },
  //     },
  //   ],
  // }

  return (
    <Box position="relative" width="full">
      <Show above="lg">
        <BannerNotification shouldShow>
          <Emoji text=":pencil:" fontSize="2xl" mr={4} flexShrink={0} />
          <aside>
            Uses of Ethereum are always developing and evolving. Add any info
            you think will make things clearer or more up to date.
            {/* <Translation id="template-usecase-banner" />{" "} */}
            {/* <InlineLink to={absoluteEditPath}>
              <Translation id="template-usecase-edit-link" />
            </InlineLink> */}
          </aside>
        </BannerNotification>
      </Show>
      <HeroContainer>
        <TitleCard>
          <Emoji fontSize="4rem" text={frontmatter.emoji!} />
          <Title>{frontmatter.title}</Title>
          <Box>
            <UnorderedList ms="1.45rem">
              {summaryPoints.map((point, idx) => (
                <ListItem key={idx} color="text300" mb={0}>
                  {point}
                </ListItem>
              ))}
            </UnorderedList>
            {/* <TableOfContents
              items={tocItems}
              maxDepth={frontmatter.sidebarDepth!}
              isMobile
            /> */}
          </Box>
        </TitleCard>
        {/* <HeroImage
          image={getImage(frontmatter.image)!}
          alt={frontmatter.alt || ""}
          maxW={{
            base: useCase === "defi" ? "full" : "min(405px, 98%)",
            lg:
              (useCase === "dao" && "572px") ||
              (useCase === "defi" && "80%") ||
              "640px",
          }}
        /> */}
      </HeroContainer>
      <Show above="lg">
        <Flex
          as={BaseLink}
          to="#content"
          bg="ednBackground"
          justifyContent="center"
          p={4}
          width="full"
          _hover={{
            bg: "background.base",
          }}
        >
          <Icon as={MdExpandMore} fontSize="2xl" color="secondary" />
        </Flex>
      </Show>
      <Page dir={isRightToLeft ? "rtl" : "ltr"}>
        {/* <PageMetadata
          title={frontmatter.title}
          description={frontmatter.description}
        /> */}
        <Show above="lg">
          <InfoColumn>
            {/* <StyledButtonDropdown list={dropdownLinks} /> */}
            <InfoTitle>{frontmatter.title}</InfoTitle>

            {/* {tocItems && (
              <UpgradeTableOfContents
                items={tocItems}
                maxDepth={frontmatter.sidebarDepth!}
              />
            )} */}
          </InfoColumn>
        </Show>
        <ContentContainer id="content">
          {children}
          <FeedbackCard />
        </ContentContainer>
        <Hide above="lg">
          <MobileButton>
            {/* <MobileButtonDropdown list={dropdownLinks} /> */}
          </MobileButton>
        </Hide>
      </Page>
    </Box>
  )
}
