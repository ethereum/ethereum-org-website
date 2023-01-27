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
import { useIntl } from "react-intl"

// Components
import Translation from "../Translation"

// Icons
import BuyCrypto from "../../assets/wallets/buy_crypto.svg"
import ENSSupport from "../../assets/wallets/ens_support.svg"
import ERC20Support from "../../assets/wallets/erc_20_support.svg"
import GasFeeCustomization from "../../assets/wallets/gas_fee_customization.svg"
import HardwareSupport from "../../assets/wallets/hardware_support.svg"
import Hardware from "../../assets/wallets/hardware.svg"
import Layer2 from "../../assets/wallets/layer_2.svg"
import NFTSupport from "../../assets/wallets/nft_support.svg"
import NonCustodial from "../../assets/wallets/non_custodial.svg"
import OpenSource from "../../assets/wallets/open_source.svg"
import RPCImporting from "../../assets/wallets/rpc_importing.svg"
import Staking from "../../assets/wallets/staking.svg"
import WalletConnect from "../../assets/wallets/walletconnect.svg"
import ConnectDapps from "../../assets/wallets/connect_dapps.svg"
import WithdrawCrypto from "../../assets/wallets/withdraw_crypto.svg"
import Multisig from "../../assets/wallets/multisig.svg"
import SocialRecover from "../../assets/wallets/social_recover.svg"
import Swap from "../../assets/wallets/swap.svg"
import Eip1559 from "../../assets/wallets/eip1559.svg"
import { MdCircle } from "react-icons/md"

// Utils
import { trackCustomEvent } from "../../utils/matomo"
import { translateMessageId } from "../../utils/translations"

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
  const intl = useIntl()
  const { colorMode } = useColorMode()
  const isDark = colorMode === "dark"

  const filterLabels = {
    hardware: {
      label: translateMessageId("page-find-wallet-hardware", intl),
      icon: <Hardware />,
    },
    open_source: {
      label: translateMessageId("page-find-wallet-open-source", intl),
      icon: <OpenSource />,
    },
    non_custodial: {
      label: translateMessageId("page-find-wallet-non-custodial", intl),
      icon: <NonCustodial />,
    },
    hardware_support: {
      label: translateMessageId(
        "page-find-wallet-hardware-wallet-support",
        intl
      ),
      icon: <HardwareSupport />,
    },
    walletconnect: {
      label: translateMessageId("page-find-wallet-walletconnect", intl),
      icon: <WalletConnect />,
    },
    rpc_importing: {
      label: translateMessageId("page-find-wallet-rpc-importing", intl),
      icon: <RPCImporting />,
    },
    nft_support: {
      label: translateMessageId("page-find-wallet-nft-support", intl),
      icon: <NFTSupport />,
    },
    connect_to_dapps: {
      label: translateMessageId("page-find-wallet-connect-to-dapps", intl),
      icon: <ConnectDapps />,
    },
    staking: {
      label: translateMessageId("page-find-wallet-staking", intl),
      icon: <Staking />,
    },
    swaps: {
      label: translateMessageId("page-find-wallet-swaps", intl),
      icon: <Swap />,
    },
    layer_2: {
      label: translateMessageId("page-find-wallet-layer-2", intl),
      icon: <Layer2 />,
    },
    gas_fee_customization: {
      label: translateMessageId("page-find-wallet-gas-fee-customization", intl),
      icon: <GasFeeCustomization />,
    },
    ens_support: {
      label: translateMessageId("page-find-wallet-ens-support", intl),
      icon: <ENSSupport />,
    },
    buy_crypto: {
      label: translateMessageId("page-find-wallet-buy-crypto", intl),
      icon: <BuyCrypto />,
    },
    withdraw_crypto: {
      label: translateMessageId("page-find-wallet-sell-for-fiat", intl),
      icon: <WithdrawCrypto />,
    },
    multisig: {
      label: translateMessageId("page-find-wallet-multisig", intl),
      icon: <Multisig />,
    },
    social_recovery: {
      label: translateMessageId("page-find-wallet-social-recovery", intl),
      icon: <SocialRecover />,
    },
    erc_20_support: {
      label: translateMessageId("page-find-wallet-token-support", intl),
      icon: <ERC20Support />,
    },
    eip_1559_support: {
      label: translateMessageId("page-find-wallet-fee-optimization", intl),
      icon: <Eip1559 />,
    },
  }
  const personas: Personas[] = [
    {
      title: translateMessageId("page-find-wallet-new-to-crypto-title", intl),
      description: translateMessageId(
        "page-find-wallet-new-to-crypto-desc",
        intl
      ),
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
      title: translateMessageId("page-find-wallet-nfts-title", intl),
      description: translateMessageId("page-find-wallet-nfts-desc", intl),
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
      title: translateMessageId("page-find-wallet-hodler-title", intl),
      description: translateMessageId("page-find-wallet-hodler-desc", intl),
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
      title: translateMessageId("page-find-wallet-finance-title", intl),
      description: translateMessageId("page-find-wallet-finance-desc", intl),
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
      title: translateMessageId("page-find-wallet-developer-title", intl),
      description: translateMessageId("page-find-wallet-developer-desc", intl),
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
                    selectedPersona === idx ? "primary" : "rgba(0, 0, 0, 0)"
                  }
                  background={
                    selectedPersona === idx ? "primary" : "priceCardBackground"
                  }
                  outline="1.5px solid"
                  outlineColor={selectedPersona === idx ? "primary" : "text"}
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
                      color: selectedPersona === idx ? "primary" : "text",
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
