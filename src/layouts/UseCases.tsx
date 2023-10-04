import {
  Badge,
  Box,
  calc,
  chakra,
  Flex,
  Hide,
  Icon,
  ListItem,
  Show,
  Text,
  type BoxProps,
  type FlexProps,
  type HeadingProps,
  UnorderedList,
  useToken,
} from "@chakra-ui/react"
import { type ComponentProps } from "react"
import { MdExpandMore } from "react-icons/md"

import BannerNotification from "@/components/BannerNotification"
import ButtonDropdown, {
  List as ButtonDropdownList,
  type IProps as ButtonDropdownProps,
} from "@/components/ButtonDropdown"
import { Image } from "@/components/Image"
import { mdxTableComponents } from "@/components/Table"
import { ButtonLink } from "@/components/Buttons"
import Card from "@/components/Card"
import DocLink from "@/components/DocLink"
import Emoji from "@/components/Emoji"
import ExpandableCard from "@/components/ExpandableCard"
import FeedbackCard from "@/components/FeedbackCard"
import GlossaryTooltip from "@/components/Glossary/GlossaryTooltip"
import InfoBanner from "@/components/InfoBanner"
import { BaseLink } from "@/components/Link"
import MarkdownImage from "@/components/MarkdownImage"
import MdLink from "@/components/MdLink"
import MeetupList from "@/components/MeetupList"
import OldHeading from "@/components/OldHeading"
import QuizWidget from "@/components/Quiz/QuizWidget"
import RandomAppList from "@/components/RandomAppList"
import SectionNav from "@/components/SectionNav"
import TableOfContents from "@/components/TableOfContents"
import UpgradeStatus from "@/components/UpgradeStatus"
import UpgradeTableOfContents from "@/components/UpgradeTableOfContents"
import YouTube from "@/components/YouTube"
// TODO: Import once intl implemented?
// import PageMetadata from "@/components/PageMetadata"

import { getSummaryPoints } from "@/lib/utils/getSummaryPoints"
import { isLangRightToLeft } from "@/lib/utils/translations"
import type { ChildOnlyProp, Lang } from "@/lib/types"
import { PageContent } from "@/lib/interfaces"

const commonHeadingProps: HeadingProps = {
  fontWeight: 700,
  lineHeight: 1.4,
}

const Heading1 = (props: HeadingProps) => (
  <OldHeading as="h1" {...commonHeadingProps} fontSize="2.5rem" {...props} />
)

const Heading2 = (props: HeadingProps) => (
  <OldHeading
    as="h2"
    {...commonHeadingProps}
    fontSize="2rem"
    mt={16}
    {...props}
  />
)

const Heading3 = (props: HeadingProps) => (
  <OldHeading as="h3" {...commonHeadingProps} fontSize="2xl" {...props} />
)

const Heading4 = (props: HeadingProps) => (
  <OldHeading
    as="h4"
    {...commonHeadingProps}
    fontSize="xl"
    fontWeight={600}
    {...props}
  />
)

export const Divider = () => <Box my={16} w="10%" h={1} bgColor="primary.hover" />

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

// Note: you must pass components to MDXProvider in order to render them in markdown files
// https://www.gatsbyjs.com/plugins/gatsby-plugin-mdx/#mdxprovider
export const useCasesComponents = {
  a: MdLink,
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  img: MarkdownImage,
  li: chakra.li,
  p: Paragraph,
  pre: Pre,
  Badge,
  ButtonLink,
  Card,
  Divider,
  DocLink,
  Emoji,
  ExpandableCard,
  GlossaryTooltip,
  InfoBanner,
  MeetupList,
  QuizWidget,
  RandomAppList,
  SectionNav,
  UpgradeStatus,
  YouTube,
  ...mdxTableComponents,
}

const HeroContainer = (props: ChildOnlyProp) => (
  <Flex
    bg="cardGradient"
    boxShadow="inset 0px -1px 0px rgba(0, 0, 0, 0.1)"
    direction={{ base: "column-reverse", lg: "row" }}
    justify="end"
    minHeight={{ base: "800px", lg: "608px" }}
    maxHeight={{ base: "full", lg: "608px" }}
    width="full"
    position="relative"
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
      borderRadius={{ base: "none", lg: "base" }}
      boxShadow={{ lg: boxShadow }}
      flexDirection="column"
      maxWidth={{ base: "full", lg: "container.sm" }}
      zIndex="docked"
      p={8}
      position="absolute"
      top={{ base: "unset", lg: 24 }}
      left={{ base: 0, lg: 24 }}
      bottom={{ base: 0, lg: "unset" }}
      right={{ base: 0, lg: "unset" }}
      {...props}
    />
  )
}

export const Title = (props: ChildOnlyProp) => <Heading1 mt={4} {...props} />

