import { BaseHTMLAttributes } from "react"
import { getTranslations } from "next-intl/server"

import type { TranslationKey } from "@/lib/types"

import { cn } from "@/lib/utils/cn"

import { ButtonLink } from "./ui/buttons/Button"
import { CardParagraph, CardTitle } from "./ui/card"
import { Center } from "./ui/flex"
import { Grid } from "./ui/grid"

type FlexProps = BaseHTMLAttributes<HTMLDivElement>

type LabelVariant = "low" | "medium" | "high" | "critical"

type LabelProps = FlexProps & {
  variant: LabelVariant
}

const classNameByVariant = {
  low: "bg-green-500/15 text-green-700 dark:text-green-300",
  medium: "bg-yellow-500/15 text-yellow-700 dark:text-yellow-300",
  high: "bg-orange-500/15 text-orange-700 dark:text-orange-300",
  critical: "bg-red-500/15 text-red-700 dark:text-red-300",
}

const Label = ({ children, variant = "medium", ...props }: LabelProps) => {
  const variantClassName = classNameByVariant[variant]

  return (
    <Center
      className={cn("border-b px-0 py-1 text-sm uppercase", variantClassName)}
      {...props}
    >
      {children}
    </Center>
  )
}

export interface BugBountyCardInfo {
  lowLabelTranslationId?: TranslationKey
  mediumLabelTranslationId?: TranslationKey
  highLabelTranslationId?: TranslationKey
  criticalLabelTranslationId?: TranslationKey
  h2TranslationId: TranslationKey
  descriptionTranslationId: TranslationKey
  subDescriptionTranslationId: TranslationKey
  styledButtonTranslationId: TranslationKey
}

const bugBountyCardsInfo: BugBountyCardInfo[] = [
  {
    lowLabelTranslationId: "page-upgrades-bug-bounty-card-label-2",
    h2TranslationId: "page-upgrades-bug-bounty-card-low",
    descriptionTranslationId: "page-upgrades-bug-bounty-card-label-2",
    subDescriptionTranslationId: "page-upgrades-bug-bounty-card-label-1",
    styledButtonTranslationId: "page-upgrades-bug-bounty-card-low-risk",
  },
  {
    mediumLabelTranslationId: "page-upgrades-bug-bounty-card-label-4",
    h2TranslationId: "page-upgrades-bug-bounty-card-h2",
    descriptionTranslationId: "page-upgrades-bug-bounty-card-label-4",
    subDescriptionTranslationId: "page-upgrades-bug-bounty-card-label-3",
    styledButtonTranslationId: "page-upgrades-bug-bounty-card-medium-risk",
  },
  {
    highLabelTranslationId: "page-upgrades-bug-bounty-card-label-6",
    h2TranslationId: "page-upgrades-bug-bounty-card-high",
    descriptionTranslationId: "page-upgrades-bug-bounty-card-label-6",
    subDescriptionTranslationId: "page-upgrades-bug-bounty-card-label-5",
    styledButtonTranslationId: "page-upgrades-bug-bounty-card-high-risk",
  },
  {
    criticalLabelTranslationId: "page-upgrades-bug-bounty-card-label-8",
    h2TranslationId: "page-upgrades-bug-bounty-card-critical",
    descriptionTranslationId: "page-upgrades-bug-bounty-card-label-8",
    subDescriptionTranslationId: "page-upgrades-bug-bounty-card-label-7",
    styledButtonTranslationId: "page-upgrades-bug-bounty-card-critical-risk",
  },
]

const BugBountyCards = async () => {
  const t = await getTranslations("page-bug-bounty")

  const Banner = ({ card }: { card: BugBountyCardInfo }) => {
    if (card.lowLabelTranslationId)
      return <Label variant="low">{t(card.lowLabelTranslationId)}</Label>
    if (card.mediumLabelTranslationId)
      return <Label variant="medium">{t(card.mediumLabelTranslationId)}</Label>
    if (card.highLabelTranslationId)
      return <Label variant="high">{t(card.highLabelTranslationId)}</Label>
    if (card.criticalLabelTranslationId)
      return (
        <Label variant="critical">{t(card.criticalLabelTranslationId)}</Label>
      )
    return <></>
  }
  return (
    <Grid>
      {bugBountyCardsInfo.map((card, idx) => (
        <div
          key={`bug-bounty-card-${idx}`}
          className={cn(
            "overflow-hidden rounded border bg-background shadow-table-box",
            "hover:scale-[1.02] hover:rounded hover:bg-background-highlight hover:shadow-table-box-hover hover:transition-transform hover:duration-100"
          )}
        >
          <Banner card={card} />

          <div className="flex flex-col gap-y-8 p-4 md:p-6">
            <div className="mb-8 space-y-2">
              <CardTitle>{t(card.h2TranslationId)}</CardTitle>
              <CardParagraph className="text-xl">
                {t(card.descriptionTranslationId)}
              </CardParagraph>
            </div>

            <CardParagraph size="sm" className="uppercase">
              {t(card.subDescriptionTranslationId)}
            </CardParagraph>

            <ButtonLink href="https://bbp-form.ethereum.org/">
              {t(card.styledButtonTranslationId)}
            </ButtonLink>
          </div>
        </div>
      ))}
    </Grid>
  )
}

export default BugBountyCards
