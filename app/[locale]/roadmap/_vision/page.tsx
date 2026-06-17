import { type ComponentProps, type ComponentPropsWithRef } from "react"
import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { ChildOnlyProp, Lang, PageParams } from "@/lib/types"

import Breadcrumbs from "@/components/Breadcrumbs"
import Emoji from "@/components/Emoji"
import FeedbackCard from "@/components/FeedbackCard"
import FileContributors from "@/components/FileContributors"
import PageHero from "@/components/Hero/PageHero"
import I18nProvider from "@/components/I18nProvider"
import MainArticle from "@/components/MainArticle"
import MarkdownCard from "@/components/MarkdownCard"
import Trilemma from "@/components/Trilemma"
import { Alert } from "@/components/ui/alert"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Divider } from "@/components/ui/divider"
import { Flex, type FlexProps, VStack } from "@/components/ui/flex"
import InlineLink from "@/components/ui/Link"
import { List, ListItem } from "@/components/ui/list"

import { cn } from "@/lib/utils/cn"
import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import RoadmapVisionPageJsonLD from "./page-jsonld"

import heroImg from "@/public/images/upgrades/oldship.png"

const SLUG = "/roadmap/vision"

const Text = (props: Omit<ComponentProps<"p">, "className">) => (
  <p className="mb-[1.45rem]" {...props} />
)

const PageContainer = (props: ChildOnlyProp) => (
  <VStack className="w-full gap-0" {...props} asChild>
    <MainArticle {...props} />
  </VStack>
)

const PageContent = (props: ChildOnlyProp) => (
  <Flex className="w-full flex-col gap-8 px-8 py-4" {...props} />
)

const H2 = ({ className, ...props }: ComponentProps<"h2">) => (
  <h2
    className={cn(
      "mb-8 text-2xl leading-[1.4] font-semibold md:text-[2rem]",
      className
    )}
    {...props}
  />
)

const CenterH2 = (props: Omit<ComponentProps<"h2">, "className">) => (
  <H2 className="text-center" {...props} />
)

const H3 = (props: Omit<ComponentProps<"h3">, "className">) => (
  <h3
    className="mt-10 mb-8 text-xl leading-[1.4] font-semibold md:text-2xl"
    {...props}
  />
)

const CardContainer = ({ className, ...props }: FlexProps) => (
  <Flex className={cn("-mx-4 flex-wrap", className)} {...props} />
)

const ProblemCardContainer = (props: ChildOnlyProp) => (
  <CardContainer className="mx-auto max-w-screen-lg" {...props} />
)

const CentreCard = (props: ComponentPropsWithRef<typeof MarkdownCard>) => (
  <MarkdownCard
    className="m-4 min-w-[240px] flex-[1_1_30%] border-0 p-6 text-center"
    {...props}
  />
)

const CentralContent = (props: ChildOnlyProp) => (
  <div className="lg:mx-48" {...props} />
)

