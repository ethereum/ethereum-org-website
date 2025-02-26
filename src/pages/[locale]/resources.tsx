import { motion } from "framer-motion"
import { GetStaticProps } from "next"
import { FaGithub } from "react-icons/fa6"

import type { BasePageProps, Lang, Params } from "@/lib/types"

import { HubHero } from "@/components/Hero"
import StackIcon from "@/components/icons/stack.svg"
import MainArticle from "@/components/MainArticle"
import PageMetadata from "@/components/PageMetadata"
import { ResourceItem, ResourcesContainer } from "@/components/Resources"
import { useResources } from "@/components/Resources/useResources"
import Translation from "@/components/Translation"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Section } from "@/components/ui/section"

import { cn } from "@/lib/utils/cn"
import { dataLoader } from "@/lib/utils/data/dataLoader"
import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import {
  BASE_TIME_UNIT,
  DEFAULT_LOCALE,
  GITHUB_REPO_URL,
  LOCALES_CODES,
} from "@/lib/constants"

import { useActiveHash } from "@/hooks/useActiveHash"
import { useTranslation } from "@/hooks/useTranslation"
import loadNamespaces from "@/i18n/loadNamespaces"
import { fetchGrowThePie } from "@/lib/api/fetchGrowThePie"
import heroImg from "@/public/images/heroes/guides-hub-hero.jpg"

// In seconds
const REVALIDATE_TIME = BASE_TIME_UNIT * 1

const loadData = dataLoader(
  [["growThePieData", fetchGrowThePie]],
  REVALIDATE_TIME * 1000
)

export async function getStaticPaths() {
  return {
    paths: LOCALES_CODES.map((locale) => ({ params: { locale } })),
    fallback: false,
  }
}

export const getStaticProps = (async ({ params }) => {
  const { locale = DEFAULT_LOCALE } = params || ({} as { locale: string })

  const [growThePieData] = await loadData()
  const { txCostsMedianUsd } = growThePieData

  const requiredNamespaces = getRequiredNamespacesForPage("/resources")

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])

  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  const messages = await loadNamespaces(locale as string, requiredNamespaces)

  return {
    props: {
      messages,
      contentNotTranslated,
      lastDeployLocaleTimestamp,
      txCostsMedianUsd,
    },
  }
}) satisfies GetStaticProps<BasePageProps, Params>

const ResourcesPage = ({ txCostsMedianUsd }) => {
  const { t } = useTranslation("page-resources")
  const resourceSections = useResources({ txCostsMedianUsd })
  const activeSection = useActiveHash(
    resourceSections.map(({ key }) => key),
    "0% 0% -70% 0%"
  ).replace(/^#/, "")

  return (
    <MainArticle className="relative flex flex-col">
      <PageMetadata
        title={t("page-resources-meta-title")}
        description={t("page-resources-meta-description")}
        image="/images/heroes/guides-hub-hero.jpg"
      />

      <HubHero
        title={t("page-resources-hero-title")}
        header={t("page-resources-hero-header")}
        description={t("page-resources-hero-description")}
        heroImg={heroImg}
      />

      <div className="sticky top-6 z-10 my-8 flex flex-col items-center gap-3 px-2 py-4 text-center">
        <div className="my-2 text-body-medium">
          {t("page-resources-whats-on-this-page")}
        </div>
        <nav className="mx-4 flex max-w-[calc(100%-2rem)] gap-1 overflow-x-auto rounded-2xl border bg-background p-0.5 shadow-lg">
          {resourceSections.map(({ key, title }) => (
            <ButtonLink
              key={key}
              href={`#${key}`}
              variant="ghost"
              isSecondary
              className={cn(
                "relative text-nowrap rounded-xl px-4 py-2 text-sm",
                activeSection === key && "!text-primary"
              )}
            >
              {activeSection === key && (
                <motion.div
                  layoutId="active-section-highlight"
                  className="absolute inset-0 z-0 rounded-xl bg-primary-low-contrast"
                />
              )}
              <span className="relative z-10">{title}</span>
            </ButtonLink>
          ))}
        </nav>
      </div>

      {resourceSections.map(({ key, icon, title, boxes }) => (
        <section id={key} key={key} className="mb-16 scroll-mt-40">
          <div className="group flex w-full items-center gap-3 border-b bg-transparent px-4 py-6">
            <div className="grid size-12 place-items-center rounded-lg border border-border-low-contrast text-2xl">
              {icon || <StackIcon />}
            </div>
            <h2 className="flex-1 text-start font-black">{title}</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 pb-12 pt-8 md:pb-12 md:pt-8 lg:grid-cols-2">
            {boxes.map(({ title, metric, items, className }) => (
              <div
                className={cn(
                  "overflow-hidden rounded-2xl border shadow-lg",
                  className
                )}
                key={title}
              >
                <div className="border-b bg-[#ffffff] px-6 py-4 font-bold dark:bg-[#171717]">
                  {title}
                </div>
                <div className="h-full bg-background bg-gradient-to-br from-white to-primary/10 px-2 py-6 dark:from-transparent dark:to-primary/10">
                  {metric && metric}
                  <ResourcesContainer>
                    {items.map((item) => (
                      <ResourceItem item={item} key={item.title} />
                    ))}
                  </ResourcesContainer>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="mb-20 text-center">
        <Translation id="page-resources:page-resources-find-more" />
      </div>

      <Section
        id="contribute"
        className={cn(
          "before:absolute before:-inset-px before:bottom-0 before:z-hide before:rounded-[calc(theme(borderRadius.4xl)+1px)] before:content-['']", // Border/gradient positioning
          "before:bg-gradient-to-b before:from-primary-hover/[0.24] before:to-primary-hover/[0.08] before:dark:from-primary-hover/40 before:dark:to-primary-hover/20", // Border/gradient coloring
          "relative inset-0 rounded-4xl bg-background" // Paint background color over card portion
        )}
      >
        <div className="mb-12 flex flex-col gap-y-8 rounded-4xl bg-radial-a px-8 py-12 lg:mb-32 xl:mb-36">
          <div className="flex flex-col gap-y-4 text-center">
            <h2>{t("page-resources-contribute-title")}</h2>
            <p>{t("page-resources-contribute-description")}</p>
          </div>
          <div className="mx-auto grid grid-cols-1 gap-16 md:grid-cols-2">
            {/* TODO: Add issue template for resource listing and redirect to new template */}
            <ButtonLink
              href={new URL(
                "issues/new?template=feature_request.yaml",
                GITHUB_REPO_URL
              ).toString()}
              variant="outline"
              isSecondary
            >
              {t("page-resources-suggest-resource")}
            </ButtonLink>
            <ButtonLink
              href={new URL(
                "issues/new?template=bug_report.yaml",
                GITHUB_REPO_URL
              ).toString()}
              variant="outline"
              isSecondary
            >
              <FaGithub /> {t("page-resources-found-bug")}
            </ButtonLink>
          </div>
        </div>
      </Section>
    </MainArticle>
  )
}

export default ResourcesPage
