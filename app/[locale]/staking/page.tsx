import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { Lang, PageParams, StakingStatsData } from "@/lib/types"

import { type List as ButtonDropdownList } from "@/components/ButtonDropdown"
import ExpandableCard from "@/components/ExpandableCard"
import PageHero from "@/components/Hero/PageHero"
import I18nProvider from "@/components/I18nProvider"
import { Emphasis } from "@/components/IntlStringElements"
import MarkdownCard, { MarkdownCardProps } from "@/components/MarkdownCard"
import StakingHierarchy from "@/components/Staking/StakingHierarchy"
import StakingStatsBox from "@/components/Staking/StakingStatsBox"
import Translation from "@/components/Translation"
import { AccordionContainer } from "@/components/ui/accordion"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Grid } from "@/components/ui/grid"
import { Divider } from "@/components/ui/hr"
import InlineLink from "@/components/ui/Link"
import { ListItem, UnorderedList } from "@/components/ui/list"
import { Section } from "@/components/ui/section"

import { cn } from "@/lib/utils/cn"
import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { computeStakingApr } from "@/lib/utils/staking"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { staking } from "@/data/topics/staking"

import StakingCommunityCallout from "./_components/StakingCommunityCallout"
import StakingPageJsonLD from "./page-jsonld"

import { ContentLayout } from "@/layouts/ContentLayout"
import { getStakedPercentageData, getTotalEthStakedData } from "@/lib/data"
import heroImg from "@/public/images/upgrades/upgrade_rhino.png"

