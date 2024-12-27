import { BaseHTMLAttributes } from "react"
import { useTranslation } from "next-i18next"

import type { ChildOnlyProp, TranslationKey } from "@/lib/types"

import { cn } from "@/lib/utils/cn"

import { ButtonLink, ButtonLinkProps } from "./ui/buttons/Button"
import { Center, Flex, Stack } from "./ui/flex"

type FlexProps = BaseHTMLAttributes<HTMLDivElement>

const CardRow = ({ children }: ChildOnlyProp) => (
  <Flex className="mx-4 my-16 flex-wrap justify-between">{children}</Flex>
)

const SubmitBugBountyButton = ({
  children,
  ...props
}: Omit<ButtonLinkProps, "href">) => (
  <ButtonLink
    className="m-4"
    href="https://forms.gle/Gnh4gzGh66Yc3V7G8"
    {...props}
  >
    {children}
  </ButtonLink>
)

const Card = ({ children, ...props }: FlexProps) => {
  return (
    <Stack
      className={cn(
        "flex-[1_1_412px] gap-0 xl:flex-[1_1_216px]",
        "m-4 justify-between bg-background",
        "rounded-sm border shadow-table-box",
        "hover:scale-[1.02] hover:rounded hover:bg-background-highlight hover:shadow-table-box-hover hover:transition-transform hover:duration-100"
      )}
      {...props}
    >
      {children}
    </Stack>
  )
}

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
      className={cn(
        "rounded-t-[1px] border-b px-0 py-1 text-sm uppercase",
        variantClassName
      )}
      {...props}
    >
      {children}
    </Center>
  )
}

const H2 = ({ children, ...props }) => (
  <h2
    className={cn("-mb-2 mt-2 p-4", "text-start text-2xl font-bold leading-6")}
    {...props}
  >
    {children}
  </h2>
)

const Description = ({ children, ...props }) => (
  <p className="mb-6 px-4 py-0 text-xl opacity-60" {...props}>
    {children}
  </p>
)

const SubHeader = ({ children, ...props }) => (
  <p className="mb-2 ms-4 mt-4 text-sm uppercase opacity-60" {...props}>
    {children}
  </p>
)

const TextBox = ({
  children,
  ...props
}: BaseHTMLAttributes<HTMLDivElement>) => (
  <div className="m-4 mt-2" {...props}>
    {children}
  </div>
)

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
  return (
    <CardRow>
      {bugBountyCardsInfo.map((card, idx) => (
        <Card key={`bug-bounty-card-${idx}`}>
          {card.lowLabelTranslationId && (
            <Label variant="low">{t(card.lowLabelTranslationId)}</Label>
          )}
          {card.mediumLabelTranslationId && (
            <Label variant="medium">{t(card.mediumLabelTranslationId)}</Label>
          )}
          {card.highLabelTranslationId && (
            <Label variant="high">{t(card.highLabelTranslationId)}</Label>
          )}
          {card.criticalLabelTranslationId && (
            <Label variant="critical">
              {t(card.criticalLabelTranslationId)}
            </Label>
          )}
          <H2>{t(card.h2TranslationId)}</H2>
          <Description>{t(card.descriptionTranslationId)}</Description>
          <SubHeader>{t(card.subDescriptionTranslationId)}</SubHeader>

          <SubHeader>{t(card.subHeader1TranslationId)}</SubHeader>
          <TextBox>
            <ul>
              {card.severityList.map((listItemId) => (
                <li key={listItemId}>
                  {t(listItemId)}
                  {/* <Translation id={listItemId} /> */}
                </li>
              ))}
            </ul>
          </TextBox>

          <SubHeader>{t(card.subHeader2TranslationId)}</SubHeader>
          <TextBox>{t(card.textTranslationId)}</TextBox>
          <SubmitBugBountyButton>
            {t(card.styledButtonTranslationId)}
          </SubmitBugBountyButton>
        </Card>
      ))}
    </CardRow>
  )
}

export default BugBountyCards
