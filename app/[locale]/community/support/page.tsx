import { BookOpen, HelpCircle, Shield, ShieldAlert } from "lucide-react"
import { setRequestLocale } from "next-intl/server"

import type { PageParams } from "@/lib/types"

import Breadcrumbs from "@/components/Breadcrumbs"
import FeedbackCard from "@/components/FeedbackCard"
import MainArticle from "@/components/MainArticle"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import InlineLink from "@/components/ui/Link"
import { Section } from "@/components/ui/section"

import { getMetadata } from "@/lib/utils/metadata"

export default async function Page({ params }: { params: PageParams }) {
  const { locale } = params

  setRequestLocale(locale)

  return (
    <div>
      {/* Hero */}
      <div className="mx-auto w-full max-w-screen-2xl border-b">
        <div className="flex flex-col gap-9 p-8 lg:px-11 lg:py-16">
          <Breadcrumbs slug="community/support" startDepth={1} />
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-black lg:text-7xl">
              Ethereum support
            </h1>
            <p className="max-w-2xl text-lg text-body-medium">
              Whether you need help with a transaction, want to stay safe, or
              are just getting started, this page connects you to the right
              resources.
            </p>
            <p className="max-w-2xl text-body-medium">
              Ethereum is a decentralized network, not a company. ethereum.org
              is an educational website. It is not a wallet, exchange, or
              financial platform. We do not hold any funds and cannot access any
              accounts. No one from ethereum.org will ever contact you first.
              Anyone claiming otherwise is a scammer.
            </p>
          </div>
        </div>
      </div>

      <MainArticle className="space-y-16 px-4 py-16 md:px-10 md:py-20">
        {/* Decentralization callout */}
        <div className="flex max-w-3xl items-start gap-4 rounded-xl border bg-background-highlight p-5">
          <Shield className="mt-0.5 size-6 shrink-0 text-body-medium" />
          <div className="space-y-1">
            <p className="font-bold">Ethereum is decentralized</p>
            <p className="text-sm leading-relaxed text-body-medium">
              There is no company, support team, or help desk behind Ethereum.
              No one from ethereum.org will ever contact you. Transactions on
              the blockchain are final and cannot be reversed by anyone.
            </p>
          </div>
        </div>

        {/* Section 1: Get help */}
        <Section id="get-help" className="space-y-6">
          <h2 className="text-2xl font-bold lg:text-3xl">Get help</h2>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Card 1: Something went wrong */}
            <Card
              className="grid grid-rows-[auto_1fr] overflow-hidden rounded-2xl border"
              style={{
                boxShadow: "0.75rem 0.75rem 0 hsla(var(--amber-500), 0.25)",
              }}
            >
              <CardTitle className="flex items-center gap-4 border-b bg-background-highlight p-5">
                <ShieldAlert className="size-8 text-accent-a" />
                <span className="text-2xl font-bold">Something went wrong</span>
              </CardTitle>
              <CardContent className="space-y-5 bg-gradient-to-br from-white to-primary/5 p-8 dark:from-transparent dark:to-primary/5">
                <p className="text-sm leading-relaxed text-body-medium">
                  If you lost funds, got scammed, or something unexpected
                  happened, start here.
                </p>
                <div className="flex flex-col gap-3">
                  <InlineLink href="/community/support/scams/">
                    I lost funds to a scam or fraud
                  </InlineLink>
                  <InlineLink href="/community/support/scams/#secure-assets">
                    Secure remaining funds and revoke permissions
                  </InlineLink>
                  <InlineLink href="/community/support/scams/#report">
                    Report a scam address or website
                  </InlineLink>
                  <InlineLink href="/community/support/scams/#analyze">
                    Trace where funds were sent
                  </InlineLink>
                  <InlineLink href="/community/support/faq/#wrong-wallet">
                    I sent to the wrong address
                  </InlineLink>
                  <InlineLink href="/community/support/faq/#lost-wallet-access">
                    I lost access to my wallet
                  </InlineLink>
                  <InlineLink href="/community/support/faq/#stuck-transaction">
                    My transaction is stuck
                  </InlineLink>
                </div>
              </CardContent>
            </Card>

            {/* Card 2: Protect yourself */}
            <Card
              className="grid grid-rows-[auto_1fr] overflow-hidden rounded-2xl border"
              style={{
                boxShadow: "0.75rem 0.75rem 0 hsla(var(--blue-500), 0.25)",
              }}
            >
              <CardTitle className="flex items-center gap-4 border-b bg-background-highlight p-5">
                <Shield className="size-8 text-accent-b" />
                <span className="text-2xl font-bold">Protect yourself</span>
              </CardTitle>
              <CardContent className="space-y-5 bg-gradient-to-br from-white to-primary/5 p-8 dark:from-transparent dark:to-primary/5">
                <p className="text-sm leading-relaxed text-body-medium">
                  Learn to recognize common scam tactics before they target you.
                </p>
                <div className="flex flex-col gap-3">
                  <InlineLink href="/security/#common-scams">
                    Common scam tactics and how to spot them
                  </InlineLink>
                  <InlineLink href="/community/support/scams/#recovery-scams">
                    Why &quot;recovery experts&quot; are always scams
                  </InlineLink>
                  <InlineLink href="/guides/how-to-id-scam-tokens/">
                    How to identify scam tokens
                  </InlineLink>
                  <InlineLink href="/security/">
                    Full security and scam prevention guide
                  </InlineLink>
                </div>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* Section 2: Learn */}
        <Section id="learn" className="space-y-6">
          <h2 className="text-2xl font-bold lg:text-3xl">Learn</h2>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Card 4: Using Ethereum */}
            <Card
              className="grid grid-rows-[auto_1fr] overflow-hidden rounded-2xl border"
              style={{
                boxShadow: "0.75rem 0.75rem 0 hsla(var(--green-500), 0.25)",
              }}
            >
              <CardTitle className="flex items-center gap-4 border-b bg-background-highlight p-5">
                <BookOpen className="size-8 text-accent-c" />
                <span className="text-2xl font-bold">Using Ethereum</span>
              </CardTitle>
              <CardContent className="space-y-5 bg-gradient-to-br from-white to-primary/5 p-8 dark:from-transparent dark:to-primary/5">
                <p className="text-sm leading-relaxed text-body-medium">
                  Step-by-step guides for wallets, tokens, bridges, and more.
                </p>
                <div className="flex flex-col gap-3">
                  <InlineLink href="/guides/how-to-create-an-ethereum-account/">
                    How to create an Ethereum account
                  </InlineLink>
                  <InlineLink href="/guides/how-to-use-a-wallet/">
                    How to use a wallet
                  </InlineLink>
                  <InlineLink href="/guides/how-to-swap-tokens/">
                    How to swap tokens
                  </InlineLink>
                  <InlineLink href="/guides/how-to-use-a-bridge/">
                    How to bridge tokens to layer 2
                  </InlineLink>
                  <InlineLink href="/guides/how-to-revoke-token-access/">
                    How to revoke token access
                  </InlineLink>
                </div>
              </CardContent>
            </Card>

            {/* Card 5: Common misconceptions */}
            <Card
              className="grid grid-rows-[auto_1fr] overflow-hidden rounded-2xl border"
              style={{
                boxShadow: "0.75rem 0.75rem 0 hsla(var(--amber-500), 0.25)",
              }}
            >
              <CardTitle className="flex items-center gap-4 border-b bg-background-highlight p-5">
                <HelpCircle className="size-8 text-accent-a" />
                <span className="text-2xl font-bold">
                  Common misconceptions
                </span>
              </CardTitle>
              <CardContent className="space-y-5 bg-gradient-to-br from-white to-primary/5 p-8 dark:from-transparent dark:to-primary/5">
                <p className="text-sm leading-relaxed text-body-medium">
                  Clearing up the most frequent misunderstandings about
                  Ethereum.
                </p>
                <div className="flex flex-col gap-3">
                  <InlineLink href="/community/support/misconceptions/#not-a-company">
                    Ethereum is not a company
                  </InlineLink>
                  <InlineLink href="/community/support/misconceptions/#no-fund-access">
                    No one can access or freeze your funds
                  </InlineLink>
                  <InlineLink href="/community/support/misconceptions/#no-mining">
                    Ethereum mining no longer exists
                  </InlineLink>
                  <InlineLink href="/community/support/misconceptions/#no-support-team">
                    There is no &quot;Ethereum support team&quot;
                  </InlineLink>
                </div>
              </CardContent>
            </Card>
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
            <ButtonLink href="https://discord.gg/ethereum-org">
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
