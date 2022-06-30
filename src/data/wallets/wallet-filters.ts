interface WalletFilter {
  title: string
  filterKey: string | undefined
  description: string
}

const walletFilterData: { [key: string]: WalletFilter } = {
  mobile: {
    title: "Mobile",
    description: "Wallets with mobile apps",
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
    description: "Wallets with desktop apps",
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
    description: "Wallets with browser extensions",
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
    description: "Hardware wallets",
    filterKey: "hardware",
  },
  open_source: {
    title: "Open-source",
    description:
      "Open-source software lets anyone audit the integrity and security of the application",
    filterKey: "open_source",
  },
  non_custodial: {
    title: "Non-custodial",
    description: "Wallets that do not control your private keys",
    filterKey: "non_custodial",
  },
  hardware_support: {
    title: "Hardware support",
    description:
      "Wallets that can connect to hardware wallet for better security",
    filterKey: "hardware_support",
  },
  walletconnect: {
    title: "WalletConnect",
    description: "Wallets that support WalletConnect for connecting to dapps",
    filterKey: "walletconnect",
  },
  rpc_importing: {
    title: "RPC importing",
    description:
      "Wallets supporting custom RPC endpoints to connect to different nodes or networks",
    filterKey: "rpc_importing",
  },
  nft_support: {
    title: "NFT support",
    description: "Wallets that support viewing and interacting with your NFTs",
    filterKey: "nft_support",
  },
  connect_to_dapps: {
    title: "Connect to decentralized apps",
    description:
      "Wallets that connect to applications built on the Ethereum network",
    filterKey: "connect_to_dapps",
  },
  staking: {
    title: "Staking",
    description: "Stake ETH directly from the wallet",
    filterKey: "staking",
  },
  swaps: {
    title: "Swaps",
    description: "Swap ERC-20 tokens directly in the wallet",
    filterKey: "swaps",
  },
  layer_2: {
    title: "Layer 2",
    description: "Wallets supporting Ethereum layer 2s",
    filterKey: "layer_2",
  },
  gas_fee_customization: {
    title: "Gas fee customization",
    description:
      "Customize your gas amounts (base fee, priority fee, and max fee)",
    filterKey: "gas_fee_customization",
  },
  ens_support: {
    title: "ENS support",
    description: "Send transactions to ENS addresses",
    filterKey: "ens_support",
  },
  erc_20_support: {
    title: "Token importing",
    description: "Import any ERC-20 token to use in the wallet",
    filterKey: "erc_20_support",
  },
  eip_1559_support: {
    title: "EIP-1559 support",
    description: "Lower gas fees with type-2 transactions",
    filterKey: "eip_1559_support",
  },
  buy_crypto: {
    title: "Buy crypto",
    description:
      "Buy crypto directly in the wallet \n *Note: buying crypto may be region specific",
    filterKey: "buy_crypto",
  },
  withdraw_crypto: {
    title: "Withdraw crypto",
    description:
      "Withdraw to fiat directly in the wallet \n *Note: withdrawing crypto may be region specific",
    filterKey: "withdraw_crypto",
  },
  multisig: {
    title: "Multisig",
    description:
      "Wallets that require multiple signatures to authorize a transaction",
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
