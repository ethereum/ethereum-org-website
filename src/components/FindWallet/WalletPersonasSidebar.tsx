// Libraries
import React, { useContext } from "react"
import styled, { ThemeContext } from "styled-components"

// Components
import Icon from "../Icon"

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

// Utils
import { trackCustomEvent } from "../../utils/matomo"

// Styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    padding: 1rem 1rem;
  }
`

const FeatureListItem = styled.li<{
  selected: boolean
}>`
  display: flex;
  gap: 0.2rem;
  font-size: 0.85rem;
  line-height: 0.95rem;
  margin: 0.1rem;
  align-items: center;
  p {
    margin-bottom: 0;
    color: ${(props) =>
      props.selected === true
        ? props.theme.colors.primary
        : props.theme.colors.text};
  }

  svg {
    width: 28px;
    height: 28px;
    path {
      fill: ${(props) => props.theme.colors.text};
      stroke: ${(props) => props.theme.colors.text};
    }
  }
`

const Persona = styled.div<{
  selected: boolean
  isDark: boolean
}>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.5rem;
  background: ${({ selected, isDark, theme }) =>
    selected
      ? isDark
        ? theme.colors.primary900
        : theme.colors.primary200
      : isDark
      ? theme.colors.black400
      : theme.colors.primary100};
  border-radius: 4px;
  cursor: pointer;
  transition: 0.5s all;

  h3 {
    color: ${(props) => props.theme.colors.text};
  }

  &:hover {
    background: ${(props) =>
      props.selected === true
        ? props.isDark === true
          ? props.theme.colors.primary900
          : props.theme.colors.primary200
        : props.isDark === true
        ? props.theme.colors.black500
        : props.theme.colors.primary200};
    transition: 0.5s all;
  }
`

const PersonaDescription = styled.span<{
  selected: boolean
}>`
  margin: 0.5rem 0 0.8rem 0;
  padding: 0.7rem 0.6rem 0;
  color: ${(props) =>
    props.selected === true
      ? props.theme.colors.text
      : props.theme.colors.text200};
  font-size: 0.9rem;
  font-weight: normal;
  transition: 0.5s all;
  line-height: 1.3;
  border-top: 1px solid ${(props) => props.theme.colors.lightBorder};
`

const Title = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  gap: "1rem";
  margin-bottom: 0.6rem;
  padding: 0.5rem 0.5rem 0 0.5rem;
`

const H3 = styled.h3`
  margin-left: 0.5rem;
  margin-top: 0;
  margin-bottom: 0;
  font-size: 1.3rem;
  padding: 0 0.25rem 0 0;
  line-height: 1.7rem;
`
const ProfileFilterPrompt = styled.span`
  margin: 0;
  font-weight: normal;
  font-size: 0.875rem;
  padding: 0 1.2rem;
  line-height: 1.3rem;
  text-align: center;
  color: ${(props) => props.theme.colors.secondary};
`

const FeatureGridList = styled.ul`
  margin: 0;
  display: grid;
  grid-template-columns: 50% 50%;
  width: 100%;
  column-gap: 0.2rem;
  row-gap: 0.5rem;
`

const IconContainer = styled.div`
  width: 1.3rem;
  height: 1.3rem;
`

const StyledIcon = styled(Icon)<{ selected: boolean }>`
  width: 1.3rem;
  height: 1.3rem;
  margin: 0 0.25rem;
  fill: ${(props) =>
    props.selected === true ? props.theme.colors.white : "rgba(0, 0, 0, 0)"};
  background: ${(props) =>
    props.selected === true
      ? props.theme.colors.primary
      : props.theme.colors.priceCardBackground};
  border-radius: 4px;
  border: 1px solid
    ${(props) =>
      props.selected === true
        ? props.theme.colors.primary
        : props.theme.colors.text};
`

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

const filterLabels = {
  hardware: {
    label: "Hardware",
    icon: <Hardware />,
  },
  open_source: {
    label: "Open source",
    icon: <OpenSource />,
  },
  non_custodial: {
    label: "Non-custodial",
    icon: <NonCustodial />,
  },
  hardware_support: {
    label: "Hardware support",
    icon: <HardwareSupport />,
  },
  walletconnect: {
    label: "WalletConnect",
    icon: <WalletConnect />,
  },
  rpc_importing: {
    label: "RPC importing",
    icon: <RPCImporting />,
  },
  nft_support: {
    label: "NFT support",
    icon: <NFTSupport />,
  },
  connect_to_dapps: {
    label: "Connect to apps",
    icon: <ConnectDapps />,
  },
  staking: {
    label: "Staking",
    icon: <Staking />,
  },
  swaps: {
    label: "Swaps",
    icon: <Swap />,
  },
  layer_2: {
    label: "Layer 2",
    icon: <Layer2 />,
  },
  gas_fee_customization: {
    label: "Gas fee customization",
    icon: <GasFeeCustomization />,
  },
  ens_support: {
    label: "ENS support",
    icon: <ENSSupport />,
  },
  buy_crypto: {
    label: "Buy crypto",
    icon: <BuyCrypto />,
  },
  withdraw_crypto: {
    label: "Withdraw crypto",
    icon: <WithdrawCrypto />,
  },
  multisig: {
    label: "Multisig",
    icon: <Multisig />,
  },
  social_recovery: {
    label: "Social recovery",
    icon: <SocialRecover />,
  },
  erc_20_support: {
    label: "Token support",
    icon: <ERC20Support />,
  },
  eip_1559_support: {
    label: "EIP-1559 support",
    icon: <Eip1559 />,
  },
}

const WalletPersonasSidebar = ({
  resetFilters,
  setFilters,
  selectedPersona,
  setSelectedPersona,
}) => {
  const themeContext = useContext(ThemeContext)
  const personas: Personas[] = [
    {
      title: "New to crypto",
      description: "You are a first time user looking for your first wallet",
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
      title: "NFTs",
      description:
        "You are someone that is all about NFTs and want a wallet with NFT support",
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
      title: "Hodler",
      description:
        "You are someone that has tokens and don’t want to touch them",
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
      title: "Finance",
      description:
        "You are someone that uses DeFi and want a wallet that allows you to connect to DeFi applications",
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
      title: "Developer",
      description:
        "You are developer and need a wallet to help develop and test dapps",
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
    <Container>
      <ProfileFilterPrompt>
        Choose the profile that matches your type of user and filter the wallet
        list
      </ProfileFilterPrompt>
      {personas.map((persona, idx) => {
        return (
          <Persona
            isDark={themeContext.isDark}
            selected={selectedPersona === idx}
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
            <Title>
              <IconContainer
                role="checkbox"
                aria-label={`${persona.title} filter`}
              >
                <StyledIcon
                  name="check"
                  selected={selectedPersona === idx}
                  size="2rem"
                />
              </IconContainer>
              <H3>{persona.title}</H3>
            </Title>
            <PersonaDescription selected={selectedPersona === idx}>
              {persona.description}
            </PersonaDescription>
            <FeatureGridList aria-label={`${persona.title} filters`}>
              {persona.featureHighlight.map((feature) => (
                <FeatureListItem selected={selectedPersona === idx}>
                  <span aria-hidden="true">{feature.icon}</span>
                  <span>{feature.label}</span>
                </FeatureListItem>
              ))}
            </FeatureGridList>
          </Persona>
        )
      })}
    </Container>
  )
}

export default WalletPersonasSidebar
