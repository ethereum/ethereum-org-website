import type { Meta, StoryObj } from "@storybook/react"

import { Center, Flex } from "../ui/flex"

import EthHomeIcon from "./eth-home-icon.svg"
import FeedbackThumbsUpIcon from "./feedback-thumbs-up-icon.svg"
import { HighlightDarkIcon } from "./HighlightDarkIcon"
import { HighlightIcon } from "./HighlightIcon"
import {
  CorrectIcon,
  GreenTickIcon,
  IncorrectIcon,
  StarConfettiIcon,
  TrophyIcon,
} from "./quiz"
import {
  DappnodeIcon,
  DecentralizationEthGlyphIcon,
  DecentralizationGlyphIcon,
  DownloadGlyphIcon,
  EarthGlyphIcon,
  HardwareGlyphIcon,
  MegaphoneGlyphIcon,
  PrivacyGlyphIcon,
  SovereigntyGlyphIcon,
  VoteGlyphIcon,
} from "./run-a-node"
import {
  AbyssGlyphIcon,
  AllnodesGlyphIcon,
  AnkrGlyphIcon,
  AuditedIcon,
  AvadoGlyphIcon,
  BattleTestedIcon,
  BedrockGlyphIcon,
  BugBountyIcon,
  CautionProductGlyphIcon,
  ChainLaboGlyphIcon,
  ConsensysStakingGlyphIcon,
  DefaultOpenSourceGlyphIcon,
  DockerGlyphIcon,
  EconomicalIcon,
  EthpoolGlyphIcon,
  EverstakeGlyphIcon,
  FigmentGlyphIcon,
  GreenCheckProductGlyphIcon,
  KilnGlyphIcon,
  LaunchnodesGlyphIcon,
  LidoGlyphIcon,
  LiquidityTokenIcon,
  MultiClientIcon,
  OpenSourceStakingIcon,
  P2PGlyphIcon,
  PermissionlessIcon,
  RocketPoolGlyphIcon,
  RockXGlyphIcon,
  SelfCustodyIcon,
  SenseiNodeGlyphIcon,
  SquidGlyphIcon,
  StafiGlyphIcon,
  StakefishGlyphIcon,
  StakewiseGlyphIcon,
  StakingDappnodeGlyphIcon,
  StakingGlyphCentralizedIcon,
  StakingGlyphCloudIcon,
  StakingGlyphCPUIcon,
  StakingGlyphEtherCircleIcon,
  StakingGlyphTokenWalletIcon,
  StereumGlyphIcon,
  TrustlessIcon,
  UnknownProductGlyphIcon,
  WagyuGlyphIcon,
  WarningProductGlyphIcon,
} from "./staking"
import {
  BrowserIcon,
  BuyCryptoIcon,
  ConnectDappsIcon,
  DesktopIcon,
  ENSSupportIcon,
  ERC20SupportIcon,
  FilterBurgerIcon,
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
} from "./wallets"

const meta = {
  title: "Atoms / Media & Icons / Icons",
} satisfies Meta

export default meta

const iconsDefinitions = [
  CorrectIcon,
  IncorrectIcon,
  GreenTickIcon,
  StarConfettiIcon,
  TrophyIcon,
  DappnodeIcon,
  DecentralizationGlyphIcon,
  DecentralizationEthGlyphIcon,
  DownloadGlyphIcon,
  EarthGlyphIcon,
  HardwareGlyphIcon,
  MegaphoneGlyphIcon,
  PrivacyGlyphIcon,
  SovereigntyGlyphIcon,
  VoteGlyphIcon,
  AbyssGlyphIcon,
  AllnodesGlyphIcon,
  AnkrGlyphIcon,
  AuditedIcon,
  AvadoGlyphIcon,
  BattleTestedIcon,
  BedrockGlyphIcon,
  BugBountyIcon,
  CautionProductGlyphIcon,
  ChainLaboGlyphIcon,
  ConsensysStakingGlyphIcon,
  StakingDappnodeGlyphIcon,
  DefaultOpenSourceGlyphIcon,
  DockerGlyphIcon,
  EconomicalIcon,
  EthpoolGlyphIcon,
  EverstakeGlyphIcon,
  FigmentGlyphIcon,
  GreenCheckProductGlyphIcon,
  P2PGlyphIcon,
  KilnGlyphIcon,
  LaunchnodesGlyphIcon,
  LidoGlyphIcon,
  LiquidityTokenIcon,
  MultiClientIcon,
  OpenSourceStakingIcon,
  PermissionlessIcon,
  RocketPoolGlyphIcon,
  RockXGlyphIcon,
  SelfCustodyIcon,
  SenseiNodeGlyphIcon,
  StafiGlyphIcon,
  StakefishGlyphIcon,
  StakewiseGlyphIcon,
  StakingGlyphCentralizedIcon,
  StakingGlyphCloudIcon,
  StakingGlyphCPUIcon,
  StakingGlyphEtherCircleIcon,
  StakingGlyphTokenWalletIcon,
  StereumGlyphIcon,
  SquidGlyphIcon,
  TrustlessIcon,
  UnknownProductGlyphIcon,
  WagyuGlyphIcon,
  WarningProductGlyphIcon,
  BrowserIcon,
  BuyCryptoIcon,
  ConnectDappsIcon,
  DesktopIcon,
  ENSSupportIcon,
  ERC20SupportIcon,
  FilterBurgerIcon,
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
  EthHomeIcon,
  FeedbackThumbsUpIcon,
  HighlightDarkIcon,
  HighlightIcon,
]

iconsDefinitions.sort((a, b) =>
  (a?.displayName || "") > (b?.displayName || "") ? 1 : -1
)
const items = iconsDefinitions.map((IconDef) => (
  <Flex
    key={IconDef.displayName}
    className="flex-col gap-4 border border-background-highlight p-4"
  >
    <Center>
      <IconDef className="size-[50px]" />
    </Center>
    <Center>{IconDef.displayName}</Center>
  </Flex>
))

export const Icons: StoryObj<typeof meta> = {
  render: () => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {items}
      </div>
    )
  },
}
