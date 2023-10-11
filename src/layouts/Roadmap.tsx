import {
  Box,
  Flex,
  ListItem,
  Show,
  SimpleGrid,
  UnorderedList,
  Wrap,
  WrapItem,
} from "@chakra-ui/react"

import { Button, ButtonLink } from "@/components/Buttons"
import { Image } from "@/components/Image"
import { List as ButtonDropdownList } from "@/components/ButtonDropdown"
import { mdxTableComponents } from "@/components/Table"
import Breadcrumbs from "@/components/Breadcrumbs"
import Card from "@/components/Card"
import Emoji from "@/components/Emoji"
import ExpandableCard from "@/components/ExpandableCard"
import FeedbackCard from "@/components/FeedbackCard"
import GlossaryTooltip from "@/components/Glossary/GlossaryTooltip"
import InfoBanner from "@/components/InfoBanner"
import MdLink from "@/components/MdLink"
import OldText from "@/components/OldText"
import Pill from "@/components/Pill"
import RandomAppList from "@/components/RandomAppList"
import RoadmapActionCard from "@/components/Roadmap/RoadmapActionCard"
import RoadmapImageContent from "@/components/Roadmap/RoadmapImageContent"
import TableOfContents from "@/components/TableOfContents"
import UpgradeStatus from "@/components/UpgradeStatus"
import UpgradeTableOfContents from "@/components/UpgradeTableOfContents"
import YouTube from "@/components/YouTube"
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
} from "@/layouts/UseCases"

import { isLangRightToLeft } from "@/lib/utils/translations"
import type { ChildOnlyProp, Lang, TranslationKey } from "@/lib/types"
import type { PageContent } from "@/lib/interfaces"

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
  RoadmapActionCard,
  RoadmapImageContent,
  UpgradeStatus,
  YouTube,
  ...mdxTableComponents,
  // Contributors,
  // Logo,
  // MeetupList,
}

interface IProps extends PageContent, ChildOnlyProp {}
export const RoadmapLayout: React.FC<IProps> = ({ children, frontmatter, slug, tocItems }) => {
  const isRightToLeft = isLangRightToLeft(frontmatter.lang as Lang)

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
            {/* TODO: Double check this slug works */}
            <Breadcrumbs slug={slug} />{" "}
            <Title>{frontmatter.title}</Title>
            <OldText>{frontmatter.description}</OldText>
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
            style={{ objectFit: "contain" }}
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
