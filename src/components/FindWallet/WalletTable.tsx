// Libraries
import React, { useState } from "react"
import styled from "styled-components"

// Styles
const Container = styled.div`
  width: 100%;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 40% auto auto auto 5%;
  width: 100%;
`

const WalletContentHeader = styled(Grid)`
  height: 42px;
  border-bottom: 1px solid ${(props) => props.theme.colors.primary};
  cursor: pointer;
  position: sticky;
  top: 76px;
  padding-top: 8px;
  background: ${(props) => props.theme.colors.background};

  span {
    color: ${(props) => props.theme.colors.primary};
  }
`

const FeatureDropdown = styled.div``

// Constants
const featureDropdownItems = [
  {
    name: "Open source",
    filterKey: "open_source",
  },
  {
    name: "Self custody",
    filterKey: "non_custodial",
  },
  {
    name: "Hardware wallet support",
    filterKey: "hardware_support",
  },
  {
    name: "WalletConnect",
    filterKey: "walletconnect",
  },
  {
    name: "RPC importing",
    filterKey: "rpc_importing",
  },
  {
    name: "NFT support",
    filterKey: "nft_support",
  },
  {
    name: "Connect to dapps",
    filterKey: "connect_to_dapps",
  },
  {
    name: "Staking",
    filterKey: "staking",
  },
  {
    name: "Swaps",
    filterKey: "swaps",
  },
  {
    name: "Layer 2",
    filterKey: "layer_2",
  },
  {
    name: "Gas fee customization",
    filterKey: "gas_fee_customization",
  },
  {
    name: "ENS support",
    filterKey: "ens_support",
  },
  {
    name: "Buy crypto",
    filterKey: "buy_crypto",
  },
  {
    name: "Token importing",
    filterKey: "erc_20_support",
  },
  {
    name: "Buy crypto",
    filterKey: "buy_crypto",
  },
  {
    name: "Withdraw crypto",
    filterKey: "withdraw_crypto",
  },
  {
    name: "Multisig",
    filterKey: "multisig",
  },
  {
    name: "Social recovery",
    filterKey: "social_recovery",
  },
]

const WalletTable = ({ data, walletData }) => {
  const [selectedFeatures, setSelectedFeatures] = useState([
    featureDropdownItems[0],
    featureDropdownItems[1],
    featureDropdownItems[2],
  ])

  return (
    <Container>
      {/* TODO: Change this span info for fitlered wallets when implemented */}
      <WalletContentHeader>
        <p>
          <span>{walletData.length} wallets</span> out of {walletData.length}
        </p>
        <FeatureDropdown>
          <p>{selectedFeatures[0].name}</p>
        </FeatureDropdown>
        <FeatureDropdown>
          <p>{selectedFeatures[1].name}</p>
        </FeatureDropdown>
        <FeatureDropdown>
          <p>{selectedFeatures[2].name}</p>
        </FeatureDropdown>
      </WalletContentHeader>
      {walletData.map((wallet) => {
        return <p>{wallet.name}</p>
      })}
    </Container>
  )
}

export default WalletTable
