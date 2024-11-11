import { useTranslation } from "next-i18next"
import { MdArrowForward } from "react-icons/md"
import {
  Accordion,
  Box,
  Flex,
  Heading,
  Icon,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react"

import { ChildOnlyProp, TranslationKey } from "@/lib/types"

import { ButtonLink } from "../Buttons"
import CardList from "../CardList"
import InfoBanner from "../InfoBanner"
import InlineLink, { BaseLink } from "../Link"
import OldHeading from "../OldHeading"
import Text from "../OldText"
import Translation from "../Translation"

import {
  AccordionCustomItem,
  LeftColumnPanel,
  RightColumnPanel,
} from "./AccordionCustomItem"
import { useStablecoinAccordion } from "./useStablecoinAccordion"

const SectionTitle = (props: ChildOnlyProp) => (
  <OldHeading
    as="h4"
    fontSize="1.25rem"
    fontWeight={700}
    lineHeight="22px"
    textAlign="start"
    mt={0}
    {...props}
  />
)

const StepBoxContainer = (props: ChildOnlyProp) => (
  <Box mt={4} mb={8} {...props} />
)

const StepBox = (
  props: { href: string } & Record<"titleId" | "descId", TranslationKey>
) => {
  const { t } = useTranslation("page-stablecoins")

  return (
    <Flex
      as={LinkBox}
      alignItems={{ base: "flex-start", md: "normal" }}
      background="background.base"
      border="1px"
      borderColor="border"
      color="text"
      flexDirection={{ base: "column", md: "row" }}
      p={4}
      sx={{
        "&:not(:first-of-type)": {
          mt: "-1px",
        },
      }}
      _hover={{
        background: "ednBackground",
        transition: "transform 0.2s",
        transform: "scale(1.05)",
      }}
    >
      <Flex justifyContent="space-between" alignItems="center" width="100%">
        <Box>
          <LinkOverlay
            as={BaseLink}
            color="inherit"
            textDecoration="inherit"
            href={props.href}
            fontWeight={700}
            textAlign="start"
            _hover={{
              textDecoration: "inherit",
            }}
          >
            {t(props.titleId)}
          </LinkOverlay>
          <Text mb={0}>{t(props.descId)}</Text>
        </Box>
        <Icon as={MdArrowForward} ms={4} minW={6} />
      </Flex>
    </Flex>
  )
}

const H4 = (props: ChildOnlyProp) => (
  <Heading fontSize="1.25rem" fontWeight={700} mb={4} {...props} />
)

const StablecoinAccordion = () => {
  const { cardListGroups } = useStablecoinAccordion()
  const { t } = useTranslation("page-stablecoins")

  // Overrides CardList default image width
  const DEFAULT_IMAGE_WIDTH = 24

  return (
    <Accordion borderRadius="base" width="full" allowToggle>
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
            <Text>{t("page-stablecoins-accordion-swap-editors-tip-copy")}</Text>
            <ButtonLink href="/wallets/find-wallet/">
              {t("page-stablecoins-accordion-swap-editors-tip-button")}
            </ButtonLink>
          </InfoBanner>
        </LeftColumnPanel>
        <RightColumnPanel>
          <SectionTitle>
            {t("page-stablecoins-accordion-swap-dapp-title")}
          </SectionTitle>
          <Text>
            <Translation id="page-stablecoins:page-stablecoins-accordion-swap-dapp-intro" />{" "}
            <InlineLink href="/get-eth/#dex">
              {t("page-stablecoins-accordion-swap-dapp-link")}
            </InlineLink>
          </Text>
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
          <Text>
            {t("page-stablecoins-accordion-buy-requirements-description")}
          </Text>
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
          <Text>
            {t("page-stablecoins-accordion-earn-requirements-description")}
          </Text>
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
          <Text>{t("page-stablecoins-accordion-earn-projects-copy")}</Text>
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
          <Text>
            {t("page-stablecoins-accordion-borrow-requirements-description")}
          </Text>
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
          <Text>
            {t("page-stablecoins-accordion-borrow-crypto-collateral-copy")}{" "}
            <InlineLink href="#how">
              {t("page-stablecoins-accordion-borrow-crypto-collateral-link")}
            </InlineLink>
          </Text>
          <Text>
            {t("page-stablecoins-accordion-borrow-crypto-collateral-copy-p2")}
          </Text>
        </LeftColumnPanel>
        <RightColumnPanel>
          <SectionTitle>
            {t("page-stablecoins-accordion-borrow-places-title")}
          </SectionTitle>
          <Text>{t("page-stablecoins-accordion-borrow-places-intro")}</Text>
          <Box mb={8}>
            <CardList
              items={cardListGroups.borrow}
              imageWidth={DEFAULT_IMAGE_WIDTH}
            />
          </Box>
          <SectionTitle>
            {t("page-stablecoins-accordion-borrow-risks-title")}
          </SectionTitle>
          <Text>
            {t("page-stablecoins-accordion-borrow-risks-copy")}{" "}
            <InlineLink href="/eth/">
              {t("page-stablecoins-accordion-borrow-risks-link")}
            </InlineLink>
          </Text>
        </RightColumnPanel>
      </AccordionCustomItem>
    </Accordion>
  )
}

export default StablecoinAccordion
