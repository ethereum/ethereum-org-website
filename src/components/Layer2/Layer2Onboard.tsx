import { useState } from "react"
import { StaticImageData } from "next/image"
import { useTranslation } from "next-i18next"
import {
  Box,
  chakra,
  Flex,
  ListItem,
  SimpleGrid,
  Stack,
  UnorderedList,
} from "@chakra-ui/react"

import type { ChildOnlyProp } from "@/lib/types"

import { Image } from "@/components/Image"

import { trackCustomEvent } from "@/lib/utils/matomo"

// Data
import {
  CexOnboard,
  cexOnboardData,
} from "../../data/layer-2/cex-layer-2-onboard"
import cexSupport from "../../data/layer-2/cex-layer-2-support.json"
// Components
import { ButtonLink } from "../Buttons"
import InlineLink from "../Link"
import OldHeading from "../OldHeading"
import Text from "../OldText"
import { StyledSelect as Select } from "../SharedStyledComponents"

const Flex50 = (props: ChildOnlyProp) => (
  <Box flex={{ base: "100%", md: "50%" }} {...props} />
)

const TwoColumnContent = (props: ChildOnlyProp) => (
  <Flex
    flexDir={{ base: "column", lg: "row" }}
    alignItems={{ base: "flex-start", lg: "normal" }}
    gap={8}
    justifyContent="space-between"
    {...props}
  />
)

const ChakraSelect = chakra((props: { className?: string }) => (
  <Select {...props} />
))
const StyledSelect = (props: any) => (
  <Box mt="auto">
    <ChakraSelect
      maxW="none"
      sx={{ ".react-select__control": { py: { base: "14px", sm: "0" } } }}
      {...props}
    />
  </Box>
)

const SelectedContainer = (props: ChildOnlyProp) => (
  <Box bg="rgba(255, 255, 255, 0.02)" mt={2} p="21px" {...props} />
)

const H3 = (props: ChildOnlyProp) => (
  <OldHeading
    as="h3"
    mt={0}
    fontSize={{ base: "xl", md: "2xl" }}
    lineHeight={1.4}
    fontWeight={600}
    {...props}
  />
)

const H4 = (props: ChildOnlyProp) => (
  <OldHeading
    as="h4"
    fontSize={{ base: "md", md: "xl" }}
    fontWeight={500}
    lineHeight={1.4}
    {...props}
  />
)

interface Exchange {
  name: string
  supports_deposits: Array<string>
  supports_withdrawals: Array<string>
  url: string
}

interface Layer2 {
  name: string
  bridgeWallets: Array<string>
  bridge: string
}

interface Option {
  value: string
  label: string
}

interface Layer2Option extends Option {
  l2: Layer2
}

interface ExchangeOption extends Option {
  cex: Exchange
}

interface CexOnboardOption extends Option {
  cexOnboard: CexOnboard
}

export type Layer2OnboardProps = {
  layer2DataCombined: Array<Layer2>
  ethIcon: StaticImageData
  ethIconAlt: string
}

