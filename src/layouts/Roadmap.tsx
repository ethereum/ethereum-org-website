import ButtonDropdown, {
  List as ButtonDropdownList,
  type IProps as ButtonDropdownProps,
} from "@/components/ButtonDropdown"

import { ChildOnlyProp, Lang, TranslationKey } from "@/lib/types"
import { isLangRightToLeft } from "@/lib/utils/translations"
import {
  Box,
  Flex,
  ImageProps,
  ListItem,
  Show,
  SimpleGrid,
  Text,
  UnorderedList,
  Wrap,
  WrapItem,
} from "@chakra-ui/react"

import {
  Page,
  InfoColumn,
  ContentContainer,
  InfoTitle,
  MobileButton,
  Heading1,
  Heading2,
  Heading3,
  Pre,
  StyledButtonDropdown,
  MobileButtonDropdown,
  Title,
  Divider,
  Paragraph,
} from "./UseCases"
import MdLink from "@/components/MdLink"
import { mdxTableComponents } from "@/components/Table"
import RandomAppList from "@/components/RandomAppList"
import ButtonLink from "@/components/ButtonLink"
import YouTube from "@/components/YouTube"
import GlossaryTooltip from "@/components/Glossary/GlossaryTooltip"
import ExpandableCard from "@/components/ExpandableCard"
import UpgradeStatus from "@/components/UpgradeStatus"
import Emoji from "@/components/Emoji"
import Pill from "@/components/Pill"
import SectionNav from "@/components/SectionNav"
import Card from "@/components/Card"
import { Image } from "@/components/Image"
import InfoBanner from "@/components/InfoBanner"
import Breadcrumbs from "@/components/Breadcrumbs"
import Button from "@/components/Button"
import TableOfContents from "@/components/TableOfContents"
import UpgradeTableOfContents from "@/components/UpgradeTableOfContents"
import FeedbackCard from "@/components/FeedbackCard"

const CardGrid = (props: ChildOnlyProp) => (
  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} {...props} />
)

const HeroContainer = (props: ChildOnlyProp) => (
  <Flex
    flexDirection={{ base: "column", lg: "row" }}
    align="center"
    bg="layer2Gradient"
    py={12}
    px={{ base: 0, lg: 8 }}
    mb={{ base: 8, lg: 0 }}
    maxH={{ base: "100%", lg: "none" }}
    {...props}
  />
)

const TitleCard = (props: ChildOnlyProp) => (
  <Flex w="full" p={8} direction="column" justify="flex-start" {...props} />
)

export const roadmapComponents = {
  a: MdLink,
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  li: ListItem,
  p: Paragraph,
  pre: Pre,
  ul: UnorderedList,
  ButtonLink,
  Card,
  CardGrid,
  Divider,
  Emoji,
  ExpandableCard,
  GlossaryTooltip,
  InfoBanner,
  Pill,
  RandomAppList,
  SectionNav,
  UpgradeStatus,
  YouTube,
  ...mdxTableComponents,
  // Contributors,
  // Logo,
  // MeetupList,
  // RoadmapActionCard,
  // RoadmapImageContent,
}

export const RoadmapLayout = ({ children, frontmatter, slug, tocItems }) => {
  if (!frontmatter)
    throw new Error(
      "Staking page template query does not return expected values"
    )
  if (!frontmatter?.title)
    throw new Error("Required `title` property missing for staking layout")

  const isRightToLeft = isLangRightToLeft(frontmatter.lang as Lang)
  // const tocItems = mdx.tableOfContents?.items as Array<ItemTableOfContents>

  const dropdownLinks: ButtonDropdownList = {
    text: "Roadmap Options" as TranslationKey,
    ariaLabel: "Roadmap options dropdown menu",
    items: [
      {
        text: "Roadmap home" as TranslationKey,
        to: "/roadmap/",
        matomo: {
          eventCategory: `Roadmap dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked roadmap home",
        },
      },
      {
        text: "Better security" as TranslationKey,
        to: "/roadmap/security",
        matomo: {
          eventCategory: `Roadmap security dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked roadmap security",
        },
      },
      {
        text: "Scaling" as TranslationKey,
        to: "/roadmap/scaling",
        matomo: {
          eventCategory: `Roadmap scaling dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked roadmap scaling home",
        },
      },
      {
        text: "Better user experience" as TranslationKey,
        to: "/roadmap/user-experience/",
        matomo: {
          eventCategory: `Roadmap user experience dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked roadmap user experience home",
        },
      },
      {
        text: "Future-proofing" as TranslationKey,
        to: "/roadmap/future-proofing",
        matomo: {
          eventCategory: `Roadmap future-proofing dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked roadmap future-proofing home",
        },
      },
    ],
  }

  return (
    <Box position="relative" overflowX="hidden">
      <HeroContainer>
        <Flex w="100%" flexDirection={{ base: "column", md: "row" }}>
          <TitleCard>
            <Breadcrumbs slug={slug} />{" "}
            {/* TODO: Double check this slug works */}
            <Title>{frontmatter.title}</Title>
            <Text>{frontmatter.description}</Text>
            {frontmatter?.buttons && (
              // FIXME: remove the `ul` override once removed the corresponding
              // global styles in `src/@chakra-ui/gatsby-plugin/styles.ts`
              <Wrap spacing={2} marginBottom={4} sx={{ ul: { m: 0 } }}>
                {frontmatter.buttons.map((button, idx) => {
                  if (button?.to) {
                    return (
                      <WrapItem>
                        <ButtonLink
                          key={idx}
                          variant={button?.variant}
                          to={button?.to}
                        >
                          {button.label}
                        </ButtonLink>
                      </WrapItem>
                    )
                  }
                  return (
                    <WrapItem>
                      <Button
                        key={idx}
                        variant={button?.variant}
                        toId={button?.toId}
                      >
                        {button?.label}
                      </Button>
                    </WrapItem>
                  )
                })}
              </Wrap>
            )}
            <TableOfContents
              position="relative"
              zIndex="2"
              items={tocItems}
              isMobile
            />
          </TitleCard>
          <Image
            src={frontmatter.image}
            alt={frontmatter.alt || ""}
            objectFit="contain"
            alignSelf={{
              base: "center",
              lg: "normal",
            }}
            bgRepeat="no-repeat"
            flex="1 1 100%"
            right={0}
            bottom={0}
            width={600}
            height={336}
            overflow="initial"
            maxW={{
              base: "538px",
              lg: "full",
            }}
          />
        </Flex>
      </HeroContainer>
      <Page dir={isRightToLeft ? "rtl" : "ltr"}>
        {/* <PageMetadata
          title={frontmatter.title}
          description={frontmatter.description}
        /> */}
        <Show above="lg">
          <InfoColumn>
            <StyledButtonDropdown list={dropdownLinks} />
            <InfoTitle>{frontmatter.title}</InfoTitle>

            {tocItems && (
              <UpgradeTableOfContents
                items={tocItems}
                maxDepth={frontmatter.sidebarDepth!}
              />
            )}
          </InfoColumn>
        </Show>
        <ContentContainer id="content">
          {children}
          <FeedbackCard />
        </ContentContainer>
        <Show below="lg">
          <MobileButton>
            <MobileButtonDropdown list={dropdownLinks} />
          </MobileButton>
        </Show>
      </Page>
    </Box>
  )
}
