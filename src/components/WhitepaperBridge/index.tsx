import { ArrowRight, CheckCircle2, Info } from "lucide-react"
import { getTranslations } from "next-intl/server"

import { ButtonLink } from "@/components/ui/buttons/Button"
import { Card, CardContent } from "@/components/ui/card"
import { Flex } from "@/components/ui/flex"
import { Tag } from "@/components/ui/tag"

import { UnorderedList } from "../ui/list"
import { Section } from "../ui/section"

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
const WhitepaperBridge = async () => {
  const t = await getTranslations("component-whitepaper")

  const evolutionKeys = [
    "evolution-pos",
    "evolution-l2",
    "evolution-usecases",
    "evolution-standards",
  ] as const

  return (
    <Section className="my-8 space-y-6 rounded-base border border-primary-low-contrast bg-radial-primary p-6 md:p-8">
      {/* Eyebrow tag - uses warning status for attention */}
      <Tag status="warning" variant="outline" size="small" className="gap-1.5">
        <Info className="size-3.5" />
        {t("before-you-read")}
      </Tag>

      {/* Main heading */}
      <div className="space-y-3">
        <h2 className="text-2xl text-body md:text-3xl">{t("heading")}</h2>
        <p className="max-w-2xl text-body-medium">
          {t.rich("description", {
            strong: (chunks) => <strong className="text-body">{chunks}</strong>,
          })}
        </p>
      </div>

      {/* CTAs */}
      <Flex className="flex-wrap gap-3">
        <ButtonLink href="/learn/" size="lg">
          {t("cta-learn")}
          <ArrowRight className="size-5 rtl:-scale-x-100" />
        </ButtonLink>
        <ButtonLink
          href="/content/whitepaper/whitepaper-pdf/Ethereum_Whitepaper_-_Buterin_2014.pdf"
          variant="outline"
          isSecondary
        >
          {t("cta-download-pdf")}
        </ButtonLink>
      </Flex>

      {/* What's changed card */}
      <Card className="border border-primary-low-contrast bg-linear-primary">
        <CardContent className="p-4 md:p-6">
          <p className="mb-4 text-sm font-semibold tracking-wide text-body-medium uppercase">
            {t("whats-changed")}
          </p>
          <UnorderedList className="m-0 space-y-3">
            {evolutionKeys.map((key) => (
              <Flex key={key} className="gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" />
                <span className="flex-1 text-body-medium">{t(key)}</span>
              </Flex>
            ))}
          </UnorderedList>
        </CardContent>
      </Card>
    </Section>
  )
}

export default WhitepaperBridge
