import { HTMLAttributes } from "react"
import { useTranslation } from "next-i18next"

import type { ChildOnlyProp } from "@/lib/types"
import type { MdPageContent, StakingFrontmatter } from "@/lib/interfaces"

import { List as ButtonDropdownList } from "@/components/ButtonDropdown"
import DocLink from "@/components/DocLink"
import { ContentHero } from "@/components/Hero"
import {
  Heading1 as MdHeading1,
  Heading4 as MdHeading4,
} from "@/components/MdComponents"
import ProductDisclaimer from "@/components/ProductDisclaimer"
import StakingCommunityCallout from "@/components/Staking/StakingCommunityCallout"
import StakingComparison from "@/components/Staking/StakingComparison"
import StakingConsiderations from "@/components/Staking/StakingConsiderations"
import StakingGuides from "@/components/Staking/StakingGuides"
import StakingHowSoloWorks from "@/components/Staking/StakingHowSoloWorks"
import StakingLaunchpadWidget from "@/components/Staking/StakingLaunchpadWidget"
import StakingProductsCardGrid from "@/components/Staking/StakingProductsCardGrid"
import WithdrawalCredentials from "@/components/Staking/WithdrawalCredentials"
import WithdrawalsTabComparison from "@/components/Staking/WithdrawalsTabComparison"
import { List, ListItem } from "@/components/ui/list"
import UpgradeStatus from "@/components/UpgradeStatus"

import { ContentLayout } from "../ContentLayout"

const Heading1 = (props: HTMLAttributes<HTMLHeadingElement>) => (
  <MdHeading1 className="md:text-5xl" {...props} />
)

const Heading4 = (props: HTMLAttributes<HTMLHeadingElement>) => (
  <MdHeading4 className="font-semibold max-md:text-md" {...props} />
)

export const InfoGrid = (props: ChildOnlyProp) => (
  <div
    className="grid grid-cols-[repeat(auto-fill,_minmax(100%,_340px),_1fr)] gap-8"
    {...props}
  />
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
  Pick<MdPageContent, "slug" | "tocItems" | "contentNotTranslated"> & {
    frontmatter: StakingFrontmatter
  }

export const StakingLayout = ({
  children,
  frontmatter,
  slug,
  tocItems,
  contentNotTranslated,
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
    heroImg: frontmatter.image,
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
      maxDepth={frontmatter.sidebarDepth}
      heroSection={<ContentHero {...heroProps} />}
    >
      {children}
      <StakingCommunityCallout className="my-16" />
    </ContentLayout>
  )
}
