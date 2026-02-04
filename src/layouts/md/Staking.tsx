import { HTMLAttributes } from "react"

import type { ChildOnlyProp } from "@/lib/types"
import type { MdPageContent, StakingFrontmatter } from "@/lib/interfaces"

import { List, ListItem } from "@/components/atoms/list"
import { List as ButtonDropdownList } from "@/components/molecules/ButtonDropdown"
import DocLink from "@/components/molecules/DocLink"
import ProductDisclaimer from "@/components/molecules/ProductDisclaimer"
import { ContentHero } from "@/components/organisms/Hero"
import {
  Heading1 as MdHeading1,
  Heading4 as MdHeading4,
} from "@/components/organisms/MdComponents"
import StakingCommunityCallout from "@/components/organisms/Staking/StakingCommunityCallout"
import StakingComparison from "@/components/organisms/Staking/StakingComparison"
import StakingConsiderations from "@/components/organisms/Staking/StakingConsiderations"
import StakingGuides from "@/components/organisms/Staking/StakingGuides"
import StakingHowSoloWorks from "@/components/organisms/Staking/StakingHowSoloWorks"
import StakingLaunchpadWidget from "@/components/organisms/Staking/StakingLaunchpadWidget"
import StakingProductsCardGrid from "@/components/organisms/Staking/StakingProductsCardGrid"
import WithdrawalCredentials from "@/components/organisms/Staking/WithdrawalCredentials"
import WithdrawalsTabComparison from "@/components/organisms/Staking/WithdrawalsTabComparison"
import UpgradeStatus from "@/components/organisms/UpgradeStatus"

import { ContentLayout } from "../ContentLayout"

import { useTranslation } from "@/hooks/useTranslation"

const Heading1 = (props: HTMLAttributes<HTMLHeadingElement>) => (
  <MdHeading1 className="md:text-5xl" {...props} />
)

const Heading4 = (props: HTMLAttributes<HTMLHeadingElement>) => (
  <MdHeading4 className="font-semibold max-md:text-md" {...props} />
)

export const InfoGrid = (props: ChildOnlyProp) => (
  <div className="grid grid-cols-fill-3 gap-8" {...props} />
)

const CardGrid = (props: ChildOnlyProp) => (
  <div
    className="m-auto grid grid-cols-1 gap-8 md:m-0 md:grid-cols-3 [&_h3]:mt-0"
    {...props}
  />
)

const TableContainer = (props: ChildOnlyProp) => (
  <div className="mx-auto w-fit lg:mx-0" {...props} />
)

// Staking layout components
export const stakingComponents = {
  h1: Heading1,
  h4: Heading4,
  CardGrid,
  DocLink,
  InfoGrid,
  ProductDisclaimer,
  StakingComparison,
  StakingConsiderations,
  StakingGuides,
  StakingHowSoloWorks,
  StakingLaunchpadWidget,
  StakingProductsCardGrid,
  TableContainer,
  UpgradeStatus,
  WithdrawalCredentials,
  WithdrawalsTabComparison,
}

type StakingLayoutProps = ChildOnlyProp &
  Pick<
    MdPageContent,
    | "slug"
    | "tocItems"
    | "contentNotTranslated"
    | "contributors"
    | "lastEditLocaleTimestamp"
  > & {
    frontmatter: StakingFrontmatter
  }

export const StakingLayout = ({
  children,
  frontmatter,
  slug,
  tocItems,
  contentNotTranslated,
  contributors,
  lastEditLocaleTimestamp,
}: StakingLayoutProps) => {
  const { t } = useTranslation("page-staking")

  const { summaryPoints } = frontmatter

  const dropdownLinks: ButtonDropdownList = {
    text: t("page-staking-dropdown-staking-options"),
    ariaLabel: t("page-staking-dropdown-staking-options-alt"),
    items: [
      {
        text: t("page-staking-dropdown-home"),
        href: "/staking/",
        matomo: {
          eventCategory: `Staking dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked staking home",
        },
      },
      {
        text: t("page-staking-dropdown-solo"),
        href: "/staking/solo/",
        matomo: {
          eventCategory: `Staking dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked solo staking",
        },
      },
      {
        text: t("page-staking-dropdown-saas"),
        href: "/staking/saas/",
        matomo: {
          eventCategory: `Staking dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked staking as a service",
        },
      },
      {
        text: t("page-staking-dropdown-pools"),
        href: "/staking/pools/",
        matomo: {
          eventCategory: `Staking dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked pooled staking",
        },
      },
      {
        text: t("page-staking-dropdown-withdrawals"),
        href: "/staking/withdrawals/",
        matomo: {
          eventCategory: `Staking dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked about withdrawals",
        },
      },
    ],
  }

  const heroProps = {
    ...frontmatter,
    breadcrumbs: { slug, startDepth: 1 },
    heroImg: { src: frontmatter.image, width: 800, height: 605 },
    description: (
      <>
        <div>
          <List>
            {summaryPoints.map((point, idx) => (
              <ListItem key={idx}>{point}</ListItem>
            ))}
          </List>
        </div>
      </>
    ),
  }

  return (
    <ContentLayout
      dir={contentNotTranslated ? "ltr" : "unset"}
      tocItems={tocItems}
      dropdownLinks={dropdownLinks}
      contributors={contributors}
      lastEditLocaleTimestamp={lastEditLocaleTimestamp}
      heroSection={<ContentHero {...heroProps} />}
    >
      {children}
      <StakingCommunityCallout className="my-16" />
    </ContentLayout>
  )
}
