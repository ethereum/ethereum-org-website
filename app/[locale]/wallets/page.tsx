import { PropsWithChildren } from "react"
import { pick } from "lodash"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"

import type { CommitHistory, Lang, PageParams } from "@/lib/types"

import Callout from "@/components/Callout"
import { Faq, FaqContent, FaqItem, FaqTrigger } from "@/components/Faq"
import FeedbackCard from "@/components/FeedbackCard"
import FileContributors from "@/components/FileContributors"
import I18nProvider from "@/components/I18nProvider"
import ListenToPlayer from "@/components/ListenToPlayer"
import MainArticle from "@/components/MainArticle"
import PageHero from "@/components/PageHero"
import { StandaloneQuizWidget } from "@/components/Quiz/QuizWidget"
import { Simulator } from "@/components/Simulator"
import Translation from "@/components/Translation"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Divider } from "@/components/ui/divider"
import Link from "@/components/ui/Link"

import { cn } from "@/lib/utils/cn"
import { getAppPageContributorInfo } from "@/lib/utils/contributors"
import { getMetadata } from "@/lib/utils/metadata"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { walletOnboardingSimData } from "@/data/WalletSimulatorData"

import WalletsPageJsonLD from "./page-jsonld"

import DappsImage from "@/public/images/doge-computer.png"
import ETHImage from "@/public/images/eth-logo.png"
import HeroImage from "@/public/images/wallets/wallet-hero.png"

type SectionProps = PropsWithChildren<{
  id?: string
  className?: string
  contentClassName?: string
}>

const Section = ({
  id,
  className,
  contentClassName,
  children,
}: SectionProps) => (
  <section id={id} className={cn("w-full px-8 py-12", className)}>
    <div
      className={cn(
        "mx-auto flex w-full max-w-5xl flex-col gap-6 lg:gap-8",
        contentClassName
      )}
    >
      {children}
    </div>
  </section>
)

