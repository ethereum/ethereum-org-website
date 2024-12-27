import { useTranslation } from "next-i18next"
import { MdArrowForward } from "react-icons/md"

import { ChildOnlyProp, TranslationKey } from "@/lib/types"

import { ButtonLink } from "@/components/ui/buttons/Button"
import { Flex } from "@/components/ui/flex"
import InlineLink, { BaseLink } from "@/components/ui/Link"
import { LinkBox, LinkOverlay } from "@/components/ui/link-box"

import { Accordion } from "../../../tailwind/ui/accordion"
import CardList from "../CardList"
import InfoBanner from "../InfoBanner"
import Translation from "../Translation"

import {
  AccordionCustomItem,
  LeftColumnPanel,
  RightColumnPanel,
} from "./AccordionCustomItem"
import { useStablecoinAccordion } from "./useStablecoinAccordion"

const SectionTitle = (props: ChildOnlyProp) => (
  <h4 className="mb-8 mt-0 text-start text-xl font-bold" {...props} />
)

const StepBoxContainer = (props: ChildOnlyProp) => (
  <div className="mb-8 mt-4" {...props} />
)

const StepBox = (
  props: { href: string } & Record<"titleId" | "descId", TranslationKey>
) => {
  const { t } = useTranslation("page-stablecoins")

  return (
    <LinkBox className="flex flex-col items-start border bg-background p-4 transition-transform duration-200 hover:scale-105 hover:bg-background-highlight not-[:first]:-mt-px md:flex-row md:items-stretch">
      <Flex className="w-full items-center justify-between">
        <div>
          <LinkOverlay asChild>
            <BaseLink
              className="text-start font-bold text-inherit no-underline hover:no-underline"
              href={props.href}
            >
              {t(props.titleId)}
            </BaseLink>
          </LinkOverlay>
          <p className="mb-0">{t(props.descId)}</p>
        </div>
        <MdArrowForward className="ms-4 min-w-6" />
      </Flex>
    </LinkBox>
  )
}

const H4 = (props: ChildOnlyProp) => (
  <h4 className="mb-4 text-xl font-bold" {...props} />
)

