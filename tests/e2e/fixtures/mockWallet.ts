import { Address } from "viem"
import { CreateConnectorFn, mock } from "wagmi"
import type { Wallet } from "@rainbow-me/rainbowkit"
import { WalletDetailsParams } from "@rainbow-me/rainbowkit"

const defaultAnvilAccount: Address =
  "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"

export const mockWallet = (): Wallet => {
  return {
    id: "mock",
    name: "Mock Wallet",
    shortName: "Mock",
    installed: true,
    iconBackground: "rgba(0, 255, 0, 0.5)",
    iconUrl: "/images/assets/svgs/eth-glyph-colored.svg",
    downloadUrls: {},
    createConnector: createMockConnector,
  }
}

function createMockConnector(
  walletDetails: WalletDetailsParams
): CreateConnectorFn {
  const mockConnector: CreateConnectorFn = (config) => {
    return {
      ...mock({
        accounts: [defaultAnvilAccount],
      })(config),
      rkDetails: walletDetails.rkDetails,
    }
  }

  return mockConnector
}
