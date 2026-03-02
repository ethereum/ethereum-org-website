import { BookOpen, HelpCircle, Shield, ShieldAlert } from "lucide-react"
import { getTranslations, setRequestLocale } from "next-intl/server"

import type { PageParams } from "@/lib/types"

import Breadcrumbs from "@/components/Breadcrumbs"
import FeedbackCard from "@/components/FeedbackCard"
import { SimpleHero } from "@/components/Hero"
import MainArticle from "@/components/MainArticle"
import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@/components/ui/alert"
import { ButtonLink } from "@/components/ui/buttons/Button"
import Link from "@/components/ui/Link"
import { Section } from "@/components/ui/section"
import WindowBox from "@/components/WindowBox"

import { getMetadata } from "@/lib/utils/metadata"

const EVENT_CATEGORY = "Support"

export default async function Page({ params }: { params: PageParams }) {
  const { locale } = params

  setRequestLocale(locale)

  const t = await getTranslations({ namespace: "page-community-support" })

  return (
    <div>
      {/* Hero */}
      <SimpleHero
        breadcrumbs={<Breadcrumbs slug="community/support" startDepth={1} />}
        title={t("page-community-support-hero-title")}
        subtitle={
          <div className="space-y-[1lh] text-base text-body-medium">
            <p className="text-lg">
              {t("page-community-support-hero-subtitle-1")}
            </p>
            <p>{t("page-community-support-hero-subtitle-2")}</p>
          </div>
        }
      />

      <MainArticle className="space-y-16 px-4 py-16 md:px-10 md:py-20">
        {/* Decentralization alert */}
        <Alert className="max-w-3xl text-body-medium">
          <AlertIcon>
            <Shield />
          </AlertIcon>
          <AlertContent>
            <AlertTitle className="text-body">
              {t("page-community-support-alert-title")}
            </AlertTitle>
            <AlertDescription className="text-sm">
              {t("page-community-support-alert-description")}
            </AlertDescription>
          </AlertContent>
        </Alert>

        {/* Section 1: Get help */}
        <Section id="get-help" className="space-y-6">
          <h2 className="text-2xl font-bold lg:text-3xl">
            {t("page-community-support-get-help")}
          </h2>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Card 1: Something went wrong */}
            <WindowBox
              title={
                <h3>{t("page-community-support-something-went-wrong")}</h3>
              }
              svg={<ShieldAlert className="size-8 text-accent-b" />}
              className="h-fit"
            >
              <div className="[&>*]:px-6 [&>*]:py-4 [&>a]:block [&>a]:border-t [&>a]:no-underline">
                <p className="text-sm leading-relaxed text-body-medium">
                  {t("page-community-support-something-went-wrong-description")}
                </p>
                <Link
                  className="hover:bg-background-highlight"
                  href="/community/support/scams/"
                  customEventOptions={{
                    eventCategory: EVENT_CATEGORY,
                    eventAction: "Something went wrong",
                    eventName: "I lost funds to a scam or fraud",
                  }}
                >
                  {t("page-community-support-lost-funds-scam")}
                </Link>
                <Link
                  className="hover:bg-background-highlight"
                  href="/community/support/scams/#secure-assets"
                  customEventOptions={{
                    eventCategory: EVENT_CATEGORY,
                    eventAction: "Something went wrong",
                    eventName: "Secure remaining funds and revoke permissions",
                  }}
                >
                  {t("page-community-support-secure-remaining-funds")}
                </Link>
                <Link
                  className="hover:bg-background-highlight"
                  href="/community/support/scams/#report"
                  customEventOptions={{
                    eventCategory: EVENT_CATEGORY,
                    eventAction: "Something went wrong",
                    eventName: "Report a scam address or website",
                  }}
                >
                  {t("page-community-support-report-scam")}
                </Link>
                <Link
                  className="hover:bg-background-highlight"
                  href="/community/support/scams/#analyze"
                  customEventOptions={{
                    eventCategory: EVENT_CATEGORY,
                    eventAction: "Something went wrong",
                    eventName: "Trace where funds were sent",
                  }}
                >
                  {t("page-community-support-trace-funds")}
                </Link>
                <Link
                  className="hover:bg-background-highlight"
                  href="/community/support/faq/#wrong-wallet"
                  customEventOptions={{
                    eventCategory: EVENT_CATEGORY,
                    eventAction: "Something went wrong",
                    eventName: "I sent to the wrong address",
                  }}
                >
                  {t("page-community-support-sent-wrong-address")}
                </Link>
                <Link
                  className="hover:bg-background-highlight"
                  href="/community/support/faq/#lost-wallet-access"
                  customEventOptions={{
                    eventCategory: EVENT_CATEGORY,
                    eventAction: "Something went wrong",
                    eventName: "I lost access to my wallet",
                  }}
                >
                  {t("page-community-support-lost-wallet-access")}
                </Link>
                <Link
                  className="hover:bg-background-highlight"
                  href="/community/support/faq/#stuck-transaction"
                  customEventOptions={{
                    eventCategory: EVENT_CATEGORY,
                    eventAction: "Something went wrong",
                    eventName: "My transaction is stuck",
                  }}
                >
                  {t("page-community-support-stuck-transaction")}
                </Link>
              </div>
            </WindowBox>

            {/* Card 2: Protect yourself */}
            <WindowBox
              title={<h3>{t("page-community-support-protect-yourself")}</h3>}
              svg={<Shield className="size-8 text-accent-a" />}
              className="h-fit"
            >
              <div className="[&>*]:px-6 [&>*]:py-4 [&>a]:block [&>a]:border-t [&>a]:no-underline">
                <p className="text-sm leading-relaxed text-body-medium">
                  {t("page-community-support-protect-yourself-description")}
                </p>
                <Link
                  className="hover:bg-background-highlight"
                  href="/security/#common-scams"
                  customEventOptions={{
                    eventCategory: EVENT_CATEGORY,
                    eventAction: "Protect yourself",
                    eventName: "Common scam tactics and how to spot them",
                  }}
                >
                  {t("page-community-support-common-scam-tactics")}
                </Link>
                <Link
                  className="hover:bg-background-highlight"
                  href="/community/support/scams/#recovery-scams"
                  customEventOptions={{
                    eventCategory: EVENT_CATEGORY,
                    eventAction: "Protect yourself",
                    eventName: "Why recovery experts are always scams",
                  }}
                >
                  {t("page-community-support-recovery-experts-scams")}
                </Link>
                <Link
                  className="hover:bg-background-highlight"
                  href="/guides/how-to-id-scam-tokens/"
                  customEventOptions={{
                    eventCategory: EVENT_CATEGORY,
                    eventAction: "Protect yourself",
                    eventName: "How to identify scam tokens",
                  }}
                >
                  {t("page-community-support-identify-scam-tokens")}
                </Link>
                <Link
                  className="hover:bg-background-highlight"
                  href="/security/"
                  customEventOptions={{
                    eventCategory: EVENT_CATEGORY,
                    eventAction: "Protect yourself",
                    eventName: "Full security and scam prevention guide",
                  }}
                >
                  {t("page-community-support-full-security-guide")}
                </Link>
                <Link
                  className="hover:bg-background-highlight"
                  href="/community/support/scams/#revoke-approvals"
                  customEventOptions={{
                    eventCategory: EVENT_CATEGORY,
                    eventAction: "Protect yourself",
                    eventName: "Revoke unnecessary token approvals",
                  }}
                >
                  {t("page-community-support-revoke-approvals")}
                </Link>
              </div>
            </WindowBox>
          </div>
        </Section>

        {/* Section 2: Learn */}
        <Section id="learn" className="space-y-6">
          <h2 className="text-2xl font-bold lg:text-3xl">
            {t("page-community-support-learn")}
          </h2>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Card 3: Using Ethereum */}
            <WindowBox
              title={<h3>{t("page-community-support-using-ethereum")}</h3>}
              svg={<BookOpen className="size-8 text-primary" />}
              className="h-fit"
            >
              <div className="[&>*]:px-6 [&>*]:py-4 [&>a]:block [&>a]:border-t [&>a]:no-underline">
                <p className="text-sm leading-relaxed text-body-medium">
                  {t("page-community-support-using-ethereum-description")}
                </p>
                <Link
                  className="hover:bg-background-highlight"
                  href="/guides/how-to-create-an-ethereum-account/"
                  customEventOptions={{
                    eventCategory: EVENT_CATEGORY,
                    eventAction: "Using Ethereum",
                    eventName: "How to create an Ethereum account",
                  }}
                >
                  {t("page-community-support-create-account")}
                </Link>
                <Link
                  className="hover:bg-background-highlight"
                  href="/guides/how-to-use-a-wallet/"
                  customEventOptions={{
                    eventCategory: EVENT_CATEGORY,
                    eventAction: "Using Ethereum",
                    eventName: "How to use a wallet",
                  }}
                >
                  {t("page-community-support-use-wallet")}
                </Link>
                <Link
                  className="hover:bg-background-highlight"
                  href="/guides/how-to-swap-tokens/"
                  customEventOptions={{
                    eventCategory: EVENT_CATEGORY,
                    eventAction: "Using Ethereum",
                    eventName: "How to swap tokens",
                  }}
                >
                  {t("page-community-support-swap-tokens")}
                </Link>
                <Link
                  className="hover:bg-background-highlight"
                  href="/guides/how-to-use-a-bridge/"
                  customEventOptions={{
                    eventCategory: EVENT_CATEGORY,
                    eventAction: "Using Ethereum",
                    eventName: "How to bridge tokens to layer 2",
                  }}
                >
                  {t("page-community-support-bridge-tokens")}
                </Link>
                <Link
                  className="hover:bg-background-highlight"
                  href="/guides/how-to-revoke-token-access/"
                  customEventOptions={{
                    eventCategory: EVENT_CATEGORY,
                    eventAction: "Using Ethereum",
                    eventName: "How to revoke token access",
                  }}
                >
                  {t("page-community-support-revoke-token-access")}
                </Link>
              </div>
            </WindowBox>

            {/* Card 4: Common misconceptions */}
            <WindowBox
              title={
                <h3>{t("page-community-support-common-misconceptions")}</h3>
              }
              svg={<HelpCircle className="size-8 text-accent-c" />}
              className="h-fit"
            >
              <div className="[&>*]:px-6 [&>*]:py-4 [&>a]:block [&>a]:border-t [&>a]:no-underline">
                <p className="text-sm leading-relaxed text-body-medium">
                  {t(
                    "page-community-support-common-misconceptions-description"
                  )}
                </p>
                <Link
                  className="hover:bg-background-highlight"
                  href="/community/support/misconceptions/#not-a-company"
                  customEventOptions={{
                    eventCategory: EVENT_CATEGORY,
                    eventAction: "Common misconceptions",
                    eventName: "Is Ethereum a company?",
                  }}
                >
                  {t("page-community-support-is-ethereum-company")}
                </Link>
                <Link
                  className="hover:bg-background-highlight"
                  href="/community/support/misconceptions/#no-fund-access"
                  customEventOptions={{
                    eventCategory: EVENT_CATEGORY,
                    eventAction: "Common misconceptions",
                    eventName: "Can someone recover or freeze my funds?",
                  }}
                >
                  {t("page-community-support-recover-freeze-funds")}
                </Link>
                <Link
                  className="hover:bg-background-highlight"
                  href="/community/support/misconceptions/#no-mining"
                  customEventOptions={{
                    eventCategory: EVENT_CATEGORY,
                    eventAction: "Common misconceptions",
                    eventName: "Can I still mine Ethereum?",
                  }}
                >
                  {t("page-community-support-mine-ethereum")}
                </Link>
                <Link
                  className="hover:bg-background-highlight"
                  href="/community/support/misconceptions/#no-support-team"
                  customEventOptions={{
                    eventCategory: EVENT_CATEGORY,
                    eventAction: "Common misconceptions",
                    eventName: "Is there an Ethereum support team?",
                  }}
                >
                  {t("page-community-support-is-support-team")}
                </Link>
              </div>
            </WindowBox>
          </div>
        </Section>

        {/* Still need help? */}
        <Section
          id="still-need-help"
          className="space-y-8 rounded-4xl border border-accent-a/20 bg-gradient-to-b from-accent-a/5 to-accent-a/10 px-8 py-16 lg:px-16 dark:from-accent-a/10 dark:to-accent-a/20"
        >
          <div className="flex flex-col items-center gap-6 text-center">
            <h2 className="text-3xl font-bold lg:text-4xl">
              {t("page-community-support-still-need-help")}
            </h2>
            <p className="max-w-lg text-body-medium">
              {t("page-community-support-still-need-help-description")}
            </p>
            <ButtonLink
              href="https://discord.gg/ethereum-org"
              customEventOptions={{
                eventCategory: EVENT_CATEGORY,
                eventAction: "Still need help?",
                eventName: "ethereum.org Discord",
              }}
            >
              {t("page-community-support-discord")}
            </ButtonLink>
          </div>
        </Section>

        <FeedbackCard />
      </MainArticle>
    </div>
  )
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}) {
  const { locale } = params

  const t = await getTranslations({
    locale,
    namespace: "page-community-support",
  })

  return await getMetadata({
    locale,
    slug: ["community", "support"],
    title: t("page-community-support-hero-title"),
    description: t("page-community-support-meta-description"),
  })
}