export const Page = (props: FlexProps) => (
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

export const InfoColumn = (props: ChildOnlyProp) => (
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

export const InfoTitle = (props: ChildOnlyProp) => (
  <Heading2
    fontSize={{ base: "2.5rem", lg: "5xl" }}
    textAlign={{ base: "left", lg: "right" }}
    mt={0}
    {...props}
  />
)

export const StyledButtonDropdown = ({
  list,
  ...rest
}: FlexProps & Pick<ButtonDropdownProps, "list">) => (
  <Flex align="flex-end" justify="flex-end" mb={8} {...rest}>
    <ButtonDropdown list={list} w={{ base: "full", lg: "auto" }} minW="240px" />
  </Flex>
)

export const MobileButtonDropdown = (
  props: ComponentProps<typeof StyledButtonDropdown>
) => <StyledButtonDropdown mb={0} {...props} />

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

export const MobileButton = (props: ChildOnlyProp) => {
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

interface IProps extends PageContent, ChildOnlyProp {}
export const UseCasesLayout: React.FC<IProps> = ({
  children,
  frontmatter,
  slug,
  tocItems,
}) => {
  // TODO: Re-enable after i18n implemented
  // const { t } = useTranslation()
  const lgBp = useToken("breakpoints", "lg")

  const isRightToLeft = isLangRightToLeft(frontmatter.lang as Lang)
  const summaryPoints = getSummaryPoints(frontmatter)

  // TODO: Re-implement GitHub edit path
  // const { editContentUrl } = siteData.siteMetadata || {}
  // const { relativePath } = pageContext
  // const absoluteEditPath = `${editContentUrl}${relativePath}`

  // Assign hero styling, default to "defi"
  let useCase = "defi"
  if (slug.includes("dao") || slug.includes("identity")) {
    useCase = "dao"
  }
  if (slug.includes("nft")) {
    useCase = "nft"
  }

  const dropdownLinks: ButtonDropdownList = {
    text: "Ethereum use cases", // t("template-usecase-dropdown"),
    ariaLabel: "Use case dropdown menu", // t("template-usecase-dropdown-aria"),
    items: [
      {
        text: "Decentralized finance (DeFi)", // t("template-usecase-dropdown-defi"),
        to: "/defi/",
        matomo: {
          eventCategory: "use cases menu",
          eventAction: "click",
          eventName: "defi",
        },
      },
      {
        text: "Non-fungible tokens (NFTs)", // t("template-usecase-dropdown-nft"),
        to: "/nft/",
        matomo: {
          eventCategory: "use cases menu",
          eventAction: "click",
          eventName: "nft",
        },
      },
      {
        text: "Decentralized autonomous organisations (DAOs)", // t("template-usecase-dropdown-dao"),
        to: "/dao/",
        matomo: {
          eventCategory: "use cases menu",
          eventAction: "click",
          eventName: "dao",
        },
      },
      {
        text: "Decentralized social networks", // t("template-usecase-dropdown-social-networks"),
        to: "/social-networks/",
        matomo: {
          eventCategory: "use cases menu",
          eventAction: "click",
          eventName: "social-networks",
        },
      },
      {
        text: "Decentralized identity", // t("template-usecase-dropdown-identity"),
        to: "/decentralized-identity/",
        matomo: {
          eventCategory: "use cases menu",
          eventAction: "click",
          eventName: "decentralized-identity",
        },
      },
      {
        text: "Decentralized science (DeSci)", // t("template-usecase-dropdown-desci"),
        to: "/desci/",
        matomo: {
          eventCategory: "use cases menu",
          eventAction: "click",
          eventName: "desci",
        },
      },
      {
        text: "Regenerative finance (ReFi)", // t("template-usecase-dropdown-refi"),
        to: "/refi/",
        matomo: {
          eventCategory: "use cases menu",
          eventAction: "click",
          eventName: "refi",
        },
      },
    ],
  }

  return (
    <Box position="relative" width="full">
      <Show above={lgBp}>
        <BannerNotification shouldShow zIndex="sticky">
          <Emoji text=":pencil:" fontSize="2xl" mr={4} flexShrink={0} />
          <Text m={0}>
            Uses of Ethereum are always developing and evolving. Add any info
            you think will make things clearer or more up to date. Edit page
            {/* TODO: Re-enable after intl implemented */}
            {/* <Translation id="template-usecase-banner" />{" "}
            <InlineLink to={absoluteEditPath}>
              <Translation id="template-usecase-edit-link" />
            </InlineLink> */}
          </Text>
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
            <TableOfContents items={tocItems} maxDepth={2} isMobile />
          </Box>
        </TitleCard>
        <Image
          position="absolute"
          alignSelf={{ base: "center", lg: "normal" }}
          top={0}
          bottom={0}
          objectFit="cover"
          width={1000}
          height={610}
          src={frontmatter.image}
          alt={frontmatter.alt || ""}
          maxW={{
            base: useCase === "defi" ? "full" : "min(405px, 98%)",
            lg:
              (useCase === "dao" && "572px") ||
              (useCase === "defi" && "80%") ||
              "640px",
          }}
        />
      </HeroContainer>
      <Show above={lgBp}>
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
        <Show above={lgBp}>
          <InfoColumn>
            <StyledButtonDropdown list={dropdownLinks} />
            <InfoTitle>{frontmatter.title}</InfoTitle>

            {tocItems && (
              <UpgradeTableOfContents items={tocItems} maxDepth={2} />
            )}
          </InfoColumn>
        </Show>
        <ContentContainer id="content">
          {children}
          <FeedbackCard />
        </ContentContainer>
        <Hide above={lgBp}>
          <MobileButton>
            <MobileButtonDropdown list={dropdownLinks} />
          </MobileButton>
        </Hide>
      </Page>
    </Box>
  )
}
