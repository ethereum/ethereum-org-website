// Libraries
import React from "react"
import {
  Box,
  Flex,
  Heading,
  ListItem,
  UnorderedList,
  useColorMode,
  Icon,
} from "@chakra-ui/react"
import { useTranslation } from "gatsby-plugin-react-i18next"

// Components
import Translation from "../Translation"

// Icons
import { MdCircle } from "react-icons/md"
import {
  BuyCryptoIcon,
  ConnectDappsIcon,
  EIP1559Icon,
  ENSSupportIcon,
  ERC20SupportIcon,
  GasFeeCustomizationIcon,
  HardwareIcon,
  HardwareSupportIcon,
  Layer2Icon,
  MultisigIcon,
  NFTSupportIcon,
  NonCustodialIcon,
  OpenSourceWalletIcon,
  RPCImportingIcon,
  SocialRecoverIcon,
  StakingIcon,
  SwapIcon,
  WalletConnectIcon,
  WithdrawCryptoIcon,
} from "../icons/wallets"

// Utils
import { trackCustomEvent } from "../../utils/matomo"

// Types
interface Personas {
  title: string
  description: string
  featureHighlight: { label: string; icon: JSX.Element }[]
  presetFilters: {
    android: boolean
    ios: boolean
    linux: boolean
    windows: boolean
    macOS: boolean
    firefox: boolean
    chromium: boolean
    hardware: boolean
    open_source: boolean
    non_custodial: boolean
    hardware_support: boolean
    walletconnect: boolean
    rpc_importing: boolean
    nft_support: boolean
    connect_to_dapps: boolean
    staking: boolean
    swaps: boolean
    layer_2: boolean
    gas_fee_customization: boolean
    ens_support: boolean
    erc_20_support: boolean
    buy_crypto: boolean
    withdraw_crypto: boolean
    multisig: boolean
    social_recovery: boolean
    eip_1559_support: boolean
  }
}

