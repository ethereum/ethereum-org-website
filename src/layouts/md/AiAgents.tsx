import type { HTMLAttributes } from "react"

import type { ChildOnlyProp } from "@/lib/types"
import type { AiAgentsFrontmatter, MdPageContent } from "@/lib/interfaces"

import BannerNotification from "@/components/Banners/BannerNotification"
import { List as ButtonDropdownList } from "@/components/ButtonDropdown"
import Codeblock from "@/components/Codeblock"
import Emoji from "@/components/Emoji"
import { ContentHero } from "@/components/Hero"
import {
  Heading1 as MdHeading1,
  Heading2 as MdHeading2,
  Heading3 as MdHeading3,
  Heading4 as MdHeading4,
} from "@/components/MdComponents"
import { ButtonLink } from "@/components/ui/buttons/Button"
import {
  Card,
  CardBanner,
  CardContent,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import InlineLink from "@/components/ui/Link"
import { List, ListItem } from "@/components/ui/list"

import { getEditPath } from "@/lib/utils/editPath"
import { getSummaryPoints } from "@/lib/utils/getSummaryPoints"

import { ContentLayout } from "../ContentLayout"

import { useTranslation } from "@/hooks/useTranslation"

const Heading1 = (props: HTMLAttributes<HTMLHeadingElement>) => (
  <MdHeading1 className="md:text-5xl" {...props} />
)

const Heading2 = (props: HTMLAttributes<HTMLHeadingElement>) => (
  <MdHeading2 className="max-md:text-2xl" {...props} />
)

const Heading3 = (props: HTMLAttributes<HTMLHeadingElement>) => (
  <MdHeading3 className="max-md:text-xl" {...props} />
)

const Heading4 = (props: HTMLAttributes<HTMLHeadingElement>) => (
  <MdHeading4 className="font-semibold max-md:text-md" {...props} />
)

const CardGrid = (props: ChildOnlyProp) => (
  <div className="grid grid-cols-fill-4 gap-8" {...props} />
)

const Pre = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const match = props.className?.match(/(language-\S+)/)
  const codeLanguage = match ? match[0] : "plain-text"
  return <Codeblock codeLanguage={codeLanguage} {...props} />
}

// AI Agents layout components
export const aiAgentsComponents = {
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  pre: Pre,
  CardGrid,
}

type AiAgentsLayoutProps = ChildOnlyProp &
  Pick<
    MdPageContent,
    | "slug"
    | "tocItems"
    | "contentNotTranslated"
    | "contributors"
    | "lastEditLocaleTimestamp"
  > & {
    frontmatter: AiAgentsFrontmatter
  }

export const AiAgentsLayout = ({
  children,
  frontmatter,
  slug,
  tocItems,
  contentNotTranslated,
  contributors,
  lastEditLocaleTimestamp,
}: AiAgentsLayoutProps) => {
  const { t } = useTranslation("page-ai-agents")

  const summaryPoints = getSummaryPoints(frontmatter)

  const absoluteEditPath = getEditPath(slug)

  const dropdownLinks: ButtonDropdownList = {
    text: t("page-ai-agents-dropdown"),
    ariaLabel: t("page-ai-agents-dropdown-aria"),
    items: [
      {
        text: t("page-ai-agents-dropdown-hub"),
        href: "/ai-agents/",
        matomo: {
          eventCategory: "ai agents menu",
          eventAction: "click",
          eventName: "hub-home",
        },
      },
      {
        text: t("page-ai-agents-dropdown-ethereum"),
        href: "/ai-agents/ethereum/",
        matomo: {
          eventCategory: "ai agents menu",
          eventAction: "click",
          eventName: "ethereum",
        },
      },
      {
        text: t("page-ai-agents-dropdown-getting-started"),
        href: "/ai-agents/getting-started/",
        matomo: {
          eventCategory: "ai agents menu",
          eventAction: "click",
          eventName: "getting-started",
        },
      },
      {
        text: t("page-ai-agents-dropdown-wallets"),
        href: "/ai-agents/wallets/",
        matomo: {
          eventCategory: "ai agents menu",
          eventAction: "click",
          eventName: "wallets",
        },
      },
      {
        text: t("page-ai-agents-dropdown-frameworks"),
        href: "/ai-agents/frameworks/",
        matomo: {
          eventCategory: "ai agents menu",
          eventAction: "click",
          eventName: "frameworks",
        },
      },
      {
        text: t("page-ai-agents-dropdown-verification"),
        href: "/ai-agents/verification/",
        matomo: {
          eventCategory: "ai agents menu",
          eventAction: "click",
          eventName: "verification",
        },
      },
      {
        text: t("page-ai-agents-dropdown-payments"),
        href: "/ai-agents/payments/",
        matomo: {
          eventCategory: "ai agents menu",
          eventAction: "click",
          eventName: "payments",
        },
      },
      {
        text: t("page-ai-agents-dropdown-identity"),
        href: "/ai-agents/identity/",
        matomo: {
          eventCategory: "ai agents menu",
          eventAction: "click",
          eventName: "identity",
        },
      },
      {
        text: t("page-ai-agents-dropdown-use-cases"),
        href: "/ai-agents/use-cases/",
        matomo: {
          eventCategory: "ai agents menu",
          eventAction: "click",
          eventName: "use-cases",
        },
      },
      {
        text: t("page-ai-agents-dropdown-l2s"),
        href: "/ai-agents/l2s/",
        matomo: {
          eventCategory: "ai agents menu",
          eventAction: "click",
          eventName: "l2s",
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
          {t("page-ai-agents-banner")}{" "}
          <InlineLink href={absoluteEditPath} className="text-white">
            {t("page-ai-agents-edit-link")}
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
