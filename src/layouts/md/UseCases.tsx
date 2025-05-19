import type { ChildOnlyProp } from "@/lib/types"
import type { MdPageContent, UseCasesFrontmatter } from "@/lib/interfaces"

import BannerNotification from "@/components/Banners/BannerNotification"
import { List as ButtonDropdownList } from "@/components/ButtonDropdown"
import AiAgentProductLists from "@/components/Content/ai-agents/AiAgentProductLists"
import BuildYourOwnAIAgent from "@/components/Content/ai-agents/BuildYourOwnAIAgent"

import {Restaking_List, Eigen_Layer} from "@/components/Content/ai-agents/restaking/Restaking_List"
import TabbedSection from "@/components/Content/ai-agents/restaking/Restaking_Tab"

import PredictionMarketLists from "@/components/Content/prediction-markets/PredictionMarketLists"

import Emoji from "@/components/Emoji"
import { ContentHero } from "@/components/Hero"
import InlineLink from "@/components/ui/Link"
import { List, ListItem } from "@/components/ui/list"

import { getEditPath } from "@/lib/utils/editPath"
import { getSummaryPoints } from "@/lib/utils/getSummaryPoints"

import { ContentLayout } from "../ContentLayout"

import { useTranslation } from "@/hooks/useTranslation"

// UseCases layout components
export const useCasesComponents = {
  AiAgentProductLists,
  BuildYourOwnAIAgent,

  Restaking_List,
  TabbedSection,
  Eigen_Layer,

  PredictionMarketLists,

}

type UseCasesLayoutProps = ChildOnlyProp &
  Pick<MdPageContent, "slug" | "tocItems" | "contentNotTranslated"> & {
    frontmatter: UseCasesFrontmatter
  }
export const UseCasesLayout = ({
  children,
  frontmatter,
  slug,
  tocItems,
  contentNotTranslated,
}: UseCasesLayoutProps) => {
  const { t } = useTranslation("template-usecase")

  const summaryPoints = getSummaryPoints(frontmatter)

  const absoluteEditPath = getEditPath(slug)

  const dropdownLinks: ButtonDropdownList = {
    text: t("template-usecase:template-usecase-dropdown"),
    ariaLabel: t("template-usecase:template-usecase-dropdown-aria"),
    items: [
      {
        text: t("template-usecase:template-usecase-dropdown-defi"),
        href: "/defi/",
        matomo: {
          eventCategory: "use cases menu",
          eventAction: "click",
          eventName: "defi",
        },
      },
      {
        text: t("template-usecase:template-usecase-dropdown-nft"),
        href: "/nft/",
        matomo: {
          eventCategory: "use cases menu",
          eventAction: "click",
          eventName: "nft",
        },
      },
      {
        text: t("template-usecase:template-usecase-dropdown-dao"),
        href: "/dao/",
        matomo: {
          eventCategory: "use cases menu",
          eventAction: "click",
          eventName: "dao",
        },
      },
      {
        text: t("template-usecase:template-usecase-dropdown-restaking"), 
        href: "/restaking/",
        matomo: {
          eventCategory: "use cases menu",
          eventAction: "click",
          eventName: "restaking",
        }
      },
      {
        text: t("template-usecase:template-usecase-dropdown-payments"),
        href: "/payments/",
        matomo: {
          eventCategory: "use cases menu",
          eventAction: "click",
          eventName: "payments",
        },
      },
      {
        text: t("template-usecase:template-usecase-dropdown-social-networks"),
        href: "/social-networks/",
        matomo: {
          eventCategory: "use cases menu",
          eventAction: "click",
          eventName: "social-networks",
        },
      },
      {
        text: t("template-usecase:template-usecase-dropdown-identity"),
        href: "/decentralized-identity/",
        matomo: {
          eventCategory: "use cases menu",
          eventAction: "click",
          eventName: "decentralized-identity",
        },
      },
      {
        text: t("template-usecase:template-usecase-dropdown-desci"),
        href: "/desci/",
        matomo: {
          eventCategory: "use cases menu",
          eventAction: "click",
          eventName: "desci",
        },
      },
      {
        text: t("template-usecase:template-usecase-dropdown-refi"),
        href: "/refi/",
        matomo: {
          eventCategory: "use cases menu",
          eventAction: "click",
          eventName: "refi",
        },
      },
      {
        text: t("template-usecase:template-usecase-dropdown-ai-agents"),
        href: "/ai-agents/",
        matomo: {
          eventCategory: "use cases menu",
          eventAction: "click",
          eventName: "ai-agents",
        },
      },
      {
        text: t(
          "template-usecase:template-usecase-dropdown-prediction-markets"
        ),
        href: "/prediction-markets/",
        matomo: {
          eventCategory: "use cases menu",
          eventAction: "click",
          eventName: "prediction-markets",
        },
      },
    ],
  }

  const heroProps = {
    ...frontmatter,
    breadcrumbs: { slug, startDepth: 1 },
    heroImg: frontmatter.image,
    description: (
      <div>
        <List>
          {summaryPoints.map((point, idx) => (
            <ListItem key={idx}>{point}</ListItem>
          ))}
        </List>
      </div>
    ),
  }

  return (
    <div dir={contentNotTranslated ? "ltr" : "unset"}>
      <BannerNotification shouldShow className="z-sticky max-lg:hidden">
        <Emoji text=":pencil:" className="me-4 shrink-0 text-2xl" />
        <p>
          {t("template-usecase:template-usecase-banner")}{" "}
          <InlineLink href={absoluteEditPath}>
            {t("template-usecase-edit-link")}
          </InlineLink>
        </p>
      </BannerNotification>

      <ContentLayout
        tocItems={tocItems}
        dropdownLinks={dropdownLinks}
        maxDepth={frontmatter.sidebarDepth}
        heroSection={<ContentHero {...heroProps} />}
      >
        {children}
      </ContentLayout>
    </div>
  )
}
