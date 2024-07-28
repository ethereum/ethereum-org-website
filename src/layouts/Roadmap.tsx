import {
  Box,
  Center,
  Flex,
  type FlexProps,
  SimpleGrid,
  useToken,
  Wrap,
  WrapItem,
} from "@chakra-ui/react"

import type { ChildOnlyProp } from "@/lib/types"
import type { MdPageContent, RoadmapFrontmatter } from "@/lib/interfaces"

import Breadcrumbs from "@/components/Breadcrumbs"
import { List as ButtonDropdownList } from "@/components/ButtonDropdown"
import { Button, ButtonLink } from "@/components/Buttons"
import FeedbackCard from "@/components/FeedbackCard"
import HubHero from "@/components/Hero/HubHero"
import { Image } from "@/components/Image"
import LeftNavBar from "@/components/LeftNavBar"
import {
  ContentContainer,
  MobileButton,
  MobileButtonDropdown,
  Page,
  Title,
} from "@/components/MdComponents"
import OldText from "@/components/OldText"
import Pill from "@/components/Pill"
import RoadmapActionCard from "@/components/Roadmap/RoadmapActionCard"
import RoadmapImageContent from "@/components/Roadmap/RoadmapImageContent"
import TableOfContents from "@/components/TableOfContents"

import RoadmapHubHeroImage from "@/public/images/heroes/roadmap-hub-hero.jpg"

const CardGrid = (props: ChildOnlyProp) => (
  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} {...props} />
)

type HeroContainerProps = Pick<FlexProps, "children" | "dir">

const HeroContainer = (props: HeroContainerProps) => (
  <Flex
    flexDirection={{ base: "column", lg: "row" }}
    align="center"
    bg="layer2Gradient"
    py={12}
    px={{ base: 0, lg: 8 }}
    mb={{ base: 8, lg: 0 }}
    maxH={{ base: "100%", lg: "none" }}
    {...props}
    justify="space-between"
  />
)

const TitleCard = (props: ChildOnlyProp) => (
  <Flex w="full" p={8} direction="column" justify="flex-start" {...props} />
)

// Roadmap layout components
export const roadmapComponents = {
  CardGrid,
  Pill,
  RoadmapActionCard,
  RoadmapImageContent,
}

type RoadmapLayoutProps = ChildOnlyProp &
  Pick<MdPageContent, "slug" | "tocItems" | "contentNotTranslated"> & {
    frontmatter: RoadmapFrontmatter
  }
export const RoadmapLayout = ({
  children,
  frontmatter,
  slug,
  tocItems,
  contentNotTranslated,
}: RoadmapLayoutProps) => {
  // TODO: Replace with direct token implementation after UI migration is completed
  const lgBp = useToken("breakpoints", "lg")

  const dropdownLinks: ButtonDropdownList = {
    text: "nav-roadmap-options",
    ariaLabel: "nav-roadmap-options-alt",
    items: [
      {
        text: "nav-roadmap-home",
        href: "/roadmap/",
        matomo: {
          eventCategory: `Roadmap dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked roadmap home",
        },
      },
      {
        text: "nav-roadmap-security",
        href: "/roadmap/security",
        matomo: {
          eventCategory: `Roadmap security dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked roadmap security",
        },
      },
      {
        text: "nav-roadmap-scaling",
        href: "/roadmap/scaling",
        matomo: {
          eventCategory: `Roadmap scaling dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked roadmap scaling home",
        },
      },
      {
        text: "nav-roadmap-user-experience",
        href: "/roadmap/user-experience/",
        matomo: {
          eventCategory: `Roadmap user experience dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked roadmap user experience home",
        },
      },
      {
        text: "nav-roadmap-future-proofing",
        href: "/roadmap/future-proofing",
        matomo: {
          eventCategory: `Roadmap future-proofing dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked roadmap future-proofing home",
        },
      },
    ],
  }

  return (
    <Box position="relative" dir={contentNotTranslated ? "ltr" : "unset"}>
      {slug === "/roadmap/" ? (
        <HubHero
          heroImg={RoadmapHubHeroImage}
          header={frontmatter.title}
          title={""}
          description={frontmatter.description}
        />
      ) : (
        <HeroContainer>
          <TitleCard>
            {/* TODO: Double check this slug works */}
            <Breadcrumbs slug={slug} mb="8" />
            <Title>{frontmatter.title}</Title>
            <OldText>{frontmatter.description}</OldText>
            {frontmatter?.buttons && (
              <Wrap spacing={2} marginBottom={4} sx={{ ul: { m: 0 } }}>
                {frontmatter.buttons.map((button, idx) => {
                  if (button?.href) {
                    return (
                      <WrapItem key={idx}>
                        <ButtonLink
                          variant={button?.variant}
                          href={button?.href}
                        >
                          {button.label}
                        </ButtonLink>
                      </WrapItem>
                    )
                  }
                  return (
                    <WrapItem key={idx}>
                      <Button variant={button?.variant} toId={button?.toId}>
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
          <Center>
            <Image
              src={frontmatter.image}
              blurDataURL={frontmatter.blurDataURL}
              alt={frontmatter.alt ?? ""}
              style={{ objectFit: "contain" }}
              width={1504}
              height={336}
              // TODO: adjust value when the old theme breakpoints are removed (src/theme.ts)
              sizes="(max-width: 992px) 100vw, 720px"
              priority
            />
          </Center>
        </HeroContainer>
      )}
      <Page>
        {/* TODO: Switch to `above="lg"` after completion of Chakra Migration */}
        <LeftNavBar
          hideBelow={lgBp}
          dropdownLinks={dropdownLinks}
          maxDepth={frontmatter.sidebarDepth!}
          tocItems={tocItems}
        />
        <ContentContainer>
          {children}
          <FeedbackCard />
        </ContentContainer>
        <MobileButton>
          <MobileButtonDropdown list={dropdownLinks} />
        </MobileButton>
      </Page>
    </Box>
  )
}
