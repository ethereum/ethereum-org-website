import { BaseHTMLAttributes } from "react"

import type { TranslationKey } from "@/lib/types"

import { cn } from "@/lib/utils/cn"

import { ButtonLink } from "./ui/buttons/Button"
import { Center } from "./ui/flex"

import { useTranslation } from "@/hooks/useTranslation"

type FlexProps = BaseHTMLAttributes<HTMLDivElement>

type LabelVariant = "low" | "medium" | "high" | "critical"

type LabelProps = FlexProps & {
  variant: LabelVariant
}

const classNameByVariant = {
  low: "bg-red-100 text-black",
  medium: "bg-red-300 text-black",
  high: "bg-red-700 text-white",
  critical: "bg-red-900 text-white",
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
  subHeader1TranslationId: TranslationKey
  severityList: TranslationKey[]
  subHeader2TranslationId: TranslationKey
  textTranslationId: TranslationKey
  styledButtonTranslationId: TranslationKey
}

const bugBountyCardsInfo: BugBountyCardInfo[] = [
  {
    lowLabelTranslationId: "page-upgrades-bug-bounty-card-label-2",
    h2TranslationId: "page-upgrades-bug-bounty-card-low",
    descriptionTranslationId: "page-upgrades-bug-bounty-card-label-2",
    subDescriptionTranslationId: "page-upgrades-bug-bounty-card-label-1",
    subHeader1TranslationId: "page-upgrades-bug-bounty-card-subheader",
    severityList: [
      "page-upgrades-bug-bounty-card-li-1",
      "page-upgrades-bug-bounty-card-li-2",
    ],
    subHeader2TranslationId: "page-upgrades-bug-bounty-card-subheader-2",
    textTranslationId: "page-upgrades-bug-bounty-card-text",
    styledButtonTranslationId: "page-upgrades-bug-bounty-card-low-risk",
  },
  {
    mediumLabelTranslationId: "page-upgrades-bug-bounty-card-label-4",
    h2TranslationId: "page-upgrades-bug-bounty-card-h2",
    descriptionTranslationId: "page-upgrades-bug-bounty-card-label-4",
    subDescriptionTranslationId: "page-upgrades-bug-bounty-card-label-3",
    subHeader1TranslationId: "page-upgrades-bug-bounty-card-subheader",
    severityList: [
      "page-upgrades-bug-bounty-card-li-3",
      "page-upgrades-bug-bounty-card-li-4",
      "page-upgrades-bug-bounty-card-li-5",
    ],
    subHeader2TranslationId: "page-upgrades-bug-bounty-card-subheader-2",
    textTranslationId: "page-upgrades-bug-bounty-card-text-1",
    styledButtonTranslationId: "page-upgrades-bug-bounty-card-medium-risk",
  },
  {
    highLabelTranslationId: "page-upgrades-bug-bounty-card-label-6",
    h2TranslationId: "page-upgrades-bug-bounty-card-high",
    descriptionTranslationId: "page-upgrades-bug-bounty-card-label-6",
    subDescriptionTranslationId: "page-upgrades-bug-bounty-card-label-5",
    subHeader1TranslationId: "page-upgrades-bug-bounty-card-subheader",
    severityList: [
      "page-upgrades-bug-bounty-card-li-6",
      "page-upgrades-bug-bounty-card-li-7",
    ],
    subHeader2TranslationId: "page-upgrades-bug-bounty-card-subheader-2",
    textTranslationId: "page-upgrades-bug-bounty-card-text-2",
    styledButtonTranslationId: "page-upgrades-bug-bounty-card-high-risk",
  },
  {
    criticalLabelTranslationId: "page-upgrades-bug-bounty-card-label-8",
    h2TranslationId: "page-upgrades-bug-bounty-card-critical",
    descriptionTranslationId: "page-upgrades-bug-bounty-card-label-8",
    subDescriptionTranslationId: "page-upgrades-bug-bounty-card-label-7",
    subHeader1TranslationId: "page-upgrades-bug-bounty-card-subheader",
    severityList: ["page-upgrades-bug-bounty-card-li-8"],
    subHeader2TranslationId: "page-upgrades-bug-bounty-card-subheader-2",
    textTranslationId: "page-upgrades-bug-bounty-card-text-3",
    styledButtonTranslationId: "page-upgrades-bug-bounty-card-critical-risk",
  },
]

const BugBountyCards = () => {
  const { t } = useTranslation("page-bug-bounty")

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
    <div className="mx-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
      {bugBountyCardsInfo.map((card, idx) => (
        <div
          key={`bug-bounty-card-${idx}`}
          className={cn(
            "row-span-6 m-4 grid grid-rows-subgrid",
            "overflow-hidden rounded border bg-background shadow-table-box",
            "hover:scale-[1.02] hover:rounded hover:bg-background-highlight hover:shadow-table-box-hover hover:transition-transform hover:duration-100"
          )}
        >
          <Banner card={card} />

          <div className="row-span-5 grid grid-rows-subgrid gap-y-6 px-4 py-6">
            <div className="space-y-2">
              <h3 className="text-2xl/6 font-bold">
                {t(card.h2TranslationId)}
              </h3>
              <p className="mb-6 text-xl opacity-60">
                {t(card.descriptionTranslationId)}
              </p>
            </div>

            <p className="mb-2 mt-4 text-sm uppercase opacity-60">
              {t(card.subDescriptionTranslationId)}
            </p>

            <div className="space-y-2">
              <h4 className="text-sm font-normal uppercase opacity-60">
                {t(card.subHeader1TranslationId)}
              </h4>
              <ul>
                {card.severityList.map((listItemId) => (
                  <li key={listItemId}>{t(listItemId)}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-normal uppercase opacity-60">
                {t(card.subHeader2TranslationId)}
              </h4>
              <p className="my-4 mt-2">{t(card.textTranslationId)}</p>
            </div>

            <ButtonLink href="https://forms.gle/Gnh4gzGh66Yc3V7G8">
              {t(card.styledButtonTranslationId)}
            </ButtonLink>
          </div>
        </div>
      ))}
    </div>
  )
}

export default BugBountyCards