const WalletPersonasSidebar = ({
  resetFilters,
  setFilters,
  selectedPersona,
  setSelectedPersona,
}) => {
  const { t } = useTranslation()
  const { colorMode } = useColorMode()
  const isDark = colorMode === "dark"

  const filterLabels = {
    hardware: {
      label: t("page-find-wallet-hardware"),
      icon: <HardwareIcon />,
    },
    open_source: {
      label: t("page-find-wallet-open-source"),
      icon: <OpenSourceWalletIcon />,
    },
    non_custodial: {
      label: t("page-find-wallet-non-custodial"),
      icon: <NonCustodialIcon />,
    },
    hardware_support: {
      label: t("page-find-wallet-hardware-wallet-support"),
      icon: <HardwareSupportIcon />,
    },
    walletconnect: {
      label: t("page-find-wallet-walletconnect"),
      icon: <WalletConnectIcon />,
    },
    rpc_importing: {
      label: t("page-find-wallet-rpc-importing"),
      icon: <RPCImportingIcon />,
    },
    nft_support: {
      label: t("page-find-wallet-nft-support"),
      icon: <NFTSupportIcon />,
    },
    connect_to_dapps: {
      label: t("page-find-wallet-connect-to-dapps"),
      icon: <ConnectDappsIcon />,
    },
    staking: {
      label: t("page-find-wallet-staking"),
      icon: <StakingIcon />,
    },
    swaps: {
      label: t("page-find-wallet-swaps"),
      icon: <SwapIcon />,
    },
    layer_2: {
      label: t("page-find-wallet-layer-2"),
      icon: <Layer2Icon />,
    },
    gas_fee_customization: {
      label: t("page-find-wallet-gas-fee-customization"),
      icon: <GasFeeCustomizationIcon />,
    },
    ens_support: {
      label: t("page-find-wallet-ens-support"),
      icon: <ENSSupportIcon />,
    },
    buy_crypto: {
      label: t("page-find-wallet-buy-crypto"),
      icon: <BuyCryptoIcon />,
    },
    withdraw_crypto: {
      label: t("page-find-wallet-sell-for-fiat"),
      icon: <WithdrawCryptoIcon />,
    },
    multisig: {
      label: t("page-find-wallet-multisig"),
      icon: <MultisigIcon />,
    },
    social_recovery: {
      label: t("page-find-wallet-social-recovery"),
      icon: <SocialRecoverIcon />,
    },
    erc_20_support: {
      label: t("page-find-wallet-token-support"),
      icon: <ERC20SupportIcon />,
    },
    eip_1559_support: {
      label: t("page-find-wallet-fee-optimization"),
      icon: <EIP1559Icon />,
    },
  }
  const personas: Personas[] = [
    {
      title: t("page-find-wallet-new-to-crypto-title"),
      description: t("page-find-wallet-new-to-crypto-desc"),
      featureHighlight: [
        filterLabels.connect_to_dapps,
        filterLabels.layer_2,
        filterLabels.ens_support,
        filterLabels.erc_20_support,
        filterLabels.buy_crypto,
        filterLabels.eip_1559_support,
      ],
      presetFilters: {
        android: false,
        ios: false,
        linux: false,
        windows: false,
        macOS: false,
        firefox: false,
        chromium: false,
        hardware: false,
        open_source: false,
        non_custodial: false,
        hardware_support: false,
        walletconnect: false,
        rpc_importing: false,
        nft_support: false,
        connect_to_dapps: true,
        staking: false,
        swaps: false,
        layer_2: true,
        gas_fee_customization: false,
        ens_support: true,
        erc_20_support: true,
        buy_crypto: true,
        withdraw_crypto: false,
        multisig: false,
        social_recovery: false,
        eip_1559_support: true,
      },
    },
    {
      title: t("page-find-wallet-nfts-title"),
      description: t("page-find-wallet-nfts-desc"),
      featureHighlight: [
        filterLabels.nft_support,
        filterLabels.layer_2,
        filterLabels.connect_to_dapps,
      ],
      presetFilters: {
        android: false,
        ios: false,
        linux: false,
        windows: false,
        macOS: false,
        firefox: false,
        chromium: false,
        hardware: false,
        open_source: false,
        non_custodial: false,
        hardware_support: false,
        walletconnect: false,
        rpc_importing: false,
        nft_support: true,
        connect_to_dapps: true,
        staking: false,
        swaps: false,
        layer_2: true,
        gas_fee_customization: false,
        ens_support: false,
        erc_20_support: false,
        buy_crypto: false,
        withdraw_crypto: false,
        multisig: false,
        social_recovery: false,
        eip_1559_support: false,
      },
    },
    {
      title: t("page-find-wallet-hodler-title"),
      description: t("page-find-wallet-hodler-desc"),
      featureHighlight: [filterLabels.hardware, filterLabels.non_custodial],
      presetFilters: {
        android: false,
        ios: false,
        linux: false,
        windows: false,
        macOS: false,
        firefox: false,
        chromium: false,
        hardware: true,
        open_source: false,
        non_custodial: true,
        hardware_support: false,
        walletconnect: false,
        rpc_importing: false,
        nft_support: false,
        connect_to_dapps: false,
        staking: false,
        swaps: false,
        layer_2: false,
        gas_fee_customization: false,
        ens_support: false,
        erc_20_support: false,
        buy_crypto: false,
        withdraw_crypto: false,
        multisig: false,
        social_recovery: false,
        eip_1559_support: false,
      },
    },
    {
      title: t("page-find-wallet-finance-title"),
      description: t("page-find-wallet-finance-desc"),
      featureHighlight: [
        filterLabels.hardware_support,
        filterLabels.connect_to_dapps,
        filterLabels.gas_fee_customization,
        filterLabels.erc_20_support,
        filterLabels.eip_1559_support,
      ],
      presetFilters: {
        android: false,
        ios: false,
        linux: false,
        windows: false,
        macOS: false,
        firefox: false,
        chromium: false,
        hardware: false,
        open_source: false,
        non_custodial: false,
        hardware_support: true,
        walletconnect: false,
        rpc_importing: false,
        nft_support: false,
        connect_to_dapps: true,
        staking: false,
        swaps: false,
        layer_2: false,
        gas_fee_customization: true,
        ens_support: false,
        erc_20_support: true,
        buy_crypto: false,
        withdraw_crypto: false,
        multisig: false,
        social_recovery: false,
        eip_1559_support: true,
      },
    },
    {
      title: t("page-find-wallet-developer-title"),
      description: t("page-find-wallet-developer-desc"),
      featureHighlight: [
        filterLabels.open_source,
        filterLabels.walletconnect,
        filterLabels.rpc_importing,
        filterLabels.connect_to_dapps,
        filterLabels.gas_fee_customization,
        filterLabels.erc_20_support,
      ],
      presetFilters: {
        android: false,
        ios: false,
        linux: false,
        windows: false,
        macOS: false,
        firefox: false,
        chromium: false,
        hardware: false,
        open_source: false,
        non_custodial: false,
        hardware_support: false,
        walletconnect: true,
        rpc_importing: true,
        nft_support: false,
        connect_to_dapps: true,
        staking: false,
        swaps: false,
        layer_2: true,
        gas_fee_customization: true,
        ens_support: false,
        erc_20_support: true,
        buy_crypto: false,
        withdraw_crypto: false,
        multisig: false,
        social_recovery: false,
        eip_1559_support: false,
      },
    },
  ]

  return (
    <Flex direction="column" gap={4} p={{ base: 4, sm: 0 }}>
      <Box
        as="span"
        m={0}
        fontWeight="normal"
        fontSize="sm"
        p="0 1.2rem"
        lineHeight="1.3rem"
        textAlign="center"
        color="secondary"
      >
        <Translation id="page-find-wallet-persona-desc" />
      </Box>
      {personas.map((persona, idx) => {
        return (
          <Flex
            key={persona.title}
            direction="column"
            alignItems="flex-start"
            padding={6}
            background={
              selectedPersona === idx
                ? isDark
                  ? "primary900"
                  : "primary200"
                : isDark
                ? "black400"
                : "primary100"
            }
            borderRadius="base"
            cursor="pointer"
            transition="0.5s all"
            _hover={{
              background:
                selectedPersona === idx
                  ? isDark
                    ? "primary900"
                    : "primary200"
                  : isDark
                  ? "black500"
                  : "primary200",
            }}
            onClick={() => {
              if (idx === selectedPersona) {
                resetFilters()
                trackCustomEvent({
                  eventCategory: "UserPersona",
                  eventAction: `${persona.title}`,
                  eventName: `${persona.title} false`,
                })
              } else {
                setSelectedPersona(idx)
                setFilters(persona.presetFilters)
                trackCustomEvent({
                  eventCategory: "UserPersona",
                  eventAction: `${persona.title}`,
                  eventName: `${persona.title} true`,
                })
              }
            }}
          >
            <Flex alignItems="center" gap={2} mb="0.6rem" pt={2} pb={0} px={2}>
              <Box
                boxSize="1.3rem"
                role="checkbox"
                aria-label={`${persona.title} filter`}
              >
                <Icon
                  as={MdCircle}
                  borderRadius="full"
                  boxSize={4}
                  my={0}
                  mx={1}
                  fill={
                    selectedPersona === idx
                      ? "primary.base"
                      : "rgba(0, 0, 0, 0)"
                  }
                  background={
                    selectedPersona === idx
                      ? "primary.base"
                      : "priceCardBackground"
                  }
                  outline="1.5px solid"
                  outlineColor={
                    selectedPersona === idx ? "primary.base" : "text"
                  }
                  outlineOffset="3px"
                  fontSize={8}
                />
              </Box>
              <Heading
                as="h3"
                ml={2}
                my={0}
                fontSize="1.3rem"
                py={0}
                pr={1}
                pl={0}
                lineHeight="1.7rem"
                color="text"
              >
                {persona.title}
              </Heading>
            </Flex>
            <Box
              as="span"
              m="0.5rem 0 0.8rem 0"
              p="0.7rem 0.6rem 0"
              color={selectedPersona === idx ? "text" : "text200"}
              fontSize="0.9rem"
              fontWeight="normal"
              transition="0.5s all"
              lineHeight={1.3}
              borderTop="1px solid"
              borderTopColor="lightBorder"
            >
              {persona.description}
            </Box>
            <UnorderedList
              m={0}
              display="grid"
              gridTemplateColumns="50% 50%"
              width="full"
              columnGap="0.2rem"
              rowGap={2}
              aria-label={`${persona.title} filters`}
            >
              {persona.featureHighlight.map((feature) => (
                <ListItem
                  display="flex"
                  gap="0.2rem"
                  fontSize="0.85rem"
                  lineHeight="0.95rem"
                  margin="0.1rem"
                  alignItems="center"
                  sx={{
                    p: {
                      mb: 0,
                      color: selectedPersona === idx ? "primary.base" : "text",
                    },
                    svg: {
                      width: 7,
                      height: 7,
                      path: {
                        fill: "text",
                        stroke: "text",
                      },
                    },
                  }}
                >
                  <span aria-hidden="true">{feature.icon}</span>
                  <span>{feature.label}</span>
                </ListItem>
              ))}
            </UnorderedList>
          </Flex>
        )
      })}
    </Flex>
  )
}

export default WalletPersonasSidebar
