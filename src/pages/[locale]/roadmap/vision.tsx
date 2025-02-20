import { GetStaticProps } from "next"
import type {
  ComponentProps,
  ComponentPropsWithRef,
  CSSProperties,
} from "react"

import type { BasePageProps, ChildOnlyProp, Lang, Params } from "@/lib/types"

import Breadcrumbs from "@/components/Breadcrumbs"
import Card from "@/components/Card"
import Emoji from "@/components/Emoji"
import FeedbackCard from "@/components/FeedbackCard"
import InfoBanner from "@/components/InfoBanner"
import MainArticle from "@/components/MainArticle"
import PageHero, {
  type ContentType as PageHeroContent,
} from "@/components/PageHero"
import PageMetadata from "@/components/PageMetadata"
import Trilemma from "@/components/Trilemma"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Divider } from "@/components/ui/divider"
import { Flex, type FlexProps, VStack } from "@/components/ui/flex"
import InlineLink from "@/components/ui/Link"
import { List, ListItem } from "@/components/ui/list"

import { cn } from "@/lib/utils/cn"
import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { screens } from "@/lib/utils/screen"
import { getLocaleTimestamp } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { DEFAULT_LOCALE, LOCALES_CODES } from "@/lib/constants"

import useTranslation from "@/hooks/useTranslation"
import loadNamespaces from "@/i18n/loadNamespaces"
import { usePathname } from "@/i18n/routing"
import oldship from "@/public/images/upgrades/oldship.png"

/**
 * TODO: Consider replacing this with a global style for the `p` element
 */
const Text = (props: Omit<ComponentProps<"p">, "className">) => (
  <p className="mb-[1.45rem]" {...props} />
)

const Page = (props: ChildOnlyProp) => (
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
      "mb-8 text-2xl font-semibold leading-[1.4] md:text-[2rem]",
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
    className="mb-8 mt-10 text-xl font-semibold leading-[1.4] md:text-2xl"
    {...props}
  />
)

const CardContainer = ({ className, ...props }: FlexProps) => (
  <Flex className={cn("-mx-4 flex-wrap", className)} {...props} />
)

const ProblemCardContainer = (props: ChildOnlyProp) => {
  return (
    <CardContainer
      style={{ "--container-max-w": screens.lg } as CSSProperties}
      className="mx-auto max-w-[var(--container-max-w)]"
      {...props}
    />
  )
}

const CentreCard = (props: ComponentPropsWithRef<typeof Card>) => (
  <Card
    className="m-4 min-w-[240px] flex-[1_1_30%] border-0 p-6 text-center"
    {...props}
  />
)

const CentralContent = (props: ChildOnlyProp) => (
  <div className="lg:mx-48" {...props} />
)

const TrilemmaContent = (props: ChildOnlyProp) => (
  <div
    className="my-8 w-full bg-gradient-to-r from-accent-a/10 to-accent-c/10 p-8"
    {...props}
  />
)

export async function getStaticPaths() {
  return {
    paths: LOCALES_CODES.map((locale) => ({ params: { locale } })),
    fallback: false,
  }
}

export const getStaticProps = (async ({ params }) => {
  const { locale = DEFAULT_LOCALE } = params || {}

  const requiredNamespaces = getRequiredNamespacesForPage("/roadmap/vision")

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[2])

  const lastDeployDate = getLastDeployDate()
  const lastDeployLocaleTimestamp = getLocaleTimestamp(
    locale as Lang,
    lastDeployDate
  )

  const messages = await loadNamespaces(locale, requiredNamespaces)

  return {
    props: {
      messages,
      contentNotTranslated,
      lastDeployLocaleTimestamp,
    },
  }
}) satisfies GetStaticProps<BasePageProps, Params>

const VisionPage = () => {
  const { t } = useTranslation(["page-roadmap-vision", "page-upgrades-index"])
  const pathname = usePathname()

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

  const heroContent: PageHeroContent = {
    title: t("page-roadmap-vision-title"),
    header: t("page-roadmap-vision-future"),
    subtitle: t("page-roadmap-vision-subtitle"),
    image: oldship,
    alt: t("page-eth-whats-eth-hero-alt"),
  }

  return (
    <Page>
      <PageMetadata
        title={t("page-roadmap-vision-meta-title")}
        description={t("page-roadmap-vision-meta-desc")}
      />
      <PageHero content={heroContent} />
      <Divider />
      <PageContent>
        <Breadcrumbs slug={pathname} startDepth={1} />
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
              {t("page-upgrades-index:page-upgrades-proof-stake-link")}
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
          <InfoBanner>
            <Text>{t("page-roadmap-vision-sustainability-desc-8")}</Text>
            <ButtonLink href="/roadmap/merge/">
              {t("page-upgrades-index:page-upgrades-merge-btn")}
            </ButtonLink>
          </InfoBanner>
        </CentralContent>
      </PageContent>
      <Divider />
      <FeedbackCard />
    </Page>
  )
}

export default VisionPage
