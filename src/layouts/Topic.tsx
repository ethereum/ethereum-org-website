import { getTranslations } from "next-intl/server"

import type { ChildOnlyProp } from "@/lib/types"
import type { MdPageContent, TopicFrontmatter } from "@/lib/interfaces"

import type { List as ButtonDropdownList } from "@/components/ButtonDropdown"
import Emoji from "@/components/Emoji"
import PageHero from "@/components/Hero/PageHero"
import PageActions from "@/components/PageActions"
import { Alert } from "@/components/ui/alert"
import InlineLink from "@/components/ui/Link"
import { List, ListItem } from "@/components/ui/list"

import { getEditPath } from "@/lib/utils/editPath"

import type { TopicConfig } from "@/data/topics"

import { ContentLayout } from "./ContentLayout"

type TopicLayoutProps = ChildOnlyProp &
  Pick<
    MdPageContent,
    | "slug"
    | "tocItems"
    | "contentNotTranslated"
    | "contributors"
    | "lastEditLocaleTimestamp"
  > & {
    frontmatter: TopicFrontmatter
    // Optional at the type level so this component can sit alongside other
    // layouts in `layoutMapping` without forcing every call site to pass it.
    // The slug router only renders TopicLayout when a config lookup succeeds,
    // so in practice this is always populated.
    config?: TopicConfig
  }

export const TopicLayout = async ({
  children,
  frontmatter,
  slug,
  tocItems,
  contentNotTranslated,
  contributors,
  lastEditLocaleTimestamp,
  config,
}: TopicLayoutProps) => {
  if (!config) {
    throw new Error(
      `TopicLayout rendered without a config for slug "${slug}". ` +
        `Add an entry to src/data/topics/ and route through topics[layout].`
    )
  }

  const t = await getTranslations(config.translationNs)
  const tCommon = config.showLastUpdatedInHero
    ? await getTranslations("common")
    : null

  const dropdownLinks: ButtonDropdownList = {
    text: t(config.dropdown.textKey),
    ariaLabel: t(config.dropdown.ariaLabelKey),
    items: config.dropdown.items.map((item) => ({
      text: t(item.textKey),
      href: item.href,
      matomo: {
        eventCategory: config.dropdown.matomoCategory,
        eventAction: "click",
        eventName: item.matomoEvent,
      },
    })),
  }

  const baseDescription = frontmatter.summary ? (
    <p className="text-lg">{frontmatter.summary}</p>
  ) : frontmatter.summaryPoints && frontmatter.summaryPoints.length > 0 ? (
    <List>
      {frontmatter.summaryPoints.map((point, idx) => (
        <ListItem key={idx}>{point}</ListItem>
      ))}
    </List>
  ) : frontmatter.description ? (
    <p className="text-lg">{frontmatter.description}</p>
  ) : undefined

  const heroDescription =
    tCommon && lastEditLocaleTimestamp ? (
      <>
        {baseDescription}
        <p className="border-t pt-4 italic">
          {tCommon("page-last-updated")}: {lastEditLocaleTimestamp}
        </p>
      </>
    ) : (
      baseDescription
    )

  const editBanner =
    config.editBanner && frontmatter.hideEditBanner !== true ? (
      <Alert variant="banner" className="max-lg:hidden">
        <Emoji text=":pencil:" className="shrink-0 text-2xl" />
        <p>
          {t(config.editBanner.textKey)}{" "}
          <InlineLink href={getEditPath(slug)}>
            {t(config.editBanner.linkKey)}
          </InlineLink>
        </p>
      </Alert>
    ) : null

  const heroSection = (
    <>
      {editBanner}
      <PageHero
        breadcrumbs={{ slug, startDepth: 1 }}
        heroImg={{
          src: frontmatter.image,
          width: frontmatter.imageWidth ?? 760,
          height: frontmatter.imageHeight ?? 450,
        }}
        blurDataURL={frontmatter.blurDataURL}
        title={frontmatter.title}
        description={heroDescription}
        buttons={frontmatter.buttons}
      />
    </>
  )

  return (
    <ContentLayout
      dir={contentNotTranslated ? "ltr" : "unset"}
      tocItems={tocItems}
      dropdownLinks={dropdownLinks}
      contributors={contributors}
      lastEditLocaleTimestamp={lastEditLocaleTimestamp}
      heroSection={heroSection}
      showDropdown={frontmatter.showDropdown ?? true}
    >
      {/*
        The `!` overrides defeat the `flow` region's `*:first:mt-0` (which
        would zero PageActions' mobile top spacing) and zero out the default
        prose top margin on the following h2 that PageActions displaces from
        first-child position.
      */}
      <PageActions
        slug={slug}
        isTranslated={!contentNotTranslated}
        editPath={getEditPath(slug)}
        className="-ms-2 !mt-8 mb-8 lg:!mt-0 [&+h2]:!mt-0"
      />
      {children}
    </ContentLayout>
  )
}
