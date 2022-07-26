// Libraries
import React from "react"
import styled from "styled-components"
import { FormattedNumber } from "react-intl"

// Components
import Emoji from "../Emoji"
import Link from "../Link"
import Translation from "../Translation"

const UnstyledList = styled.ul`
  margin-left: 0;
`

const UnstyledListItem = styled.li`
  list-style: none;
  margin-bottom: 0.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`

const FormattedEmoji = ({ text }) => (
  <Emoji text={text} size={1} mr={"0.5rem"} />
)

export interface IPropsBase {
  dateTimeAsString: string
  ethPriceInUSD: number
  waybackLink: string
}

export interface IPropsWithBlockNumber extends IPropsBase {
  blockNumber: number
  epochNumber?: never
  slotNumber?: never
}

export interface IPropsWithEpochNumber extends IPropsBase {
  blockNumber?: never
  epochNumber: number
  slotNumber?: never
}

export interface IPropsWithSlotNumber extends IPropsBase {
  blockNumber?: never
  epochNumber?: never
  slotNumber: number
}

export type IProps =
  | IPropsWithBlockNumber
  | IPropsWithEpochNumber
  | IPropsWithSlotNumber

const NetworkUpgradeSummary: React.FC<IProps> = ({
  dateTimeAsString,
  blockNumber,
  epochNumber,
  slotNumber,
  ethPriceInUSD,
  waybackLink,
}) => {
  let blockTypeTranslation

  if (blockNumber) {
    blockTypeTranslation = (
      <UnstyledListItem>
        <FormattedEmoji text=":bricks:" />
        <Translation id="page-history-block-number" />:{" "}
        <Link to={`https://etherscan.io/block/${blockNumber}`}>
          <FormattedNumber value={blockNumber} />
        </Link>
      </UnstyledListItem>
    )
  }

  if (epochNumber) {
    blockTypeTranslation = (
      <UnstyledListItem>
        <FormattedEmoji text=":bricks:" />
        <Translation id="page-history-epoch-number" />:{" "}
        <Link to={`https://beaconscan.com/epoch/${epochNumber}`}>
          <FormattedNumber value={epochNumber} />
        </Link>
      </UnstyledListItem>
    )
  }

  if (slotNumber) {
    blockTypeTranslation = (
      <UnstyledListItem>
        <FormattedEmoji text=":bricks:" />
        <Translation id="page-history-beacon-block-number" />:{" "}
        <Link to={`https://beaconscan.com/slot/${slotNumber}`}>
          <FormattedNumber value={slotNumber} />
        </Link>
      </UnstyledListItem>
    )
  }

  return (
    <UnstyledList>
      <UnstyledListItem>
        <FormattedEmoji text=":calendar:" />
        <code>{dateTimeAsString}</code>
      </UnstyledListItem>
      {blockTypeTranslation}
      <UnstyledListItem>
        <FormattedEmoji text=":money_bag:" />
        <Translation id="page-history-eth-price" />:{" "}
        <FormattedNumber
          value={ethPriceInUSD}
          style="currency"
          currency="USD"
          maximumFractionDigits={0}
        />{" "}
        USD
      </UnstyledListItem>
      <UnstyledListItem>
        <FormattedEmoji text=":desktop_computer:" />{" "}
        <Link to={waybackLink}>
          <Translation id="page-history-ethereum-org-wayback" />
        </Link>
      </UnstyledListItem>
    </UnstyledList>
  )
}

export default NetworkUpgradeSummary
