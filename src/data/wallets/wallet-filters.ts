interface WalletFilter {
  title: string
  filterKey: string | undefined
  description: string
}

const walletFilterData: { [key: string]: WalletFilter } = {
  mobile: {
    title: "Mobile",
    description: "Phone or mobile based wallets.",
    filterKey: undefined,
  },
  android: {
    title: "Android",
    description: "",
    filterKey: "android",
  },
  ios: {
    title: "iOS",
    description: "",
    filterKey: "ios",
  },
  desktop: {
    title: "Desktop",
    description: "Desktop based wallets.",
    filterKey: undefined,
  },
  linux: {
    title: "Linux",
    description: "",
    filterKey: "linux",
  },
  windows: {
    title: "Windows",
    description: "",
    filterKey: "windows",
  },
  macos: {
    title: "macOS",
    description: "",
    filterKey: "macOS",
  },
  browser: {
    title: "Browser",
    description: "Browser extension wallets.",
    filterKey: undefined,
  },
  firefox: {
    title: "Firefox",
    description: "",
    filterKey: "firefox",
  },
  chromium: {
    title: "Chromium",
    description: "",
    filterKey: "chromium",
  },
  hardware: {
    title: "Hardware",
    description: "Hardware based wallets.",
    filterKey: "hardware",
  },
  open_source: {
    title: "Open source",
    description:
      "Wallet code for the wallet is open sourced for users to inspect and edit.",
    filterKey: "open_source",
  },
  non_custodial: {
    title: "Non-custodial",
    description: "Who has control over the keys for your wallet.",
    filterKey: "non_custodial",
  },
  hardware_support: {
    title: "Hardware support",
    description:
      "You can connect a hardware wallet and sign transactions with it.",
    filterKey: "hardware_support",
  },
  walletconnect: {
    title: "WalletConnect",
    description: "You can connect to applications that support WalletConnect.",
    filterKey: "walletconnect",
  },
  rpc_importing: {
    title: "RPC importing",
    description:
      "You can import RPC endpoint data to connect to different nodes/networks.",
    filterKey: "rpc_importing",
  },
  nft_support: {
    title: "NFT support",
    description: "You can view and interact with your NFTs in the wallet",
    filterKey: "nft_support",
  },
  connect_to_dapps: {
    title: "Connect to decentralized apps",
    description:
      "You can connect to applications built on the Ethereum network.",
    filterKey: "connect_to_dapps",
  },
  staking: {
    title: "Staking",
    description:
      "You can use a simple interface to stake directly in the wallet.",
    filterKey: "staking",
  },
  swaps: {
    title: "Swaps",
    description: "Swap ERC-20 tokens directly in the wallet.",
    filterKey: "swaps",
  },
  layer_2: {
    title: "Layer 2",
    description: "You can use layer 2 networks in the wallet.",
    filterKey: "layer_2",
  },
  gas_fee_customization: {
    title: "Gas fee customization",
    description:
      "The user is able to customize their gas inputs (base fee, priority fee, max fee).",
    filterKey: "gas_fee_customization",
  },
  ens_support: {
    title: "ENS support",
    description: "The wallet supports sending transactions to ENS addresses.",
    filterKey: "ens_support",
  },
  erc_20_support: {
    title: "Token importing",
    description: "Can import ERC-20 token contract addresses into the wallet.",
    filterKey: "erc_20_support",
  },
  eip_1559_support: {
    title: "EIP-1559 support",
    description: "Supports type 2 transactions saving users money in gas fees.",
    filterKey: "eip_1559_support",
  },
  buy_crypto: {
    title: "Buy crypto",
    description: "User is able to buy crypto with fiat directly in the wallet.",
    filterKey: "buy_crypto",
  },
  withdraw_crypto: {
    title: "Withdraw crypto",
    description: "User is able to withdraw to fiat directly in the wallet",
    filterKey: "withdraw_crypto",
  },
  multisig: {
    title: "Multisig",
    description:
      "Wallets that require two or more signatures from private keys for a transaction",
    filterKey: "multisig",
  },
  social_recovery: {
    title: "Social recovery",
    description:
      "Wallets that allow guardians to change the signing key for smart contract wallets",
    filterKey: "social_recovery",
  },
}

export default walletFilterData
