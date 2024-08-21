import * as React from "react"
import { Center, Flex, Icon, SimpleGrid } from "@chakra-ui/react"
import type { Meta, StoryObj } from "@storybook/react"

import { EthHomeIcon } from "./EthHomeIcon"
import FeedbackThumbsUpIcon from "./feedback-thumbs-up-icon.svg"
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
  BugBountyIcon,
  CautionProductGlyphIcon,
  DefaultOpenSourceGlyphIcon,
  DockerGlyphIcon,
  EconomicalIcon,
  EthpoolGlyphIcon,
  FigmentGlyphIcon,
  GreenCheckProductGlyphIcon,
  KilnGlyphIcon,
  LidoGlyphIcon,
  LiquidityTokenIcon,
  MultiClientIcon,
  OpenSourceStakingIcon,
  P2PGlyphIcon,
  PermissionlessIcon,
  RocketPoolGlyphIcon,
  RockXGlyphIcon,
  SelfCustodyIcon,
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
  component: Icon,
  title: "Atoms / Media & Icons / Icons",
} satisfies Meta<typeof Icon>

export default meta

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
  BugBountyIcon,
  CautionProductGlyphIcon,
  StakingDappnodeGlyphIcon,
  DefaultOpenSourceGlyphIcon,
  DockerGlyphIcon,
  EconomicalIcon,
  EthpoolGlyphIcon,
  FigmentGlyphIcon,
  GreenCheckProductGlyphIcon,
  P2PGlyphIcon,
  KilnGlyphIcon,
  LidoGlyphIcon,
  LiquidityTokenIcon,
  MultiClientIcon,
  OpenSourceStakingIcon,
  PermissionlessIcon,
  RocketPoolGlyphIcon,
  RockXGlyphIcon,
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
    direction="column"
    gap={4}
    p={4}
    border="1px"
    borderStyle="solid"
    borderColor="background.highlight"
  >
    <Center>
      <IconDef w="50px" h="50px" />
    </Center>
    <Center>{IconDef.displayName}</Center>
  </Flex>
))

export const Icons: StoryObj<typeof meta> = {
  render: () => {
    return <SimpleGrid columns={[2, 2, 3, 5]}>{items}</SimpleGrid>
  },
}
