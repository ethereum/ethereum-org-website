import { ArrowRight, CheckCircle2, Info } from "lucide-react"

import { ButtonLink } from "@/components/ui/buttons/Button"
import { Card, CardContent } from "@/components/ui/card"
import { Flex, Stack } from "@/components/ui/flex"
import { Tag } from "@/components/ui/tag"

/**
 * WhitepaperBridge component
 *
 * Displayed at the top of the whitepaper page to help visitors understand
 * that the whitepaper is a historical document and direct them to current
 * Ethereum learning resources.
 *
 * Context: Many users land on this page from investment/banking apps that link
 * to the whitepaper. These users expect to learn "what Ethereum is today" but
 * find a 2014 historical document. This component bridges that gap.
 */
const WhitepaperBridge = () => {
  const evolutionPoints = [
    "Ethereum moved from Proof of Work to Proof of Stake (The Merge, 2022)",
    "Layer 2 scaling solutions now process millions of transactions",
    "DeFi, NFTs, and DAOs emerged as major use cases",
    "Smart contract standards (ERC-20, ERC-721) became industry foundations",
  ]

  return (
    <section className="mb-8 rounded-2xl border border-primary-low-contrast bg-radial-a p-6 md:p-8">
      <Stack className="gap-6">
        {/* Eyebrow tag - uses warning status for attention */}
        <Tag
          status="warning"
          variant="outline"
          size="small"
          className="w-fit gap-1.5"
        >
          <Info className="size-3.5" />
          Before you read
        </Tag>

        {/* Main heading */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-body md:text-3xl">
            Looking to understand Ethereum?
          </h2>
          <p className="max-w-2xl text-body-medium">
            This whitepaper was published in{" "}
            <strong className="text-body">2014</strong>, before Ethereum
            launched. After 10+ years of development, major upgrades, and
            ecosystem growth,{" "}
            <strong className="text-body">
              the original whitepaper no longer reflects what Ethereum is today
            </strong>
            .
          </p>
        </div>

        {/* CTAs */}
        <Flex className="flex-wrap gap-3">
          <ButtonLink href="/learn/" size="lg">
            Learn about Ethereum today
            <ArrowRight className="size-5" />
          </ButtonLink>
          <ButtonLink
            href="/whitepaper/whitepaper-pdf/Ethereum_Whitepaper_-_Buterin_2014.pdf"
            variant="outline"
            isSecondary
          >
            Download original PDF (2014)
          </ButtonLink>
        </Flex>

        {/* What's changed card - uses card-gradient-secondary */}
        <Card className="mt-2 border border-border bg-card-gradient-secondary">
          <CardContent className="p-4 md:p-6">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-body-medium">
              What&apos;s changed since 2014?
            </p>
            <Stack className="gap-3">
              {evolutionPoints.map((point, index) => (
                <Flex key={index} className="items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 flex-shrink-0 text-success" />
                  <span className="text-body-medium">{point}</span>
                </Flex>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </section>
  )
}

export default WhitepaperBridge
