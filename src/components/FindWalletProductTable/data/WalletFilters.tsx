import { useTranslation } from "next-i18next"

import { FilterOption } from "@/lib/types"

import {
  BrowserIcon,
  BuyCryptoIcon,
  ConnectDappsIcon,
  DesktopIcon,
  ENSSupportIcon,
  ERC20SupportIcon,
  GasFeeCustomizationIcon,
  HardwareIcon,
  HardwareSupportIcon,
  Layer2Icon,
  MobileIcon,
  MultisigIcon,
  NFTSupportIcon,
  NonCustodialIcon,
  OpenSourceWalletIcon,
  RPCImportingIcon,
  SocialRecoverIcon,
  StakingIcon,
  SwapIcon,
  WithdrawCryptoIcon,
} from "@/components/icons/wallets"

export const WalletFilters = (): FilterOption[] => {
  const { t } = useTranslation("page-wallets-find-wallet")
  return [
    {
      title: t("page-find-wallet-device"),
      items: [
        {
          title: t("page-find-wallet-mobile"),
          icon: MobileIcon,
          input: "switch",
          inputState: false,
        },
        {
          title: t("page-find-wallet-desktop"),
          icon: DesktopIcon,
          input: "switch",
          inputState: false,
        },
        {
          title: t("page-find-wallet-browser"),
          icon: BrowserIcon,
          input: "switch",
          inputState: false,
        },
        {
          title: t("page-find-wallet-hardware"),
          icon: HardwareIcon,
          input: "switch",
          inputState: false,
        },
      ],
    },
    {
      title: t("page-find-wallet-languages-supported"),
      items: [
        {
          title: "",
          icon: null,
          input: "select",
          inputState: null,
        },
      ],
    },
    {
      title: `${t("page-find-wallet-buy-crypto")} / ${t(
        "page-find-wallet-sell-for-fiat"
      )}`,
      items: [
        {
          title: t("page-find-wallet-buy-crypto"),
          icon: BuyCryptoIcon,
          input: "switch",
          inputState: false,
        },
        {
          title: t("page-find-wallet-sell-for-fiat"),
          icon: WithdrawCryptoIcon,
          input: "switch",
          inputState: false,
        },
      ],
    },
    {
      title: t("page-find-wallet-features"),
      items: [
        {
          title: t("page-find-wallet-connect-to-dapps"),
          icon: ConnectDappsIcon,
          input: "switch",
          inputState: false,
        },
        {
          title: t("page-find-wallet-nft-support"),
          icon: NFTSupportIcon,
          input: "switch",
          inputState: false,
        },
        {
          title: t("page-find-wallet-staking"),
          icon: StakingIcon,
          input: "switch",
          inputState: false,
        },
        {
          title: t("page-find-wallet-layer-2"),
          icon: Layer2Icon,
          input: "switch",
          inputState: false,
        },
        {
          title: t("page-find-wallet-swaps"),
          icon: SwapIcon,
          input: "switch",
          inputState: false,
        },
        {
          title: t("page-find-wallet-hardware-wallet-support"),
          icon: HardwareSupportIcon,
          input: "switch",
          inputState: false,
        },
        {
          title: t("page-find-wallet-ens-support"),
          icon: ENSSupportIcon,
          input: "switch",
          inputState: false,
        },
      ],
    },
    {
      title: t("page-find-wallet-security"),
      items: [
        {
          title: t("page-find-wallet-open-source"),
          icon: OpenSourceWalletIcon,
          input: "switch",
          inputState: false,
        },
        {
          title: t("page-find-wallet-non-custodial"),
          icon: NonCustodialIcon,
          input: "switch",
          inputState: false,
        },
      ],
    },
    {
      title: t("page-find-wallet-smart-contract"),
      items: [
        {
          title: t("page-find-wallet-multisig"),
          icon: MultisigIcon,
          input: "switch",
          inputState: false,
        },
        {
          title: t("page-find-wallet-social-recovery"),
          icon: SocialRecoverIcon,
          input: "switch",
          inputState: false,
        },
      ],
    },
    {
      title: t("page-find-wallet-advanced"),
      items: [
        {
          title: t("page-find-wallet-rpc-importing"),
          icon: RPCImportingIcon,
          input: "switch",
          inputState: false,
        },
        {
          title: t("page-find-wallet-token-importing"),
          icon: ERC20SupportIcon,
          input: "switch",
          inputState: false,
        },
        {
          title: t("page-find-wallet-gas-fee-customization"),
          icon: GasFeeCustomizationIcon,
          input: "switch",
          inputState: false,
        },
      ],
    },
  ]
}
