import { TokenBalance } from "./WalletHome/interfaces"
import { DaiTokenIcon, EthTokenIcon, UniTokenIcon } from "./icons"

export const SIMULATOR_ID = "sim"

export const CREATE_ACCOUNT = "create-account"
export const SEND_RECEIVE = "send-receive"
export const CONNECT_WEB3 = "connect-web3"

export const PATH_IDS = [CREATE_ACCOUNT, SEND_RECEIVE, CONNECT_WEB3] as const
export const FAKE_DEMO_ADDRESS = "0xfa4e...de30"
export const PATH_ID_QUERY_PARAM = "sim"

// Pulse animation type names
export const CIRCLE = "circle"
export const FULL_BUTTON = "full-button"
export const NARROW_BUTTON = "narrow-button"

export const defaultTokenBalances: Array<TokenBalance> = [
  {
    name: "Ether",
    ticker: "ETH",
    amount: 0,
    usdConversion: 1,
    Icon: EthTokenIcon,
  },
  {
    name: "DAI",
    ticker: "DAI",
    amount: 0,
    usdConversion: 1,
    Icon: DaiTokenIcon,
  },
  {
    name: "Uniswap",
    ticker: "UNI",
    amount: 0,
    usdConversion: 1,
    Icon: UniTokenIcon,
  },
]

export const FALLBACK_ETH_PRICE = 1000
export const USD_RECEIVE_AMOUNT = 50
export const ETH_TRANSFER_FEE = 0.00042 // 21_000gas * 20gwei

export const BASE_ANIMATION_DELAY_SEC = 2.5
