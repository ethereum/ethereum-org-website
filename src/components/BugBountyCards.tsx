import React from "react"
import {
  Center,
  CenterProps,
  Flex,
  FlexProps,
  Heading,
  HeadingProps,
  Text,
  TextProps,
  Divider,
  Box,
  BoxProps,
  useToken,
} from "@chakra-ui/react"

import { TranslationKey } from "../utils/translations"
import ButtonLink from "./ButtonLink"

import Translation from "./Translation"

const CardRow = ({ children }) => (
  <Flex justifyContent="space-between" my={16} mx={4} flexWrap="wrap">
    {children}
  </Flex>
)

const SubmitBugBountyButton = ({ children, ...props }) => (
  <ButtonLink m={4} to="https://forms.gle/Gnh4gzGh66Yc3V7G8" {...props}>
    {children}
  </ButtonLink>
)

const Card = ({ children, ...props }: FlexProps) => {
  const tableBoxShadow = useToken("colors", "tableBoxShadow")

  return (
    <Flex
      flexDir="column"
      flex={{ base: "1 1 412px", xl: "1 1 260px" }}
      justifyContent="space-between"
      bg="background.base"
      borderRadius="2px"
      boxShadow={tableBoxShadow}
      border="1px solid"
      borderColor="border"
      m={4}
      _hover={{
        borderRadius: "base",
        boxShadow: "tableBoxHover",
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

const H2 = ({ children, ...props }: HeadingProps) => {
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
      {...props}
    >
      {children}
    </Heading>
  )
}

const Description = ({ children, ...props }: TextProps) => {
  return (
    <Text as="p" fontSize="xl" px={4} py={0} opacity="0.6" {...props}>
      {children}
    </Text>
  )
}

const SubHeader = ({ children, ...props }: TextProps) => {
  return (
    <Text
      as="p"
      textTransform="uppercase"
      fontSize="sm"
      ml={4}
      mt={4}
      mb={2}
      opacity="0.6"
      {...props}
    >
      {children}
    </Text>
  )
}

const TextBox = ({ children, ...props }: BoxProps) => {
  return (
    <Box m={4} mt={2} {...props}>
      {children}
    </Box>
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

const BugBountyCards: React.FC<IProps> = () => (
  <CardRow>
    {bugBountyCardsInfo.map((card, idx) => (
      <Card key={`bug-bounty-card-${idx}`}>
        {card.lowLabelTranslationId && (
          <Label variant="low">
            <Translation id={card.lowLabelTranslationId} />
          </Label>
        )}
        {card.mediumLabelTranslationId && (
          <Label variant="medium">
            <Translation id={card.mediumLabelTranslationId} />
          </Label>
        )}
        {card.highLabelTranslationId && (
          <Label variant="high">
            <Translation id={card.highLabelTranslationId} />
          </Label>
        )}
        {card.criticalLabelTranslationId && (
          <Label variant="critical">
            <Translation id={card.criticalLabelTranslationId} />
          </Label>
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
        <Divider opacity="1" />
        <SubHeader>
          <Translation id={card.subHeader1TranslationId} />
        </SubHeader>
        <TextBox>
          <ul>
            {card.severityList.map((listItemId) => (
              <li key={`${listItemId}`}>
                <Translation id={listItemId} />
              </li>
            ))}
          </ul>
        </TextBox>
        <Divider opacity="1" />
        <SubHeader>
          <Translation id={card.subHeader2TranslationId} />
        </SubHeader>
        <TextBox>
          <Translation id={card.textTranslationId} />
        </TextBox>
        <SubmitBugBountyButton>
          <Translation id={card.styledButtonTranslationId} />
        </SubmitBugBountyButton>
      </Card>
    ))}
  </CardRow>
)

export default BugBountyCards
