import type { ChildOnlyProp } from "@/lib/types"
import type { MdPageContent, UseCasesFrontmatter } from "@/lib/interfaces"

import BannerNotification from "@/components/Banners/BannerNotification"
import { List as ButtonDropdownList } from "@/components/ButtonDropdown"
import AiAgentProductLists from "@/components/Content/ai-agents/AiAgentProductLists"
import BuildYourOwnAIAgent from "@/components/Content/ai-agents/BuildYourOwnAIAgent"
import OnchainGamingProductList from "@/components/Content/gaming/OnchainGamingProductList"
import PredictionMarketLists from "@/components/Content/prediction-markets/PredictionMarketLists"
import Emoji from "@/components/Emoji"
import { ContentHero } from "@/components/Hero"
import InlineLink from "@/components/ui/Link"
import { List, ListItem } from "@/components/ui/list"

import { getEditPath } from "@/lib/utils/editPath"
import { getSummaryPoints } from "@/lib/utils/getSummaryPoints"

import { ContentLayout } from "../ContentLayout"

import { useTranslation } from "@/hooks/useTranslation"

const CardGrid = (props: ChildOnlyProp) => (
  <div
    className="grid grid-cols-[repeat(auto-fill,_minmax(min(100%,_280px),_1fr))] gap-8"
    {...props}
  />
)

// UseCases layout components
export const useCasesComponents = {
  CardGrid,
  AiAgentProductLists,
  BuildYourOwnAIAgent,
  OnchainGamingProductList,
  PredictionMarketLists,
}

type UseCasesLayoutProps = ChildOnlyProp &
  Pick<
    MdPageContent,
    | "slug"
    | "tocItems"
    | "contentNotTranslated"
    | "contributors"
    | "lastEditLocaleTimestamp"
  > & {
    frontmatter: UseCasesFrontmatter
  }
export const UseCasesLayout = ({
  children,
  frontmatter,
  slug,
  tocItems,
  contentNotTranslated,
  contributors,
  lastEditLocaleTimestamp,
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
        text: t("template-usecase:template-usecase-dropdown-onchain-gaming"),
        href: "/gaming/",
        matomo: {
          eventCategory: "use cases menu",
          eventAction: "click",
          eventName: "onchain-gaming",
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
      {
        text: t("template-usecase:template-usecase-dropdown-rwa"),
        href: "/real-world-assets/",
        matomo: {
          eventCategory: "use cases menu",
          eventAction: "click",
          eventName: "real-world-assets",
        },
      },
    ],
  }

  const heroProps = {
    ...frontmatter,
    breadcrumbs: { slug, startDepth: 1 },
    heroImg: { src: frontmatter.image, width: 760, height: 450 },
    description: frontmatter.summary ? (
      <p className="text-lg">{frontmatter.summary}</p>
    ) : (
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
          <InlineLink href={absoluteEditPath} className="text-white">
            {t("template-usecase-edit-link")}
          </InlineLink>
        </p>
      </BannerNotification>

      <ContentLayout
        tocItems={tocItems}
        dropdownLinks={dropdownLinks}
        contributors={contributors}
        lastEditLocaleTimestamp={lastEditLocaleTimestamp}
        heroSection={<ContentHero {...heroProps} />}
        showDropdown={frontmatter.showDropdown ?? true}
      >
        {children}
      </ContentLayout>
    </div>
  )
}
