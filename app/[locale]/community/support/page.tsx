import { BookOpen, HelpCircle, Shield, ShieldAlert } from "lucide-react"
import { setRequestLocale } from "next-intl/server"

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

  return (
    <div>
      {/* Hero */}
      <SimpleHero
        breadcrumbs={<Breadcrumbs slug="community/support" startDepth={1} />}
        title="Ethereum support"
        subtitle={
          <div className="space-y-[1lh] text-base text-body-medium">
            <p className="text-lg">
              Whether you need help with a transaction, want to stay safe, or
              are just getting started, this page connects you to the right
              resources.
            </p>
            <p>
              Ethereum is a decentralized network, not a company. ethereum.org
              is an educational website. It is not a wallet, exchange, or
              financial platform. We do not hold any funds and cannot access any
              accounts. No one from ethereum.org will ever contact you first.
              Anyone claiming otherwise is a scammer.
            </p>
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
              Ethereum is not a company
            </AlertTitle>
            <AlertDescription className="text-sm">
              There is no company, support team, or help desk behind Ethereum.
              No one from ethereum.org will ever contact you. Transactions on
              the blockchain are final and cannot be reversed by anyone.
            </AlertDescription>
          </AlertContent>
        </Alert>

        {/* Section 1: Get help */}
        <Section id="get-help" className="space-y-6">
          <h2 className="text-2xl font-bold lg:text-3xl">Get help</h2>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Card 1: Something went wrong */}
            <WindowBox
              title={<h3>Something went wrong</h3>}
              svg={<ShieldAlert className="size-8 text-accent-b" />}
              className="h-fit"
            >
              <div className="[&>*]:px-6 [&>*]:py-4 [&>a]:block [&>a]:border-t [&>a]:no-underline">
                <p className="text-sm leading-relaxed text-body-medium">
                  If you lost funds, got scammed, or something unexpected
                  happened, start here.
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
                  I lost funds to a scam or fraud
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
                  Secure remaining funds and revoke permissions
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
                  Report a scam address or website
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
                  Trace where funds were sent
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
                  I sent to the wrong address
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
                  I lost access to my wallet
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
                  My transaction is stuck
                </Link>
              </div>
            </WindowBox>

            {/* Card 2: Protect yourself */}
            <WindowBox
              title={<h3>Protect yourself</h3>}
              svg={<Shield className="size-8 text-accent-a" />}
              className="h-fit"
            >
              <div className="[&>*]:px-6 [&>*]:py-4 [&>a]:block [&>a]:border-t [&>a]:no-underline">
                <p className="text-sm leading-relaxed text-body-medium">
                  Learn to recognize common scam tactics before they target you.
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
                  Common scam tactics and how to spot them
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
                  Why &quot;recovery experts&quot; are always scams
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
                  How to identify scam tokens
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
                  Full security and scam prevention guide
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
                  Revoke unnecessary token approvals
                </Link>
              </div>
            </WindowBox>
          </div>
        </Section>

        {/* Section 2: Learn */}
        <Section id="learn" className="space-y-6">
          <h2 className="text-2xl font-bold lg:text-3xl">Learn</h2>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Card 3: Using Ethereum */}
            <WindowBox
              title={<h3>Using Ethereum</h3>}
              svg={<BookOpen className="size-8 text-primary" />}
              className="h-fit"
            >
              <div className="[&>*]:px-6 [&>*]:py-4 [&>a]:block [&>a]:border-t [&>a]:no-underline">
                <p className="text-sm leading-relaxed text-body-medium">
                  Step-by-step guides for wallets, tokens, bridges, and more.
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
                  How to create an Ethereum account
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
                  How to use a wallet
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
                  How to swap tokens
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
                  How to bridge tokens to layer 2
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
                  How to revoke token access
                </Link>
              </div>
            </WindowBox>

            {/* Card 4: Common misconceptions */}
            <WindowBox
              title={<h3>Common misconceptions</h3>}
              svg={<HelpCircle className="size-8 text-accent-c" />}
              className="h-fit"
            >
              <div className="[&>*]:px-6 [&>*]:py-4 [&>a]:block [&>a]:border-t [&>a]:no-underline">
                <p className="text-sm leading-relaxed text-body-medium">
                  Clearing up the most frequent misunderstandings about
                  Ethereum.
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
                  Is Ethereum a company?
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
                  Can someone recover or freeze my funds?
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
                  Can I still mine Ethereum?
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
                  Is there an Ethereum support team?
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
            <h2 className="text-3xl font-bold lg:text-4xl">Still need help?</h2>
            <p className="max-w-lg text-body-medium">
              If you did not find what you were looking for, ask the community.
              Volunteers in these channels may be able to point you in the right
              direction.
            </p>
            <ButtonLink
              href="https://discord.gg/ethereum-org"
              customEventOptions={{
                eventCategory: EVENT_CATEGORY,
                eventAction: "Still need help?",
                eventName: "ethereum.org Discord",
              }}
            >
              ethereum.org Discord
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

  return await getMetadata({
    locale,
    slug: ["community", "support"],
    title: "Ethereum support",
    description: "Get support in the Ethereum ecosystem.",
  })
}
