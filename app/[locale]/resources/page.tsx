import { getTranslations } from "next-intl/server"

import { Lang } from "@/lib/types"

import BannerNotification from "@/components/Banners/BannerNotification"
import { HubHero } from "@/components/Hero"
import Github from "@/components/icons/github.svg"
import StackIcon from "@/components/icons/stack.svg"
import MainArticle from "@/components/MainArticle"
import Translation from "@/components/Translation"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Stack, VStack } from "@/components/ui/flex"
import Link from "@/components/ui/Link"
import { Section } from "@/components/ui/section"

import { cn } from "@/lib/utils/cn"
import { dataLoader } from "@/lib/utils/data/dataLoader"
import { getMetadata } from "@/lib/utils/metadata"

import { GITHUB_REPO_URL } from "@/lib/constants"
import { BASE_TIME_UNIT } from "@/lib/constants"

import ResourcesNav from "./_components/ResourcesNav"
import { ResourceItem, ResourcesContainer } from "./_components/ResourcesUI"
import { getResources } from "./utils"

import { fetchGrowThePie } from "@/lib/api/fetchGrowThePie"
import heroImg from "@/public/images/heroes/guides-hub-hero.jpg"

// In seconds
const REVALIDATE_TIME = BASE_TIME_UNIT * 1
const EVENT_CATEGORY = "dashboard"

const loadData = dataLoader(
  [["growThePieData", fetchGrowThePie]],
  REVALIDATE_TIME * 1000
)

const Page = async ({ params }: { params: Promise<{ locale: Lang }> }) => {
  const { locale } = await params

  const t = await getTranslations({ locale, namespace: "page-resources" })

  // Load data
  const [growThePieData] = await loadData()
  const { txCostsMedianUsd } = growThePieData

  const resourceSections = await getResources({ txCostsMedianUsd })

  return (
    <MainArticle className="relative flex flex-col">
      <BannerNotification shouldShow className="text-center max-md:flex-col">
        {t("page-resources-banner-notification-message")}{" "}
        <Link
          href={new URL(
            "issues/new?title=Resource%20dashboard%20feedback",
            GITHUB_REPO_URL
          ).toString()}
          className="visited:text-white"
          customEventOptions={{
            eventCategory: EVENT_CATEGORY,
            eventAction: "links",
            eventName: "Ethereum.org Github Page Feedback",
          }}
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

      <Stack className="gap-4 px-2 py-6 md:gap-8 md:px-4 lg:px-8 xl:gap-11">
        <div className="sticky top-5 z-docked flex flex-col items-center gap-3 text-center md:top-6 md:px-2">
          <div className="my-2 text-body-medium">
            {t("page-resources-whats-on-this-page")}
          </div>
          <ResourcesNav
            resourceSections={resourceSections}
            eventCategory={EVENT_CATEGORY}
          />
        </div>
        <Stack className="gap-11 pt-12 md:gap-16 lg:gap-24">
          {resourceSections.map(({ key, icon, title: sectionTitle, boxes }) => (
            <Stack key={key} asChild>
              <section id={key} className="scroll-mt-40 gap-8 md:gap-6">
                <div className="group flex w-full items-center gap-4 border-b bg-transparent px-2 py-4">
                  <div className="grid size-12 place-items-center rounded-lg border border-border-low-contrast text-2xl [&_svg]:shrink-0">
                    {icon || <StackIcon />}
                  </div>
                  <h2 className="flex-1 text-start font-black">
                    {sectionTitle}
                  </h2>
                </div>
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-y-6">
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
                          {items.map(({ className, ...item }) => (
                            <ResourceItem
                              item={item}
                              key={item.title}
                              className={className}
                            />
                          ))}
                        </ResourcesContainer>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </Stack>
          ))}
        </Stack>

        <VStack className="gap-4 py-16">
          <div className="text-center font-bold">
            <Translation id="page-resources:page-resources-find-more" />
          </div>
          <ButtonLink
            href="https://ethereumdashboards.com"
            size="lg"
            customEventOptions={{
              eventCategory: EVENT_CATEGORY,
              eventAction: "links",
              eventName: "ethereumdashboards.com",
            }}
          >
            ethereumdashboards.com
          </ButtonLink>
        </VStack>

        <Section
          id="contribute"
          className="relative rounded-4xl border border-body/5 bg-background"
        >
          <VStack className="rounded-4xl bg-radial-a px-4 py-6 md:py-12">
            <Stack className="max-w-xl gap-y-10 py-6 lg:max-w-[700px]">
              <div className="flex flex-col gap-y-4 text-center">
                <h2>{t("page-resources-contribute-title")}</h2>
                <p className="text-lg">
                  {t("page-resources-contribute-description")}
                </p>
              </div>
              <div className="mx-auto grid grid-cols-1 gap-x-3 gap-y-4 md:grid-cols-2">
                {/* TODO: Add issue template for resource listing and redirect to new template */}
                <ButtonLink
                  href={new URL(
                    "issues/new?template=feature_request.yaml",
                    GITHUB_REPO_URL
                  ).toString()}
                  variant="outline"
                  isSecondary
                  customEventOptions={{
                    eventCategory: EVENT_CATEGORY,
                    eventAction: "links",
                    eventName: "Ethereum.org Github Feature Request",
                  }}
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
                  customEventOptions={{
                    eventCategory: EVENT_CATEGORY,
                    eventAction: "links",
                    eventName: "Ethereum.org Github Bug Report",
                  }}
                >
                  <Github /> {t("page-resources-found-bug")}
                </ButtonLink>
              </div>
            </Stack>
          </VStack>
        </Section>
      </Stack>
    </MainArticle>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const t = await getTranslations({ locale, namespace: "page-resources" })

  return await getMetadata({
    locale,
    slug: ["resources"],
    title: t("page-resources-meta-title"),
    description: t("page-resources-meta-description"),
    image: "/images/heroes/guides-hub-hero.jpg",
  })
}

export default Page
