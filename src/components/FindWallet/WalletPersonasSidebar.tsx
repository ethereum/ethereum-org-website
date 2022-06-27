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

// Styles
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: ${(props) => props.theme.breakpoints.s}) {
    padding: 1rem 1rem;
  }
`

const PersonaFeature = styled.div<{
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
      fill: ${(props) =>
        props.selected === true
          ? props.theme.colors.primary
          : props.theme.colors.text};
      stroke: ${(props) =>
        props.selected === true
          ? props.theme.colors.black
          : props.theme.colors.text};
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
  background: ${(props) =>
    props.selected === true
      ? props.isDark === true
        ? props.theme.colors.primary900
        : props.theme.colors.primary200
      : props.isDark === true
      ? props.theme.colors.black400
      : props.theme.colors.primary100};
  border-radius: 4px;
  cursor: pointer;
  transition: 0.5s all;

  h3 {
    color: ${(props) =>
      props.selected === true
        ? props.isDark === true
          ? props.theme.colors.primary
          : props.theme.colors.primary
        : props.isDark === true
        ? props.theme.colors.text
        : props.theme.colors.text};
  }

  h4 {
    margin: 0.5rem 0 0.8rem 0;
    padding: 0.7rem 0.6rem 0;
    color: ${(props) =>
      props.selected === true
        ? props.theme.colors.primary
        : props.theme.colors.text200};
    font-size: 0.9rem;
    font-weight: normal;
    transition: 0.5s all;
    line-height: 1.3;
    border-top: 1px solid
      ${(props) =>
        props.selected === true
          ? props.theme.colors.primary
          : props.theme.colors.lightBorder};
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

const Title = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  gap: "1rem";
  margin-bottom: 0.6rem;
  padding: 0.5rem 0.5rem 0 0.5rem;
`

const H3 = styled.h3<{ selected: boolean }>`
  margin-left: 0.5rem;
  margin-top: 0;
  margin-bottom: 0;
  font-size: 1.3rem;
  padding: 0 0.25rem;
  line-height: 1.7rem;
`
const H4 = styled.h4`
  margin: 0;
  font-weight: normal;
  font-size: 0.875rem;
  padding: 0 1.2rem;
  line-height: 1.3rem;
  text-align: center;
  color: ${(props) => props.theme.colors.secondary};
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  width: 100%;
  column-gap: 0.2rem;
  row-gap: 0.5rem;
`

