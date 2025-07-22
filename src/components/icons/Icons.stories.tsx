import type { Meta, StoryObj } from "@storybook/react"

import { Center, Flex } from "../ui/flex"

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
  { label: "AbyssGlyphIcon", Icon: AbyssGlyphIcon },
  { label: "AllnodesGlyphIcon", Icon: AllnodesGlyphIcon },
  { label: "AnkrGlyphIcon", Icon: AnkrGlyphIcon },
  { label: "AuditedIcon", Icon: AuditedIcon },
  { label: "AvadoGlyphIcon", Icon: AvadoGlyphIcon },
  { label: "BattleTestedIcon", Icon: BattleTestedIcon },
  { label: "BedrockGlyphIcon", Icon: BedrockGlyphIcon },
  { label: "BrowserIcon", Icon: BrowserIcon },
  { label: "BugBountyIcon", Icon: BugBountyIcon },
  { label: "BuyCryptoIcon", Icon: BuyCryptoIcon },
  { label: "CautionProductGlyph", Icon: CautionProductGlyph },
  { label: "ChainLaboGlyphIcon", Icon: ChainLaboGlyphIcon },
  { label: "ConnectDappsIcon", Icon: ConnectDappsIcon },
  { label: "ConsensysStakingGlyphIcon", Icon: ConsensysStakingGlyphIcon },
  { label: "CorrectIcon", Icon: CorrectIcon },
  { label: "DecentralizationGlyphIcon", Icon: DecentralizationGlyphIcon },
  { label: "DefaultOpenSourceGlyphIcon", Icon: DefaultOpenSourceGlyphIcon },
  { label: "DesktopIcon", Icon: DesktopIcon },
  { label: "DockerGlyphIcon", Icon: DockerGlyphIcon },
  { label: "DownloadGlyphIcon", Icon: DownloadGlyphIcon },
  { label: "EarthGlyphIcon", Icon: EarthGlyphIcon },
  { label: "EconomicalIcon", Icon: EconomicalIcon },
  { label: "ENSSupportIcon", Icon: ENSSupportIcon },
  { label: "ERC20SupportIcon", Icon: ERC20SupportIcon },
  { label: "EthHomeIcon", Icon: EthHomeIcon },
  { label: "EthpoolGlyphIcon", Icon: EthpoolGlyphIcon },
  { label: "EverstakeGlyphIcon", Icon: EverstakeGlyphIcon },
  { label: "FeedbackThumbsUpIcon", Icon: FeedbackThumbsUpIcon },
  { label: "FigmentGlyphIcon", Icon: FigmentGlyphIcon },
  { label: "GasFeeCustomizationIcon", Icon: GasFeeCustomizationIcon },
  { label: "GreenCheckProductGlyph", Icon: GreenCheckProductGlyph },
  { label: "GreenTickIcon", Icon: GreenTickIcon },
  { label: "HardwareGlyphIcon", Icon: HardwareGlyphIcon },
  { label: "HardwareIcon", Icon: HardwareIcon },
  { label: "HardwareSupportIcon", Icon: HardwareSupportIcon },
  { label: "HighlightDarkIcon", Icon: HighlightDarkIcon },
  { label: "HighlightIcon", Icon: HighlightIcon },
  { label: "IncorrectIcon", Icon: IncorrectIcon },
  { label: "KilnGlyphIcon", Icon: KilnGlyphIcon },
  { label: "LaunchnodesGlyphIcon", Icon: LaunchnodesGlyphIcon },
  { label: "Layer2Icon", Icon: Layer2Icon },
  { label: "LidoGlyphIcon", Icon: LidoGlyphIcon },
  { label: "LiquidityTokenIcon", Icon: LiquidityTokenIcon },
  { label: "MegaphoneGlyphIcon", Icon: MegaphoneGlyphIcon },
  { label: "MobileIcon", Icon: MobileIcon },
  { label: "MultiClientIcon", Icon: MultiClientIcon },
  { label: "MultisigIcon", Icon: MultisigIcon },
  { label: "NFTSupportIcon", Icon: NFTSupportIcon },
  { label: "NonCustodialIcon", Icon: NonCustodialIcon },
  { label: "OpenSourceStakingIcon", Icon: OpenSourceStakingIcon },
  { label: "OpenSourceWalletIcon", Icon: OpenSourceWalletIcon },
  { label: "P2PGlyphIcon", Icon: P2PGlyphIcon },
  { label: "PermissionlessIcon", Icon: PermissionlessIcon },
  { label: "PrivacyGlyphIcon", Icon: PrivacyGlyphIcon },
  { label: "RocketPoolGlyphIcon", Icon: RocketPoolGlyphIcon },
  { label: "RockXGlyphIcon", Icon: RockXGlyphIcon },
  { label: "RPCImportingIcon", Icon: RPCImportingIcon },
  { label: "SelfCustodyIcon", Icon: SelfCustodyIcon },
  { label: "SenseiNodeGlyphIcon", Icon: SenseiNodeGlyphIcon },
  { label: "SocialRecoverIcon", Icon: SocialRecoverIcon },
  { label: "SovereigntyGlyphIcon", Icon: SovereigntyGlyphIcon },
  { label: "SquidGlyphIcon", Icon: SquidGlyphIcon },
  { label: "StafiGlyphIcon", Icon: StafiGlyphIcon },
  { label: "StakefishGlyphIcon", Icon: StakefishGlyphIcon },
  { label: "StakewiseGlyphIcon", Icon: StakewiseGlyphIcon },
  { label: "StakingDappnodeGlyphIcon", Icon: StakingDappnodeGlyphIcon },
  { label: "StakingGlyphCentralizedIcon", Icon: StakingGlyphCentralizedIcon },
  { label: "StakingGlyphCloudIcon", Icon: StakingGlyphCloudIcon },
  { label: "StakingGlyphCPUIcon", Icon: StakingGlyphCPUIcon },
  { label: "StakingGlyphEtherCircleIcon", Icon: StakingGlyphEtherCircleIcon },
  { label: "StakingGlyphTokenWalletIcon", Icon: StakingGlyphTokenWalletIcon },
  { label: "StakingIcon", Icon: StakingIcon },
  { label: "StarConfettiIcon", Icon: StarConfettiIcon },
  { label: "StereumGlyphIcon", Icon: StereumGlyphIcon },
  { label: "SwapIcon", Icon: SwapIcon },
  { label: "TrophyIcon", Icon: TrophyIcon },
  { label: "TrustlessIcon", Icon: TrustlessIcon },
  { label: "UnknownProductGlyph", Icon: UnknownProductGlyph },
  { label: "VoteGlyphIcon", Icon: VoteGlyphIcon },
  { label: "WagyuGlyphIcon", Icon: WagyuGlyphIcon },
  { label: "WarningProductGlyph", Icon: WarningProductGlyph },
  { label: "WithdrawCryptoIcon", Icon: WithdrawCryptoIcon },
]

iconsDefinitions.sort((a, b) => ((a?.label || "") > (b?.label || "") ? 1 : -1))
const items = iconsDefinitions.map(({ Icon, label }, idx) => {
  return (
    <Flex
      key={idx}
      className="flex-col gap-4 border border-background-highlight p-4"
    >
      <Center>
        <Icon className="size-[50px]" />
      </Center>
      <Center>{label}</Center>
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