const TrilemmaContent = (props: ChildOnlyProp) => (
  <div
    className="my-8 w-full bg-linear-to-r from-accent-a/10 to-accent-c/10 p-8"
    {...props}
  />
)

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage(SLUG)
  const messages = pick(allMessages, requiredNamespaces)

  const { contributors, lastEditLocaleTimestamp } =
    await getAppPageContributorInfo("roadmap/vision", locale as Lang)

  const t = await getTranslations("page-roadmap-vision")
  const tUpgrades = await getTranslations("page-upgrades-index")

  const paths = [
    {
      emoji: ":vertical_traffic_light:",
      title: t("page-roadmap-vision-title-1"),
      description: t("page-roadmap-vision-desc-1"),
    },
    {
      emoji: ":minidisc:",
      title: t("page-roadmap-vision-title-2"),
      description: t("page-roadmap-vision-desc-2"),
    },
  ]

  return (
    <I18nProvider locale={locale} messages={messages}>
      <RoadmapVisionPageJsonLD
        locale={locale}
        lastEditLocaleTimestamp={lastEditLocaleTimestamp}
        contributors={contributors}
      />
      <PageContainer>
        <PageHero
          header={t("page-roadmap-vision-title")}
          heroImg={heroImg}
          title={t("page-roadmap-vision-future")}
          description={t("page-roadmap-vision-subtitle")}
        />
        <PageContent>
          <Breadcrumbs slug={SLUG} startDepth={1} />
          <CentralContent>
            <CenterH2>{t("page-roadmap-vision-upgrade-needs")}</CenterH2>
            <Text>{t("page-roadmap-vision-upgrade-needs-desc")}</Text>
            <Text>{t("page-roadmap-vision-upgrade-needs-desc-2")}</Text>
            <Text>{t("page-roadmap-vision-upgrade-needs-desc-3")} </Text>
            <List className="list-disc">
              <ListItem>
                <InlineLink href="https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum">
                  {t("page-roadmap-vision-2022")}
                </InlineLink>
              </ListItem>
              <ListItem>
                <InlineLink href="https://trent.mirror.xyz/82eyq_NXZzzqFmCNXiKJgSdayf6omCW7BgDQIneyPoA">
                  {t("page-roadmap-vision-2021-updates")}
                </InlineLink>
              </ListItem>
              <ListItem>
                <InlineLink href="https://tim.mirror.xyz/CHQtTJb1NDxCK41JpULL-zAJe7YOtw-m4UDw6KDju6c">
                  {t("page-roadmap-vision-2021")}
                </InlineLink>
              </ListItem>
              <ListItem>
                <InlineLink href="https://blog.ethereum.org/2015/03/03/ethereum-launch-process/">
                  {t("page-roadmap-vision-upgrade-needs-serenity")}
                </InlineLink>
              </ListItem>
              <ListItem>
                <InlineLink href="https://blog.ethereum.org/2014/01/15/slasher-a-punitive-proof-of-stake-algorithm/">
                  {t("page-roadmap-vision-2014")}
                </InlineLink>
              </ListItem>
            </List>
            <Text>{t("page-roadmap-vision-upgrade-needs-desc-5")}</Text>
            <Text>{t("page-roadmap-vision-upgrade-needs-desc-6")}</Text>
          </CentralContent>
        </PageContent>
        <Divider />
        <PageContent>
          <CenterH2>{t("page-roadmap-vision-problems")}</CenterH2>
          <ProblemCardContainer>
            {paths.map((path, idx) => (
              <CentreCard
                key={idx}
                emoji={path.emoji}
                title={path.title}
                description={path.description}
              />
            ))}
          </ProblemCardContainer>
        </PageContent>
        <TrilemmaContent>
          <Trilemma />
        </TrilemmaContent>
        <Divider />
        <PageContent>
          <CentralContent>
            <CenterH2>{t("page-roadmap-vision-understanding")}</CenterH2>
            <H3>
              {t("page-roadmap-vision-scalability")} <Emoji text=":rocket:" />
            </H3>
            <Text>{t("page-roadmap-vision-scalability-desc")}</Text>
            <Text>{t("page-roadmap-vision-scalability-desc-3")}</Text>
            <Text>
              {t("page-roadmap-vision-scalability-desc-4")}{" "}
              <InlineLink href="/roadmap/danksharding/">
                {t("page-roadmap-vision-danksharding")}
              </InlineLink>{" "}
            </Text>
            <H3>
              {t("page-roadmap-vision-security")} <Emoji text=":shield:" />
            </H3>
            <Text>{t("page-roadmap-vision-security-desc")}</Text>
            <Text>
              {t("page-roadmap-vision-security-desc-3")}{" "}
              <InlineLink href="/developers/docs/consensus-mechanisms/pos/">
                {tUpgrades("page-upgrades-proof-stake-link")}
              </InlineLink>{" "}
            </Text>
            <Text>
              {t("page-roadmap-vision-security-desc-5")}{" "}
              <InlineLink href="/developers/docs/consensus-mechanisms/pow/">
                {t("page-roadmap-vision-security-desc-5-link")}
              </InlineLink>
            </Text>
            <Text>{t("page-roadmap-vision-security-desc-10")}</Text>
            <Text>
              {t("page-roadmap-vision-security-validator")}{" "}
              <InlineLink href="/run-a-node/">
                {t("page-roadmap-vision-ethereum-node")}
              </InlineLink>
            </Text>
            <ButtonLink href="/staking/">
              {t("page-roadmap-vision-security-staking")}
            </ButtonLink>
            <H3>
              {t("page-roadmap-vision-sustainability")}{" "}
              <Emoji text=":evergreen_tree:" />
            </H3>
            <Text>{t("page-roadmap-vision-sustainability-subtitle")}</Text>
            <Text>
              {t("page-roadmap-vision-sustainability-desc-1")}{" "}
              <InlineLink href="/developers/docs/consensus-mechanisms/pow/mining/">
                {t("page-roadmap-vision-mining")}
              </InlineLink>
            </Text>
            <Text>
              {t("page-roadmap-vision-sustainability-desc-2")}{" "}
              <InlineLink href="/staking/">
                {t("page-roadmap-vision-staking-lower")}
              </InlineLink>
            </Text>
            <Text>{t("page-roadmap-vision-sustainability-desc-3")}</Text>
            <Alert variant="update">
              <div>
                <Text>{t("page-roadmap-vision-sustainability-desc-8")}</Text>
                <ButtonLink href="/roadmap/merge/">
                  {tUpgrades("page-upgrades-merge-btn")}
                </ButtonLink>
              </div>
            </Alert>
          </CentralContent>
          <FileContributors
            className="my-10 border-t"
            contributors={contributors}
            lastEditLocaleTimestamp={lastEditLocaleTimestamp}
          />
        </PageContent>
        <Divider />
        <FeedbackCard />
      </PageContainer>
    </I18nProvider>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const params = await props.params
  const { locale } = params

  const t = await getTranslations("page-roadmap-vision")

  return await getMetadata({
    locale,
    slug: ["roadmap", "vision"],
    title: t("page-roadmap-vision-meta-title"),
    description: t("page-roadmap-vision-meta-desc"),
  })
}

export default Page