const IconContainer = styled.div`
  width: 14px;
  height: 14px;
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
      title: "I'm new to Ethereum",
      description: "You are a first time user looking for your first wallet",
      featureHighlight: [
        filterLabels.buy_crypto,
        filterLabels.withdraw_crypto,
        filterLabels.nft_support,
        filterLabels.layer_2,
      ],
      presetFilters: {
        android: true,
        ios: true,
        linux: false,
        windows: false,
        macOS: false,
        firefox: true,
        chromium: true,
        hardware: false,
        open_source: true,
        non_custodial: true,
        hardware_support: false,
        walletconnect: true,
        rpc_importing: false,
        nft_support: true,
        connect_to_dapps: true,
        staking: false,
        swaps: false,
        layer_2: true,
        gas_fee_customization: true,
        ens_support: true,
        erc_20_support: true,
        buy_crypto: true,
        withdraw_crypto: true,
        multisig: false,
        social_recovery: false,
      },
    },
    {
      title: "I'm a hodler",
      description:
        "You are someone that has tokens and don’t want to touch them",
      featureHighlight: [
        filterLabels.hardware,
        filterLabels.hardware_support,
        filterLabels.open_source,
        filterLabels.layer_2,
      ],
      presetFilters: {
        android: true,
        ios: true,
        linux: true,
        windows: true,
        macOS: true,
        firefox: true,
        chromium: true,
        hardware: true,
        open_source: true,
        non_custodial: true,
        hardware_support: true,
        walletconnect: false,
        rpc_importing: false,
        nft_support: false,
        connect_to_dapps: false,
        staking: true,
        swaps: false,
        layer_2: true,
        gas_fee_customization: true,
        ens_support: false,
        erc_20_support: true,
        buy_crypto: false,
        withdraw_crypto: false,
        multisig: true,
        social_recovery: false,
      },
    },
    {
      title: "I'm use decentralized finance",
      description:
        "You are someone that follows DeFI and want’s a wallet easy to use",
      featureHighlight: [
        filterLabels.swaps,
        filterLabels.erc_20_support,
        filterLabels.hardware_support,
        filterLabels.layer_2,
      ],
      presetFilters: {
        android: true,
        ios: true,
        linux: false,
        windows: false,
        macOS: false,
        firefox: true,
        chromium: true,
        hardware: true,
        open_source: true,
        non_custodial: true,
        hardware_support: true,
        walletconnect: true,
        rpc_importing: true,
        nft_support: true,
        connect_to_dapps: true,
        staking: false,
        swaps: true,
        layer_2: true,
        gas_fee_customization: true,
        ens_support: true,
        erc_20_support: true,
        buy_crypto: false,
        withdraw_crypto: false,
        multisig: false,
        social_recovery: false,
      },
    },
    {
      title: "I'm a developer",
      description:
        "You are developer and needs a wallet that helps develop dapps",
      featureHighlight: [
        filterLabels.rpc_importing,
        filterLabels.walletconnect,
        filterLabels.nft_support,
        filterLabels.erc_20_support,
      ],
      presetFilters: {
        android: true,
        ios: true,
        linux: false,
        windows: false,
        macOS: false,
        firefox: true,
        chromium: true,
        hardware: false,
        open_source: true,
        non_custodial: true,
        hardware_support: false,
        walletconnect: true,
        rpc_importing: true,
        nft_support: true,
        connect_to_dapps: true,
        staking: false,
        swaps: false,
        layer_2: true,
        gas_fee_customization: true,
        ens_support: true,
        erc_20_support: true,
        buy_crypto: false,
        withdraw_crypto: false,
        multisig: false,
        social_recovery: false,
      },
    },
    {
      title: "I use multiple chains",
      description:
        "You use wallets on other chains and wants to get in ethereum",
      featureHighlight: [
        filterLabels.layer_2,
        filterLabels.rpc_importing,
        filterLabels.erc_20_support,
        filterLabels.nft_support,
      ],
      presetFilters: {
        android: true,
        ios: true,
        linux: false,
        windows: false,
        macOS: false,
        firefox: true,
        chromium: true,
        hardware: false,
        open_source: true,
        non_custodial: true,
        hardware_support: true,
        walletconnect: true,
        rpc_importing: true,
        nft_support: true,
        connect_to_dapps: true,
        staking: false,
        swaps: false,
        layer_2: true,
        gas_fee_customization: true,
        ens_support: true,
        erc_20_support: true,
        buy_crypto: false,
        withdraw_crypto: false,
        multisig: false,
        social_recovery: false,
      },
    },
    {
      title: "I'm all about NFT's",
      description:
        "You are someone that is all about NFTs a wallet has to ready",
      featureHighlight: [
        filterLabels.nft_support,
        filterLabels.layer_2,
        filterLabels.walletconnect,
        filterLabels.hardware_support,
      ],
      presetFilters: {
        android: true,
        ios: true,
        linux: false,
        windows: false,
        macOS: false,
        firefox: true,
        chromium: true,
        hardware: false,
        open_source: true,
        non_custodial: true,
        hardware_support: true,
        walletconnect: true,
        rpc_importing: false,
        nft_support: true,
        connect_to_dapps: true,
        staking: false,
        swaps: false,
        layer_2: true,
        gas_fee_customization: true,
        ens_support: false,
        erc_20_support: false,
        buy_crypto: false,
        withdraw_crypto: false,
        multisig: false,
        social_recovery: false,
      },
    },
  ]

  return (
    <Container>
      <H4>
        Choose the profile that matches your type of user and filter the wallet
        list
      </H4>
      {personas.map((persona, idx) => {
        return (
          <Persona
            isDark={themeContext.isDark}
            selected={selectedPersona === idx}
            onClick={() => {
              if (idx === selectedPersona) {
                resetFilters()
              } else {
                setSelectedPersona(idx)
                setFilters(persona.presetFilters)
              }
            }}
          >
            <Title>
              <IconContainer>
                <StyledIcon
                  name="check"
                  selected={selectedPersona === idx}
                  size="2rem"
                />
              </IconContainer>
              <H3>{persona.title}</H3>
            </Title>
            <h4>{persona.description}</h4>
            <Grid>
              {persona.featureHighlight.map((feature) => (
                <PersonaFeature selected={selectedPersona === idx}>
                  {feature.icon}
                  <p>{feature.label}</p>
                </PersonaFeature>
              ))}
            </Grid>
          </Persona>
        )
      })}
    </Container>
  )
}

export default WalletPersonasSidebar
