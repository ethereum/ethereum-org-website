import { useTranslation } from "next-i18next"
import {
  Box,
  type BoxProps,
  type FlexProps,
  List,
  ListItem,
  Text,
  useToken,
} from "@chakra-ui/react"

import type { ChildOnlyProp } from "@/lib/types"
import type { MdPageContent, UpgradeFrontmatter } from "@/lib/interfaces"

import BeaconChainActions from "@/components/BeaconChainActions"
import type { List as ButtonDropdownList } from "@/components/ButtonDropdown"
import FeedbackCard from "@/components/FeedbackCard"
import { ContentHero } from "@/components/Hero"
import LeftNavBar from "@/components/LeftNavBar"
import {
  ContentContainer,
  MobileButton,
  MobileButtonDropdown,
  Page as MdPage,
} from "@/components/MdComponents"
import MergeArticleList from "@/components/MergeArticleList"
import MergeInfographic from "@/components/MergeInfographic"
import UpgradeStatus from "@/components/UpgradeStatus"

import { getSummaryPoints } from "@/lib/utils/getSummaryPoints"

const Page = (props: FlexProps) => <MdPage sx={{}} {...props} />

type ContainerProps = Pick<BoxProps, "children" | "dir">

const Container = (props: ContainerProps) => (
  <Box position="relative" {...props} />
)

const LastUpdated = (props: ChildOnlyProp) => (
  <Text
    color="text200"
    fontStyle="italic"
    pt={4}
    mb={0}
    borderTop="1px"
    borderColor="body.dark"
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
    "slug" | "tocItems" | "lastEditLocaleTimestamp" | "contentNotTranslated"
  > & {
    frontmatter: UpgradeFrontmatter
  }
export const UpgradeLayout = ({
  children,
  frontmatter,
  slug,
  tocItems,
  lastEditLocaleTimestamp,
  contentNotTranslated,
}: UpgradeLayoutProps) => {
  const { t } = useTranslation("page-upgrades")

  const summaryPoints = getSummaryPoints(frontmatter)

  const dropdownLinks: ButtonDropdownList = {
    text: t("page-upgrades-upgrades-guide"),
    ariaLabel: t("page-upgrades-upgrades-aria-label"),
    items: [
      {
        text: t("page-upgrades-upgrades-beacon-chain"),
        href: "/roadmap/beacon-chain/",
        matomo: {
          eventCategory: "upgrade menu",
          eventAction: "click",
          eventName: "/roadmap/beacon-chain/",
        },
      },
      {
        text: t("page-upgrades-upgrades-docking"),
        href: "/roadmap/merge/",
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
      <ContentHero
        breadcrumbs={{ slug, startDepth: 1 }}
        title={frontmatter.title}
        description={
          <>
            <Box>
              <List listStyleType="disc">
                {summaryPoints.map((point, idx) => (
                  <ListItem key={idx}>{point}</ListItem>
                ))}
              </List>
            </Box>

            <LastUpdated>
              {t("common:page-last-updated")}: {lastEditLocaleTimestamp}
            </LastUpdated>
          </>
        }
        heroImg={frontmatter.image}
        blurDataURL={frontmatter.blurDataURL}
      />
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
