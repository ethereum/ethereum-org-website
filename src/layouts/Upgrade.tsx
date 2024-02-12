import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { MdExpandMore } from "react-icons/md"
import {
  Box,
  type BoxProps,
  Flex,
  type FlexProps,
  Icon,
  List,
  ListItem,
  Text,
  useToken,
} from "@chakra-ui/react"

import type { ChildOnlyProp, Lang } from "@/lib/types"
import type { MdPageContent, UpgradeFrontmatter } from "@/lib/interfaces"

import BeaconChainActions from "@/components/BeaconChainActions"
import Breadcrumbs from "@/components/Breadcrumbs"
import type { List as ButtonDropdownList } from "@/components/ButtonDropdown"
import FeedbackCard from "@/components/FeedbackCard"
import { Image } from "@/components/Image"
import LeftNavBar from "@/components/LeftNavBar"
import { BaseLink } from "@/components/Link"
import {
  ContentContainer,
  MobileButton,
  MobileButtonDropdown,
  Page as MdPage,
} from "@/components/MdComponents"
import MergeArticleList from "@/components/MergeArticleList"
import MergeInfographic from "@/components/MergeInfographic"
import OldHeading from "@/components/OldHeading"
import UpgradeStatus from "@/components/UpgradeStatus"

import { getSummaryPoints } from "@/lib/utils/getSummaryPoints"
import { getLocaleTimestamp } from "@/lib/utils/time"

import { MAIN_CONTENT_ID } from "@/lib/constants"

const Page = (props: FlexProps) => <MdPage sx={{}} {...props} />

const Title = (props: ChildOnlyProp) => (
  <OldHeading
    as="h1"
    fontSize="2.5rem"
    fontWeight="bold"
    lineHeight={1.4}
    mt={0}
    {...props}
  />
)

const SummaryPoint = (props: ChildOnlyProp) => (
  <ListItem color="text300" mb={0} {...props} />
)

type ContainerProps = Pick<BoxProps, "children" | "dir">

const Container = (props: ContainerProps) => (
  <Box position="relative" {...props} />
)

const HeroContainer = (props: ChildOnlyProp) => (
  <Flex
    justify="flex-end"
    direction={{ base: "column-reverse", lg: "row" }}
    bg="cardGradient"
    boxShadow="inset 0px -1px 0px rgba(0, 0, 0, 0.1)"
    minH="608px"
    maxH={{ base: "full", lg: "608px" }}
    w="full"
    {...props}
  />
)

const MoreContent = (props: ChildOnlyProp & { to: string }) => (
  <Flex
    hideBelow="lg"
    as={BaseLink}
    bg="ednBackground"
    justify="center"
    p={4}
    w="full"
    _hover={{
      bg: "background.base",
    }}
    {...props}
  />
)

const TitleCard = (props: ChildOnlyProp) => {
  const cardBoxShadow = useToken("colors", "cardBoxShadow")

  return (
    <Flex
      direction="column"
      justify="flex-start"
      position={{ base: "relative", lg: "absolute" }}
      bg={{ base: "ednBackground", lg: "background.base" }}
      border="1px"
      borderColor="border"
      borderRadius="sm"
      boxShadow={{ lg: cardBoxShadow }}
      maxW={{ base: "full", lg: "640px" }}
      p={8}
      top={{ lg: 24 }}
      insetInlineStart={{ lg: 24 }}
      zIndex={10}
      {...props}
    />
  )
}

const LastUpdated = (props: ChildOnlyProp) => (
  <Text
    color="text200"
    fontStyle="italic"
    pt={4}
    mb={0}
    borderTop="1px"
    borderColor="border"
    {...props}
  />
)

// Upgrade layout components
export const upgradeComponents = {
  MergeArticleList,
  MergeInfographic,
  UpgradeStatus,
  BeaconChainActions,
}

type UpgradeLayoutProps = ChildOnlyProp &
  Pick<
    MdPageContent,
    "slug" | "tocItems" | "lastUpdatedDate" | "contentNotTranslated"
  > & {
    frontmatter: UpgradeFrontmatter
  }
export const UpgradeLayout = ({
  children,
  frontmatter,
  slug,
  tocItems,
  lastUpdatedDate,
  contentNotTranslated,
}: UpgradeLayoutProps) => {
  const { t } = useTranslation("page-upgrades")
  const { locale } = useRouter()

  const summaryPoints = getSummaryPoints(frontmatter)

  const dropdownLinks: ButtonDropdownList = {
    text: t("page-upgrades-upgrades-guide"),
    ariaLabel: t("page-upgrades-upgrades-aria-label"),
    items: [
      {
        text: t("page-upgrades-upgrades-beacon-chain"),
        to: "/roadmap/beacon-chain/",
        matomo: {
          eventCategory: "upgrade menu",
          eventAction: "click",
          eventName: "/roadmap/beacon-chain/",
        },
      },
      {
        text: t("page-upgrades-upgrades-docking"),
        to: "/roadmap/merge/",
        matomo: {
          eventCategory: "upgrade menu",
          eventAction: "click",
          eventName: "/roadmap/merge/",
        },
      },
    ],
  }

  const lgBreakpoint = useToken("breakpoints", "lg")

  return (
    <Container dir={contentNotTranslated ? "ltr" : "unset"}>
      <HeroContainer>
        <TitleCard>
          <Breadcrumbs slug={slug} startDepth={1} mt={2} mb="8" />
          <Title>{frontmatter.title}</Title>
          <Box>
            <List listStyleType="disc">
              {summaryPoints.map((point, idx) => (
                <SummaryPoint key={idx}>{point}</SummaryPoint>
              ))}
            </List>
          </Box>
          <LastUpdated>
            {t("common:page-last-updated")}:{" "}
            {getLocaleTimestamp(locale as Lang, lastUpdatedDate!)}
          </LastUpdated>
        </TitleCard>
        {frontmatter.image && (
          <Image
            src={frontmatter.image}
            blurDataURL={frontmatter.blurDataURL}
            alt={frontmatter.alt}
            width={816}
            height={525}
            style={{ objectFit: "cover" }}
            priority
            flex={{ base: "1 1 100%", md: "none" }}
            alignSelf={{ base: "center", md: "flex-end" }}
          />
        )}
      </HeroContainer>
      <MoreContent to={"#" + MAIN_CONTENT_ID}>
        <Icon as={MdExpandMore} fontSize="2xl" color="secondary" />
      </MoreContent>
      <Page>
        {/* TODO: Switch to `above="lg"` after completion of Chakra Migration */}
        <LeftNavBar
          hideBelow={lgBreakpoint}
          dropdownLinks={dropdownLinks}
          tocItems={tocItems}
          maxDepth={frontmatter.sidebarDepth!}
        />
        <ContentContainer>
          {children}
          <FeedbackCard />
        </ContentContainer>
        <MobileButton>
          <MobileButtonDropdown list={dropdownLinks} />
        </MobileButton>
      </Page>
    </Container>
  )
}
