import { Box, Flex, Grid, Text, useToken } from "@chakra-ui/react"

import type { ChildOnlyProp } from "@/lib/types"
import type { MdPageContent, SharedFrontmatter } from "@/lib/interfaces"

import { List as ButtonDropdownList } from "@/components/ButtonDropdown"
import { ButtonLink } from "@/components/Buttons"
import Card from "@/components/Card"
import { ContentHero } from "@/components/Hero"
import { Image } from "@/components/Image"
import LeftNavBar from "@/components/LeftNavBar"
import {
  ContentContainer,
  MobileButton,
  MobileButtonDropdown,
  Page,
} from "@/components/MdComponents"
import { ApplyNow } from "@/components/Translatathon/ApplyNow"
import { CountdownBanner } from "@/components/Translatathon/CountdownBanner"
import { DatesAndTimeline } from "@/components/Translatathon/DatesAndTimeline"
import { LocalCommunitiesList } from "@/components/Translatathon/LocalCommunitiesList"
import { StepByStepInstructions } from "@/components/Translatathon/StepByStepInstructions"
import { TranslatathonCalendar } from "@/components/Translatathon/TranslatathonCalendar"
import { TranslatathonInANutshell } from "@/components/Translatathon/TranslatathonInANutshell"
import { TranslationHubCallout } from "@/components/Translatathon/TranslationHubCallout"

import WhyWeDoItImage from "@/public/images/translatathon/man-baby-woman.png"
import HowDoesItWorkImage from "@/public/images/translatathon/round-table.png"
import robotImage from "@/public/images/wallet.png"

const ContentSplit = ({ children }) => {
  return (
    <Flex w="full" direction={{ base: "column", md: "row" }}>
      <Box>{children}</Box>
      <Flex maxHeight="300px">
        <Image src={robotImage} alt="robot" style={{ objectFit: "contain" }} />
      </Flex>
    </Flex>
  )
}

const TwoColumnContent = (props: ChildOnlyProp) => (
  <Flex
    w="full"
    direction={{ base: "column", md: "row" }}
    align="stretch"
    me={{ lg: 8 }}
    mt={8}
    gap={8}
    {...props}
  />
)

const WhyWeDoItColumn = (props: ChildOnlyProp) => (
  <Flex
    w="full"
    m={{ base: "auto 0", lg: 0 }}
    me={{ lg: 8 }}
    direction="column"
  >
    <Box m="auto">
      <Image src={WhyWeDoItImage} alt="" height="272" />
    </Box>
    <Box>{props.children}</Box>
  </Flex>
)

const HowDoesItWorkColumn = (props: ChildOnlyProp) => (
  <Flex
    w="full"
    m={{ base: "auto 0", lg: 0 }}
    ms={{ lg: 8 }}
    direction="column"
  >
    <Box m="auto">
      <Image src={HowDoesItWorkImage} alt="" height="272" />
    </Box>
    <Box>{props.children}</Box>
  </Flex>
)

const CardContent = (props: ChildOnlyProp) => (
  <Flex
    w="full"
    m={{ base: "auto 0", lg: 0 }}
    borderRadius={4}
    border="1px solid"
    borderColor="body.light"
    direction="column"
    px={8}
    pb={8}
    flex="1"
  >
    {props.children}
  </Flex>
)

const CardContainer = (props: ChildOnlyProp) => (
  <Grid
    templateColumns="repeat(auto-fill, minmax(min(100%, 280px), 1fr))"
    gap={8}
    mb={20}
    mt={{ base: 8, lg: 0 }}
  >
    {props.children}
  </Grid>
)

const EmojiCard = ({ emoji, title, description }) => (
  <Card
    emoji={emoji}
    title={title}
    description={description}
    flex="1 1 30%"
    p={6}
  />
)

// Translatathon layout components
export const translatathonComponents = {
  // Export empty object if none needed
  ApplyNow,
  CardContainer,
  CardContent,
  ContentSplit,
  DatesAndTimeline,
  EmojiCard,
  HowDoesItWorkColumn,
  LocalCommunitiesList,
  StepByStepInstructions,
  TranslatathonCalendar,
  TranslationHubCallout,
  TranslatathonInANutshell,
  TwoColumnContent,
  WhyWeDoItColumn,
}

type TranslatathonLayoutProps = ChildOnlyProp &
  Pick<MdPageContent, "slug" | "tocItems"> & {
    frontmatter: SharedFrontmatter
  }

export const TranslatathonLayout = ({
  children,
  frontmatter,
  slug,
  tocItems,
}: TranslatathonLayoutProps) => {
  const lgBp = useToken("breakpoints", "lg")

  const dropdownLinks: ButtonDropdownList = {
    text: "Translatathon dropdown",
    ariaLabel: "Translatathon dropdown",
    items: [
      {
        text: "Translatathon",
        to: "/translatathon",
        matomo: {
          eventCategory: "translatathon menu",
          eventAction: "click",
          eventName: "translatathon hub",
        },
      },
      {
        text: "Details and submission criteria",
        to: "/translatathon/details",
        matomo: {
          eventCategory: "translatathon menu",
          eventAction: "click",
          eventName: "details and submission criteria",
        },
      },
      {
        text: "Terms and conditions",
        to: "/translatathon/terms-and-conditions",
        matomo: {
          eventCategory: "translatathon menu",
          eventAction: "click",
          eventName: "terms and conditions",
        },
      },
      // TODO: Add back in when this page is ready
      // {
      //   text: "Local communities",
      //   to: "/translatathon/local-communities",
      //   matomo: {
      //     eventCategory: "translatathon menu",
      //     eventAction: "click",
      //     eventName: "local communities",
      //   },
      // },
    ],
  }

  return (
    <Box position="relative" width="full" dir={"ltr"}>
      <CountdownBanner />
      <ContentHero
        breadcrumbs={{ slug, startDepth: 1 }}
        title={frontmatter.title}
        maxHeight={"400px"}
        description={
          <>
            <Text>Welcome to the ethereum.org Translatathon!</Text>
            <Text>
              The translatathon is a competitive hackathon-style event where you
              can compete for prizes by translating ethereum.org content into
              different languages.
            </Text>
            <Flex>
              <ButtonLink href="/">Apply to translate</ButtonLink>
            </Flex>
          </>
        }
        heroImg={"/images/heroes/translatathon-hero.png"}
        blurDataURL={""}
      />
      <Page>
        <LeftNavBar
          hideBelow={lgBp}
          dropdownLinks={dropdownLinks}
          tocItems={tocItems}
        />
        <ContentContainer id="content">{children}</ContentContainer>
        <MobileButton>
          <MobileButtonDropdown list={dropdownLinks} />
        </MobileButton>
      </Page>
    </Box>
  )
}
