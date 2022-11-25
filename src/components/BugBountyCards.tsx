import React from "react"
import styled from "@emotion/styled"
import {
  Center,
  CenterProps,
  Flex,
  Heading,
  Text as ChakraText,
  Divider as ChakraDivider,
} from "@chakra-ui/react"

import { TranslationKey } from "../utils/translations"
import ButtonLink from "./ButtonLink"

import Translation from "./Translation"

const CardRow = ({ children }) => (
  <Flex justifyContent="space-between" my={16} mx={4} flexWrap="wrap">
    {children}
  </Flex>
)

const StyledButton = ({ children, ...props }) => (
  <ButtonLink m={4} {...props}>
    {children}
  </ButtonLink>
)

const Card = ({ children, ...props }) => {
  return (
    <Flex
      flexDir="column"
      flex={{ base: "1 1 412px", xl: "1 1 260px" }}
      justifyContent="space-between"
      bg="background"
      borderRadius="2px"
      boxShadow="var(--eth-colors-tableBoxShadow)"
      border="1px solid"
      borderColor="border"
      m={4}
      _hover={{
        "border-radius": "4px",
        "box-shadow": "var(--eth-shadows-tableBoxHover)",
        background: "tableBackgroundHover",
        transition: "transform 0.1s",
        transform: "scale(1.02)",
      }}
      {...props}
    >
      {children}
    </Flex>
  )
}

type LabelVariant = "low" | "medium" | "high" | "critical"

type LabelProps = CenterProps & {
  variant: LabelVariant
}

const stylePropsByVariant = {
  low: {
    bg: "lowBug",
    color: "black300",
  },
  medium: {
    bg: "mediumBug",
    color: "black300",
  },
  high: {
    bg: "fail400",
    color: "white",
  },
  critical: {
    bg: "fail600",
    color: "white",
  },
}

const Label = ({ children, variant = "medium", ...props }: LabelProps) => {
  const variantStyleProps = stylePropsByVariant[variant]

  return (
    <Center
      borderTopRightRadius="1px"
      borderTopLeftRadius="1px"
      borderBottomRightRadius={0}
      borderBottomLeftRadius={0}
      borderBottom="1px solid"
      borderColor="border"
      fontSize="sm"
      px={0}
      py={1}
      textTransform="uppercase"
      {...variantStyleProps}
      {...props}
    >
      {children}
    </Center>
  )
}

const LowLabel = ({ children, ...props }) => {
  return (
    <Label variant="low" {...props}>
      {children}
    </Label>
  )
}

const MediumLabel = ({ children, ...props }) => {
  return (
    <Label variant="medium" {...props}>
      {children}
    </Label>
  )
}

const HighLabel = ({ children, ...props }) => {
  return (
    <Label variant="high" {...props}>
      {children}
    </Label>
  )
}

const CriticalLabel = ({ children, ...props }) => {
  return (
    <Label variant="critical" {...props}>
      {children}
    </Label>
  )
}

const H2 = ({ children }) => {
  return (
    <Heading
      fontSize="2xl"
      fontStyle="normal"
      fontWeight="bold"
      lineHeight="22px"
      letterSpacing={0}
      p={4}
      textAlign="left"
      mb={-2}
      mt={2}
    >
      {children}
    </Heading>
  )
}

const Description = ({ children }) => {
  return (
    <ChakraText as="p" fontSize="xl" px={4} py={0} opacity="0.6">
      {children}
    </ChakraText>
  )
}

const Divider = () => {
  return <ChakraDivider opacity="1" />
}

const SubHeader = styled.p`
  text-transform: uppercase;
  font-size: 0.875rem;
  margin-left: 1rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  opacity: 0.6;
`

const Text = styled.div`
  margin: 1rem;
  margin-top: 0.5rem;
`

export interface BugBountyCardInfo {
  lowLabelTranslationId?: TranslationKey
  mediumLabelTranslationId?: TranslationKey
  highLabelTranslationId?: TranslationKey
  criticalLabelTranslationId?: TranslationKey
  h2TranslationId: TranslationKey
  descriptionTranslationId: TranslationKey
  subDescriptionTranslationId: TranslationKey
  subHeader1TranslationId: TranslationKey
  severityList: Array<TranslationKey>
  subHeader2TranslationId: TranslationKey
  textTranslationId: TranslationKey
  styledButtonTranslationId: TranslationKey
}

const bugBountyCardsInfo: Array<BugBountyCardInfo> = [
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

export interface IProps {}

export const BugBountyCards: React.FC<IProps> = () => (
  <CardRow>
    {bugBountyCardsInfo.map((card, idx) => (
      <Card key={`bug-bounty-card-${idx}`}>
        {card.lowLabelTranslationId && (
          <LowLabel>
            <Translation id={card.lowLabelTranslationId} />
          </LowLabel>
        )}
        {card.mediumLabelTranslationId && (
          <MediumLabel>
            <Translation id={card.mediumLabelTranslationId} />
          </MediumLabel>
        )}
        {card.highLabelTranslationId && (
          <HighLabel>
            <Translation id={card.highLabelTranslationId} />
          </HighLabel>
        )}
        {card.criticalLabelTranslationId && (
          <CriticalLabel>
            <Translation id={card.criticalLabelTranslationId} />
          </CriticalLabel>
        )}
        <H2>
          <Translation id={card.h2TranslationId} />
        </H2>
        <Description>
          <Translation id={card.descriptionTranslationId} />
        </Description>
        <SubHeader>
          <Translation id={card.subDescriptionTranslationId} />
        </SubHeader>
        <Divider />
        <SubHeader>
          <Translation id={card.subHeader1TranslationId} />
        </SubHeader>
        <Text>
          <ul>
            {card.severityList.map((listItemId) => (
              <li key={`${listItemId}`}>
                <Translation id={listItemId} />
              </li>
            ))}
          </ul>
        </Text>
        <Divider />
        <SubHeader>
          <Translation id={card.subHeader2TranslationId} />
        </SubHeader>
        <Text>
          <Translation id={card.textTranslationId} />
        </Text>
        <StyledButton to="https://forms.gle/Gnh4gzGh66Yc3V7G8">
          <Translation id={card.styledButtonTranslationId} />
        </StyledButton>
      </Card>
    ))}
  </CardRow>
)

export default BugBountyCards
