import { useTranslation } from "next-i18next"

import type { ChildOnlyProp } from "@/lib/types"
import type { MdPageContent, UseCasesFrontmatter } from "@/lib/interfaces"

// import BannerNotification from "@/components/Banners/BannerNotification"
import { List as ButtonDropdownList } from "@/components/ButtonDropdown"
import { ContentHero } from "@/components/Hero"
import { List, ListItem } from "@/components/ui/list"

import { getSummaryPoints } from "@/lib/utils/getSummaryPoints"

import { ContentLayout } from "../ContentLayout"

// UseCases layout components
export const useCasesComponents = {
  // Export empty object if none needed
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
  // const { asPath: relativePath } = useRouter()
  const { t } = useTranslation("template-usecase")

  const summaryPoints = getSummaryPoints(frontmatter)

  // const absoluteEditPath = getEditPath(relativePath)

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
    <ContentLayout
      dir={contentNotTranslated ? "ltr" : "unset"}
      tocItems={tocItems}
      dropdownLinks={dropdownLinks}
      maxDepth={frontmatter.sidebarDepth}
      heroSection={<ContentHero {...heroProps} />}
    >
      {/* TODO: Add back in when we figure out how to handle this case inside the ContentLayout */}
      {/* <BannerNotification shouldShow className="z-sticky max-lg:hidden">
        <Emoji text=":pencil:" className="me-4 shrink-0 text-2xl" />
        <Text m={0}>
          {t("template-usecase:template-usecase-banner")}{" "}
          <InlineLink href={absoluteEditPath}>
            {t("template-usecase-edit-link")}
          </InlineLink>
        </Text>
      </BannerNotification> */}
      {children}
    </ContentLayout>
  )
}
