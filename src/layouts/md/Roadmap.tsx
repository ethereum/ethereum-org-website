import { SimpleGrid } from "@chakra-ui/react"

import type { ChildOnlyProp } from "@/lib/types"
import type { MdPageContent, RoadmapFrontmatter } from "@/lib/interfaces"

import { List as ButtonDropdownList } from "@/components/ButtonDropdown"
import Pill from "@/components/Pill"
import RoadmapActionCard from "@/components/Roadmap/RoadmapActionCard"
import RoadmapImageContent from "@/components/Roadmap/RoadmapImageContent"

import { ContentLayout } from "../ContentLayout"

const CardGrid = (props: ChildOnlyProp) => (
  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} {...props} />
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
    <ContentLayout
      dir={contentNotTranslated ? "ltr" : "unset"}
      tocItems={tocItems}
      dropdownLinks={dropdownLinks}
      maxDepth={frontmatter.sidebarDepth}
      heroProps={{
        ...frontmatter,
        breadcrumbs: { slug, startDepth: 1 },
        heroImg: frontmatter.image,
      }}
    >
      {children}
    </ContentLayout>
  )
}
