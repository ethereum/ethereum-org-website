import { GetStaticProps } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { FaGithub } from "react-icons/fa6"

import type { BasePageProps, Lang } from "@/lib/types"

import { HubHero } from "@/components/Hero"
import StackIcon from "@/components/icons/stack.svg"
import MainArticle from "@/components/MainArticle"
import PageMetadata from "@/components/PageMetadata"
import { ResourceItem, ResourcesContainer } from "@/components/Resources"
import { useResources } from "@/components/Resources/useResources"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button, ButtonLink } from "@/components/ui/buttons/Button"
import { Section } from "@/components/ui/section"

import { cn } from "@/lib/utils/cn"
import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import heroImg from "@/public/images/heroes/guides-hub-hero.jpg"

export const getStaticProps = (async ({ locale }) => {
  const requiredNamespaces = getRequiredNamespacesForPage("/resources")

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])

  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      contentNotTranslated,
      lastDeployLocaleTimestamp,
    },
  }
}) satisfies GetStaticProps<BasePageProps>

const ResourcesPage = () => {
  const { t } = useTranslation("page-resources")
  const resourceSections = useResources()

  return (
    <MainArticle className="relative flex flex-col">
      <PageMetadata
        title={t("page-resources-meta-title")}
        description={t("page-resources-meta-description")}
      />

      <HubHero
        title={t("page-resources-hero-title")}
        header={t("page-resources-hero-header")}
        description={t("page-resources-hero-description")}
        heroImg={heroImg}
      />

      {/* TODO: Section shortcut bar */}

      <Accordion
        type="multiple"
        defaultValue={resourceSections.map(({ key }) => key)}
      >
        {resourceSections.map(({ key, icon, title, boxes }) => (
          <AccordionItem value={key} key={key}>
            <AccordionTrigger asChild hideIcon>
              <div className="flex w-full items-center gap-3 border-b bg-transparent px-4 py-6">
                <div className="grid size-12 place-items-center rounded-lg border border-border-low-contrast">
                  {icon || <StackIcon className="text-2xl" />}
                </div>
                <h2 className="flex-1 text-start font-black">{title}</h2>
                <Button
                  variant="outline"
                  size="sm"
                  className="my-auto h-fit text-nowrap rounded-full border-border-low-contrast px-4 py-1.5 font-normal uppercase text-body"
                >
                  <span className="max-md:hidden">{t("common:close")}</span> -
                </Button>
              </div>
            </AccordionTrigger>
            <AccordionContent className="grid grid-cols-1 gap-8 pb-12 pt-8 md:pb-12 md:pt-8 lg:grid-cols-2">
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
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="align-center mx-auto flex w-fit flex-col gap-4 py-16 text-center">
        <p className="font-bold">{t("page-resources-find-more")}</p>
        <ButtonLink href="https://ethereumdashboards.com" size="lg">
          https://ethereumdashboards.com
        </ButtonLink>
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
            <ButtonLink href="http" variant="outline" isSecondary>
              {t("page-resources-suggest-resource")}
            </ButtonLink>
            <ButtonLink href="" variant="outline" isSecondary>
              <FaGithub /> {t("page-resources-found-bug")}
            </ButtonLink>
          </div>
        </div>
      </Section>
    </MainArticle>
  )
}

export default ResourcesPage