const Page = async ({ params }: { params: PageParams }) => {
  const { locale } = params
  const t = await getTranslations({ locale, namespace: "page-wallets" })

  setRequestLocale(locale)

  const allMessages = await getMessages({ locale })
  const requiredNamespaces = getRequiredNamespacesForPage("/wallets")
  const messages = pick(allMessages, requiredNamespaces)

  const commitHistoryCache: CommitHistory = {}
  const { contributors, lastEditLocaleTimestamp } =
    await getAppPageContributorInfo(
      "wallets",
      locale as Lang,
      commitHistoryCache
    )

  const heroButtons =
    locale === "en"
      ? [
          {
            toId: "what-is-an-ethereum-wallet",
            content: t("page-wallets-hero-primary-cta"),
            matomo: {
              eventCategory: "Header buttons",
              eventAction: "click",
              eventName: "Learn_wallet_fundamentals",
            },
          },
          {
            href: "/wallets/find-wallet/",
            content: t("page-wallets-find-wallet-link"),
            matomo: {
              eventCategory: "Header buttons",
              eventAction: "click",
              eventName: "Find_wallet",
            },
            variant: "outline" as const,
          },
        ]
      : [
          {
            href: "/wallets/find-wallet/",
            content: t("page-wallets-find-wallet-link"),
            matomo: {
              eventCategory: "Header button",
              eventAction: "click",
              eventName: "Find_wallet",
            },
          },
        ]

  const quickLinkGroups = [
    {
      heading: t("page-wallets-quick-links-learn-heading"),
      links: [
        {
          label: t("page-wallets-quick-links-learn-item-1"),
          href: "#how-ethereum-wallets-work",
        },
        {
          label: t("page-wallets-quick-links-learn-item-2"),
          href: "#wallet-types",
        },
        {
          label: t("page-wallets-quick-links-learn-item-3"),
          href: "#how-to-keep-your-wallet-safe",
        },
      ],
    },
    {
      heading: t("page-wallets-quick-links-setup-heading"),
      links: [
        {
          label: t("page-wallets-quick-links-setup-item-1"),
          href: "#ethereum-wallet-setup-demo",
        },
        {
          label: t("page-wallets-quick-links-setup-item-2"),
          href: "#new-eth-wallet-features",
        },
        {
          label: t("page-wallets-quick-links-setup-item-3"),
          href: "#compare-wallets",
        },
      ],
    },
  ]

  const walletActions = [
    {
      title: t("page-wallets-wallet-does-item-1-title"),
      description: t("page-wallets-wallet-does-item-1-desc"),
    },
    {
      title: t("page-wallets-wallet-does-item-2-title"),
      description: t("page-wallets-wallet-does-item-2-desc"),
    },
    {
      title: t("page-wallets-wallet-does-item-3-title"),
      description: t("page-wallets-wallet-does-item-3-desc"),
    },
    {
      title: t("page-wallets-wallet-does-item-4-title"),
      description: t("page-wallets-wallet-does-item-4-desc"),
    },
    {
      title: t("page-wallets-wallet-does-item-5-title"),
      description: t("page-wallets-wallet-does-item-5-desc"),
    },
    {
      title: t("page-wallets-wallet-does-item-6-title"),
      description: t("page-wallets-wallet-does-item-6-desc"),
    },
  ]

  const walletEmailComparison = [
    {
      wallet: {
        title: t("page-wallets-comparison-wallet-app-title"),
        description: t("page-wallets-comparison-wallet-app-desc"),
      },
      email: {
        title: t("page-wallets-comparison-email-app-title"),
        description: t("page-wallets-comparison-email-app-desc"),
      },
    },
    {
      wallet: {
        title: t("page-wallets-comparison-wallet-account-title"),
        description: t("page-wallets-comparison-wallet-account-desc"),
      },
      email: {
        title: t("page-wallets-comparison-email-account-title"),
        description: t("page-wallets-comparison-email-account-desc"),
      },
    },
    {
      wallet: {
        title: t("page-wallets-comparison-wallet-address-title"),
        description: t("page-wallets-comparison-wallet-address-desc"),
      },
      email: {
        title: t("page-wallets-comparison-email-address-title"),
        description: t("page-wallets-comparison-email-address-desc"),
      },
    },
    {
      wallet: {
        title: t("page-wallets-comparison-wallet-private-title"),
        description: t("page-wallets-comparison-wallet-private-desc"),
      },
      email: {
        title: t("page-wallets-comparison-email-password-title"),
        description: t("page-wallets-comparison-email-password-desc"),
      },
    },
    {
      wallet: {
        title: t("page-wallets-comparison-wallet-recovery-title"),
        description: t("page-wallets-comparison-wallet-recovery-desc"),
      },
      email: {
        title: t("page-wallets-comparison-email-reset-title"),
        description: t("page-wallets-comparison-email-reset-desc"),
      },
    },
  ]

  const walletResponsibilities = [
    t("page-wallets-key-concept-wallet-responsibility-1"),
    t("page-wallets-key-concept-wallet-responsibility-2"),
    t("page-wallets-key-concept-wallet-responsibility-3"),
  ]

  const walletTypes = [
    {
      goal: t("page-wallets-wallet-types-row-1-goal"),
      type: t("page-wallets-wallet-types-row-1-type"),
      description: t("page-wallets-wallet-types-row-1-desc"),
    },
    {
      goal: t("page-wallets-wallet-types-row-2-goal"),
      type: t("page-wallets-wallet-types-row-2-type"),
      description: t("page-wallets-wallet-types-row-2-desc"),
    },
    {
      goal: t("page-wallets-wallet-types-row-3-goal"),
      type: t("page-wallets-wallet-types-row-3-type"),
      description: t("page-wallets-wallet-types-row-3-desc"),
    },
    {
      goal: t("page-wallets-wallet-types-row-4-goal"),
      type: t("page-wallets-wallet-types-row-4-type"),
      description: t("page-wallets-wallet-types-row-4-desc"),
    },
    {
      goal: t("page-wallets-wallet-types-row-5-goal"),
      type: t("page-wallets-wallet-types-row-5-type"),
      description: t("page-wallets-wallet-types-row-5-desc"),
    },
    {
      goal: t("page-wallets-wallet-types-row-6-goal"),
      type: t("page-wallets-wallet-types-row-6-type"),
      description: t("page-wallets-wallet-types-row-6-desc"),
    },
  ]

  const nonCustodialPoints = [
    t("page-wallets-custodial-non-bullet-1"),
    t("page-wallets-custodial-non-bullet-2"),
    t("page-wallets-custodial-non-bullet-3"),
  ]

  const custodialPoints = [
    t("page-wallets-custodial-cust-bullet-1"),
    t("page-wallets-custodial-cust-bullet-2"),
    t("page-wallets-custodial-cust-bullet-3"),
  ]

  const securityTips = [
    {
      title: t("page-wallets-safety-tip-1-title"),
      description: t("page-wallets-safety-tip-1-desc"),
      why: t("page-wallets-safety-tip-1-why"),
      points: [
        t("page-wallets-safety-tip-1-point-1"),
        t("page-wallets-safety-tip-1-point-2"),
        t("page-wallets-safety-tip-1-point-3"),
      ],
    },
    {
      title: t("page-wallets-safety-tip-2-title"),
      description: t("page-wallets-safety-tip-2-desc"),
      why: t("page-wallets-safety-tip-2-why"),
      points: [
        t("page-wallets-safety-tip-2-point-1"),
        t("page-wallets-safety-tip-2-point-2"),
        t("page-wallets-safety-tip-2-point-3"),
      ],
    },
    {
      title: t("page-wallets-safety-tip-3-title"),
      description: t("page-wallets-safety-tip-3-desc"),
      why: t("page-wallets-safety-tip-3-why"),
      points: [
        t("page-wallets-safety-tip-3-point-1"),
        t("page-wallets-safety-tip-3-point-2"),
        t("page-wallets-safety-tip-3-point-3"),
      ],
    },
    {
      title: t("page-wallets-safety-tip-4-title"),
      description: t("page-wallets-safety-tip-4-desc"),
      why: t("page-wallets-safety-tip-4-why"),
      points: [
        t("page-wallets-safety-tip-4-point-1"),
        t("page-wallets-safety-tip-4-point-2"),
        t("page-wallets-safety-tip-4-point-3"),
      ],
    },
  ]

  const featuresComparison = [
    {
      before: t("page-wallets-features-row-1-before"),
      after: t("page-wallets-features-row-1-after"),
    },
    {
      before: t("page-wallets-features-row-2-before"),
      after: t("page-wallets-features-row-2-after"),
    },
    {
      before: t("page-wallets-features-row-3-before"),
      after: t("page-wallets-features-row-3-after"),
    },
    {
      before: t("page-wallets-features-row-4-before"),
      after: t("page-wallets-features-row-4-after"),
    },
    {
      before: t("page-wallets-features-row-5-before"),
      after: t("page-wallets-features-row-5-after"),
    },
    {
      before: t("page-wallets-features-row-6-before"),
      after: t("page-wallets-features-row-6-after"),
    },
  ]

  const faqs = [
    {
      question: t("page-wallets-faq-1-question"),
      answerId: "page-wallets:page-wallets-faq-1-answer",
    },
    {
      question: t("page-wallets-faq-2-question"),
      answerId: "page-wallets:page-wallets-faq-2-answer",
    },
    {
      question: t("page-wallets-faq-3-question"),
      answerId: "page-wallets:page-wallets-faq-3-answer",
    },
    {
      question: t("page-wallets-faq-4-question"),
      answerId: "page-wallets:page-wallets-faq-4-answer",
    },
    {
      question: t("page-wallets-faq-5-question"),
      answerId: "page-wallets:page-wallets-faq-5-answer",
    },
  ]

  const heroContent = {
    title: t("page-wallets-hero-eyebrow"),
    header: t("page-wallets-hero-heading"),
    subtitle: t("page-wallets-hero-subtitle"),
    image: HeroImage,
    alt: t("page-wallets-hero-alt"),
    buttons: heroButtons,
  }

  return (
    <I18nProvider locale={locale} messages={messages}>
      <WalletsPageJsonLD
        locale={locale}
        lastEditLocaleTimestamp={lastEditLocaleTimestamp}
        contributors={contributors}
      />
      <MainArticle className="mx-auto flex w-full flex-col items-center">
        <PageHero content={heroContent} isReverse />

        <Section contentClassName="gap-10">
          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-body-medium">
              {t("page-wallets-quick-links-title")}
            </p>
            <div className="flex flex-col gap-6">
              {quickLinkGroups.map((group, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <p className="text-lg font-semibold text-body">
                    {group.heading}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-md leading-relaxed">
                    {group.links.map((link, linkIdx) => (
                      <span key={link.href} className="flex items-center gap-4">
                        {linkIdx > 0 && (
                          <span aria-hidden className="text-body-light">
                            &bull;
                          </span>
                        )}
                        <Link
                          href={link.href}
                          className="font-medium text-primary underline-offset-4 hover:underline"
                        >
                          {link.label}
                        </Link>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section id="what-is-an-ethereum-wallet">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-semibold leading-tight md:text-[2.5rem]">
              {t("page-wallets-what-is-title")}
            </h2>
            <p className="text-lg leading-relaxed text-body">
              {t("page-wallets-what-is-description-1")}
            </p>
            <p className="text-lg leading-relaxed text-body">
              {t("page-wallets-what-is-description-2")}
            </p>
          </div>
          <div className="rounded-lg bg-background-highlight/80 p-6">
            <h3 className="text-xl font-semibold leading-tight">
              {t("page-wallets-what-is-highlight-title")}
            </h3>
            <ul className="mt-4 list-disc ps-6 text-md leading-relaxed">
              <li>{t("page-wallets-what-is-highlight-item-1")}</li>
              <li>{t("page-wallets-what-is-highlight-item-2")}</li>
            </ul>
          </div>
          <div className="mt-2 flex flex-col gap-6">
            <h3 className="text-2xl font-semibold leading-tight">
              {t("page-wallets-wallet-does-heading")}
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {walletActions.map((action, idx) => (
                <div
                  key={idx}
                  className="rounded-lg bg-background-highlight/60 p-5"
                >
                  <h4 className="text-xl font-semibold leading-tight">
                    {action.title}
                  </h4>
                  <p className="mt-2 text-md leading-relaxed text-body">
                    {action.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section id="how-ethereum-wallets-work" contentClassName="gap-10">
          <div className="-mt-6">
            <ListenToPlayer slug="/wallets/" />
          </div>
          <h2 className="text-3xl font-semibold leading-tight md:text-[2.5rem]">
            {t("page-wallets-how-it-works-title")}
          </h2>

          <div className="rounded border border-border bg-background p-6">
            <h3 className="text-2xl font-semibold leading-tight">
              {t("page-wallets-wallet-vs-account-title")}
            </h3>
            <p className="mt-4 text-md leading-relaxed">
              {t("page-wallets-wallet-vs-account-body-1")}
            </p>
            <ul className="mt-4 list-disc ps-6 text-md leading-relaxed">
              <li>{t("page-wallets-wallet-vs-account-bullet-1")}</li>
              <li>{t("page-wallets-wallet-vs-account-bullet-2")}</li>
            </ul>
            <p className="mt-4 text-md leading-relaxed">
              {t("page-wallets-wallet-vs-account-body-2")}
            </p>
          </div>

          <div className="rounded border border-border bg-background p-6">
            <h3 className="text-2xl font-semibold leading-tight">
              {t("page-wallets-comparison-title")}
            </h3>
            <p className="mt-4 text-md leading-relaxed">
              {t("page-wallets-comparison-intro")}
            </p>
            <div className="mt-6 grid gap-4">
              {walletEmailComparison.map((row, idx) => (
                <div
                  key={idx}
                  className="grid gap-6 rounded-lg bg-background-highlight/70 p-4 md:grid-cols-2"
                >
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-semibold uppercase tracking-wide text-body-medium">
                      {row.wallet.title}
                    </p>
                    <p className="text-md leading-relaxed text-body">
                      {row.wallet.description}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-semibold uppercase tracking-wide text-body-medium">
                      {row.email.title}
                    </p>
                    <p className="text-md leading-relaxed text-body">
                      {row.email.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-md leading-relaxed">
              {t("page-wallets-comparison-outro")}
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-semibold leading-tight">
              {t("page-wallets-key-concept-title")}
            </h3>
            <p className="text-md leading-relaxed">
              {t("page-wallets-key-concept-desc")}
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <h4 className="text-lg font-semibold">
                  {t("page-wallets-key-concept-public-title")}
                </h4>
                <ul className="list-disc ps-6 text-md leading-relaxed">
                  <li>{t("page-wallets-key-concept-public-line-1")}</li>
                  <li>{t("page-wallets-key-concept-public-line-2")}</li>
                  <li>{t("page-wallets-key-concept-public-line-3")}</li>
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-lg font-semibold">
                  {t("page-wallets-key-concept-private-title")}
                </h4>
                <ul className="list-disc ps-6 text-md leading-relaxed">
                  <li>{t("page-wallets-key-concept-private-line-1")}</li>
                  <li>{t("page-wallets-key-concept-private-line-2")}</li>
                  <li>{t("page-wallets-key-concept-private-line-3")}</li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold">
                {t("page-wallets-key-concept-wallet-responsible-intro")}
              </p>
              <ul className="list-disc ps-6 text-md leading-relaxed">
                {walletResponsibilities.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <p className="text-md leading-relaxed">
                {t("page-wallets-key-concept-how-it-works")}
              </p>
            </div>
          </div>
        </Section>

        <Section id="wallet-types">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-semibold leading-tight md:text-[2.5rem]">
              {t("page-wallets-wallet-types-title")}
            </h2>
            <p className="text-lg leading-relaxed text-body">
              {t("page-wallets-wallet-types-intro")}
            </p>
          </div>
          <div className="overflow-hidden rounded-lg bg-background">
            <table className="w-full table-fixed border-collapse text-left text-sm md:text-base">
              <thead className="bg-background-highlight text-body-medium">
                <tr>
                  <th className="px-4 py-3 md:px-6">
                    {t("page-wallets-wallet-types-column-need")}
                  </th>
                  <th className="px-4 py-3 md:px-6">
                    {t("page-wallets-wallet-types-column-type")}
                  </th>
                  <th className="px-4 py-3 md:px-6">
                    {t("page-wallets-wallet-types-column-description")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {walletTypes.map((row, idx) => (
                  <tr
                    key={idx}
                    className={cn(
                      "border-t border-border/40",
                      idx % 2 === 1 && "bg-background-highlight/60"
                    )}
                  >
                    <td className="px-4 py-4 text-body md:px-6">{row.goal}</td>
                    <td className="px-4 py-4 font-semibold text-body md:px-6">
                      {row.type}
                    </td>
                    <td className="px-4 py-4 text-body md:px-6">
                      {row.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex flex-col gap-4">
            <h3 className="text-2xl font-semibold leading-tight">
              {t("page-wallets-custodial-section-title")}
            </h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg bg-background-highlight/80 p-6">
                <h4 className="text-xl font-semibold leading-tight">
                  {t("page-wallets-custodial-non-title")}
                </h4>
                <ul className="mt-4 list-disc ps-6 text-md leading-relaxed">
                  {nonCustodialPoints.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg bg-background-highlight/80 p-6">
                <h4 className="text-xl font-semibold leading-tight">
                  {t("page-wallets-custodial-cust-title")}
                </h4>
                <ul className="mt-4 list-disc ps-6 text-md leading-relaxed">
                  {custodialPoints.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <p className="text-md leading-relaxed text-body-medium">
            {t("page-wallets-custodial-tip")}
          </p>
        </Section>

        <Section id="ethereum-wallet-setup-demo">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-semibold leading-tight md:text-[2.5rem]">
              {t("page-wallets-demo-title")}
            </h2>
            <p className="text-lg leading-relaxed text-body">
              {t("page-wallets-demo-description")}
            </p>
          </div>
          <div className="mt-2">
            <Simulator data={walletOnboardingSimData}>
              <p className="mb-2 text-lg italic leading-snug text-body-medium md:text-xl">
                Interactive tutorial
              </p>
              <h3 className="m-0 text-3xl font-bold leading-tight lg:text-5xl">
                {t("page-wallets-quick-links-setup-item-1")}
              </h3>
            </Simulator>
          </div>
        </Section>

        <Section id="how-to-keep-your-wallet-safe">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-semibold leading-tight md:text-[2.5rem]">
              {t("page-wallets-safety-title")}
            </h2>
            <p className="text-lg leading-relaxed text-body">
              {t("page-wallets-safety-intro")}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {securityTips.map((tip, idx) => (
              <div
                key={idx}
                className="h-full rounded-lg bg-background-highlight/70 p-5"
              >
                <h4 className="text-xl font-semibold leading-tight">
                  {tip.title}
                </h4>
                <p className="mt-2 text-md leading-relaxed text-body">
                  {tip.description}
                </p>
                <p className="mt-4 text-md font-semibold leading-relaxed">
                  {tip.why}
                </p>
                <ul className="mt-2 list-disc ps-6 text-md leading-relaxed">
                  {tip.points.map((point, pointIdx) => (
                    <li key={pointIdx}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="rounded border-l-4 border-primary bg-background-highlight p-6 text-md leading-relaxed">
            <p className="font-semibold">
              {t("page-wallets-custodial-aside-title")}
            </p>
            <p className="mt-2 text-body">
              {t("page-wallets-custodial-aside-body")}
            </p>
          </div>
        </Section>

        <Section id="new-eth-wallet-features">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-semibold leading-tight md:text-[2.5rem]">
              {t("page-wallets-features-title")}
            </h2>
            <p className="text-lg leading-relaxed text-body">
              {t("page-wallets-features-description-1")}
            </p>
            <p className="text-lg leading-relaxed text-body">
              {t("page-wallets-features-description-2")}
            </p>
          </div>
          <div className="overflow-hidden rounded-lg bg-background">
            <table className="w-full border-collapse text-left text-sm md:text-base">
              <thead className="bg-background-highlight uppercase tracking-wide text-body-medium">
                <tr>
                  <th className="px-4 py-3 md:px-6">
                    {t("page-wallets-features-table-left")}
                  </th>
                  <th className="px-4 py-3 md:px-6">
                    {t("page-wallets-features-table-right")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {featuresComparison.map((row, idx) => (
                  <tr
                    key={idx}
                    className={cn(
                      "border-t border-border/40",
                      idx % 2 === 1 && "bg-background-highlight/60"
                    )}
                  >
                    <td className="px-4 py-4 text-body md:px-6">
                      {row.before}
                    </td>
                    <td className="px-4 py-4 font-semibold text-body md:px-6">
                      {row.after}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section id="compare-wallets">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold leading-tight md:text-[2.5rem]">
                {t("page-wallets-compare-title")}
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-body">
                {t("page-wallets-compare-description")}
              </p>
            </div>
            <ButtonLink href="/wallets/find-wallet/">
              {t("page-wallets-compare-button")}
            </ButtonLink>
          </div>
        </Section>

        <Section>
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-semibold leading-tight md:text-[2.5rem]">
              {t("page-wallets-faq-title")}
            </h2>
            <p className="text-lg leading-relaxed text-body">
              {t("page-wallets-faq-subtitle")}
            </p>
          </div>
          <Faq type="single">
            {faqs.map((faq, idx) => (
              <FaqItem key={idx} value={`faq-${idx}`}>
                <FaqTrigger>
                  <h3 className="text-lg font-semibold leading-tight md:text-xl">
                    {faq.question}
                  </h3>
                </FaqTrigger>
                <FaqContent>
                  <div className="flex flex-col gap-3 text-md leading-relaxed text-body">
                    <Translation id={faq.answerId} />
                  </div>
                </FaqContent>
              </FaqItem>
            ))}
          </Faq>
        </Section>

        <Section>
          <h2 className="text-3xl font-semibold leading-tight md:text-[2.5rem]">
            {t("page-wallets-quiz-title")}
          </h2>
          <div className="w-full">
            <StandaloneQuizWidget quizKey="wallets" />
          </div>
        </Section>

        <Section contentClassName="gap-8">
          <Divider />
          <div className="grid gap-6 lg:grid-cols-2">
            <Callout
              image={ETHImage}
              titleKey="page-wallets:page-wallets-get-some"
              alt={t("page-wallets-get-some-alt")}
              descriptionKey="page-wallets:page-wallets-get-some-desc"
            >
              <ButtonLink href="/get-eth/">
                {t("page-wallets-get-some-btn")}
              </ButtonLink>
            </Callout>
            <Callout
              image={DappsImage}
              titleKey="page-wallets:page-wallets-try-dapps"
              alt={t("page-wallets-try-dapps-alt")}
              descriptionKey="page-wallets:page-wallets-try-dapps-desc"
            >
              <ButtonLink href="/apps/">
                {t("page-wallets-more-on-dapps-btn")}
              </ButtonLink>
            </Callout>
          </div>
        </Section>

        <div className="w-full px-8 py-4">
          <FileContributors
            className="my-10 border-t"
            contributors={contributors}
            lastEditLocaleTimestamp={lastEditLocaleTimestamp}
          />
          <FeedbackCard />
        </div>
      </MainArticle>
    </I18nProvider>
  )
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}) {
  const { locale } = params

  const t = await getTranslations({ locale, namespace: "page-wallets" })

  return await getMetadata({
    locale,
    slug: ["wallets"],
    title: t("page-wallets-meta-title"),
    description: t("page-wallets-meta-description"),
    image: "/images/wallets/wallet-hero.png",
  })
}

export default Page
