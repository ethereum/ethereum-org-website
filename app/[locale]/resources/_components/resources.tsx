"use client"

import { motion } from "framer-motion"
import { FaGithub } from "react-icons/fa6"

import type { MetricReturnData } from "@/lib/types"

import BannerNotification from "@/components/Banners/BannerNotification"
import { HubHero } from "@/components/Hero"
import StackIcon from "@/components/icons/stack.svg"
import MainArticle from "@/components/MainArticle"
import PageMetadata from "@/components/PageMetadata"
import { ResourceItem, ResourcesContainer } from "@/components/Resources"
import { useResources } from "@/components/Resources/useResources"
import Translation from "@/components/Translation"
import { ButtonLink } from "@/components/ui/buttons/Button"
import Link from "@/components/ui/Link"
import { Section } from "@/components/ui/section"

import { cn } from "@/lib/utils/cn"

import { GITHUB_REPO_URL } from "@/lib/constants"

import { useActiveHash } from "@/hooks/useActiveHash"
import { useTranslation } from "@/hooks/useTranslation"
import heroImg from "@/public/images/heroes/guides-hub-hero.jpg"

interface ResourcesPageProps {
  txCostsMedianUsd: MetricReturnData
}

const ResourcesPage = ({ txCostsMedianUsd }: ResourcesPageProps) => {
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

      <BannerNotification shouldShow>
        {t("page-resources-banner-notification-message")}{" "}
        <Link
          href={new URL(
            "issues/new?title=Resource%20dashboard%20feedback",
            GITHUB_REPO_URL
          ).toString()}
          className="visited:text-white"
        >
          {t("page-resources-share-feedback")}
        </Link>
      </BannerNotification>

      <HubHero
        title={t("page-resources-hero-title")}
        header={t("page-resources-hero-header")}
        description={t("page-resources-hero-description")}
        heroImg={heroImg}
      />

      <div className="sticky top-1 z-sticky my-8 flex flex-col items-center gap-3 py-4 text-center md:top-6 md:px-2">
        <div className="my-2 text-body-medium">
          {t("page-resources-whats-on-this-page")}
        </div>
        <nav className="mx-4 flex max-w-full gap-1 overflow-x-auto bg-background p-2 shadow md:max-w-[calc(100%-2rem)] md:rounded-2xl md:border md:p-0.5 md:shadow-lg">
          {resourceSections.map(({ key, title, icon }) => (
            <ButtonLink
              key={key}
              href={`#${key}`}
              variant="ghost"
              isSecondary
              className={cn(
                "relative text-nowrap rounded-xl px-4 py-2 text-sm [&_svg]:shrink-0 [&_svg]:text-sm",
                activeSection === key && "!text-primary"
              )}
            >
              {activeSection === key && (
                <motion.div
                  layoutId="active-section-highlight"
                  className="absolute inset-0 z-0 rounded-xl bg-primary-low-contrast"
                />
              )}
              {icon && <span className="z-10 text-lg">{icon}</span>}
              <span className="relative z-10">{title}</span>
            </ButtonLink>
          ))}
        </nav>
      </div>

      {resourceSections.map(({ key, icon, title: sectionTitle, boxes }) => (
        <section id={key} key={key} className="mb-16 scroll-mt-40">
          <div className="group flex w-full items-center gap-3 border-b bg-transparent px-4 py-6">
            <div className="grid size-12 place-items-center rounded-lg border border-border-low-contrast text-2xl [&_svg]:shrink-0">
              {icon || <StackIcon />}
            </div>
            <h2 className="flex-1 text-start font-black">{sectionTitle}</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 px-4 pb-12 pt-8 md:pb-12 md:pt-8 lg:grid-cols-2">
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
