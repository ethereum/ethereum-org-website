interface NetworkUpgradeProps {
  dateTimeAsString: string
  ethPriceInUSD: number
  waybackLink: string
  blockNumber?: number
  epochNumber?: number
  slotNumber?: number
}

export interface NetworkUpgradeSummaryDataProps {
  [key: string]: NetworkUpgradeProps
}

const NetworkUpgradeSummaryData: NetworkUpgradeSummaryDataProps = {
  altair: {
    dateTimeAsString: "2021-10-27T10:56:23.000Z",
    ethPriceInUSD: 4024,
    waybackLink:
      "https://web.archive.org/web/20211026174951/https://ethereum.org/en/",
    blockNumber: undefined,
    epochNumber: 74240,
    slotNumber: undefined,
  },
  berlin: {
    dateTimeAsString: "2022-06-30T10:54:04.000Z",
    ethPriceInUSD: 2454,
    waybackLink:
      "https://web.archive.org/web/20210415093618/https://ethereum.org/",
    blockNumber: 44000,
    epochNumber: undefined,
    slotNumber: undefined,
  },
  beaconChainGenesis: {
    dateTimeAsString: "2020-12-01T12:00:35.000Z",
    ethPriceInUSD: 586,
    waybackLink:
      "https://web.archive.org/web/20201207184633/https://www.ethereum.org/en/",
    blockNumber: undefined,
    epochNumber: undefined,
    slotNumber: 1,
  },
}

export default NetworkUpgradeSummaryData
