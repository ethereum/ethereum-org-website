import React, { ReactNode } from "react"
import {
  Accordion,
  Box,
  Flex,
  Heading,
  Icon,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react"
import { MdArrowForward } from "react-icons/md"
import ButtonLink from "../ButtonLink"
import CardList from "../CardList"
import InfoBanner from "../InfoBanner"
import Link from "../Link"
import Translation from "../Translation"
import {
  AccordionCustomItem,
  LeftColumnPanel,
  RightColumnPanel,
} from "./AccordionCustomItem"
import { useStablecoinAccordion } from "./useStablecoinAccordion"
import { TranslationKey } from "../../utils/translations"

export type ChildOnlyType = {
  children: ReactNode
}

const SectionTitle = (props: ChildOnlyType) => (
  <Heading
    as="h4"
    fontSize="1.25rem"
    fontWeight={700}
    lineHeight="22px"
    textAlign="left"
    mt={0}
    {...props}
  />
)

const StepBoxContainer = (props: ChildOnlyType) => (
  <Box mt={4} mb={8} {...props} />
)

const StepBox = (
  props: { to: string } & Record<"titleId" | "descId", TranslationKey>
) => (
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
          as={Link}
          color="inherit"
          textDecoration="inherit"
          to={props.to}
          fontWeight={700}
          textAlign="left"
          _hover={{
            textDecoration: "inherit",
          }}
        >
          <Translation id={props.titleId} />
        </LinkOverlay>
        <Text mb={0}>
          <Translation id={props.descId} />
        </Text>
      </Box>
      <Icon as={MdArrowForward} ml={4} minW={6} />
    </Flex>
  </Flex>
)

const H4 = (props: ChildOnlyType) => (
  <Heading fontSize="1.25rem" fontWeight={700} mt={0} mb={4} {...props} />
)

export interface IProps {}

const StablecoinAccordion: React.FC<IProps> = () => {
  const { cardListGroups } = useStablecoinAccordion()

  return (
    <Accordion borderRadius="base" width="full" allowToggle reduceMotion>
      <AccordionCustomItem category="dapps">
        <LeftColumnPanel>
          <SectionTitle>
            <Translation id="page-stablecoins-accordion-requirements" />
          </SectionTitle>
          <StepBoxContainer>
            <StepBox
              to="/wallets/"
              titleId="page-stablecoins-accordion-swap-requirement-1"
              descId="page-stablecoins-accordion-swap-requirement-1-description"
            />
            <StepBox
              to="/get-eth/"
              titleId="page-stablecoins-accordion-swap-requirement-2"
              descId="page-stablecoins-accordion-swap-requirement-2-description"
            />
          </StepBoxContainer>
          <InfoBanner emoji=":light_bulb:">
            <H4>
              <Translation id="page-stablecoins-accordion-swap-editors-tip" />
            </H4>
            <Text>
              <Translation id="page-stablecoins-accordion-swap-editors-tip-copy" />
            </Text>
            <ButtonLink to="/wallets/find-wallet/?filters=has_card_deposits,has_dex_integrations">
              <Translation id="page-stablecoins-accordion-swap-editors-tip-button" />
            </ButtonLink>
          </InfoBanner>
        </LeftColumnPanel>
        <RightColumnPanel>
          <SectionTitle>
            <Translation id="page-stablecoins-accordion-swap-dapp-title" />
          </SectionTitle>
          <p>
            <Translation id="page-stablecoins-accordion-swap-dapp-intro" />{" "}
            <Link to="/get-eth/#dex">
              <Translation id="page-stablecoins-accordion-swap-dapp-link" />
            </Link>
          </p>
          <CardList content={cardListGroups.dapps} />
        </RightColumnPanel>
      </AccordionCustomItem>
      <AccordionCustomItem category="buy">
        <LeftColumnPanel>
          <SectionTitle>
            <Translation id="page-stablecoins-accordion-requirements" />
          </SectionTitle>
          <Text>
            <Translation id="page-stablecoins-accordion-buy-requirements-description" />
          </Text>
          <StepBoxContainer>
            <StepBox
              to="/get-eth/"
              titleId="page-stablecoins-accordion-buy-requirement-1"
              descId="page-stablecoins-accordion-buy-requirement-1-description"
            />
          </StepBoxContainer>
          <InfoBanner isWarning>
            <Translation id="page-stablecoins-accordion-buy-warning" />
          </InfoBanner>
        </LeftColumnPanel>
        <RightColumnPanel>
          <SectionTitle>
            <Translation id="page-stablecoins-accordion-buy-exchanges-title" />
          </SectionTitle>
          <CardList content={cardListGroups.exchanges} />
        </RightColumnPanel>
      </AccordionCustomItem>
      <AccordionCustomItem category="earn">
        <LeftColumnPanel>
          <SectionTitle>
            <Translation id="page-stablecoins-accordion-requirements" />
          </SectionTitle>
          <p>
            <Translation id="page-stablecoins-accordion-earn-requirements-description" />
          </p>
          <StepBoxContainer>
            <StepBox
              to="/wallets/"
              titleId="page-stablecoins-accordion-earn-requirement-1"
              descId="page-stablecoins-accordion-earn-requirement-1-description"
            />
          </StepBoxContainer>
        </LeftColumnPanel>
        <RightColumnPanel>
          <SectionTitle>
            <Translation id="page-stablecoins-accordion-earn-projects-title" />
          </SectionTitle>
          <p>
            <Translation id="page-stablecoins-accordion-earn-projects-copy" />
          </p>
          <CardList content={cardListGroups.earn} />
        </RightColumnPanel>
      </AccordionCustomItem>
      <AccordionCustomItem category="generate">
        <LeftColumnPanel>
          <SectionTitle>
            <Translation id="page-stablecoins-accordion-requirements" />
          </SectionTitle>
          <p>
            <Translation id="page-stablecoins-accordion-borrow-requirements-description" />
          </p>
          <StepBoxContainer>
            <StepBox
              to="/wallets/"
              titleId="page-stablecoins-accordion-borrow-requirement-1"
              descId="page-stablecoins-accordion-borrow-requirement-1-description"
            />
            <StepBox
              to="/get-eth/"
              titleId="page-stablecoins-accordion-borrow-requirement-2"
              descId="page-stablecoins-accordion-borrow-requirement-2-description"
            />
          </StepBoxContainer>
          <SectionTitle>
            <Translation id="page-stablecoins-accordion-borrow-crypto-collateral" />
          </SectionTitle>
          <p>
            <Translation id="page-stablecoins-accordion-borrow-crypto-collateral-copy" />{" "}
            <Link to="#how">
              <Translation id="page-stablecoins-accordion-borrow-crypto-collateral-link" />
            </Link>
          </p>
          <p>
            <Translation id="page-stablecoins-accordion-borrow-crypto-collateral-copy-p2" />
          </p>
        </LeftColumnPanel>
        <RightColumnPanel>
          <SectionTitle>
            <Translation id="page-stablecoins-accordion-borrow-places-title" />
          </SectionTitle>
          <p>
            <Translation id="page-stablecoins-accordion-borrow-places-intro" />
          </p>
          <Box mb={8}>
            <CardList content={cardListGroups.borrow} />
          </Box>
          <SectionTitle>
            <Translation id="page-stablecoins-accordion-borrow-risks-title" />
          </SectionTitle>
          <p>
            <Translation id="page-stablecoins-accordion-borrow-risks-copy" />{" "}
            <Link to="/eth/">
              <Translation id="page-stablecoins-accordion-borrow-risks-link" />
            </Link>
          </p>
        </RightColumnPanel>
      </AccordionCustomItem>
    </Accordion>
  )
}

export default StablecoinAccordion
