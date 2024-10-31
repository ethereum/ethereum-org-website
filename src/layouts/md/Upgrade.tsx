import { useTranslation } from "next-i18next"

import type { ChildOnlyProp } from "@/lib/types"
import type { MdPageContent, UpgradeFrontmatter } from "@/lib/interfaces"

import type { List as ButtonDropdownList } from "@/components/ButtonDropdown"
import { ContentHero } from "@/components/Hero"
import MergeArticleList from "@/components/MergeArticleList"
import MergeInfographic from "@/components/MergeInfographic"
import { List, ListItem } from "@/components/ui/list"
import UpgradeStatus from "@/components/UpgradeStatus"

import { getSummaryPoints } from "@/lib/utils/getSummaryPoints"

import { ContentLayout } from "../ContentLayout"

// Upgrade layout components
export const upgradeComponents = {
  MergeArticleList,
  MergeInfographic,
  UpgradeStatus,
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

        <p className="border-t pt-4 italic">
          {t("common:page-last-updated")}: {lastEditLocaleTimestamp}
        </p>
      </>
    ),
  }

  return (
    <ContentLayout
      dir={contentNotTranslated ? "ltr" : "unset"}
      tocItems={tocItems}
      dropdownLinks={dropdownLinks}
      heroSection={<ContentHero {...heroProps} />}
    >
      {children}
    </ContentLayout>
  )
}