const StablecoinAccordion = () => {
  const { cardListGroups } = useStablecoinAccordion()
  const { t } = useTranslation("page-stablecoins")

  // Overrides CardList default image width
  const DEFAULT_IMAGE_WIDTH = 24

  return (
    <Accordion type="single" className="w-full rounded" collapsible>
      <AccordionCustomItem category="dapps">
        <LeftColumnPanel>
          <SectionTitle>
            {t("page-stablecoins-accordion-requirements")}
          </SectionTitle>
          <StepBoxContainer>
            <StepBox
              href="/wallets/"
              titleId="page-stablecoins-accordion-swap-requirement-1"
              descId="page-stablecoins-accordion-swap-requirement-1-description"
            />
            <StepBox
              href="/get-eth/"
              titleId="page-stablecoins-accordion-swap-requirement-2"
              descId="page-stablecoins-accordion-swap-requirement-2-description"
            />
          </StepBoxContainer>
          <InfoBanner emoji=":light_bulb:">
            <H4>{t("page-stablecoins-accordion-swap-editors-tip")}</H4>
            <p className="mb-6 leading-6">
              {t("page-stablecoins-accordion-swap-editors-tip-copy")}
            </p>
            <ButtonLink href="/wallets/find-wallet/">
              {t("page-stablecoins-accordion-swap-editors-tip-button")}
            </ButtonLink>
          </InfoBanner>
        </LeftColumnPanel>
        <RightColumnPanel>
          <SectionTitle>
            {t("page-stablecoins-accordion-swap-dapp-title")}
          </SectionTitle>
          <p className="mb-6 leading-6">
            <Translation id="page-stablecoins:page-stablecoins-accordion-swap-dapp-intro" />{" "}
            <InlineLink href="/get-eth/#dex">
              {t("page-stablecoins-accordion-swap-dapp-link")}
            </InlineLink>
          </p>
          <CardList
            items={cardListGroups.dapps}
            imageWidth={DEFAULT_IMAGE_WIDTH}
          />
        </RightColumnPanel>
      </AccordionCustomItem>
      <AccordionCustomItem category="buy">
        <LeftColumnPanel>
          <SectionTitle>
            {t("page-stablecoins-accordion-requirements")}
          </SectionTitle>
          <p className="mb-6 leading-6">
            {t("page-stablecoins-accordion-buy-requirements-description")}
          </p>
          <StepBoxContainer>
            <StepBox
              href="/get-eth/"
              titleId="page-stablecoins-accordion-buy-requirement-1"
              descId="page-stablecoins-accordion-buy-requirement-1-description"
            />
          </StepBoxContainer>
          <InfoBanner isWarning>
            {t("page-stablecoins-accordion-buy-warning")}
          </InfoBanner>
        </LeftColumnPanel>
        <RightColumnPanel>
          <SectionTitle>
            {t("page-stablecoins-accordion-buy-exchanges-title")}
          </SectionTitle>
          <CardList
            items={cardListGroups.exchanges}
            imageWidth={DEFAULT_IMAGE_WIDTH}
          />
        </RightColumnPanel>
      </AccordionCustomItem>
      <AccordionCustomItem category="earn">
        <LeftColumnPanel>
          <SectionTitle>
            {t("page-stablecoins-accordion-requirements")}
          </SectionTitle>
          <p className="mb-6 leading-6">
            {t("page-stablecoins-accordion-earn-requirements-description")}
          </p>
          <StepBoxContainer>
            <StepBox
              href="/wallets/"
              titleId="page-stablecoins-accordion-earn-requirement-1"
              descId="page-stablecoins-accordion-earn-requirement-1-description"
            />
          </StepBoxContainer>
        </LeftColumnPanel>
        <RightColumnPanel>
          <SectionTitle>
            {t("page-stablecoins-accordion-earn-projects-title")}
          </SectionTitle>
          <p className="mb-6 leading-6">
            {t("page-stablecoins-accordion-earn-projects-copy")}
          </p>
          <CardList
            items={cardListGroups.earn}
            imageWidth={DEFAULT_IMAGE_WIDTH}
          />
        </RightColumnPanel>
      </AccordionCustomItem>
      <AccordionCustomItem category="generate">
        <LeftColumnPanel>
          <SectionTitle>
            {t("page-stablecoins-accordion-requirements")}
          </SectionTitle>
          <p className="mb-6 leading-6">
            {t("page-stablecoins-accordion-borrow-requirements-description")}
          </p>
          <StepBoxContainer>
            <StepBox
              href="/wallets/"
              titleId="page-stablecoins-accordion-borrow-requirement-1"
              descId="page-stablecoins-accordion-borrow-requirement-1-description"
            />
            <StepBox
              href="/get-eth/"
              titleId="page-stablecoins-accordion-borrow-requirement-2"
              descId="page-stablecoins-accordion-borrow-requirement-2-description"
            />
          </StepBoxContainer>
          <SectionTitle>
            {t("page-stablecoins-accordion-borrow-crypto-collateral")}
          </SectionTitle>
          <p className="mb-6 leading-6">
            {t("page-stablecoins-accordion-borrow-crypto-collateral-copy")}{" "}
            <InlineLink href="#how">
              {t("page-stablecoins-accordion-borrow-crypto-collateral-link")}
            </InlineLink>
          </p>
          <p className="mb-6 leading-6">
            {t("page-stablecoins-accordion-borrow-crypto-collateral-copy-p2")}
          </p>
        </LeftColumnPanel>
        <RightColumnPanel>
          <SectionTitle>
            {t("page-stablecoins-accordion-borrow-places-title")}
          </SectionTitle>
          <p className="mb-6 leading-6">
            {t("page-stablecoins-accordion-borrow-places-intro")}
          </p>
          <div className="mb-8">
            <CardList
              items={cardListGroups.borrow}
              imageWidth={DEFAULT_IMAGE_WIDTH}
            />
          </div>
          <SectionTitle>
            {t("page-stablecoins-accordion-borrow-risks-title")}
          </SectionTitle>
          <p className="mb-6 leading-6">
            {t("page-stablecoins-accordion-borrow-risks-copy")}{" "}
            <InlineLink href="/eth/">
              {t("page-stablecoins-accordion-borrow-risks-link")}
            </InlineLink>
          </p>
        </RightColumnPanel>
      </AccordionCustomItem>
    </Accordion>
  )
}

export default StablecoinAccordion