const Page = async (props: { params: Promise<PageParams> }) => {
  const params = await props.params
  const { locale } = params

  setRequestLocale(locale)

  const [totalEthStaked, stakedPercentage] = await Promise.all([
    getTotalEthStakedData(),
    getStakedPercentageData(),
  ])

  if (
    !totalEthStaked ||
    !stakedPercentage ||
    "error" in totalEthStaked ||
    "error" in stakedPercentage
  ) {
    throw new Error("Failed to fetch staking stats data")
  }

  const data: StakingStatsData = {
    totalEthStaked: totalEthStaked.value,
    stakedPercentage: stakedPercentage.value,
    apr: computeStakingApr(totalEthStaked.value),
  }

  // Get i18n messages
  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/staking")
  const messages = pick(allMessages, requiredNamespaces)

  const { contributors, lastEditLocaleTimestamp } =
    await getAppPageContributorInfo("staking", locale as Lang)

  const t = await getTranslations("page-staking")

  const benefits: MarkdownCardProps[] = [
    {
      title: t("page-staking-benefits-1-title"),
      emoji: "💰",
      description: (
        <Translation id="page-staking:page-staking-benefits-1-description" />
      ),
    },
    {
      title: t("page-staking-benefits-2-title"),
      emoji: ":shield:",
      description: t("page-staking-benefits-2-description"),
    },
    {
      title: t("page-staking-benefits-3-title"),
      emoji: "🍃",
      description: t("page-staking-benefits-3-description"),
      ctaLabel: t("page-staking-benefits-3-link"),
      href: "/energy-consumption",
    },
  ]

  const dropdownLinks: ButtonDropdownList = {
    text: t(staking.dropdown.textKey),
    ariaLabel: t(staking.dropdown.ariaLabelKey),
    items: staking.dropdown.items.map((item) => ({
      text: t(item.textKey),
      href: item.href,
      matomo: {
        eventCategory: staking.dropdown.matomoCategory,
        eventAction: "Clicked",
        eventName: item.matomoEvent,
      },
    })),
  }

  const tocItems = {
    whatIsStaking: {
      id: "what-is-staking",
      title: t("page-staking-section-what-title"),
    },
    whyStakeYourEth: {
      id: "why-stake-your-eth",
      title: t("page-staking-section-why-title"),
    },
    howToStakeYourEth: {
      id: "how-to-stake-your-eth",
      title: t("page-staking-toc-how-to-stake-your-eth"),
    },
    comparisonOfOptions: {
      id: "comparison-of-options",
      title: t("page-staking-toc-comparison-of-options"),
    },
    joinTheCommunity: {
      id: "join-the-community",
      title: t("page-staking-join-community"),
    },
    faq: {
      id: "faq",
      title: t("page-staking-toc-faq"),
    },
    further: {
      id: "further",
      title: t("page-staking-toc-further"),
    },
  } as const

  const tocArray = Object.keys(tocItems).map((key) => {
    const { id, title } = tocItems[key as keyof typeof tocItems]
    return { title, url: "#" + id }
  })

  return (
    <>
      <StakingPageJsonLD
        locale={locale}
        lastEditLocaleTimestamp={lastEditLocaleTimestamp}
        contributors={contributors}
      />

      <ContentLayout
        tocItems={tocArray}
        contributors={contributors}
        lastEditLocaleTimestamp={lastEditLocaleTimestamp}
        dropdownLinks={dropdownLinks}
        heroSection={
          <>
            <PageHero
              breadcrumbs={{ slug: "staking" }}
              heroImg={heroImg}
              title={t("page-staking-hero-header")}
              description={t("page-staking-hero-subtitle")}
              variant="no-divider"
            />
            <div className="flex justify-center border-b py-4">
              <StakingStatsBox data={data} />
            </div>
          </>
        }
      >
        <Section id={tocItems.whatIsStaking.id}>
          <h2>{tocItems.whatIsStaking.title}</h2>
          <p>
            <Translation id="page-staking:page-staking-description" />
          </p>
        </Section>

        <Section id={tocItems.whyStakeYourEth.id}>
          <h2>{tocItems.whyStakeYourEth.title}</h2>
          <Grid columns={3}>
            {benefits.map(
              ({ title, description, emoji, ctaLabel, href }, idx) => (
                <MarkdownCard
                  key={idx}
                  emoji={emoji}
                  title={title}
                  description={description}
                >
                  {href && ctaLabel && (
                    <InlineLink href={href}>{ctaLabel}</InlineLink>
                  )}
                </MarkdownCard>
              )
            )}
          </Grid>
        </Section>

        <Section id={tocItems.howToStakeYourEth.id}>
          <h2>{tocItems.howToStakeYourEth.title}</h2>
          <p>{t("page-staking-section-why-p1")}</p>
          <p>{t("page-staking-section-why-p2")}</p>
          <I18nProvider locale={locale} messages={messages}>
            <StakingHierarchy />
          </I18nProvider>
          <p>{t.rich("page-staking-hierarchy-subtext", { em: Emphasis })}</p>
        </Section>

        <Divider />

        <Section id={tocItems.comparisonOfOptions.id}>
          <h2>{tocItems.comparisonOfOptions.title}</h2>
          <p>{t("page-staking-section-comparison-subtitle")}</p>

          <div
            className={cn(
              "grid auto-cols-fr auto-rows-[minmax(64px,auto)] gap-x-12 **:[h4]:text-body-medium",
              // h3 and h4 spacing
              "**:[:is(h3,h4)]:my-space **:[h3]:mt-space-2x",
              // Full-width text-centered button links
              "**:data-[label=button-link]:w-full **:data-[label=button-link]:text-center",
              // Mobile grid area assignment
              "[grid-template-areas:'solo-title''solo-rewards''solo-risks''solo-reqs''solo-cta''saas-title''saas-rewards''saas-risks''saas-reqs''saas-cta''pool-title''pool-rewards''pool-risks''pool-reqs''pool-cta']",
              // Desktop grid area assignment
              "xl:[grid-template-areas:'solo-title_saas-title_pool-title''solo-rewards_saas-rewards_pool-rewards''solo-risks_saas-risks_pool-risks''solo-reqs_saas-reqs_pool-reqs''solo-cta_saas-cta_pool-cta']",
              // ButtonLink spacing and border
              "**:has-data-[label=button-link]:mt-space **:has-data-[label=button-link]:max-xl:border-b **:has-data-[label=button-link]:max-xl:pb-space-2x",
              // h4 section spacing
              "xl:**:[:is([data-label=rewards],[data-label=risks])]:mb-8 xl:**:[:is([data-label=rewards],[data-label=risks])]:border-b xl:**:[:is([data-label=rewards],[data-label=risks])]:pb-8"
            )}
          >
            <h3 className="text-[#be8d10] dark:text-[#f2bb2f]">
              {t("page-staking-dropdown-solo")}
            </h3>
            <div data-label="rewards" className="[grid-area:solo-rewards]">
              <h4>{t("page-staking-section-comparison-rewards-title")}</h4>
              <UnorderedList>
                <ListItem>
                  {t("page-staking-section-comparison-solo-rewards-li1")}
                </ListItem>
                <ListItem>
                  {t("page-staking-section-comparison-solo-rewards-li2")}
                </ListItem>
                <ListItem>
                  {t("page-staking-section-comparison-solo-rewards-li3")}
                </ListItem>
              </UnorderedList>
            </div>
            <div data-label="risks" className="[grid-area:solo-risks]">
              <h4>{t("page-staking-section-comparison-risks-title")}</h4>
              <UnorderedList>
                <ListItem>
                  {t("page-staking-section-comparison-solo-risks-li1")}
                </ListItem>
                <ListItem>
                  {t("page-staking-section-comparison-solo-risks-li2")}
                </ListItem>
                <ListItem>
                  {t("page-staking-section-comparison-solo-risks-li3")}
                </ListItem>
                <ListItem>
                  {t("page-staking-section-comparison-solo-risks-li4")}
                </ListItem>
              </UnorderedList>
            </div>
            <div className="[grid-area:solo-reqs]">
              <h4>{t("page-staking-section-comparison-requirements-title")}</h4>
              <UnorderedList>
                <ListItem>
                  {t("page-staking-section-comparison-solo-requirements-li1")}
                </ListItem>
                <ListItem>
                  <Translation id="page-staking:page-staking-section-comparison-solo-requirements-li2" />
                </ListItem>
                <ListItem>
                  <Translation id="page-staking:page-staking-section-comparison-solo-requirements-li3" />
                </ListItem>
              </UnorderedList>
            </div>
            <div className="[grid-area:solo-cta]">
              <ButtonLink href="/staking/solo/">
                {t("page-staking-more-on-solo")}
              </ButtonLink>
            </div>

            <h3 className="text-[#129e5b] dark:text-[#49de96]">
              {t("page-staking-dropdown-saas")}
            </h3>
            <div data-label="rewards" className="[grid-area:saas-rewards]">
              <h4>{t("page-staking-section-comparison-rewards-title")}</h4>
              <UnorderedList>
                <ListItem>
                  {t("page-staking-section-comparison-saas-rewards-li1")}
                </ListItem>
                <ListItem>
                  {t("page-staking-section-comparison-saas-rewards-li2")}
                </ListItem>
              </UnorderedList>
            </div>
            <div data-label="risks" className="[grid-area:saas-risks]">
              <h4>{t("page-staking-section-comparison-risks-title")}</h4>
              <UnorderedList>
                <ListItem>
                  {t("page-staking-section-comparison-saas-risks-li1")}
                </ListItem>
                <ListItem>
                  {t("page-staking-section-comparison-saas-risks-li2")}
                </ListItem>
              </UnorderedList>
            </div>
            <div className="[grid-area:saas-reqs]">
              <h4>{t("page-staking-section-comparison-requirements-title")}</h4>
              <UnorderedList>
                <ListItem>
                  {t("page-staking-section-comparison-saas-requirements-li1")}
                </ListItem>
                <ListItem>
                  {t("page-staking-section-comparison-saas-requirements-li2")}
                </ListItem>
                <ListItem>
                  {t("page-staking-section-comparison-saas-requirements-li3")}
                </ListItem>
              </UnorderedList>
            </div>
            <div className="[grid-area:saas-cta]">
              <ButtonLink href="/staking/saas">
                {t("page-staking-more-on-saas")}
              </ButtonLink>
            </div>

            <h3 className="text-[#0b83dc] dark:text-[#a9d3f2]">
              {t("page-staking-dropdown-pools")}
            </h3>
            <div data-label="rewards" className="[grid-area:pool-rewards]">
              <h4>{t("page-staking-section-comparison-rewards-title")}</h4>
              <UnorderedList>
                <ListItem>
                  {t("page-staking-section-comparison-pools-rewards-li1")}
                </ListItem>
                <ListItem>
                  <Translation id="page-staking:page-staking-section-comparison-pools-rewards-li2" />
                </ListItem>
                <ListItem>
                  <Translation id="page-staking:page-staking-section-comparison-pools-rewards-li3" />
                </ListItem>
              </UnorderedList>
            </div>
            <div data-label="risks" className="[grid-area:pool-risks]">
              <h4>{t("page-staking-section-comparison-risks-title")}</h4>
              <UnorderedList>
                <ListItem>
                  {t("page-staking-section-comparison-pools-risks-li1")}
                </ListItem>
                <ListItem>
                  <Translation id="page-staking:page-staking-section-comparison-pools-risks-li2" />
                </ListItem>
              </UnorderedList>
            </div>
            <div className="[grid-area:pool-reqs]">
              <h4>{t("page-staking-section-comparison-requirements-title")}</h4>
              <UnorderedList>
                <ListItem>
                  {t("page-staking-section-comparison-pools-requirements-li1")}
                </ListItem>
                <ListItem>
                  {t("page-staking-section-comparison-pools-requirements-li2")}
                </ListItem>
              </UnorderedList>
            </div>
            <div className="[grid-area:pool-cta]">
              <ButtonLink href="/staking/pools/">
                {t("page-staking-more-on-pools")}
              </ButtonLink>
            </div>
          </div>
        </Section>

        <Divider />

        <StakingCommunityCallout id={tocItems.joinTheCommunity.id} />

        <Section id={tocItems.faq.id}>
          <h2>{tocItems.faq.title}</h2>
          <AccordionContainer>
            <ExpandableCard title={t("page-staking-faq-4-question")}>
              <p>{t("page-staking-faq-4-answer-p1")}</p>
              <p>{t("page-staking-faq-4-answer-p2")}</p>
              <p>{t("page-staking-faq-4-answer-p3")}</p>
              <ButtonLink className="self-start" href="/roadmap/merge/">
                {t("page-upgrades-merge-btn")}
              </ButtonLink>
            </ExpandableCard>
            <ExpandableCard title={t("page-staking-faq-5-question")}>
              <p>{t("page-staking-faq-5-answer-p1")}</p>
              <p>{t("page-staking-faq-5-answer-p2")}</p>
              <ButtonLink className="self-start" href="/staking/withdrawals/">
                {t("page-staking-faq-5-answer-link")}
              </ButtonLink>
            </ExpandableCard>
            <ExpandableCard title={t("page-staking-faq-1-question")}>
              {t.rich("page-staking-faq-1-answer", { em: Emphasis })}
            </ExpandableCard>
            <ExpandableCard title={t("page-staking-faq-2-question")}>
              {t("page-staking-faq-2-answer")}
            </ExpandableCard>
            <ExpandableCard title={t("page-staking-faq-3-question")}>
              <p>{t("page-staking-faq-3-answer-p1")}</p>
              <p>
                <Translation id="page-staking:page-staking-faq-3-answer-p2" />
              </p>
            </ExpandableCard>
          </AccordionContainer>
        </Section>

        <Section id={tocItems.further.id}>
          <h2>{tocItems.further.title}</h2>
          <UnorderedList>
            <ListItem>
              <InlineLink href="https://notes.ethereum.org/9l707paQQEeI-GPzVK02lA?view#">
                {t("page-staking-further-reading-2-link")}
              </InlineLink>{" "}
              -{" "}
              <i>{t("page-staking-further-reading-author-vitalik-buterin")}</i>
            </ListItem>
            <ListItem>
              <InlineLink href="https://hackmd.io/@benjaminion/eth2_news">
                {t("page-staking-further-reading-4-link")}
              </InlineLink>{" "}
              - <i>{t("page-staking-further-reading-4-author")}</i>
            </ListItem>
            <ListItem>
              <InlineLink href="https://blog.ethereum.org/2022/01/31/finalized-no-33/">
                {t("page-staking-further-reading-5-link")}
              </InlineLink>{" "}
              - <i>{t("page-staking-further-reading-5-author")}</i>
            </ListItem>
            <ListItem>
              <InlineLink href="https://www.attestant.io/posts/">
                {t("page-staking-further-reading-6-link")}
              </InlineLink>
            </ListItem>
            <ListItem>
              <InlineLink href="https://beaconcha.in/education">
                {t("page-staking-further-reading-8-link")}
              </InlineLink>
            </ListItem>
            <ListItem>
              <InlineLink href="https://launchpad.ethereum.org/en/faq">
                {t("page-staking-further-reading-9-link")}
              </InlineLink>
            </ListItem>
            <ListItem>
              <InlineLink href="https://ethstaker.gitbook.io/ethstaker-knowledge-base/">
                {t("page-staking-further-reading-10-link")}
              </InlineLink>
            </ListItem>
          </UnorderedList>
        </Section>
      </ContentLayout>
    </>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}) {
  const params = await props.params
  const { locale } = params

  const t = await getTranslations("page-staking")

  return await getMetadata({
    locale,
    slug: ["staking"],
    title: t("page-staking-meta-title"),
    description: t("page-staking-meta-description"),
    image: "/images/upgrades/upgrade_rhino.png",
  })
}

export default Page
