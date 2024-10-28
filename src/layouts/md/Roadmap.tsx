import { useTranslation } from "next-i18next"

import type { ChildOnlyProp } from "@/lib/types"
import type { MdPageContent, RoadmapFrontmatter } from "@/lib/interfaces"

import { List as ButtonDropdownList } from "@/components/ButtonDropdown"
import { ContentHero, HubHero } from "@/components/Hero"
import Pill from "@/components/Pill"
import RoadmapActionCard from "@/components/Roadmap/RoadmapActionCard"
import RoadmapImageContent from "@/components/Roadmap/RoadmapImageContent"

import { ContentLayout } from "../ContentLayout"

import RoadmapHubHeroImage from "@/public/images/heroes/roadmap-hub-hero.jpg"

const CardGrid = (props: ChildOnlyProp) => (
  <div className="grid grid-cols-1 gap-8 md:grid-cols-2" {...props} />
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
  const { t } = useTranslation("common")

  const dropdownLinks: ButtonDropdownList = {
    text: t("common:nav-roadmap-options"),
    ariaLabel: t("common:nav-roadmap-options-alt"),
    items: [
      {
        text: t("common:nav-roadmap-home"),
        href: "/roadmap/",
        matomo: {
          eventCategory: `Roadmap dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked roadmap home",
        },
      },
      {
        text: t("common:nav-roadmap-security"),
        href: "/roadmap/security",
        matomo: {
          eventCategory: `Roadmap security dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked roadmap security",
        },
      },
      {
        text: t("common:nav-roadmap-scaling"),
        href: "/roadmap/scaling",
        matomo: {
          eventCategory: `Roadmap scaling dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked roadmap scaling home",
        },
      },
      {
        text: t("common:nav-roadmap-user-experience"),
        href: "/roadmap/user-experience/",
        matomo: {
          eventCategory: `Roadmap user experience dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked roadmap user experience home",
        },
      },
      {
        text: t("common:nav-roadmap-future-proofing"),
        href: "/roadmap/future-proofing",
        matomo: {
          eventCategory: `Roadmap future-proofing dropdown`,
          eventAction: `Clicked`,
          eventName: "clicked roadmap future-proofing home",
        },
      },
    ],
  }

  const heroProps = {
    ...frontmatter,
    breadcrumbs: { slug, startDepth: 1 },
    heroImg: frontmatter.image,
  }

  return (
    <ContentLayout
      dir={contentNotTranslated ? "ltr" : "unset"}
      tocItems={tocItems}
      dropdownLinks={dropdownLinks}
      maxDepth={frontmatter.sidebarDepth}
      heroSection={
        slug === "/roadmap/" ? (
          <HubHero
            heroImg={RoadmapHubHeroImage}
            header={frontmatter.title}
            title=""
            description={frontmatter.description}
          />
        ) : (
          <ContentHero {...heroProps} />
        )
      }
    >
      {children}
    </ContentLayout>
  )
}
