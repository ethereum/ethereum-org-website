import { Brain, LayersPlus } from "lucide-react"

import PrivacyIcon from "@/components/icons/privacy.svg"
import * as icon from "@/components/icons/wallets"

// Icons stay in a client-importable module (SVG components can't be
// serialized in the filter config coming from the server).
export const FILTER_ICONS: Record<
  string,
  React.FC<React.SVGProps<SVGElement>>
> = {
  mobile: icon.MobileIcon,
  desktop: icon.DesktopIcon,
  browser: icon.BrowserIcon,
  hardware: icon.HardwareIcon,
  buy_crypto: icon.BuyCryptoIcon,
  withdraw_crypto: icon.WithdrawCryptoIcon,
  connect_to_dapps: icon.ConnectDappsIcon,
  nft_support: icon.NFTSupportIcon,
  staking: icon.StakingIcon,
  layer_2: icon.Layer2Icon,
  swaps: icon.SwapIcon,
  hardware_support: icon.HardwareSupportIcon,
  ens_support: icon.ENSSupportIcon,
  open_source: icon.OpenSourceWalletIcon,
  non_custodial: icon.NonCustodialIcon,
  multisig: icon.MultisigIcon,
  social_recovery: icon.SocialRecoverIcon,
  privacy: PrivacyIcon,
  eip_4337_support: Brain as unknown as React.FC<React.SVGProps<SVGElement>>,
  eip_7702_support: LayersPlus as unknown as React.FC<
    React.SVGProps<SVGElement>
  >,
  rpc_importing: icon.RPCImportingIcon,
  erc_20_support: icon.ERC20SupportIcon,
  gas_fee_customization: icon.GasFeeCustomizationIcon,
}
