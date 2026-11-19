import type { DiagramFigureText } from "@/lib/types"

import { getAccountsValues } from "./Accounts/model"
import { getAttestationsValues } from "./Attestations/model"
import { BLOCK_STATE_PRESET_IDS, getBlockStateValues } from "./BlockState/model"
import { getEvmZonesValues } from "./EvmZones/model"
import { getExAnteReorgValues } from "./ExAnteReorg/model"
import { getGasEvmValues } from "./GasEvm/model"
import { getGasTxValues } from "./GasTx/model"
import { getMevBoostValues } from "./MevBoost/model"
import {
  getClientSetupValues,
  getNodeAccessValues,
  getNodeArchitectureValues,
  getNodeClientsValues,
  getNodeNetworksValues,
} from "./NodeClients/model"
import { getPortalHistoryValues } from "./PortalHistory/model"
import { getSourceVerifyValues } from "./SourceVerify/model"
import {
  ASYNC_PRESET_IDS,
  getAsyncVaultValues,
  getVaultDepositValues,
  getVaultInterfaceValues,
} from "./TokenVault/model"
import { getTxApplyValues } from "./TxApply/model"
import {
  getKeyDerivationValues,
  getValidatorKeysValues,
} from "./ValidatorKeys/model"

/**
 * Every markdown diagram tag as text, for the agent-facing markdown
 * (`src/scripts/agent-markdown.ts`). Values come from the same model
 * functions the players fill their strings with. A figure whose description
 * changes with its scenario lists every preset, labelled as in its controls.
 */
export const DIAGRAM_FIGURE_TEXT = {
  AccountsDiagram: { prefix: "accounts", values: getAccountsValues },
  AsyncVaultDiagram: {
    prefix: "token-vault-async",
    values: (text) => getAsyncVaultValues(text, "async"),
    presets: ASYNC_PRESET_IDS.map((id) => ({
      label: `token-vault-preset-${id}`,
      values: (text) => getAsyncVaultValues(text, "async", id),
    })),
  },
  AttestationsDiagram: {
    prefix: "attestations",
    values: getAttestationsValues,
  },
  BlockStateDiagram: {
    prefix: "block-state",
    values: (text) => getBlockStateValues(text),
    presets: BLOCK_STATE_PRESET_IDS.map((id) => ({
      label: `block-state-preset-${id}`,
      values: (text) => getBlockStateValues(text, id),
    })),
  },
  ClientSetupDiagram: {
    prefix: "node-clients-setup",
    values: getClientSetupValues,
  },
  EvmZonesDiagram: { prefix: "evm-zones", values: getEvmZonesValues },
  ExAnteReorgDiagram: { prefix: "ex-ante-reorg", values: getExAnteReorgValues },
  GasEvmDiagram: { prefix: "gas-evm", values: getGasEvmValues },
  GasTxDiagram: { prefix: "gas-tx", values: getGasTxValues },
  KeyDerivationDiagram: {
    prefix: "validator-keys-derive",
    values: getKeyDerivationValues,
  },
  MevBoostDiagram: { prefix: "mev-boost", values: getMevBoostValues },
  NodeAccessDiagram: {
    prefix: "node-clients-access",
    values: getNodeAccessValues,
  },
  NodeArchitectureDiagram: {
    prefix: "node-clients-architecture",
    values: getNodeArchitectureValues,
  },
  NodeClientsDiagram: { prefix: "node-clients", values: getNodeClientsValues },
  NodeNetworksDiagram: {
    prefix: "node-clients-networks",
    values: getNodeNetworksValues,
  },
  PortalHistoryDiagram: {
    prefix: "portal-history",
    values: getPortalHistoryValues,
  },
  SourceVerifyDiagram: {
    prefix: "source-verify",
    values: getSourceVerifyValues,
  },
  TxApplyDiagram: { prefix: "tx-apply", values: getTxApplyValues },
  ValidatorKeysDiagram: {
    prefix: "validator-keys",
    values: getValidatorKeysValues,
  },
  VaultDepositDiagram: {
    prefix: "token-vault-sync",
    values: getVaultDepositValues,
  },
  VaultInterfaceDiagram: {
    prefix: "token-vault-interface",
    values: getVaultInterfaceValues,
  },
  VaultRequestDiagram: {
    prefix: "token-vault-lifecycle",
    values: (text) => getAsyncVaultValues(text, "lifecycle"),
    presets: ASYNC_PRESET_IDS.map((id) => ({
      label: `token-vault-preset-${id}`,
      values: (text) => getAsyncVaultValues(text, "lifecycle", id),
    })),
  },
} satisfies Record<string, DiagramFigureText>
