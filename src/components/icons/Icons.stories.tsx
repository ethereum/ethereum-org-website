import { Box, Center, StackDivider, VStack } from "@chakra-ui/react"
import { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import { EthHomeIcon } from "./EthHomeIcon"
import { FeedbackGlyphIcon } from "./FeedbackGlyphIcon"
import { FeedbackThumbsUpIcon } from "./FeedbackThumbsUpIcon"
import { HighlightDarkIcon } from "./HighlightDarkIcon"
import { HighlightIcon } from "./HighlightIcon"
import {
  CorrectIcon,
  IncorrectIcon,
  StarConfettiIcon,
  TrophyIcon,
} from "./quiz"
import {
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
} from "./run-a-node"
import {
  AbyssGlyphIcon,
  AnkrGlyphIcon,
  AuditedIcon,
  AvadoGlyphIcon,
  BattleTestedIcon,
  BloxstakingGlyphIcon,
  BugBountyIcon,
  CautionProductGlyphIcon,
  StakingDappnodeGlyphIcon,
  DefaultOpenSourceGlyphIcon,
  DockerGlyphIcon,
  EconomicalIcon,
  EthpoolGlyphIcon,
  GreenCheckProductGlyphIcon,
  KilnGlyphIcon,
  LidoGlyphIcon,
  LiquidityTokenIcon,
  MultiClientIcon,
  OpenSourceStakingIcon,
  PermissionlessIcon,
  RocketPoolGlyphIcon,
  SelfCustodyIcon,
  StafiGlyphIcon,
  StakefishGlyphIcon,
  StakewiseGlyphIcon,
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
  AllnodesGlyphIcon,
} from "./staking"
import {
  BrowserIcon,
  BuyCryptoIcon,
  ConnectDappsIcon,
  DesktopIcon,
  EIP1559Icon,
  ENSSupportIcon,
  ERC20SupportIcon,
  FilterBurgerIcon,
  FrameIcon,
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
  WalletConnectIcon,
  WithdrawCryptoIcon,
} from "./wallets"

export default {
  component: VStack,
} as Meta<typeof VStack>

const iconsDefinitions = [
  CorrectIcon,
  IncorrectIcon,
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
  BloxstakingGlyphIcon,
  BugBountyIcon,
  CautionProductGlyphIcon,
  StakingDappnodeGlyphIcon,
  DefaultOpenSourceGlyphIcon,
  DockerGlyphIcon,
  EconomicalIcon,
  EthpoolGlyphIcon,
  GreenCheckProductGlyphIcon,
  KilnGlyphIcon,
  LidoGlyphIcon,
  LiquidityTokenIcon,
  MultiClientIcon,
  OpenSourceStakingIcon,
  PermissionlessIcon,
  RocketPoolGlyphIcon,
  SelfCustodyIcon,
  StafiGlyphIcon,
  StakefishGlyphIcon,
  StakewiseGlyphIcon,
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
  BrowserIcon,
  BuyCryptoIcon,
  ConnectDappsIcon,
  DesktopIcon,
  EIP1559Icon,
  ENSSupportIcon,
  ERC20SupportIcon,
  FilterBurgerIcon,
  FrameIcon,
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
  WalletConnectIcon,
  WithdrawCryptoIcon,
  EthHomeIcon,
  FeedbackGlyphIcon,
  FeedbackThumbsUpIcon,
  HighlightDarkIcon,
  HighlightIcon,
]

iconsDefinitions.sort((a, b) =>
  (a?.displayName || "") > (b?.displayName || "") ? 1 : -1
)
const items = iconsDefinitions.map((IconDef) => (
  <Box
    key={IconDef.displayName}
    border="1px"
    borderStyle="solid"
    borderColor="border"
    p={1}
  >
    <Center>
      <IconDef />
    </Center>
    <Center>{IconDef.displayName}</Center>
  </Box>
))

export const IconsList: StoryObj<typeof VStack> = {
  render: () => {
    return (
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
      >
        {items}
      </VStack>
    )
  },
}