const Layer2Onboard = ({
  layer2DataCombined,
  ethIcon,
  ethIconAlt,
}: Layer2OnboardProps) => {
  const { t } = useTranslation("page-layer-2")

  const [selectedCexOnboard, setSelectedCexOnboard] = useState<
    CexOnboard | undefined
  >(undefined)
  const [selectedExchange, setSelectedExchange] = useState<
    Exchange | undefined
  >(undefined)
  const [selectedL2, setSelectedL2] = useState<Layer2 | undefined>(undefined)

  const layer2Options: Array<Layer2Option> = layer2DataCombined.map((l2) => {
    return {
      label: l2.name,
      value: l2.name,
      l2,
    }
  })

  const cexSupportOptions: Array<ExchangeOption> = cexSupport.map(
    (cex: Exchange) => {
      return {
        label: cex.name,
        value: cex.name,
        cex,
      }
    }
  )

  const cexOnboardOptions: Array<CexOnboardOption> = cexOnboardData.map(
    (cexOnboard: CexOnboard) => {
      return {
        label: cexOnboard.name,
        value: cexOnboard.name,
        cexOnboard: cexOnboard,
      }
    }
  )

  const formatGroupLabel = (data) => {
    return data.label ? (
      <Stack borderTop="2px solid" m={0}>
        <Text mb={0} mt={2} textTransform="none" color="theme.colors.text">
          {data.label}
        </Text>
      </Stack>
    ) : (
      <></>
    )
  }

  const selectExchangeOnboard = (option: ExchangeOption & CexOnboardOption) => {
    if (Object.hasOwn(option, "cex")) {
      trackCustomEvent({
        eventCategory: `Selected cex to onboard`,
        eventAction: `Clicked`,
        eventName: `${option.cex.name} selected`,
        eventValue: `${option.cex.name}`,
      })
      setSelectedExchange(option.cex)
      setSelectedCexOnboard(undefined)
    } else {
      trackCustomEvent({
        eventCategory: `Selected cexOnboard to onboard`,
        eventAction: `Clicked`,
        eventName: `${option.cexOnboard.name} selected`,
        eventValue: `${option.cexOnboard.name}`,
      })
      setSelectedCexOnboard(option.cexOnboard)
      setSelectedExchange(undefined)
    }
  }

  const gridContentPlacementStyles = {
    gridContainer: {
      columns: { base: 1, md: 2 },
      templateRows: {
        base: "repeat(3, min-content)",
        md: "repeat(2, min-content)",
      },
      columnGap: "70px",
      rowGap: "10px",
    },
    selectedL2: {
      gridRow: { base: 2, md: "2/-1" },
      gridColumn: { md: "1/2" },
    },
    rightSideSelected: {
      gridRow: { md: "2/-1" },
      gridColumn: { md: "2/-1" },
    },
    logo: {
      gridColumn: { md: "1 / 3" },
      gridRow: { base: selectedL2 ? 3 : 2, md: 2 },
      placeSelf: "center",
    },
  } as const

  return (
    <Box bg="layer2Gradient" borderRadius="sm" p={10}>
      <Box textAlign="center" maxW="75ch" m="auto">
        <OldHeading
          fontSize={{ base: "2xl", md: "2rem" }}
          mt="12"
          fontWeight={600}
          lineHeight={1.4}
        >
          {t("layer-2-onboard-title")}
        </OldHeading>
        <Text>{t("layer-2-onboard-1")}</Text>
      </Box>
      <SimpleGrid {...gridContentPlacementStyles.gridContainer}>
        <Flex flexDir="column">
          {/* LeftDescription */}
          <Box>
            <H4>{t("layer-2-onboard-wallet-title")}</H4>
            <Text>{t("layer-2-onboard-wallet-1")}</Text>
            <Text>
              <InlineLink to="/bridges/">
                {t("layer-2-more-on-bridges")}
              </InlineLink>
            </Text>
          </Box>
          {/* LeftSelected */}
          <StyledSelect
            className="react-select-container"
            classNamePrefix="react-select"
            options={layer2Options}
            onChange={(selectedOption: Layer2Option) => {
              trackCustomEvent({
                eventCategory: `Selected layer 2 to bridge to`,
                eventAction: `Clicked`,
                eventName: `${selectedOption.l2.name} bridge selected`,
                eventValue: `${selectedOption.l2.name}`,
              })
              setSelectedL2(selectedOption.l2)
            }}
            placeholder={t("layer-2-onboard-wallet-input-placeholder")}
          />
        </Flex>
        <Flex flexDir="column">
          {/* RightDescription */}
          <Box>
            <H4>{t("layer-2-onboard-exchange-title")}</H4>
            <Text>{t("layer-2-onboard-exchange-1")}</Text>
            <Text>
              {t("layer-2-onboard-exchange-2")}{" "}
              <InlineLink to="/wallets/find-wallet/">
                {t("layer-2-onboard-find-a-wallet")}
              </InlineLink>
            </Text>
          </Box>
          {/* RightSelect */}
          <StyledSelect
            className="react-select-container"
            classNamePrefix="react-select"
            options={[
              {
                options: [...cexSupportOptions],
              },
              {
                label:
                  "Don't see you exchange? Use dapps to bridge directly from exchanges to layer 2.",
                options: [...cexOnboardOptions],
              },
            ]}
            onChange={(selectedOption: ExchangeOption & CexOnboardOption) => {
              selectExchangeOnboard(selectedOption)
            }}
            placeholder={t("layer-2-onboard-exchange-input-placeholder")}
            formatGroupLabel={formatGroupLabel}
          />
        </Flex>
        {/* LeftSelected extra */}
        {selectedL2 && (
          <Box {...gridContentPlacementStyles.selectedL2}>
            <SelectedContainer>
              <Text>
                <b>{`${t("layer-2-onboard-wallet-selected-1")} ${
                  selectedL2.name
                } ${t("layer-2-onboard-wallet-selected-2")}`}</b>
              </Text>
              <Text>{selectedL2.bridgeWallets.join(", ")}</Text>
              <ButtonLink to={selectedL2.bridge} mt={10}>
                {`${selectedL2.name} ${t("layer-2-bridge")}`}
              </ButtonLink>
            </SelectedContainer>
          </Box>
        )}
        {/* RightSelect exchange */}
        {selectedExchange && (
          <Box {...gridContentPlacementStyles.rightSideSelected}>
            <SelectedContainer>
              <TwoColumnContent>
                <Flex50>
                  <H3>{t("layer-2-deposits")}</H3>
                  <UnorderedList>
                    {selectedExchange.supports_deposits.map((l2) => (
                      <ListItem key={l2}>{l2}</ListItem>
                    ))}
                  </UnorderedList>
                </Flex50>
                <Flex50>
                  <H3>{t("layer-2-withdrawals")}</H3>
                  <UnorderedList>
                    {selectedExchange.supports_withdrawals.map((l2) => (
                      <ListItem key={l2}>{l2}</ListItem>
                    ))}
                  </UnorderedList>
                </Flex50>
              </TwoColumnContent>
              <ButtonLink to={selectedExchange.url}>
                {`${t("layer-2-go-to")} ${selectedExchange.name}`}
              </ButtonLink>
            </SelectedContainer>
          </Box>
        )}
        {/* RightSelect Cex */}
        {selectedCexOnboard && (
          <Box {...gridContentPlacementStyles.rightSideSelected}>
            <SelectedContainer>
              <H3>Supported exchanges</H3>
              <Text>{selectedCexOnboard.cex_support.join(", ")}</Text>
              <H3>Supported layer 2s</H3>
              <Text>{selectedCexOnboard.network_support.join(", ")}</Text>
              <ButtonLink to={selectedCexOnboard.url}>
                {`${t("layer-2-go-to")} ${selectedCexOnboard.name}`}
              </ButtonLink>
            </SelectedContainer>
          </Box>
        )}
        {/* EthLogo */}
        <Box {...gridContentPlacementStyles.logo}>
          <Image
            src={ethIcon}
            alt={ethIconAlt}
            width={50}
            style={{ objectFit: "contain" }}
          />
        </Box>
      </SimpleGrid>
    </Box>
  )
}

export default Layer2Onboard
