import type { Meta, StoryObj } from "@storybook/react"

import { Center, Flex } from "../ui/flex"

import FilterBurgerIcon from "./wallets/filter-burger.svg"
import HighlightIcon from "./highlight.svg"
import HighlightDarkIcon from "./highlight-dark.svg"
import {
  CorrectIcon,
  GreenTickIcon,
  IncorrectIcon,
  StarConfettiIcon,
  TrophyIcon,
} from "./quiz"
import {
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
  CautionProductGlyph,
  ChainLaboGlyphIcon,
  ConsensysStakingGlyphIcon,
  DefaultOpenSourceGlyphIcon,
  DockerGlyphIcon,
  EconomicalIcon,
  EthpoolGlyphIcon,
  EverstakeGlyphIcon,
  FigmentGlyphIcon,
  GreenCheckProductGlyph,
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
  UnknownProductGlyph,
  WagyuGlyphIcon,
  WarningProductGlyph,
} from "./staking"
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
} from "./wallets"
import { EthHomeIcon, FeedbackThumbsUpIcon } from "."

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
  CautionProductGlyph,
  ChainLaboGlyphIcon,
  ConsensysStakingGlyphIcon,
  StakingDappnodeGlyphIcon,
  DefaultOpenSourceGlyphIcon,
  DockerGlyphIcon,
  EconomicalIcon,
  EthpoolGlyphIcon,
  EverstakeGlyphIcon,
  FigmentGlyphIcon,
  GreenCheckProductGlyph,
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
  UnknownProductGlyph,
  WagyuGlyphIcon,
  WarningProductGlyph,
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
const items = iconsDefinitions.map((IconDef, idx) => {
  return (
    <Flex
      key={idx}
      className="flex-col gap-4 border border-background-highlight p-4"
    >
      <Center>
        <IconDef className="size-[50px]" />
      </Center>
      <Center>{IconDef.displayName}</Center>
    </Flex>
  )
})

export const Icons: StoryObj<typeof meta> = {
  render: () => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {items}
      </div>
    )
  },
}
